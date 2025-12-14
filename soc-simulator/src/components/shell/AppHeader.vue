<script setup>
import { useGameStore } from '../../stores/game'
import { ShieldCheck } from 'lucide-vue-next'

const emit = defineEmits(['reset'])

const gameStore = useGameStore()

function toggleTimer() {
  if (gameStore.isRunning) {
    gameStore.pauseTimer()
  } else {
    gameStore.startTimer()
  }
}
</script>

<template>
  <header class="bg-soc-surface border-b border-soc-border px-6 py-3 flex items-center justify-between">
    <!-- Left: Logo & Title -->
    <div class="flex items-center gap-4">
      <ShieldCheck class="w-8 h-8 text-soc-accent" />
      <div>
        <h1 class="text-lg font-semibold text-soc-text">
          {{ gameStore.scenario?.config.company.name }} SOC
        </h1>
        <p class="text-xs text-soc-muted">
          {{ gameStore.scenario?.config.subtitle }}
        </p>
      </div>
    </div>
    
    <!-- Center: Timer -->
    <div class="flex items-center gap-4">
      <div class="flex gap-2">
        <button 
          @click="toggleTimer"
          class="px-4 py-2 bg-soc-raised border border-soc-border rounded text-sm hover:bg-soc-border transition"
        >
          {{ gameStore.isRunning ? 'Pause' : 'Start' }}
        </button>
      </div>
      
      <div 
        class="font-mono text-3xl font-bold"
        :class="{
          'text-soc-accent': gameStore.timerClass === '',
          'text-soc-warning': gameStore.timerClass === 'warning',
          'text-soc-danger animate-pulse': gameStore.timerClass === 'danger'
        }"
      >
        {{ gameStore.formattedTime }}
      </div>
    </div>
    
    <!-- Right: Tokens & Reset -->
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-3">
        <span class="text-sm text-soc-muted">Tokens:</span>
        <div class="flex gap-1">
          <div 
            v-for="i in 12" 
            :key="i"
            class="w-3 h-3 rounded-full transition-all"
            :class="i <= gameStore.tokens ? 'bg-soc-accent' : 'bg-soc-border opacity-40'"
          />
        </div>
        <span class="font-bold text-soc-accent ml-1">{{ gameStore.tokens }}</span>
      </div>
      
      <button 
        @click="emit('reset')"
        class="px-3 py-1.5 text-sm text-soc-danger border border-soc-danger/50 rounded hover:bg-soc-danger/20 transition"
      >
        Reset
      </button>
    </div>
  </header>
</template>
