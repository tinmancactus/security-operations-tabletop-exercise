<script setup>
import { useGameStore } from '../../stores/game'
import { useEvidenceStore } from '../../stores/evidence'
import { useCommsStore } from '../../stores/comms'
import { useAlertsStore } from '../../stores/alerts'
import { useTicketsStore } from '../../stores/tickets'
import { X } from 'lucide-vue-next'

const gameStore = useGameStore()
const evidenceStore = useEvidenceStore()
const commsStore = useCommsStore()
const alertsStore = useAlertsStore()
const ticketsStore = useTicketsStore()

function handleClick(notification) {
  gameStore.handleNotificationClick(notification, { evidenceStore, commsStore, alertsStore, ticketsStore })
}

function handleDismiss(event, id) {
  event.stopPropagation() // Prevent triggering the click handler
  gameStore.dismissNotification(id)
}
</script>

<template>
  <div class="fixed left-1/2 -translate-x-1/2 flex flex-col gap-2 z-40 max-w-md w-full px-4">
    <TransitionGroup name="toast">
      <div
        v-for="notification in gameStore.notifications"
        :key="notification.id"
        @click="handleClick(notification)"
        class="px-4 py-3 rounded-lg shadow-lg border backdrop-blur-sm flex items-center justify-between gap-3 cursor-pointer hover:scale-[1.02] transition-transform bg-soc-success/20 border-soc-success text-soc-success"
      >
        <span class="flex-1">{{ notification.message }}</span>
        <button 
          @click="(e) => handleDismiss(e, notification.id)"
          class="p-1 rounded hover:bg-white/10 transition-colors shrink-0"
          title="Dismiss"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
