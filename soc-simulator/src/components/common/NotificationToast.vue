<script setup>
import { useGameStore } from '../../stores/game'

const gameStore = useGameStore()
</script>

<template>
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50">
    <TransitionGroup name="toast">
      <div
        v-for="notification in gameStore.notifications"
        :key="notification.id"
        class="px-6 py-3 rounded-lg shadow-lg border backdrop-blur-sm"
        :class="{
          'bg-soc-surface/95 border-soc-border': notification.type === 'info',
          'bg-soc-warning/20 border-soc-warning text-soc-warning': notification.type === 'warning',
          'bg-soc-danger/20 border-soc-danger text-soc-danger': notification.type === 'danger',
          'bg-soc-success/20 border-soc-success text-soc-success': notification.type === 'success'
        }"
      >
        {{ notification.message }}
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
  transform: translateY(20px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
