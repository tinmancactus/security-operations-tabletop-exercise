# Operation Glasshouse: Story Bible

> **Document Purpose**: This is the master narrative reference for the tabletop exercise. It contains information that students will *discover* through gameplay—do not share this document with participants.

---

## Executive Summary

**Operation Glasshouse** is a three-session tabletop exercise where students role-play as SOC Analysts responding to an escalating cyberattack against a fictional Australian fintech company. The attack is perpetrated by hacktivists who oppose the "Buy Now, Pay Later" industry and combines social engineering, credential theft, and insider manipulation.

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

**Narrative Role**: Priya is the students' direct manager. She provides guidance when escalated to, but pushes back if students escalate without justification. Her responses (via envelope reveals) will vary based on the quality of information students provide.

---

#### James Okoro — Senior Incident Response Analyst (Tier 3)
| Attribute | Detail |
|-----------|--------|
| **Role** | Lead IR Analyst / Forensics Specialist |
| **Reports To** | Priya Sharma |
| **Personality** | Intense, technically brilliant, impatient with sloppy analysis |
| **Contact Protocol** | Escalate high-confidence active incidents |

**Background**: James is the only Tier 3 analyst. He handles forensics, malware analysis, and leads major incident responses. He's overworked and can be brusque, but he's the best technical resource available.

**Narrative Role**: James is the "expert witness"—when students escalate correctly, his analysis (via envelopes) provides crucial insights. If students escalate prematurely, his responses are curt and unhelpful.

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

#### Liam Fitzgerald — Customer Support Lead
| Attribute | Detail |
|-----------|--------|
| **Role** | Customer Support Team Lead |
| **Relevance** | First social engineering victim |

**What Happened**: Liam received a call from "IT Support" (actually the attackers) asking him to "verify his identity" by reading back an MFA code sent to his phone. He complied, thinking it was routine.

**How Students Encounter Him**: Via a service ticket where he mentions a "weird call from IT" but downplays it ("they said they'd never ask for my password, so it seemed legit").

**Key Quote** (in service ticket follow-up):
> "The IT guy was really professional. He even said 'we'll never ask for your password' which made me trust him more. I just read him the code from my phone—is that bad?"

---

#### Anika Patel — Finance Analyst
| Attribute | Detail |
|-----------|--------|
| **Role** | Finance Team Analyst |
| **Relevance** | Second social engineering victim; reports to Sandra |

**What Happened**: Anika received a similar vishing call. She was more suspicious but ultimately complied because the caller "knew details about the finance system."

**How Students Encounter Her**: She submits a worried service ticket in Session 2 after hearing about "security issues."

**Key Quote** (in service ticket):
> "I'm probably being paranoid, but I got a call last week from someone claiming to be IT. They knew I use the finance portal and asked me to confirm a code. Sandra told me IT does that sometimes for audits, so I didn't think much of it. Should I be worried?"

*(Note: Sandra's "reassurance" is either a lie by the attacker using Sandra's account, or Sandra genuinely gave bad advice before being compromised—either interpretation works.)*

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
| 3 weeks ago | ClearDebt identifies XYZ as target after consumer advocacy report |
| 2 weeks ago | Attackers scrape LinkedIn for XYZ employee names and roles |
| 10 days ago | Attackers obtain XYZ employee phone numbers via social engineering (calling reception) |
| 8 days ago | First vishing calls begin; Liam Fitzgerald compromised |
| 6 days ago | Anika Patel compromised |
| 5 days ago | Sandra Leigh compromised (highest-value target) |
| 4 days ago | Attackers use Sandra's access to explore internal systems |
| 3 days ago | Attackers create backdoor admin account ("svc_backup_admin") |
| 2 days ago | Attackers begin querying customer database |
| 1 day ago | Attackers exfiltrate sample customer data |
| Today | **Session 1 begins** |

### Session 1 Timeline ("Static")

| Time | Event | Visible to Students? |
|------|-------|---------------------|
| 08:00 | Credential stuffing attack begins against customer portal | Yes (SIEM alerts) |
| 08:15 | Liam Fitzgerald submits service ticket about "weird IT call" | Yes (ticket queue) |
| 09:30 | Attackers (using Liam's creds) access internal HR portal | Discoverable if investigated |
| 10:45 | Attackers pivot to Sandra's account | Not yet visible |
| 11:30 | Successful login to admin tool from anomalous IP | Yes (end-of-session alert) |

### Session 2 Timeline ("Foothold")

| Time | Event | Visible to Students? |
|------|-------|---------------------|
| 08:00 | Students return; compromised account has accessed customer DB | Yes (SIEM alert) |
| 08:30 | Anika Patel submits worried service ticket | Yes (ticket queue) |
| 09:00 | Attackers create new admin account | Discoverable via AD logs |
| 09:30 | Sandra's account sends email to SOC: "Stand down, I'm handling this" | Yes (email artefact) |
| 10:00 | ClearDebt calling card discovered on file share | Yes (mid-session reveal) |
| 10:30 | Data exfiltration to external cloud storage | Discoverable via network logs |
| 11:00 | Ransom/ultimatum email sent to CISO | Yes (end-of-session reveal) |
| 11:00 | Backup failure alert | Yes (end-of-session reveal) |

### Session 3 Timeline ("Exposure")

| Time | Event | Visible to Students? |
|------|-------|---------------------|
| 08:00 | 48-hour deadline approaching; leadership decides not to negotiate | Yes (briefing) |
| 08:30 | Journalist emails company about breach tip | Yes (forwarded email) |
| 09:00 | Students discover scheduled task "time bomb" | Yes (mid-session) |
| 09:30 | Sandra's account sends another misdirecting email | Yes (test of student vigilance) |
| 10:30 | Branch point: sandbox vs. kill decision | Yes (decision moment) |
| 11:00 | Session ends; students submit final report | — |

---

## Part 5: Red Herrings & False Leads

To create realistic noise and reward careful analysis, the exercise includes deliberate false leads:

### False Lead 1: The Marketing Email
**What it looks like**: An employee reports a "phishing email" that's actually legitimate marketing from a partner company.
**Purpose**: Tests whether students verify before acting; wastes tokens if they over-investigate.

### False Lead 2: The Credential Stuffing "Attack"
**What it looks like**: Hundreds of failed login attempts against the customer portal.
**Reality**: This is real but *unrelated* to ClearDebt—it's background noise from automated botnets using leaked credential lists.
**Purpose**: Creates noise; students must distinguish between opportunistic attacks and the targeted campaign.

### False Lead 3: The Disgruntled Employee Rumour
**What it looks like**: A chat log snippet mentions that "someone in Finance is unhappy and might be looking for a new job."
**Reality**: Just office gossip; the employee (Anika) is a victim, not an insider threat.
**Purpose**: Tests whether students jump to conclusions about insider threats without evidence.

---

## Part 6: Key Artefacts (Overview)

Detailed artefact content will be developed separately. This section lists what students will receive.

### Session 1 Artefacts
- SIEM alert dashboard (credential stuffing alerts)
- Service ticket from Liam Fitzgerald
- Threat intelligence brief on credential stuffing trends
- Employee directory (for context)
- SOC playbook excerpt (triage procedures)
- *End-of-session*: Anomalous login alert

### Session 2 Artefacts
- Updated SIEM dashboard (customer DB access)
- Service ticket from Anika Patel
- Active Directory change logs (if requested)
- Network traffic summary (if requested)
- Email from Sandra Leigh (compromised)
- *Mid-session*: ClearDebt calling card
- *End-of-session*: Ultimatum email, backup failure alert

### Session 3 Artefacts
- Leadership decision briefing
- Journalist inquiry email
- Scheduled task details
- Second Sandra email (misdirection)
- Recovery planning checklist
- NIST CSF mapping template

---

## Part 7: Thematic Questions

These are the underlying questions the exercise is designed to surface in student discussions:

1. **How do you find signal in noise?** (Session 1)
2. **When do you act on incomplete information?** (Session 1-2)
3. **What's the cost of containment vs. the cost of inaction?** (Session 2)
4. **How do you verify trust when authority is compromised?** (Session 2-3)
5. **How do you communicate uncertainty to leadership?** (All sessions)
6. **What does "good enough" look like in a crisis?** (Session 3)

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

---

*Document version: 0.1 (Draft)*
*Last updated: November 2025*
