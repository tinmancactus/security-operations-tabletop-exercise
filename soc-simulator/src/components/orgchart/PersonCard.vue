<script setup>
defineProps({
  person: Object,
  selected: Boolean
})

defineEmits(['click'])
</script>

<template>
  <div 
    @click="$emit('click')"
    class="p-3 rounded-lg border cursor-pointer transition-all"
    :class="selected 
      ? 'bg-soc-raised border-soc-accent' 
      : 'bg-soc-surface border-soc-border hover:border-soc-accent/50'"
  >
    <div class="flex items-center gap-3">
      <img 
        v-if="person.image" 
        :src="person.image" 
        :alt="person.name"
        class="w-10 h-10 rounded-full object-cover"
      />
      <span v-else class="text-2xl">{{ person.avatar }}</span>
      <div class="flex-1 min-w-0">
        <div class="font-medium text-soc-text truncate">{{ person.name }}</div>
        <div class="text-xs text-soc-muted truncate">{{ person.role }}</div>
      </div>
    </div>
  </div>
</template>
