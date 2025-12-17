<script setup>
import { useAlertsStore } from '../../stores/alerts'
import { useGameStore } from '../../stores/game'
import { useEvidenceStore } from '../../stores/evidence'
import { useCommsStore } from '../../stores/comms'
import AlertCard from './AlertCard.vue'
import AlertDetail from './AlertDetail.vue'

const alertsStore = useAlertsStore()
const gameStore = useGameStore()
const evidenceStore = useEvidenceStore()
const commsStore = useCommsStore()

function handleAction(action) {
  // Check if time has expired
  if (gameStore.timeExpired) {
    gameStore.addNotification('Time has expired - no further actions can be taken', 'warning')
    return
  }
  
  // Check if action already completed
  if (alertsStore.isActionCompleted(action.id)) {
    gameStore.addNotification('Action already completed', 'info')
    return
  }
  
  if (action.cost > gameStore.tokens) {
    gameStore.addNotification(`Not enough tokens! Need ${action.cost}, have ${gameStore.tokens}`, 'warning')
    return
  }
  
  if (gameStore.spendTokens(action.cost, action.label)) {
    // Mark action as completed
    alertsStore.completeAction(action.id)
    gameStore.logAction(`SIEM Action: ${action.label}`, 'action', action)
    
    if (action.unlocksEvidence) {
      evidenceStore.unlockEvidence(action.unlocksEvidence)
    }
    
    if (action.id === 'disable-liam') {
      gameStore.addNotification('Account liam.fitzgerald has been disabled', 'success')
      gameStore.logAction('Disabled account: liam.fitzgerald@xyzpay.com.au', 'containment')
      // Trigger Rachel's follow-up message after delay
      commsStore.triggerRachelAccountDisable()
    }
    
    if (action.isBlockIP && action.ip) {
      alertsStore.blockIP(action.ip)
      gameStore.addNotification(`IP block request sent to Infrastructure: ${action.ip}`, 'success')
      gameStore.logAction(`Requested IP block: ${action.ip}`, 'containment')
    }
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">SIEM Dashboard</h2>
        <p class="text-sm text-soc-muted">Security Information and Event Management</p>
      </div>
      
      <!-- Alert Summary -->
      <div class="flex gap-4 text-sm">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-soc-danger"></span>
          <span>Critical: {{ alertsStore.alertCounts.critical }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-orange-500"></span>
          <span>High: {{ alertsStore.alertCounts.high }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-soc-warning"></span>
          <span>Medium: {{ alertsStore.alertCounts.medium }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-blue-500"></span>
          <span>Low: {{ alertsStore.alertCounts.low }}</span>
        </div>
      </div>
    </div>
    
    <!-- Filter Bar -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="f in ['all', 'critical', 'high', 'medium', 'low']"
        :key="f"
        @click="alertsStore.setFilter(f)"
        class="px-3 py-1 rounded text-sm capitalize transition"
        :class="alertsStore.filter === f 
          ? 'bg-soc-accent text-black' 
          : 'bg-soc-raised border border-soc-border hover:bg-soc-border'"
      >
        {{ f }}
      </button>
    </div>
    
    <!-- Content -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Alert List -->
      <div class="w-1/2 overflow-y-auto space-y-2 pr-2">
        <AlertCard
          v-for="alert in alertsStore.visibleAlerts"
          :key="alert.id"
          :alert="alert"
          :selected="alertsStore.selectedAlertId === alert.id"
          @click="alertsStore.selectAlert(alert.id)"
        />
        
        <div v-if="alertsStore.visibleAlerts.length === 0" class="text-center text-soc-muted py-8">
          No alerts match the current filter
        </div>
      </div>
      
      <!-- Alert Detail -->
      <div class="w-1/2 overflow-y-auto">
        <AlertDetail
          v-if="alertsStore.selectedAlert"
          :alert="alertsStore.selectedAlert"
          @action="handleAction"
        />
        <div v-else class="h-full flex items-center justify-center text-soc-muted">
          Select an alert to view details
        </div>
      </div>
    </div>
  </div>
</template>
