# Session 1: "Static" — Detailed Design

> **Document Purpose**: Complete design for Session 1. Read alongside Story Bible and Gameplay Mechanics.

---

## Session Overview

| Attribute | Detail |
|-----------|--------|
| **Title** | "Static" |
| **Duration** | 60 minutes |
| **Tokens** | 12 |
| **Theme** | "Is this signal or noise?" |
| **NIST Focus** | Detect, Identify |
| **Tone Arc** | Routine → Unsettling → Cliffhanger |

### Narrative Summary

Students arrive for a "normal Monday morning" shift. They inherit overnight alerts (credential stuffing—routine) and service tickets. Most looks like noise. But buried within is evidence of a social engineering campaign. Students who investigate carefully discover an employee gave up his MFA code. Those who dismiss the tickets will miss this—until the cliffhanger reveals the "minor" incident has escalated dramatically.

---

## Part 1: Materials & Setup

### Per Team
- Token tracker (12 tokens)
- 6 role cards
- Starting Artefact Pack (Evidence Cards #1-4)
- Unlockable Artefact Pack (Evidence Cards #5-10)
- Envelope Set (9 envelopes, neutrally labelled)
- Self-Assessment Response Pack: "PRIYA ESCALATION"
- Triage Report Template
- SOC Playbook & Threat Intel reference sheets

### Envelope Labels

| Label | Type | Trigger |
|-------|------|---------|
| ENV-1A | Timed | Open at 40:00 remaining |
| ENV-1B | Timed | Open at 20:00 remaining |
| ENV-1C | Timed | Open at 05:00 remaining (Cliffhanger) |
| ENV-1D | Decision | Open if you disable Liam's account |
| ENV-1E | Decision | Open if you block IP 185.220.101.42 |
| ENV-1F | Decision | Open if you request Infrastructure support |
| PRIYA-1A | Response | Via Self-Assessment (4-5 checks) |
| PRIYA-1B | Response | Via Self-Assessment (2-3 checks) |
| PRIYA-1C | Response | Via Self-Assessment (0-1 checks) |

---

## Part 2: Session Timeline

| Time Remaining | Phase | Activity |
|----------------|-------|----------|
| 60:00-55:00 | Briefing | Read rules, shift handover, review starting artefacts |
| 55:00-40:00 | Initial Triage | Analyse artefacts, discuss priorities, first decisions |
| 40:00 | Beat 1 | ENV-1A opens (new SIEM alert) |
| 40:00-20:00 | Investigation | Deeper investigation, key decision points |
| 20:00 | Beat 2 | ENV-1B opens (Priya check-in) |
| 20:00-05:00 | Response | Escalation window, action decisions |
| 05:00 | Cliffhanger | ENV-1C opens (major reveal) |
| 05:00-00:00 | Documentation | Complete Triage Report |

---

## Part 3: Opening Script

*Read aloud or display:*

> **Welcome to Operation Glasshouse** (Session 1 of 3)
>
> You are a SOC team responding to an evolving cybersecurity incident.
>
> **Rules:**
> - Your team has **12 action tokens**—spend them to investigate, escalate, or act
> - When you take certain actions, open the indicated envelope
> - Some envelopes open automatically at set times—watch the clock
> - When escalating to NPCs, complete the Self-Assessment Card first
> - At session end, submit your **Triage Report**
>
> **Roles:** Each of you has a focus area. Collaborate, but own your responsibilities.
>
> The timer starts now. Good luck.

---

## Part 4: Evidence Cards

### Starting Artefacts (Free)

**Evidence Card #1: Shift Handover Notes**
- From night shift (Alex)
- Notes: credential stuffing alerts around 3am ("probably script kiddies"), service ticket about "weird call from IT" (didn't investigate), another ticket about suspicious email (low priority), backups OK
- Casual tone downplays important signals

**Evidence Card #2: SIEM Alert Dashboard**
- 0 Critical, 0 High, 3 Medium, 47 Low alerts
- Medium alerts: credential stuffing from 3 IPs against customer portal (847, 612, 423 attempts)
- Note says "matches known botnet activity, no successful auths, recommend monitor"
- This is real but unrelated noise

**Evidence Card #3: Service Ticket #4471 — Liam Fitzgerald (Surface)**
- Priority: Low
- Subject: "Weird call from IT department"
- Content: "Got a call from IT support asking me to verify something. Seemed legit but wanted to flag it just in case."
- This is the critical thread, deliberately vague

**Evidence Card #4: Service Ticket #4468 — Jenny Marcos (Surface)**
- Priority: Low
- Subject: "Suspicious email - please check"
- Content: Reports email asking to "verify account" for retail analytics platform
- This is the false lead

---

### Unlockable Artefacts (Token Cost)

**Evidence Card #5: Liam Interview — Detailed (2 tokens)**
- Reveals: Caller claimed to be IT doing "security audit"
- Liam read out 6-digit MFA code from his phone
- Caller said "we'll never ask for your password" (social engineering tactic)
- **This is the smoking gun**

**Evidence Card #6: Jenny Email — Full Investigation (2 tokens)**
- SPF/DKIM/DMARC all pass
- Domain legitimate, registered 2019
- Cross-check confirms XYZ has contract with RetailMetrics
- **VERDICT: FALSE POSITIVE** — legitimate vendor email
- Teaches that investigation has costs

**Evidence Card #7: Authentication Logs — Deep Analysis (2 tokens)**
- Credential stuffing: 1,882 failed attempts, opportunistic, no threat
- **ANOMALY**: Sunday 13 Oct, 10:14 — successful MFA login for liam.fitzgerald from IP 103.42.91.17 (Indonesia VPN), unknown device
- Assessment: Suspicious, doesn't match stuffing pattern

**Evidence Card #8: Threat Intel — Credential Stuffing (1 token)**
- Context on AU fintech attacks
- Mentions "right_0ff" as hacktivist group using social engineering
- Subtle foreshadowing

**Evidence Card #9: Liam Account Activity (2 tokens, requires #5 or #7 first)**
- Post-login activity: browsed Employee Directory, org chart, Finance contacts, Executive Assistant details
- Pattern suggests reconnaissance, not normal work
- No customer data access yet, no exfiltration

**Evidence Card #10: IP Reputation — 103.42.91.17 (1 token)**
- Indonesia, commercial VPN endpoint
- 47% malicious confidence on AbuseIPDB
- Associated with account takeover activity

---

## Part 5: Timed Envelope Contents

### ENV-1A: Open at 40:00 remaining

**New SIEM Alert**

> [M-2489] NEW — 08:34 ACDT
> Unusual login pattern detected
> User: liam.fitzgerald@xyzpay.com.au
> Event: Login from new device
> Source: 103.42.91.17 (Indonesia)
> Risk Score: Medium
> Note: User's typical location is Adelaide, AU

*Design Note*: Nudge for teams who haven't connected Liam's ticket to login anomaly.

---

### ENV-1B: Open at 20:00 remaining

**Pressure Injection — Priya Check-in**

> PRIYA SHARMA (09:42):
> "Hey team, quick check-in. Anything interesting this morning? Marcus asked me for a status update—apparently the board is nervous after that competitor breach last month. Let me know if there's anything I should flag."

This is NOT a formal escalation. Teams can:
- Respond informally (free, no envelope)
- Use this as trigger to formally escalate (2 tokens, Self-Assessment)

---

### ENV-1C: Open at 05:00 remaining (CLIFFHANGER)

**Critical Alert**

> ⚠️ [H-0012] CRITICAL — 09:55 ACDT
> Sensitive data access detected
> 
> User: liam.fitzgerald@xyzpay.com.au
> Action: Accessed CUSTOMER_DATABASE (prod)
> Records viewed: 2,847
> Source IP: 103.42.91.17 (Indonesia)
> 
> ⚠️ This user does not normally access this system
> ⚠️ Access occurred outside business hours pattern
> ⚠️ Source IP flagged as suspicious

**SESSION 1 ENDS HERE.**
Complete your Triage Report. Continue in Session 2.

---

## Part 6: Decision Envelope Contents

### ENV-1D: If you disable Liam's account

**Immediate Effects:**
- Liam locked out of all systems
- Active sessions terminated
- Liam's manager calls confused ("Why is he locked out?")

**Attacker Impact:**
- Loses access via Liam's credentials
- BUT now knows you're onto them—may accelerate or pivot

*Note action and reasoning in Triage Report.*

---

### ENV-1E: If you block IP 185.220.101.42

**Result:** Rachel's team implements block. Credential stuffing from this IP stops.

**However:** This IP was the botnet (noise), not the real threat. Actual attacker uses 103.42.91.17. This action had no impact on the real incident.

*Teaches: Acting on obvious threat isn't always right. Real threat was in the "minor" ticket.*

---

### ENV-1F: If you request Infrastructure support

**Rachel Torres responds:**

> "Got your ticket. What exactly do you need? We're mid-patching cycle so I need to know if this is urgent.
> 
> For emergency changes I need:
> 1. Specific systems/IPs affected
> 2. What action you want
> 3. Business justification
> 4. SOC Manager approval
> 
> Let me know and I'll prioritise."

*Teaches: Infrastructure needs specific, justified requests.*

---

## Part 7: Self-Assessment Gate — Priya Escalation

### Self-Assessment Card

```
SELF-ASSESSMENT: ESCALATION TO PRIYA (Session 1)
Cost: 2 tokens (first escalation) | FREE (follow-up)

Review your escalation message. Check ALL that apply:

☐ Names a specific user account of concern
☐ Includes Evidence Card #5 (Liam interview) OR #7 (Auth logs)
☐ Describes a timeline of events
☐ Proposes a specific next action OR asks a specific question
☐ Includes severity assessment (Low/Med/High) with justification

COUNT: ___ / 5

4-5 checks → Open PRIYA-1A
2-3 checks → Open PRIYA-1B
0-1 checks → Open PRIYA-1C

Keep this card for assessment.
```

---

### PRIYA-1A: Strong Escalation (4-5 checks)

> "Good work. This is exactly what I need to know early.
> 
> The MFA bypass pattern is concerning—looks like coordinated social engineering, not opportunistic stuffing. They called Liam directly, suggesting prior recon.
> 
> I'm authorising you to:
> • Continue deep investigation on Liam's account
> • Check if other employees got similar calls
> • Prepare containment options (but wait—I'll brief Marcus first)
> 
> I'll brief Marcus at 10:30. Update me every 15 min. Here's James's mobile if you need Tier 3 urgently: 0412 XXX XXX"

**Receive:** James's direct contact (free Tier 3 escalation for rest of session)

---

### PRIYA-1B: Partial Escalation (2-3 checks)

> "Thanks for the heads up. I can see something's going on but need more detail before taking this to Marcus.
> 
> Can you clarify:
> • Which specific account(s) affected?
> • What's the timeline?
> • What's your severity assessment and why?
> 
> I've got meetings until 11. Send an update when you have more."

**Receive:** Nothing yet—but follow-up escalation is FREE. Complete another Self-Assessment when ready.

---

### PRIYA-1C: Weak Escalation (0-1 checks)

> "I've read your message but I'm not clear what you're asking me to do.
> 
> Is this an incident or just suspicious activity? What's the impact? I need specifics—affected systems, IOCs, timeline—before I can justify pulling anyone off other work.
> 
> Credential stuffing is business as usual. If something's different, spell it out clearly. Document what you have and come back with something concrete."

**Receive:** Nothing yet—but follow-up escalation is FREE. Complete another Self-Assessment when ready.

*Note: All escalation attempts are recorded as assessment artefacts.*

---

## Part 8: Triage Report Template

```
XYZ PAY — SOC TRIAGE REPORT (Session 1)

INCIDENT ID: IR-2024-______
DATE: Monday, 14 October 2024
TEAM: _______________________

═══════════════════════════════════════════════════
SECTION 1: EXECUTIVE SUMMARY (2-3 sentences)
═══════════════════════════════════════════════════
What happened? Why does it matter?

___________________________________________________
___________________________________________________

═══════════════════════════════════════════════════
SECTION 2: SEVERITY ASSESSMENT
═══════════════════════════════════════════════════
☐ Low   ☐ Medium   ☐ High   ☐ Critical

Justification: ____________________________________

═══════════════════════════════════════════════════
SECTION 3: KEY FINDINGS
═══════════════════════════════════════════════════
Evidence cards reviewed: #___, #___, #___, #___

1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

═══════════════════════════════════════════════════
SECTION 4: ACTIONS TAKEN
═══════════════════════════════════════════════════
Tokens spent: ___ / 12

Actions taken:
• _________________________________________________
• _________________________________________________

Actions NOT taken (and why):
• _________________________________________________

═══════════════════════════════════════════════════
SECTION 5: ESCALATIONS
═══════════════════════════════════════════════════
☐ SOC Manager (Priya)  ☐ Tier 3 (James)  ☐ CISO  ☐ None

Outcome: __________________________________________

═══════════════════════════════════════════════════
SECTION 6: INDICATORS OF COMPROMISE
═══════════════════════════════════════════════════
IP Addresses: _____________________________________
User Accounts: ____________________________________
Other: ____________________________________________

═══════════════════════════════════════════════════
SECTION 7: RECOMMENDED NEXT STEPS
═══════════════════════════════════════════════════
1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

═══════════════════════════════════════════════════
SECTION 8: OPEN QUESTIONS / NOTES
═══════════════════════════════════════════════════
___________________________________________________
___________________________________________________
```

---

## Part 9: Facilitator Observation Guide

### Key Moments to Watch

| Time | Observe |
|------|---------|
| 55:00-45:00 | How do they prioritise? Do they discuss before acting? |
| 45:00-40:00 | Do they connect Liam's ticket to anything suspicious? |
| 40:00 | Reaction to ENV-1A—does it change their approach? |
| 35:00-20:00 | The Liam decision—investigate or dismiss? |
| 25:00-15:00 | Escalation quality—what evidence do they include? |
| 20:00 | Reaction to Priya's check-in—formal or informal response? |
| 05:00 | Cliffhanger reaction—do they connect it to earlier findings? |

### Strong Team Indicators
- Multiple members contributing
- Referencing specific evidence ("Card #5 says...")
- Debating trade-offs openly
- Using roles effectively
- Documenting as they go

### Common Pitfalls
1. **Tunnel vision**: Focus on credential stuffing, miss Liam's ticket
2. **Premature escalation**: Go to Priya without evidence
3. **Analysis paralysis**: Over-investigate, no tokens left for action
4. **False lead trap**: Spend too many tokens on Jenny's email

---

## Part 10: Critical Path & Token Budget

### Ideal Flow
1. Review starting artefacts → note Liam's ticket
2. Threat intel lookup (1 token) → context
3. Liam detailed interview (2 tokens) → **discover MFA bypass**
4. Deep log analysis (2 tokens) → **find anomalous login**
5. Connect the dots → social engineering attack
6. Escalate to Priya with evidence (2 tokens) → strong response
7. Consider containment, await guidance
8. Cliffhanger confirms → document in report

### Suggested Token Budget

| Action | Tokens | Priority |
|--------|--------|----------|
| Threat intel | 1 | Medium |
| Liam interview | 2 | **Critical** |
| Deep log analysis | 2 | **Critical** |
| Escalate to Priya | 2 | High |
| IP reputation | 1 | Medium |
| Liam account activity | 2 | High |
| Jenny investigation | 2 | Low (trap) |
| **Optimal total** | ~10 | 2 token buffer |

### Evidence Dependencies

```
Starting: #1 Handover, #2 SIEM, #3 Liam ticket, #4 Jenny ticket
    │
    ├─► #5 Liam Interview (2 tokens) ──► #9 Account Activity (2 tokens)
    │
    ├─► #6 Jenny Investigation (2 tokens) → FALSE POSITIVE
    │
    ├─► #7 Auth Logs (2 tokens) ──► #9 Account Activity (2 tokens)
    │
    ├─► #8 Threat Intel (1 token)
    │
    └─► #10 IP Reputation (1 token)
```

---

## Part 11: Detailed Artefact Content

*Full text versions of all Evidence Cards for production.*

### Evidence Card #1: Shift Handover Notes (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #1 — SHIFT HANDOVER NOTES                        │
├─────────────────────────────────────────────────────────────────┤
│  From: Night Shift (Alex)                                       │
│  To: Day Shift                                                  │
│  Date: Monday, 14 October 2024, 07:45 ACDT                      │
│                                                                 │
│  Hey team,                                                      │
│                                                                 │
│  Quiet night overall. Few things to note:                       │
│                                                                 │
│  • SIEM threw a bunch of failed login alerts around 3am—looks   │
│    like credential stuffing against the customer portal again.  │
│    Same pattern as last month. I've logged it but didn't        │
│    escalate. Probably just script kiddies.                      │
│                                                                 │
│  • There's a service ticket from someone in Customer Support    │
│    about a "weird call from IT." Came in late yesterday.        │
│    Didn't get a chance to look at it. Probably nothing but      │
│    worth a glance.                                              │
│                                                                 │
│  • Another ticket about a suspicious email. Marketing related   │
│    I think? Low priority.                                       │
│                                                                 │
│  • Backups completed successfully. No infrastructure alerts.    │
│                                                                 │
│  Coffee machine is broken again.                                │
│                                                                 │
│  — Alex                                                         │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #2: SIEM Alert Dashboard (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #2 — SIEM ALERT DASHBOARD                        │
├─────────────────────────────────────────────────────────────────┤
│  XYZ Pay Security Operations Centre                             │
│  Alert Summary: Last 24 Hours                                   │
│  Generated: Monday, 14 October 2024, 08:00 ACDT                 │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  CRITICAL: 0    HIGH: 0    MEDIUM: 3    LOW: 47         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
│  MEDIUM ALERTS (3):                                             │
│  ───────────────────────────────────────────────────────────    │
│  [M-2471] 03:12 — Multiple failed logins: customer-portal       │
│           Source: 185.220.101.42 | Attempts: 847 | Status: Open │
│                                                                 │
│  [M-2472] 03:14 — Multiple failed logins: customer-portal       │
│           Source: 91.240.118.29 | Attempts: 612 | Status: Open  │
│                                                                 │
│  [M-2473] 03:47 — Multiple failed logins: customer-portal       │
│           Source: 194.26.192.71 | Attempts: 423 | Status: Open  │
│                                                                 │
│  LOW ALERTS (47):                                               │
│  ───────────────────────────────────────────────────────────    │
│  [L-8834 to L-8880] — Failed login attempts (individual)        │
│           Various sources | Pattern: Credential stuffing        │
│                                                                 │
│  ───────────────────────────────────────────────────────────    │
│  Note: Credential stuffing pattern matches known botnet         │
│  activity. No successful authentications from flagged IPs.      │
│  Recommend: Monitor, no immediate action required.              │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #3: Service Ticket — Liam (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #3 — SERVICE TICKET #4471                        │
├─────────────────────────────────────────────────────────────────┤
│  Status: Open                Priority: Low                      │
│  Category: Security — General Inquiry                           │
│  Submitted: Sunday, 13 October 2024, 16:42 ACDT                 │
│                                                                 │
│  From: Liam Fitzgerald (Customer Support)                       │
│  Subject: Weird call from IT department                         │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  Hi,                                                            │
│                                                                 │
│  Got a call from IT support this morning asking me to verify    │
│  something. Seemed legit but wanted to flag it just in case.    │
│  Not urgent, just thought I'd mention it.                       │
│                                                                 │
│  Thanks,                                                        │
│  Liam                                                           │
│  ───────────────────────────────────────────────────────────    │
│  Assigned to: SOC Queue                                         │
│  SLA: 48 hours                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #4: Service Ticket — Jenny (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #4 — SERVICE TICKET #4468                        │
├─────────────────────────────────────────────────────────────────┤
│  Status: Open                Priority: Low                      │
│  Category: Security — Phishing Report                           │
│  Submitted: Friday, 11 October 2024, 14:23 ACDT                 │
│                                                                 │
│  From: Jenny Marcos (Marketing)                                 │
│  Subject: Suspicious email - please check                       │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  Hi Security team,                                              │
│                                                                 │
│  I received an email that looks a bit dodgy. It's asking me     │
│  to click a link to "verify my account" for some retail         │
│  analytics platform. I don't remember signing up for this.      │
│  Screenshot attached.                                           │
│                                                                 │
│  Can you check if it's legit?                                   │
│                                                                 │
│  Thanks,                                                        │
│  Jenny                                                          │
│  ───────────────────────────────────────────────────────────    │
│  Attachment: email_screenshot.png                               │
│  Assigned to: SOC Queue                                         │
│  SLA: 48 hours                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #5: Liam Interview — Detailed (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #5 — EMPLOYEE INTERVIEW: LIAM FITZGERALD         │
├─────────────────────────────────────────────────────────────────┤
│  Interview conducted: Monday, 14 October 2024                   │
│  Method: Phone call to Customer Support desk                    │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  SOC: "Hi Liam, following up on your ticket about a weird       │
│        call from IT. Can you tell us more?"                     │
│                                                                 │
│  LIAM: "Oh yeah. I got a call Sunday morning—maybe 10am? The    │
│         guy said he was from IT support doing a security audit. │
│         He was really professional, knew my name and everything."│
│                                                                 │
│  SOC: "What did he ask you to do?"                              │
│                                                                 │
│  LIAM: "He said he needed to verify my identity for the audit.  │
│         Asked me to read out a code that would be sent to my    │
│         phone. I got a text with a 6-digit code and read it     │
│         to him."                                                │
│                                                                 │
│  SOC: "Did he ask for your password?"                           │
│                                                                 │
│  LIAM: "No, that's why I thought it was legit. He even said     │
│         'we'll never ask for your password'—which is what IT    │
│         always says, right? So I figured it was fine."          │
│                                                                 │
│  SOC: "Did anything else happen after?"                         │
│                                                                 │
│  LIAM: "No, he just said thanks and hung up. Should I be        │
│         worried? Did I do something wrong?"                     │
│  ───────────────────────────────────────────────────────────    │
│  ANALYST NOTES:                                                 │
│  Pattern consistent with MFA bypass via social engineering.     │
│  Attacker likely had Liam's password already and used vishing   │
│  to obtain MFA code.                                            │
│  RECOMMEND: Check Liam's account for suspicious activity.       │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #6: Jenny Email Investigation (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #6 — EMAIL ANALYSIS: JENNY MARCOS REPORT         │
├─────────────────────────────────────────────────────────────────┤
│  Analysis conducted: Monday, 14 October 2024                    │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  EMAIL HEADERS:                                                 │
│  From: noreply@retailmetrics.com.au                             │
│  Reply-To: support@retailmetrics.com.au                         │
│  SPF: PASS    DKIM: PASS    DMARC: PASS                         │
│                                                                 │
│  LINK ANALYSIS:                                                 │
│  URL: https://app.retailmetrics.com.au/verify?token=...         │
│  Domain registered: 2019                                        │
│  SSL Certificate: Valid, DigiCert                               │
│  VirusTotal: 0/87 detections                                    │
│  URLScan: Clean, legitimate retail analytics SaaS               │
│                                                                 │
│  BUSINESS CONTEXT:                                              │
│  RetailMetrics is a legitimate analytics vendor. Cross-check    │
│  with Procurement confirms XYZ has active contract (signed      │
│  6 months ago by Marketing team).                               │
│  ───────────────────────────────────────────────────────────    │
│  VERDICT: FALSE POSITIVE                                        │
│  Legitimate email from contracted vendor. Jenny likely forgot   │
│  she signed up during onboarding.                               │
│  RECOMMEND: Close ticket, inform Jenny email is safe.           │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #7: Authentication Logs — Deep Analysis (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #7 — AUTHENTICATION LOG ANALYSIS                 │
├─────────────────────────────────────────────────────────────────┤
│  Analysis period: 12-14 October 2024                            │
│  Systems: customer-portal, internal-sso, admin-console          │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  CREDENTIAL STUFFING PATTERN (customer-portal):                 │
│  • 1,882 failed attempts from 3 IPs (known Tor exit nodes)      │
│  • Targeting random usernames from leaked list                  │
│  • 0 successful authentications                                 │
│  • Pattern: Automated, indiscriminate, opportunistic            │
│  • ASSESSMENT: Background noise, no immediate threat            │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  ⚠️  ANOMALY DETECTED (internal-sso):                           │
│  • Sunday, 13 October 2024, 10:14 ACDT                          │
│  • User: liam.fitzgerald@xyzpay.com.au                          │
│  • Event: Successful MFA authentication                         │
│  • Source IP: 103.42.91.17                                      │
│  • Location: VPN endpoint (Indonesia)                           │
│  • Device: Unknown (not in asset inventory)                     │
│                                                                 │
│  • Liam's usual pattern: Adelaide, corporate laptop             │
│  • This login: Foreign IP, unknown device, Sunday morning       │
│  ───────────────────────────────────────────────────────────    │
│  ASSESSMENT: Suspicious. Possible account compromise.           │
│  Does NOT match credential stuffing pattern.                    │
│  RECOMMEND: Investigate user, check post-auth activity.         │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #8: Threat Intelligence Brief (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #8 — THREAT INTELLIGENCE BRIEF                   │
├─────────────────────────────────────────────────────────────────┤
│  Query: Credential stuffing, BNPL sector, October 2024          │
│  Source: XYZ Threat Intel Database                              │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  CURRENT THREAT LANDSCAPE:                                      │
│  • Credential stuffing against AU fintech up 34% in Q3 2024     │
│  • Primary driver: Large credential dumps circulating           │
│  • Most attacks opportunistic (automated botnets)               │
│  • BNPL sector targeted due to high account values              │
│                                                                 │
│  KNOWN THREAT ACTORS:                                           │
│  • No specific APT groups targeting AU BNPL currently           │
│  • Hacktivist group "right_0ff" has targeted financial          │
│    services with ideological motivation (anti-predatory         │
│    lending). Primarily uses social engineering.                 │
│  • Ransomware groups occasionally target fintech but prefer     │
│    larger enterprises                                           │
│  ───────────────────────────────────────────────────────────    │
│  RELEVANCE:                                                     │
│  Credential stuffing in alerts M-2471 to M-2473 matches known   │
│  botnet activity. Likely opportunistic. However, remain         │
│  vigilant for targeted attacks using different vectors          │
│  (phishing, vishing).                                           │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #9: Liam Account Activity (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #9 — USER ACTIVITY: LIAM.FITZGERALD              │
├─────────────────────────────────────────────────────────────────┤
│  Period: Sunday 13 October 2024, 10:14-11:30 ACDT               │
│  Source: Internal SSO + Application Logs                        │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  10:14 — SSO Login (MFA success) from 103.42.91.17              │
│  10:16 — Accessed: Employee Directory                           │
│  10:18 — Accessed: Internal Wiki (searched: "org chart")        │
│  10:23 — Accessed: HR Portal (viewed own profile)               │
│  10:31 — Accessed: Finance Team contact list                    │
│  10:45 — Accessed: IT Support documentation                     │
│  10:52 — Accessed: Executive Assistant contact details          │
│  11:15 — Session idle timeout                                   │
│  11:30 — Session ended                                          │
│  ───────────────────────────────────────────────────────────    │
│  ANALYSIS:                                                      │
│  Activity suggests reconnaissance—browsing directories and      │
│  contact info rather than normal Customer Support tasks.        │
│                                                                 │
│  No customer data access during this session.                   │
│  No file downloads. No email sent.                              │
│                                                                 │
│  ASSESSMENT: Likely attacker performing internal recon          │
│  after gaining access via compromised credentials.              │
└─────────────────────────────────────────────────────────────────┘
```

---

### Evidence Card #10: IP Reputation Report (Full Text)

```
┌─────────────────────────────────────────────────────────────────┐
│  EVIDENCE CARD #10 — IP REPUTATION REPORT                       │
├─────────────────────────────────────────────────────────────────┤
│  Query IP: 103.42.91.17                                         │
│  Query Date: Monday, 14 October 2024                            │
│  ───────────────────────────────────────────────────────────    │
│                                                                 │
│  GEOLOCATION:                                                   │
│  • Country: Indonesia                                           │
│  • City: Jakarta                                                │
│  • ISP: PT Telekomunikasi Indonesia                             │
│  • Type: Commercial VPN endpoint                                │
│                                                                 │
│  REPUTATION SCORES:                                             │
│  • AbuseIPDB: 47% confidence malicious (23 reports)             │
│  • VirusTotal: 3/87 vendors flag as suspicious                  │
│  • Shodan: Open ports 22, 80, 443, 1194 (VPN)                   │
│                                                                 │
│  HISTORICAL ACTIVITY:                                           │
│  • Associated with VPN service "PrivacyShield"                  │
│  • Previously seen in: credential stuffing, account takeover    │
│  • No direct attribution to specific threat actor               │
│  ───────────────────────────────────────────────────────────    │
│  ASSESSMENT: Suspicious. Commonly used for anonymisation.       │
│  Consistent with attacker hiding true location.                 │
└─────────────────────────────────────────────────────────────────┘
```

---

*Document version: 0.1 (Draft)*
*Last updated: December 2025*
