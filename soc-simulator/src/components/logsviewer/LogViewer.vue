<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { Search, User, MapPin } from 'lucide-vue-next'

const gameStore = useGameStore()

const allLogs = computed(() => gameStore.scenario?.logs || [])

// Filter logs to only show those at or before current in-game time
const logs = computed(() => {
  const totalDuration = gameStore.scenario?.config?.duration || 3600
  const elapsedSeconds = totalDuration - gameStore.timeRemaining
  const elapsedMinutes = Math.floor(elapsedSeconds / 60)
  
  // Start time from config (default 8:00am = 480 minutes from midnight)
  const startHour = gameStore.scenario?.config?.startTime?.hour ?? 8
  const startMinute = gameStore.scenario?.config?.startTime?.minute ?? 0
  const currentGameMinutes = (startHour * 60 + startMinute) + elapsedMinutes
  
  return allLogs.value.filter(log => {
    // Parse the log timestamp to get minutes from midnight
    const logDate = new Date(log.timestamp)
    const logMinutes = logDate.getHours() * 60 + logDate.getMinutes()
    
    // Only show logs at or before current in-game time
    return logMinutes <= currentGameMinutes
  })
})

// Filters
const searchQuery = ref('')
const systemFilter = ref('all')
const typeFilter = ref('all')
const severityFilter = ref('all')
const userFilter = ref('')

// Get unique values for filter dropdowns
const systems = computed(() => {
  const unique = [...new Set(logs.value.map(l => l.system))]
  return unique.sort()
})

const types = computed(() => {
  const unique = [...new Set(logs.value.map(l => l.type))]
  return unique.sort()
})

const severities = ['critical', 'high', 'medium', 'low', 'info']

// Filtered logs
const filteredLogs = computed(() => {
  return logs.value.filter(log => {
    // System filter
    if (systemFilter.value !== 'all' && log.system !== systemFilter.value) return false
    
    // Type filter
    if (typeFilter.value !== 'all' && log.type !== typeFilter.value) return false
    
    // Severity filter
    if (severityFilter.value !== 'all' && log.severity !== severityFilter.value) return false
    
    // User filter
    if (userFilter.value && log.user && !log.user.toLowerCase().includes(userFilter.value.toLowerCase())) return false
    
    // Search query (searches message, details, user, source)
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      const searchable = [
        log.message,
        log.details,
        log.user,
        log.source,
        log.action,
        log.id
      ].filter(Boolean).join(' ').toLowerCase()
      
      if (!searchable.includes(query)) return false
    }
    
    return true
  }).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
})

// Selected log for detail view
const selectedLogId = ref(null)
const selectedLog = computed(() => logs.value.find(l => l.id === selectedLogId.value))

function selectLog(logId) {
  selectedLogId.value = logId
}

function getSeverityClass(severity) {
  switch (severity) {
    case 'critical': return 'bg-soc-danger text-white'
    case 'high': return 'bg-orange-500 text-white'
    case 'medium': return 'bg-soc-warning text-black'
    case 'low': return 'bg-blue-500 text-white'
    case 'info': return 'bg-soc-muted text-white'
    default: return 'bg-soc-border text-soc-text'
  }
}

function getSeverityDot(severity) {
  switch (severity) {
    case 'critical': return 'bg-soc-danger'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-soc-warning'
    case 'low': return 'bg-blue-500'
    case 'info': return 'bg-soc-muted'
    default: return 'bg-soc-border'
  }
}

function formatTimestamp(ts) {
  const date = new Date(ts)
  return date.toLocaleString('en-AU', { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
}

function clearFilters() {
  searchQuery.value = ''
  systemFilter.value = 'all'
  typeFilter.value = 'all'
  severityFilter.value = 'all'
  userFilter.value = ''
}

const hasActiveFilters = computed(() => {
  return searchQuery.value || systemFilter.value !== 'all' || typeFilter.value !== 'all' || severityFilter.value !== 'all' || userFilter.value
})
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Log Viewer</h2>
        <p class="text-sm text-soc-muted">Search and analyse system logs</p>
      </div>
      
      <div class="text-sm text-soc-muted">
        {{ filteredLogs.length }} / {{ logs.length }} entries
      </div>
    </div>
    
    <!-- Search & Filters -->
    <div class="bg-soc-surface border border-soc-border rounded-lg p-4 mb-4">
      <!-- Search Bar -->
      <div class="flex gap-4 mb-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search logs (message, user, IP, details...)"
            class="w-full bg-soc-bg border border-soc-border rounded px-4 py-2 pl-10 text-sm focus:outline-none focus:border-soc-accent"
          />
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-soc-muted w-5 h-5" />
        </div>
        <button
          v-if="hasActiveFilters"
          @click="clearFilters"
          class="px-4 py-2 text-sm text-soc-muted hover:text-soc-text border border-soc-border rounded hover:bg-soc-raised transition"
        >
          Clear Filters
        </button>
      </div>
      
      <!-- Filter Row -->
      <div class="flex gap-4 flex-wrap">
        <!-- System Filter -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-soc-muted uppercase">System:</label>
          <select 
            v-model="systemFilter"
            class="bg-soc-bg border border-soc-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-soc-accent"
          >
            <option value="all">All Systems</option>
            <option v-for="sys in systems" :key="sys" :value="sys">{{ sys }}</option>
          </select>
        </div>
        
        <!-- Type Filter -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-soc-muted uppercase">Type:</label>
          <select 
            v-model="typeFilter"
            class="bg-soc-bg border border-soc-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-soc-accent"
          >
            <option value="all">All Types</option>
            <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
          </select>
        </div>
        
        <!-- Severity Filter -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-soc-muted uppercase">Severity:</label>
          <select 
            v-model="severityFilter"
            class="bg-soc-bg border border-soc-border rounded px-3 py-1.5 text-sm focus:outline-none focus:border-soc-accent"
          >
            <option value="all">All Severities</option>
            <option v-for="s in severities" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        
        <!-- User Filter -->
        <div class="flex items-center gap-2">
          <label class="text-xs text-soc-muted uppercase">User:</label>
          <input
            v-model="userFilter"
            type="text"
            placeholder="Filter by user..."
            class="bg-soc-bg border border-soc-border rounded px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-soc-accent"
          />
        </div>
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Log List -->
      <div class="w-1/2 overflow-y-auto bg-soc-surface border border-soc-border rounded-lg">
        <div v-if="filteredLogs.length === 0" class="text-center text-soc-muted py-8">
          No logs match your filters
        </div>
        
        <div 
          v-for="log in filteredLogs" 
          :key="log.id"
          @click="selectLog(log.id)"
          class="px-4 py-3 border-b border-soc-border cursor-pointer transition-all hover:bg-soc-raised/50"
          :class="selectedLogId === log.id ? 'bg-soc-raised border-l-2 border-l-soc-accent' : ''"
        >
          <div class="flex items-start gap-3">
            <div 
              class="w-2 h-2 rounded-full mt-2 shrink-0"
              :class="getSeverityDot(log.severity)"
            />
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-soc-muted">{{ formatTimestamp(log.timestamp) }}</span>
                <span class="text-xs px-1 py-0.5 rounded bg-soc-raised text-soc-muted">{{ log.system }}</span>
              </div>
              <p class="text-sm text-soc-text truncate">{{ log.message }}</p>
              <div class="flex items-center gap-2 mt-1 text-xs text-soc-muted">
                <span v-if="log.user" class="flex items-center gap-1"><User class="w-3 h-3" /> {{ log.user }}</span>
                <span v-if="log.source" class="flex items-center gap-1"><MapPin class="w-3 h-3" /> {{ log.source }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Log Detail -->
      <div class="w-1/2 overflow-y-auto">
        <div 
          v-if="selectedLog"
          class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden"
        >
          <!-- Header -->
          <div class="p-4 border-b border-soc-border">
            <div class="flex items-center gap-3 mb-2">
              <span 
                class="px-2 py-1 rounded text-xs font-semibold uppercase"
                :class="getSeverityClass(selectedLog.severity)"
              >
                {{ selectedLog.severity }}
              </span>
              <span class="font-mono text-soc-muted text-sm">{{ selectedLog.id }}</span>
            </div>
            <p class="text-soc-text font-medium">{{ selectedLog.message }}</p>
          </div>
          
          <!-- Metadata -->
          <div class="p-4 border-b border-soc-border bg-soc-raised/50">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-soc-muted">Timestamp:</span>
                <span class="ml-2 text-soc-text font-mono">{{ formatTimestamp(selectedLog.timestamp) }}</span>
              </div>
              <div>
                <span class="text-soc-muted">System:</span>
                <span class="ml-2 text-soc-text">{{ selectedLog.system }}</span>
              </div>
              <div>
                <span class="text-soc-muted">Type:</span>
                <span class="ml-2 text-soc-text">{{ selectedLog.type }}</span>
              </div>
              <div>
                <span class="text-soc-muted">Action:</span>
                <span class="ml-2 text-soc-text">{{ selectedLog.action }}</span>
              </div>
              <div v-if="selectedLog.user">
                <span class="text-soc-muted">User:</span>
                <span class="ml-2 text-soc-text font-mono">{{ selectedLog.user }}</span>
              </div>
              <div v-if="selectedLog.source">
                <span class="text-soc-muted">Source IP:</span>
                <span class="ml-2 text-soc-text font-mono">{{ selectedLog.source }}</span>
              </div>
            </div>
          </div>
          
          <!-- Details -->
          <div class="p-4">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Details</h3>
            <pre class="text-sm text-soc-text whitespace-pre-wrap font-mono bg-soc-bg p-4 rounded">{{ selectedLog.details }}</pre>
          </div>
          
          <!-- Quick Actions -->
          <div class="p-4 border-t border-soc-border bg-soc-raised/30">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-3">Quick Filters</h3>
            <div class="flex flex-wrap gap-2">
              <button 
                v-if="selectedLog.user"
                @click="userFilter = selectedLog.user; selectedLogId = null"
                class="px-3 py-1.5 text-xs bg-soc-bg border border-soc-border rounded hover:border-soc-accent transition"
              >
                Filter by this user
              </button>
              <button 
                v-if="selectedLog.source"
                @click="searchQuery = selectedLog.source; selectedLogId = null"
                class="px-3 py-1.5 text-xs bg-soc-bg border border-soc-border rounded hover:border-soc-accent transition"
              >
                Filter by this IP
              </button>
              <button 
                @click="systemFilter = selectedLog.system; selectedLogId = null"
                class="px-3 py-1.5 text-xs bg-soc-bg border border-soc-border rounded hover:border-soc-accent transition"
              >
                Filter by {{ selectedLog.system }}
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="h-full flex items-center justify-center text-soc-muted">
          Select a log entry to view details
        </div>
      </div>
    </div>
  </div>
</template>
