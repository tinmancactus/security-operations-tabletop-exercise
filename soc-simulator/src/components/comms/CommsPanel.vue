<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { useCommsStore } from '../../stores/comms'
import { useGameStore } from '../../stores/game'

const commsStore = useCommsStore()
const gameStore = useGameStore()

const messageInput = ref('')
const messagesContainer = ref(null)
const showAssessment = ref(false)
const assessmentChecks = ref([false, false, false, false, false])
const showRachelConfirm = ref(false)

const npcList = computed(() => {
  return Object.values(commsStore.npcs)
})

function selectChannel(npcId) {
  commsStore.setActiveChannel(npcId)
}

function getEscalationCostText(npcId) {
  const cost = commsStore.getEscalationCost(npcId)
  if (cost === 0) return 'FREE follow-up'
  return `${cost} tokens`
}

function sendMessage() {
  if (!messageInput.value.trim() || !commsStore.activeChannelId) return
  
  const npcId = commsStore.activeChannelId
  const npc = commsStore.npcs[npcId]
  const cost = commsStore.getEscalationCost(npcId)
  
  // Check tokens
  if (cost > 0 && gameStore.tokens < cost) {
    gameStore.addNotification(`Not enough tokens! Need ${cost}, have ${gameStore.tokens}`, 'warning')
    return
  }
  
  // Check NPC availability using store method
  if (!commsStore.isNpcAvailable(npcId)) {
    // Show DND message for unavailable NPCs
    gameStore.addNotification(`${npc.name} is not available right now`, 'warning')
    return
  }
  
  // Special handling for Rachel's one-time response
  const rachelStatus = commsStore.getNpcStatus('rachel')
  if (npcId === 'rachel' && rachelStatus === 'awaiting-response') {
    showRachelConfirm.value = true
    return
  }
  
  // If NPC is unavailable (e.g., Alex out of office), skip assessment and auto-reply
  if (!npc.available && rachelStatus !== 'awaiting-response') {
    sendAutoReply()
    return
  }
  
  // Show self-assessment for available NPCs
  showAssessment.value = true
}

function sendAutoReply() {
  const npcId = commsStore.activeChannelId
  const npc = commsStore.npcs[npcId]
  const content = messageInput.value.trim()
  
  // Send player message (no token cost for unavailable NPCs)
  commsStore.sendMessage(npcId, content)
  
  // Get auto-reply (use 'weak' tier which has the out-of-office message)
  const response = npc.responses.weak
  
  // Log the message
  gameStore.logAction(`Sent message to ${npc.name} (unavailable)`, 'comms', { content })
  
  // Deliver auto-reply after a short delay
  setTimeout(() => {
    commsStore.receiveMessage(npcId, response.content)
    scrollToBottom()
  }, 500)
  
  // Reset
  messageInput.value = ''
  scrollToBottom()
}

function submitWithAssessment() {
  const npcId = commsStore.activeChannelId
  const cost = commsStore.getEscalationCost(npcId)
  const content = messageInput.value.trim()
  
  // Spend tokens if needed
  if (cost > 0) {
    if (!gameStore.spendTokens(cost, `Escalated to ${commsStore.npcs[npcId].name}`)) {
      return
    }
  } else {
    gameStore.logAction(`Follow-up escalation to ${commsStore.npcs[npcId].name} (free)`, 'comms')
  }
  
  // Send player message
  commsStore.sendMessage(npcId, content)
  commsStore.incrementEscalation(npcId)
  
  // Score based on self-assessment checkboxes (trust the player's honest evaluation)
  const selfAssessmentScore = assessmentChecks.value.filter(c => c).length
  const tier = commsStore.getResponseTier(npcId, selfAssessmentScore)
  const npc = commsStore.npcs[npcId]
  const response = npc.responses[tier]
  
  // Log assessment result
  gameStore.logAction(`Escalation self-assessment: ${selfAssessmentScore}/5 checks → ${response.title}`, 'assessment')
  
  // Deliver response after a short delay
  setTimeout(() => {
    commsStore.receiveMessage(npcId, response.content)
    scrollToBottom()
  }, 1000)
  
  // Reset
  messageInput.value = ''
  showAssessment.value = false
  assessmentChecks.value = [false, false, false, false, false]
  
  scrollToBottom()
}

function cancelAssessment() {
  showAssessment.value = false
  assessmentChecks.value = [false, false, false, false, false]
}

function confirmRachelResponse() {
  const content = messageInput.value.trim()
  if (!content) return
  
  commsStore.handleRachelResponse(content)
  messageInput.value = ''
  showRachelConfirm.value = false
  scrollToBottom()
}

function cancelRachelConfirm() {
  showRachelConfirm.value = false
}

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

watch(() => commsStore.activeChannel?.messages.length, scrollToBottom)

const assessmentCriteria = [
  'Names a specific user account of concern',
  'References key evidence (MFA bypass, suspicious login, interview findings)',
  'Describes a timeline of events',
  'Proposes a specific action OR asks a specific question',
  'Includes severity assessment with justification'
]

const checksCount = computed(() => assessmentChecks.value.filter(c => c).length)
</script>

<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="mb-4">
      <h2 class="text-xl font-semibold text-soc-text">Communications</h2>
      <p class="text-sm text-soc-muted">Message XYZ Pay staff</p>
    </div>
    
    <div class="flex-1 flex gap-4 overflow-hidden">
      <!-- Channel List -->
      <div class="w-48 space-y-2">
        <button
          v-for="npc in npcList"
          :key="npc.id"
          @click="selectChannel(npc.id)"
          class="w-full p-3 rounded-lg border text-left transition-all relative"
          :class="commsStore.activeChannelId === npc.id 
            ? 'bg-soc-raised border-soc-accent' 
            : 'bg-soc-surface border-soc-border hover:border-soc-accent/50'"
        >
          <div class="flex items-center gap-2">
            <img 
              v-if="npc.image" 
              :src="npc.image" 
              :alt="npc.name"
              class="w-10 h-10 rounded-full object-cover"
            />
            <span v-else class="text-xl">{{ npc.avatar }}</span>
            <div>
              <div class="font-medium text-sm text-soc-text">{{ npc.name }}</div>
              <div class="text-xs text-soc-muted">{{ npc.role }}</div>
            </div>
          </div>
          
          <!-- Unread badge -->
          <span 
            v-if="commsStore.unreadCounts[npc.id] > 0"
            class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full bg-soc-accent text-black text-xs font-bold"
          >
            {{ commsStore.unreadCounts[npc.id] }}
          </span>
        </button>
      </div>
      
      <!-- Chat Area -->
      <div class="flex-1 flex flex-col bg-soc-surface border border-soc-border rounded-lg overflow-hidden">
        <template v-if="commsStore.activeChannel">
          <!-- Chat Header -->
          <div class="p-3 border-b border-soc-border bg-soc-raised flex items-center justify-between">
            <div class="flex items-center gap-2">
              <img 
                v-if="commsStore.activeChannel.npc.image" 
                :src="commsStore.activeChannel.npc.image" 
                :alt="commsStore.activeChannel.npc.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <span v-else class="text-xl">{{ commsStore.activeChannel.npc.avatar }}</span>
              <div>
                <div class="font-medium text-soc-text flex items-center gap-2">
                  {{ commsStore.activeChannel.npc.name }}
                  <span 
                    v-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'dnd'"
                    class="text-xs px-2 py-0.5 rounded bg-soc-warning/30 text-soc-warning"
                  >
                    Do Not Disturb
                  </span>
                  <span 
                    v-else-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'resolved'"
                    class="text-xs px-2 py-0.5 rounded bg-soc-muted/30 text-soc-muted"
                  >
                    Conversation Ended
                  </span>
                  <span 
                    v-else-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'awaiting-response'"
                    class="text-xs px-2 py-0.5 rounded bg-soc-accent/30 text-soc-accent"
                  >
                    Awaiting Your Response
                  </span>
                  <span 
                    v-else-if="!commsStore.activeChannel.npc.available"
                    class="text-xs px-2 py-0.5 rounded bg-soc-muted/30 text-soc-muted"
                  >
                    Offline
                  </span>
                </div>
                <div class="text-xs text-soc-muted">{{ commsStore.activeChannel.npc.role }}</div>
              </div>
            </div>
            <div class="text-sm text-soc-muted">
              <template v-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'dnd'">
                <span class="text-soc-warning">Do Not Disturb</span>
              </template>
              <template v-else-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'resolved'">
                <span class="text-soc-muted">Conversation complete</span>
              </template>
              <template v-else-if="commsStore.getNpcStatus(commsStore.activeChannelId) === 'awaiting-response'">
                <span class="text-soc-accent">Response requested (one-time)</span>
              </template>
              <template v-else-if="!commsStore.activeChannel.npc.available">
                <span class="text-soc-warning">Auto-reply enabled</span>
              </template>
              <template v-else>
                Escalation cost: 
                <span :class="commsStore.getEscalationCost(commsStore.activeChannelId) === 0 ? 'text-soc-success' : 'text-soc-accent'">
                  {{ getEscalationCostText(commsStore.activeChannelId) }}
                </span>
              </template>
            </div>
          </div>
          
          <!-- Messages -->
          <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-if="commsStore.activeChannel.messages.length === 0" class="text-center text-soc-muted py-8">
              No messages yet. Type below to escalate to {{ commsStore.activeChannel.npc.name }}.
            </div>
            
            <div
              v-for="msg in commsStore.activeChannel.messages"
              :key="msg.id"
              class="flex"
              :class="msg.from === 'player' ? 'justify-end' : 'justify-start'"
            >
              <div 
                class="max-w-[80%] p-3 rounded-lg"
                :class="msg.from === 'player' 
                  ? 'bg-soc-accent text-black' 
                  : 'bg-soc-raised border border-soc-border'"
              >
                <div class="text-xs mb-1" :class="msg.from === 'player' ? 'text-black/60' : 'text-soc-muted'">
                  {{ msg.from === 'player' ? 'You' : msg.npcName }} • {{ msg.gameTime }}
                </div>
                <div class="whitespace-pre-wrap">{{ msg.content }}</div>
              </div>
            </div>
          </div>
          
          <!-- Self-Assessment Modal -->
          <div v-if="showAssessment" class="p-4 border-t border-soc-border bg-soc-raised">
            <div class="bg-soc-surface border-2 border-soc-warning rounded-lg p-4">
              <h3 class="text-lg font-semibold text-soc-warning mb-3">Self-Assessment: Escalation Quality</h3>
              <p class="text-sm text-soc-muted mb-4">
                Review your message. Check ALL that apply honestly — this determines the response quality.
              </p>
              
              <div class="space-y-2 mb-4">
                <label 
                  v-for="(criterion, i) in assessmentCriteria" 
                  :key="i"
                  class="flex items-start gap-3 p-2 rounded hover:bg-soc-raised cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    v-model="assessmentChecks[i]"
                    class="mt-1 w-4 h-4"
                  />
                  <span class="text-sm text-soc-text">{{ criterion }}</span>
                </label>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="text-lg font-bold text-soc-accent">
                  {{ checksCount }} / 5 checks
                </div>
                <div class="flex gap-2">
                  <button 
                    @click="cancelAssessment"
                    class="px-4 py-2 bg-soc-raised border border-soc-border rounded hover:bg-soc-border transition"
                  >
                    Cancel
                  </button>
                  <button 
                    @click="submitWithAssessment"
                    class="px-4 py-2 bg-soc-warning text-black font-semibold rounded hover:bg-yellow-400 transition"
                  >
                    Submit Escalation
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Rachel Confirmation Modal -->
          <div v-if="showRachelConfirm" class="p-4 border-t border-soc-border bg-soc-raised">
            <div class="bg-soc-surface border-2 border-soc-warning rounded-lg p-4">
              <h3 class="text-lg font-semibold text-soc-warning mb-3">Confirm Response to Rachel</h3>
              <p class="text-sm text-soc-muted mb-4">
                You can only respond to Rachel <strong>once</strong>. Your response will be logged and included in the final report.
              </p>
              <div class="bg-soc-bg border border-soc-border rounded p-3 mb-4">
                <div class="text-xs text-soc-muted mb-1">Your message:</div>
                <div class="text-sm text-soc-text whitespace-pre-wrap">{{ messageInput }}</div>
              </div>
              <div class="flex gap-2 justify-end">
                <button 
                  @click="cancelRachelConfirm"
                  class="px-4 py-2 bg-soc-raised border border-soc-border rounded hover:bg-soc-border transition"
                >
                  Continue Writing
                </button>
                <button 
                  @click="confirmRachelResponse"
                  class="px-4 py-2 bg-soc-warning text-black font-semibold rounded hover:bg-yellow-400 transition"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
          
          <!-- Input -->
          <div v-else-if="!showAssessment" class="p-3 border-t border-soc-border">
            <div class="flex gap-2">
              <textarea
                v-model="messageInput"
                @keydown.enter.exact.prevent="sendMessage"
                placeholder="Type your escalation message..."
                rows="3"
                class="flex-1 bg-soc-bg border border-soc-border rounded px-3 py-2 text-sm resize-none focus:outline-none focus:border-soc-accent"
              />
              <button
                @click="sendMessage"
                :disabled="!messageInput.trim()"
                class="px-4 py-2 bg-soc-accent text-black font-semibold rounded hover:bg-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed self-end"
              >
                Send
              </button>
            </div>
            <p class="text-xs text-soc-muted mt-2">
              Press Enter to send.
            </p>
          </div>
        </template>
        
        <div v-else class="flex-1 flex items-center justify-center text-soc-muted">
          Select a contact to start a conversation
        </div>
      </div>
    </div>
  </div>
</template>
