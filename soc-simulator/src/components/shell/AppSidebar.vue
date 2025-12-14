<script setup>
import { useGameStore } from '../../stores/game'
import { useAlertsStore } from '../../stores/alerts'
import { useTicketsStore } from '../../stores/tickets'
import { useCommsStore } from '../../stores/comms'
import { useEvidenceStore } from '../../stores/evidence'
import { 
  Activity, 
  Ticket, 
  ScrollText, 
  Search, 
  MessageSquare, 
  FolderOpen, 
  Users,
  ClipboardList
} from 'lucide-vue-next'

const gameStore = useGameStore()
const alertsStore = useAlertsStore()
const ticketsStore = useTicketsStore()
const commsStore = useCommsStore()
const evidenceStore = useEvidenceStore()

const navItems = [
  { id: 'siem', label: 'SIEM', icon: Activity },
  { id: 'tickets', label: 'Tickets', icon: Ticket },
  { id: 'logs', label: 'Logs', icon: ScrollText },
  { id: 'threatintel', label: 'Intel', icon: Search },
  { id: 'comms', label: 'Messages', icon: MessageSquare },
  { id: 'evidence', label: 'Evidence', icon: FolderOpen },
  { id: 'orgchart', label: 'People', icon: Users }
]

const actionLogIcon = ClipboardList

function getBadgeCount(id) {
  switch (id) {
    case 'siem':
      return alertsStore.alertCounts.critical + alertsStore.alertCounts.high
    case 'tickets':
      return ticketsStore.visibleTickets.filter(t => t.status === 'open').length
    case 'comms':
      return commsStore.totalUnread
    case 'evidence':
      return evidenceStore.unlockedEvidence.length
    default:
      return 0
  }
}

function getBadgeClass(id) {
  if (id === 'siem' && alertsStore.alertCounts.critical > 0) {
    return 'bg-soc-danger'
  }
  if (id === 'comms' && commsStore.totalUnread > 0) {
    return 'bg-soc-accent'
  }
  return 'bg-soc-muted'
}
</script>

<template>
  <aside class="w-20 bg-soc-surface border-r border-soc-border flex flex-col items-center py-4 gap-2">
    <button
      v-for="item in navItems"
      :key="item.id"
      @click="gameStore.setView(item.id)"
      class="w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-all relative"
      :class="gameStore.currentView === item.id 
        ? 'bg-soc-accent/20 border border-soc-accent text-soc-accent' 
        : 'hover:bg-soc-raised text-soc-muted hover:text-soc-text'"
    >
      <component :is="item.icon" class="w-6 h-6 mb-1" />
      <span class="text-xs">{{ item.label }}</span>
      
      <!-- Badge -->
      <span 
        v-if="getBadgeCount(item.id) > 0"
        class="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center rounded-full text-xs font-bold text-white px-1"
        :class="getBadgeClass(item.id)"
      >
        {{ getBadgeCount(item.id) }}
      </span>
    </button>
    
    <!-- Spacer -->
    <div class="flex-1"></div>
    
    <!-- Action Log -->
    <button
      @click="gameStore.setView('log')"
      class="w-16 h-16 flex flex-col items-center justify-center rounded-lg transition-all"
      :class="gameStore.currentView === 'log' 
        ? 'bg-soc-accent/20 border border-soc-accent text-soc-accent' 
        : 'hover:bg-soc-raised text-soc-muted hover:text-soc-text'"
    >
      <component :is="actionLogIcon" class="w-6 h-6 mb-1" />
      <span class="text-xs">Actions</span>
    </button>
  </aside>
</template>
