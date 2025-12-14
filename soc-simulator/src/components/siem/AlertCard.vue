<script setup>
import { AlertTriangle } from 'lucide-vue-next'

defineProps({
  alert: Object,
  selected: Boolean
})

defineEmits(['click'])

function getSeverityClass(severity) {
  switch (severity) {
    case 'critical': return 'bg-soc-danger'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-soc-warning'
    case 'low': return 'bg-blue-500'
    default: return 'bg-soc-muted'
  }
}

function formatTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div 
    @click="$emit('click')"
    class="p-4 rounded-lg border cursor-pointer transition-all"
    :class="selected 
      ? 'bg-soc-raised border-soc-accent' 
      : 'bg-soc-surface border-soc-border hover:border-soc-accent/50'"
  >
    <div class="flex items-start justify-between mb-2">
      <div class="flex items-center gap-2">
        <span 
          class="px-2 py-0.5 rounded text-xs font-semibold uppercase text-black"
          :class="getSeverityClass(alert.severity)"
        >
          {{ alert.severity }}
        </span>
        <span class="text-xs text-soc-muted font-mono">{{ alert.id }}</span>
      </div>
      <span class="text-xs text-soc-muted">{{ formatTime(alert.timestamp) }}</span>
    </div>
    
    <h3 class="font-medium text-soc-text mb-1">{{ alert.title }}</h3>
    
    <div class="text-xs text-soc-muted space-y-0.5">
      <p v-if="alert.source">Source: {{ alert.source }}</p>
      <p v-if="alert.user">User: {{ alert.user }}</p>
      <p v-if="alert.target">Target: {{ alert.target }}</p>
    </div>
    
    <!-- Cliffhanger indicator -->
    <div v-if="alert.isCliffhanger" class="mt-2 text-xs text-soc-danger font-semibold animate-pulse flex items-center gap-1">
      <AlertTriangle class="w-4 h-4" />
      CRITICAL — REQUIRES IMMEDIATE ATTENTION
    </div>
  </div>
</template>
