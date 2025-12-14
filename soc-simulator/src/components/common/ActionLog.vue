<script setup>
import { ref } from 'vue'
import { useGameStore } from '../../stores/game'
import { useAlertsStore } from '../../stores/alerts'
import { useTicketsStore } from '../../stores/tickets'
import { useCommsStore } from '../../stores/comms'
import { useEvidenceStore } from '../../stores/evidence'
import { generateSessionReport } from '../../utils/exportPdf'
import { 
  Settings, 
  Coins, 
  Play, 
  Megaphone, 
  MessageSquare, 
  FolderOpen, 
  FileText, 
  ShieldOff, 
  CheckCircle,
  FileDown,
  Loader2,
  Circle
} from 'lucide-vue-next'

const gameStore = useGameStore()
const alertsStore = useAlertsStore()
const ticketsStore = useTicketsStore()
const commsStore = useCommsStore()
const evidenceStore = useEvidenceStore()

const isExporting = ref(false)

async function exportPdf() {
  isExporting.value = true
  try {
    await generateSessionReport(gameStore, alertsStore, ticketsStore, commsStore, evidenceStore)
    gameStore.addNotification('Session report exported successfully', 'success')
  } catch (error) {
    console.error('Export failed:', error)
    gameStore.addNotification('Failed to export report', 'danger')
  } finally {
    isExporting.value = false
  }
}

const typeIcons = {
  system: Settings,
  token: Coins,
  action: Play,
  event: Megaphone,
  comms: MessageSquare,
  evidence: FolderOpen,
  note: FileText,
  containment: ShieldOff,
  assessment: CheckCircle,
  default: Circle
}

function getTypeIcon(type) {
  return typeIcons[type] || typeIcons.default
}

function getTypeClass(type) {
  switch (type) {
    case 'system': return 'text-soc-muted'
    case 'token': return 'text-soc-accent'
    case 'action': return 'text-soc-text'
    case 'event': return 'text-soc-warning'
    case 'comms': return 'text-blue-400'
    case 'evidence': return 'text-soc-success'
    case 'containment': return 'text-soc-danger'
    case 'assessment': return 'text-purple-400'
    default: return 'text-soc-text'
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Action Log</h2>
        <p class="text-sm text-soc-muted">Complete record of team actions</p>
      </div>
      
      <div class="text-sm text-soc-muted">
        {{ gameStore.actionLog.length }} entries
      </div>
    </div>
    
    <!-- Log Entries -->
    <div class="flex-1 overflow-y-auto bg-soc-surface border border-soc-border rounded-lg">
      <div v-if="gameStore.actionLog.length === 0" class="text-center text-soc-muted py-8">
        No actions recorded yet
      </div>
      
      <div 
        v-for="entry in gameStore.actionLog" 
        :key="entry.id"
        class="px-4 py-3 border-b border-soc-border last:border-b-0 hover:bg-soc-raised/50"
      >
        <div class="flex items-start gap-3">
          <component :is="getTypeIcon(entry.type)" class="w-5 h-5 shrink-0 mt-0.5" :class="getTypeClass(entry.type)" />
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-mono text-xs text-soc-muted">{{ entry.gameTime }}</span>
              <span class="text-xs text-soc-muted">•</span>
              <span class="text-xs text-soc-muted">{{ formatTime(entry.timestamp) }}</span>
            </div>
            <p :class="getTypeClass(entry.type)">{{ entry.message }}</p>
            <p v-if="entry.details?.content" class="text-xs text-soc-muted mt-1 truncate">
              {{ entry.details.content.substring(0, 100) }}...
            </p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Export Button -->
    <div class="mt-4">
      <button 
        @click="exportPdf"
        :disabled="isExporting"
        class="w-full py-3 bg-soc-accent text-black font-semibold rounded-lg hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-wait"
      >
<Loader2 v-if="isExporting" class="w-5 h-5 inline animate-spin mr-2" />
        <FileDown v-else class="w-5 h-5 inline mr-2" />
        {{ isExporting ? 'Generating PDF...' : 'Export Session Report (PDF)' }}
      </button>
    </div>
  </div>
</template>
