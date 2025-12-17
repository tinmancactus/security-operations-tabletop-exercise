<script setup>
import { ref, computed } from 'vue'
import { AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  person: Object,
  personnel: Object
})

const activeTab = ref('profile')

const manager = computed(() => {
  if (!props.person.reportsTo) return null
  return props.personnel[props.person.reportsTo]
})

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const selectedDay = ref('Monday')

const todayCalendar = computed(() => {
  const dayData = props.person.calendar?.find(d => d.day === selectedDay.value)
  return dayData?.entries || []
})

function formatTime(time) {
  const [hours, mins] = time.split(':')
  const h = parseInt(hours)
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h > 12 ? h - 12 : (h === 0 ? 12 : h)
  return `${h12}:${mins} ${ampm}`
}

function formatDuration(mins) {
  if (mins < 60) return `${mins}m`
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}
</script>

<template>
  <div class="bg-soc-surface border border-soc-border rounded-lg overflow-hidden">
    <!-- Header -->
    <div class="p-4 border-b border-soc-border bg-soc-raised/50">
      <div class="flex items-start gap-4">
        <img 
          v-if="person.image" 
          :src="person.image" 
          :alt="person.name"
          class="w-16 h-16 rounded-full object-cover"
        />
        <span v-else class="text-4xl">{{ person.avatar }}</span>
        <div class="flex-1">
          <h2 class="text-xl font-semibold text-soc-text">{{ person.name }}</h2>
          <p class="text-soc-muted">{{ person.role }}</p>
          <p class="text-sm text-soc-muted mt-1">{{ person.department }}</p>
        </div>
      </div>
    </div>
    
    <!-- Tabs -->
    <div class="flex border-b border-soc-border">
      <button
        @click="activeTab = 'profile'"
        class="px-4 py-2 text-sm font-medium transition"
        :class="activeTab === 'profile' 
          ? 'text-soc-accent border-b-2 border-soc-accent' 
          : 'text-soc-muted hover:text-soc-text'"
      >
        Profile
      </button>
      <button
        @click="activeTab = 'calendar'"
        class="px-4 py-2 text-sm font-medium transition"
        :class="activeTab === 'calendar' 
          ? 'text-soc-accent border-b-2 border-soc-accent' 
          : 'text-soc-muted hover:text-soc-text'"
      >
        Calendar
      </button>
    </div>
    
    <!-- Profile Tab -->
    <div v-if="activeTab === 'profile'" class="p-4">
      <div class="space-y-4">
        <!-- Contact Info -->
        <div>
          <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Contact Information</h3>
          <div class="bg-soc-bg rounded p-3 space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-soc-muted">Email:</span>
              <span class="text-soc-text font-mono">{{ person.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-soc-muted">Location:</span>
              <span class="text-soc-text">{{ person.location }}</span>
            </div>
          </div>
        </div>
        
        <!-- Reporting -->
        <div v-if="manager">
          <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Reports To</h3>
          <div class="bg-soc-bg rounded p-3 flex items-center gap-3">
            <img 
              v-if="manager.image" 
              :src="manager.image" 
              :alt="manager.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <span v-else class="text-xl">{{ manager.avatar }}</span>
            <div>
              <div class="text-soc-text font-medium">{{ manager.name }}</div>
              <div class="text-xs text-soc-muted">{{ manager.role }}</div>
            </div>
          </div>
        </div>
        
        <!-- Bio -->
        <div>
          <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">About</h3>
          <p class="text-sm text-soc-text bg-soc-bg rounded p-3">{{ person.bio }}</p>
        </div>
        
        <!-- Employment -->
        <div>
          <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2">Employment</h3>
          <div class="bg-soc-bg rounded p-3 text-sm">
            <div class="flex justify-between">
              <span class="text-soc-muted">Start Date:</span>
              <span class="text-soc-text">{{ new Date(person.startDate).toLocaleDateString('en-AU', { dateStyle: 'medium' }) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Calendar Tab -->
    <div v-if="activeTab === 'calendar'" class="p-4">
      <!-- Day Selector -->
      <div class="flex gap-2 mb-4">
        <button
          v-for="day in days"
          :key="day"
          @click="selectedDay = day"
          class="px-3 py-1 rounded text-sm transition"
          :class="selectedDay === day 
            ? 'bg-soc-accent text-black' 
            : 'bg-soc-raised border border-soc-border hover:bg-soc-border text-soc-muted'"
        >
          {{ day.slice(0, 3) }}
        </button>
      </div>
      
      <!-- Calendar Entries -->
      <div class="space-y-2">
        <div v-if="todayCalendar.length === 0" class="text-center text-soc-muted py-8">
          No scheduled meetings for {{ selectedDay }}
        </div>
        
        <div 
          v-for="(entry, i) in todayCalendar" 
          :key="i"
          class="bg-soc-bg rounded p-3 border-l-3"
          :class="entry.note ? 'border-l-soc-warning' : 'border-l-soc-accent'"
        >
          <div class="flex justify-between items-start mb-1">
            <span class="font-medium text-soc-text">{{ entry.title }}</span>
            <span class="text-xs text-soc-muted">{{ formatDuration(entry.duration) }}</span>
          </div>
          <div class="text-sm text-soc-muted">
            {{ formatTime(entry.time) }} • {{ entry.location }}
          </div>
          <div v-if="entry.note" class="mt-2 text-xs text-soc-warning bg-soc-warning/10 px-2 py-1 rounded flex items-center gap-1">
            <AlertTriangle class="w-3 h-3" />
            {{ entry.note }}
          </div>
        </div>
      </div>
      
      <!-- Calendar Note -->
      <p class="text-xs text-soc-muted mt-4 italic">
        Calendar data reflects typical weekly schedule. Actual availability may vary.
      </p>
    </div>
  </div>
</template>
