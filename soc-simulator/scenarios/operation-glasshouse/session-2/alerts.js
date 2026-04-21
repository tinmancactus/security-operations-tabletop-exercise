// Session 2 SIEM alerts
// Covers overnight activity from Monday night through Tuesday morning.
// Alex Anderson (night shift) has already triaged most of these as noise.
// Key investigable alerts: after-hours VPN sessions (Sandra has concurrent sessions)
// and the svc_backup_admin scheduled task creation.

export default [
  // ============================================
  // NOISE ALERTS — Present from session start (closed/acknowledged by Alex)
  // ============================================
  {
    id: 'L-2001',
    severity: 'low',
    title: 'Scheduled backup completed',
    timestamp: '2024-10-15T06:00:00',
    source: 'backup-srv-01',
    target: 'prod-db-cluster',
    status: 'closed',
    visibleAt: 0,
    details: `Scheduled backup completed successfully.

Target: prod-db-cluster
Backup Type: Incremental (Monday)
Duration: 52 minutes
Size: 1.8 TB
Destination: Azure Blob (au-east)

All checksums verified. No anomalies detected.`,
    actions: []
  },
  {
    id: 'L-2002',
    severity: 'low',
    title: 'Antivirus signature update',
    timestamp: '2024-10-15T06:00:00',
    source: 'av-mgmt-01',
    target: 'all-endpoints',
    status: 'closed',
    visibleAt: 0,
    details: `Antivirus signature update deployed.

Update: CrowdStrike Falcon - Definition v2024.10.15.001
Endpoints updated: 249/251
Failed: 2 (offline laptops - will retry)
New signatures: 387 malware definitions

Routine update. No action required.`,
    actions: []
  },
  {
    id: 'I-2003',
    severity: 'info',
    title: 'AD maintenance window completed',
    timestamp: '2024-10-15T02:45:00',
    source: 'dc-01.xyzpay.local',
    target: 'active-directory',
    status: 'closed',
    visibleAt: 0,
    details: `Active Directory maintenance window completed.

Tasks: Group policy update, Schema check
Duration: 45 minutes (02:00–02:45 ACDT)
Status: All tasks successful
Changes: 0 schema modifications, 3 GPO refreshes

Routine scheduled maintenance. No action required.`,
    actions: []
  },
  {
    id: 'I-2004',
    severity: 'info',
    title: 'Database index rebuild completed',
    timestamp: '2024-10-15T04:30:00',
    source: 'db-srv-01',
    target: 'customer-db',
    status: 'closed',
    visibleAt: 0,
    details: `Database index rebuild completed.

Tables rebuilt: customers, transactions, orders
Duration: 1h 30m (03:00–04:30 ACDT)
Status: All indexes rebuilt successfully

Scheduled maintenance. No action required.`,
    actions: []
  },
  {
    id: 'I-2005',
    severity: 'info',
    title: 'Backup verification passed',
    timestamp: '2024-10-15T05:30:00',
    source: 'backup-srv-01',
    target: 'backup-archive',
    status: 'closed',
    visibleAt: 0,
    details: `Backup verification completed.

Verifying: Monday incremental backup
Duration: 30 minutes (05:00–05:30 ACDT)
Status: All checksums valid
Files verified: 12,847

No anomalies detected.`,
    actions: []
  },

  // ============================================
  // NOISE ALERTS — Credential stuffing continuation (overnight)
  // ============================================
  {
    id: 'M-2501',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-14T23:18:00',
    source: '185.220.101.42',
    target: 'customer-portal',
    attempts: 1247,
    status: 'acknowledged',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 185.220.101.42
Target: customer-portal (external)
Attempts: 1,247
Timeframe: 23:18 – 00:45 ACDT
Success: 0

Same Tor exit node as Sunday night attacks. Pattern matches ongoing credential stuffing campaign.

Alex's note: Same pattern, same source. Continuing to monitor.`,
    actions: []
  },
  {
    id: 'M-2502',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-15T01:02:00',
    source: '91.240.118.29',
    target: 'customer-portal',
    attempts: 892,
    status: 'acknowledged',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 91.240.118.29
Target: customer-portal (external)
Attempts: 892
Timeframe: 01:02 – 01:38 ACDT
Success: 0

Bulletproof hosting IP. Same actor as Sunday/Monday credential stuffing.

Alex's note: Continuing pattern. No successful logins.`,
    actions: []
  },
  {
    id: 'M-2503',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-15T03:41:00',
    source: '194.26.192.71',
    target: 'customer-portal',
    attempts: 634,
    status: 'acknowledged',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 194.26.192.71
Target: customer-portal (external)
Attempts: 634
Timeframe: 03:41 – 04:12 ACDT
Success: 0

Known credential stuffing source. Third night in a row.

Alex's note: Ongoing. Recommend adding to automated block list if this continues.`,
    actions: []
  },
  {
    id: 'M-2504',
    severity: 'medium',
    title: 'Multiple failed logins: customer-portal',
    timestamp: '2024-10-15T05:15:00',
    source: '23.129.64.210',
    target: 'customer-portal',
    attempts: 418,
    status: 'acknowledged',
    visibleAt: 0,
    details: `Multiple failed authentication attempts detected against customer-portal.

Source IP: 23.129.64.210
Target: customer-portal (external)
Attempts: 418
Timeframe: 05:15 – 05:33 ACDT
Success: 0

New Tor exit node, same credential stuffing pattern. Shorter burst than the others.

Alex's note: New IP, same campaign. Zero successes across all four overnight bursts.`,
    actions: []
  },

  // Additional overnight noise (to reach ~18 total)
  {
    id: 'L-2006',
    severity: 'low',
    title: 'SSL certificate expiry warning',
    timestamp: '2024-10-15T05:00:00',
    source: 'cert-monitor',
    target: 'staging-api.internal',
    status: 'closed',
    visibleAt: 0,
    details: `SSL certificate approaching expiry.

Server: staging-api.internal
Certificate: *.staging.xyzpay.com.au
Expires: 2024-11-08 (24 days)
Issuer: DigiCert

This is a staging environment certificate. Renewal ticket has been raised with Infrastructure (INF-2355).

No action required from SOC.`,
    actions: []
  },
  {
    id: 'I-2007',
    severity: 'info',
    title: 'DNS resolution failures',
    timestamp: '2024-10-15T03:22:00',
    source: 'dns-monitor',
    target: 'dns-01.xyzpay.local',
    status: 'closed',
    visibleAt: 0,
    details: `Intermittent DNS resolution failures detected.

Server: dns-01.xyzpay.local
Failed queries: 47 over 15 minutes (03:22–03:37)
Affected domains: *.windows.net, *.microsoftonline.com
Resolution: Automatic — upstream DNS provider issue resolved itself.

No client impact. Secondary DNS handled queries during the outage.`,
    actions: []
  },
  {
    id: 'L-2008',
    severity: 'low',
    title: 'Patch compliance scan completed',
    timestamp: '2024-10-15T04:00:00',
    source: 'wsus-srv-01',
    target: 'all-servers',
    status: 'closed',
    visibleAt: 0,
    details: `Weekly patch compliance scan completed.

Servers scanned: 42
Compliant: 39 (92.9%)
Non-compliant: 3
  - print-server-02 (KB5031356 pending)
  - dev-build-01 (KB5031354 pending)
  - test-db-01 (KB5031356 pending)

Non-compliant servers are non-production. Patching scheduled for next maintenance window.`,
    actions: []
  },
  {
    id: 'M-2509',
    severity: 'medium',
    title: 'Failed SSH authentication',
    timestamp: '2024-10-14T23:45:00',
    source: '10.1.50.67',
    target: 'bastion-01',
    user: 'admin-jokoro',
    status: 'closed',
    visibleAt: 0,
    details: `Failed SSH authentication attempts.

User: admin-jokoro (James Okoro admin account)
Source: 10.1.50.67 (WORKSTATION-SEC-03)
Target: bastion-01
Attempts: 2 failed, 1 successful
Time: 23:45 ACDT

James Okoro confirmed he was running a final script before leaving for the night and had the wrong SSH key loaded. Successfully authenticated on 3rd attempt.

Alex's note: Confirmed with James before he left. No concerns.`,
    actions: []
  },

  // ============================================
  // AFTER-HOURS VPN ALERTS — C-suite noise (closed by Alex)
  // ============================================
  {
    id: 'L-2014',
    severity: 'low',
    title: 'After-hours VPN: David Whitmore (CEO)',
    timestamp: '2024-10-14T20:45:11',
    source: '203.22.145.62',
    target: 'vpn-gateway',
    user: 'david.whitmore@xyzpay.com.au',
    status: 'closed',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: david.whitmore@xyzpay.com.au (CEO)
Source IP: 203.22.145.62 (Adelaide, AU — Telstra residential)
VPN Assigned: 10.1.100.10
Connected: 20:45 ACDT
Device: LAPTOP-DW001 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Email access (3 messages read). Session duration: 19m.

Alex's note: CEO checking in from home. Expected given the incident.`,
    actions: []
  },
  {
    id: 'L-2015',
    severity: 'low',
    title: 'After-hours VPN: Karen Lee (General Counsel)',
    timestamp: '2024-10-14T21:12:08',
    source: '1.136.92.44',
    target: 'vpn-gateway',
    user: 'karen.lee@xyzpay.com.au',
    status: 'closed',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: karen.lee@xyzpay.com.au (General Counsel)
Source IP: 1.136.92.44 (Adelaide, AU — Optus residential)
VPN Assigned: 10.1.100.22
Connected: 21:12 ACDT
Device: LAPTOP-KL001 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Accessed Legal/Board email folder. Session duration: 15m.

Alex's note: General Counsel checking board comms. Standard during an active incident.`,
    actions: []
  },

  // ============================================
  // AFTER-HOURS VPN ALERTS — Investigable (low severity)
  // Students can spend tokens to investigate each one.
  // Marcus, Priya, Rachel are legitimate. Sandra reveals concurrent sessions.
  // ============================================
  {
    id: 'L-2010',
    severity: 'low',
    title: 'After-hours VPN: Sandra Leigh (CFO)',
    timestamp: '2024-10-14T21:30:44',
    source: '121.44.88.15',
    target: 'vpn-gateway',
    user: 'sandra.leigh@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: sandra.leigh@xyzpay.com.au (CFO)
Source IP: 121.44.88.15 (Adelaide, AU — TPG residential)
VPN Assigned: 10.1.100.20
Connected: 21:30 ACDT
Device: LAPTOP-SL001 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Email access, finance dashboard.

Alex's note: Sandra checking in from home like the others. Not unexpected given the incident.`,
    actions: [
      {
        id: 'investigate-vpn-sandra',
        label: 'Investigate VPN session',
        cost: 1,
        description: 'Pull detailed session logs for Sandra Leigh',
        notification: 'VPN session investigation requested — Priya Sharma',
        logMessage: 'Requested VPN session analysis for sandra.leigh',
        logType: 'investigation'
      }
    ]
  },
  {
    id: 'L-2011',
    severity: 'low',
    title: 'After-hours VPN: Marcus Chen (CISO)',
    timestamp: '2024-10-14T22:08:33',
    source: '203.45.67.89',
    target: 'vpn-gateway',
    user: 'marcus.chen@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: marcus.chen@xyzpay.com.au (CISO)
Source IP: 203.45.67.89 (Adelaide, AU — Telstra residential)
VPN Assigned: 10.1.100.12
Connected: 22:08 ACDT
Device: LAPTOP-MC001 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Accessed IR-2024-0847 email folder.

Alex's note: Marcus checking in on the incident from home. Expected.`,
    actions: [
      {
        id: 'investigate-vpn-marcus',
        label: 'Investigate VPN session',
        cost: 1,
        description: 'Pull detailed session logs for Marcus Chen',
        notification: 'VPN session investigation requested — Priya Sharma',
        logMessage: 'Requested VPN session analysis for marcus.chen',
        logType: 'investigation'
      }
    ]
  },
  {
    id: 'L-2012',
    severity: 'low',
    title: 'After-hours VPN: Priya Sharma (SOC Manager)',
    timestamp: '2024-10-14T22:14:22',
    source: '14.203.88.45',
    target: 'vpn-gateway',
    user: 'priya.sharma@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: priya.sharma@xyzpay.com.au (SOC Manager)
Source IP: 14.203.88.45 (Adelaide, AU — Optus residential)
VPN Assigned: 10.1.100.15
Connected: 22:14 ACDT
Device: LAPTOP-PS002 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Accessed SIEM dashboard — IR-2024-0847 status view.

Alex's note: Priya doing a quick check-in. Normal.`,
    actions: [
      {
        id: 'investigate-vpn-priya',
        label: 'Investigate VPN session',
        cost: 1,
        description: 'Pull detailed session logs for Priya Sharma',
        notification: 'VPN session investigation requested — Marcus Chen',
        logMessage: 'Requested VPN session analysis for priya.sharma',
        logType: 'investigation'
      }
    ]
  },
  {
    id: 'L-2013',
    severity: 'low',
    title: 'After-hours VPN: Rachel Torres (Infrastructure)',
    timestamp: '2024-10-14T22:32:08',
    source: '101.164.22.73',
    target: 'vpn-gateway',
    user: 'rachel.torres@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    details: `After-hours VPN connection detected.

User: rachel.torres@xyzpay.com.au (Infrastructure Lead)
Source IP: 101.164.22.73 (Adelaide, AU — Internode residential)
VPN Assigned: 10.1.100.18
Connected: 22:32 ACDT
Device: LAPTOP-RT001 (enrolled, corporate-owned)
MFA: Authenticator App

Activity: Accessed infrastructure monitoring dashboard.

Alex's note: Rachel checking system health. She's on the approved after-hours list.`,
    actions: [
      {
        id: 'investigate-vpn-rachel',
        label: 'Investigate VPN session',
        cost: 1,
        description: 'Pull detailed session logs for Rachel Torres',
        notification: 'VPN session investigation requested — Priya Sharma',
        logMessage: 'Requested VPN session analysis for rachel.torres',
        logType: 'investigation'
      }
    ]
  },

  // ============================================
  // STORY ALERT — svc_backup_admin scheduled task (medium)
  // This is the key investigable alert. Rachel's team investigates
  // and deactivates the account, preventing the 17:00 exfiltration.
  // ============================================
  {
    id: 'M-2520',
    severity: 'medium',
    title: 'New scheduled task: DB-PROD-01',
    timestamp: '2024-10-15T06:07:14',
    source: '103.2.117.8',
    target: 'db-srv-01',
    user: 'svc_backup_admin@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    notification: {
      message: 'Flagged alert: New scheduled task on production database',
      type: 'warning'
    },
    details: `New scheduled task registered on production database server.

User: svc_backup_admin@xyzpay.com.au (service account)
Source IP: 103.2.117.8 (Adelaide, AU — Superloop)
Target: db-srv-01 (DB-PROD-01)
Task Name: system_maintenance_daily
Schedule: Daily at 17:00 ACDT
Created: 06:07 ACDT

Task created during standard backup completion window (backups finished at 06:00).

Alex's note: Came in right as the morning backups were finishing. Probably a backup-related job but I don't recognise the name or the service account. Could be something Rachel's team set up. Flagging for review.`,
    actions: [
      {
        id: 'investigate-scheduled-task',
        label: 'Investigate scheduled task',
        cost: 2,
        description: 'Request Infrastructure team to investigate the task and service account',
        notification: 'Investigation request sent to Rachel Torres (Infrastructure)',
        logMessage: 'Requested Infrastructure team investigate scheduled task on DB-PROD-01',
        logType: 'investigation'
      }
    ]
  },

  // ============================================
  // ADDITIONAL NOISE — Appears during session
  // ============================================
  {
    id: 'L-2030',
    severity: 'low',
    title: 'Disk space warning',
    timestamp: '2024-10-15T08:12:00',
    source: 'monitoring',
    target: 'log-archive-02',
    status: 'open',
    visibleAt: 600,
    details: `Disk space threshold warning.

Server: log-archive-02
Partition: /var/log/archive
Usage: 82% (1.64 TB / 2 TB)
Threshold: 75%

Log volume increased due to active incident (IR-2024-0847) generating additional audit logs.

Logs older than 90 days are automatically purged weekly (next run: Sunday 02:00).

Low priority — monitor only.`,
    actions: []
  },
  {
    id: 'M-2530',
    severity: 'medium',
    title: 'Multiple password resets',
    timestamp: '2024-10-15T08:15:00',
    source: 'identity-mgmt',
    target: 'active-directory',
    status: 'open',
    visibleAt: 900,
    details: `Multiple password reset requests detected.

Source: Self-Service Password Portal
Count: 4 password resets in 10 minutes
Users affected:
- david.chen@xyzpay.com.au
- nadia.khoury@xyzpay.com.au
- 2 others (routine Monday morning resets)

Note: David Chen and Nadia Khoury have submitted tickets to the SOC regarding potential account compromise. Their password resets may be related.

Recommend: Review in context of service tickets.`,
    actions: []
  },
  {
    id: 'I-2031',
    severity: 'info',
    title: 'Firewall rule change detected',
    timestamp: '2024-10-15T08:20:00',
    source: 'fw-monitor',
    target: 'fw-edge-01',
    status: 'open',
    visibleAt: 1200,
    details: `Firewall configuration change detected.

Device: fw-edge-01
Change: Updated block rule for 103.42.91.17 (attacker IP from Session 1)
Changed by: rachel.torres@xyzpay.com.au
Change ticket: CHG-4523

Rule extended to include additional subnet blocking per IR-2024-0847 containment actions.

Informational — approved change.`,
    actions: []
  },
  {
    id: 'L-2032',
    severity: 'low',
    title: 'Service health check failed',
    timestamp: '2024-10-15T08:35:00',
    source: 'healthcheck',
    target: 'print-server-02',
    status: 'open',
    visibleAt: 1800,
    details: `Service health check failure.

Server: print-server-02
Service: Print Spooler
Status: Not responding
Last successful check: 08:22 ACDT

This is a secondary print server. Primary print-server-01 is operational. IT Service Desk has been notified (INC-8834).

Low priority — redundant service.`,
    actions: []
  }
]
