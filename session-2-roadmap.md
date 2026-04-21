# Operation Glasshouse: Session 2 — Roadmap from 30 Minutes to Finale

## Current State (What's Implemented)

### First 30 Minutes Content

**Starting Artefacts (Visible at 00:00)**
- Company-wide security advisory (Marcus's Monday email)
- Customer Impact Assessment (EV-20) — the confidential PII-linked document
- 4 vishing-related tickets: David Chen (compromised), Nadia Khoury (compromised), Linda Park (resisted), Mei Zhang (resisted)
- Multiple SIEM alerts from overnight (most are noise/acknowledged)
- VPN session review evidence for Marcus, Priya, Rachel (legitimate)
- VPN session review for Sandra (⚠️ suspicious — concurrent sessions)
- Scheduled task audit (EV-26) — svc_backup_admin, PII vault export set for 17:00

**Investigable Content**
- After-hours VPN SIEM alerts requiring handoff to Priya/Marcus/Rachel for investigation (1 token each, 5 min delay)
- Scheduled task investigation (2 tokens, 10 min delay) — reveals PII exfiltration task
- AD logs, threat intel on various IPs

**The Sandra Trap (18-minute mark)**
- "Sandra" messages requesting the Customer Impact Assessment
- Canned response to send files
- If player sends: attacker taunts ("nice" → "now THIS is juicy 😹" → "tell sandra we say thanks"), goes offline, then 32 spam tickets flood in at 1-second intervals 30 seconds later
- If player ignores: follow-up at 21 minutes ("Sorry, but I need this file urgently...")

---

## What the Story Bible Planned (Original Design)

### The Triage Triangle (~45 minute mark)

Three concurrent crises forcing a single choice:

1. **Technical Crisis**: Attacker still inside, scheduled PII exfiltration at 17:00, backdoor accounts active
2. **Regulatory Crisis**: NDB scheme notification requirements, forensic evidence preservation
3. **Reputational Crisis**: Journalist inquiry deadline 5pm, CEO/board need talking points

**The Decision**: Marcus messages SOC at ~45 min: *"I'm going into an emergency board meeting in 10 minutes. What do I tell them?"*

Students pick one of three pathways:
- **Path A (Contain)**: Stop the attacker first. PII protected, but journalist publishes without comment, regulatory notification delayed.
- **Path B (Preserve)**: Forensics and regulatory compliance first. Legal standing protected, but 17:00 task executes during evidence preservation.
- **Path C (Communicate)**: Get ahead of the story first. PR praised initially, but 17:00 task executes while team focused on comms.

**Sandra Trap Escalation**: If students shared the PII file, consequences on every path are significantly worse — right_0ff publishes named customer records.

---

## Critique of the Original Design

### Why the Triage Triangle Falls Short

1. **Binary choice masking as strategy**: "Pick 1 of 3" is reductive. Real IR requires parallel workstreams, not mutually exclusive options.

2. **Consequences feel scripted**: The "task executes at 17:00" is deterministic based on choice, not player actions. There's no genuine tension about whether the SOC can stop it.

3. **Passive finale**: Players click a button, read a consequence card. No active problem-solving in the final moments.

4. **Skill ceiling too low**: Once players understand the triangle, there's no deeper mastery. The exercise becomes a guessing game about which ending the designer favours.

---

## Alternative Directions: Four Proposed Models

### Option 1: The Running Clock (Active Finale)

**Core Idea**: The 17:00 exfiltration is a real deadline. Players must race to disable the scheduled task *while* managing competing demands. The "choice" isn't which priority to declare — it's how many crises they can juggle before the timer runs out.

**Implementation**:
- Remove the "pick a path" moment entirely
- Marcus asks: *"What should I tell the board?"* but this is open-ended; players type a recommendation
- Meanwhile, the 17:00 deadline ticks down
- Multiple simultaneous crises emerge in final 20 minutes:
  - **Crisis A**: Scheduled task investigation (Rachel needs logs → canned response → 10 min investigation → can disable task)
  - **Crisis B**: Journalist inquiry (PR needs briefing points — 5 min to prepare)
  - **Crisis C**: Regulatory notification (legal needs scope confirmation — 5 min)
  - **Crisis D**: Additional compromised accounts discovered (need immediate containment)

**Player Experience**: Can they disable the PII export AND brief the board AND respond to the journalist? Probably not all three. Their *actual* prioritisation (measured by time allocation and token spend) determines the ending, not a single declarative choice.

**Sandra Trap Variant**: If PII was shared, right_0ff taunts via email/board leak *during* the finale, distracting players with new urgent messages while the clock ticks.

---

### Option 2: The Trust Cascade (Social Engineering Finale)

**Core Idea**: right_0ff's final play isn't technical — it's social. They use the compromised CFO account to send conflicting instructions to different teams, forcing the SOC to verify communications under time pressure.

**Implementation**:
- At ~40 minutes, Marcus forwards the ultimatum email (as planned)
- Immediately after, "Sandra" (if not suspended) sends urgent messages:
  - To Infrastructure: *"I've authorised an emergency data export for the board. Please approve task system_maintenance_daily immediately. —Sandra"*
  - To PR: *"Do not respond to the journalist. Legal is handling. Stand down. —Sandra"*
  - To SOC: *"I've contained the incident with external consultants. Stand down all IR activities. —Sandra"*
- Players must recognise these are forged (tone mismatch, calendar conflict, counter to Marcus's instructions)
- If they don't verify, Infrastructure approves the PII export, PR goes silent, SOC stops investigating
- **The win condition**: Players who correctly identify and countermand all three forged messages prevent disaster

**Why This Works**: Tests the same lesson as the Triage Triangle (trust verification under pressure) but requires active discrimination, not passive selection. The "bad ending" happens because players were fooled, not because they picked option C.

---

### Option 3: The Leak Investigation (Forensic Finale)

**Core Idea**: The finale isn't about choosing a priority — it's about discovering whether a leak has already occurred. Players investigate logs to determine: did the scheduled task already run? Did right_0ff get the data another way?

**Implementation**:
- At ~35 minutes, a tip comes in: *"right_0ff claims they have the PII vault. Verify if this is true."*
- Players must investigate:
  - Check if scheduled task ran (logs show it was suspended by Rachel... or did it?)
  - Check for alternative exfiltration paths (did attacker use another account?)
  - Check if the Customer Impact Assessment file was exfiltrated (if player sent it to "Sandra")
- The investigation takes time (10-15 minutes). The board meeting is in 10 minutes. Marcus needs an answer: *"Do they actually have it, or are they bluffing?"*
- **The consequence**: If players tell Marcus "it's a bluff" and they're wrong, the 48-hour aftermath is catastrophic. If they say "they have it" and prepare notifications, but it was a bluff, they over-disclosed unnecessarily.

**Sandra Trap Integration**: If player sent the file, investigation confirms right_0ff has the PII mapping regardless of the scheduled task. This is *additional* data beyond the vault. Players must track multiple data loss vectors.

---

### Option 4: The Board Simulation (Communications Finale)

**Core Idea**: Players don't just recommend — they *write the talking points* Marcus uses. The board meeting becomes a live event where Marcus messages updates, and players must adjust the narrative in real-time based on new information.

**Implementation**:
- At ~45 minutes: *"I'm in the board room. They want opening remarks. What should I say?"*
- Players write/type a brief statement (limited to 200 words)
- Marcus delivers it. Board members (represented as off-screen voices via Marcus's updates) ask follow-ups:
  - *"The journalist is asking about hardship customers specifically. What do we say?"*
  - *"CFO asks: has the attacker been contained? What's our confidence level?"*
  - *"General Counsel wants to know: do we trigger NDB notification?"*
- Players must respond in real-time to each question (canned responses or free text)
- **The scoring**: Marcus's post-meeting assessment reveals which board members were satisfied vs alarmed based on answer quality
- **The twist**: If Sandra's account is still active, she messages during the meeting contradicting the SOC's statements, forcing players to choose whether to call out the CFO publicly (awkward) or let it stand (dangerous)

**Why This Works**: Tests communication skills under pressure — a core SOC competency. The "choose your path" becomes "navigate a dynamic conversation" which better mirrors real incident response.

---

## Recommended Hybrid Model

Combine elements from Options 1 and 4 for maximum engagement:

### Phase 1: The Crisis Cascade (30-40 min)

Multiple crises emerge in quick succession. Players must actively manage:

1. **Scheduled Task Verification** (Rachel investigation — 10 min timer)
2. **Additional Vishing Victims** (David/Nadia containments — 1 token each)
3. **Sandra Trap Aftermath** (if triggered): Priya sees spam tickets, messages player *"What just happened with Sandra's account?"*
4. **Right_0ff Ultimatum Arrives** (Marcus forward — sets 17:00 context)

### Phase 2: The Board Briefing (40-50 min)

Marcus enters board meeting. Players provide *live talking points* via canned responses and short text inputs. Board members ask follow-ups via Marcus's updates. Key moments:

- **Opening statement**: Players choose tone (transparent/defensive/cautious)
- **Mid-meeting crisis**: "Sandra" emails board directly with conflicting info — players must advise Marcus how to handle
- **Decision point**: Board votes on whether to notify regulator immediately or wait for containment confirmation

### Phase 3: The Aftermath (50-60 min)

48-hour consequence montage based on:
1. Whether PII was actually exfiltrated (task status + Sandra Trap outcome)
2. Whether board was correctly briefed
3. Whether right_0ff's taunts were countered effectively

**Ending Variants**:
- **Best Case**: Task stopped, no PII shared, board properly briefed, regulator notified promptly. right_0ff publishes but data is stale. Company weathers storm.
- **Mixed Case**: Task stopped, but PII shared via Sandra Trap. Board partially briefed. Customer notification required. Class action filed.
- **Worst Case**: Task executed (Rachel wasn't given logs in time), PII shared (Sandra Trap), board misled (contradicted by "Sandra"). Catastrophic breach. Headlines, resignations, Series C jeopardised.

---

## Immediate Implementation Tasks

### 1. Sandra Trap Aftermath (Priority 1)

If player sent files to "Sandra", implement the cascade:

1. **Immediate (within 30s of final taunt)**: Ticket spam from right_0ff floods queue
2. **~2 minutes later**: Priya messages: *"I'm seeing a flood of spam tickets from 'Sandra Leigh' — what's going on? Did something happen with her account?"*
3. **~5 minutes later**: Email from right_0ff to CEO (forwarded by Marcus): *"We now have the complete customer list with PII. See attached sample. 48 hours begins now."* (Attachment: 10 customer records from the Impact Assessment)
4. **~8 minutes later**: Priya messages: *"I'm suspending Sandra's account immediately. This is a full account compromise. What did they get from you?"*
5. **Canned response required**: Player must explain what they shared. Priya's response varies based on whether player admits fault or downplays it.

### 2. Remove/Replace Triage Triangle

Instead of the 45-minute "pick a path" choice:

- Marcus asks open-ended: *"I'm heading into the board meeting. What should I tell them about our situation?"*
- Provide **canned response options** that represent different framings:
  - *"We have active attacker access but are containing it. Recommend immediate disclosure."*
  - *"We have evidence of data access but no confirmed exfiltration. Recommend measured response."*
  - *"Attacker access is contained. No customer PII at risk. Recommend holding position."* (Risky if wrong!)
- Then proceed to live board questions (Phase 2 above)

### 3. Add Live Board Questions

Create 3-4 timed question events during final 10 minutes:

```javascript
// Example structure for board questions
scheduledMessages: [
  {
    id: 'board-q1',
    triggerAt: 2700, // 45 min
    content: `Board member: "What's our confidence the attacker is out?" Marcus to SOC: How do I answer?`,
    cannedResponses: [
      { id: 'high-confidence', label: "High confidence — all known compromised accounts disabled", ... },
      { id: 'moderate-confidence', label: "Moderate — active investigation, no signs of current access", ... },
      { id: 'low-confidence', label: "Low — additional compromise possible, recommend caution", ... }
    ]
  },
  {
    id: 'board-q2',
    triggerAt: 2940, // 49 min — triggered by whether PII was shared
    condition: 'sandraTrapTriggered', // Only if player sent files
    content: `CFO just read an email from "Sandra" claiming we've already notified customers. That's not true. What do I say?`,
    ...
  }
]
```

### 4. Consequence Montage

Create 3-4 variant endings based on actual player actions:

**Ending A (Best)**: 
- Task disabled: YES (Rachel investigation completed)
- PII shared: NO (Sandra trap avoided)
- Board briefed: ACCURATELY
- Result: Limited breach, managed disclosure, company survives Series C

**Ending B (Mixed)**:
- Task disabled: YES (Rachel completed)
- PII shared: YES (Sandra trap triggered)
- Board briefed: PARTIALLY
- Result: Breach notification required, class action, but no additional data loss

**Ending C (Bad)**:
- Task disabled: NO (Rachel not given logs in time)
- PII shared: YES
- Board briefed: MISLED
- Result: Full PII vault exfiltrated, customer names published, executive resignations

**Ending D (Worst)**:
- Task disabled: NO
- PII shared: YES
- Board briefed: CONTRADICTED BY "SANDRA" (player didn't warn Marcus)
- Result: As above plus board learns SOC was fooled by compromised CFO. Marcus's job in jeopardy.

---

## Content Still Needed

### Evidence/Documents
1. Right_0ff ultimatum email (to CEO, forwarded by Marcus)
2. Right_0ff sample leak email (10 customer records — proof they have the PII mapping if Sandra Trap triggered)
3. Board meeting aftermath reports (4 variants)
4. Media coverage snippets (3 variants based on whether journalist got comment)

### NPC Interactions
1. Priya's "what happened with Sandra?" investigation messages
2. Marcus's board meeting live updates (3-4 question cycles)
3. James's eventual arrival (late in session) with forensic findings

### Alert/Ticket Content
1. Any additional late-session SIEM alerts (optional — may not be needed if focus is on comms)

### Tickets (if needed)
1. Post-Sandra-suspension tickets from Finance staff locked out of CFO-related processes

---

## Debrief Discussion Points

Regardless of which model we implement, the debrief should surface:

1. **Parallel workstreams**: Did you try to do everything, or did you consciously drop balls? Which ones?
2. **Trust verification**: How did you verify "Sandra's" identity? What signs did you look for? What did you miss?
3. **Communication under pressure**: How did you frame the situation to Marcus? What did you emphasise vs downplay?
4. **Time pressure effects**: How did the countdown affect your decision quality? Did you skip verification steps?
5. **Alternative history**: If you had 2 more hours and 6 more tokens, what would you have done differently?

---

## Next Steps Decision

**Immediate (this session)**:
1. Implement Sandra Trap aftermath cascade
2. Remove Triage Triangle "pick a path" mechanic
3. Add Priya investigation flow

**Next phase**:
1. Design and implement board meeting live questions (Option 4 hybrid)
2. Write consequence montage content (4 variants)
3. Create right_0ff ultimatum and sample leak artefacts

**Optional enhancements**:
1. Add James late-arrival forensics (if time permits)
2. Add additional compromised account discoveries (if time permits)
3. Add Finance staff lockout tickets post-Sandra-suspension (flavour only)

---

*Document version: 1.0*
*Created: April 2026*
*Purpose: Strategic roadmap for Session 2 finale design*
