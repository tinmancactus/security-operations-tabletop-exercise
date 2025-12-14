<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../../stores/game'
import PersonCard from './PersonCard.vue'
import PersonDetail from './PersonDetail.vue'
import { 
  Briefcase, 
  Shield, 
  Monitor, 
  Wallet, 
  Headphones, 
  User 
} from 'lucide-vue-next'

const gameStore = useGameStore()

const personnel = computed(() => gameStore.scenario?.personnel || {})
const selectedPersonId = ref(null)

const selectedPerson = computed(() => {
  if (!selectedPersonId.value) return null
  return personnel.value[selectedPersonId.value]
})

// Group personnel by department
const departments = computed(() => {
  const groups = {}
  Object.values(personnel.value).forEach(person => {
    const dept = person.department || 'Other'
    if (!groups[dept]) groups[dept] = []
    groups[dept].push(person)
  })
  return groups
})

const departmentOrder = ['Executive', 'Security', 'IT Operations', 'Finance', 'Customer Support']

const sortedDepartments = computed(() => {
  return departmentOrder.filter(d => departments.value[d])
})

function selectPerson(personId) {
  selectedPersonId.value = personId
}

const departmentIcons = {
  'Executive': Briefcase,
  'Security': Shield,
  'IT Operations': Monitor,
  'Finance': Wallet,
  'Customer Support': Headphones,
  'default': User
}

function getDepartmentIcon(dept) {
  return departmentIcons[dept] || departmentIcons.default
}
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-xl font-semibold text-soc-text">Organisation Directory</h2>
        <p class="text-sm text-soc-muted">XYZ Pay employee directory and calendars</p>
      </div>
      
      <div class="text-sm text-soc-muted">
        {{ Object.keys(personnel).length }} employees
      </div>
    </div>
    
    <!-- Content -->
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Personnel List by Department -->
      <div class="w-1/3 overflow-y-auto space-y-4 pr-2">
        <div v-for="dept in sortedDepartments" :key="dept">
          <h3 class="text-sm font-semibold text-soc-muted uppercase mb-2 flex items-center gap-2">
            <component :is="getDepartmentIcon(dept)" class="w-4 h-4" />
            {{ dept }}
          </h3>
          <div class="space-y-2">
            <PersonCard
              v-for="person in departments[dept]"
              :key="person.id"
              :person="person"
              :selected="selectedPersonId === person.id"
              @click="selectPerson(person.id)"
            />
          </div>
        </div>
      </div>
      
      <!-- Person Detail -->
      <div class="w-2/3 overflow-y-auto">
        <PersonDetail
          v-if="selectedPerson"
          :person="selectedPerson"
          :personnel="personnel"
        />
        <div v-else class="h-full flex items-center justify-center text-soc-muted">
          Select an employee to view their profile and calendar
        </div>
      </div>
    </div>
  </div>
</template>
