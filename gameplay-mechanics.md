# Operation Glasshouse: Gameplay Mechanics

> **Document Purpose**: This document defines the rules, systems, and flow of the tabletop exercise. It should be read alongside the Story Bible.

---

## Overview

**Format**: 3 × 1-hour sessions (can be run weekly or consecutively)
**Group Size**: 6 students per team
**Simultaneous Groups**: ~5 teams in the same room
**Facilitation**: Self-directed (no game master); tutor observes and assesses

**Core Loop**:
1. Receive situation briefing
2. Review artefacts (logs, tickets, emails, etc.)
3. Spend action tokens to investigate, escalate, or act
4. Open envelopes to reveal consequences/new information
5. Document decisions and rationale
6. Repeat until session ends

---

## Part 1: Action Token Economy

### Concept

Action tokens represent the **limited time, attention, and political capital** available to a SOC team during a shift. Every investigation, escalation, or containment action costs tokens. Students must prioritise—they cannot do everything.

This creates meaningful trade-offs:
- Investigate thoroughly vs. act quickly
- Escalate early (and risk crying wolf) vs. wait for certainty (and risk delay)
- Contain aggressively (and disrupt business) vs. monitor passively (and risk spread)

### Token Allocation

| Session | Tokens Available | Rationale |
|---------|------------------|-----------|
| Session 1 | 12 tokens | More breathing room; learning the system |
| Session 2 | 10 tokens | Tighter constraints as stakes rise |
| Session 3 | 8 tokens | Crisis mode; every decision counts |

**Tokens do not carry over between sessions.**

*Note: These numbers are tuneable during playtesting. Adjust based on observed pacing.*

### Token Costs

Actions are categorised into three types, each with a cost range:

#### Investigate (1-3 tokens)
Gathering information. Doesn't change the situation, but reveals more detail.

| Action | Cost | What You Get |
|--------|------|--------------|
| Quick log check | 1 | Summary view—basic facts only |
| Deep log analysis | 2 | Detailed view—timestamps, patterns, anomalies |
| Threat intel lookup | 1 | Known IOCs, threat actor profiles |
| Interview employee (basic) | 1 | Surface-level response; may miss details |
| Interview employee (detailed) | 2 | Probing questions; reveals buried information |
| Correlate multiple sources | 3 | Cross-reference logs, tickets, intel; high-value synthesis |

#### Escalate (2-3 tokens)
Bringing others into the loop. Uses management bandwidth and creates expectations.

| Action | Cost | What You Get |
|--------|------|--------------|
| Escalate to SOC Manager (Priya) | 2* | Guidance, authorisation, or pushback (depends on quality of your briefing) |
| Escalate to Tier 3 (James) | 2 | Technical analysis; only useful if you have something concrete |
| Escalate to CISO (Marcus) | 3 | Executive attention; only appropriate for confirmed critical incidents |
| Request Infrastructure support | 2 | Action from Rachel's team (patching, firewall changes, etc.) |

**\*Re-escalation Rule**: The first escalation to an NPC costs tokens. Follow-up escalations to the *same* NPC are **free**, but still require completing the Self-Assessment. This reflects that once you've initiated a conversation, continuing it doesn't cost additional political capital—but the quality of your communication still matters. All escalation attempts (initial and follow-up) are recorded as assessment artefacts.

#### Act (2-4 tokens)
Taking action that changes the situation. May have unintended consequences.

| Action | Cost | What You Get |
|--------|------|--------------|
| Disable user account | 2 | Stops that credential being used; alerts attacker they're detected |
| Block IP address | 2 | Stops traffic from that source; may block legitimate users |
| Isolate system | 3 | Prevents lateral movement; disrupts business operations |
| Preserve evidence (forensic copy) | 2 | Maintains chain of custody; takes time |
| Trigger incident response plan | 4 | Full mobilisation; only for confirmed major incidents |

### Token Tracking

Each team receives a **token tracker** (physical or digital):
- 12/10/8 tokens represented as chips, cards, or checkboxes
- When an action is taken, tokens are spent (removed/crossed off)
- Spent tokens are placed in a "spent" pile (useful for post-session debrief)

**Physical option**: Poker chips or wooden tokens in team colours
**Digital option**: Shared spreadsheet or simple web app with decrement buttons

---

## Part 2: The Envelope System

### Concept

Envelopes contain **new information, consequences, and story beats** that are revealed based on time, decisions, or progress. They replace a human game master, allowing the exercise to be self-directed.

### Envelope Types

#### 1. Timed Envelopes
Opened when a timer expires. Creates pacing and pressure.

**Format**: Envelope labelled "OPEN AT [TIME]" (e.g., "OPEN AT 20 MINUTES")

**Example**:
> *Envelope: "OPEN AT 15 MINUTES"*
> 
> Contents: A new SIEM alert appears—successful login to admin tool from anomalous IP. (Provides alert artefact card.)

#### 2. Decision Envelopes
Opened when the team makes a specific choice. Creates branching information paths.

**Format**: Envelope labelled with neutral identifier (e.g., "ENVELOPE 3A", "ENVELOPE 3B")

**Example**:
> *Envelope: "OPEN IF YOU DISABLE LIAM'S ACCOUNT"*
> 
> Contents: "Liam's account is now disabled. 10 minutes later, you notice the suspicious activity has stopped—but the attacker now knows you're onto them. A new alert fires: a *different* account is now showing unusual behaviour. They've pivoted."

#### 3. Progress Envelopes
Opened when the team completes a milestone or reaches a story beat.

**Format**: Envelope labelled with progress trigger (e.g., "OPEN WHEN YOU'VE IDENTIFIED THE COMPROMISED ACCOUNT")

**Example**:
> *Envelope: "OPEN WHEN YOU DISCOVER THE CALLING CARD"*
> 
> Contents: The right_0ff manifesto file. (Provides full text of the attacker's message and introduces the antagonist.)

#### 4. Cliffhanger Envelopes
Opened at the end of each session. Provides the hook for the next session.

**Format**: Envelope labelled "SESSION [N] FINALE — OPEN AT 55 MINUTES"

**Example**:
> *Envelope: "SESSION 1 FINALE"*
> 
> Contents: "As you're wrapping up, a new alert fires. Priority: HIGH. A privileged account has just accessed the customer database from an IP address you've never seen before. The account belongs to Liam Fitzgerald—the employee who reported the 'weird IT call.' Session ends. Complete your triage report."

### Envelope Mechanics

#### Visibility
- All envelopes for a session are placed on the table at the start
- Envelope labels are **neutral identifiers** (numbers/codes), not descriptive triggers
- Instructions for which envelope to open are provided via action cards or self-assessment gates
- This prevents envelopes from "leaking" information about what students should do

#### Mutual Exclusivity
Some decision envelopes are mutually exclusive—opening one means another stays sealed.

**Example**:
- Envelope A: "OPEN IF YOU ISOLATE THE SERVER"
- Envelope B: "OPEN IF YOU LEAVE THE SERVER RUNNING TO MONITOR"

Only one can be opened. The other remains sealed (can be discussed in debrief).

#### Sealed Envelopes for Debrief
Unopened envelopes are collected at session end. During the tutor-led debrief, these can be opened to show "what would have happened if..."—valuable for learning.

---

## Part 3: Self-Assessment Gates

### Concept

When students take actions that have variable outcomes (e.g., escalating to an NPC), the quality of the response depends on the quality of their preparation. Rather than having a tutor judge this, students **self-assess** using a situation-specific checklist, then open the corresponding response envelope.

This creates a **reflection moment** without giving away what the "right" answer is.

### How It Works

**Step 1**: When a team takes a gated action (e.g., "Escalate to Priya"), they pick up the **Response Pack** for that action from the materials.

**Step 2**: The Response Pack contains:
- A **Self-Assessment Card** (situation-specific checklist)
- Multiple **sealed response envelopes** (numbered neutrally, e.g., "PRIYA-1A", "PRIYA-1B", "PRIYA-1C")

**Step 3**: The team completes the Self-Assessment Card honestly, checking items that apply to their escalation.

**Step 4**: The card directs them to open a specific envelope based on their score.

**Step 5**: The team opens the indicated envelope and receives the NPC's response.

**Step 6**: The completed Self-Assessment Card goes into their documentation folder (useful for assessment and debrief).

### Evidence Card Integration

Some checklist items reference **Evidence Cards** by number. Evidence Cards are obtained through investigation actions—if a team hasn't taken the action to reveal a card, they don't know what's on it.

This creates an elegant dynamic:
- "Includes Evidence Card #4" is meaningless unless you have it
- Teams might *have* a card but not realise its significance until they see it on the checklist
- Either you have the card or you don't—no judgment call required

### Self-Assessment Card Template

Each gated action has a **situation-specific** Self-Assessment Card. Here's an example:

```
┌─────────────────────────────────────────────────────────────────┐
│  SELF-ASSESSMENT: ESCALATION TO PRIYA (Session 1)               │
├─────────────────────────────────────────────────────────────────┤
│  Review your escalation message and check ALL that apply:       │
│                                                                 │
│  ☐ Names a specific affected user account                       │
│  ☐ Includes Evidence Card #4 (Liam interview) or #7 (Login logs)│
│  ☐ Includes a timeline of events                                │
│  ☐ Proposes a specific next action or asks a specific question  │
│  ☐ Includes a severity/priority assessment with justification   │
│                                                                 │
│  COUNT YOUR CHECKS: ___ / 5                                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  4-5 checks:  Open envelope PRIYA-1A                    │    │
│  │  2-3 checks:  Open envelope PRIYA-1B                    │    │
│  │  0-1 checks:  Open envelope PRIYA-1C                    │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│    Keep this card – it's part of your assessed documentation    │
└─────────────────────────────────────────────────────────────────┘
```

### Sample Response Envelopes

For the above self-assessment, the three envelopes might contain:

**PRIYA-1A** (Strong escalation — 4-5 checks):
> "Priya responds within minutes: 'Good catch. The MFA bypass pattern you've identified is concerning—this looks like a coordinated social engineering campaign, not just opportunistic probing. I'm authorising you to proceed with deeper investigation on the affected accounts. I'll brief Marcus at our 2pm. Keep me posted every 15 minutes. Priority actions: (1) Pull full auth logs for the past 72 hours, (2) Check if any other employees received similar calls. Here's an emergency contact for James if you need Tier 3 support before I'm out of my meeting.'
> 
> *(Receive: Guidance Card with prioritised actions, James's direct number)*"

**PRIYA-1B** (Partial escalation — 2-3 checks):
> "Priya responds after 20 minutes: 'Thanks for the heads up. I can see something's going on but I need more detail before I can act. Can you confirm: which specific accounts are affected? What's the timeline? What's your recommended severity level? Get me those details and I'll loop in the right people.'
> 
> *(No additional resources. You'll need to spend more tokens to gather the details she's asking for.)*"

**PRIYA-1C** (Weak escalation — 0-1 checks):
> "Priya responds an hour later: 'I'm in back-to-back meetings. I've read your message twice and I'm not clear on what you're asking me to do. Is this an incident or just suspicious activity? What's the actual impact? I need specifics—affected systems, IOCs, timeline—before I can justify pulling anyone off other work. Document what you have and come back when you've got something concrete.'
> 
> *(No additional resources. You've spent 2 tokens for minimal return. Priya's confidence in the team has decreased.)*"

### Why This Works

1. **No spoilers**: Evidence card numbers are opaque until obtained
2. **Objective criteria**: Either you have the card or you don't
3. **Reflection built-in**: Teams must articulate what they included
4. **Self-directed**: No tutor involvement needed
5. **Assessment artefact**: Completed cards show the tutor how teams evaluated themselves
6. **Honest incentive**: Gaming it only hurts the team—they'll get advice mismatched to their actual situation

### Handling Dishonesty

Students *could* check boxes they shouldn't. But:
- The response won't match their actual situation (confusing, not helpful)
- Their submitted escalation message is part of the assessed report—tutors can see mismatches
- The Self-Assessment Card is collected—discrepancies are visible in debrief
- Essentially, cheating is **self-punishing and detectable**

### Gated Actions by Session

Not every action needs a self-assessment gate. Reserve them for high-stakes moments:

| Session | Gated Actions |
|---------|---------------|
| Session 1 | Escalate to Priya |
| Session 2 | Escalate to Priya, Escalate to CISO, Respond to Sandra's email |
| Session 3 | Escalate to CISO, Final incident declaration |

---

## Part 4: Artefact Cards & Evidence Cards

### Concept

Artefacts are the **evidence** students analyse—logs, emails, tickets, threat intel, etc. They're provided as physical cards or digital documents that can be passed around, annotated, and organised.

### Artefact Types

| Type | Description | Example |
|------|-------------|---------|
| **SIEM Alert** | Automated security alert with severity, timestamp, source | "ALERT: Multiple failed logins from IP 185.220.101.42" |
| **Log Extract** | Raw or summarised log data | Authentication logs showing login attempts |
| **Service Ticket** | Employee-submitted IT support request | "Subject: Weird call from IT department" |
| **Email** | Internal or external email communication | Email from Sandra Leigh (compromised) |
| **Threat Intel** | External intelligence on threats, IOCs, actors | "right_0ff: Known hacktivist group targeting fintech" |
| **Chat Log** | Internal messaging excerpt | Slack conversation mentioning "security audit" |
| **Network Traffic** | Summary of connections, data flows | "Outbound traffic to pastebin.com detected" |
| **File/Document** | Discovered file on system | right_0ff calling card manifesto |

### Artefact Detail Levels

Some artefacts have multiple versions—a "surface" version provided initially, and a "detailed" version revealed if students spend tokens to investigate further.

**Example: Service Ticket from Liam Fitzgerald**

*Surface version (free):*
> **Ticket #4471** — Submitted by Liam Fitzgerald, Customer Support
> Subject: Weird call from IT department
> "Got a call from IT support this morning asking me to verify something. Seemed legit but wanted to flag it just in case."

*Detailed version (costs 2 tokens to "interview employee"):*
> **Follow-up conversation with Liam Fitzgerald:**
> "The IT guy was really professional. He even said 'we'll never ask for your password'. I just read him the code from my phone—is that bad? He said it was for a security audit. Oh, and he knew my name and that I work in customer support, so I figured he was legit."

### Artefact Organisation

Teams should be encouraged to organise artefacts spatially:
- **Timeline**: Arrange by timestamp to see sequence of events
- **Source**: Group by system/person to see patterns
- **Relevance**: Separate "hot leads" from "noise"

Physical tip: Provide a large sheet of butcher paper for teams to arrange cards on.

### Evidence Card Numbering

Artefacts obtained through token-spending investigation actions are designated as **Evidence Cards** with a unique number. This number is used in Self-Assessment Gates.

**Session 1 Evidence Cards** (example numbering):

| Card # | Artefact | How Obtained |
|--------|----------|-------------|
| #1 | SIEM Alert Summary | Free (starting artefact) |
| #2 | Service Ticket - Liam (surface) | Free (starting artefact) |
| #3 | Credential Stuffing Threat Intel | 1 token (threat intel lookup) |
| #4 | Liam Interview (detailed) | 2 tokens (detailed employee interview) |
| #5 | Authentication Logs (summary) | 1 token (quick log check) |
| #6 | Authentication Logs (detailed) | 2 tokens (deep log analysis) |
| #7 | Login Anomaly Report | 2 tokens (correlate sources) |
| #8 | Marketing Email (false lead) | 1 token (investigate ticket) |

Cards #1 and #2 are free starting artefacts. Cards #3-#8 require token investment to obtain.

When a Self-Assessment Card says "Includes Evidence Card #4", only teams who spent 2 tokens on Liam's detailed interview will have that card and know what it contains.

---

## Part 5: Persona Roles

### Concept

Each of the 6 students takes a **persona role** that gives them a specific focus area and responsibilities. Roles are designed to be equitable—each has meaningful contribution and individual accountability.

### The Six Roles

#### 1. Log Analyst
**Focus**: SIEM alerts, authentication logs, system logs
**Unique Access**: Can spend tokens on "deep log analysis" at reduced cost (2→1 for basic, 3→2 for correlation)
**Responsibility**: Owns the technical timeline; identifies anomalies in log data

#### 2. Threat Intel Analyst
**Focus**: IOC correlation, attacker attribution, external intelligence
**Unique Access**: Has a "Threat Intel Database" reference sheet; can identify known malicious IPs/domains
**Responsibility**: Connects observed activity to known threat actors; provides context on attacker TTPs (Tactics, Techniques, and Procedures)

#### 3. Communications Lead
**Focus**: Internal/external communications, stakeholder management
**Unique Access**: Drafts all escalation messages and reports; their wording affects NPC responses
**Responsibility**: Owns the "voice" of the team; ensures communications are clear, professional, and appropriately urgent

#### 4. Playbook Lead
**Focus**: SOC procedures, compliance, documentation standards
**Unique Access**: Has the SOC Playbook reference document; can verify if actions follow protocol
**Responsibility**: Keeps team on process; flags when actions deviate from standard procedures; ensures report meets template requirements

#### 5. Containment Lead
**Focus**: Technical response actions, system isolation, access control
**Unique Access**: Proposes and tracks all "Act" token spends; maintains containment status board
**Responsibility**: Owns the "what do we do about it" decisions; thinks through second-order effects of containment actions

#### 6. Scribe / Report Lead
**Focus**: Real-time documentation, evidence tracking, final report
**Unique Access**: Owns the incident report document; can call "documentation check" to pause and sync
**Responsibility**: Ensures decisions and rationale are captured; produces the assessed deliverable

### Role Cards

Each student receives a **role card** with:
- Role name and icon
- Focus area description
- Unique access/ability
- Key questions to ask during the exercise
- Individual accountability statement

### Role Rotation (Optional)

For courses running multiple exercises, roles can rotate so students experience different perspectives.

---

## Part 6: Session Flow

### Pre-Session Setup (5 minutes before)

**Facilitator prepares**:
- [ ] Artefact cards sorted into session packs
- [ ] Envelopes placed on table (labels visible)
- [ ] Token trackers set to starting amount
- [ ] Role cards distributed
- [ ] Incident report template provided (paper or digital)
- [ ] Timer visible to all teams

**Students prepare**:
- [ ] Read role card
- [ ] Review reference materials (playbook, threat intel database)
- [ ] Assign someone to track time

### Session Structure

Each 1-hour session follows this rhythm:

| Phase | Duration | Activity |
|-------|----------|----------|
| **Briefing** | 5 min | Read/watch situation briefing; receive initial artefacts |
| **Investigation** | 20 min | Analyse artefacts, spend tokens, open triggered envelopes |
| **Mid-Session Beat** | 5 min | Timed envelope opens; new information revealed |
| **Response** | 20 min | Continue investigation; make containment/escalation decisions |
| **Finale** | 5 min | Cliffhanger envelope opens; final artefact revealed |
| **Documentation** | 5 min | Complete session report section |

### Pacing Mechanisms

#### The Countdown Timer
A visible timer counts down the session. Key moments:
- **40 minutes remaining**: "Mid-session envelope" opens
- **5 minutes remaining**: "Finale envelope" opens
- **0 minutes**: Session ends; pencils down

#### Pressure Injections
Pre-scripted "interruptions" delivered via envelope or card:
- "Your SOC Manager pings you: 'Any updates? The CISO is asking.'"
- "The service desk reports three more employees asking about 'weird IT calls.'"
- "An executive assistant calls: 'Sandra needs the SOC to send her a status update immediately.'" (This is the attacker fishing for information.)

#### The "Breaking News" Mechanic (Session 3)
In the final session, a "news ticker" card is revealed mid-session:
> "BREAKING: Tech journalist tweets 'Hearing rumours of a data breach at an Adelaide fintech. Anyone have details? DMs open.'"

This adds external pressure without requiring student action—it's context that raises stakes.

---

## Part 7: Branching & Consequences

### Philosophy

Branching in this exercise is **information-quality branching**, not plot branching. The story progresses linearly, but the *quality and completeness* of information students have depends on their choices.

**Good decisions** → More complete picture, better positioned for next phase
**Poor decisions** → Gaps in understanding, wasted resources, potential misdirection

### Consequence Categories

#### 1. Information Rewards
Spending tokens wisely reveals crucial details.

*Example*: Spending 2 tokens on "detailed employee interview" reveals that Liam gave up his MFA code—a critical fact.

#### 2. Information Gaps
Not investigating something means missing information.

*Example*: If students never investigate Anika's ticket, they won't know about the second social engineering call—they'll have an incomplete picture of the attack scope.

#### 3. Resource Waste
Investigating false leads costs tokens with no return.

*Example*: Spending 2 tokens investigating the "phishing email" that's actually legitimate marketing yields nothing useful.

#### 4. Attacker Awareness
Some actions alert the attacker that they've been detected.

*Example*: Disabling Liam's account (2 tokens) stops that access vector but signals to right_0ff that the SOC is onto them. The attacker may accelerate their timeline. (This is revealed via envelope.)

#### 5. Business Disruption
Containment actions have operational impact.

*Example*: Isolating the payments API server (3 tokens) prevents potential data exfiltration but takes the core product offline. An envelope reveals: "The Head of Sales is calling the CISO furious—merchants can't process payments."

#### 6. NPC Reactions
How students communicate affects NPC responses.

*Example*: 
- Clear, evidence-based escalation to Priya → Supportive response, additional guidance
- Vague, panicked escalation to Priya → Pushback, no additional resources
- Escalating to CISO without going through Priya → Priya is annoyed; political capital spent

### The Sandra Leigh Trap

**Setup**: In Session 2, students receive an email from Sandra Leigh (CFO) instructing them to "stand down" or "send her a status update directly."

**The Trap**: Sandra's account is compromised. Following her instructions plays into the attacker's hands.

**Detection Opportunities**:
- Her email tone/phrasing is slightly off
- Login logs show her account accessed from anomalous IP
- Her calendar shows she's in a board meeting (how is she emailing?)
- The ultimatum email taunts "Tell Sandra we said thanks"

**Branching**:
- *If students obey Sandra*: They send sensitive information to the attacker or delay containment. Envelope reveals the consequences.
- *If students verify first*: They discover the compromise. Envelope reveals confirmation and commendation from Priya.
- *If students ignore Sandra without verification*: Risky—they're right, but they didn't follow process. Debrief discussion point.

---

## Part 8: Assessment Integration

### Collaborative Assessment

The **incident report** is the primary group deliverable. It's produced incrementally across sessions:

| Session | Report Section |
|---------|----------------|
| Session 1 | Initial triage, severity assessment, early IOCs |
| Session 2 | Incident declaration, containment actions, escalation log |
| Session 3 | Full incident report with recovery recommendations, NIST CSF mapping |

**Assessed on**:
- Completeness and accuracy of analysis
- Quality of decision justification
- Clarity of communication
- Adherence to SOC procedures

### Individual Assessment

Each role has **individual accountability** built in:

| Role | Individual Contribution |
|------|------------------------|
| Log Analyst | Annotated timeline of log events |
| Threat Intel Analyst | IOC list with attribution notes |
| Communications Lead | Escalation message drafts |
| Playbook Lead | Procedure compliance checklist |
| Containment Lead | Containment decision log with rationale |
| Scribe/Report Lead | Overall report quality and completeness |

**Optional**: Individual reflection (submitted post-session) on decision-making process and lessons learned.

### Tutor Observation

While students self-facilitate, the tutor observes and notes:
- Quality of team discussion and reasoning
- Role participation balance
- Decision-making process (not just outcomes)
- How team handles pressure and uncertainty

**Observation rubric** (to be developed with academics):
- [ ] Evidence-based reasoning demonstrated
- [ ] Appropriate escalation decisions
- [ ] Effective team communication
- [ ] Procedure adherence
- [ ] Adaptability when new information arrives

---

## Part 9: Physical Materials Checklist

### Per Team
- [ ] Token tracker + tokens (12 for Session 1)
- [ ] Role cards (6)
- [ ] Artefact card pack (session-specific, with Evidence Card numbers)
- [ ] Envelope set (session-specific, neutrally labelled)
- [ ] Self-Assessment Response Packs (for gated actions)
- [ ] Incident report template
- [ ] SOC Playbook reference sheet
- [ ] Threat Intel Database reference sheet
- [ ] Documentation folder (for completed Self-Assessment Cards)
- [ ] Butcher paper + markers (for artefact organisation)
- [ ] Timer (or central room timer)

### Per Room
- [ ] Central countdown display
- [ ] Facilitator observation sheets
- [ ] Sealed envelope collection box (for unopened envelopes)
- [ ] "Emergency" envelope (tutor can inject if teams get stuck)

---

## Part 10: Tuning & Playtesting Notes

These parameters should be tested and adjusted:

| Parameter | Starting Value | Adjust If... |
|-----------|----------------|--------------|
| Tokens per session | 12 / 10 / 8 | Teams finish with many unused (reduce) or run out too early (increase) |
| Action costs | As listed | Certain actions never taken (too expensive) or always taken (too cheap) |
| Timed envelope triggers | 15 min, 40 min, 55 min | Pacing feels rushed or draggy |
| Artefact volume | ~8-10 per session | Teams overwhelmed (reduce) or under-stimulated (increase) |
| Session duration | 60 min | Adjust if sessions consistently run over/under |

---

## Appendix: Quick Reference Card (For Students)

*To be printed as a table tent or handout:*

### Action Costs
| Action | Tokens |
|--------|--------|
| Quick log check | 1 |
| Deep log analysis | 2 |
| Threat intel lookup | 1 |
| Basic employee interview | 1 |
| Detailed employee interview | 2 |
| Correlate sources | 3 |
| Escalate to SOC Manager | 2 |
| Escalate to Tier 3 | 2 |
| Escalate to CISO | 3 |
| Request Infrastructure help | 2 |
| Disable account | 2 |
| Block IP | 2 |
| Isolate system | 3 |
| Preserve evidence | 2 |
| Trigger IR plan | 4 |

### Key Questions
- What's the evidence?
- What's the business impact?
- Who needs to know?
- What's the worst case if we're wrong?

---

*Document version: 0.2 (Draft)*
*Last updated: December 2025*
