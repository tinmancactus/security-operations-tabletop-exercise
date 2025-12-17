<script setup>
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from './stores/game'
import { useAlertsStore } from './stores/alerts'
import { useTicketsStore } from './stores/tickets'
import { useCommsStore } from './stores/comms'
import { useEvidenceStore } from './stores/evidence'
import { AlertTriangle } from 'lucide-vue-next'

import StartScreen from './components/shell/StartScreen.vue'
import AppHeader from './components/shell/AppHeader.vue'
import AppSidebar from './components/shell/AppSidebar.vue'
import NotificationToast from './components/common/NotificationToast.vue'
import SiemDashboard from './components/siem/SiemDashboard.vue'
import TicketQueue from './components/tickets/TicketQueue.vue'
import CommsPanel from './components/comms/CommsPanel.vue'
import EvidencePanel from './components/common/EvidencePanel.vue'
import ActionLog from './components/common/ActionLog.vue'
import OrgChart from './components/orgchart/OrgChart.vue'
import LogViewer from './components/logs/LogViewer.vue'
import ThreatIntelPortal from './components/threatintel/ThreatIntelPortal.vue'

import scenario from '../scenarios/operation-glasshouse/session-1/index.js'

const gameStore = useGameStore()
const alertsStore = useAlertsStore()
const ticketsStore = useTicketsStore()
const commsStore = useCommsStore()
const evidenceStore = useEvidenceStore()

const showResumePrompt = ref(false)
const showResetConfirm = ref(false)

onMounted(() => {
  // Load scenario data
  gameStore.loadScenario(scenario)
  alertsStore.loadAlerts(scenario.alerts)
  ticketsStore.loadTickets(scenario.tickets)
  commsStore.loadNPCs(scenario.npcs)
  evidenceStore.loadEvidence(scenario.evidence)
  
  // Check for saved state
  if (gameStore.loadState()) {
    alertsStore.loadState()
    ticketsStore.loadState()
    commsStore.loadState()
    evidenceStore.loadState()
    showResumePrompt.value = true
  }
})

// Watch for timed events
watch(() => gameStore.timeRemaining, (newTime) => {
  if (!gameStore.isRunning) return
  
  const elapsed = scenario.config.duration - newTime
  
  scenario.events.forEach(event => {
    if (elapsed >= event.triggerAt && !triggeredEvents.value.includes(event.id)) {
      triggerEvent(event)
    }
  })
})

const triggeredEvents = ref([])

function triggerEvent(event) {
  triggeredEvents.value.push(event.id)
  
  if (event.type === 'alert') {
    alertsStore.showAlert(event.alertId)
  } else if (event.type === 'message') {
    commsStore.receiveMessage(event.npcId, event.content, true)
  }
  
  if (event.notification) {
    // Include navigation data based on event type
    const navigateTo = event.type === 'message' ? 'comms' : event.type === 'alert' ? 'siem' : null
    const data = event.type === 'message' ? { npcId: event.npcId } : event.type === 'alert' ? { alertId: event.alertId } : null
    gameStore.addNotification(event.notification.message, event.notification.type, navigateTo, data)
  }
  
  if (event.pauseTimer) {
    gameStore.pauseTimer()
  }
}

function handleStart() {
  showResumePrompt.value = false
  // Load pre-existing message history, then send initial messages
  commsStore.loadMessageHistory()
  commsStore.sendInitialMessages()
}

function handleResume() {
  showResumePrompt.value = false
  // Resume timer on page refresh
  gameStore.resumeTimer()
}

function handleNewGame() {
  resetSession()
  gameStore.startSession()
  // Load pre-existing message history, then send initial messages
  commsStore.loadMessageHistory()
  commsStore.sendInitialMessages()
}

function resetSession() {
  gameStore.pauseTimer()
  gameStore.clearState()
  alertsStore.clearState()
  ticketsStore.clearState()
  commsStore.clearState()
  evidenceStore.clearState()
  
  // Reload scenario
  alertsStore.loadAlerts(scenario.alerts)
  ticketsStore.loadTickets(scenario.tickets)
  commsStore.loadNPCs(scenario.npcs)
  evidenceStore.loadEvidence(scenario.evidence)
  
  triggeredEvents.value = []
  showResumePrompt.value = false
  showResetConfirm.value = false
}

function confirmReset() {
  showResetConfirm.value = true
}

function cancelReset() {
  showResetConfirm.value = false
}

function executeReset() {
  resetSession()
  // Return to welcome screen (sessionStarted is now false)
}

const currentComponent = {
  siem: SiemDashboard,
  tickets: TicketQueue,
  comms: CommsPanel,
  evidence: EvidencePanel,
  orgchart: OrgChart,
  logs: LogViewer,
  threatintel: ThreatIntelPortal,
  log: ActionLog
}
</script>

<template>
  <div class="min-h-screen bg-soc-bg">
    <!-- Start Screen -->
    <StartScreen 
      v-if="!gameStore.sessionStarted"
      :scenario="scenario"
      :show-resume="showResumePrompt"
      @start="handleStart"
      @resume="handleResume"
      @new-game="handleNewGame"
    />
    
    <!-- Main App -->
    <div v-else class="flex flex-col h-screen">
      <AppHeader @reset="confirmReset" />
      
      <div class="flex flex-1 overflow-hidden relative">
        <AppSidebar :class="{ 'blur-sm pointer-events-none': !gameStore.isRunning && !gameStore.timeExpired }" />
        
        <main class="flex-1 overflow-auto p-4 relative" :class="{ 'blur-sm pointer-events-none': !gameStore.isRunning && !gameStore.timeExpired }">
          <NotificationToast />
          <component :is="currentComponent[gameStore.currentView]" />
        </main>
        
        <!-- Pause Overlay -->
        <div 
          v-if="!gameStore.isRunning && !gameStore.timeExpired"
          class="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <div class="text-4xl font-bold text-white tracking-widest">PAUSED</div>
        </div>
      </div>
    </div>
    
    <!-- Reset Confirmation Modal -->
    <div 
      v-if="showResetConfirm" 
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-100"
      @click.self="cancelReset"
    >
      <div class="bg-soc-surface border border-soc-danger rounded-lg p-6 max-w-md mx-4">
        <h2 class="text-xl font-bold text-soc-danger mb-3">Reset Session?</h2>
        <p class="text-soc-text mb-4">
          This will completely reset the session, clearing all progress, evidence collected, 
          and communications. You will return to the welcome screen.
        </p>
        <p class="text-soc-warning text-sm mb-6 flex items-center gap-2">
          <AlertTriangle class="w-4 h-4" />
          This action cannot be undone.
        </p>
        <div class="flex gap-3">
          <button 
            @click="cancelReset"
            class="flex-1 py-2 px-4 bg-soc-raised border border-soc-border rounded hover:bg-soc-border transition"
          >
            Cancel
          </button>
          <button 
            @click="executeReset"
            class="flex-1 py-2 px-4 bg-soc-danger text-white font-semibold rounded hover:bg-red-500 transition"
          >
            Reset Session
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
