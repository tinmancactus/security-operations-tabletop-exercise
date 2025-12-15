import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useGameStore } from './game'

export const useEvidenceStore = defineStore('evidence', () => {
  const gameStore = useGameStore()
  
  // State
  const allEvidence = ref([])
  const unlockedIds = ref([])
  const selectedEvidenceId = ref(null)

  // Computed
  const unlockedEvidence = computed(() => {
    return allEvidence.value.filter(e => unlockedIds.value.includes(e.id))
  })

  const selectedEvidence = computed(() => {
    return allEvidence.value.find(e => e.id === selectedEvidenceId.value)
  })

  // Actions
  function loadEvidence(evidence) {
    allEvidence.value = evidence
  }

  function unlockEvidence(evidenceId) {
    if (!unlockedIds.value.includes(evidenceId)) {
      unlockedIds.value.push(evidenceId)
      const evidence = allEvidence.value.find(e => e.id === evidenceId)
      if (evidence) {
        gameStore.logAction(`Unlocked evidence: ${evidence.title}`, 'evidence')
        gameStore.addNotification(`Evidence unlocked: ${evidence.title}`, 'success', 'evidence', { evidenceId })
      }
      saveState()
    }
  }

  function selectEvidence(evidenceId) {
    selectedEvidenceId.value = evidenceId
  }

  function isUnlocked(evidenceId) {
    return unlockedIds.value.includes(evidenceId)
  }

  function saveState() {
    localStorage.setItem('soc-sim-evidence', JSON.stringify({
      unlockedIds: unlockedIds.value,
      selectedEvidenceId: selectedEvidenceId.value
    }))
  }

  function loadState() {
    const saved = localStorage.getItem('soc-sim-evidence')
    if (saved) {
      const state = JSON.parse(saved)
      unlockedIds.value = state.unlockedIds || []
      selectedEvidenceId.value = state.selectedEvidenceId
      return true
    }
    return false
  }

  function clearState() {
    localStorage.removeItem('soc-sim-evidence')
    unlockedIds.value = []
    selectedEvidenceId.value = null
  }

  return {
    allEvidence,
    unlockedIds,
    selectedEvidenceId,
    unlockedEvidence,
    selectedEvidence,
    loadEvidence,
    unlockEvidence,
    selectEvidence,
    isUnlocked,
    saveState,
    loadState,
    clearState
  }
})
