// Session 2 system logs
// Covers Saturday–Tuesday: vishing logins (David, Nadia), Tom's legit MFA re-enrollment, Sandra's hidden compromise,
// svc_backup_admin activity, Monday afternoon/evening, Tuesday morning noise

export default [

  // ============================================
  // MONDAY 14th October — Tom Bradshaw legit MFA re-enrollment
  // He called IT himself to set up authenticator on his new phone.
  // NOT compromised — noise that looks like signal.
  // ============================================

  { id: 'LOG-2000', timestamp: '2024-10-14T09:12:33', system: 'ad-server', type: 'admin', severity: 'info',
    source: '10.1.50.44', user: 'svc_helpdesk@xyzpay.com.au', action: 'mfa_reset',
    message: 'MFA token re-enrolled', details: 'Target: tom.bradshaw@xyzpay.com.au, Reason: New device enrollment, Authorized by: IT Service Desk' },
  { id: 'LOG-2001', timestamp: '2024-10-14T09:15:08', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.44', user: 'tom.bradshaw@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App (new enrollment), Device: DESKTOP-TB002, Location: Adelaide Office' },

  // ============================================
  // SATURDAY 12th October — Vishing logins
  // ============================================

  // David Chen — compromised Saturday 14:23 (brief session, no recon)
  { id: 'LOG-2003', timestamp: '2024-10-12T14:23:44', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '198.54.131.152', user: 'david.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Dallas, US (Namecheap)' },
  { id: 'LOG-2004', timestamp: '2024-10-12T14:24:18', system: 'email-gateway', type: 'email', severity: 'info',
    source: '198.54.131.152', user: 'david.chen@xyzpay.com.au', action: 'email_sync',
    message: 'Email client synchronized', details: 'Messages synced: 8' },
  { id: 'LOG-2005', timestamp: '2024-10-12T14:26:51', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '198.54.131.152', user: 'david.chen@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 3m 7s' },

  // Saturday noise — legitimate weekend activity
  { id: 'LOG-2010', timestamp: '2024-10-12T09:00:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_start',
    message: 'Saturday incremental backup started', details: 'Type: Incremental, Target: All systems' },
  { id: 'LOG-2011', timestamp: '2024-10-12T10:15:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_complete',
    message: 'Saturday incremental backup completed', details: 'Duration: 1h 15m, Size: 340GB' },
  { id: 'LOG-2012', timestamp: '2024-10-12T14:00:01', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_etl_daily', action: 'query_executed',
    message: 'Scheduled ETL job executed', details: 'Table: transactions, Rows processed: 38,412' },

  // ============================================
  // SUNDAY 13th October — Nadia vishing + existing Session 1 overlap
  // ============================================

  // Nadia Khoury — compromised Sunday 09:15 (brief session, no recon)
  { id: 'LOG-2020', timestamp: '2024-10-13T09:15:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '185.220.101.48', user: 'nadia.khoury@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Amsterdam, NL (ZAVOD)' },
  { id: 'LOG-2021', timestamp: '2024-10-13T09:16:05', system: 'email-gateway', type: 'email', severity: 'info',
    source: '185.220.101.48', user: 'nadia.khoury@xyzpay.com.au', action: 'email_sync',
    message: 'Email client synchronized', details: 'Messages synced: 3' },
  { id: 'LOG-2022', timestamp: '2024-10-13T09:17:41', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '185.220.101.48', user: 'nadia.khoury@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/marketing/brand-guidelines' },
  { id: 'LOG-2023', timestamp: '2024-10-13T09:20:18', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '185.220.101.48', user: 'nadia.khoury@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 4m 56s' },

  // ============================================
  // SANDRA LEIGH — Hidden compromise (different IPs, no overlap)
  // ============================================

  // Sandra compromised ~1 week ago. Attacker uses her account for recon.
  // IP: 45.32.198.41 (Singapore, Vultr) — used Oct 7–11
  { id: 'LOG-2030', timestamp: '2024-10-07T22:14:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Singapore (Vultr)' },
  { id: 'LOG-2031', timestamp: '2024-10-07T22:16:02', system: 'hr-portal', type: 'access', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'page_view',
    message: 'Accessed Employee Directory', details: 'Viewed: /directory/all-employees' },
  { id: 'LOG-2032', timestamp: '2024-10-07T22:22:45', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'search',
    message: 'Wiki search performed', details: 'Query: "org chart executive team"' },
  { id: 'LOG-2033', timestamp: '2024-10-07T22:31:11', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 16m 38s' },

  // Sandra — attacker exploration (Oct 9)
  { id: 'LOG-2034', timestamp: '2024-10-09T23:05:17', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Singapore (Vultr)' },
  { id: 'LOG-2035', timestamp: '2024-10-09T23:07:44', system: 'finance-system', type: 'access', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'report_view',
    message: 'Financial dashboard accessed', details: 'View: Budget Allocation — IT Security' },
  { id: 'LOG-2036', timestamp: '2024-10-09T23:12:33', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/it-support/service-accounts' },
  { id: 'LOG-2037', timestamp: '2024-10-09T23:18:55', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 13m 38s' },

  // Sandra — svc_backup_admin creation (Oct 11, Friday)
  { id: 'LOG-2038', timestamp: '2024-10-11T21:42:08', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Singapore (Vultr)' },
  { id: 'LOG-2039', timestamp: '2024-10-11T21:44:22', system: 'ad-server', type: 'admin', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'account_create',
    message: 'New service account created', details: 'Account: svc_backup_admin, Type: Service Account, OU: Service Accounts' },
  { id: 'LOG-2040', timestamp: '2024-10-11T21:46:15', system: 'ad-server', type: 'admin', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'group_add',
    message: 'Account added to security group', details: 'Account: svc_backup_admin, Group: Database-Admins' },
  { id: 'LOG-2041', timestamp: '2024-10-11T21:50:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '45.32.198.41', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 8m 25s' },

  // ============================================
  // MONDAY 14th — Afternoon/Evening (post-Session 1)
  // ============================================

  // Marcus sends security advisory at 14:00
  { id: 'LOG-2050', timestamp: '2024-10-14T14:00:15', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'marcus.chen@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: all-staff@xyzpay.com.au, Subject: "IMPORTANT: Security Alert — Suspicious IT Calls"' },

  // Sandra legitimate login Monday morning (for contrast)
  { id: 'LOG-2055', timestamp: '2024-10-14T07:48:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.200', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-SL001, Location: Adelaide Office' },
  { id: 'LOG-2056', timestamp: '2024-10-14T07:50:33', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.200', user: 'sandra.leigh@xyzpay.com.au', action: 'report_view',
    message: 'Financial dashboard accessed', details: 'View: Daily Cash Position' },
  { id: 'LOG-2057', timestamp: '2024-10-14T12:15:00', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'sandra.leigh@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: exec-team@xyzpay.com.au, Subject: "Q3 budget review — please confirm attendance"' },
  { id: 'LOG-2058', timestamp: '2024-10-14T17:02:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.200', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 9h 13m' },

  // James Okoro overtime work (Monday evening)
  { id: 'LOG-2060', timestamp: '2024-10-14T17:30:22', system: 'siem', type: 'access', severity: 'info',
    source: '10.1.50.67', user: 'james.wilson@xyzpay.com.au', action: 'dashboard_view',
    message: 'SIEM dashboard accessed', details: 'View: IR-2024-0847 Investigation' },
  { id: 'LOG-2061', timestamp: '2024-10-14T19:15:00', system: 'customer-db', type: 'database', severity: 'info',
    source: '10.1.50.67', user: 'james.wilson@xyzpay.com.au', action: 'query_executed',
    message: 'Database query executed', details: 'Table: customers, Query type: SELECT, Cross-reference query, Rows: 2,847' },
  { id: 'LOG-2062', timestamp: '2024-10-14T22:30:44', system: 'file-share', type: 'access', severity: 'info',
    source: '10.1.50.67', user: 'james.wilson@xyzpay.com.au', action: 'file_upload',
    message: 'File uploaded', details: 'Path: /soc-shared/IR-2024-0847/Customer_Impact_Assessment_CONFIDENTIAL.pdf, Size: 2.4MB' },

  // ============================================
  // MONDAY NIGHT — Sandra attacker activity (different IP)
  // IP: 167.172.62.94 (US, DigitalOcean) — escalation phase
  // ============================================

  // Alex Anderson arrives for night shift
  { id: 'LOG-2070', timestamp: '2024-10-14T22:00:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.101', user: 'alex.anderson@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-AA001, Location: Adelaide Office' },

  // Sandra attacker — places right_0ff calling card on file share
  { id: 'LOG-2071', timestamp: '2024-10-14T22:04:11', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: New York, US (DigitalOcean)' },
  { id: 'LOG-2072', timestamp: '2024-10-14T22:06:33', system: 'file-share', type: 'access', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'file_upload',
    message: 'File uploaded', details: 'Path: /company-shared/right_0ff_manifesto.txt, Size: 14KB' },
  { id: 'LOG-2073', timestamp: '2024-10-14T22:08:45', system: 'file-share', type: 'access', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'file_upload',
    message: 'File uploaded', details: 'Path: /company-shared/right_0ff_data_sample.csv, Size: 847KB' },
  { id: 'LOG-2074', timestamp: '2024-10-14T22:12:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 7m 49s' },

  // ============================================
  // TUESDAY 15th October — Early hours (attacker activity)
  // ============================================

  // Sandra attacker — PII database recon (01:00)
  { id: 'LOG-2080', timestamp: '2024-10-15T01:02:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: New York, US (DigitalOcean)' },
  { id: 'LOG-2081', timestamp: '2024-10-15T01:04:15', system: 'customer-db', type: 'access', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'access_denied',
    message: 'Database access denied — insufficient privileges', details: 'Database: pii_vault, Action: SELECT, Reason: Role not authorised' },
  { id: 'LOG-2082', timestamp: '2024-10-15T01:06:44', system: 'ad-server', type: 'access', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'group_query',
    message: 'Security group membership queried', details: 'Group: PII-Database-Access, Members returned: 4' },
  { id: 'LOG-2083', timestamp: '2024-10-15T01:12:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'sandra.leigh@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 9m 49s' },

  // svc_backup_admin — scheduled task creation (02:00)
  { id: 'LOG-2085', timestamp: '2024-10-15T02:00:08', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'svc_backup_admin@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'Service account login, Location: New York, US (DigitalOcean)' },
  { id: 'LOG-2086', timestamp: '2024-10-15T02:02:15', system: 'customer-db', type: 'admin', severity: 'info',
    source: '167.172.62.94', user: 'svc_backup_admin@xyzpay.com.au', action: 'task_create',
    message: 'Scheduled task created', details: 'Task: system_maintenance_daily, Schedule: Daily 02:00, Target: db-srv-01' },
  { id: 'LOG-2087', timestamp: '2024-10-15T02:04:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '167.172.62.94', user: 'svc_backup_admin@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 4m 25s' },

  // ============================================
  // TUESDAY MORNING — Legitimate activity (noise)
  // ============================================

  // Nightly jobs
  { id: 'LOG-2090', timestamp: '2024-10-15T02:00:00', system: 'ad-server', type: 'system', severity: 'info',
    source: 'dc-01.xyzpay.local', user: 'SYSTEM', action: 'maintenance',
    message: 'AD maintenance window started', details: 'Tasks: Group policy update, Schema check' },
  { id: 'LOG-2091', timestamp: '2024-10-15T02:45:00', system: 'ad-server', type: 'system', severity: 'info',
    source: 'dc-01.xyzpay.local', user: 'SYSTEM', action: 'maintenance_complete',
    message: 'AD maintenance window completed', details: 'Duration: 45m, Status: Success' },
  { id: 'LOG-2092', timestamp: '2024-10-15T03:00:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_maintenance', action: 'index_rebuild',
    message: 'Database index rebuild started', details: 'Tables: customers, transactions, orders' },
  { id: 'LOG-2093', timestamp: '2024-10-15T04:30:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_maintenance', action: 'index_rebuild_complete',
    message: 'Database index rebuild completed', details: 'Duration: 1h 30m, Tables: 3' },
  { id: 'LOG-2094', timestamp: '2024-10-15T05:00:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_verify',
    message: 'Backup verification started', details: 'Verifying Monday incremental backup' },
  { id: 'LOG-2095', timestamp: '2024-10-15T05:30:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_verify_complete',
    message: 'Backup verification completed', details: 'Status: All checksums valid' },
  { id: 'LOG-2096', timestamp: '2024-10-15T06:00:00', system: 'antivirus', type: 'system', severity: 'info',
    source: 'av-mgmt-01', user: 'SYSTEM', action: 'signature_update',
    message: 'Antivirus signatures updated', details: 'Version: 2024.10.15.001' },

  // Tuesday morning — staff logins
  { id: 'LOG-2100', timestamp: '2024-10-15T07:30:05', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.101', user: 'priya.sharma@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-PS001, Location: Adelaide Office' },
  { id: 'LOG-2101', timestamp: '2024-10-15T07:32:15', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Home Office, Duration: Active' },
  { id: 'LOG-2102', timestamp: '2024-10-15T07:33:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-MC001' },
  { id: 'LOG-2103', timestamp: '2024-10-15T07:45:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.200', user: 'sandra.leigh@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-SL001, Location: Adelaide Office' },
  { id: 'LOG-2104', timestamp: '2024-10-15T07:50:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.78', user: 'david.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-DC001, Location: Adelaide Office' },
  { id: 'LOG-2105', timestamp: '2024-10-15T07:52:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.92', user: 'nadia.khoury@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-NK001, Location: Adelaide Office' },
  { id: 'LOG-2106', timestamp: '2024-10-15T07:55:45', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.56', user: 'kevin.smith@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-KS001' },
  { id: 'LOG-2107', timestamp: '2024-10-15T07:56:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.112', user: 'anika.patel@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-AP001' },
  { id: 'LOG-2108', timestamp: '2024-10-15T07:58:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.34', user: 'lisa.park@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-LP001' },
  { id: 'LOG-2109', timestamp: '2024-10-15T07:58:44', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.88', user: 'daniel.kim@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-DK001' },
  { id: 'LOG-2110', timestamp: '2024-10-15T07:59:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-RT001' },
  { id: 'LOG-2111', timestamp: '2024-10-15T08:00:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.23', user: 'jenny.marcos@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-JM001' },
  { id: 'LOG-2112', timestamp: '2024-10-15T08:01:55', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.44', user: 'tom.bradshaw@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-TB002, Location: Adelaide Office' },

  // Tuesday morning — system activity
  { id: 'LOG-2120', timestamp: '2024-10-15T07:00:01', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'connection_pool',
    message: 'Connection pool initialized', details: 'Pool size: 25, Database: customer_prod' },
  { id: 'LOG-2121', timestamp: '2024-10-15T07:00:02', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-02', user: 'svc_billing', action: 'connection_pool',
    message: 'Connection pool initialized', details: 'Pool size: 15, Database: billing_prod' },
  { id: 'LOG-2122', timestamp: '2024-10-15T07:15:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'report-srv-01', user: 'svc_reporting', action: 'query_executed',
    message: 'Morning report query executed', details: 'Report: Daily Transaction Summary, Rows: 3,892' },
  { id: 'LOG-2123', timestamp: '2024-10-15T07:30:15', system: 'email-gateway', type: 'system', severity: 'info',
    source: 'mail-gw-01', user: 'SYSTEM', action: 'spam_filter',
    message: 'Spam filter updated', details: 'Blocked 1,532 messages overnight' },

  // Credential stuffing continuation (background noise)
  { id: 'LOG-2130', timestamp: '2024-10-15T03:22:01', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'random2024@gmail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-2131', timestamp: '2024-10-15T03:22:02', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'testuser@yahoo.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-2132', timestamp: '2024-10-15T04:15:03', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'admin123@outlook.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-2133', timestamp: '2024-10-15T04:15:04', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'user2024@mail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-2134', timestamp: '2024-10-15T05:30:01', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '194.26.192.71', user: 'qwerty123@test.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },

  // Firewall logs
  { id: 'LOG-2140', timestamp: '2024-10-15T03:22:33', system: 'firewall', type: 'network', severity: 'low',
    source: '185.220.101.42', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-2141', timestamp: '2024-10-15T04:15:45', system: 'firewall', type: 'network', severity: 'low',
    source: '91.240.118.29', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  // Note: 103.42.91.17 blocked since Monday 11:30
  { id: 'LOG-2142', timestamp: '2024-10-15T06:10:22', system: 'firewall', type: 'network', severity: 'info',
    source: '103.42.91.17', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - IP on blocklist', details: 'Blocked per IR-2024-0847 containment action' },

  // Alex Anderson night shift activity
  { id: 'LOG-2150', timestamp: '2024-10-14T22:05:00', system: 'siem', type: 'access', severity: 'info',
    source: '10.1.50.101', user: 'alex.anderson@xyzpay.com.au', action: 'dashboard_view',
    message: 'SIEM dashboard accessed', details: 'View: Overnight Alert Summary' },
  { id: 'LOG-2151', timestamp: '2024-10-15T06:00:00', system: 'siem', type: 'access', severity: 'info',
    source: '10.1.50.101', user: 'alex.anderson@xyzpay.com.au', action: 'dashboard_view',
    message: 'SIEM dashboard accessed', details: 'View: End of Shift Summary' },
  { id: 'LOG-2152', timestamp: '2024-10-15T06:30:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.101', user: 'alex.anderson@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 8h 30m' },

  // Email activity — Tuesday morning
  { id: 'LOG-2160', timestamp: '2024-10-15T07:35:22', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'priya.sharma@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: soc-team@xyzpay.com.au, Subject: "URGENT: Shift briefing — read before starting"' },
  { id: 'LOG-2161', timestamp: '2024-10-15T07:45:00', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'external', user: 'noreply@linkedin.com', action: 'email_delivered',
    message: 'Email delivered', details: 'To: multiple@xyzpay.com.au, Subject: "Your weekly job alerts"' },
  { id: 'LOG-2162', timestamp: '2024-10-15T07:52:11', system: 'email-gateway', type: 'email', severity: 'low',
    source: 'external', user: 'verify@secure-banking.com', action: 'email_quarantined',
    message: 'Email quarantined - suspected phishing', details: 'To: all-staff@xyzpay.com.au, Subject: "Verify your banking credentials"' }
]
