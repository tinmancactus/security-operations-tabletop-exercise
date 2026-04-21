# Operation Glasshouse: Story Bible

> **Document Purpose**: This is the master narrative reference for the tabletop exercise. It contains information that students will *discover* through gameplay—do not share this document with participants.

---

## Executive Summary

**Operation Glasshouse** is a two-session tabletop exercise where students role-play as SOC Analysts responding to an escalating cyberattack against a fictional Australian fintech company. The attack is perpetrated by hacktivists who oppose the "Buy Now, Pay Later" industry and combines social engineering, credential theft, and insider manipulation.

**Core Themes**:
- Signal vs. noise in alert triage
- Containment decisions with business trade-offs
- Trust verification under pressure
- Communication and escalation protocols

---

## Part 1: The Company

### XYZ Pty Ltd — Company Profile

| Attribute | Detail |
|-----------|--------|
| **Legal Name** | XYZ Payments Pty Ltd |
| **Trading As** | XYZ Pay |
| **Headquarters** | Adelaide, South Australia |
| **Founded** | 2019 |
| **Employees** | ~150 |
| **Industry** | Financial Technology (Buy Now, Pay Later) |
| **Valuation** | ~$180M AUD (Series B) |

### Business Overview

XYZ Pay provides a "Buy Now, Pay Later" API platform for small-to-medium Australian e-commerce retailers. Their core product allows online stores to offer interest-free instalment payments at checkout. XYZ makes money through:
- Merchant fees (3-5% per transaction)
- Late payment fees from consumers
- Data insights sold to retail partners

**Recent News** (context students may discover):
- XYZ was recently criticised in a consumer advocacy report for "targeting vulnerable demographics"
- The company is preparing for a Series C funding round—any reputational damage is especially costly right now
- A competitor was breached last quarter, prompting XYZ to rush through a "security uplift" project

### Brand & Culture

XYZ projects a friendly, millennial-focused brand ("Pay your way, stress-free!"). Internally, the culture is fast-paced and growth-obsessed. Security has historically been under-resourced—the SOC was only established 18 months ago.

**Internal Tensions** (for flavour):
- The Sales team frequently pressures IT to "move fast and not block deals"
- The CFO has questioned whether the SOC is "worth the headcount"
- The CISO (relatively new) is still building credibility with the executive team

---

## Part 2: Key Personnel (NPCs)

These are the characters students will interact with via artefacts (emails, tickets, voicemails, chat logs). Students never speak to them directly—all interactions are mediated through documents.

### IT & Security Team

#### Marcus Chen — CISO / Head of Security
| Attribute | Detail |
|-----------|--------|
| **Role** | Chief Information Security Officer |
| **Reports To** | CEO (David Whitmore) |
| **Personality** | Measured, politically savvy, still proving himself to the board |
| **Contact Protocol** | Only during confirmed critical incidents |

**Background**: Marcus joined XYZ 14 months ago from a Big 4 consulting firm. He's competent but stretched thin—he's the only senior security leader and spends most of his time in meetings with executives rather than hands-on.

**Narrative Role**: Marcus is the "good authority"—his guidance can be trusted. He's the escalation point for major decisions, but he's often unavailable (in meetings, travelling).

---

#### Priya Sharma — SOC Manager
| Attribute | Detail |
|-----------|--------|
| **Role** | Security Operations Centre Manager |
| **Reports To** | Marcus Chen (CISO) |
| **Personality** | Pragmatic, supportive, hates unnecessary escalations |
| **Contact Protocol** | First escalation point for Medium+ severity |

**Background**: Priya built the SOC from scratch and is protective of her team. She trusts her analysts but expects them to bring evidence, not hunches.

**Narrative Role**: Priya is the students' direct manager. She provides guidance when escalated to, but pushes back if students escalate without justification. Her responses (via in-game messages) will vary based on the quality of information students provide.

---

#### James Okoro — Senior Incident Response Analyst (Tier 3)
| Attribute | Detail |
|-----------|--------|
| **Role** | Lead IR Analyst / Forensics Specialist |
| **Reports To** | Priya Sharma |
| **Personality** | Intense, technically brilliant, impatient with sloppy analysis |
| **Contact Protocol** | Escalate high-confidence active incidents |

**Background**: James is the only Tier 3 analyst. He handles forensics, malware analysis, and leads major incident responses. He's overworked and can be brusque, but he's the best technical resource available.

**Narrative Role**: James is the "expert witness"—when students escalate correctly, his analysis (via in-game messages) provides crucial insights. If students escalate prematurely, his responses are curt and unhelpful.

---

#### Rachel Torres — Infrastructure Manager
| Attribute | Detail |
|-----------|--------|
| **Role** | Infrastructure Manager |
| **Reports To** | CTO |
| **Personality** | Overworked, defensive about her team, helpful when approached correctly |
| **Contact Protocol** | Via ticketing system; direct call in emergencies only |

**Background**: Rachel's team handles servers, networking, Active Directory, backups, and patching. They're perpetually behind on patching due to pressure from business units to avoid downtime.

**Narrative Role**: Rachel is the "gatekeeper" to infrastructure actions. Students need her team to implement containment measures. Her cooperation depends on how well students communicate the urgency and justification.

---

### Executive Team

#### David Whitmore — CEO
| Attribute | Detail |
|-----------|--------|
| **Role** | Chief Executive Officer |
| **Personality** | Charismatic, growth-focused, not technically literate |
| **Contact Protocol** | Never directly; via CISO only |

**Background**: David founded XYZ and is laser-focused on the Series C raise. He views security as a cost centre and trusts his executives to handle "technical stuff."

**Narrative Role**: Off-screen decision maker. Students will hear about his decisions (e.g., "The CEO has decided not to negotiate") but never interact directly.

---

#### Sandra Leigh — CFO ⚠️ COMPROMISED
| Attribute | Detail |
|-----------|--------|
| **Role** | Chief Financial Officer |
| **Personality** | Demanding, cost-conscious, impatient |
| **Contact Protocol** | Should be via CISO, but she sometimes contacts SOC directly |

**Background**: Sandra has been with XYZ since 2020. She's sceptical of security spending and has clashed with Marcus over budget. She's also not particularly tech-savvy—she reuses passwords and finds MFA "annoying."

**🚨 CRITICAL PLOT POINT**: Sandra's account is compromised in Session 2. The attackers use her email to send instructions to the SOC, attempting to misdirect the investigation or delay containment.

**Compromise Timeline**:
1. Sandra received a vishing call (voice phishing) posing as IT support
2. She provided her MFA code to the caller
3. Attackers now have access to her email and can send messages as her

**Red Flags Students Might Notice**:
- Sandra's emails during the incident have unusual phrasing or tone
- Her "instructions" contradict established protocols
- Login logs show her account accessed from an anomalous IP
- She's supposedly sending emails while her calendar shows she's in a board meeting

**Narrative Role**: Sandra is the "compromised authority." Her messages (controlled by the attacker) will:
- Urge the SOC to "stand down" or "not escalate yet"
- Claim she's "handling it directly with the CEO"
- Request sensitive information be sent to her
- Delay containment actions ("don't disable any accounts until I've spoken to legal")

Students who verify her instructions against logs/protocols will spot the deception. Students who defer to her authority will fall into the trap.

---

#### Michael Tran — CTO
| Attribute | Detail |
|-----------|--------|
| **Role** | Chief Technology Officer |
| **Personality** | Technical but conflict-averse, often defers to Sandra on budget matters |
| **Contact Protocol** | Via Infrastructure Manager or CISO |

**Background**: Michael oversees all technology but has delegated security to Marcus. He's supportive of the SOC but won't override Sandra in a conflict.

**Narrative Role**: Minor character. May appear in background communications.

---

### Employees (Victims of Social Engineering)

#### Liam Fitzgerald — Customer Support Officer
| Attribute | Detail |
|-----------|--------|
| **Role** | Customer Support Officer |
| **Relevance** | Successfully vished the morning of Session 1; his compromised account is the primary attack vector |

**What Happened**: At approximately 07:45 on Monday morning (just before Session 1 begins), Liam received a call from "IT Support" (actually the attackers) asking him to "verify his identity" by reading back an MFA code sent to his phone. He complied, thinking it was routine. The attacker logged in with Liam's credentials at 07:52 from Indonesia, conducted internal reconnaissance (employee directory, org chart, finance contacts), and accessed the customer database at 08:22 — querying 2,847 records. By the time Liam submits his service ticket at 08:06, the attacker is already inside.

**How Students Encounter Him**: Via a service ticket (TKT-4472, visible 6 minutes into Session 1) where he mentions a "weird call from IT this morning" but downplays it.

**Key Quote** (from interview — evidence EV-5):
> "I got a call this morning—maybe quarter to 8? The guy said he was from IT, something about a system migration. He needed me to read back a code from my phone to confirm my identity. He even said 'we'll never ask for your password' which made me trust him more. I just read him the code—is that bad?"

---

#### Anika Patel — Finance Analyst
| Attribute | Detail |
|-----------|--------|
| **Role** | Finance Team Analyst |
| **Relevance** | Vishing target who resisted — contrasts with Liam's compromise; reports to Sandra |

**What Happened**: Anika received a vishing call around 10:00 AM on Sunday (the day before Session 1). The caller claimed to be from IT and asked her to confirm an MFA code. Anika was suspicious — the caller seemed "a bit too pushy" and kept asking for the code. She hung up. Authentication logs (LOG-1005) confirm a failed MFA challenge for her account from the attacker's IP (103.42.91.17) at 09:47 Sunday. She was **not** compromised.

**How Students Encounter Her**: Via a service ticket (TKT-4471, submitted Sunday at 10:17 AM, visible at Session 1 start) flagged by Alex Anderson in his overnight handover notes. Alex notes: "Anika Patel reported a suspicious call from 'IT Support' yesterday. She didn't give them anything but wanted it on record."

**Key Quote** (from interview — evidence EV-10):
> "I got a call yesterday around 10 in the morning. They said they were from IT, asked me to confirm a code on my phone. Something felt off — he was a bit too pushy about it. I told him I'd call the help desk back myself and hung up. Then I put in a ticket just in case."

*(Note: Anika's suspicion and correct response contrasts with Liam's compliance. The failed attempt on Anika also shows the attacker pivoted to Liam as the next target.)*

---

#### David Chen — Merchant Partnerships Manager
| Attribute | Detail |
|-----------|--------|
| **Role** | Merchant Partnerships Manager |
| **Department** | Sales |
| **Relevance** | Compromised via vishing but account never used by right_0ff (decoy/reserve) |

**What Happened**: David received a vishing call on the Saturday before Session 1 (two days before Monday). He gave the caller his MFA code. Authentication logs show a successful login from attacker infrastructure at 14:23 Saturday, a brief session (~3 minutes, enough to confirm access works), then nothing. right_0ff never used his account — they had already obtained Sandra's executive-level access and Liam's customer database access, making David's sales-level credentials redundant.

**How Students Encounter Him**: David comes forward in Session 2 after reading Monday's company-wide security advisory. He submits a worried ticket: "I think I might have messed up — I got a call from IT on Saturday and gave them a code."

**Investigative Value**: Students who investigate David's account find the single anomalous login from attacker infrastructure but **no further activity**. The trail goes cold. This is time-consuming to confirm and yields no new IOCs — exactly what right_0ff intended. However, the *pattern* of multiple compromised accounts is itself valuable intelligence: it reveals the scale of the vishing campaign and suggests the attacker had more access than they used.

---

#### Nadia Khoury — Marketing Coordinator
| Attribute | Detail |
|-----------|--------|
| **Role** | Marketing Coordinator |
| **Department** | Marketing |
| **Relevance** | Compromised via vishing but account never used by right_0ff (decoy/reserve) |

**What Happened**: Nadia received a vishing call on Sunday morning, shortly before the attempt on Anika. She gave the caller her MFA code without hesitation. Authentication logs show a successful login from a *different* attacker IP (185.220.101.48 — a European VPN endpoint) at 09:15 Sunday, a brief session (~5 minutes), then nothing. The use of a different IP is deliberate — it makes correlation harder for the SOC.

**How Students Encounter Her**: Nadia comes forward in Session 2 after David Chen mentions his experience in the break room. She doesn't submit a ticket — she messages the SOC directly via the comms channel: "David just told me about his call. I got one too — Sunday morning. Did I do something wrong?"

**Investigative Value**: Same dead-end pattern as David's account, but with a *different* attacker IP. This is a deliberate anti-forensic technique — if the SOC is hunting solely for 103.42.91.17, they'll miss this one. Students who correlate the timing and call pattern rather than just the IP will identify a broader campaign. Students who chase only the IP will waste tokens and find nothing.

---

#### Tom Bradshaw — Account Executive
| Attribute | Detail |
|-----------|--------|
| **Role** | Account Executive |
| **Department** | Sales |
| **Relevance** | Innocent — legitimate MFA re-enrollment that looks suspicious in context (noise) |

**What Happened**: Tom switched to a new phone over the weekend and needed to get his authenticator app set up again. On Monday morning he called the IT help desk himself and they walked him through re-enrolling his MFA. His account was never compromised — this is entirely legitimate activity.

**How Students Encounter Him**: His ticket appears in Session 2's queue a few minutes after the session starts, alongside the vishing-related tickets from David and Nadia. He heard them talking and wanted to flag his own IT interaction just in case. It looks superficially similar — "staff member + IT call + MFA" — but investigation reveals an entirely mundane explanation.

**Investigative Value**: None (it's noise). Students who check the logs find a service desk–authorised MFA re-enrollment from Tom's office IP, no anomalous foreign login, and a perfectly clean trail. The value is in the *decision not to investigate further* — recognising that not every MFA-related event during a breach is part of the breach. Students who spend a token resetting Tom's credentials without checking have wasted resources.

---

### The Vishing Campaign — Summary

right_0ff's vishing campaign targeted at least 5 XYZ employees over the Saturday–Monday window:

| Target | When | Outcome | Account Used? | Attacker IP |
|--------|------|---------|---------------|-------------|
| Sandra Leigh (CFO) | ~1 week prior | ✅ Compromised | **Yes** — primary executive access | 103.2.117.8 (AU, Superloop) |
| David Chen (Sales) | Saturday ~14:23 | ✅ Compromised | **No** — access confirmed then abandoned | 198.54.131.152 (US, Namecheap) |
| Nadia Khoury (Marketing) | Sunday ~09:15 | ✅ Compromised | **No** — access confirmed then abandoned | 185.220.101.48 (NL, ZAVOD) |
| Anika Patel (Finance) | Sunday ~09:47 | ❌ Failed — target hung up | N/A | 103.42.91.17 (ID VPN) |
| Liam Fitzgerald (Support) | Monday ~07:45 | ✅ Compromised | **Yes** — customer DB access | 103.42.91.17 (ID VPN) |

**Why right_0ff compromised accounts they didn't use**: This is a deliberate tactic with four purposes:
1. **Reserve access** — if Sandra or Liam's accounts were disabled, David or Nadia's could serve as fallback entry points
2. **SOC distraction** — each compromised account that students discover during Session 2 costs time and tokens to investigate, pulling resources from the active threats (Sandra's ongoing compromise, the scheduled exfiltration task)
3. **Scale intimidation** — when students realise right_0ff compromised 4+ accounts, it changes the threat assessment. The attacker is more capable and methodical than a single vished account would suggest.
4. **IP misdirection** — right_0ff deliberately uses obvious international IPs (US, NL, ID) for the expendable accounts, training the SOC to hunt foreign infrastructure. Sandra's account exclusively uses an Adelaide-based commercial ISP (Superloop) to blend in with her expected location. Students who only look for "suspicious foreign IPs" will miss the real threat entirely.

**Real-world precedent**: Lapsus$ (2021–22) routinely compromised more employee accounts than they needed via SIM-swapping and social engineering, using the extras as backup access and to confuse incident responders. LulzSec similarly operated on a principle of creating chaos and misdirection — their 2011 campaigns involved throwaway compromises designed to waste defenders' time while the real objective was pursued elsewhere.

---

## Part 3: The Antagonist

### right_0ff

| Attribute | Detail |
|-----------|--------|
| **Type** | Hacktivist group |
| **Motivation** | Ideological—oppose predatory lending and BNPL industry |
| **Primary Tactics** | Social engineering, credential theft, public shaming |
| **Technical Sophistication** | Medium—skilled at human hacking, less so at advanced persistent threats |

### Background & Ideology

right_0ff emerged in 2023 as a loose hacktivist collective targeting financial services companies they view as exploitative. Their manifesto (posted on various forums) argues that BNPL companies "trap vulnerable people in debt cycles while hiding behind friendly branding."

**Inspired by**: Anonymous, Lapsus$ (social engineering focus), and consumer advocacy movements.

**Previous Operations** (fictional):
- Leaked internal emails from a UK payday lender showing executives joking about "repeat customers"
- Defaced the website of a US debt collection agency
- Doxed executives of a credit card company

### Modus Operandi

1. **Reconnaissance**: Research target company, identify employees via LinkedIn, gather phone numbers
2. **Vishing Campaign**: Call employees posing as IT support, harvest MFA codes
3. **Initial Access**: Use stolen credentials to access internal systems
4. **Persistence**: Create backdoor accounts, access executive emails
5. **Data Collection**: Gather embarrassing internal communications, customer data samples
6. **Public Pressure**: Issue ultimatum, then leak to journalists if ignored

**Key Characteristic**: right_0ff doesn't sell data—they leak it publicly for maximum embarrassment. They're not after money; they want to damage reputations.

### Voice & Messaging Style

right_0ff communications are:
- **Righteous**: They see themselves as Robin Hood figures
- **Taunting**: They mock corporate security and "overpaid executives"
- **Media-savvy**: They write for journalists, not just victims

**Sample Messages**:

*Calling card (left on compromised system):*
> "XYZ helps people buy what they can't afford, then buries them in fees. We're just balancing the books. —right_0ff"

*Ultimatum (sent to CISO):*
> "48 hours. That's how long your customers have before they learn what you really think of them. We have emails. We have data. We have everything.
>
> You can't stop us. You can only choose how this story ends.
>
> Sincerely,
> right_0ff
>
> P.S. Tell Sandra we said thanks for the access."

*Media leak (sent to journalist):*
> "Attached: proof that XYZ Pay knew their late fees disproportionately hit low-income users and did nothing. Also attached: 10,000 customer records, just a taste. More coming unless XYZ comes clean."

---

## Part 4: Attack Timeline (Behind the Scenes)

This is the "true" timeline of the attack. Students will discover fragments of this through investigation.

### Pre-Exercise (Background)

| Date | Event |
|------|-------|
| 3 weeks ago | right_0ff identifies XYZ as target after consumer advocacy report |
| 2 weeks ago | Attackers scrape LinkedIn for XYZ employee names and roles |
| 10 days ago | Attackers obtain XYZ employee phone numbers via social engineering (calling reception) |
| ~1 week ago | Sandra Leigh compromised via vishing (highest-value target — provides executive-level access) |
| 5 days ago | Attackers use Sandra's access to explore internal systems, map org chart, identify finance/support staff |
| 3 days ago | Attackers create backdoor admin account ("svc_backup_admin") using Sandra's access |
| Saturday 14:23 | Attackers compromise David Chen (Sales) via vishing — brief login to confirm access, then abandoned. Account never used. |
| Sunday 09:15 | Attackers compromise Nadia Khoury (Marketing) via vishing — brief login from 185.220.101.48 (EU VPN), then abandoned. Account never used. |
| Sunday 09:47 | Attackers attempt to compromise Anika Patel via vishing — she is suspicious and hangs up. Failed MFA login from 103.42.91.17. |
| Sunday 10:17 | Anika submits service ticket (TKT-4471) reporting the suspicious call |
| **Monday 07:45** | Attackers successfully vish Liam Fitzgerald — he reads back his MFA code |
| **Monday 07:52** | Attacker logs into XYZ SSO using Liam's credentials from Indonesia (103.42.91.17) |
| **Monday 07:52–08:22** | Attacker conducts reconnaissance via Liam's account: employee directory, org chart, finance contacts, IT support docs |
| **Monday 08:00** | **Session 1 begins** — the attack is already underway |
| **Monday 08:22** | Attacker accesses customer database via Liam's account — 2,847 records queried |

### Session 1 Timeline ("Static")

*Session runs 08:00–09:00 in-game (60 minutes real-time). Elapsed time shown in parentheses.*

| Time | Event | Visible to Students? |
|------|-------|---------------------|
| 03:12–04:15 (overnight) | Credential stuffing attack against customer portal — hundreds of failed logins from Tor exit nodes | Yes (SIEM alerts visible at session start — background noise) |
| 07:52 (pre-session) | Attacker logs in with Liam's stolen credentials from 103.42.91.17 | In logs if investigated (LOG-0050) |
| 07:52–08:22 (pre-session) | Attacker reconnaissance: employee directory, org chart, finance contacts, IT support docs | In logs if investigated |
| 08:00 (0 min) | Session begins. Alex Anderson's overnight handover notes arrive. Anika's Sunday ticket (TKT-4471) visible. Overnight credential stuffing alerts on SIEM dashboard. | Yes (starting artefacts) |
| 08:06 (6 min) | Liam Fitzgerald submits service ticket (TKT-4472): "Weird call from IT this morning?" | Yes (ticket queue) |
| 08:22 | Attacker accesses customer database via Liam's account — 2,847 records queried | In logs if investigated (LOG-0057) |
| 08:24 (24 min) | SIEM alert M-2489: Unusual login pattern for liam.fitzgerald from Indonesian IP | Yes (medium-severity alert) |
| 08:53 (53 min) | James Okoro comes online, begins catching up | Yes (comms message) |
| 08:55 (55 min) | **CRITICAL ALERT H-0012**: Sensitive data access detected — 2,847 customer records accessed from Liam's account via 103.42.91.17 | Yes (cliffhanger alert) |

### Monday Morning — Initial Response (Post-Session 1)

| Time | Event | Notes |
|------|-------|-------|
| 09:00 Mon | Session 1 ends. James (online since ~08:53) begins full investigation of the critical alert (H-0012). | James started late due to morning appointment |
| 09:30 Mon | James confirms anomalous login and customer database access — Liam's account accessed from 103.42.91.17 (Indonesia) | Full investigation of cliffhanger alert |
| 10:00 Mon | James escalates to Priya with evidence. Priya declares security incident (IR-2024-0847), escalates to Marcus (CISO). | Formal incident opened |
| 10:30 Mon | Marcus briefs David Whitmore (CEO): "Developing security incident, we're investigating" | CEO aware but not alarmed yet |
| 11:00 Mon | Liam's account disabled, password reset, MFA token revoked | Containment (may have been done by students in Session 1) |
| 11:30 Mon | Attacker IP 103.42.91.17 blocked at perimeter firewall | Standard containment step |
| 12:00 Mon | Marcus authorises James for extended work (overtime approved) | James is the only Tier 3 IR specialist |
| 14:00 Mon | Marcus sends company-wide security advisory: "Be vigilant about IT calls. Do not share MFA codes with anyone claiming to be from XYZ IT. Report suspicious contacts to the SOC immediately." | General awareness measure |
| 14:30 Mon | James begins reviewing all of Liam's account activity for the past 30 days | Following the Liam thread |
| 15:00 Mon | James discovers 2,847 transaction records accessed via Liam's credentials | Scope of data access confirmed |
| 16:00 Mon | James confirms accessed data was from customer_transactions_db — contains customer IDs, amounts, dates, late fee history — but **no PII** (no names, emails, or contact details) | Data separation identified |
| 17:00 Mon | Day shift ends. James stays for overtime. Priya goes home, on-call. | Standard shift handover |

### Monday Evening — James's Overtime

| Time | Event | Notes |
|------|-------|-------|
| 17:30 Mon | James begins cross-referencing 2,847 accessed customer IDs against PII database to identify affected individuals | Building the impact assessment |
| 19:30 Mon | James notes some recognisable names during cross-referencing — adds sensitivity warning to report | Increases urgency |
| 21:00 Mon | James completes draft Customer Impact Assessment — 2,847 customers identified by name with exposure details | Detailed, methodical work |
| 22:00 Mon | Alex Anderson arrives for night shift. James briefs Alex on the incident and hands off monitoring. | James has been working since ~09:00 — roughly 13 hours |
| 21:30 Mon | Sandra (legitimate) VPNs in from home (121.44.88.15, TPG residential, Adelaide). Checks emails and Incident Cost Tracker on finance dashboard. | CFO checking in during active incident — perfectly normal behaviour |
| 20:45 Mon | David Whitmore (CEO) VPNs in from home. Quick email check (19m). Karen Lee (General Counsel) also checks in at 21:12 (15m). | C-suite checking in during active incident — adds to VPN noise |
| 22:00 Mon | **[ATTACKER]** Using Sandra's account, logs in via Adelaide-based VPN (103.2.117.8, Superloop) to verify they still have access. Browses inbox without reading anything, logs out after 4 minutes. **Sandra's legitimate session is still active from home.** | No file uploads, no calling card. Just an access check. Attacker uses Adelaide VPN to blend in geographically. Detection clues: different IP, SMS MFA (vs Authenticator App), unknown device, concurrent session. Buried in C-suite VPN noise from David, Karen, Marcus, Priya, Rachel, and Sandra herself. |
| 22:30 Mon | James finalises report, marks CONFIDENTIAL — IR USE ONLY, uploads to SOC shared drive with restricted access. Sends handoff email to Priya. | **This is the document the Sandra Trap targets** |
| ~23:00 Mon | James goes home. Available by phone for urgent questions. | Worked ~14 hours (09:00–23:00). Will start late Tuesday as a result. |

### Monday Night / Tuesday Early Hours — Alex Anderson on Watch

| Time | Event | Notes |
|------|-------|-------|
| 22:04–22:08 Mon | **[ATTACKER]** Sandra's account logs in from 103.2.117.8 (Adelaide, Superloop — commercial VPN) via SMS MFA. Browses inbox (reads nothing), logs out after 4 minutes. **Sandra's legitimate session from home VPN (10.1.100.20) is still active.** | CONCURRENT SESSIONS: Both IPs are Adelaide, so not a geo impossibility. Detection clues: different IP, SMS MFA (enrolled device uses Authenticator App), unknown device, brief session with no meaningful activity. Subtle — requires investigation to spot. |
| 22:47 Mon | Sandra (legitimate) logs out and disconnects VPN. Goes to bed. | Session duration: 1h 15m |
| 01:00 Tue | **[ATTACKER]** Using Sandra's account, performs reconnaissance on PII database access controls — testing whether CFO credentials can access it directly | Sandra's credentials lack direct PII DB access. Attacker queries PII-Database-Access group — discovers svc_backup_admin (which they created) has DB admin rights. |
| 06:03 Tue | **[ATTACKER]** right_0ff sends ultimatum email to CEO via Marcus | Demands public disclosure within 48 hours |
| 06:05 Tue | **[ATTACKER]** Using svc_backup_admin, creates scheduled task on DB-PROD-01 to export PII vault to external S3 bucket (s3://xyzpay-db-dr-replica-au/vault-export) | Named "system_maintenance_daily", scheduled for daily 17:00. Timed to coincide with backup completion noise at 06:00. The 17:00 execution time matches the ultimatum's implicit deadline. **Task has not yet executed** — students can prevent it. |

### Tuesday Morning — Pre-Session 2

| Time | Event | Notes |
|------|-------|-------|
| 06:03 Tue | right_0ff ultimatum email arrives in Marcus's inbox (sent from external infrastructure) | Demands public disclosure, late fee refund, and debt write-off within 48 hours |
| 06:30 Tue | Marcus reads ultimatum. Immediately calls David Whitmore (CEO). | CEO now fully engaged |
| 07:00 Tue | Marcus calls Priya: "Get the team in early, this just escalated significantly" | Sets up Session 2 opening |
| 07:30 Tue | Priya prepares overnight briefing document for incoming SOC team | Summarises Monday's findings and outstanding items |
| 07:45 Tue | David Chen reads Monday's security advisory and realises he was vished on Saturday — begins composing service ticket | First of the "coming forward" wave |
| 08:00 Tue | **Session 2 begins.** James Okoro is not yet in — starting late after Monday overtime. | Alex Anderson provides handover to incoming SOC team before going off-shift. |

### What Was Done vs. What Was Missed

**Contained:**
- Liam's account disabled, password and MFA revoked
- Known attacker IP blocked at firewall
- Data access scope identified (2,847 transaction records, no PII)
- Affected customers identified by name (impact assessment)
- Company-wide security advisory issued

**Not yet discovered (and why):**
- **Sandra's account is compromised** — investigation followed the Liam thread only. Sandra's CFO-level access patterns don't trigger anomaly alerts. The attacker used an Adelaide-based VPN to blend in geographically. **However**, if students investigate Sandra's after-hours VPN alert, they will discover concurrent sessions from different IPs (same city, different ISPs) with mismatched MFA methods, an unknown device, and a suspiciously brief session — the primary detection clue, though subtler than a foreign IP.
- **svc_backup_admin backdoor account** — created 3 days ago with a plausible name. No automated alerting on service account creation (common gap). James was focused on data access, not account auditing.
- **Scheduled exfiltration task** — created at 06:05 Tuesday during the backup completion window. Named "system_maintenance_daily" and scheduled for 17:00 daily. Has **not yet executed** — students can prevent the PII vault export if they find and disable it in time.
- **right_0ff has not left a calling card on internal systems** — the ultimatum email to the CEO (sent 06:03 Tuesday) is their declaration. The attacker's Monday night session via Sandra's account was just an access check, not a calling card drop.
- **Anika's failed vishing attempt connects to Liam's compromise** — Anika's Sunday ticket (TKT-4471) is visible from Session 1 start and shows the attackers targeted multiple employees. Students who connect Anika's report to Liam's "weird call" can identify a vishing campaign pattern — but the urgency of the credential stuffing noise may cause them to overlook it.
- **David Chen and Nadia Khoury are also compromised** — they don't know it yet. They come forward on Tuesday after reading the security advisory. Their accounts have anomalous logins from attacker infrastructure but no further activity — deliberate decoys/reserves by right_0ff.
- **The vishing campaign is broader than it appears** — the Monday response focused on Liam's thread. Nobody has yet connected Anika's Sunday report, Liam's Monday compromise, and the as-yet-unreported David and Nadia compromises into a single coordinated campaign.
- **The attacker is still inside the network** — blocking Liam's account and one IP closed one door, but Sandra's credentials and the backdoor account remain active. David and Nadia's credentials also remain live (unused but available as fallback).

### Session 2 Timeline ("Exposure") — Tuesday

*In-story times on left. Approximate session clock (mm:ss) on right.*

| In-Story | Session Clock | Event | Visible to Students? |
|----------|--------------|-------|---------------------|
| 08:00 | 00:00 | Students begin shift; receive Priya's overnight briefing and James's Customer Impact Assessment (CONFIDENTIAL). SIEM dashboard shows ~20 overnight alerts to triage. | Yes (starting artefacts) |
| 08:00 | 00:00 | David Chen and Nadia Khoury vishing tickets already in queue (came forward after reading Monday advisory) | Yes (ticket queue) — **first signs of broader vishing campaign** |
| 08:03 | ~03:00 | Tom Bradshaw submits ticket about MFA re-enrollment on new phone — legitimate, but looks suspicious in context | Yes (ticket queue, delayed) — **noise that looks like signal** |
| 08:30 | ~15:00 | Sandra's compromised account emails SOC requesting the Customer Impact Assessment "for the CEO's emergency board call" | Yes (email) — **Sandra Trap** |
| — | 03:00–30:00 | **Investigation phase**: Students spend tokens to dig into alerts, AD logs, network traffic, vishing reports (David, Nadia). Key discoveries available: svc_backup_admin account, Sandra's anomalous logins, scheduled PII vault export (set for 17:00 — hasn't run yet), breadth of vishing campaign (4 compromised accounts, 1 failed). David and Nadia's accounts are dead ends but reveal campaign scale. Tom's MFA re-enrollment is noise. | Discoverable through investigation |
| 09:30 | ~30:00 | Marcus forwards right_0ff ultimatum to SOC: "I need you to understand what they actually have" | Yes (critical reveal) |
| 09:35 | ~37:00 | Journalist inquiry from *The Guardian* forwarded to SOC by PR: "They're asking for comment by 5pm today" | Yes (forwarded email) |
| 09:45 | ~40:00 | Scheduled exfiltration task discovered — "system_maintenance_daily" set to run at 17:00 today, **has not yet executed**. Students can prevent the PII vault export if they disable it in time. | Yes (critical discovery, or earlier if students investigate scheduled tasks) |
| 09:50 | ~45:00 | **THE RECOMMENDATION**: Marcus messages SOC: "I'm going into an emergency board meeting in 10 minutes. The CEO wants to know: what do they have, is it still happening, and what should we do first? What do I tell them?" | Yes (decision moment) |
| 10:00 | ~50:00 | Students present their recommendation to Marcus (via Priya) | Yes (team decision) |
| 10:05 | ~52:00 | Consequence card delivered based on recommendation + Sandra Trap outcome | Yes (path-dependent) |
| 10:15 | ~55:00 | 48-hour aftermath revealed | Yes (finale) |
| 10:30 | ~60:00 | Session ends; students submit final incident report | — |

---

## Part 5: Session 2 Branching — The Triage Triangle

Session 2's narrative arc builds to a single high-stakes decision point where three crises converge simultaneously and students must choose where to focus their limited remaining resources. The quality of this decision is influenced by a trust verification test earlier in the session.

### The Sandra Trap (Soft Gate)

At Session 2 opening, students receive a **Customer Impact Assessment** prepared overnight by James Okoro. James cross-referenced the 2,847 transaction records accessed via Liam's account against XYZ's PII database to identify affected customers by name. This document — marked **CONFIDENTIAL — IR USE ONLY, do not distribute without CISO approval** — is the only artefact that links the anonymised transaction data to real people.

**Why the data is separated**: XYZ's transaction database stores purchase histories, late fees, and debt amounts using internal customer IDs — no names, no contact details. The PII database (names, emails, phone numbers, addresses) is stored separately with stricter access controls. This is standard practice in financial services under PCI DSS. Liam's Customer Support credentials gave the attacker access to transaction data, but not the PII vault.

**The Trap**: At the session's midpoint, Sandra Leigh's compromised account emails the SOC:

> *"I need the Customer Impact Assessment urgently. The CEO wants the full list with names before the emergency board call at 2pm. Send it to me directly — we need to move fast on this."*

**Why the attacker wants it**: right_0ff has embarrassing transaction data (late fees, debt amounts, hardship request denials) but cannot tie it to named individuals. The impact assessment is the missing piece. Without it, right_0ff can publish aggregate statistics about XYZ's practices. With it, they can name individual customers, contact them directly, and publish a searchable database — turning a data access incident into a catastrophic personal data breach.

| Student Response | Consequence |
|---|---|
| **Share the file** | The attacker obtains PII for 2,847 customers. Does not change the Triage Triangle decision, but **significantly worsens the consequences on every path** (see Sandra Trap Escalation below). |
| **Verify Sandra first** | Discovers the compromise (anomalous login, calendar conflict, tone mismatch, handling restriction violation). The file remains secure. Students arrive at the Triage Triangle better informed and with the PII protected. |
| **Refuse without verifying** | Correct instinct, file stays safe — but the team can't explain *why* they refused a CFO's direct request. Debrief discussion point about process vs. intuition vs. protocol. |

**Detection opportunities** (students may notice any of these):
- The impact assessment is marked "do not distribute without CISO approval" — Sandra is bypassing protocol
- Sandra is requesting it via email rather than through the IR channel
- Login logs show her account accessed from 103.2.117.8 (Superloop) — an Adelaide commercial ISP that appears clean, making this much harder to spot than an obvious foreign VPN
- Her calendar shows she's in a board meeting — so who's sending emails?
- James shared the assessment only with the SOC team — how does Sandra know it exists?
- The right_0ff ultimatum (revealed later) taunts: *"Tell Sandra we said thanks for the access"*

### The Decision Point (Hard Branch)

At the ~45-minute mark, Marcus messages the SOC: *"I'm going into an emergency board meeting in 10 minutes. The CEO wants to know: what do they have, is it still happening, and what should we do first? What do I tell them?"*

By this point, students are aware of three concurrent crises:

1. **Technical crisis**: The attacker is still inside the network. A scheduled task is set to export the PII vault to attacker-controlled infrastructure at 17:00 today — it hasn't run yet, but the clock is ticking. Sandra's account and the svc_backup_admin backdoor remain active.
2. **Regulatory crisis**: Customer data has been accessed. The Notifiable Data Breaches scheme requires prompt notification. Forensic evidence needs preservation for law enforcement. Chain of custody matters.
3. **Reputational crisis**: A journalist is asking for comment by 5pm today. right_0ff has tipped off the media. The CEO and board are about to learn the full scope.

Students must synthesise everything they've discovered and **recommend a priority to Marcus** — the recommendation he carries into the board meeting. They cannot do all three well with the time and resources available. This is the SOC's role: providing the intelligence and recommendation that shapes the executive decision.

### Path A: "CONTAIN FIRST" — Stop the Attacker

**What students tell Marcus**: *"Tell the board we can stop the bleeding, but we need all hands on technical containment right now. The journalist and the regulator will have to wait."*

**SOC focus**: Disable compromised accounts, kill the scheduled exfiltration task before 17:00, isolate affected systems, eliminate backdoor access.

**What is protected**: Customer data. The scheduled task is killed before its first execution at 17:00. PII vault never leaves the network. Attacker access eliminated.

**What is sacrificed**: No public statement prepared — journalist publishes "sources say data breach at XYZ Pay." No regulatory notification — compliance risk under the NDB scheme. Board is briefed on the threat but given no communications plan.

**48-Hour Aftermath**:
> Customer data is secured. Zero records exfiltrated. But headlines read *"XYZ Pay silent on alleged data breach."* The Privacy Commissioner opens an investigation into late notification. Series C investors request an emergency board call. Internally, the board praises the SOC's technical response but demands to know why nobody told them what was happening.

### Path B: "PRESERVE AND NOTIFY" — Protect the Evidence

**What students tell Marcus**: *"Tell the board we need to preserve evidence and notify the regulator immediately. Containment continues but the priority is building a defensible legal position."*

**SOC focus**: Forensic evidence capture, chain of custody documentation, regulatory notification under the Notifiable Data Breaches scheme, coordination with legal.

**What is protected**: Legal and regulatory standing. Forensic evidence leads to identification of right_0ff members. Notification timeline is defensible.

**What is sacrificed**: Attacker retains partial access during evidence preservation. The 17:00 scheduled task executes during the preservation window, exporting the PII vault. Journalist publishes without XYZ's side of the story.

**48-Hour Aftermath**:
> The Privacy Commissioner commends XYZ for prompt, thorough notification. Forensic evidence is shared with the AFP, leading to identification of two right_0ff members. But the 17:00 scheduled task executed during the preservation window — the PII vault (names, addresses, financial details) is now in attacker hands. Class action lawyers are circling. The CEO asks: *"Why didn't we just pull the plug?"*

### Path C: "GET AHEAD OF IT" — Control the Narrative

**What students tell Marcus**: *"Tell the board they need to get ahead of this publicly. The journalist publishes today regardless — we need a statement and a customer notification plan before that happens."*

**SOC focus**: Provide Marcus with full scope details for the board, help draft factual basis for public statement, prepare customer impact data for notification, support PR/legal coordination.

**What is protected**: Public narrative. XYZ's proactive transparency is initially praised. Executive team is aligned and prepared. Customer notification is professional and empathetic.

**What is sacrificed**: Technical containment is delayed. The 17:00 scheduled task executes — PII vault exported to attacker infrastructure. Attacker retains access longer. Evidence potentially corrupted by ongoing attacker activity.

**48-Hour Aftermath**:
> XYZ's proactive media statement is initially praised as *"refreshingly transparent."* But the 17:00 scheduled task executed while the team focused on comms — the PII vault (names, addresses, financial details) is now in attacker hands. right_0ff releases the data the next morning. The "transparent" statement now looks incomplete — XYZ said *"we are containing the incident"* while the attacker was still inside. Customers ask: *"You knew and didn't stop it?"* The narrative flips from "responsible disclosure" to "negligent response."

### Sandra Trap Escalation

If students shared the Customer Impact Assessment with "Sandra," the attacker obtains the PII mapping for 2,847 customers. The Triage Triangle decision remains the same three pathways, but the consequences on every path are significantly amplified:

| Path | Base Outcome (PII protected) | Escalated Outcome (PII shared with attacker) |
|---|---|---|
| **A: Contain** | Task killed before 17:00. PII vault protected. Headlines reference "anonymous data access" at XYZ Pay. | PII vault protected — but right_0ff publishes 2,847 named customer records with contact details from the impact assessment. Affected customers receive taunting emails from right_0ff. Class action filed within 48 hours. |
| **B: Preserve & Comply** | PII vault exported at 17:00 during preservation window. Strong forensic and regulatory position. | PII vault exported PLUS 2,847 named customers published with full contact details from the impact assessment. right_0ff emails affected customers directly: *"XYZ knew your data was accessed and didn't tell you."* |
| **C: Communicate** | PII vault exported at 17:00 while team focused on comms. PR statement says "no customer PII was compromised." | PII vault exported PLUS 2,847 named records published with a searchable "look up your exposure" site. XYZ's PR statement — *"no personal information was compromised"* — is publicly proven false. |

The escalation demonstrates that **data handling decisions during an incident carry their own consequences**, independent of the strategic response chosen. Protecting sensitive artefacts is as critical as the broader IR strategy.

### The Lesson

In real incident response, **containment, compliance, and communication must run in parallel**. The exercise forces an impossible choice to demonstrate:

- Why incident response requires **coordinated teams** (the ICS/NIMS model)
- Why organisations need an **Incident Response Plan** *before* the crisis hits
- That **every choice has trade-offs** — there is no universally "right" answer
- That **earlier investigation quality cascades** into decision quality — teams who fell for the Sandra Trap arrive here disadvantaged

The debrief should explore: *"What would it take to do all three simultaneously?"* — leading to discussion of IR team structures, pre-planned playbooks, and the importance of organisational preparedness.

---

## Part 6: Red Herrings & False Leads

To create realistic noise and reward careful analysis, the exercise includes deliberate false leads:

### False Lead 1: The Marketing Email
**What it looks like**: An employee reports a "phishing email" that's actually legitimate marketing from a partner company.
**Purpose**: Tests whether students verify before acting; wastes tokens if they over-investigate.

### False Lead 2: The Credential Stuffing "Attack"
**What it looks like**: Hundreds of failed login attempts against the customer portal.
**Reality**: This is real but *unrelated* to right_0ff—it's background noise from automated botnets using leaked credential lists.
**Purpose**: Creates noise; students must distinguish between opportunistic attacks and the targeted campaign.

### False Lead 3: The Disgruntled Employee Rumour
**What it looks like**: A chat log snippet mentions that "someone in Finance is unhappy and might be looking for a new job."
**Reality**: Just office gossip; the employee (Anika) was targeted by attackers but *resisted* the vishing attempt — she is neither a victim nor an insider threat.
**Purpose**: Tests whether students jump to conclusions about insider threats without evidence.

---

## Part 7: Key Artefacts (Overview)

Detailed artefact content will be developed separately. This section lists what students will receive.

### Session 1 Artefacts
- Alex Anderson's overnight handover notes (mentions Anika's suspicious call report)
- SIEM alert dashboard (overnight credential stuffing alerts as background noise)
- Service ticket from Anika Patel (TKT-4471, submitted Sunday — suspicious call report)
- Service ticket from Liam Fitzgerald (TKT-4472, appears at ~6 min — "weird call from IT")
- Threat intelligence brief on credential stuffing trends
- Employee directory / personnel lookup (for context)
- SOC playbook excerpt (triage procedures)
- *Mid-session*: SIEM alert M-2489 — unusual login for Liam from Indonesia (~24 min)
- *End-of-session*: **CRITICAL** SIEM alert H-0012 — 2,847 records accessed via Liam's account (~55 min, cliffhanger)

### Session 2 Artefacts

**Starting artefacts (free)**:
- Overnight incident summary briefing (from Priya)
- SIEM dashboard with ~20 overnight alerts (credential stuffing, after-hours VPN, scheduled task, maintenance noise)
- Customer Impact Assessment from James Okoro (CONFIDENTIAL — IR USE ONLY)
- Service ticket from David Chen — "I think I messed up" (vishing victim, account compromised but unused)
- Comms message from Nadia Khoury — "Did I do something wrong?" (vishing victim, account compromised but unused)
- MFA reset ticket from Tom Bradshaw — legitimate phone swap, not a compromise (noise)

**Investigable SIEM alerts (token cost + time)**:
- After-hours VPN: Marcus Chen (1 token, ~6s delay + log handoff + 5 min) — Priya asks for logs, player sends via canned response, confirmed legitimate
- After-hours VPN: Priya Sharma (1 token, ~10s delay + log handoff + 5 min) — Marcus reviews (can't self-review), confirmed legitimate
- After-hours VPN: Rachel Torres (1 token, ~7s delay + log handoff + 5 min) — Priya asks for logs, confirmed legitimate
- After-hours VPN: Sandra Leigh (1 token, ~8s delay + log handoff + 5 min) — Priya asks for logs, player sends via canned response, **reveals concurrent sessions** (two Adelaide IPs, mismatched MFA + unknown device) — primary Sandra compromise detection path
- New scheduled task: DB-PROD-01 (2 tokens, then ~10s delay + log handoff + 10 min investigation) — Rachel asks for logs, player sends them via canned response, Rachel investigates cautiously. After 10 min: **reveals PII vault exfiltration task**; Rachel's team deactivates svc_backup_admin account and suspends the task. Sets precedent for staff requesting files from the SOC.

**Other unlockable artefacts (token cost)**:
- Active Directory change logs — reveals svc_backup_admin backdoor account created by Sandra's compromised credentials
- Anika Patel detailed interview — reveals the vishing call details; her suspicion prevented compromise, confirming the attackers targeted multiple employees

**Timed/triggered artefacts**:
- *Mid-session*: Email from "Sandra" requesting Customer Impact Assessment — the Sandra Trap
- *Late-session*: right_0ff ultimatum email (forwarded from Marcus)
- *Late-session*: Journalist inquiry email (forwarded from PR)

**Path-specific artefacts (one set per branch, with Sandra Trap variant)**:
- Path A (Contain): Technical containment consequence card + 48-hour aftermath (base or escalated)
- Path B (Preserve & Comply): Compliance consequence card + 48-hour aftermath (base or escalated)
- Path C (Communicate): Communications consequence card + 48-hour aftermath (base or escalated)

---

## Part 8: Thematic Questions

These are the underlying questions the exercise is designed to surface in student discussions:

1. **How do you find signal in noise?** (Session 1)
2. **When do you act on incomplete information?** (Sessions 1–2)
3. **What's the cost of containment vs. the cost of inaction?** (Session 2)
4. **How do you verify trust when authority is compromised?** (Session 2 — Sandra Trap)
5. **How do you communicate uncertainty to leadership?** (Both sessions)
6. **When you can't do everything, what do you prioritise — and what do you accept losing?** (Session 2 — Triage Triangle)

---

## Appendix: Glossary of Key Terms

| Term | Definition |
|------|------------|
| **SIEM** | Security Information and Event Management—a system that collects and analyses security logs from across the organisation |
| **SOC** | Security Operations Centre—the team that monitors for and responds to security incidents |
| **Credential stuffing** | An attack where stolen username/password pairs from other breaches are tried against a target system |
| **Vishing** | Voice phishing—social engineering conducted over phone calls |
| **MFA** | Multi-Factor Authentication—requiring a second verification (like a phone code) beyond just a password |
| **IOC** | Indicator of Compromise—evidence that an attack has occurred (e.g., malicious IP addresses, file hashes) |
| **C2 / C&C** | Command and Control—infrastructure attackers use to communicate with compromised systems |
| **Exfiltration** | Stealing data by copying it out of the organisation |
| **Lateral movement** | When an attacker moves from one compromised system to others within the network |
| **NIST CSF** | National Institute of Standards and Technology Cybersecurity Framework—a widely-used framework for organising security activities into functions: Identify, Protect, Detect, Respond, Recover |
| **NDB Scheme** | Notifiable Data Breaches scheme—Australian law requiring organisations to notify the Privacy Commissioner and affected individuals of eligible data breaches |
| **ICS/NIMS** | Incident Command System / National Incident Management System—a structured approach to incident management using defined roles and coordination across workstreams |
| **AFP** | Australian Federal Police—law enforcement agency that investigates cybercrime |

---

*Document version: 0.2 (Revised for two-session structure)*
*Last updated: January 2025*
