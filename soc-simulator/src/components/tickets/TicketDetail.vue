<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { useTicketsStore } from '../../stores/tickets'
import { useEvidenceStore } from '../../stores/evidence'
import { Paperclip } from 'lucide-vue-next'

const props = defineProps({
  ticket: Object
})

const emit = defineEmits(['action'])

const gameStore = useGameStore()
const ticketsStore = useTicketsStore()
const evidenceStore = useEvidenceStore()

const noteInput = ref('')

// Filter actions based on requiresEvidence - show completed ones too
const availableActions = computed(() => {
  if (!props.ticket.actions) return []
  return props.ticket.actions.filter(action => {
    // Always show completed actions
    if (ticketsStore.isActionCompleted(action.id)) return true
    
    // Check evidence requirements for non-completed actions
    if (action.requiresEvidence) {
      const hasEvidence = action.requiresEvidence.some(evId => evidenceStore.isUnlocked(evId))
      if (!hasEvidence) return false
    }
    // Check if action is still available (not blocked by exclusive group)
    return ticketsStore.isActionAvailable(action, props.ticket)
  })
})

// Check if ticket is closed
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

function formatTimestamp(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleString('en-AU', { 
    dateStyle: 'medium', 
    timeStyle: 'short' 
  })
}

function addNote() {
  if (noteInput.value.trim()) {
    ticketsStore.addNote(props.ticket.id, noteInput.value.trim())
    noteInput.value = ''
  }
}
</script>

<template>
  <div class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-soc-border">
      <div class="flex items-center gap-3 mb-2">
        <span 
          class="px-2 py-1 rounded text-sm font-semibold uppercase text-black"
          :class="getPriorityClass(ticket.priority)"
        >
          {{ ticket.priority }}
        </span>
        <span class="font-mono text-soc-muted">{{ ticket.id }}</span>
        <span 
          class="text-xs px-2 py-0.5 rounded"
          :class="isClosed ? 'bg-soc-success/20 text-soc-success' : 'bg-soc-raised text-soc-muted'"
        >
          {{ isClosed ? 'closed' : ticket.status }}
        </span>
      </div>
      <h2 class="text-lg font-semibold text-soc-text">{{ ticket.subject }}</h2>
    </div>
    
    <!-- Metadata -->
    <div class="p-4 border-b border-soc-border bg-soc-raised/50">
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span class="text-soc-muted">From:</span>
          <span class="ml-2 text-soc-text">{{ ticket.from.name }}</span>
        </div>
        <div>
          <span class="text-soc-muted">Department:</span>
          <span class="ml-2 text-soc-text">{{ ticket.from.department }}</span>
        </div>
        <div>
          <span class="text-soc-muted">Submitted:</span>
          <span class="ml-2 text-soc-text">{{ formatTimestamp(ticket.submitted) }}</span>
        </div>
        <div>
          <span class="text-soc-muted">Category:</span>
          <span class="ml-2 text-soc-text">{{ ticket.category }}</span>
        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div class="p-4 border-b border-soc-border">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Message</h3>
      <div class="bg-soc-bg p-4 rounded whitespace-pre-wrap text-soc-text">{{ ticket.content }}</div>
      
      <p v-if="ticket.attachment" class="mt-2 text-sm text-soc-muted flex items-center gap-1">
        <Paperclip class="w-4 h-4" />
        Attachment: {{ ticket.attachment }}
      </p>
    </div>
    
    <!-- Actions -->
    <div v-if="availableActions.length > 0" class="p-4 border-b border-soc-border">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-3">Available Actions</h3>
      <div class="space-y-2">
        <button
          v-for="action in availableActions"
          :key="action.id"
          @click="emit('action', action)"
          :disabled="ticketsStore.isActionCompleted(action.id)"
          class="w-full p-3 rounded-lg border text-left transition-all"
          :class="ticketsStore.isActionCompleted(action.id)
            ? 'bg-soc-success/10 border-soc-success opacity-60 cursor-not-allowed'
            : gameStore.tokens >= action.cost 
              ? 'bg-soc-raised border-soc-border hover:border-soc-accent' 
              : 'bg-soc-bg border-soc-border opacity-50 cursor-not-allowed'"
        >
          <div class="flex justify-between items-center">
            <span class="font-medium text-soc-text">
              {{ ticketsStore.isActionCompleted(action.id) ? '✓ ' : '' }}{{ action.label }}
            </span>
            <span 
              v-if="!ticketsStore.isActionCompleted(action.id)"
              class="text-sm px-2 py-0.5 rounded"
              :class="gameStore.tokens >= action.cost ? 'bg-soc-accent text-black' : 'bg-soc-border text-soc-muted'"
            >
              {{ action.cost }} tokens
            </span>
            <span v-else class="text-sm text-soc-success">Completed</span>
          </div>
          <p class="text-sm text-soc-muted mt-1">{{ action.description }}</p>
        </button>
      </div>
    </div>
    
    <!-- Notes -->
    <div class="p-4">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-3">Your Notes</h3>
      
      <div v-if="ticketsStore.ticketNotes[ticket.id]" class="bg-soc-bg p-3 rounded mb-3 text-sm whitespace-pre-wrap">
        {{ ticketsStore.ticketNotes[ticket.id] }}
      </div>
      
      <div class="flex gap-2">
        <input
          v-model="noteInput"
          @keyup.enter="addNote"
          type="text"
          placeholder="Add a note..."
          class="flex-1 bg-soc-bg border border-soc-border rounded px-3 py-2 text-sm focus:outline-none focus:border-soc-accent"
        />
        <button
          @click="addNote"
          class="px-4 py-2 bg-soc-raised border border-soc-border rounded text-sm hover:bg-soc-border transition"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>
