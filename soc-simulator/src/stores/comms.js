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

  function sendInitialMessages() {
    // Send any initial messages from NPCs (e.g., shift handover)
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      if (npc.initialMessage && channels.value[npcId]?.length === 0) {
        const delay = npc.initialMessage.delay || 0
        setTimeout(() => {
          receiveMessage(npcId, npc.initialMessage.content, true)
          gameStore.addNotification(`New message from ${npc.name}`, 'info')
        }, delay)
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
      gameTime: gameStore.formattedTime,
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

  function receiveMessage(npcId, content, isSystemEvent = false) {
    const npc = npcs.value[npcId]
    const message = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      gameTime: gameStore.formattedTime,
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
      gameStore.addNotification(`New message from ${npc?.name}`, 'info')
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

  function scoreMessage(npcId, content) {
    const npc = npcs.value[npcId]
    if (!npc?.responseRubric) return 0
    
    const lowerContent = content.toLowerCase()
    let score = 0
    
    npc.responseRubric.forEach(criterion => {
      const hasMatch = criterion.keywords.some(kw => lowerContent.includes(kw.toLowerCase()))
      if (hasMatch) {
        score += criterion.points
      }
    })
    
    return score
  }

  function getResponseTier(npcId, score) {
    const npc = npcs.value[npcId]
    if (!npc?.responses) return 'weak'
    
    if (score >= npc.responses.strong.minScore) return 'strong'
    if (score >= npc.responses.partial.minScore) return 'partial'
    return 'weak'
  }

  function saveState() {
    localStorage.setItem('soc-sim-comms', JSON.stringify({
      channels: channels.value,
      activeChannelId: activeChannelId.value,
      escalationCounts: escalationCounts.value,
      unreadCounts: unreadCounts.value
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
  }

  return {
    npcs,
    channels,
    activeChannelId,
    escalationCounts,
    unreadCounts,
    activeChannel,
    totalUnread,
    loadNPCs,
    sendInitialMessages,
    setActiveChannel,
    sendMessage,
    receiveMessage,
    getEscalationCost,
    incrementEscalation,
    scoreMessage,
    getResponseTier,
    saveState,
    loadState,
    clearState
  }
})
