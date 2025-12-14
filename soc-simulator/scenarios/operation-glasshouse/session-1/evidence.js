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

LIAM: "Oh yeah. I got a call Sunday morning—maybe 10am? The 
       guy said he was from IT support doing a security audit. 
       He was really professional, knew my name and everything."

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

• Sunday, 13 October 2024, 10:14 ACDT
• User: liam.fitzgerald@xyzpay.com.au
• Event: Successful MFA authentication
• Source IP: 103.42.91.17
• Location: VPN endpoint (Indonesia)
• Device: Unknown (not in asset inventory)

• Liam's usual pattern: Adelaide, corporate laptop
• This login: Foreign IP, unknown device, Sunday morning

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

Period: Sunday 13 October 2024, 10:14-11:30 ACDT
Source: Internal SSO + Application Logs

10:14 — SSO Login (MFA success) from 103.42.91.17
10:16 — Accessed: Employee Directory
10:18 — Accessed: Internal Wiki (searched: "org chart")
10:23 — Accessed: HR Portal (viewed own profile)
10:31 — Accessed: Finance Team contact list
10:45 — Accessed: IT Support documentation
10:52 — Accessed: Executive Assistant contact details
11:15 — Session idle timeout
11:30 — Session ended

───────────────────────────────────────────────────────
ANALYSIS:
Activity suggests reconnaissance—browsing directories and 
contact info rather than normal Customer Support tasks.

No customer data access during this session.
No file downloads. No email sent.

ASSESSMENT: Likely attacker performing internal recon 
after gaining access via compromised credentials.`
  },
  {
    id: 'EV-10',
    title: 'IP Reputation Report',
    category: 'Threat Intel',
    content: `IP REPUTATION REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Query IP: 103.42.91.17
Query Date: Monday, 14 October 2024

GEOLOCATION:
• Country: Indonesia
• City: Jakarta
• ISP: PT Telekomunikasi Indonesia
• Type: Commercial VPN endpoint

REPUTATION SCORES:
• AbuseIPDB: 47% confidence malicious (23 reports)
• VirusTotal: 3/87 vendors flag as suspicious
• Shodan: Open ports 22, 80, 443, 1194 (VPN)

HISTORICAL ACTIVITY:
• Associated with VPN service "PrivacyShield"
• Previously seen in: credential stuffing, account takeover
• No direct attribution to specific threat actor

───────────────────────────────────────────────────────
ASSESSMENT: Suspicious. Commonly used for anonymisation.
Consistent with attacker hiding true location.`
  }
]
