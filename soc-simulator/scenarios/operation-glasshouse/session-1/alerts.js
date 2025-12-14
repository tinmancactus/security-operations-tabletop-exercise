export default [
  {
    id: 'M-2471',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T03:12:00+10:30',
    source: '185.220.101.42',
    target: 'customer-portal',
    attempts: 847,
    status: 'open',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 185.220.101.42
Target: customer-portal (external)
Attempts: 847
Timeframe: 03:12 - 03:45 ACDT
Success: 0

Pattern matches known credential stuffing activity. Source IP is a known Tor exit node.

Recommendation: Monitor. No successful authentications detected.`,
    actions: []
  },
  {
    id: 'M-2472',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T03:14:00+10:30',
    source: '91.240.118.29',
    target: 'customer-portal',
    attempts: 612,
    status: 'open',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 91.240.118.29
Target: customer-portal (external)
Attempts: 612
Timeframe: 03:14 - 03:52 ACDT
Success: 0

Pattern matches known credential stuffing activity. Source IP associated with bulletproof hosting.

Recommendation: Monitor. No successful authentications detected.`,
    actions: []
  },
  {
    id: 'M-2473',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T03:47:00+10:30',
    source: '194.26.192.71',
    target: 'customer-portal',
    attempts: 423,
    status: 'open',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 194.26.192.71
Target: customer-portal (external)
Attempts: 423
Timeframe: 03:47 - 04:15 ACDT
Success: 0

Pattern matches known credential stuffing activity.

Recommendation: Monitor. No successful authentications detected.`,
    actions: []
  },
  {
    id: 'M-2489',
    severity: 'medium',
    title: 'Unusual login pattern detected',
    timestamp: '2024-10-14T08:34:00+10:30',
    source: '103.42.91.17',
    target: 'internal-sso',
    user: 'liam.fitzgerald@xyzpay.com.au',
    status: 'open',
    visibleAt: 1200, // Appears at 40:00 remaining (20 min elapsed)
    details: `Unusual login pattern detected for user account.

User: liam.fitzgerald@xyzpay.com.au
Source IP: 103.42.91.17 (Indonesia)
Target: internal-sso
Event: Login from new device
Risk Score: Medium

Note: User's typical location is Adelaide, AU. This login originated from a foreign IP address not previously associated with this account.

Device: Unknown (not in asset inventory)`,
    actions: [
      {
        id: 'investigate-liam-logs',
        label: 'Deep log analysis',
        cost: 2,
        description: 'Perform detailed analysis of authentication logs',
        unlocksEvidence: 'EV-7'
      },
      {
        id: 'disable-liam',
        label: 'Disable account',
        cost: 2,
        description: 'Immediately disable liam.fitzgerald account'
      }
    ]
  },
  {
    id: 'H-0012',
    severity: 'critical',
    title: 'Sensitive data access detected',
    timestamp: '2024-10-14T09:55:00+10:30',
    source: '103.42.91.17',
    target: 'CUSTOMER_DATABASE',
    user: 'liam.fitzgerald@xyzpay.com.au',
    status: 'open',
    visibleAt: 3300, // Appears at 05:00 remaining (cliffhanger)
    isCliffhanger: true,
    details: `⚠️ CRITICAL ALERT

Sensitive data access detected.

User: liam.fitzgerald@xyzpay.com.au
Action: Accessed CUSTOMER_DATABASE (prod)
Records viewed: 2,847
Source IP: 103.42.91.17 (Indonesia)

⚠️ This user does not normally access this system
⚠️ Access occurred outside business hours pattern
⚠️ Source IP flagged as suspicious

This alert requires immediate investigation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SESSION 1 ENDS HERE.

Complete your Triage Report with the information you've gathered. 
The incident continues in Session 2.`,
    actions: []
  }
]
