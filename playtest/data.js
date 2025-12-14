// Evidence Cards Data
const evidenceCards = {
  1: {
    title: "Shift Handover Notes",
    meta: "From: Night Shift (Alex)",
    cost: 0,
    content: "EVIDENCE CARD #1 — SHIFT HANDOVER NOTES\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nFrom: Night Shift (Alex)\nTo: Day Shift\nDate: Monday, 14 October 2024, 07:45 ACDT\n\nHey team,\n\nQuiet night overall. Few things to note:\n\n• SIEM threw a bunch of failed login alerts around 3am—looks\n  like credential stuffing against the customer portal again.\n  Same pattern as last month. I've logged it but didn't\n  escalate. Probably just script kiddies.\n\n• There's a service ticket from someone in Customer Support\n  about a \"weird call from IT.\" Came in late yesterday.\n  Didn't get a chance to look at it. Probably nothing but\n  worth a glance.\n\n• Another ticket about a suspicious email. Marketing related\n  I think? Low priority.\n\n• Backups completed successfully. No infrastructure alerts.\n\nCoffee machine is broken again.\n\n— Alex"
  },
  2: {
    title: "SIEM Alert Dashboard",
    meta: "Last 24 Hours Summary",
    cost: 0,
    content: "EVIDENCE CARD #2 — SIEM ALERT DASHBOARD\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nXYZ Pay Security Operations Centre\nAlert Summary: Last 24 Hours\nGenerated: Monday, 14 October 2024, 08:00 ACDT\n\n┌─────────────────────────────────────────────────────┐\n│  CRITICAL: 0    HIGH: 0    MEDIUM: 3    LOW: 47     │\n└─────────────────────────────────────────────────────┘\n\nMEDIUM ALERTS (3):\n───────────────────────────────────────────────────────\n[M-2471] 03:12 — Multiple failed logins: customer-portal\n         Source: 185.220.101.42 | Attempts: 847 | Status: Open\n\n[M-2472] 03:14 — Multiple failed logins: customer-portal\n         Source: 91.240.118.29 | Attempts: 612 | Status: Open\n\n[M-2473] 03:47 — Multiple failed logins: customer-portal\n         Source: 194.26.192.71 | Attempts: 423 | Status: Open\n\nLOW ALERTS (47):\n───────────────────────────────────────────────────────\n[L-8834 to L-8880] — Failed login attempts (individual)\n         Various sources | Pattern: Credential stuffing\n\n───────────────────────────────────────────────────────\nNote: Credential stuffing pattern matches known botnet\nactivity. No successful authentications from flagged IPs.\nRecommend: Monitor, no immediate action required."
  },
  3: {
    title: "Service Ticket #4471 — Liam",
    meta: "Priority: Low | Weird call from IT",
    cost: 0,
    content: "EVIDENCE CARD #3 — SERVICE TICKET #4471\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nStatus: Open                Priority: Low\nCategory: Security — General Inquiry\nSubmitted: Sunday, 13 October 2024, 16:42 ACDT\n\nFrom: Liam Fitzgerald (Customer Support)\nSubject: Weird call from IT department\n───────────────────────────────────────────────────────\n\nHi,\n\nGot a call from IT support this morning asking me to verify\nsomething. Seemed legit but wanted to flag it just in case.\nNot urgent, just thought I'd mention it.\n\nThanks,\nLiam\n───────────────────────────────────────────────────────\nAssigned to: SOC Queue\nSLA: 48 hours"
  },
  4: {
    title: "Service Ticket #4468 — Jenny",
    meta: "Priority: Low | Suspicious email",
    cost: 0,
    content: "EVIDENCE CARD #4 — SERVICE TICKET #4468\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nStatus: Open                Priority: Low\nCategory: Security — Phishing Report\nSubmitted: Friday, 11 October 2024, 14:23 ACDT\n\nFrom: Jenny Marcos (Marketing)\nSubject: Suspicious email - please check\n───────────────────────────────────────────────────────\n\nHi Security team,\n\nI received an email that looks a bit dodgy. It's asking me\nto click a link to \"verify my account\" for some retail\nanalytics platform. I don't remember signing up for this.\nScreenshot attached.\n\nCan you check if it's legit?\n\nThanks,\nJenny\n───────────────────────────────────────────────────────\nAttachment: email_screenshot.png\nAssigned to: SOC Queue\nSLA: 48 hours"
  },
  5: {
    title: "Liam Interview — Detailed",
    meta: "Interview employee (detailed) — 2 tokens",
    cost: 2,
    content: "EVIDENCE CARD #5 — EMPLOYEE INTERVIEW: LIAM FITZGERALD\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nInterview conducted: Monday, 14 October 2024\nMethod: Phone call to Customer Support desk\n───────────────────────────────────────────────────────\n\nSOC: \"Hi Liam, following up on your ticket about a weird\n      call from IT. Can you tell us more?\"\n\nLIAM: \"Oh yeah. I got a call Sunday morning—maybe 10am? The\n       guy said he was from IT support doing a security audit.\n       He was really professional, knew my name and everything.\"\n\nSOC: \"What did he ask you to do?\"\n\nLIAM: \"He said he needed to verify my identity for the audit.\n       Asked me to read out a code that would be sent to my\n       phone. I got a text with a 6-digit code and read it\n       to him.\"\n\nSOC: \"Did he ask for your password?\"\n\nLIAM: \"No, that's why I thought it was legit. He even said\n       'we'll never ask for your password'—which is what IT\n       always says, right? So I figured it was fine.\"\n\nSOC: \"Did anything else happen after?\"\n\nLIAM: \"No, he just said thanks and hung up. Should I be\n       worried? Did I do something wrong?\"\n───────────────────────────────────────────────────────\nANALYST NOTES:\nPattern consistent with MFA bypass via social engineering.\nAttacker likely had Liam's password already and used vishing\nto obtain MFA code.\nRECOMMEND: Check Liam's account for suspicious activity."
  },
  6: {
    title: "Jenny Email — Full Investigation",
    meta: "Email analysis — 2 tokens",
    cost: 2,
    content: "EVIDENCE CARD #6 — EMAIL ANALYSIS: JENNY MARCOS REPORT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nAnalysis conducted: Monday, 14 October 2024\n───────────────────────────────────────────────────────\n\nEMAIL HEADERS:\nFrom: noreply@retailmetrics.com.au\nReply-To: support@retailmetrics.com.au\nSPF: PASS    DKIM: PASS    DMARC: PASS\n\nLINK ANALYSIS:\nURL: https://app.retailmetrics.com.au/verify?token=...\nDomain registered: 2019\nSSL Certificate: Valid, DigiCert\nVirusTotal: 0/87 detections\nURLScan: Clean, legitimate retail analytics SaaS\n\nBUSINESS CONTEXT:\nRetailMetrics is a legitimate analytics vendor. Cross-check\nwith Procurement confirms XYZ has active contract (signed\n6 months ago by Marketing team).\n───────────────────────────────────────────────────────\nVERDICT: FALSE POSITIVE\n\nLegitimate email from contracted vendor. Jenny likely forgot\nshe signed up during onboarding.\n\nRECOMMEND: Close ticket, inform Jenny email is safe."
  },
  7: {
    title: "Authentication Logs — Deep Analysis",
    meta: "Deep log analysis — 2 tokens",
    cost: 2,
    content: "EVIDENCE CARD #7 — AUTHENTICATION LOG ANALYSIS\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nAnalysis period: 12-14 October 2024\nSystems: customer-portal, internal-sso, admin-console\n───────────────────────────────────────────────────────\n\nCREDENTIAL STUFFING PATTERN (customer-portal):\n• 1,882 failed attempts from 3 IPs (known Tor exit nodes)\n• Targeting random usernames from leaked list\n• 0 successful authentications\n• Pattern: Automated, indiscriminate, opportunistic\n• ASSESSMENT: Background noise, no immediate threat\n───────────────────────────────────────────────────────\n\n⚠️  ANOMALY DETECTED (internal-sso):\n• Sunday, 13 October 2024, 10:14 ACDT\n• User: liam.fitzgerald@xyzpay.com.au\n• Event: Successful MFA authentication\n• Source IP: 103.42.91.17\n• Location: VPN endpoint (Indonesia)\n• Device: Unknown (not in asset inventory)\n\n• Liam's usual pattern: Adelaide, corporate laptop\n• This login: Foreign IP, unknown device, Sunday morning\n───────────────────────────────────────────────────────\nASSESSMENT: Suspicious. Possible account compromise.\nDoes NOT match credential stuffing pattern.\nRECOMMEND: Investigate user, check post-auth activity."
  },
  8: {
    title: "Threat Intel — Credential Stuffing",
    meta: "Threat intel lookup — 1 token",
    cost: 1,
    content: "EVIDENCE CARD #8 — THREAT INTELLIGENCE BRIEF\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nQuery: Credential stuffing, BNPL sector, October 2024\nSource: XYZ Threat Intel Database\n───────────────────────────────────────────────────────\n\nCURRENT THREAT LANDSCAPE:\n• Credential stuffing against AU fintech up 34% in Q3 2024\n• Primary driver: Large credential dumps circulating\n• Most attacks opportunistic (automated botnets)\n• BNPL sector targeted due to high account values\n\nKNOWN THREAT ACTORS:\n• No specific APT groups targeting AU BNPL currently\n• Hacktivist group \"right_0ff\" has targeted financial\n  services with ideological motivation (anti-predatory\n  lending). Primarily uses social engineering.\n• Ransomware groups occasionally target fintech but prefer\n  larger enterprises\n───────────────────────────────────────────────────────\nRELEVANCE:\nCredential stuffing in alerts M-2471 to M-2473 matches known\nbotnet activity. Likely opportunistic. However, remain\nvigilant for targeted attacks using different vectors\n(phishing, vishing)."
  },
  9: {
    title: "Liam Account Activity",
    meta: "Requires #5 or #7 first — 2 tokens",
    cost: 2,
    requires: [5, 7],
    content: "EVIDENCE CARD #9 — USER ACTIVITY: LIAM.FITZGERALD\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nPeriod: Sunday 13 October 2024, 10:14-11:30 ACDT\nSource: Internal SSO + Application Logs\n───────────────────────────────────────────────────────\n\n10:14 — SSO Login (MFA success) from 103.42.91.17\n10:16 — Accessed: Employee Directory\n10:18 — Accessed: Internal Wiki (searched: \"org chart\")\n10:23 — Accessed: HR Portal (viewed own profile)\n10:31 — Accessed: Finance Team contact list\n10:45 — Accessed: IT Support documentation\n10:52 — Accessed: Executive Assistant contact details\n11:15 — Session idle timeout\n11:30 — Session ended\n───────────────────────────────────────────────────────\nANALYSIS:\nActivity suggests reconnaissance—browsing directories and\ncontact info rather than normal Customer Support tasks.\n\nNo customer data access during this session.\nNo file downloads. No email sent.\n\nASSESSMENT: Likely attacker performing internal recon\nafter gaining access via compromised credentials."
  },
  10: {
    title: "IP Reputation — 103.42.91.17",
    meta: "IP lookup — 1 token",
    cost: 1,
    content: "EVIDENCE CARD #10 — IP REPUTATION REPORT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nQuery IP: 103.42.91.17\nQuery Date: Monday, 14 October 2024\n───────────────────────────────────────────────────────\n\nGEOLOCATION:\n• Country: Indonesia\n• City: Jakarta\n• ISP: PT Telekomunikasi Indonesia\n• Type: Commercial VPN endpoint\n\nREPUTATION SCORES:\n• AbuseIPDB: 47% confidence malicious (23 reports)\n• VirusTotal: 3/87 vendors flag as suspicious\n• Shodan: Open ports 22, 80, 443, 1194 (VPN)\n\nHISTORICAL ACTIVITY:\n• Associated with VPN service \"PrivacyShield\"\n• Previously seen in: credential stuffing, account takeover\n• No direct attribution to specific threat actor\n───────────────────────────────────────────────────────\nASSESSMENT: Suspicious. Commonly used for anonymisation.\nConsistent with attacker hiding true location."
  }
};

// Envelope Data
const envelopes = {
  'ENV-1A': {
    type: 'timed',
    trigger: 'Opens at 40:00',
    triggerTime: 2400,
    title: 'New SIEM Alert',
    content: "⚠️ NEW SIEM ALERT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n[M-2489] NEW — 08:34 ACDT\nUnusual login pattern detected\n\nUser: liam.fitzgerald@xyzpay.com.au\nEvent: Login from new device\nSource: 103.42.91.17 (Indonesia)\nRisk Score: Medium\n\nNote: User's typical location is Adelaide, AU"
  },
  'ENV-1B': {
    type: 'timed',
    trigger: 'Opens at 20:00',
    triggerTime: 1200,
    title: 'Priya Check-in',
    content: "📧 MESSAGE FROM PRIYA SHARMA (SOC Manager)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n09:42 ACDT\n\n\"Hey team, quick check-in. Anything interesting this morning?\nMarcus asked me for a status update—apparently the board is\nnervous after that competitor breach last month. Let me know\nif there's anything I should flag.\"\n\n───────────────────────────────────────────────────────\nThis is NOT a formal escalation request. You can:\n• Respond informally (free, no action required)\n• Use this as a trigger to formally escalate (2 tokens)"
  },
  'ENV-1C': {
    type: 'timed',
    trigger: 'Opens at 05:00',
    triggerTime: 300,
    title: '⚠️ CLIFFHANGER',
    content: "🚨 CRITICAL ALERT — SESSION 1 CLIFFHANGER\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n⚠️ [H-0012] CRITICAL — 09:55 ACDT\nSensitive data access detected\n\nUser: liam.fitzgerald@xyzpay.com.au\nAction: Accessed CUSTOMER_DATABASE (prod)\nRecords viewed: 2,847\nSource IP: 103.42.91.17 (Indonesia)\n\n⚠️ This user does not normally access this system\n⚠️ Access occurred outside business hours pattern\n⚠️ Source IP flagged as suspicious\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nSESSION 1 ENDS HERE.\n\nComplete your Triage Report with the information you've\ngathered. The incident continues in Session 2.\n\nConsider:\n• What do you know for certain?\n• What are your open questions?\n• What would you recommend as next steps?"
  },
  'ENV-1D': {
    type: 'decision',
    trigger: 'Disable Liam\'s account',
    title: 'Account Disabled',
    content: "ACCOUNT ACTION: LIAM.FITZGERALD DISABLED\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nIMMEDIATE EFFECTS:\n• Liam locked out of all systems\n• Active sessions terminated\n• Liam's manager calls confused (\"Why is he locked out?\")\n\nATTACKER IMPACT:\n• Loses access via Liam's credentials\n• BUT now knows you're onto them—may accelerate or pivot\n\n───────────────────────────────────────────────────────\nNote this action and your reasoning in your Triage Report.\n\nThis was a containment action. Was it the right call at\nthis stage? What evidence supported this decision?"
  },
  'ENV-1E': {
    type: 'decision',
    trigger: 'Block IP 185.220.101.42',
    title: 'IP Blocked',
    content: "INFRASTRUCTURE ACTION: IP BLOCKED\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nRachel's team has implemented the block.\nCredential stuffing from IP 185.220.101.42 has stopped.\n\nHOWEVER:\nThis IP was part of the botnet (the noise), not the real\nthreat. The actual attacker is using 103.42.91.17.\n\nThis action had no impact on the real incident.\n\n───────────────────────────────────────────────────────\nLESSON: Acting on the obvious threat isn't always right.\nThe real threat was buried in the \"minor\" service ticket."
  },
  'ENV-1F': {
    type: 'decision',
    trigger: 'Request Infrastructure support',
    title: 'Infrastructure Response',
    content: "📧 RESPONSE FROM RACHEL TORRES (Infrastructure Lead)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n\"Got your ticket. What exactly do you need? We're mid-patching\ncycle so I need to know if this is urgent.\n\nFor emergency changes I need:\n1. Specific systems/IPs affected\n2. What action you want\n3. Business justification\n4. SOC Manager approval\n\nLet me know and I'll prioritise.\"\n\n───────────────────────────────────────────────────────\nLESSON: Infrastructure needs specific, justified requests.\nVague escalations waste everyone's time."
  }
};

// Priya Response Data
const priyaResponses = {
  'PRIYA-1A': {
    title: 'Strong Escalation (4-5 checks)',
    content: "📧 RESPONSE FROM PRIYA SHARMA (SOC Manager)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n\"Good work. This is exactly what I need to know early.\n\nThe MFA bypass pattern is concerning—looks like coordinated\nsocial engineering, not opportunistic stuffing. They called\nLiam directly, suggesting prior recon.\n\nI'm authorising you to:\n• Continue deep investigation on Liam's account\n• Check if other employees got similar calls\n• Prepare containment options (but wait—I'll brief Marcus first)\n\nI'll brief Marcus at 10:30. Update me every 15 min.\nHere's James's mobile if you need Tier 3 urgently: 0412 XXX XXX\"\n\n───────────────────────────────────────────────────────\nREWARD: James's direct contact (free Tier 3 escalation\nfor the rest of this session)"
  },
  'PRIYA-1B': {
    title: 'Partial Escalation (2-3 checks)',
    content: "📧 RESPONSE FROM PRIYA SHARMA (SOC Manager)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n\"Thanks for the heads up. I can see something's going on but\nneed more detail before taking this to Marcus.\n\nCan you clarify:\n• Which specific account(s) affected?\n• What's the timeline?\n• What's your severity assessment and why?\n\nI've got meetings until 11. Send an update when you have more.\"\n\n───────────────────────────────────────────────────────\nRESULT: Priya is waiting for better information.\nFollow-up escalation is FREE—complete another Self-Assessment when ready."
  },
  'PRIYA-1C': {
    title: 'Weak Escalation (0-1 checks)',
    content: "📧 RESPONSE FROM PRIYA SHARMA (SOC Manager)\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n\"I've read your message but I'm not clear what you're asking\nme to do.\n\nIs this an incident or just suspicious activity? What's the\nimpact? I need specifics—affected systems, IOCs, timeline—\nbefore I can justify pulling anyone off other work.\n\nCredential stuffing is business as usual. If something's\ndifferent, spell it out clearly. Document what you have and\ncome back with something concrete.\"\n\n───────────────────────────────────────────────────────\nRESULT: Priya needs evidence-based escalations.\nFollow-up escalation is FREE—complete another Self-Assessment when ready."
  }
};
