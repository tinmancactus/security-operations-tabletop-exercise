import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'

export const useAlertsStore = defineStore('alerts', () => {
  const gameStore = useGameStore()
  
  // State
  const allAlerts = ref([])
  const visibleAlertIds = ref([])
  const selectedAlertId = ref(null)
  const filter = ref('all') // all, critical, high, medium, low
  const blockedIPs = ref([]) // Track blocked IPs (one-time action)
  const completedActions = ref([]) // Track completed action IDs
  const alertNotes = ref({}) // alertId -> array of { id, text, timestamp }

  // Computed
  const visibleAlerts = computed(() => {
    return allAlerts.value
      .filter(a => visibleAlertIds.value.includes(a.id))
      .filter(a => filter.value === 'all' || a.severity === filter.value)
      .sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
        return severityOrder[a.severity] - severityOrder[b.severity]
      })
  })

  const selectedAlert = computed(() => {
    return allAlerts.value.find(a => a.id === selectedAlertId.value)
  })

  const alertCounts = computed(() => {
    const visible = allAlerts.value.filter(a => visibleAlertIds.value.includes(a.id))
    return {
      critical: visible.filter(a => a.severity === 'critical').length,
      high: visible.filter(a => a.severity === 'high').length,
      medium: visible.filter(a => a.severity === 'medium').length,
      low: visible.filter(a => a.severity === 'low').length,
      total: visible.length
    }
  })

  // Actions
  function loadAlerts(alerts) {
    allAlerts.value = alerts
    // Show alerts that are visible at start (visibleAt = 0 or undefined)
    visibleAlertIds.value = alerts
      .filter(a => !a.visibleAt || a.visibleAt === 0)
      .map(a => a.id)
  }

  function showAlert(alertId, skipNotification = false) {
    if (!visibleAlertIds.value.includes(alertId)) {
      visibleAlertIds.value.push(alertId)
      const alert = allAlerts.value.find(a => a.id === alertId)
      if (alert) {
        if (!skipNotification) {
          gameStore.addNotification(`New alert: ${alert.title}`, 'warning', 'siem', { alertId })
        }
        gameStore.logAction(`New SIEM alert: ${alert.title}`, 'event')
      }
      saveState()
    }
  }

  function selectAlert(alertId) {
    selectedAlertId.value = alertId
  }

  function setFilter(newFilter) {
    filter.value = newFilter
  }

  function saveState() {
    localStorage.setItem('soc-sim-alerts', JSON.stringify({
      visibleAlertIds: visibleAlertIds.value,
      selectedAlertId: selectedAlertId.value,
      blockedIPs: blockedIPs.value,
      completedActions: completedActions.value,
      alertNotes: alertNotes.value
    }))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-alerts')
    if (saved) {
      const state = JSON.parse(saved)
      visibleAlertIds.value = state.visibleAlertIds || []
      selectedAlertId.value = state.selectedAlertId
      blockedIPs.value = state.blockedIPs || []
      completedActions.value = state.completedActions || []
      alertNotes.value = state.alertNotes || {}
      return true
    }
    return false
  }

  function clearState() {
    localStorage.removeItem('soc-sim-alerts')
    visibleAlertIds.value = []
    selectedAlertId.value = null
    filter.value = 'all'
    blockedIPs.value = []
    completedActions.value = []
    alertNotes.value = {}
  }

  function blockIP(ip) {
    if (!blockedIPs.value.includes(ip)) {
      blockedIPs.value.push(ip)
      saveState()
    }
  }

  function isIPBlocked(ip) {
    return blockedIPs.value.includes(ip)
  }

  function addNote(alertId, note) {
    if (!alertNotes.value[alertId]) {
      alertNotes.value[alertId] = []
    }
    alertNotes.value[alertId].push({
      id: Date.now().toString(),
      text: note,
      timestamp: new Date().toISOString()
    })
    gameStore.logAction(`Added note to alert ${alertId}`, 'note')
    saveState()
  }

  function updateNote(alertId, noteId, newText) {
    const notes = alertNotes.value[alertId]
    if (notes) {
      const note = notes.find(n => n.id === noteId)
      if (note) {
        note.text = newText
        gameStore.logAction(`Updated note on alert ${alertId}`, 'note')
        saveState()
      }
    }
  }

  function deleteNote(alertId, noteId) {
    const notes = alertNotes.value[alertId]
    if (notes) {
      const index = notes.findIndex(n => n.id === noteId)
      if (index !== -1) {
        notes.splice(index, 1)
        gameStore.logAction(`Deleted note from alert ${alertId}`, 'note')
        saveState()
      }
    }
  }

  function completeAction(actionId) {
    if (!completedActions.value.includes(actionId)) {
      completedActions.value.push(actionId)
      saveState()
    }
  }

  function isActionCompleted(actionId) {
    return completedActions.value.includes(actionId)
  }

  function checkScheduledAlerts(elapsedSeconds) {
    // Check for alerts that should become visible based on elapsed time
    allAlerts.value.forEach(alert => {
      if (alert.visibleAt && alert.visibleAt > 0 && !visibleAlertIds.value.includes(alert.id)) {
        if (elapsedSeconds >= alert.visibleAt) {
          // Check conditional visibility based on IP blocking
          if (alert.showIfIPBlocked && !isIPBlocked(alert.showIfIPBlocked)) {
            return // Don't show - requires IP to be blocked but it isn't
          }
          if (alert.showUnlessIPBlocked && isIPBlocked(alert.showUnlessIPBlocked)) {
            return // Don't show - requires IP to NOT be blocked but it is
          }
          
          showAlertWithEffects(alert)
        }
      }
    })
  }

  function showAlertWithEffects(alert) {
    // Show the alert, skip default notification if custom one is specified
    const hasCustomNotification = !!alert.notification
    showAlert(alert.id, hasCustomNotification)
    
    // Handle custom notification if specified
    if (alert.notification) {
      gameStore.addNotification(alert.notification.message, alert.notification.type, 'siem', { alertId: alert.id })
    }
    
    // Handle pauseTimer for cliffhanger alerts
    if (alert.pauseTimer) {
      gameStore.pauseTimer()
    }
  }

  return {
    allAlerts,
    visibleAlertIds,
    selectedAlertId,
    filter,
    blockedIPs,
    alertNotes,
    visibleAlerts,
    selectedAlert,
    alertCounts,
    loadAlerts,
    showAlert,
    selectAlert,
    setFilter,
    saveState,
    loadState,
    clearState,
    blockIP,
    isIPBlocked,
    addNote,
    updateNote,
    deleteNote,
    completeAction,
    isActionCompleted,
    checkScheduledAlerts
  }
})
