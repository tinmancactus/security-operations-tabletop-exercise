# Architecture

Technical architecture and design principles for the SOC Simulator.

---

## Core Design Principle: Separation of Concerns

**The application logic (frontend) must be completely separated from scenario data (storyline).**

This means:
- **No character names** in `/src` code (e.g., no `if (npcId === 'priya')`)
- **No story-specific IDs** in `/src` code (e.g., no `if (action.id === 'disable-liam')`)
- **No company names, locations, or narrative details** in `/src` code
- **All behavior is data-driven** through scenario configuration

### Why This Matters

1. **New scenarios require zero frontend changes** — just add data files
2. **LLM agents can create scenarios** without understanding Vue/JavaScript internals
3. **Bugs in one scenario don't affect others**
4. **The same codebase supports unlimited scenarios**

### How It's Enforced

Before making changes to `/src`, search for existing character/story references:
```bash
# Should return NO results
grep -r "Priya\|Liam\|Rachel\|XYZPay" src/
```

If you need NPC-specific behavior, add a configuration property to the NPC data in the scenario, then handle it generically in the frontend.

**Example — Wrong:**
```javascript
// BAD: Hardcoded NPC name in frontend
if (npcId === 'priya') {
  commsStore.setNpcMessagingMode(npcId, 'dnd')
}
```

**Example — Correct:**
```javascript
// GOOD: Data-driven behavior
// In npcs.js:
priya: {
  onStrongEscalation: { switchMode: 'dnd' }
}

// In CommsPanel.vue:
if (npc.onStrongEscalation?.switchMode) {
  commsStore.setNpcMessagingMode(npcId, npc.onStrongEscalation.switchMode)
}
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vue 3 (Composition API with `<script setup>`) |
| State Management | Pinia |
| Styling | Tailwind CSS 4 |
| Icons | Lucide Vue |
| Build Tool | Vite |
| Single-File Build | vite-plugin-singlefile |
| PDF Export | html2pdf.js |
| Image Optimization | sharp (build-time only) |

---

## Project Structure

```
soc-simulator/
├── src/
│   ├── App.vue                 # Main app, scenario loading, view routing
│   ├── main.js                 # Entry point
│   ├── style.css               # Global styles, Tailwind imports
│   ├── components/
│   │   ├── shell/              # App shell (header, nav, modals)
│   │   ├── siem/               # SIEM dashboard views
│   │   ├── tickets/            # Service desk views
│   │   ├── comms/              # Messaging panel
│   │   ├── evidence/           # Evidence locker
│   │   ├── logs/               # Log viewer
│   │   ├── orgchart/           # Organisation chart
│   │   └── threatintel/        # Threat intel portal
│   ├── stores/                 # Pinia stores (state management)
│   │   ├── game.js             # Timer, tokens, notifications, action log
│   │   ├── alerts.js           # SIEM alerts state
│   │   ├── tickets.js          # Service desk state
│   │   ├── comms.js            # Messaging state
│   │   ├── evidence.js         # Evidence state
│   │   └── threatintel.js      # Threat intel state
│   └── utils/
│       └── exportPdf.js        # PDF report generation
├── scenarios/                   # Scenario data (see SCENARIO-DEVELOPMENT.md)
├── scripts/
│   └── build-scenario.js       # Single-file build script
└── docs/                        # Documentation
```

---

## State Management (Pinia Stores)

### game.js
Central game state and timer management.

**State:**
- `scenario` — Loaded scenario data
- `timeRemaining` — Seconds left in session
- `tokens` — Available action tokens
- `actionLog` — Player actions for report
- `notifications` — Toast notifications
- `scheduledCallbacks` — Time-based event queue

**Key Functions:**
- `startSession()` / `resetSession()`
- `spendTokens(cost, label)` — Deduct tokens, log action
- `scheduleCallback(id, seconds, fn)` — Schedule future events
- `logAction(message, type, data)` — Record for report

### comms.js
Messaging and NPC interaction state.

**State:**
- `npcs` — NPC data from scenario
- `channels` — Message history per NPC
- `activeChannelId` — Currently selected chat
- `npcStatus` — Per-NPC status (dnd, awaiting-response, resolved)
- `pendingEscalation` — Escalation flow state

**Key Functions:**
- `sendMessage(npcId, content)` — Player sends message
- `receiveMessage(npcId, content)` — NPC message arrives
- `triggerSpecialInteraction(actionId)` — Trigger NPC interaction from action
- `setNpcMessagingMode(npcId, mode)` — Change NPC availability

### alerts.js
SIEM alert state.

**State:**
- `alerts` — Alert data from scenario
- `selectedAlertId` — Currently viewed alert
- `completedActions` — Set of completed action IDs
- `blockedIPs` — Set of blocked IPs

### tickets.js
Service desk ticket state.

**State:**
- `tickets` — Ticket data from scenario
- `selectedTicketId` — Currently viewed ticket
- `completedActions` — Set of completed action IDs
- `ticketNotes` — Player notes per ticket

### evidence.js
Evidence locker state.

**State:**
- `evidence` — Evidence data from scenario
- `unlockedIds` — Set of unlocked evidence IDs

---

## Build System

### Development
```bash
npm run dev
```
Runs Vite dev server with hot module replacement.

### Production Build
```bash
npm run build:scenario <campaign>/<session>
```

The build script (`scripts/build-scenario.js`):
1. Validates scenario exists
2. Optimizes images (resize to 150x150, compress to JPEG quality 80)
3. Runs Vite build with `vite-plugin-singlefile`
4. All assets inlined as base64 (`assetsInlineLimit: Infinity`)
5. Outputs single HTML file to `builds/`
6. Restores original images

### Scenario Selection
Scenarios are selected at build time via the `SCENARIO` environment variable:
```javascript
// vite.config.js
const scenario = process.env.SCENARIO || 'operation-glasshouse/session-1'
```

The scenario path is injected into the app via `define`:
```javascript
define: {
  '__SCENARIO_PATH__': JSON.stringify(scenario)
}
```

And loaded dynamically in `App.vue`:
```javascript
const scenarioModules = import.meta.glob('../scenarios/**/index.js', { eager: true })
const scenario = scenarioModules[`../scenarios/${__SCENARIO_PATH__}/index.js`]?.default
```

---

## Component Patterns

### Action Handling
Actions from alerts, tickets, and threat intel follow a consistent pattern:

```javascript
function handleAction(action) {
  if (gameStore.timeExpired) return
  
  if (gameStore.spendTokens(action.cost, action.label)) {
    // Mark completed
    store.completeAction(action.id)
    
    // Unlock evidence
    if (action.unlocksEvidence) {
      evidenceStore.unlockEvidence(action.unlocksEvidence)
    }
    
    // Custom notification/log
    if (action.notification) {
      gameStore.addNotification(action.notification, 'success')
    }
    if (action.logMessage) {
      gameStore.logAction(action.logMessage, action.logType || 'action')
    }
    
    // Trigger NPC interactions
    commsStore.triggerSpecialInteraction(action.id)
    
    // Trigger delayed tickets
    ticketsStore.triggerActionTickets(action.id)
  }
}
```

### Time-Based Visibility
Items can appear at specific times using `visibleAt`:

```javascript
const visibleAlerts = computed(() => {
  const elapsed = totalDuration - gameStore.timeRemaining
  return alerts.filter(a => (a.visibleAt || 0) <= elapsed)
})
```

### Persistence
State is saved to localStorage on changes and restored on page reload:

```javascript
// In store
function saveState() {
  localStorage.setItem('soc-comms-state', JSON.stringify({
    channels: channels.value,
    // ...
  }))
}

function loadState() {
  const saved = localStorage.getItem('soc-comms-state')
  if (saved) {
    const data = JSON.parse(saved)
    // restore state...
  }
}
```

---

## Console Commands

Debug commands exposed via `window.soc`:

| Command | Description |
|---------|-------------|
| `soc.help()` | List all commands |
| `soc.status()` | Show game state |
| `soc.setTime(seconds)` | Set remaining time |
| `soc.addTokens(n)` | Add tokens |
| `soc.pause()` / `soc.resume()` | Control timer |
| `soc.reset()` | Reset to start screen |
| `soc.previewReport()` | Open report HTML in new tab |

Defined in `stores/game.js` and attached to window in `App.vue`.
