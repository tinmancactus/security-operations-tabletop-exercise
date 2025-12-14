<script setup>
import { computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { useAlertsStore } from '../../stores/alerts'

const props = defineProps({
  alert: Object
})

const emit = defineEmits(['action'])

const gameStore = useGameStore()
const alertsStore = useAlertsStore()

// Compute all available actions including dynamic "Block IP" action
const allActions = computed(() => {
  const actions = [...(props.alert.actions || [])]
  
  // Add "Block this IP" action if alert has a source IP
  if (props.alert.source) {
    // Check if there isn't already a block-ip action for this IP in the static actions
    const hasBlockAction = actions.some(a => a.id === `block-ip-${props.alert.source}`)
    if (!hasBlockAction) {
      actions.push({
        id: `block-ip-${props.alert.source}`,
        label: 'Block this IP',
        cost: 1,
        description: `Request Infrastructure to block ${props.alert.source}`,
        isBlockIP: true,
        ip: props.alert.source
      })
    }
  }
  
  return actions
})

function isActionCompleted(action) {
  if (action.isBlockIP && action.ip) {
    return alertsStore.isIPBlocked(action.ip)
  }
  return false
}

function getSeverityClass(severity) {
  switch (severity) {
    case 'critical': return 'bg-soc-danger'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-soc-warning'
    case 'low': return 'bg-blue-500'
    default: return 'bg-soc-muted'
  }
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString('en-AU', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
}
</script>

<template>
  <div class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-soc-border">
      <div class="flex items-center gap-3 mb-2">
        <span 
          class="px-2 py-1 rounded text-sm font-semibold uppercase text-black"
          :class="getSeverityClass(alert.severity)"
        >
          {{ alert.severity }}
        </span>
        <span class="font-mono text-soc-muted">{{ alert.id }}</span>
      </div>
      <h2 class="text-lg font-semibold text-soc-text">{{ alert.title }}</h2>
      <p class="text-sm text-soc-muted mt-1">{{ formatTimestamp(alert.timestamp) }}</p>
    </div>
    
    <!-- Metadata -->
    <div class="p-4 border-b border-soc-border bg-soc-raised/50">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div v-if="alert.source">
          <span class="text-soc-muted">Source IP:</span>
          <span class="ml-2 font-mono text-soc-text">{{ alert.source }}</span>
        </div>
        <div v-if="alert.target">
          <span class="text-soc-muted">Target:</span>
          <span class="ml-2 text-soc-text">{{ alert.target }}</span>
        </div>
        <div v-if="alert.user">
          <span class="text-soc-muted">User:</span>
          <span class="ml-2 font-mono text-soc-text">{{ alert.user }}</span>
        </div>
        <div v-if="alert.attempts">
          <span class="text-soc-muted">Attempts:</span>
          <span class="ml-2 text-soc-text">{{ alert.attempts }}</span>
        </div>
      </div>
    </div>
    
    <!-- Details -->
    <div class="p-4 border-b border-soc-border">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Details</h3>
      <pre class="text-sm text-soc-text whitespace-pre-wrap font-mono bg-soc-bg p-4 rounded">{{ alert.details }}</pre>
    </div>
    
    <!-- Actions -->
    <div v-if="allActions.length > 0" class="p-4">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-3">Available Actions</h3>
      <div class="space-y-2">
        <button
          v-for="action in allActions"
          :key="action.id"
          @click="emit('action', action)"
          :disabled="isActionCompleted(action)"
          class="w-full p-3 rounded-lg border text-left transition-all"
          :class="isActionCompleted(action)
            ? 'bg-soc-success/10 border-soc-success opacity-60 cursor-not-allowed'
            : gameStore.tokens >= action.cost 
              ? 'bg-soc-raised border-soc-border hover:border-soc-accent' 
              : 'bg-soc-bg border-soc-border opacity-50 cursor-not-allowed'"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium text-soc-text">
              {{ isActionCompleted(action) ? '✓ ' : '' }}{{ action.label }}
            </span>
            <span 
              v-if="!isActionCompleted(action)"
              class="text-sm px-2 py-0.5 rounded"
              :class="gameStore.tokens >= action.cost ? 'bg-soc-accent text-black' : 'bg-soc-border text-soc-muted'"
            >
              {{ action.cost }} token{{ action.cost > 1 ? 's' : '' }}
            </span>
            <span v-else class="text-sm text-soc-success">Completed</span>
          </div>
          <p class="text-sm text-soc-muted mt-1">{{ action.description }}</p>
        </button>
      </div>
    </div>
  </div>
</template>
