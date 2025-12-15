<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import { useEvidenceStore } from '../../stores/evidence'
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  HelpCircle,
  Search,
  SearchX,
  Coins
} from 'lucide-vue-next'

const gameStore = useGameStore()
const evidenceStore = useEvidenceStore()

const completedActions = ref(new Set())

const threatIntel = computed(() => gameStore.scenario?.threatintel || {})

const searchQuery = ref('')
const searchHistory = ref([])
const selectedResult = ref(null)

// Search across all IOC types
function search() {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return
  
  // Add to search history
  if (!searchHistory.value.includes(query)) {
    searchHistory.value.unshift(query)
    if (searchHistory.value.length > 10) searchHistory.value.pop()
  }
  
  // Search IPs
  const ipMatch = Object.entries(threatIntel.value.ips || {}).find(([ip]) => 
    ip.toLowerCase() === query
  )
  if (ipMatch) {
    selectedResult.value = { key: ipMatch[0], ...ipMatch[1] }
    logSearch(query, 'ip', ipMatch[1].reputation)
    return
  }
  
  // Search domains
  const domainMatch = Object.entries(threatIntel.value.domains || {}).find(([domain]) => 
    domain.toLowerCase() === query
  )
  if (domainMatch) {
    selectedResult.value = { key: domainMatch[0], ...domainMatch[1] }
    logSearch(query, 'domain', domainMatch[1].reputation)
    return
  }
  
  // Search hashes
  const hashMatch = Object.entries(threatIntel.value.hashes || {}).find(([hash]) => 
    hash.toLowerCase() === query
  )
  if (hashMatch) {
    selectedResult.value = { key: hashMatch[0], ...hashMatch[1] }
    logSearch(query, 'hash', hashMatch[1].reputation)
    return
  }
  
  // Search emails
  const emailMatch = Object.entries(threatIntel.value.emails || {}).find(([email]) => 
    email.toLowerCase() === query
  )
  if (emailMatch) {
    selectedResult.value = { key: emailMatch[0], ...emailMatch[1] }
    logSearch(query, 'email', emailMatch[1].reputation)
    return
  }
  
  // No match found
  selectedResult.value = { 
    key: query, 
    type: 'unknown',
    reputation: 'unknown',
    summary: 'No threat intelligence data available for this indicator.',
    recommendation: 'Consider searching external threat intel sources or submitting for analysis.'
  }
  logSearch(query, 'unknown', 'no-data')
}

function logSearch(query, type, result) {
  gameStore.logAction(`Threat intel lookup: ${query}`, 'threatintel', { type, result })
}

function quickSearch(query) {
  searchQuery.value = query
  search()
}

function getReputationClass(reputation) {
  switch (reputation) {
    case 'malicious': return 'bg-soc-danger text-white'
    case 'suspicious': return 'bg-soc-warning text-black'
    case 'clean': return 'bg-soc-success text-white'
    default: return 'bg-soc-muted text-white'
  }
}

const reputationIcons = {
  malicious: ShieldAlert,
  suspicious: AlertTriangle,
  clean: ShieldCheck,
  default: HelpCircle
}

function getReputationIcon(reputation) {
  return reputationIcons[reputation] || reputationIcons.default
}

function getRiskColor(score) {
  if (score >= 70) return 'text-soc-danger'
  if (score >= 40) return 'text-soc-warning'
  if (score >= 0) return 'text-soc-success'
  return 'text-soc-muted'
}

const suggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  const query = searchQuery.value.toLowerCase()
  return (threatIntel.value.suggestions || [])
    .filter(s => s.toLowerCase().includes(query))
    .slice(0, 5)
})

function handleAction(action) {
  if (completedActions.value.has(action.id)) {
    gameStore.addNotification('Action already completed', 'info')
    return
  }
  
  if (action.cost > gameStore.tokens) {
    gameStore.addNotification(`Not enough tokens! Need ${action.cost}, have ${gameStore.tokens}`, 'warning')
    return
  }
  
  if (gameStore.spendTokens(action.cost, action.label)) {
    completedActions.value.add(action.id)
    gameStore.logAction(`Intel Action: ${action.label}`, 'action', action)
    
    if (action.unlocksEvidence) {
      evidenceStore.unlockEvidence(action.unlocksEvidence)
    }
  }
}

function isActionCompleted(actionId) {
  return completedActions.value.has(actionId)
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Threat Intelligence Portal</h2>
        <p class="text-sm text-soc-muted">Search IPs, domains, hashes, and email addresses</p>
      </div>
    </div>
    
    <!-- Search Bar -->
    <div class="bg-soc-surface border border-soc-border rounded-lg p-4 mb-4">
      <div class="flex gap-4">
        <div class="flex-1 relative">
          <input
            v-model="searchQuery"
            @keyup.enter="search"
            type="text"
            placeholder="Enter IP, domain, hash, or email address..."
            class="w-full bg-soc-bg border border-soc-border rounded px-4 py-3 pl-10 text-sm focus:outline-none focus:border-soc-accent font-mono"
          />
          <Search class="absolute left-3 top-1/2 -translate-y-1/2 text-soc-muted w-5 h-5" />
          
          <!-- Autocomplete suggestions -->
          <div 
            v-if="suggestions.length > 0"
            class="absolute top-full left-0 right-0 mt-1 bg-soc-surface border border-soc-border rounded-lg shadow-lg z-10"
          >
            <button
              v-for="suggestion in suggestions"
              :key="suggestion"
              @click="quickSearch(suggestion)"
              class="w-full px-4 py-2 text-left text-sm font-mono hover:bg-soc-raised transition"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
        <button
          @click="search"
          class="px-6 py-3 bg-soc-accent text-black rounded font-medium hover:bg-soc-accent/80 transition"
        >
          Search
        </button>
      </div>
      
      <!-- Search History -->
      <div v-if="searchHistory.length > 0" class="mt-3 flex items-center gap-2 flex-wrap">
        <span class="text-xs text-soc-muted">Recent:</span>
        <button
          v-for="query in searchHistory.slice(0, 5)"
          :key="query"
          @click="quickSearch(query)"
          class="px-2 py-1 text-xs font-mono bg-soc-bg border border-soc-border rounded hover:border-soc-accent transition"
        >
          {{ query }}
        </button>
      </div>
    </div>
    
    <!-- Results -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="!selectedResult" class="h-full flex items-center justify-center text-soc-muted">
        <div class="text-center">
          <SearchX class="w-12 h-12 mb-4 mx-auto" />
          <p>Enter an indicator of compromise to search</p>
          <p class="text-sm mt-2">Supports: IP addresses, domains, file hashes, email addresses</p>
        </div>
      </div>
      
      <div v-else class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden">
        <!-- Result Header -->
        <div class="p-4 border-b border-soc-border bg-soc-raised/50">
          <div class="flex items-start justify-between">
            <div>
              <div class="flex items-center gap-3 mb-2">
                <component :is="getReputationIcon(selectedResult.reputation)" class="w-8 h-8" :class="getReputationClass(selectedResult.reputation).replace('bg-', 'text-').split(' ')[0]" />
                <code class="text-lg font-mono text-soc-text">{{ selectedResult.key }}</code>
              </div>
              <div class="flex items-center gap-2">
                <span 
                  class="px-2 py-1 rounded text-xs font-semibold uppercase"
                  :class="getReputationClass(selectedResult.reputation)"
                >
                  {{ selectedResult.reputation }}
                </span>
                <span class="text-sm text-soc-muted">{{ selectedResult.type?.toUpperCase() }}</span>
                <span v-if="selectedResult.category" class="text-sm text-soc-muted">• {{ selectedResult.category }}</span>
              </div>
            </div>
            <div v-if="selectedResult.riskScore !== undefined" class="text-right">
              <div class="text-sm text-soc-muted">Risk Score</div>
              <div class="text-2xl font-bold" :class="getRiskColor(selectedResult.riskScore)">
                {{ selectedResult.riskScore }}/100
              </div>
            </div>
          </div>
        </div>
        
        <!-- Result Details -->
        <div class="p-4 space-y-4">
          <!-- Summary -->
          <div>
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Summary</h3>
            <p class="text-sm text-soc-text bg-soc-bg rounded p-3">{{ selectedResult.summary }}</p>
          </div>
          
          <!-- Recommendation -->
          <div v-if="selectedResult.recommendation">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Recommendation</h3>
            <p class="text-sm text-soc-text bg-soc-bg rounded p-3 border-l-3 border-l-soc-accent">
              {{ selectedResult.recommendation }}
            </p>
          </div>
          
          <!-- Metadata Grid -->
          <div v-if="selectedResult.type !== 'unknown'" class="grid grid-cols-2 gap-4">
            <!-- IP-specific fields -->
            <template v-if="selectedResult.type === 'ip'">
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">Country</div>
                <div class="text-sm text-soc-text">{{ selectedResult.country }}</div>
              </div>
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">ASN</div>
                <div class="text-sm text-soc-text font-mono">{{ selectedResult.asn }}</div>
              </div>
            </template>
            
            <!-- Domain-specific fields -->
            <template v-if="selectedResult.type === 'domain'">
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">Registrar</div>
                <div class="text-sm text-soc-text">{{ selectedResult.registrar }}</div>
              </div>
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">Registration Date</div>
                <div class="text-sm text-soc-text">{{ selectedResult.registrationDate }}</div>
              </div>
            </template>
            
            <!-- Hash-specific fields -->
            <template v-if="selectedResult.type === 'hash'">
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">Hash Type</div>
                <div class="text-sm text-soc-text">{{ selectedResult.hashType }}</div>
              </div>
              <div class="bg-soc-bg rounded p-3">
                <div class="text-xs text-soc-muted uppercase mb-1">Malware Family</div>
                <div class="text-sm text-soc-text">{{ selectedResult.malwareFamily }}</div>
              </div>
            </template>
            
            <!-- Common fields -->
            <div v-if="selectedResult.firstSeen" class="bg-soc-bg rounded p-3">
              <div class="text-xs text-soc-muted uppercase mb-1">First Seen</div>
              <div class="text-sm text-soc-text">{{ selectedResult.firstSeen }}</div>
            </div>
            <div v-if="selectedResult.lastSeen" class="bg-soc-bg rounded p-3">
              <div class="text-xs text-soc-muted uppercase mb-1">Last Seen</div>
              <div class="text-sm text-soc-text">{{ selectedResult.lastSeen }}</div>
            </div>
            <div v-if="selectedResult.reports !== undefined" class="bg-soc-bg rounded p-3">
              <div class="text-xs text-soc-muted uppercase mb-1">Community Reports</div>
              <div class="text-sm text-soc-text">{{ selectedResult.reports.toLocaleString() }}</div>
            </div>
          </div>
          
          <!-- Tags -->
          <div v-if="selectedResult.tags?.length > 0">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="tag in selectedResult.tags" 
                :key="tag"
                class="px-2 py-1 text-xs rounded bg-soc-raised border border-soc-border text-soc-muted"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- Related Campaigns -->
          <div v-if="selectedResult.relatedCampaigns?.length > 0">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Related Campaigns</h3>
            <div class="space-y-2">
              <div 
                v-for="campaign in selectedResult.relatedCampaigns" 
                :key="campaign"
                class="px-3 py-2 text-sm rounded bg-soc-bg border-l-3 border-l-soc-warning text-soc-text"
              >
                {{ campaign }}
              </div>
            </div>
          </div>
          
          <!-- Actions -->
          <div v-if="selectedResult.actions?.length > 0">
            <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Available Actions</h3>
            <div class="space-y-2">
              <button
                v-for="action in selectedResult.actions"
                :key="action.id"
                @click="handleAction(action)"
                :disabled="isActionCompleted(action.id)"
                class="w-full text-left px-4 py-3 rounded border transition"
                :class="isActionCompleted(action.id) 
                  ? 'bg-soc-bg border-soc-border opacity-50 cursor-not-allowed' 
                  : 'bg-soc-raised border-soc-border hover:border-soc-accent cursor-pointer'"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-medium text-soc-text">
                      {{ action.label }}
                      <span v-if="isActionCompleted(action.id)" class="text-soc-success ml-2">✓ Completed</span>
                    </div>
                    <div class="text-sm text-soc-muted">{{ action.description }}</div>
                  </div>
                  <div v-if="!isActionCompleted(action.id)" class="flex items-center gap-1 text-soc-accent">
                    <Coins class="w-4 h-4" />
                    <span class="font-medium">{{ action.cost }}</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
