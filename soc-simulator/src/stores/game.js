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

  // Secret console commands for facilitators/testing
  function _setTime(seconds) {
    if (typeof seconds !== 'number' || seconds < 0) {
      console.error('Usage: soc.setTime(seconds) - e.g., soc.setTime(1800) for 30 minutes')
      return
    }
    timeRemaining.value = seconds
    saveState()
    console.log(`⏱️ Time set to ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`)
  }

  function _addTime(seconds) {
    if (typeof seconds !== 'number') {
      console.error('Usage: soc.addTime(seconds) - e.g., soc.addTime(300) to add 5 minutes')
      return
    }
    timeRemaining.value = Math.max(0, timeRemaining.value + seconds)
    saveState()
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
