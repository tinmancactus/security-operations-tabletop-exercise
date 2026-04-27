import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'
import { useEvidenceStore } from './evidence'
import { useTicketsStore } from './tickets'

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
  const npcModeOverrides = ref({}) // npcId -> overridden messagingMode (persisted across reloads)

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
      if (npc.initialMessage) {
        const delayMs = (npc.initialMessage.delay || 0) * 1000
        setTimeout(() => {
          // Use gameTime from data if provided, otherwise use current game time
          receiveMessage(npcId, npc.initialMessage.content, true, npc.initialMessage.gameTime)
          gameStore.addNotification(`New message from ${npc.name}`, 'info', 'comms', { npcId })
        }, delayMs)
      }
    })
  }

  function scheduleNpcMessages() {
    // Schedule messages that trigger at specific game times
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      if (npc.scheduledMessages) {
        npc.scheduledMessages.forEach(msg => {
          gameStore.scheduleCallback(`npc-msg-${msg.id}`, msg.triggerAt, () => {
            // Skip if onlyIfMode is set and NPC is no longer in that mode
            if (msg.onlyIfMode && npcs.value[npcId]?.messagingMode !== msg.onlyIfMode) return
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
      npcModeOverrides.value[npcId] = mode
      saveState()
    }
  }

  function sendCannedResponse(npcId, responseId) {
    const npc = npcs.value[npcId]
    if (!npc?.cannedResponses) return

    const response = npc.cannedResponses.find(r => r.id === responseId)
    if (!response) return

    // Send player message
    sendMessage(npcId, response.label)
    gameStore.logAction(`Responded to ${npc.name}`, 'comms', { content: response.label })

    // Remove this response from the list (consumed)
    npc.cannedResponses = (npc.cannedResponses || []).filter(r => r.id !== responseId)

    // NPC replies after delay
    const delay = response.delay || 2000
    setTimeout(() => {
      receiveMessage(npcId, response.npcReply)

      // Send additional sequential replies if configured
      if (response.additionalReplies) {
        let cumulativeDelay = 0
        response.additionalReplies.forEach((reply, idx) => {
          cumulativeDelay += reply.delayMs || 3000
          setTimeout(() => {
            receiveMessage(npcId, reply.content)
            // On the final additional reply, handle appendCannedResponses + afterMode
            if (idx === response.additionalReplies.length - 1) {
              if (response.appendCannedResponses) {
                const existing = (npc.cannedResponses || []).filter(
                  r => !response.appendCannedResponses.find(cr => cr.id === r.id)
                )
                npc.cannedResponses = [...existing, ...response.appendCannedResponses]
                setNpcMessagingMode(npcId, 'canned')
              } else if (response.afterMode) {
                if (!npc.cannedResponses?.length) {
                  setNpcMessagingMode(npcId, response.afterMode)
                }
              }
            }
          }, cumulativeDelay)
        })
        // Schedule ticket spam after all additionalReplies + extra delay
        if (response.spamTickets) {
          const spamStartDelay = cumulativeDelay + (response.spamTickets.delayMs || 30000)
          setTimeout(() => {
            const ticketsStore = useTicketsStore()
            const { count, intervalMs, subject, content, from } = response.spamTickets
            for (let i = 0; i < count; i++) {
              setTimeout(() => {
                // Calculate in-game timestamp from elapsed session time.
                // Build ISO string from raw components (no timezone conversion).
                const config = gameStore.scenario?.config
                const totalDuration = config?.duration || 3600
                const elapsedSeconds = totalDuration - gameStore.timeRemaining
                const startHour = config?.startTime?.hour ?? 8
                const startMinute = config?.startTime?.minute ?? 0
                const totalSecondsFromMidnight = startHour * 3600 + startMinute * 60 + elapsedSeconds
                const hh = Math.floor(totalSecondsFromMidnight / 3600)
                const mm = Math.floor((totalSecondsFromMidnight % 3600) / 60)
                const ss = totalSecondsFromMidnight % 60
                const pad = n => String(n).padStart(2, '0')
                const submitted = `2024-10-15T${pad(hh)}:${pad(mm)}:${pad(ss)}` // e.g. '2024-10-15T08:22:14'

                ticketsStore.createTicket({
                  id: `TKT-54${String(i).padStart(2, '0')}`,
                  subject,
                  content,
                  priority: 'high',
                  status: 'open',
                  category: 'Security',
                  from: from || { name: 'Unknown', department: 'External' },
                  submitted
                })
              }, i * (intervalMs || 1000))
            }
            // Trigger Priya's aftermath investigation after spam completes (~4s buffer)
            setTimeout(() => {
              triggerSpecialInteraction('sandra-trap-aftermath')
            }, count * (intervalMs || 1000) + 4000)
          }, spamStartDelay)
        }
      } else {
        // Switch mode if configured (only when no canned responses remain)
        if (response.afterMode) {
          if (!npc.cannedResponses?.length) {
            setNpcMessagingMode(npcId, response.afterMode)
          }
        }
      }

      // Unlock evidence if configured (immediate)
      if (response.unlockEvidence) {
        const evidenceStore = useEvidenceStore()
        response.unlockEvidence.forEach(id => evidenceStore.unlockEvidence(id))
      }

      // Schedule delayed evidence unlock (investigation takes time)
      if (response.delayedUnlockEvidence) {
        const { evidenceId, delaySeconds } = response.delayedUnlockEvidence
        const evidenceStore = useEvidenceStore()
        gameStore.scheduleCallback(`evidence-${evidenceId}`, delaySeconds, () => {
          evidenceStore.unlockEvidence(evidenceId)
        })
        const mins = Math.round(delaySeconds / 60)
        gameStore.addNotification(`Investigation in progress — results in ~${mins} minute${mins !== 1 ? 's' : ''}`, 'info')
      }

      // Schedule delayed NPC message (follow-up with findings)
      if (response.delayedNpcMessage) {
        const { content: msgContent, delaySeconds } = response.delayedNpcMessage
        const targetNpcId = response.delayedNpcMessage.npcId || npcId
        gameStore.scheduleCallback(`delayed-canned-msg-${npcId}-${responseId}`, delaySeconds, () => {
          receiveMessage(targetNpcId, msgContent)
          gameStore.addNotification(`New message from ${npcs.value[targetNpcId]?.name || targetNpcId}`, 'info', 'comms', { npcId: targetNpcId })
        })
      }
    }, delay)
  }

  function saveState() {
    localStorage.setItem('soc-sim-comms', JSON.stringify({
      channels: channels.value,
      activeChannelId: activeChannelId.value,
      escalationCounts: escalationCounts.value,
      unreadCounts: unreadCounts.value,
      npcStatus: npcStatus.value,
      messageDrafts: messageDrafts.value,
      pendingEscalation: pendingEscalation.value,
      npcModeOverrides: npcModeOverrides.value
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
      npcModeOverrides.value = state.npcModeOverrides || {}
      // Apply saved mode overrides to NPC data
      Object.entries(npcModeOverrides.value).forEach(([id, mode]) => {
        if (npcs.value[id]) {
          npcs.value[id].messagingMode = mode
        }
      })
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
    npcModeOverrides.value = {}
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

  // Resolve specialInteractions array from NPC (supports both singular and plural keys)
  function getInteractionsArray(npc) {
    if (npc.specialInteractions) return npc.specialInteractions
    if (npc.specialInteraction) return [npc.specialInteraction]
    return []
  }

  // Trigger special interaction for an NPC based on action ID
  function triggerSpecialInteraction(actionId) {
    // Find any NPC with a specialInteraction triggered by this action
    Object.entries(npcs.value).forEach(([npcId, npc]) => {
      const interactions = getInteractionsArray(npc)
      const interaction = interactions.find(i => i.triggeredByAction === actionId)
      if (!interaction) return

      const delaySeconds = interaction.delaySeconds || 60
      
      if (interaction.type === 'canned-handoff') {
        // Canned handoff: after delay, NPC sends message then switches to canned mode
        // so the player can respond via pre-written options
        gameStore.scheduleCallback(`special-interaction-${npcId}-${actionId}`, delaySeconds, () => {
          receiveMessage(npcId, interaction.promptMessage, false)
          // Append canned responses (don't overwrite — multiple interactions may stack)
          if (interaction.cannedResponses) {
            const existing = (npc.cannedResponses || []).filter(
              r => !interaction.cannedResponses.find(cr => cr.id === r.id)
            )
            npc.cannedResponses = [...existing, ...interaction.cannedResponses]
            setNpcMessagingMode(npcId, 'canned')
          }
        })
      } else {
        // Default: awaiting-response (free-text reply with confirmation modal)
        npc._activeInteraction = interaction
        gameStore.scheduleCallback(`special-interaction-${npcId}-${actionId}`, delaySeconds, () => {
          setNpcStatus(npcId, 'awaiting-response')
          receiveMessage(npcId, interaction.promptMessage, false)
        })
      }
    })
  }

  // Handle player response to a special interaction
  function handleSpecialInteractionResponse(npcId, playerMessage) {
    const npc = npcs.value[npcId]
    // Find the active one-time-response interaction
    const interaction = npc?._activeInteraction || 
      getInteractionsArray(npc).find(i => i.type === 'one-time-response')
    if (!interaction) return
    
    // Send player's message
    sendMessage(npcId, playerMessage)
    gameStore.logAction(`Responded to ${npc.name}`, 'comms', { content: playerMessage })

    // Mark the interaction as completed so it's not matched again
    interaction._completed = true

    // NPC responds after a short delay (configurable, default 3s)
    const responseDelay = interaction.responseDelay || 3000
    setTimeout(() => {
      receiveMessage(npcId, interaction.responseMessage)
      // Set status back to resolved, and switch to specified mode if configured
      setNpcStatus(npcId, 'resolved')
      if (interaction.afterMode) {
        setNpcMessagingMode(npcId, interaction.afterMode)
      }
      delete npc._activeInteraction
    }, responseDelay)
  }
  
  // Check if an NPC has a pending special interaction (one-time-response type, not completed)
  function hasSpecialInteraction(npcId) {
    const npc = npcs.value[npcId]
    if (!npc) return false
    return getInteractionsArray(npc).some(i => i.type === 'one-time-response' && !i._completed)
  }

  // Get special interaction config for an NPC (returns active or first pending one-time-response)
  function getSpecialInteraction(npcId) {
    const npc = npcs.value[npcId]
    if (!npc) return null
    return npc._activeInteraction ||
      getInteractionsArray(npc).find(i => i.type === 'one-time-response' && !i._completed)
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
    triggerSpecialInteraction,
    handleSpecialInteractionResponse,
    hasSpecialInteraction,
    getSpecialInteraction,
    setMessageDraft,
    getMessageDraft,
    clearMessageDraft,
    setPendingEscalation,
    clearPendingEscalation,
    setNpcMessagingMode,
    sendCannedResponse
  }
})
