import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'

export const useTicketsStore = defineStore('tickets', () => {
  const gameStore = useGameStore()
  
  // State
  const allTickets = ref([])
  const visibleTicketIds = ref([])
  const selectedTicketId = ref(null)
  const ticketNotes = ref({}) // ticketId -> array of { id, text, timestamp }
  const completedActions = ref([]) // action IDs that have been taken
  const closedTickets = ref([]) // ticket IDs that have been closed

  // Computed
  const visibleTickets = computed(() => {
    return allTickets.value
      .filter(t => visibleTicketIds.value.includes(t.id))
      .sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return priorityOrder[a.priority] - priorityOrder[b.priority]
      })
  })

  const selectedTicket = computed(() => {
    return allTickets.value.find(t => t.id === selectedTicketId.value)
  })

  // Actions
  function loadTickets(tickets) {
    allTickets.value = tickets
    // Show tickets that are visible at start (visibleAt = 0 or undefined, and not action-triggered)
    visibleTicketIds.value = tickets
      .filter(t => (!t.visibleAt || t.visibleAt === 0) && !t.triggeredBy)
      .map(t => t.id)
  }

  function showTicket(ticketId) {
    if (!visibleTicketIds.value.includes(ticketId)) {
      visibleTicketIds.value.push(ticketId)
      const ticket = allTickets.value.find(t => t.id === ticketId)
      if (ticket) {
        gameStore.addNotification(`New ticket: ${ticket.subject}`, 'info', 'tickets', { ticketId })
        gameStore.logAction(`New service ticket: ${ticket.subject}`, 'event')
      }
      saveState()
    }
  }

  function checkScheduledTickets(elapsedSeconds) {
    // Check for tickets that should become visible based on elapsed time
    allTickets.value.forEach(ticket => {
      if (ticket.visibleAt && ticket.visibleAt > 0 && !visibleTicketIds.value.includes(ticket.id)) {
        if (elapsedSeconds >= ticket.visibleAt) {
          showTicket(ticket.id)
        }
      }
    })
  }

  function triggerActionTickets(actionId) {
    // Find tickets triggered by this action and schedule them
    allTickets.value.forEach(ticket => {
      if (ticket.triggeredBy === actionId && !visibleTicketIds.value.includes(ticket.id)) {
        const delaySeconds = ticket.triggerDelaySeconds || 0
        if (delaySeconds > 0) {
          // Schedule for later using game time
          gameStore.scheduleCallback(`ticket-${ticket.id}`, delaySeconds, () => {
            showTicket(ticket.id)
          })
        } else {
          // Show immediately
          showTicket(ticket.id)
        }
      }
    })
  }

  function selectTicket(ticketId) {
    selectedTicketId.value = ticketId
  }

  function addNote(ticketId, note) {
    if (!ticketNotes.value[ticketId]) {
      ticketNotes.value[ticketId] = []
    }
    ticketNotes.value[ticketId].push({
      id: Date.now().toString(),
      text: note,
      timestamp: new Date().toISOString()
    })
    gameStore.logAction(`Added note to ticket ${ticketId}`, 'note')
    saveState()
  }

  function updateNote(ticketId, noteId, newText) {
    const notes = ticketNotes.value[ticketId]
    if (notes) {
      const note = notes.find(n => n.id === noteId)
      if (note) {
        note.text = newText
        gameStore.logAction(`Updated note on ticket ${ticketId}`, 'note')
        saveState()
      }
    }
  }

  function deleteNote(ticketId, noteId) {
    const notes = ticketNotes.value[ticketId]
    if (notes) {
      const index = notes.findIndex(n => n.id === noteId)
      if (index !== -1) {
        notes.splice(index, 1)
        gameStore.logAction(`Deleted note from ticket ${ticketId}`, 'note')
        saveState()
      }
    }
  }

  function setNotes(ticketId, notes) {
    ticketNotes.value[ticketId] = notes
    saveState()
  }

  function isActionCompleted(actionId) {
    return completedActions.value.includes(actionId)
  }

  function completeAction(actionId) {
    if (!completedActions.value.includes(actionId)) {
      completedActions.value.push(actionId)
      saveState()
    }
  }

  function closeTicket(ticketId) {
    if (!closedTickets.value.includes(ticketId)) {
      closedTickets.value.push(ticketId)
      saveState()
    }
  }

  function isTicketClosed(ticketId) {
    return closedTickets.value.includes(ticketId)
  }

  function isActionAvailable(action, ticket) {
    // If action is already completed, it's not available
    if (completedActions.value.includes(action.id)) {
      return false
    }
    
    // If action has an exclusive group, check if any other action in that group is completed
    if (action.exclusiveGroup) {
      const otherActionsInGroup = ticket.actions.filter(
        a => a.exclusiveGroup === action.exclusiveGroup && a.id !== action.id
      )
      const groupActionCompleted = otherActionsInGroup.some(a => completedActions.value.includes(a.id))
      if (groupActionCompleted) {
        return false
      }
    }
    
    return true
  }

  function saveState() {
    localStorage.setItem('soc-sim-tickets', JSON.stringify({
      visibleTicketIds: visibleTicketIds.value,
      selectedTicketId: selectedTicketId.value,
      ticketNotes: ticketNotes.value,
      completedActions: completedActions.value,
      closedTickets: closedTickets.value
    }))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-tickets')
    if (saved) {
      const state = JSON.parse(saved)
      visibleTicketIds.value = state.visibleTicketIds || []
      selectedTicketId.value = state.selectedTicketId
      ticketNotes.value = state.ticketNotes || {}
      completedActions.value = state.completedActions || []
      closedTickets.value = state.closedTickets || []
      return true
    }
    return false
  }

  function clearState() {
    localStorage.removeItem('soc-sim-tickets')
    visibleTicketIds.value = []
    selectedTicketId.value = null
    ticketNotes.value = {}
    completedActions.value = []
    closedTickets.value = []
  }

  return {
    allTickets,
    visibleTicketIds,
    selectedTicketId,
    ticketNotes,
    completedActions,
    closedTickets,
    visibleTickets,
    selectedTicket,
    loadTickets,
    showTicket,
    checkScheduledTickets,
    selectTicket,
    addNote,
    updateNote,
    deleteNote,
    setNotes,
    isActionCompleted,
    completeAction,
    closeTicket,
    isTicketClosed,
    isActionAvailable,
    triggerActionTickets,
    saveState,
    loadState,
    clearState
  }
})
