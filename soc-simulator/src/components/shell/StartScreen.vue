<script setup>
import { useGameStore } from '../../stores/game'

const props = defineProps({
  scenario: Object,
  showResume: Boolean
})

const emit = defineEmits(['start', 'resume', 'new-game'])

const gameStore = useGameStore()

function startSession() {
  gameStore.startSession()
  emit('start')
}

function resumeSession() {
  emit('resume')
}

function newGame() {
  emit('new-game')
  gameStore.startSession()
}
</script>

<template>
  <div class="min-h-screen bg-soc-bg flex items-center justify-center p-8">
    <div class="max-w-2xl w-full">
      <!-- Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-soc-accent mb-2">
          {{ scenario.config.title }}
        </h1>
        <h2 class="text-xl text-soc-muted">
          {{ scenario.config.subtitle }}
        </h2>
      </div>
      
      <!-- Resume Prompt -->
      <div v-if="showResume" class="bg-soc-surface border border-soc-warning rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-soc-warning mb-3">Session in Progress</h3>
        <p class="text-soc-muted mb-4">
          You have a saved session. Would you like to continue where you left off?
        </p>
        <div class="flex gap-3">
          <button 
            @click="resumeSession"
            class="flex-1 bg-soc-warning text-black font-semibold py-3 px-6 rounded-lg hover:bg-yellow-400 transition"
          >
            Resume Session
          </button>
          <button 
            @click="newGame"
            class="flex-1 bg-soc-raised border border-soc-border text-soc-text py-3 px-6 rounded-lg hover:bg-soc-border transition"
          >
            Start Fresh
          </button>
        </div>
      </div>
      
      <!-- Briefing -->
      <div v-else class="bg-soc-surface border border-soc-border rounded-lg p-6 mb-6">
        <h3 class="text-lg font-semibold text-soc-warning mb-4">Briefing</h3>
        
        <div class="mb-4 text-sm text-soc-muted">
          <p><strong>Company:</strong> {{ scenario.config.company.name }}</p>
          <p><strong>Date:</strong> {{ scenario.config.briefing.date }}</p>
          <p><strong>Shift:</strong> {{ scenario.config.briefing.shift }}</p>
        </div>
        
        <div class="text-soc-text whitespace-pre-line mb-6">
          {{ scenario.config.briefing.content }}
        </div>
        
        <h4 class="text-sm font-semibold text-soc-warning mb-2">Team Roles</h4>
        <ul class="text-sm text-soc-muted space-y-1 mb-6">
          <li v-for="role in scenario.config.roles" :key="role.id" class="flex">
            <span class="text-soc-accent mr-2">→</span>
            <span><strong>{{ role.name }}</strong> — {{ role.focus }}</span>
          </li>
        </ul>
        
        <button 
          @click="startSession"
          class="w-full bg-soc-accent text-black font-semibold py-4 px-6 rounded-lg text-lg hover:bg-blue-400 transition"
        >
          Begin Session
        </button>
      </div>
      
      <!-- Footer -->
      <p class="text-center text-soc-muted text-sm">
        Session duration: {{ Math.floor(scenario.config.duration / 60) }} minutes
        • Starting tokens: {{ scenario.config.tokens }}
      </p>
    </div>
  </div>
</template>
