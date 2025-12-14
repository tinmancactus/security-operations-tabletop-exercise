<script setup>
import { useEvidenceStore } from '../../stores/evidence'
import { 
  Mic, 
  Mail, 
  Activity, 
  Search, 
  FileText 
} from 'lucide-vue-next'

const evidenceStore = useEvidenceStore()

const categoryIcons = {
  'Interview': Mic,
  'Email Analysis': Mail,
  'Log Analysis': Activity,
  'Threat Intel': Search,
  'default': FileText
}

function getCategoryIcon(category) {
  return categoryIcons[category] || categoryIcons.default
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Evidence Collected</h2>
        <p class="text-sm text-soc-muted">Investigation findings and analysis results</p>
      </div>
      
      <div class="text-sm text-soc-muted">
        {{ evidenceStore.unlockedEvidence.length }} items collected
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Evidence List -->
      <div class="w-1/3 overflow-y-auto space-y-2 pr-2">
        <div
          v-for="evidence in evidenceStore.unlockedEvidence"
          :key="evidence.id"
          @click="evidenceStore.selectEvidence(evidence.id)"
          class="p-4 rounded-lg border cursor-pointer transition-all"
          :class="evidenceStore.selectedEvidenceId === evidence.id 
            ? 'bg-soc-raised border-soc-accent' 
            : 'bg-soc-surface border-soc-border hover:border-soc-accent/50'"
        >
          <div class="flex items-center gap-2 mb-1">
            <component :is="getCategoryIcon(evidence.category)" class="w-5 h-5 text-soc-accent" />
            <span class="text-xs text-soc-muted font-mono">{{ evidence.id }}</span>
          </div>
          <h3 class="font-medium text-soc-text">{{ evidence.title }}</h3>
          <p class="text-xs text-soc-muted mt-1">{{ evidence.category }}</p>
        </div>
        
        <div v-if="evidenceStore.unlockedEvidence.length === 0" class="text-center text-soc-muted py-8">
          <p class="mb-2">No evidence collected yet</p>
          <p class="text-xs">Investigate tickets and alerts to gather evidence</p>
        </div>
      </div>
      
      <!-- Evidence Detail -->
      <div class="w-2/3 overflow-y-auto">
        <div 
          v-if="evidenceStore.selectedEvidence"
          class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden"
        >
          <!-- Header -->
          <div class="p-4 border-b border-soc-border">
            <div class="flex items-center gap-3 mb-2">
              <component :is="getCategoryIcon(evidenceStore.selectedEvidence.category)" class="w-8 h-8 text-soc-accent" />
              <div>
                <span class="font-mono text-soc-muted text-sm">{{ evidenceStore.selectedEvidence.id }}</span>
                <h2 class="text-lg font-semibold text-soc-text">{{ evidenceStore.selectedEvidence.title }}</h2>
              </div>
            </div>
            <span class="text-sm px-2 py-1 rounded bg-soc-raised text-soc-muted">
              {{ evidenceStore.selectedEvidence.category }}
            </span>
          </div>
          
          <!-- Content -->
          <div class="p-4">
            <pre class="text-sm text-soc-text whitespace-pre-wrap font-mono bg-soc-bg p-4 rounded leading-relaxed">{{ evidenceStore.selectedEvidence.content }}</pre>
          </div>
        </div>
        
        <div v-else class="h-full flex items-center justify-center text-soc-muted">
          Select evidence to view details
        </div>
      </div>
    </div>
  </div>
</template>
