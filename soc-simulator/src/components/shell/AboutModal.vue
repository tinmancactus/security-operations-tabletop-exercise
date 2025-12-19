<script setup>
import { useGameStore } from '../../stores/game'
import { X } from 'lucide-vue-next'

defineProps({
  show: Boolean
})

const emit = defineEmits(['close'])

const gameStore = useGameStore()

const credits = gameStore.scenario?.config?.credits
</script>

<template>
  <Teleport to="body">
    <div 
      v-if="show" 
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      @click.self="emit('close')"
    >
      <div class="bg-soc-surface border border-soc-border rounded-lg shadow-xl max-w-lg w-full mx-4">
        <!-- Header -->
        <div class="flex items-center justify-between p-4 border-b border-soc-border">
          <h2 class="text-lg font-semibold text-soc-text">About</h2>
          <button 
            @click="emit('close')"
            class="p-1 hover:bg-soc-raised rounded transition"
          >
            <X class="w-5 h-5 text-soc-muted" />
          </button>
        </div>
        
        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- App Info -->
          <div class="text-center">
            <h3 class="text-xl font-bold text-soc-text mb-2">Adelaide University SOC Simulator</h3>
            <p class="text-soc-muted">
              Developed by 
              <a 
                href="mailto:tim.churchward@adelaide.edu.au" 
                class="text-soc-accent hover:underline"
              >Tim Churchward</a> 
              and Claude Opus 4.5
            </p>
          </div>

          <!-- Scenario Credits -->
          <div v-if="credits" class="space-y-3 pt-4 border-t border-soc-border">
            <h4 class="text-sm font-semibold text-soc-muted uppercase tracking-wide">Scenario Credits</h4>
            
            <p v-if="credits.story" class="text-sm text-soc-text">
              {{ credits.story }}
            </p>

            <p v-if="credits.acknowledgements" class="text-sm text-soc-text">
              {{ credits.acknowledgements }}
            </p>
            
            <p v-if="credits.assets" class="text-sm text-soc-text">
              {{ credits.assets }}
            </p>
            
            <p v-if="credits.disclaimer" class="text-xs text-soc-muted italic mt-4">
              {{ credits.disclaimer }}
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="p-4 border-t border-soc-border flex justify-end">
          <button 
            @click="emit('close')"
            class="px-4 py-2 bg-soc-accent text-white rounded hover:bg-soc-accent/80 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
