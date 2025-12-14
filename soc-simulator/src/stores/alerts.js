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

  function showAlert(alertId) {
    if (!visibleAlertIds.value.includes(alertId)) {
      visibleAlertIds.value.push(alertId)
      const alert = allAlerts.value.find(a => a.id === alertId)
      if (alert) {
        gameStore.addNotification(`New alert: ${alert.title}`, 'warning')
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
      blockedIPs: blockedIPs.value
    }))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-alerts')
    if (saved) {
      const state = JSON.parse(saved)
      visibleAlertIds.value = state.visibleAlertIds || []
      selectedAlertId.value = state.selectedAlertId
      blockedIPs.value = state.blockedIPs || []
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

  return {
    allAlerts,
    visibleAlertIds,
    selectedAlertId,
    filter,
    blockedIPs,
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
    isIPBlocked
  }
})
