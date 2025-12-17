export default [
  {
    id: 'EV-5',
    title: 'Liam Interview',
    category: 'Interview',
    content: `EMPLOYEE INTERVIEW: LIAM FITZGERALD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interview conducted: Monday, 14 October 2024
Method: Phone call to Customer Support desk

SOC: "Hi Liam, following up on your ticket about a weird 
      call from IT. Can you tell us more?"

LIAM: "Oh yeah. I got a call this morning—maybe quarter to 8? 
       The guy said he was from IT support doing a security 
       audit. He was really professional, knew my name and 
       everything."

SOC: "What did he ask you to do?"

LIAM: "He said he needed to verify my identity for the audit. 
       Asked me to read out a code that would be sent to my 
       phone. I got a text with a 6-digit code and read it 
       to him."

SOC: "Did he ask for your password?"

LIAM: "No, that's why I thought it was legit. He even said 
       'we'll never ask for your password'—which is what IT 
       always says, right? So I figured it was fine."

SOC: "Did anything else happen after?"

LIAM: "No, he just said thanks and hung up. Should I be 
       worried? Did I do something wrong?"

───────────────────────────────────────────────────────
ANALYST NOTES:
Pattern consistent with MFA bypass via social engineering. 
Attacker likely had Liam's password already and used vishing 
to obtain MFA code.`
  },
  {
    id: 'EV-6',
    title: 'Jenny Email Analysis',
    category: 'Email Analysis',
    content: `EMAIL ANALYSIS: JENNY MARCOS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analysis conducted: Monday, 14 October 2024

EMAIL HEADERS:
From: noreply@retailmetrics.com.au
Reply-To: support@retailmetrics.com.au
SPF: PASS    DKIM: PASS    DMARC: PASS

LINK ANALYSIS:
URL: https://app.retailmetrics.com.au/verify?token=...
Domain registered: 2019
SSL Certificate: Valid, DigiCert
VirusTotal: 0/87 detections
URLScan: Clean, legitimate retail analytics SaaS

BUSINESS CONTEXT:
RetailMetrics is a legitimate analytics vendor. Cross-check 
with Procurement confirms XYZ has active contract (signed 
6 months ago by Marketing team).

───────────────────────────────────────────────────────
VERDICT: FALSE POSITIVE

Legitimate email from contracted vendor. Jenny likely forgot 
she signed up during onboarding.`
  },
  {
    id: 'EV-7',
    title: 'Authentication Log Analysis',
    category: 'Log Analysis',
    content: `AUTHENTICATION LOG ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analysis period: 12-14 October 2024
Systems: customer-portal, internal-sso, admin-console

CREDENTIAL STUFFING PATTERN (customer-portal):
• 1,882 failed attempts from 3 IPs (known Tor exit nodes)
• Targeting random usernames from leaked list
• 0 successful authentications
• Pattern: Automated, indiscriminate, opportunistic
• ASSESSMENT: Background noise, no immediate threat

───────────────────────────────────────────────────────

⚠️  ANOMALY DETECTED (internal-sso):

• Monday, 14 October 2024, 07:52 ACDT
• User: liam.fitzgerald@xyzpay.com.au
• Event: Successful MFA authentication
• Source IP: 103.42.91.17
• Location: VPN endpoint (Indonesia)
• Device: Unknown (not in asset inventory)

• Liam's usual pattern: Adelaide, corporate laptop
• This login: Foreign IP, unknown device, early morning

───────────────────────────────────────────────────────
ASSESSMENT: Suspicious. Possible account compromise.
Does NOT match credential stuffing pattern.`
  },
  {
    id: 'EV-8',
    title: 'Threat Intelligence Brief',
    category: 'Threat Intel',
    content: `THREAT INTELLIGENCE BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Query: Credential stuffing, BNPL sector, October 2024
Source: XYZ Threat Intel Database

CURRENT THREAT LANDSCAPE:
• Credential stuffing against AU fintech up 34% in Q3 2024
• Primary driver: Large credential dumps circulating
• Most attacks opportunistic (automated botnets)
• BNPL sector targeted due to high account values

KNOWN THREAT ACTORS:
• No specific APT groups targeting AU BNPL currently
• Hacktivist group "right_0ff" has targeted financial 
  services with ideological motivation (anti-predatory 
  lending). Primarily uses social engineering.
• Ransomware groups occasionally target fintech but prefer 
  larger enterprises

───────────────────────────────────────────────────────
RELEVANCE:
Credential stuffing in alerts M-2471 to M-2473 matches known 
botnet activity. Likely opportunistic. However, remain 
vigilant for targeted attacks using different vectors 
(phishing, vishing).`
  },
  {
    id: 'EV-9',
    title: 'Liam Account Activity',
    category: 'Log Analysis',
    content: `USER ACTIVITY: LIAM.FITZGERALD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Period: Monday 14 October 2024, 07:52-08:30 ACDT
Source: Internal SSO + Application Logs

07:52 — SSO Login (MFA success) from 103.42.91.17
07:54 — Accessed: Employee Directory
07:56 — Accessed: Internal Wiki (searched: "org chart")
08:01 — Accessed: HR Portal (viewed own profile)
08:09 — Accessed: Finance Team contact list
08:15 — Accessed: IT Support documentation
08:22 — Accessed: Executive Assistant contact details
08:28 — Accessed: Customer Database (query executed)
08:30 — Session ongoing...

───────────────────────────────────────────────────────
ANALYSIS:
Activity suggests reconnaissance—browsing directories and 
contact info rather than normal Customer Support tasks.

⚠️  Customer database access at 08:28 is HIGHLY UNUSUAL 
for a Customer Support role. Liam does not have business 
need for direct database queries.

ASSESSMENT: Likely attacker performing internal recon 
after gaining access via compromised credentials. Session 
still active - immediate action recommended.`
  },
  {
    id: 'EV-10',
    title: 'Anika Interview',
    category: 'Interview',
    content: `EMPLOYEE INTERVIEW: ANIKA PATEL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Interview conducted: Monday, 14 October 2024
Method: Quick phone call to Finance

SOC: "Hi Anika, following up on your ticket about the 
      suspicious call on Sunday. Can you tell us more?"

ANIKA: "Sure. I got a call on my work phone around 10am 
        Sunday. I don't usually work weekends so I thought 
        it must be urgent."

SOC: "What did the caller say?"

ANIKA: "He said he was from IT Support and there was an 
        issue with my account. Asked me to verify my identity 
        by reading a code that would be sent to my phone."

SOC: "What made you suspicious?"

ANIKA: "A few things. First, I thought it was odd that IT 
        would be working on a Sunday. Second, we had that 
        security training last month about exactly this kind 
        of thing."

SOC: "What did you do?"

ANIKA: "I said I'd call the IT helpdesk directly to verify, 
        and hung up. No code ever came through to my phone, 
        so I assume they gave up when I didn't play along."

───────────────────────────────────────────────────────
ANALYST NOTES:
Failed vishing attempt. Anika's suspicion prevented 
compromise. The attacker likely moved on to other targets.`
  },
]
