export default [
  // ============================================
  // NOISE ALERTS - Present from session start
  // ============================================
  {
    id: 'L-1847',
    severity: 'low',
    title: 'SSL certificate expiry warning',
    timestamp: '2024-10-13T14:00:00',
    source: 'cert-monitor',
    target: 'dev-api.internal',
    status: 'acknowledged',
    visibleAt: 0,
    details: `SSL certificate approaching expiry.

Server: dev-api.internal
Certificate: *.internal.xyzpay.com.au
Expires: 2024-11-12 (29 days)
Issuer: DigiCert

This is a development environment certificate. Renewal ticket has been raised with Infrastructure (INF-2341).

No action required from SOC.`,
    actions: []
  },
  {
    id: 'L-1851',
    severity: 'low',
    title: 'Scheduled backup completed',
    timestamp: '2024-10-14T06:00:00',
    source: 'backup-svc',
    target: 'prod-db-cluster',
    status: 'closed',
    visibleAt: 0,
    details: `Scheduled backup completed successfully.

Target: prod-db-cluster
Backup Type: Full
Duration: 47 minutes
Size: 2.3 TB
Destination: Azure Blob (au-east)

All checksums verified. No anomalies detected.`,
    actions: []
  },
  {
    id: 'M-2468',
    severity: 'medium',
    title: 'VPN authentication failures',
    timestamp: '2024-10-14T07:42:00',
    source: '203.45.67.89',
    target: 'vpn-gateway',
    user: 'david.kim@xyzpay.com.au',
    status: 'closed',
    visibleAt: 0,
    details: `Multiple VPN authentication failures detected.

User: david.kim@xyzpay.com.au
Source IP: 203.45.67.89 (Adelaide, AU - Telstra residential)
Attempts: 4 failed, 1 successful
Timeframe: 07:42 - 07:48 ACDT

User successfully authenticated on 5th attempt. Pattern consistent with password typo or expired credential. User's home IP matches previous login history.

Closed - Normal user behaviour.`,
    actions: []
  },
  {
    id: 'M-2469',
    severity: 'medium',
    title: 'Outbound connection to uncategorised domain',
    timestamp: '2024-10-14T08:15:00',
    source: '10.50.22.104',
    target: 'api.newrelic.com',
    status: 'closed',
    visibleAt: 0,
    details: `Outbound connection to newly categorised domain.

Source: 10.50.22.104 (WORKSTATION-DEV-07)
Destination: api.newrelic.com
Port: 443
Bytes: 12.4 KB

Domain was recently added to monitoring allowlist. This is the New Relic APM agent reporting application metrics.

Closed - Approved monitoring service.`,
    actions: []
  },
  {
    id: 'L-1852',
    severity: 'low',
    title: 'Antivirus signature update',
    timestamp: '2024-10-14T05:30:00',
    source: 'av-manager',
    target: 'all-endpoints',
    status: 'closed',
    visibleAt: 0,
    details: `Antivirus signature update deployed.

Update: CrowdStrike Falcon - Definition v2024.10.14.001
Endpoints updated: 247/251
Failed: 4 (offline laptops - will retry)
New signatures: 342 malware definitions

Routine update. No action required.`,
    actions: []
  },
  {
    id: 'M-2470',
    severity: 'medium',
    title: 'Large file upload detected',
    timestamp: '2024-10-14T08:02:00',
    source: '10.50.21.88',
    target: 'sharepoint.xyzpay.com.au',
    user: 'finance-reports@xyzpay.com.au',
    status: 'closed',
    visibleAt: 0,
    details: `Large file upload to cloud storage detected.

User: finance-reports@xyzpay.com.au (service account)
Source: 10.50.21.88 (FINRPT-SERVER-01)
Destination: SharePoint - Finance Reports library
File: Q3_2024_Consolidated_Report.xlsx
Size: 847 MB

This is a scheduled monthly finance report upload. Service account and destination are approved for this activity.

Closed - Scheduled business process.`,
    actions: []
  },
  {
    id: 'M-2467',
    severity: 'medium',
    title: 'After-hours system access',
    timestamp: '2024-10-14T05:47:00',
    source: '10.50.20.15',
    target: 'jenkins-prod',
    user: 'rachel.torres@xyzpay.com.au',
    status: 'closed',
    visibleAt: 0,
    details: `After-hours access to production system detected.

User: rachel.torres@xyzpay.com.au
System: jenkins-prod (CI/CD pipeline)
Time: 05:47 ACDT (outside business hours)
Action: Deployment pipeline execution

Rachel Torres (Infrastructure Lead) is on the approved after-hours access list for production deployments. Activity correlates with scheduled patch deployment window.

Closed - Approved maintenance activity.`,
    actions: []
  },
  
  // ============================================
  // STORY ALERTS - Credential stuffing (overnight)
  // ============================================
  {
    id: 'M-2471',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T03:12:00',
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
    timestamp: '2024-10-14T03:14:00',
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
    timestamp: '2024-10-14T03:47:00',
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
  // ============================================
  // NOISE ALERTS - Appear during session
  // ============================================
  {
    id: 'L-1853',
    severity: 'low',
    title: 'Disk space warning',
    timestamp: '2024-10-14T08:05:00',
    source: 'monitoring',
    target: 'log-archive-02',
    status: 'open',
    visibleAt: 300, // 5 min into session
    details: `Disk space threshold warning.

Server: log-archive-02
Partition: /var/log/archive
Usage: 78% (1.56 TB / 2 TB)
Threshold: 75%

This is a log archive server. Logs older than 90 days are automatically purged weekly (next run: Sunday 02:00).

Low priority - monitor only.`,
    actions: []
  },
  {
    id: 'M-2474',
    severity: 'medium',
    title: 'Multiple password resets',
    timestamp: '2024-10-14T08:10:00',
    source: 'identity-mgmt',
    target: 'active-directory',
    status: 'open',
    visibleAt: 600, // 10 min into session
    details: `Multiple password reset requests detected.

Source: HR Onboarding Portal
Count: 7 password resets in 15 minutes
Users affected:
- emily.watson@xyzpay.com.au (new hire)
- michael.chen@xyzpay.com.au (new hire)
- sarah.jones@xyzpay.com.au (new hire)
- 4 others (new hire batch)

HR confirmed new employee onboarding in progress today. All resets initiated through approved self-service portal.

Recommend: Close as expected activity.`,
    actions: []
  },
  {
    id: 'I-0892',
    severity: 'info',
    title: 'Firewall rule change detected',
    timestamp: '2024-10-14T08:15:00',
    source: 'fw-monitor',
    target: 'fw-edge-01',
    status: 'open',
    visibleAt: 900, // 15 min into session
    details: `Firewall configuration change detected.

Device: fw-edge-01
Change: New outbound rule added
Rule: Allow TCP/443 to 13.107.42.0/24 (Microsoft 365)
Changed by: rachel.torres@xyzpay.com.au
Change ticket: CHG-4521

This change was approved as part of the Microsoft 365 migration project. Change ticket verified.

Informational only.`,
    actions: []
  },
  {
    id: 'M-2475',
    severity: 'medium',
    title: 'Geographic anomaly - VPN login',
    timestamp: '2024-10-14T08:25:00',
    source: '122.148.91.203',
    target: 'vpn-gateway',
    user: 'jenny.martinez@xyzpay.com.au',
    status: 'open',
    visibleAt: 1500, // 25 min into session
    details: `Geographic anomaly detected for VPN authentication.

User: jenny.martinez@xyzpay.com.au
Source IP: 122.148.91.203 (Sydney, AU)
Usual location: Adelaide, AU
Authentication: Successful

User's calendar shows "Sydney Office Visit" for Oct 14-16. Travel was pre-approved in HR system.

Recommend: Close as expected travel.`,
    actions: []
  },
  {
    id: 'L-1854',
    severity: 'low',
    title: 'Service health check failed',
    timestamp: '2024-10-14T08:30:00',
    source: 'healthcheck',
    target: 'print-server-02',
    status: 'open',
    visibleAt: 1800, // 30 min into session
    details: `Service health check failure.

Server: print-server-02
Service: Print Spooler
Status: Not responding
Last successful check: 08:17 ACDT

This is a secondary print server. Primary print-server-01 is operational. IT Service Desk has been notified (INC-8821).

Low priority - redundant service.`,
    actions: []
  },
  {
    id: 'M-2476',
    severity: 'medium',
    title: 'Unusual database query volume',
    timestamp: '2024-10-14T08:35:00',
    source: '10.50.21.45',
    target: 'reporting-db',
    user: 'svc-tableau@xyzpay.com.au',
    status: 'open',
    visibleAt: 2100, // 35 min into session
    details: `Unusual database query volume detected.

User: svc-tableau@xyzpay.com.au (service account)
Source: 10.50.21.45 (TABLEAU-PROD-01)
Database: reporting-db
Queries: 2,847 in last hour (normal: ~500/hour)

Finance team confirmed month-end reporting cycle is running. Tableau dashboards are refreshing with October data.

Recommend: Close as expected month-end activity.`,
    actions: []
  },
  {
    id: 'I-0893',
    severity: 'info',
    title: 'New device enrolled',
    timestamp: '2024-10-14T08:40:00',
    source: 'intune',
    target: 'device-mgmt',
    user: 'marcus.chen@xyzpay.com.au',
    status: 'open',
    visibleAt: 2400, // 40 min into session
    details: `New device enrolled in mobile device management.

User: marcus.chen@xyzpay.com.au
Device: iPhone 15 Pro
Serial: DNXXXXXX
Enrollment: Corporate-owned

Marcus Chen (CISO) enrolled a new corporate device. Device policy applied successfully. Previous device (iPhone 14 Pro) marked for decommission.

Informational - normal device refresh.`,
    actions: []
  },
  // Disabled for now as this is a potential distraction given James is away at this time.
//   {
//     id: 'M-2477',
//     severity: 'medium',
//     title: 'Failed SSH authentication',
//     timestamp: '2024-10-14T08:45:00',
//     source: '10.50.20.88',
//     target: 'bastion-01',
//     user: 'admin-jokoro',
//     status: 'open',
//     visibleAt: 2700, // 45 min into session
//     details: `Failed SSH authentication attempts.

// User: admin-jokoro (James Okoro admin account)
// Source: 10.50.20.88 (WORKSTATION-SEC-03)
// Target: bastion-01
// Attempts: 3 failed

// James Okoro confirmed he was attempting to connect but had wrong SSH key loaded. Successfully authenticated on 4th attempt with correct key.

// Recommend: Close as user error.`,
//     actions: []
//   },
  
  // ============================================
  // STORY ALERTS - Key investigation items
  // ============================================
  {
    id: 'M-2489',
    severity: 'medium',
    title: 'Unusual login pattern detected',
    timestamp: '2024-10-14T08:24:00',
    source: '103.42.91.17',
    target: 'internal-sso',
    user: 'liam.fitzgerald@xyzpay.com.au',
    status: 'open',
    visibleAt: 1440, // Appears at 36:00 remaining (24 min elapsed)
    notification: {
      message: 'New SIEM alert: Unusual login pattern detected',
      type: 'warning'
    },
    details: `Unusual login pattern detected for user account.

User: liam.fitzgerald@xyzpay.com.au
Source IP: 103.42.91.17 (Indonesia)
Target: internal-sso
Event: Login from new device
Login time: 2024-10-14 07:52 ACDT
Risk Score: Medium

Note: User's typical location is Adelaide, AU. This login originated from a foreign IP address not previously associated with this account.

Device: Unknown (not in asset inventory)
MFA: Completed successfully`,
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
  // H-0012: Final cliffhanger alert - data breach already occurred at 8:22am
  {
    id: 'H-0012',
    severity: 'critical',
    title: 'Sensitive data access detected',
    timestamp: '2024-10-14T08:55:00',
    source: '103.42.91.17',
    target: 'CUSTOMER_DATABASE',
    user: 'liam.fitzgerald@xyzpay.com.au',
    status: 'open',
    visibleAt: 3300, // Appears at 05:00 remaining (cliffhanger)
    isCliffhanger: true,
    notification: {
      message: 'CRITICAL ALERT: Sensitive data access detected',
      type: 'danger'
    },
    details: `⚠️ CRITICAL ALERT

Sensitive data access detected.

User: liam.fitzgerald@xyzpay.com.au
Action: Accessed CUSTOMER_DATABASE (prod)
Records accessed: 2,847
Source IP: 103.42.91.17 (Indonesia)
Access time: 2024-10-14 08:22:00 ACDT

⚠️ This user does not normally access this system
⚠️ Access from foreign IP address (Indonesia)
⚠️ Source IP flagged as suspicious

Note: Alert delay due to SIEM correlation engine processing time.

This alert requires immediate investigation.`,
    actions: []
  }
]
