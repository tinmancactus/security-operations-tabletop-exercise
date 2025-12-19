<script setup>
import { ref } from 'vue'
import { useGameStore } from '../../stores/game'
import { useAlertsStore } from '../../stores/alerts'
import { useTicketsStore } from '../../stores/tickets'
import { useCommsStore } from '../../stores/comms'
import { useEvidenceStore } from '../../stores/evidence'
import { generateSessionReport } from '../../utils/exportPdf'
import { Clock, Download, X, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const gameStore = useGameStore()
const alertsStore = useAlertsStore()
const ticketsStore = useTicketsStore()
const commsStore = useCommsStore()
const evidenceStore = useEvidenceStore()

const isDownloading = ref(false)

async function downloadReport() {
  isDownloading.value = true
  try {
    await generateSessionReport(gameStore, alertsStore, ticketsStore, commsStore, evidenceStore)
  } finally {
    isDownloading.value = false
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-100">
    <div class="bg-soc-surface border border-soc-border rounded-lg p-8 max-w-lg mx-4 relative">
      <!-- Close button -->
      <button 
        @click="emit('close')"
        class="absolute top-4 right-4 text-soc-muted hover:text-soc-text transition"
        title="Close (you can still browse the session)"
      >
        <X class="w-5 h-5" />
      </button>
      
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <div class="w-12 h-12 rounded-full bg-soc-warning/20 flex items-center justify-center">
          <Clock class="w-6 h-6 text-soc-warning" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-soc-text">
            {{ config.title || 'Session Complete' }}
          </h2>
          <p class="text-soc-muted text-sm">{{ gameStore.inGameTime }}</p>
        </div>
      </div>
      
      <!-- Message -->
      <p class="text-soc-text mb-6">
        {{ config.message || 'Your shift has ended. Time to hand over to the next team.' }}
      </p>
      
      <!-- Download section -->
      <div class="bg-soc-raised border border-soc-border rounded-lg p-4 mb-6">
        <div class="flex items-start gap-3 mb-4">
          <AlertTriangle class="w-5 h-5 text-soc-warning shrink-0 mt-0.5" />
          <p class="text-soc-warning text-sm">
            {{ config.downloadWarning || 'You must save your session report now. It will not be available to download later.' }}
          </p>
        </div>
        
        <button
          @click="downloadReport"
          :disabled="isDownloading"
          class="w-full py-3 px-4 bg-soc-accent text-white font-semibold rounded-lg hover:bg-blue-500 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Download class="w-5 h-5" />
          {{ isDownloading ? 'Generating...' : 'Download Session Report' }}
        </button>
      </div>
      
      <!-- Instructions -->
      <p class="text-soc-muted text-sm mb-4">
        {{ config.instructions || 'Follow any instructions from your tutor regarding submission.' }}
      </p>
      
      <!-- Close hint -->
      <p class="text-soc-muted text-xs text-center">
        You can close this dialog to review the session artifacts.
      </p>
    </div>
  </div>
</template>
