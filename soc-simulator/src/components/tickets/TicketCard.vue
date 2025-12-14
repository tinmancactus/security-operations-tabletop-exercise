<script setup>
import { computed } from 'vue'
import { useTicketsStore } from '../../stores/tickets'

const props = defineProps({
  ticket: Object,
  selected: Boolean
})

defineEmits(['click'])

const ticketsStore = useTicketsStore()
const isClosed = computed(() => ticketsStore.isTicketClosed(props.ticket.id))

function getPriorityClass(priority) {
  switch (priority) {
    case 'critical': return 'bg-soc-danger'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-soc-warning'
    case 'low': return 'bg-blue-500'
    default: return 'bg-soc-muted'
  }
}

function formatDate(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleDateString('en-AU', { day: 'numeric', month: 'short' })
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
          :class="getPriorityClass(ticket.priority)"
        >
          {{ ticket.priority }}
        </span>
        <span class="text-xs text-soc-muted font-mono">{{ ticket.id }}</span>
        <span v-if="isClosed" class="text-xs px-1.5 py-0.5 rounded bg-soc-success/20 text-soc-success">
          ✓ Closed
        </span>
      </div>
      <span class="text-xs text-soc-muted">{{ formatDate(ticket.submitted) }}</span>
    </div>
    
    <h3 class="font-medium text-soc-text mb-1">{{ ticket.subject }}</h3>
    
    <div class="text-xs text-soc-muted">
      <p>From: {{ ticket.from.name }} ({{ ticket.from.department }})</p>
    </div>
  </div>
</template>
