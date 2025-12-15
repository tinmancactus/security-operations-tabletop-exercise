<script setup>
import { useTicketsStore } from '../../stores/tickets'
import { useGameStore } from '../../stores/game'
import { useEvidenceStore } from '../../stores/evidence'
import TicketCard from './TicketCard.vue'
import TicketDetail from './TicketDetail.vue'

const ticketsStore = useTicketsStore()
const gameStore = useGameStore()
const evidenceStore = useEvidenceStore()

function handleAction(action) {
  if (ticketsStore.isActionCompleted(action.id)) {
    gameStore.addNotification('You have already taken this action', 'warning')
    return
  }
  
  if (action.cost > gameStore.tokens) {
    gameStore.addNotification(`Not enough tokens! Need ${action.cost}, have ${gameStore.tokens}`, 'warning')
    return
  }
  
  if (gameStore.spendTokens(action.cost, action.label)) {
    ticketsStore.completeAction(action.id)
    gameStore.logAction(`Ticket Action: ${action.label}`, 'action', action)
    
    if (action.unlocksEvidence) {
      evidenceStore.unlockEvidence(action.unlocksEvidence)
    }
    
    if (action.closesTicket) {
      const ticket = ticketsStore.selectedTicket
      if (ticket) {
        ticketsStore.closeTicket(ticket.id)
        gameStore.addNotification(`Ticket ${ticket.id} closed`, 'success')
        gameStore.logAction(`Closed ticket: ${ticket.id} - ${ticket.subject}`, 'action')
      }
    }
  }
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Service Tickets</h2>
        <p class="text-sm text-soc-muted">Security-related tickets assigned to SOC</p>
      </div>
      
      <div class="text-sm text-soc-muted">
        {{ ticketsStore.visibleTickets.filter(t => t.status === 'open').length }} open tickets
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Ticket List -->
      <div class="w-1/2 overflow-y-auto space-y-2 pr-2">
        <TicketCard
          v-for="ticket in ticketsStore.visibleTickets"
          :key="ticket.id"
          :ticket="ticket"
          :selected="ticketsStore.selectedTicketId === ticket.id"
          @click="ticketsStore.selectTicket(ticket.id)"
        />
        
        <div v-if="ticketsStore.visibleTickets.length === 0" class="text-center text-soc-muted py-8">
          No tickets in queue
        </div>
      </div>
      
      <!-- Ticket Detail -->
      <div class="w-1/2 overflow-y-auto">
        <TicketDetail
          v-if="ticketsStore.selectedTicket"
          :ticket="ticketsStore.selectedTicket"
          @action="handleAction"
        />
        <div v-else class="h-full flex items-center justify-center text-soc-muted">
          Select a ticket to view details
        </div>
      </div>
    </div>
  </div>
</template>
