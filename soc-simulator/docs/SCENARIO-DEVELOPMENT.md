# Scenario Development Guide

This document describes how to create and modify scenarios for the SOC Simulator. It is intended for use by LLM agents (like Cascade or Cursor) editing the codebase.

## Scenario Structure

Each scenario lives in `scenarios/<campaign-name>/<session-name>/` and contains:

```
scenarios/operation-glasshouse/session-1/
├── index.js          # Entry point - imports and exports all modules
├── config.js         # Session settings (duration, tokens, company info)
├── npcs.js           # Characters the player can message
├── alerts.js         # SIEM dashboard alerts
├── tickets.js        # Service desk tickets
├── evidence.js       # Evidence items unlocked by actions
├── logs.js           # Raw system logs
├── personnel.js      # Org chart and calendar data
├── threatintel.js    # Threat intelligence portal lookups
├── images.js         # Image imports for the scenario
├── events.js         # Timed events (optional)
└── img/              # Profile images (JPG, 150x150 recommended)
```

---

## Data Schemas

### config.js

Session-level configuration.

```javascript
export default {
  id: 'operation-glasshouse-s1',           // Unique scenario ID
  title: 'Operation Glasshouse',           // Display title
  subtitle: 'Session 1: Static',           // Subtitle shown in header
  
  duration: 3600,                          // Session length in seconds
  startTime: { hour: 8, minute: 0 },       // In-game clock start (8:00am)
  tokens: 12,                              // Starting action tokens
  
  company: {
    name: 'XYZ Pay',                       // Company name (shown in header)
    industry: 'Buy Now Pay Later (BNPL)',
    location: 'Adelaide, Australia',
    employees: 150
  },
  
  briefing: {
    title: 'Welcome to the SOC',
    date: 'Monday, 14 October 2024',
    shift: 'Day Shift (08:00 - 16:00 ACDT)',
    content: `Multi-line briefing text shown on start screen...`
  },
  
  sessionEnd: {
    title: 'Session Complete',
    message: 'The timer has ended.',
    downloadWarning: 'You must save your session report now...',
    instructions: 'Follow any instructions from your tutor...'
  },
  
  credits: {
    story: 'Story by ...',                 // Story/scenario authors
    acknowledgements: 'Thanks to ...',     // Optional acknowledgements
    assets: 'Profile pictures from ...',   // Asset credits
    disclaimer: 'This scenario is ...'     // Legal disclaimer
  }
}
```

**Note:** Credits are displayed in the About modal (info button in header). All fields are optional.

---

### npcs.js

Characters the player can message. Each NPC has a messaging mode that controls interaction.

```javascript
import images from './images.js'

export default {
  npcId: {
    id: 'npcId',                           // Must match the object key
    name: 'Full Name',
    role: 'Job Title',
    image: images.npcId,                   // Reference to imported image
    available: true,                       // Whether NPC appears in channel list
    messagingMode: 'escalation',           // See "Messaging Modes" below
    escalationCost: { first: 0, followUp: 1 },  // Token cost (escalation mode only)
    
    // Optional: Message history (pre-existing conversation)
    messageHistory: [
      {
        id: 'unique-msg-id',
        timestamp: '2024-10-09T09:00:00',  // ISO timestamp for sorting
        gameTime: 'Wed 9:00am',            // Display time in chat
        from: 'npc',                       // 'npc' or 'player'
        content: 'Message content...'
      }
    ],
    
    // Optional: Initial message sent when session starts
    initialMessage: {
      delay: 0,                            // Milliseconds after session start
      timestamp: '2024-10-14T07:51:00',
      gameTime: 'Mon 7:51am',
      content: 'Message content...'
    },
    
    // Optional: Messages scheduled during the session
    scheduledMessages: [
      {
        id: 'unique-scheduled-id',
        triggerAt: 2400,                   // Seconds into session (40 min mark)
        content: 'Message content...',
        switchMode: 'online'               // Optional: change messaging mode
      }
    ],
    
    // For escalation mode: self-assessment criteria (checkboxes shown to player)
    selfAssessmentCriteria: [
      'Names a specific user account of concern',
      'References key evidence',
      'Describes a timeline of events',
      'Proposes a specific action OR asks a specific question',
      'Includes severity assessment with justification'
    ],
    
    // For escalation mode: tiered responses based on self-assessment score
    responses: {
      strong: {
        minScore: 4,
        title: 'Strong Escalation',
        content: 'Response for score >= 4...'
      },
      partial: {
        minScore: 2,
        title: 'Partial Escalation',
        content: 'Response for score 2-3...'
      },
      weak: {
        minScore: 0,
        title: 'Weak Escalation',
        content: 'Response for score 0-1...'
      }
    },
    
    // Optional: Behavior after strong escalation
    onStrongEscalation: {
      switchMode: 'dnd'                    // Switch to this mode after strong response
    },
    
    // For auto-reply mode: out-of-office response
    autoReply: 'Auto-reply message content...',
    
    // Optional: Special one-time interaction triggered by an action
    specialInteraction: {
      type: 'one-time-response',
      triggeredByAction: 'action-id',      // Action ID that triggers this
      delaySeconds: 60,                    // Delay after action
      promptMessage: 'NPC asks player...',
      responseMessage: 'NPC response after player replies...',
      confirmTitle: 'Modal Title',
      confirmText: 'Modal explanation text...'
    }
  }
}
```

#### Messaging Modes

| Mode | Behavior |
|------|----------|
| `escalation` | Player writes message, completes self-assessment checklist, receives tiered response. May cost tokens. |
| `auto-reply` | Player can message, receives automatic out-of-office response. |
| `online` | Player can message, no response (green status dot). |
| `dnd` | Player can message, no response (yellow "Do Not Disturb" dot). |
| `busy` | Player cannot message at all (red dot). |

#### Escalation Self-Assessment

When an NPC has `messagingMode: 'escalation'`, the player sees a self-assessment checklist after writing their message. They check which criteria their message meets, and the count determines the response tier:

1. Player writes escalation message
2. Player sees confirmation with their message
3. Player checks boxes for criteria they believe they've met
4. Score = number of boxes checked
5. Score compared against `responses.strong.minScore`, `responses.partial.minScore`
6. Appropriate tiered response delivered

This encourages players to reflect on the quality of their escalation before submitting.

---

### alerts.js

SIEM dashboard alerts. Array of alert objects.

```javascript
export default [
  {
    id: 'M-2489',                          // Alert ID (displayed to player)
    severity: 'medium',                    // 'low', 'medium', 'high', 'critical'
    title: 'Alert title',
    timestamp: '2024-10-14T08:05:00',      // When alert occurred (ISO)
    source: '10.50.21.103',                // Source IP/system
    target: 'internal-sso',                // Target system
    user: 'user@company.com',              // Optional: associated user
    status: 'open',                        // 'open', 'acknowledged', 'closed'
    visibleAt: 300,                        // Seconds into session when alert appears (0 = immediate)
    
    details: `Multi-line alert details...`, // Shown when alert is selected
    
    actions: [
      {
        id: 'action-id',                   // Unique action ID
        label: 'Action Button Label',
        cost: 2,                           // Token cost
        description: 'What this action does',
        
        // Optional properties:
        unlocksEvidence: 'EV-1',           // Evidence ID to unlock
        isBlockIP: true,                   // Special handling for IP blocking
        ip: '103.42.91.17',                // IP to block (if isBlockIP)
        notification: 'Success message',   // Toast notification on completion
        logMessage: 'Action log entry',    // Entry for session report
        logType: 'containment'             // Log category
      }
    ]
  }
]
```

---

### tickets.js

Service desk tickets. Array of ticket objects.

```javascript
export default [
  {
    id: 'TKT-4471',
    priority: 'medium',                    // 'low', 'medium', 'high', 'critical'
    status: 'open',                        // 'open', 'closed'
    category: 'Security — Vishing Report',
    visibleAt: 0,                          // Seconds into session (0 = immediate)
    
    from: {
      name: 'Sender Name',
      email: 'sender@company.com',
      department: 'Department'
    },
    
    subject: 'Ticket subject line',
    submitted: '2024-10-13T10:17:00',      // When ticket was submitted
    sla: '4 hours',                        // SLA display text
    content: `Multi-line ticket content...`,
    
    actions: [
      {
        id: 'action-id',
        label: 'Action Label',
        cost: 1,
        description: 'What this action does',
        unlocksEvidence: 'EV-5',           // Optional: unlock evidence
        closesTicket: true,                // Optional: closes ticket when clicked
        requiresEvidence: ['EV-5']         // Optional: only show if evidence unlocked
      }
    ],
    
    // Optional: ticket appears only after an action is taken
    triggeredBy: 'action-id',
    triggerDelaySeconds: 600               // Delay after trigger action
  }
]
```

---

### evidence.js

Evidence items unlocked by actions. Array of evidence objects.

```javascript
export default [
  {
    id: 'EV-5',
    title: 'Evidence Title',
    category: 'Interview',                 // Category for display
    content: `Multi-line evidence content...
    
    Can include formatted text, tables, etc.`
  }
]
```

---

### logs.js

Raw system logs displayed in the Log Viewer. Array of log entries.

```javascript
export default [
  {
    id: 'LOG-0001',
    timestamp: '2024-10-14T08:00:00',      // ISO timestamp (used for filtering)
    system: 'internal-sso',                // System name
    type: 'auth',                          // 'auth', 'system', 'network', 'database', 'email', 'access'
    severity: 'info',                      // 'info', 'warning', 'medium', 'high', 'critical'
    source: '10.50.21.103',                // Source IP/system
    user: 'user@company.com',              // Optional: user associated
    action: 'login_success',               // Action type
    message: 'Brief log message',
    details: 'Additional details'          // Optional: expanded info
  }
]
```

**Note:** Logs are filtered by time-of-day only (date is ignored). The log's hour:minute is compared against the current in-game clock. For example:
- Scenario starts at 08:00, log timestamp `14:22:00` → appears at 6h 22m into session
- Scenario starts at 14:00, log timestamp `14:22:00` → appears at 22m into session

**Historical logs:** To show logs from "before" the session (e.g., overnight activity), give them timestamps earlier than your start time. A log at `06:00` will be visible immediately if the session starts at `08:00`. The date portion is for display/narrative only.

---

### personnel.js

Org chart and calendar data. Object keyed by person ID.

```javascript
import images from './images.js'

export default {
  'person-id': {
    id: 'person-id',
    name: 'Full Name',
    role: 'Job Title',
    department: 'Department',
    email: 'email@company.com',
    avatar: '👨‍💼',                         // Emoji fallback
    image: images.personId,               // Profile image
    reportsTo: 'manager-id',              // null for CEO
    location: 'Office Location',
    startDate: '2020-06-15',
    bio: 'Brief biography...',
    
    calendar: [
      {
        day: 'Monday',
        entries: [
          {
            time: '09:00',
            duration: 60,                  // Minutes
            title: 'Meeting Title',
            location: 'Room Name',
            note: 'Optional note'          // e.g., 'Do Not Disturb'
          }
        ]
      }
    ]
  }
}
```

---

### threatintel.js

Threat intelligence portal data for IOC lookups.

```javascript
export default {
  ips: {
    '103.42.91.17': {
      type: 'ip',
      reputation: 'suspicious',            // 'clean', 'suspicious', 'malicious'
      riskScore: 45,                       // 0-100
      category: 'VPN/Proxy Service',
      country: 'Indonesia',
      asn: 'AS138915 - Provider Name',
      firstSeen: '2024-06-22',
      lastSeen: '2024-10-14',
      tags: ['vpn', 'proxy'],
      reports: 12,                         // Community reports
      summary: 'Detailed analysis...',
      relatedCampaigns: ['Campaign Name'],
      recommendation: 'What to do...',
      
      actions: [                           // Optional: actions from this lookup
        {
          id: 'action-id',
          label: 'Action Label',
          cost: 1,
          description: 'Description',
          unlocksEvidence: 'EV-8'
        }
      ]
    }
  },
  
  domains: {
    'example.com': { /* same structure */ }
  },
  
  hashes: {
    'abc123...': { /* same structure */ }
  },
  
  emails: {
    'sender@example.com': { /* same structure */ }
  }
}
```

---

### images.js

Import all profile images used in the scenario.

```javascript
import alex from './img/alex.jpg'
import priya from './img/priya.jpg'
// ... more imports

export default {
  alex,
  priya,
  // ... export all
}
```

**Image requirements:**
- Place images in `./img/` subdirectory
- Recommended: 150x150px JPG
- Images are automatically optimized and inlined during build

---

### index.js

Entry point that exports all scenario modules.

```javascript
import config from './config.js'
import alerts from './alerts.js'
import tickets from './tickets.js'
import evidence from './evidence.js'
import npcs from './npcs.js'
import events from './events.js'
import personnel from './personnel.js'
import logs from './logs.js'
import threatintel from './threatintel.js'

export default {
  config,
  alerts,
  tickets,
  evidence,
  npcs,
  events,
  personnel,
  logs,
  threatintel
}
```

---

## Creating a New Scenario

1. **Copy the template** as your starting point:
   ```bash
   cp -r scenarios/_template scenarios/your-campaign-name/session-1
   ```

2. **Edit config.js** with your scenario details (title, company, briefing, etc.)

3. **Edit data files** — Add your alerts, tickets, NPCs, logs, evidence, etc.

4. **Add profile images** (optional) — Place in `./img/` and update `images.js`

5. **Test with dev server:**
   ```bash
   SCENARIO=your-campaign/session-1 npm run dev
   ```

6. **Build for deployment:**
   ```bash
   npm run build:scenario your-campaign/session-1
   ```

**Note:** The `_template` folder contains minimal working examples of all required files. It's designed to be a clean starting point rather than copying a full scenario.

---

## Time-Based Features

Several features use time-based triggers:

| Property | Used In | Description |
|----------|---------|-------------|
| `visibleAt` | alerts, tickets | Seconds into session when item appears |
| `triggerAt` | scheduledMessages | Seconds into session to send message |
| `triggeredBy` | tickets | Action ID that makes ticket appear |
| `triggerDelaySeconds` | tickets, specialInteraction | Delay after trigger before appearing |
| `timestamp` | logs | Logs filtered by game time automatically |

---

## Action Triggers

Actions can trigger side effects:

| Action Property | Effect |
|-----------------|--------|
| `unlocksEvidence` | Makes evidence item visible in Evidence Locker |
| `closesTicket` | Marks the parent ticket as closed |
| `notification` | Shows toast notification |
| `logMessage` + `logType` | Adds entry to action log |
| Matching `triggeredByAction` in NPC | Triggers special interaction |
| Matching `triggeredBy` in ticket | Makes ticket appear after delay |
