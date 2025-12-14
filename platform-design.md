# SOC Simulator Platform Design

> **Document Purpose**: Technical design for the SOC Workstation Simulator — a web-based platform for running tabletop cybersecurity exercises. This document covers architecture, separation of concerns, and MVP scope.

---

## Vision

A browser-based "SOC analyst workstation" that immerses students in realistic incident response scenarios. Students interact with simulated security tools (SIEM, ticketing, threat intel, comms) while the platform tracks their decisions, captures assessment artefacts, and delivers story beats at appropriate moments.

**Key Principle**: The platform is scenario-agnostic. The same application can run completely different stories by loading different data files.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        SOC SIMULATOR                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐    ┌─────────────────────────────────────┐ │
│  │                 │    │           SCENARIO DATA             │ │
│  │    PLATFORM     │◄───│                                     │ │
│  │    (Vue.js)     │    │  • Story config (JSON/JS)           │ │
│  │                 │    │  • Evidence cards                   │ │
│  │  • UI Components│    │  • SIEM alerts                      │ │
│  │  • Game engine  │    │  • Tickets                          │ │
│  │  • State mgmt   │    │  • NPC definitions                  │ │
│  │  • Timer system │    │  • Timed events                     │ │
│  │  • PDF export   │    │  • Response logic                   │ │
│  │                 │    │                                     │ │
│  └─────────────────┘    └─────────────────────────────────────┘ │
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    LOCAL STORAGE                            ││
│  │  • Game state    • Action log    • Comms transcript         ││
│  └─────────────────────────────────────────────────────────────┘│
│           │                                                     │
│           ▼                                                     │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    PDF EXPORT                               ││
│  │  Assessment artefacts for LMS submission                    ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Separation of Concerns

### Platform Layer (`/src`)

The platform provides the **engine and UI** — it knows *how* to run a scenario but not *what* the scenario contains.

| Component | Responsibility |
|-----------|----------------|
| **Game Engine** | Timer, token management, event scheduling, state transitions |
| **UI Shell** | Window management, navigation, notifications, theming |
| **SIEM Module** | Renders alert dashboard, filtering, detail views |
| **Tickets Module** | Renders ticket queue, detail views, note-taking |
| **Comms Module** | Chat interface, message parsing, response delivery |
| **Threat Intel Module** | Search interface, result rendering |
| **Logs Module** | Log viewer with search/filter |
| **Report Module** | Structured form for triage report |
| **Export Module** | PDF generation from captured artefacts |
| **State Store** | Pinia store for reactive game state |

### Scenario Layer (`/scenarios`)

Each scenario is a self-contained data package that the platform loads.

```
/scenarios
  /operation-glasshouse
    /session-1
      config.js          # Session metadata, timing, token count
      alerts.js          # SIEM alert definitions
      tickets.js         # Support ticket definitions
      evidence.js        # Evidence cards and unlock logic
      npcs.js            # NPC definitions and response trees
      events.js          # Timed events and triggers
      logs.js            # Auth logs, system logs
      threatIntel.js     # Threat intel database entries
      strings.js         # UI text, briefings, cliffhanger
    /session-2
      ...
    /session-3
      ...
  /another-scenario
    ...
```

### Scenario Config Schema

```javascript
// /scenarios/operation-glasshouse/session-1/config.js

export default {
  id: 'operation-glasshouse-s1',
  title: 'Operation Glasshouse',
  subtitle: 'Session 1: Static',
  
  // Session settings
  duration: 3600,           // seconds
  tokens: 12,
  
  // Opening
  briefing: {
    title: 'Welcome to the SOC',
    content: '...',         // Markdown supported
    company: 'XYZ Pay',
    date: 'Monday, 14 October 2024',
    shift: 'Day Shift (08:00 - 16:00 ACDT)'
  },
  
  // What's available at start
  initialState: {
    visibleAlerts: ['M-2471', 'M-2472', 'M-2473'],
    visibleTickets: ['TKT-4471', 'TKT-4468'],
    unlockedEvidence: [],
    availableNPCs: ['priya'],
  },
  
  // Cliffhanger
  endState: {
    trigger: 'timer',       // or 'manual'
    content: '...'
  }
}
```

---

## Platform Components

### 1. Game Engine

**Responsibilities**:
- Manage game clock (start, pause, resume)
- Track token balance
- Schedule and fire timed events
- Evaluate action prerequisites
- Record all actions to log

**Interface**:
```javascript
// Composable: useGameEngine()

const {
  // State
  timeRemaining,
  tokens,
  isRunning,
  
  // Actions
  startTimer,
  pauseTimer,
  spendTokens,
  addTokens,
  
  // Events
  scheduleEvent,
  cancelEvent,
  
  // Logging
  logAction,
  getActionLog
} = useGameEngine()
```

### 2. UI Shell

**Layout**:
```
┌──────────────────────────────────────────────────────────────┐
│  HEADER: Company logo | Session title | Timer | Tokens       │
├────────────┬─────────────────────────────────────────────────┤
│            │                                                 │
│  SIDEBAR   │              MAIN CONTENT AREA                  │
│            │                                                 │
│  • SIEM    │   (Renders active module)                       │
│  • Tickets │                                                 │
│  • Comms   │                                                 │
│  • Intel   │                                                 │
│  • Logs    │                                                 │
│  • Report  │                                                 │
│            │                                                 │
├────────────┴─────────────────────────────────────────────────┤
│  STATUS BAR: Notifications | Unread counts | Quick actions   │
└──────────────────────────────────────────────────────────────┘
```

**Visual Style**: Functional mimicry of enterprise security tools
- Dark theme (SOC aesthetic)
- Monospace fonts for logs/data
- Colour-coded severity (Critical=red, High=orange, Medium=yellow, Low=blue)
- Subtle animations for new alerts/messages

### 3. SIEM Module

**Features**:
- Alert list with severity badges
- Filter by severity, status, time range
- Click alert → detail panel
- Contextual actions on each alert:
  - "Investigate" (may cost tokens)
  - "Correlate with other alerts"
  - "Escalate"
  - "Close as false positive"

**Data Schema**:
```javascript
// alerts.js
export default [
  {
    id: 'M-2471',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T03:12:00',
    source: '185.220.101.42',
    details: '...',
    visibleAt: 0,           // seconds into session (0 = start)
    actions: [
      { id: 'block-ip', label: 'Block IP', cost: 2, triggersEnvelope: 'ENV-1E' }
    ]
  },
  {
    id: 'M-2489',
    severity: 'medium',
    title: 'Unusual login pattern detected',
    timestamp: '2024-10-14T08:34:00',
    source: '103.42.91.17',
    user: 'liam.fitzgerald@xyzpay.com.au',
    details: '...',
    visibleAt: 1200,        // appears at 40:00 remaining
    actions: [...]
  }
]
```

### 4. Tickets Module

**Features**:
- Ticket queue with priority/status
- Click ticket → full details
- Add notes (free, captured for assessment)
- Contextual actions embedded in ticket:
  - "Interview [employee] (basic)" — 1 token
  - "Interview [employee] (detailed)" — 2 tokens
  - "Analyse attachment"
  - "Close ticket"

**Data Schema**:
```javascript
// tickets.js
export default [
  {
    id: 'TKT-4471',
    priority: 'low',
    status: 'open',
    from: 'Liam Fitzgerald',
    department: 'Customer Support',
    subject: 'Weird call from IT department',
    submitted: '2024-10-13T16:42:00',
    content: '...',
    actions: [
      {
        id: 'interview-liam-basic',
        label: 'Interview Liam (basic)',
        cost: 1,
        unlocksEvidence: 'EV-5-PARTIAL'
      },
      {
        id: 'interview-liam-detailed',
        label: 'Interview Liam (detailed)',
        cost: 2,
        unlocksEvidence: 'EV-5-FULL'
      }
    ]
  }
]
```

### 5. Comms Module

**Features**:
- Slack/Teams-style chat interface
- Separate channels per NPC
- Students type messages freely
- On send: parse message, score against rubric, deliver response
- Full transcript captured

**NPC Response Logic**:
```javascript
// npcs.js
export default {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    avatar: '/avatars/priya.png',
    available: true,
    escalationCost: { first: 2, followUp: 0 },
    
    responseRubric: [
      { id: 'names-account', keywords: ['liam', 'fitzgerald', 'account'], points: 1 },
      { id: 'has-evidence', keywords: ['mfa', 'bypass', 'vishing', 'social engineering'], points: 1 },
      { id: 'has-timeline', keywords: ['sunday', '10am', '10:14', 'timeline'], points: 1 },
      { id: 'proposes-action', keywords: ['disable', 'block', 'investigate', 'recommend'], points: 1 },
      { id: 'has-severity', keywords: ['severity', 'high', 'medium', 'critical', 'priority'], points: 1 }
    ],
    
    responses: {
      strong: { minScore: 4, content: '...' },
      partial: { minScore: 2, content: '...' },
      weak: { minScore: 0, content: '...' }
    }
  }
}
```

### 6. Threat Intel Module

**Features**:
- Search bar for IPs, domains, threat actors
- Results from scenario's intel database
- Some queries free, deep dives cost tokens
- Foreshadowing content (right_0ff entry)

### 7. Logs Module

**Features**:
- Realistic log viewer (auth logs, system logs)
- Search and filter
- "Quick check" (1 token) → summary view
- "Deep analysis" (2 tokens) → highlights anomalies

### 8. Report Module

**Features**:
- Structured form matching Triage Report template
- Auto-populated fields (evidence reviewed, tokens spent)
- Free-text fields for analysis
- Save progress, export when complete

### 9. Export Module

**PDF Contents**:
1. Cover page (scenario, team name, date)
2. Executive summary (from report)
3. Complete action log with timestamps
4. Full comms transcripts
5. Ticket notes
6. Evidence cards reviewed
7. Token usage breakdown
8. Triage report

---

## State Management

Using **Pinia** for Vue.js state management.

### Stores

```javascript
// stores/game.js — Core game state
{
  sessionId: 'operation-glasshouse-s1',
  timeRemaining: 3600,
  tokens: 12,
  isRunning: false,
  isPaused: false,
  startedAt: null
}

// stores/alerts.js — SIEM state
{
  alerts: [],
  visibleAlerts: [],
  selectedAlert: null,
  filters: { severity: 'all', status: 'all' }
}

// stores/tickets.js — Ticketing state
{
  tickets: [],
  selectedTicket: null,
  notes: {}  // ticketId -> notes array
}

// stores/comms.js — Communications state
{
  channels: {},      // npcId -> message array
  activeChannel: null,
  escalationCounts: {}  // npcId -> count
}

// stores/evidence.js — Evidence/intel state
{
  unlockedEvidence: [],
  searchHistory: []
}

// stores/log.js — Action log
{
  entries: []  // { timestamp, action, details, tokenCost }
}

// stores/report.js — Triage report
{
  sections: {
    summary: '',
    severity: null,
    findings: [],
    ...
  }
}
```

### Persistence

All stores persist to localStorage with a session key:
```javascript
localStorage.setItem('soc-sim-state', JSON.stringify(state))
```

On load, check for existing state and offer to resume or start fresh.

---

## Timed Events System

Events are defined in scenario data and scheduled by the game engine.

```javascript
// events.js
export default [
  {
    id: 'alert-liam-login',
    triggerAt: 1200,        // 40:00 remaining (20 min elapsed)
    type: 'alert',
    action: 'showAlert',
    payload: { alertId: 'M-2489' },
    notification: 'New SIEM alert received'
  },
  {
    id: 'priya-checkin',
    triggerAt: 2400,        // 20:00 remaining
    type: 'message',
    action: 'receiveMessage',
    payload: { 
      npcId: 'priya', 
      content: 'Hey team, quick check-in...' 
    },
    notification: 'New message from Priya Sharma'
  },
  {
    id: 'cliffhanger',
    triggerAt: 3300,        // 05:00 remaining
    type: 'alert',
    action: 'showCliffhanger',
    payload: { alertId: 'H-0012' },
    notification: '🚨 CRITICAL ALERT',
    pauseTimer: true
  }
]
```

---

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Framework | Vue.js 3 | Composition API |
| Build | Vite | Fast dev server, optimised builds |
| State | Pinia | Vue's recommended state management |
| Styling | Tailwind CSS | Utility-first, dark theme |
| Icons | Lucide Vue | Clean, consistent iconography |
| PDF | html2pdf.js | Client-side PDF generation |
| Hosting | GitHub Pages | Static, free, simple |
| Routing | Vue Router | For future multi-session support |

---

## File Structure

```
/soc-simulator
├── /public
│   └── /avatars              # NPC avatar images
├── /src
│   ├── /assets               # Static assets, fonts
│   ├── /components
│   │   ├── /shell            # Layout, header, sidebar
│   │   ├── /siem             # SIEM dashboard components
│   │   ├── /tickets          # Ticketing components
│   │   ├── /comms            # Chat interface components
│   │   ├── /intel            # Threat intel components
│   │   ├── /logs             # Log viewer components
│   │   ├── /report           # Report form components
│   │   └── /common           # Shared UI components
│   ├── /composables          # Vue composables (useTimer, useTokens, etc.)
│   ├── /stores               # Pinia stores
│   ├── /utils                # Helpers (PDF export, parsing, etc.)
│   ├── /types                # TypeScript interfaces (if using TS)
│   ├── App.vue
│   └── main.js
├── /scenarios
│   └── /operation-glasshouse
│       └── /session-1
│           ├── config.js
│           ├── alerts.js
│           ├── tickets.js
│           ├── evidence.js
│           ├── npcs.js
│           ├── events.js
│           ├── logs.js
│           ├── threatIntel.js
│           └── strings.js
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## MVP Scope (Phase 1)

### In Scope
- [x] Game engine (timer, tokens, event scheduling)
- [x] UI shell with dark SOC theme
- [x] SIEM dashboard with Session 1 alerts
- [x] Ticketing system with Liam & Jenny tickets
- [x] Contextual actions (interview, investigate)
- [x] Comms panel with Priya (keyword-scored responses)
- [x] Timed events (new alert at 40:00, Priya ping at 20:00, cliffhanger at 05:00)
- [x] Action log capture
- [x] Basic PDF export (action log + comms)
- [x] localStorage persistence
- [x] Start/briefing screen
- [x] Cliffhanger reveal

### Out of Scope (Future Phases)
- [x] Threat intel search portal
- [x] Full log viewer with search
- [x] Org chart with personnel profiles & calendars
- [x] Profile images for personnel/NPCs
- [x] Rachel NPC (Infrastructure Lead)
- [x] Alex shift handover message
- [ ] James NPC (Tier 3 Analyst)
- [ ] Session 2 & 3 content
- [ ] LLM-powered NPC responses
- [ ] Multiplayer / shared sessions
- [ ] Tutor dashboard
- [ ] Sound effects / audio

> **Note**: Structured triage reports are handled externally (Word/LMS submission). The PDF export provides the action log students reference in their written reports.

---

## Development Phases

### Phase 1: MVP (Current)
Session 1 playable end-to-end with core systems.

### Phase 2: Rich Environment ✅
- Threat intel portal
- Log viewer
- Org chart with profiles
- Rachel NPC
- Profile images

### Phase 3: Full Story
- Session 2 content (attacker persistence + insider discovery)
- Session 3 content (crisis management + recovery)
- James NPC (Tier 3)

### Phase 4: Enhancements
- LLM integration for NPC responses
- Multiplayer sessions
- Tutor dashboard
- Additional scenarios

---

## Future: Multiplayer Architecture

When we add multiplayer support:

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Player 1   │     │  Player 2   │     │  Player 3   │
│  (browser)  │     │  (browser)  │     │  (browser)  │
└──────┬──────┘     └──────┬──────┘     └──────┬──────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                           ▼
                 ┌─────────────────┐
                 │  BaaS (Firebase │
                 │  or Supabase)   │
                 │                 │
                 │  • Session sync │
                 │  • Real-time DB │
                 │  • Auth         │
                 └─────────────────┘
```

Players join with a session code. State syncs in real-time. One player's actions are visible to all.

---

## Next Steps

1. **Scaffold Vue.js project** with Vite, Tailwind, Pinia
2. **Build UI shell** (header, sidebar, main area)
3. **Implement game engine** composable
4. **Create SIEM module** with Session 1 alerts
5. **Create Tickets module** with Liam/Jenny tickets
6. **Create Comms module** with Priya
7. **Wire up timed events**
8. **Add PDF export**
9. **Test full Session 1 playthrough**
10. **Deploy to GitHub Pages**

---

*Document version: 0.1*
*Last updated: December 2024*
