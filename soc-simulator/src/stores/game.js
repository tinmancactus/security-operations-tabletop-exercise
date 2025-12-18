import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGameStore = defineStore('game', () => {
  // State
  const scenario = ref(null)
  const sessionStarted = ref(false)
  const timeRemaining = ref(3600)
  const tokens = ref(12)
  const isRunning = ref(false)
  const timerInterval = ref(null)
  const actionLog = ref([])
  const currentView = ref('siem')
  const notifications = ref([])
  const scheduledCallbacks = ref([]) // Game-time scheduled events: { triggerAt: elapsedSeconds, callback: fn, id: string }

  // Computed
  const formattedTime = computed(() => {
    const mins = Math.floor(timeRemaining.value / 60)
    const secs = timeRemaining.value % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  })

  const timerClass = computed(() => {
    if (timeRemaining.value <= 300) return 'danger'
    if (timeRemaining.value <= 1200) return 'warning'
    return ''
  })

  const timeExpired = computed(() => timeRemaining.value <= 0)

  // In-game time: session starts at 8:00am, runs for 60 minutes
  // So elapsed time maps to 8:00 + elapsed minutes
  const inGameTime = computed(() => {
    const totalDuration = scenario.value?.config?.duration || 3600
    const elapsedSeconds = totalDuration - timeRemaining.value
    const elapsedMinutes = Math.floor(elapsedSeconds / 60)
    
    // Start at 8:00am (480 minutes from midnight)
    const startMinutes = 8 * 60
    const currentMinutes = startMinutes + elapsedMinutes
    
    const hours = Math.floor(currentMinutes / 60)
    const mins = currentMinutes % 60
    const period = hours >= 12 ? 'pm' : 'am'
    const displayHours = hours > 12 ? hours - 12 : hours
    
    return `${displayHours}:${mins.toString().padStart(2, '0')}${period}`
  })

  // Actions
  function loadScenario(scenarioData) {
    scenario.value = scenarioData
    timeRemaining.value = scenarioData.config.duration
    tokens.value = scenarioData.config.tokens
  }

  function startSession() {
    sessionStarted.value = true
    logAction('Session started', 'system')
    saveState()
    // Auto-start timer when session begins
    startTimer()
  }

  function startTimer() {
    if (isRunning.value) return
    isRunning.value = true
    timerInterval.value = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--
        saveState() // Persist timer state
        checkTimedEvents()
      } else {
        pauseTimer()
      }
    }, 1000)
  }

  function pauseTimer() {
    isRunning.value = false
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  function resetTimer() {
    pauseTimer()
    if (scenario.value) {
      timeRemaining.value = scenario.value.config.duration
    }
  }

  function spendTokens(amount, reason) {
    if (tokens.value >= amount) {
      tokens.value -= amount
      logAction(`Spent ${amount} token(s): ${reason}`, 'token')
      return true
    }
    addNotification(`Not enough tokens! Need ${amount}, have ${tokens.value}`, 'warning')
    return false
  }

  function logAction(message, type = 'action', details = null) {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      gameTime: formattedTime.value,
      message,
      type,
      details
    }
    actionLog.value.unshift(entry)
    
    // Persist to localStorage
    saveState()
  }

  function addNotification(message, type = 'info', navigateTo = null, data = null) {
    const notification = {
      id: Date.now(),
      message,
      type,
      navigateTo, // view name to navigate to when clicked (e.g., 'comms', 'siem', 'evidence')
      data // additional data (e.g., { evidenceId: 'EV-1' })
    }
    notifications.value.push(notification)
    // No auto-timeout - notifications persist until dismissed or clicked
  }

  function dismissNotification(id) {
    const idx = notifications.value.findIndex(n => n.id === id)
    if (idx !== -1) notifications.value.splice(idx, 1)
  }

  function handleNotificationClick(notification, stores = {}) {
    // Handle deep-linking for specific notification types
    if (notification.navigateTo === 'evidence' && notification.data?.evidenceId && stores.evidenceStore) {
      stores.evidenceStore.selectEvidence(notification.data.evidenceId)
    }
    
    if (notification.navigateTo === 'comms' && notification.data?.npcId && stores.commsStore) {
      stores.commsStore.setActiveChannel(notification.data.npcId)
    }
    
    if (notification.navigateTo === 'siem' && notification.data?.alertId && stores.alertsStore) {
      stores.alertsStore.selectAlert(notification.data.alertId)
    }
    
    if (notification.navigateTo === 'tickets' && notification.data?.ticketId && stores.ticketsStore) {
      stores.ticketsStore.selectTicket(notification.data.ticketId)
    }
    
    if (notification.navigateTo) {
      setView(notification.navigateTo)
    }
    dismissNotification(notification.id)
  }

  function setView(view) {
    currentView.value = view
  }

  function checkTimedEvents() {
    // Calculate elapsed time
    const duration = scenario.value?.config?.duration || 3600
    const elapsed = duration - timeRemaining.value
    
    // Check for scheduled alerts
    // Import inside function to avoid circular dependency
    import('./alerts').then(({ useAlertsStore }) => {
      const alertsStore = useAlertsStore()
      alertsStore.checkScheduledAlerts(elapsed)
    })
    
    // Check for scheduled tickets
    import('./tickets').then(({ useTicketsStore }) => {
      const ticketsStore = useTicketsStore()
      ticketsStore.checkScheduledTickets(elapsed)
    })
    
    // Check for scheduled callbacks (action-triggered events)
    checkScheduledCallbacks(elapsed)
  }

  function scheduleCallback(id, delaySeconds, callback) {
    // Schedule a callback to run after delaySeconds of game time
    const duration = scenario.value?.config?.duration || 3600
    const currentElapsed = duration - timeRemaining.value
    const triggerAt = currentElapsed + delaySeconds
    
    // Remove any existing callback with same id
    scheduledCallbacks.value = scheduledCallbacks.value.filter(c => c.id !== id)
    
    scheduledCallbacks.value.push({ id, triggerAt, callback })
  }

  function checkScheduledCallbacks(elapsed) {
    const toTrigger = scheduledCallbacks.value.filter(c => elapsed >= c.triggerAt)
    
    toTrigger.forEach(c => {
      c.callback()
    })
    
    // Remove triggered callbacks
    scheduledCallbacks.value = scheduledCallbacks.value.filter(c => elapsed < c.triggerAt)
  }

  function cancelScheduledCallback(id) {
    scheduledCallbacks.value = scheduledCallbacks.value.filter(c => c.id !== id)
  }

  function saveState() {
    const state = {
      sessionStarted: sessionStarted.value,
      timeRemaining: timeRemaining.value,
      tokens: tokens.value,
      actionLog: actionLog.value,
      currentView: currentView.value
    }
    localStorage.setItem('soc-sim-game', JSON.stringify(state))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-game')
    if (saved) {
      const state = JSON.parse(saved)
      sessionStarted.value = state.sessionStarted
      timeRemaining.value = state.timeRemaining
      tokens.value = state.tokens
      actionLog.value = state.actionLog || []
      currentView.value = state.currentView || 'siem'
      return true
    }
    return false
  }

  function resumeTimer() {
    // Resume timer if session was in progress
    if (sessionStarted.value && !isRunning.value && timeRemaining.value > 0) {
      startTimer()
    }
  }

  function clearState() {
    localStorage.removeItem('soc-sim-game')
    sessionStarted.value = false
    timeRemaining.value = scenario.value?.config.duration || 3600
    tokens.value = scenario.value?.config.tokens || 12
    actionLog.value = []
    currentView.value = 'siem'
    notifications.value = [] // Clear all notifications on reset
  }

  // Secret console commands for facilitators/testing
  function _setTime(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) {
      console.error('Usage: soc.setTime(seconds) - e.g., soc.setTime(1800) for 30 minutes')
      return
    }
    timeRemaining.value = seconds
    saveState()
    checkTimedEvents() // Check for scheduled events after time change
    console.log(`⏱️ Time set to ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`)
  }

  function _addTime(seconds) {
    if (typeof seconds !== 'number') {
      console.error('Usage: soc.addTime(seconds) - e.g., soc.addTime(300) to add 5 minutes')
      return
    }
    timeRemaining.value = Math.max(0, timeRemaining.value + seconds)
    saveState()
    checkTimedEvents() // Check for scheduled events after time change
    console.log(`⏱️ Time ${seconds >= 0 ? 'added' : 'removed'}: now ${formattedTime.value}`)
  }

  function _setTokens(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      console.error('Usage: soc.setTokens(amount) - e.g., soc.setTokens(20)')
      return
    }
    tokens.value = amount
    saveState()
    console.log(`🪙 Tokens set to ${amount}`)
  }

  function _addTokens(amount) {
    if (typeof amount !== 'number') {
      console.error('Usage: soc.addTokens(amount) - e.g., soc.addTokens(5)')
      return
    }
    tokens.value = Math.max(0, tokens.value + amount)
    saveState()
    console.log(`🪙 Tokens ${amount >= 0 ? 'added' : 'removed'}: now ${tokens.value}`)
  }

  function _status() {
    console.log(`\n🎮 SOC Simulator Status\n${'─'.repeat(30)}`)
    console.log(`⏱️ Time: ${formattedTime.value} (${timeRemaining.value}s remaining)`)
    console.log(`🪙 Tokens: ${tokens.value}`)
    console.log(`▶️ Running: ${isRunning.value}`)
    console.log(`\n📋 Commands:\n  soc.setTime(seconds)\n  soc.addTime(seconds)\n  soc.setTokens(amount)\n  soc.addTokens(amount)\n  soc.pause()\n  soc.resume()\n  soc.status()`)
  }

  // Expose console commands on window object
  if (typeof window !== 'undefined') {
    window.soc = {
      setTime: _setTime,
      addTime: _addTime,
      setTokens: _setTokens,
      addTokens: _addTokens,
      pause: pauseTimer,
      resume: startTimer,
      status: _status,
      help: () => _status()
    }
  }

  return {
    // State
    scenario,
    sessionStarted,
    timeRemaining,
    tokens,
    isRunning,
    actionLog,
    currentView,
    notifications,
    
    // Computed
    formattedTime,
    inGameTime,
    timerClass,
    timeExpired,
    
    // Actions
    loadScenario,
    startSession,
    startTimer,
    pauseTimer,
    resetTimer,
    spendTokens,
    logAction,
    addNotification,
    dismissNotification,
    handleNotificationClick,
    setView,
    saveState,
    loadState,
    clearState,
    resumeTimer,
    scheduleCallback,
    cancelScheduledCallback
  }
})
