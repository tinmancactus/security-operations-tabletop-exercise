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

  function addNotification(message, type = 'info') {
    const notification = {
      id: Date.now(),
      message,
      type
    }
    notifications.value.push(notification)
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      const idx = notifications.value.findIndex(n => n.id === notification.id)
      if (idx !== -1) notifications.value.splice(idx, 1)
    }, 4000)
  }

  function setView(view) {
    currentView.value = view
  }

  function checkTimedEvents() {
    // This will be called by the timer to check for scenario events
    // Implemented in the scenario loader
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
    timerClass,
    
    // Actions
    loadScenario,
    startSession,
    startTimer,
    pauseTimer,
    resetTimer,
    spendTokens,
    logAction,
    addNotification,
    setView,
    saveState,
    loadState,
    clearState,
    resumeTimer
  }
})
