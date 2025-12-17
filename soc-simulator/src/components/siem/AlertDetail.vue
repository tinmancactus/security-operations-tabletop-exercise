<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { useAlertsStore } from '../../stores/alerts'
import { Pencil, Trash2, Check, X } from 'lucide-vue-next'

const props = defineProps({
  alert: Object
})

const emit = defineEmits(['action'])

const gameStore = useGameStore()
const alertsStore = useAlertsStore()

const noteInput = ref('')
const editingNoteId = ref(null)
const editingNoteText = ref('')

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
  // Check if this specific action has been completed
  if (alertsStore.isActionCompleted(action.id)) {
    return true
  }
  // Also check blocked IPs for dynamic block actions
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

function addNote() {
  if (noteInput.value.trim()) {
    alertsStore.addNote(props.alert.id, noteInput.value.trim())
    noteInput.value = ''
  }
}

function startEditNote(note) {
  editingNoteId.value = note.id
  editingNoteText.value = note.text
}

function saveEditNote() {
  if (editingNoteText.value.trim()) {
    alertsStore.updateNote(props.alert.id, editingNoteId.value, editingNoteText.value.trim())
  }
  cancelEditNote()
}

function cancelEditNote() {
  editingNoteId.value = null
  editingNoteText.value = ''
}

function deleteNote(noteId) {
  alertsStore.deleteNote(props.alert.id, noteId)
}

function formatNoteTime(timestamp) {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
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
    
    <!-- Notes -->
    <div class="p-4" :class="{ 'border-t border-soc-border': allActions.length > 0 }">
      <h3 class="text-sm font-semibold text-soc-muted uppercase mb-3">Your Notes</h3>
      
      <div v-if="alertsStore.alertNotes[alert.id]?.length" class="space-y-2 mb-3">
        <div 
          v-for="note in alertsStore.alertNotes[alert.id]" 
          :key="note.id"
          class="bg-soc-bg p-3 rounded text-sm group"
        >
          <!-- Edit mode -->
          <div v-if="editingNoteId === note.id" class="space-y-2">
            <textarea
              v-model="editingNoteText"
              @keyup.escape="cancelEditNote"
              rows="2"
              class="w-full bg-soc-surface border border-soc-border rounded px-2 py-1 text-sm focus:outline-none focus:border-soc-accent resize-none"
            />
            <div class="flex gap-2">
              <button
                @click="saveEditNote"
                class="flex items-center gap-1 px-2 py-1 bg-soc-success/20 text-soc-success rounded text-xs hover:bg-soc-success/30 transition"
              >
                <Check class="w-3 h-3" /> Save
              </button>
              <button
                @click="cancelEditNote"
                class="flex items-center gap-1 px-2 py-1 bg-soc-raised text-soc-muted rounded text-xs hover:bg-soc-border transition"
              >
                <X class="w-3 h-3" /> Cancel
              </button>
            </div>
          </div>
          <!-- View mode -->
          <div v-else class="flex justify-between items-start gap-2">
            <div class="flex-1">
              <p class="whitespace-pre-wrap">{{ note.text }}</p>
              <p class="text-xs text-soc-muted mt-1">{{ formatNoteTime(note.timestamp) }}</p>
            </div>
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="startEditNote(note)"
                class="p-1 text-soc-muted hover:text-soc-accent transition"
                title="Edit note"
              >
                <Pencil class="w-3.5 h-3.5" />
              </button>
              <button
                @click="deleteNote(note.id)"
                class="p-1 text-soc-muted hover:text-soc-danger transition"
                title="Delete note"
              >
                <Trash2 class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
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
