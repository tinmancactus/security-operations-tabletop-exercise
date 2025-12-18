import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'

export const useCommsStore = defineStore('comms', () => {
  const gameStore = useGameStore()
  
  // State
  const npcs = ref({})
  const channels = ref({}) // npcId -> array of messages
  const activeChannelId = ref(null)
  const escalationCounts = ref({}) // npcId -> count
  const unreadCounts = ref({}) // npcId -> count
  const npcStatus = ref({}) // npcId -> status overrides (e.g., 'dnd', 'awaiting-response', 'resolved')
  const messageDrafts = ref({}) // npcId -> draft message text
  const pendingEscalation = ref(null) // { npcId, message, step: 'confirm' | 'assess' }

  // Computed
  const activeChannel = computed(() => {
    if (!activeChannelId.value) return null
    return {
      npc: npcs.value[activeChannelId.value],
      messages: channels.value[activeChannelId.value] || []
    }
  })

  const totalUnread = computed(() => {
    return Object.values(unreadCounts.value).reduce((a, b) => a + b, 0)
  })

  // Actions
  function loadNPCs(npcData) {
    npcs.value = npcData
    // Initialize channels for each NPC
    Object.keys(npcData).forEach(npcId => {
      if (!channels.value[npcId]) {
        channels.value[npcId] = []
      }
      if (!escalationCounts.value[npcId]) {
        escalationCounts.value[npcId] = 0
      }
      if (!unreadCounts.value[npcId]) {
        unreadCounts.value[npcId] = 0
      }
    })
  }

  function loadMessageHistory() {
    // Load pre-existing message history for NPCs (shown as past conversations)
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      if (npc.messageHistory && channels.value[npcId]?.length === 0) {
        npc.messageHistory.forEach(msg => {
          const message = {
            id: msg.id || Date.now() + Math.random(),
            timestamp: msg.timestamp,
            gameTime: msg.gameTime || 'Earlier',
            from: msg.from, // 'npc' or 'player'
            content: msg.content,
            npcId,
            npcName: npc.name,
            isHistory: true // Mark as historical message
          }
          channels.value[npcId].push(message)
        })
      }
    })
  }

  function sendInitialMessages() {
    // Send any initial messages from NPCs (e.g., shift handover)
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      if (npc.initialMessage && channels.value[npcId]?.length === 0) {
        const delay = npc.initialMessage.delay || 0
        setTimeout(() => {
          // Use gameTime from data if provided, otherwise use current game time
          receiveMessage(npcId, npc.initialMessage.content, true, npc.initialMessage.gameTime)
          gameStore.addNotification(`New message from ${npc.name}`, 'info', 'comms', { npcId })
        }, delay)
      }
    })
  }

  function scheduleNpcMessages() {
    // Schedule messages that trigger at specific game times
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      if (npc.scheduledMessages) {
        npc.scheduledMessages.forEach(msg => {
          gameStore.scheduleCallback(`npc-msg-${msg.id}`, msg.triggerAt, () => {
            // Switch messaging mode if specified
            if (msg.switchMode) {
              setNpcMessagingMode(npcId, msg.switchMode)
            }
            // Send the message (receiveMessage handles notification)
            receiveMessage(npcId, msg.content)
          })
        })
      }
    })
  }

  function setActiveChannel(npcId) {
    activeChannelId.value = npcId
    // Clear unread for this channel
    if (npcId) {
      unreadCounts.value[npcId] = 0
    }
    saveState()
  }

  function sendMessage(npcId, content) {
    const message = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      gameTime: gameStore.inGameTime,
      from: 'player',
      content
    }
    
    if (!channels.value[npcId]) {
      channels.value[npcId] = []
    }
    channels.value[npcId].push(message)
    
    gameStore.logAction(`Sent message to ${npcs.value[npcId]?.name}`, 'comms', { content })
    saveState()
    
    return message
  }

  function receiveMessage(npcId, content, isSystemEvent = false, customGameTime = null) {
    const npc = npcs.value[npcId]
    const message = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      gameTime: customGameTime || gameStore.inGameTime,
      from: 'npc',
      npcId,
      npcName: npc?.name,
      content
    }
    
    if (!channels.value[npcId]) {
      channels.value[npcId] = []
    }
    channels.value[npcId].push(message)
    
    // Add unread if not viewing this channel
    if (activeChannelId.value !== npcId) {
      unreadCounts.value[npcId] = (unreadCounts.value[npcId] || 0) + 1
    }
    
    if (!isSystemEvent) {
      gameStore.addNotification(`New message from ${npc?.name}`, 'info', 'comms', { npcId })
    }
    
    saveState()
    return message
  }

  function getEscalationCost(npcId) {
    const npc = npcs.value[npcId]
    if (!npc?.escalationCost) return 2
    
    const count = escalationCounts.value[npcId] || 0
    return count === 0 ? npc.escalationCost.first : npc.escalationCost.followUp
  }

  function incrementEscalation(npcId) {
    escalationCounts.value[npcId] = (escalationCounts.value[npcId] || 0) + 1
    saveState()
  }

  function getResponseTier(npcId, score) {
    const npc = npcs.value[npcId]
    if (!npc?.responses) return 'weak'
    
    if (score >= npc.responses.strong.minScore) return 'strong'
    if (score >= npc.responses.partial.minScore) return 'partial'
    return 'weak'
  }

  function setNpcMessagingMode(npcId, mode) {
    if (npcs.value[npcId]) {
      npcs.value[npcId].messagingMode = mode
      saveState()
    }
  }

  function saveState() {
    localStorage.setItem('soc-sim-comms', JSON.stringify({
      channels: channels.value,
      activeChannelId: activeChannelId.value,
      escalationCounts: escalationCounts.value,
      unreadCounts: unreadCounts.value,
      npcStatus: npcStatus.value,
      messageDrafts: messageDrafts.value,
      pendingEscalation: pendingEscalation.value
    }))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-comms')
    if (saved) {
      const state = JSON.parse(saved)
      channels.value = state.channels || {}
      activeChannelId.value = state.activeChannelId
      escalationCounts.value = state.escalationCounts || {}
      unreadCounts.value = state.unreadCounts || {}
      npcStatus.value = state.npcStatus || {}
      messageDrafts.value = state.messageDrafts || {}
      pendingEscalation.value = state.pendingEscalation || null
      return true
    }
    return false
  }

  function clearState() {
    localStorage.removeItem('soc-sim-comms')
    channels.value = {}
    activeChannelId.value = null
    escalationCounts.value = {}
    unreadCounts.value = {}
    npcStatus.value = {}
    messageDrafts.value = {}
    pendingEscalation.value = null
  }

  function setMessageDraft(npcId, text) {
    messageDrafts.value[npcId] = text
    // Don't save to localStorage on every keystroke - too expensive
  }

  function getMessageDraft(npcId) {
    return messageDrafts.value[npcId] || ''
  }

  function clearMessageDraft(npcId) {
    delete messageDrafts.value[npcId]
    saveState()
  }

  function setPendingEscalation(npcId, message, step) {
    pendingEscalation.value = { npcId, message, step }
    saveState()
  }

  function clearPendingEscalation() {
    pendingEscalation.value = null
    saveState()
  }

  function setNpcStatus(npcId, status) {
    npcStatus.value[npcId] = status
    saveState()
  }

  function getNpcStatus(npcId) {
    return npcStatus.value[npcId] || npcs.value[npcId]?.status || null
  }

  function isNpcAvailable(npcId) {
    const status = getNpcStatus(npcId)
    // Available if status is 'awaiting-response' OR if no special status and npc.available is true
    if (status === 'awaiting-response') return true
    if (status === 'dnd' || status === 'resolved') return false
    return npcs.value[npcId]?.available ?? true
  }

  function triggerRachelAccountDisable() {
    const rachel = npcs.value['rachel']
    if (!rachel || getNpcStatus('rachel') !== 'dnd') return
    
    // Use game time (60 seconds of game time, not real time)
    const delaySeconds = rachel.accountDisableMessage?.delaySeconds || 60
    
    gameStore.scheduleCallback('rachel-account-disable', delaySeconds, () => {
      // Only proceed if still in dnd status (player hasn't reset)
      if (getNpcStatus('rachel') !== 'dnd') return
      
      setNpcStatus('rachel', 'awaiting-response')
      receiveMessage('rachel', rachel.accountDisableMessage.content, false)
    })
  }

  function handleRachelResponse(playerMessage) {
    const rachel = npcs.value['rachel']
    if (!rachel) return
    
    // Send player's message
    sendMessage('rachel', playerMessage)
    gameStore.logAction('Responded to Rachel Torres regarding account disable', 'comms', { content: playerMessage })
    
    // Rachel responds after a short delay
    setTimeout(() => {
      receiveMessage('rachel', rachel.accountDisableResponse)
      // Set status back to resolved (DND)
      setNpcStatus('rachel', 'resolved')
    }, 2000)
  }

  return {
    npcs,
    channels,
    activeChannelId,
    escalationCounts,
    unreadCounts,
    npcStatus,
    messageDrafts,
    pendingEscalation,
    activeChannel,
    totalUnread,
    loadNPCs,
    loadMessageHistory,
    sendInitialMessages,
    scheduleNpcMessages,
    setActiveChannel,
    sendMessage,
    receiveMessage,
    getEscalationCost,
    incrementEscalation,
    getResponseTier,
    saveState,
    loadState,
    clearState,
    setNpcStatus,
    getNpcStatus,
    isNpcAvailable,
    triggerRachelAccountDisable,
    handleRachelResponse,
    setMessageDraft,
    getMessageDraft,
    clearMessageDraft,
    setPendingEscalation,
    clearPendingEscalation,
    setNpcMessagingMode
  }
})
