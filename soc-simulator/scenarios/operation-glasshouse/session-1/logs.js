// System logs for Session 1
// Mix of routine noise, credential stuffing attempts, and the real attack indicators

export default [
  
  // ============================================
  // HISTORICAL LOGS - Sunday 13th October 2024
  // ============================================
  
  // Sunday morning - light activity
  { id: 'LOG-1000', timestamp: '2024-10-13T08:15:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_start',
    message: 'Weekly full backup started', details: 'Type: Full, Target: All systems' },
  { id: 'LOG-1001', timestamp: '2024-10-13T09:22:14', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-MC001, Location: Home Office' },
  { id: 'LOG-1002', timestamp: '2024-10-13T09:25:33', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/security/quarterly-review-notes' },
  { id: 'LOG-1003', timestamp: '2024-10-13T10:45:00', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'marcus.chen@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: board@xyzpay.com.au, Subject: "Security metrics Q3 - draft"' },
  { id: 'LOG-1004', timestamp: '2024-10-13T11:30:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'logout',
    message: 'User logged out', details: 'Session duration: 2h 8m' },
  
  // Sunday morning - Anika vishing attempt (attacker tests credentials, hits MFA, then calls her)
  { id: 'LOG-1005', timestamp: '2024-10-13T09:47:33', system: 'internal-sso', type: 'auth', severity: 'medium',
    source: '103.42.91.17', user: 'anika.patel@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - MFA challenge not completed', details: 'Password correct, MFA timeout after 60s' },
  
  // Sunday afternoon - minimal activity
  { id: 'LOG-1010', timestamp: '2024-10-13T14:00:01', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_etl_daily', action: 'query_executed',
    message: 'Scheduled ETL job executed', details: 'Table: transactions, Rows processed: 45,221' },
  { id: 'LOG-1011', timestamp: '2024-10-13T14:05:33', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_reporting', action: 'query_executed',
    message: 'Weekly report query executed', details: 'Report: Customer Activity Summary, Rows: 12,847' },
  { id: 'LOG-1012', timestamp: '2024-10-13T15:30:00', system: 'antivirus', type: 'system', severity: 'info',
    source: 'av-mgmt-01', user: 'SYSTEM', action: 'scan_complete',
    message: 'Scheduled full scan completed', details: 'Scanned: 1,247,832 files, Threats: 0' },
  
  // Sunday evening - nightly jobs begin
  { id: 'LOG-1020', timestamp: '2024-10-13T18:00:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_backup', action: 'backup_start',
    message: 'Database backup started', details: 'Type: Differential, Database: customer_prod' },
  { id: 'LOG-1021', timestamp: '2024-10-13T18:45:22', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_backup', action: 'backup_complete',
    message: 'Database backup completed', details: 'Size: 45.2GB, Duration: 45m 22s' },
  { id: 'LOG-1022', timestamp: '2024-10-13T19:00:00', system: 'email-gateway', type: 'system', severity: 'info',
    source: 'mail-gw-01', user: 'SYSTEM', action: 'maintenance',
    message: 'Email queue maintenance completed', details: 'Purged: 2,847 expired messages' },
  
  // Sunday night - maintenance window
  { id: 'LOG-1030', timestamp: '2024-10-13T22:00:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_complete',
    message: 'Weekly full backup completed', details: 'Duration: 13h 45m, Size: 2.8TB, Status: Success' },
  { id: 'LOG-1031', timestamp: '2024-10-13T23:00:00', system: 'patch-server', type: 'system', severity: 'info',
    source: 'wsus-01', user: 'SYSTEM', action: 'patch_scan',
    message: 'Patch compliance scan started', details: 'Target: All Windows servers' },
  { id: 'LOG-1032', timestamp: '2024-10-13T23:30:15', system: 'patch-server', type: 'system', severity: 'info',
    source: 'wsus-01', user: 'SYSTEM', action: 'patch_scan_complete',
    message: 'Patch compliance scan completed', details: 'Compliant: 47/52 systems, Pending: 5' },
  
  // Early Monday morning - 2am maintenance
  { id: 'LOG-1040', timestamp: '2024-10-14T02:00:00', system: 'ad-server', type: 'system', severity: 'info',
    source: 'dc-01.xyzpay.local', user: 'SYSTEM', action: 'maintenance',
    message: 'AD maintenance window started', details: 'Tasks: Group policy update, Schema check' },
  { id: 'LOG-1041', timestamp: '2024-10-14T02:15:00', system: 'patch-server', type: 'system', severity: 'info',
    source: 'wsus-01', user: 'SYSTEM', action: 'patch_install',
    message: 'Security patches installed', details: 'KB5031356, KB5031364 applied to 5 servers' },
  { id: 'LOG-1042', timestamp: '2024-10-14T02:45:00', system: 'ad-server', type: 'system', severity: 'info',
    source: 'dc-01.xyzpay.local', user: 'SYSTEM', action: 'maintenance_complete',
    message: 'AD maintenance window completed', details: 'Duration: 45m, Status: Success' },
  { id: 'LOG-1043', timestamp: '2024-10-14T03:00:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_maintenance', action: 'index_rebuild',
    message: 'Database index rebuild started', details: 'Tables: customers, transactions, orders' },
  { id: 'LOG-1044', timestamp: '2024-10-14T04:30:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_maintenance', action: 'index_rebuild_complete',
    message: 'Database index rebuild completed', details: 'Duration: 1h 30m, Tables: 3' },
  
  // Early Monday - 5am onwards
  { id: 'LOG-1050', timestamp: '2024-10-14T05:00:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_verify',
    message: 'Backup verification started', details: 'Verifying Sunday full backup' },
  { id: 'LOG-1051', timestamp: '2024-10-14T05:30:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_verify_complete',
    message: 'Backup verification completed', details: 'Status: All checksums valid' },
  { id: 'LOG-1052', timestamp: '2024-10-14T05:45:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_etl_daily', action: 'query_executed',
    message: 'Daily ETL job started', details: 'Source: staging, Target: data_warehouse' },
  { id: 'LOG-1053', timestamp: '2024-10-14T06:15:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'db-srv-01', user: 'svc_etl_daily', action: 'query_executed',
    message: 'Daily ETL job completed', details: 'Rows processed: 127,445, Duration: 30m' },
  
  // ============================================
  // MONDAY MORNING - Pre-office hours (6am-7:30am)
  // ============================================
  
  { id: 'LOG-0100', timestamp: '2024-10-14T06:00:00', system: 'backup-server', type: 'system', severity: 'info',
    source: 'backup-srv-01', user: 'SYSTEM', action: 'backup_complete',
    message: 'Nightly backup completed successfully', details: 'Duration: 2h 34m, Size: 1.2TB' },
  { id: 'LOG-0101', timestamp: '2024-10-14T06:15:22', system: 'ad-server', type: 'system', severity: 'info',
    source: 'dc-01.xyzpay.local', user: 'SYSTEM', action: 'replication',
    message: 'AD replication completed', details: 'Replicated with dc-02.xyzpay.local' },
  { id: 'LOG-0102', timestamp: '2024-10-14T07:00:00', system: 'antivirus', type: 'system', severity: 'info',
    source: 'av-mgmt-01', user: 'SYSTEM', action: 'signature_update',
    message: 'Antivirus signatures updated', details: 'Version: 2024.10.14.001' },
  { id: 'LOG-0103', timestamp: '2024-10-14T07:30:15', system: 'email-gateway', type: 'system', severity: 'info',
    source: 'mail-gw-01', user: 'SYSTEM', action: 'spam_filter',
    message: 'Spam filter updated', details: 'Blocked 1,247 messages overnight' },
  
  // Database service accounts - normal morning activity
  { id: 'LOG-0104', timestamp: '2024-10-14T07:00:01', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'connection_pool',
    message: 'Connection pool initialized', details: 'Pool size: 25, Database: customer_prod' },
  { id: 'LOG-0105', timestamp: '2024-10-14T07:00:02', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-02', user: 'svc_billing', action: 'connection_pool',
    message: 'Connection pool initialized', details: 'Pool size: 15, Database: billing_prod' },
  { id: 'LOG-0106', timestamp: '2024-10-14T07:15:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'report-srv-01', user: 'svc_reporting', action: 'query_executed',
    message: 'Morning report query executed', details: 'Report: Daily Transaction Summary, Rows: 3,421' },
  
  // ============================================
  // MONDAY MORNING - Early bird logins (7:30am-7:55am)
  // ============================================
  
  // Marcus (CISO) - early starter
  { id: 'LOG-0110', timestamp: '2024-10-14T07:32:15', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Home Office, Duration: Active' },
  { id: 'LOG-0111', timestamp: '2024-10-14T07:33:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-MC001' },
  { id: 'LOG-0112', timestamp: '2024-10-14T07:35:44', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'marcus.chen@xyzpay.com.au', action: 'email_sync',
    message: 'Email client synchronized', details: 'Messages synced: 47' },
  
  // Priya (SOC Lead) - also early
  { id: 'LOG-0115', timestamp: '2024-10-14T07:38:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.101', user: 'priya.sharma@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-PS001' },
  { id: 'LOG-0116', timestamp: '2024-10-14T07:40:15', system: 'siem', type: 'access', severity: 'info',
    source: '10.1.50.101', user: 'priya.sharma@xyzpay.com.au', action: 'dashboard_view',
    message: 'SIEM dashboard accessed', details: 'View: Overnight Alert Summary' },
  
  // CFO - checking weekend numbers
  { id: 'LOG-0118', timestamp: '2024-10-14T07:42:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.200', user: 'david.wong@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-DW001' },
  { id: 'LOG-0119', timestamp: '2024-10-14T07:44:33', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.200', user: 'david.wong@xyzpay.com.au', action: 'report_view',
    message: 'Financial dashboard accessed', details: 'View: Weekend Transaction Summary' },
  
  // IT Manager
  { id: 'LOG-0120', timestamp: '2024-10-14T07:45:00', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.150', user: 'sarah.mitchell@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-SM001' },
  { id: 'LOG-0121', timestamp: '2024-10-14T07:46:22', system: 'monitoring', type: 'access', severity: 'info',
    source: '10.1.50.150', user: 'sarah.mitchell@xyzpay.com.au', action: 'dashboard_view',
    message: 'System monitoring dashboard accessed', details: 'View: Infrastructure Health' },
  
  // ============================================
  // MONDAY MORNING - First login surge (7:55am-8:05am)
  // ============================================
  
  // Liam's LEGITIMATE login from office
  { id: 'LOG-0060', timestamp: '2024-10-14T07:56:12', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-LF001, Location: Adelaide Office' },
  
  // Other staff arriving
  { id: 'LOG-0125', timestamp: '2024-10-14T07:55:45', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.78', user: 'tom.bradley@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-TB001' },
  { id: 'LOG-0126', timestamp: '2024-10-14T07:56:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.92', user: 'michelle.nguyen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-MN001' },
  { id: 'LOG-0127', timestamp: '2024-10-14T07:57:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.56', user: 'kevin.smith@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-KS001' },
  { id: 'LOG-0128', timestamp: '2024-10-14T07:58:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.34', user: 'lisa.park@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-LP001' },
  { id: 'LOG-0129', timestamp: '2024-10-14T07:58:44', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.112', user: 'anika.patel@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-AP001' },
  { id: 'LOG-0130', timestamp: '2024-10-14T07:59:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.67', user: 'james.wilson@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-JW001' },
  { id: 'LOG-0131', timestamp: '2024-10-14T07:59:55', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-RT001' },
  { id: 'LOG-0132', timestamp: '2024-10-14T08:00:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.23', user: 'jenny.marcos@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-JM001' },
  { id: 'LOG-0133', timestamp: '2024-10-14T08:01:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.88', user: 'daniel.kim@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-DK001' },
  { id: 'LOG-0134', timestamp: '2024-10-14T08:02:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.71', user: 'emma.johnson@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-EJ001' },
  { id: 'LOG-0135', timestamp: '2024-10-14T08:03:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.99', user: 'andrew.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-AC001' },
  
  // Failed login attempts (normal typos)
  { id: 'LOG-0136', timestamp: '2024-10-14T07:57:45', system: 'internal-sso', type: 'auth', severity: 'low',
    source: '10.1.50.56', user: 'kevin.smith@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - incorrect password', details: 'Attempt 1 of 3' },
  { id: 'LOG-0137', timestamp: '2024-10-14T08:01:55', system: 'internal-sso', type: 'auth', severity: 'low',
    source: '10.1.50.88', user: 'daniel.kim@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - MFA timeout', details: 'Push notification expired' },
  
  // ============================================
  // CREDENTIAL STUFFING (background noise - customer portal)
  // ============================================
  
  { id: 'LOG-0400', timestamp: '2024-10-14T07:50:01', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'mike.jones@email.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0401', timestamp: '2024-10-14T07:50:02', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'sarah.wilson@mail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0402', timestamp: '2024-10-14T07:50:03', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'david.brown@yahoo.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0403', timestamp: '2024-10-14T07:50:04', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'emma.taylor@gmail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0404', timestamp: '2024-10-14T07:50:05', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'james.miller@outlook.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0001', timestamp: '2024-10-14T08:01:23', system: 'customer-portal', type: 'auth', severity: 'low', 
    source: '185.220.101.42', user: 'random_user_1@gmail.com', action: 'login_failed', 
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0002', timestamp: '2024-10-14T08:01:24', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'test123@yahoo.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0003', timestamp: '2024-10-14T08:01:25', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '185.220.101.42', user: 'admin@company.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0004', timestamp: '2024-10-14T08:01:26', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'john.smith@outlook.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0005', timestamp: '2024-10-14T08:01:27', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '91.240.118.29', user: 'user2024@gmail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0020', timestamp: '2024-10-14T08:30:01', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '194.26.192.71', user: 'password123@test.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
  { id: 'LOG-0021', timestamp: '2024-10-14T08:30:02', system: 'customer-portal', type: 'auth', severity: 'low',
    source: '194.26.192.71', user: 'qwerty@mail.com', action: 'login_failed',
    message: 'Authentication failed - invalid credentials', details: 'Automated attempt detected' },
    
  // ⚠️ THE REAL ATTACK - Liam's compromised account (Monday morning)
  { id: 'LOG-0050', timestamp: '2024-10-14T07:52:22', system: 'internal-sso', type: 'auth', severity: 'medium',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: Unknown, Location: Indonesia (VPN)' },
  { id: 'LOG-0051', timestamp: '2024-10-14T07:54:45', system: 'hr-portal', type: 'access', severity: 'info',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Accessed Employee Directory', details: 'Viewed: /directory/all-employees' },
  { id: 'LOG-0052', timestamp: '2024-10-14T07:56:33', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'search',
    message: 'Wiki search performed', details: 'Query: "org chart"' },
  { id: 'LOG-0053', timestamp: '2024-10-14T08:01:11', system: 'hr-portal', type: 'access', severity: 'info',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Accessed HR Portal - Own Profile', details: 'Viewed: /profile/liam.fitzgerald' },
  { id: 'LOG-0054', timestamp: '2024-10-14T08:09:02', system: 'hr-portal', type: 'access', severity: 'low',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Accessed Finance Team Contact List', details: 'Viewed: /directory/finance' },
  { id: 'LOG-0055', timestamp: '2024-10-14T08:15:18', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Viewed IT Support Documentation', details: 'Page: /wiki/it-support/contact-procedures' },
  { id: 'LOG-0056', timestamp: '2024-10-14T08:15:44', system: 'hr-portal', type: 'access', severity: 'low',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Accessed Executive Assistant Contact Details', details: 'Viewed: /directory/executive-support' },
  // We could disable this log as it ruins the cliffhanger at the end – but it's also an opportunity for 
  // students who are paying attention to discover the true severity of the situation early.
    { id: 'LOG-0057', timestamp: '2024-10-14T08:22:00', system: 'customer-db', type: 'access', severity: 'info',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'query_executed',
    message: 'Database query executed', details: 'Table: customers, Query type: SELECT, Rows returned: 2,847' },
    
  // ============================================
  // LIAM'S LEGITIMATE ACTIVITY (from Adelaide office)
  // ============================================
  
  // Liam's genuine work - customer service tasks
  { id: 'LOG-0061', timestamp: '2024-10-14T07:58:33', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_view',
    message: 'Support ticket viewed', details: 'Ticket: #TKT-8821, Customer: Johnson Electronics' },
  { id: 'LOG-0062', timestamp: '2024-10-14T08:02:15', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_update',
    message: 'Support ticket updated', details: 'Ticket: #TKT-8821, Status: In Progress' },
  { id: 'LOG-0063', timestamp: '2024-10-14T08:05:44', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'liam.fitzgerald@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: support@johnsonelectronics.com.au, Subject: "RE: Payment query #TKT-8821"' },
  { id: 'LOG-0064', timestamp: '2024-10-14T08:12:22', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_view',
    message: 'Support ticket viewed', details: 'Ticket: #TKT-8819, Customer: Metro Supplies' },
  { id: 'LOG-0065', timestamp: '2024-10-14T08:18:55', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_update',
    message: 'Support ticket updated', details: 'Ticket: #TKT-8819, Added internal note' },
  { id: 'LOG-0066', timestamp: '2024-10-14T08:25:11', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/support/refund-procedures' },
  { id: 'LOG-0067', timestamp: '2024-10-14T08:32:00', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_view',
    message: 'Support ticket viewed', details: 'Ticket: #TKT-8824, Customer: Coastal Traders' },
  { id: 'LOG-0068', timestamp: '2024-10-14T08:38:44', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'liam.fitzgerald@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: accounts@coastaltraders.com.au, Subject: "RE: Invoice discrepancy"' },
  { id: 'LOG-0069', timestamp: '2024-10-14T08:45:22', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_close',
    message: 'Support ticket closed', details: 'Ticket: #TKT-8821, Resolution: Payment confirmed' },
  { id: 'LOG-0070', timestamp: '2024-10-14T08:52:15', system: 'crm', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_view',
    message: 'Support ticket viewed', details: 'Ticket: #TKT-8827, Customer: ABC Manufacturing' },

  // ============================================
  // FIREWALL LOGS
  // ============================================
  
  { id: 'LOG-0150', timestamp: '2024-10-14T08:02:11', system: 'firewall', type: 'network', severity: 'low',
    source: '185.220.101.42', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-0151', timestamp: '2024-10-14T08:02:45', system: 'firewall', type: 'network', severity: 'low',
    source: '91.240.118.29', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-0152', timestamp: '2024-10-14T08:31:02', system: 'firewall', type: 'network', severity: 'low',
    source: '194.26.192.71', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-0153', timestamp: '2024-10-14T07:35:00', system: 'firewall', type: 'network', severity: 'info',
    source: '10.1.50.0/24', user: null, action: 'connection_allowed',
    message: 'Outbound HTTPS traffic allowed', details: 'Destination: api.microsoft.com, Port: 443' },
  { id: 'LOG-0154', timestamp: '2024-10-14T08:15:33', system: 'firewall', type: 'network', severity: 'info',
    source: '10.1.50.0/24', user: null, action: 'connection_allowed',
    message: 'Outbound HTTPS traffic allowed', details: 'Destination: slack.com, Port: 443' },
    
  // ============================================
  // EMAIL LOGS
  // ============================================
  
  { id: 'LOG-0200', timestamp: '2024-10-14T07:45:00', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'external', user: 'noreply@linkedin.com', action: 'email_delivered',
    message: 'Email delivered', details: 'To: multiple@xyzpay.com.au, Subject: "Your weekly job alerts"' },
  { id: 'LOG-0201', timestamp: '2024-10-14T08:05:22', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'external', user: 'newsletter@retailmetrics.com.au', action: 'email_delivered',
    message: 'Email delivered', details: 'To: jenny.marcos@xyzpay.com.au, Subject: "Your weekly analytics report"' },
  { id: 'LOG-0202', timestamp: '2024-10-14T08:12:17', system: 'email-gateway', type: 'email', severity: 'low',
    source: 'external', user: 'support@amaz0n-verify.com', action: 'email_quarantined',
    message: 'Email quarantined - suspected phishing', details: 'To: all-staff@xyzpay.com.au, Subject: "Verify your account"' },
  { id: 'LOG-0203', timestamp: '2024-10-14T08:20:33', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'priya.sharma@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: soc-team@xyzpay.com.au, Subject: "Morning briefing notes"' },
  { id: 'LOG-0204', timestamp: '2024-10-14T08:35:45', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'external', user: 'invoices@xero.com', action: 'email_delivered',
    message: 'Email delivered', details: 'To: accounts@xyzpay.com.au, Subject: "Invoice #INV-2024-1847"' },
  { id: 'LOG-0205', timestamp: '2024-10-14T08:42:11', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'marcus.chen@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: exec-team@xyzpay.com.au, Subject: "Security metrics update"' },
  { id: 'LOG-0206', timestamp: '2024-10-14T08:48:00', system: 'email-gateway', type: 'email', severity: 'low',
    source: 'external', user: 'prince.nigeria@gmail.com', action: 'email_blocked',
    message: 'Email blocked - spam detected', details: 'To: info@xyzpay.com.au, Subject: "URGENT BUSINESS PROPOSAL"' },
    
  // ============================================
  // VPN LOGS
  // ============================================
  
  { id: 'LOG-0250', timestamp: '2024-10-14T08:10:45', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '118.209.33.12', user: 'james.okoro@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Home Office, Duration: Active' },
  { id: 'LOG-0251', timestamp: '2024-10-14T08:22:33', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '202.55.67.100', user: 'peter.wong@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Client Site, Duration: Active' },
  { id: 'LOG-0252', timestamp: '2024-10-14T08:45:00', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '118.209.33.12', user: 'james.okoro@xyzpay.com.au', action: 'vpn_disconnect',
    message: 'VPN connection terminated', details: 'Duration: 34m 15s, Data: 125MB' },
    
  // ============================================
  // APPLICATION LOGS
  // ============================================
  
  { id: 'LOG-0300', timestamp: '2024-10-14T07:00:01', system: 'customer-portal', type: 'application', severity: 'info',
    source: 'app-srv-01', user: 'SYSTEM', action: 'service_start',
    message: 'Application service started', details: 'Version: 4.2.1, Health: OK' },
  { id: 'LOG-0301', timestamp: '2024-10-14T07:00:02', system: 'payment-api', type: 'application', severity: 'info',
    source: 'api-srv-01', user: 'SYSTEM', action: 'service_start',
    message: 'Payment API service started', details: 'Version: 2.8.3, Health: OK' },
  { id: 'LOG-0302', timestamp: '2024-10-14T07:45:12', system: 'customer-portal', type: 'application', severity: 'warning',
    source: 'app-srv-02', user: 'SYSTEM', action: 'high_memory',
    message: 'High memory usage detected', details: 'Usage: 87%, Threshold: 85%' },
  { id: 'LOG-0303', timestamp: '2024-10-14T07:48:44', system: 'payment-api', type: 'application', severity: 'info',
    source: 'api-srv-01', user: 'SYSTEM', action: 'transaction_processed',
    message: 'Transaction batch processed', details: 'Count: 1,247, Total: $89,432.50' },
  { id: 'LOG-0304', timestamp: '2024-10-14T08:00:00', system: 'crm', type: 'application', severity: 'info',
    source: 'crm-srv-01', user: 'SYSTEM', action: 'cache_refresh',
    message: 'CRM cache refreshed', details: 'Duration: 12s, Records: 45,221' },
  { id: 'LOG-0305', timestamp: '2024-10-14T08:15:00', system: 'payment-api', type: 'application', severity: 'info',
    source: 'api-srv-01', user: 'SYSTEM', action: 'transaction_processed',
    message: 'Transaction batch processed', details: 'Count: 892, Total: $67,123.80' },
  { id: 'LOG-0306', timestamp: '2024-10-14T08:30:00', system: 'customer-portal', type: 'application', severity: 'info',
    source: 'app-srv-02', user: 'SYSTEM', action: 'memory_normal',
    message: 'Memory usage returned to normal', details: 'Usage: 72%, Threshold: 85%' },
  { id: 'LOG-0307', timestamp: '2024-10-14T08:45:00', system: 'payment-api', type: 'application', severity: 'info',
    source: 'api-srv-01', user: 'SYSTEM', action: 'transaction_processed',
    message: 'Transaction batch processed', details: 'Count: 1,456, Total: $112,847.25' },
    
  // ============================================
  // DATABASE ACTIVITY (service accounts - normal)
  // ============================================
  
  { id: 'LOG-0350', timestamp: '2024-10-14T08:00:05', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0351', timestamp: '2024-10-14T08:02:33', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0352', timestamp: '2024-10-14T08:05:15', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-02', user: 'svc_billing', action: 'query_executed',
    message: 'Invoice generation query', details: 'Table: transactions, Query type: SELECT, Rows: 47' },
  { id: 'LOG-0353', timestamp: '2024-10-14T08:12:44', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0354', timestamp: '2024-10-14T08:18:22', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0355', timestamp: '2024-10-14T08:25:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'report-srv-01', user: 'svc_reporting', action: 'query_executed',
    message: 'Daily summary report', details: 'Table: transactions, Query type: SELECT, Rows: 1,247' },
  { id: 'LOG-0356', timestamp: '2024-10-14T08:32:11', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0357', timestamp: '2024-10-14T08:38:55', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-02', user: 'svc_billing', action: 'query_executed',
    message: 'Payment reconciliation query', details: 'Table: payments, Query type: SELECT, Rows: 89' },
  { id: 'LOG-0358', timestamp: '2024-10-14T08:45:33', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
  { id: 'LOG-0359', timestamp: '2024-10-14T08:52:00', system: 'customer-db', type: 'database', severity: 'info',
    source: 'app-srv-01', user: 'svc_crm_app', action: 'query_executed',
    message: 'Customer lookup query', details: 'Table: customers, Query type: SELECT, Rows: 1' },
    
  // ============================================
  // NORMAL BUSINESS ACTIVITY
  // ============================================
  
  { id: 'LOG-0500', timestamp: '2024-10-14T08:00:22', system: 'hr-portal', type: 'access', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'page_view',
    message: 'Accessed HR Portal', details: 'Viewed: /leave-requests' },
  { id: 'LOG-0501', timestamp: '2024-10-14T08:05:11', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'page_edit',
    message: 'Wiki page edited', details: 'Page: /wiki/security/incident-response-playbook' },
  { id: 'LOG-0502', timestamp: '2024-10-14T08:10:33', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.112', user: 'anika.patel@xyzpay.com.au', action: 'report_generated',
    message: 'Financial report generated', details: 'Report: Monthly Reconciliation October 2024' },
  { id: 'LOG-0503', timestamp: '2024-10-14T08:15:45', system: 'hr-portal', type: 'access', severity: 'info',
    source: '10.1.50.23', user: 'jenny.marcos@xyzpay.com.au', action: 'page_view',
    message: 'Accessed HR Portal', details: 'Viewed: /payslips/october-2024' },
  { id: 'LOG-0504', timestamp: '2024-10-14T08:22:00', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '10.1.50.71', user: 'emma.johnson@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/hr/onboarding-checklist' },
  { id: 'LOG-0505', timestamp: '2024-10-14T08:28:33', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.200', user: 'david.wong@xyzpay.com.au', action: 'report_view',
    message: 'Financial report viewed', details: 'Report: Q3 Revenue Summary' },
  { id: 'LOG-0506', timestamp: '2024-10-14T08:35:15', system: 'hr-portal', type: 'access', severity: 'info',
    source: '10.1.50.92', user: 'michelle.nguyen@xyzpay.com.au', action: 'leave_request',
    message: 'Leave request submitted', details: 'Type: Annual Leave, Dates: 2024-10-28 to 2024-11-01' },
  { id: 'LOG-0507', timestamp: '2024-10-14T08:42:22', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '10.1.50.150', user: 'sarah.mitchell@xyzpay.com.au', action: 'page_view',
    message: 'Wiki page viewed', details: 'Page: /wiki/it/server-maintenance-schedule' },
  { id: 'LOG-0508', timestamp: '2024-10-14T08:48:55', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.112', user: 'anika.patel@xyzpay.com.au', action: 'invoice_approved',
    message: 'Invoice approved', details: 'Vendor: Office Supplies Co, Amount: $2,847.50' },
  { id: 'LOG-0509', timestamp: '2024-10-14T08:55:00', system: 'hr-portal', type: 'access', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'page_view',
    message: 'Accessed HR Portal', details: 'Viewed: /team-calendar' },
    
  // ============================================
  // SECOND LOGIN SURGE (9:00am)
  // ============================================
  
  { id: 'LOG-0600', timestamp: '2024-10-14T08:55:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.105', user: 'ben.taylor@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-BT001' },
  { id: 'LOG-0601', timestamp: '2024-10-14T08:56:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.118', user: 'sophie.lee@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-SL001' },
  { id: 'LOG-0602', timestamp: '2024-10-14T08:57:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.122', user: 'chris.martin@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-CM001' },
  { id: 'LOG-0603', timestamp: '2024-10-14T08:58:02', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.135', user: 'amy.zhang@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-AZ001' },
  { id: 'LOG-0604', timestamp: '2024-10-14T08:58:45', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.141', user: 'ryan.patel@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-RP001' },
  { id: 'LOG-0605', timestamp: '2024-10-14T08:59:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.148', user: 'jessica.brown@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-JB001' },
  { id: 'LOG-0606', timestamp: '2024-10-14T08:59:55', system: 'internal-sso', type: 'auth', severity: 'low',
    source: '10.1.50.122', user: 'chris.martin@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - incorrect password', details: 'Attempt 1 of 3' },
    
  // ============================================
  // ANTIVIRUS / EDR LOGS
  // ============================================
  
  { id: 'LOG-0700', timestamp: '2024-10-14T08:05:00', system: 'antivirus', type: 'security', severity: 'info',
    source: 'DESKTOP-JM001', user: 'jenny.marcos@xyzpay.com.au', action: 'scan_complete',
    message: 'Quick scan completed', details: 'Scanned: 12,847 files, Threats: 0' },
  { id: 'LOG-0701', timestamp: '2024-10-14T08:15:33', system: 'edr', type: 'security', severity: 'low',
    source: 'DESKTOP-KS001', user: 'kevin.smith@xyzpay.com.au', action: 'process_blocked',
    message: 'Potentially unwanted application blocked', details: 'Process: toolbar_installer.exe, Action: Quarantined' },
  { id: 'LOG-0702', timestamp: '2024-10-14T08:25:00', system: 'antivirus', type: 'security', severity: 'info',
    source: 'app-srv-01', user: 'SYSTEM', action: 'scan_complete',
    message: 'Scheduled scan completed', details: 'Scanned: 245,221 files, Threats: 0' },
  { id: 'LOG-0703', timestamp: '2024-10-14T08:35:22', system: 'edr', type: 'security', severity: 'info',
    source: 'DESKTOP-RT001', user: 'rachel.torres@xyzpay.com.au', action: 'file_access',
    message: 'Sensitive file accessed', details: 'File: Q3_Financial_Report.xlsx, Action: Allowed (authorized user)' },
  { id: 'LOG-0704', timestamp: '2024-10-14T08:45:00', system: 'antivirus', type: 'security', severity: 'info',
    source: 'db-srv-01', user: 'SYSTEM', action: 'scan_complete',
    message: 'Scheduled scan completed', details: 'Scanned: 89,445 files, Threats: 0' },
    
  // ============================================
  // PRINT SERVER LOGS (noise)
  // ============================================
  
  { id: 'LOG-0750', timestamp: '2024-10-14T08:08:22', system: 'print-server', type: 'system', severity: 'info',
    source: 'print-srv-01', user: 'jenny.marcos@xyzpay.com.au', action: 'print_job',
    message: 'Print job completed', details: 'Printer: Level2-HP-Color, Pages: 3, Document: Invoice_8821.pdf' },
  { id: 'LOG-0751', timestamp: '2024-10-14T08:22:45', system: 'print-server', type: 'system', severity: 'info',
    source: 'print-srv-01', user: 'anika.patel@xyzpay.com.au', action: 'print_job',
    message: 'Print job completed', details: 'Printer: Level3-HP-Mono, Pages: 12, Document: Monthly_Report.pdf' },
  { id: 'LOG-0752', timestamp: '2024-10-14T08:38:00', system: 'print-server', type: 'system', severity: 'warning',
    source: 'print-srv-01', user: 'SYSTEM', action: 'low_toner',
    message: 'Low toner warning', details: 'Printer: Level2-HP-Color, Toner: 15% remaining' },
  { id: 'LOG-0753', timestamp: '2024-10-14T08:52:33', system: 'print-server', type: 'system', severity: 'info',
    source: 'print-srv-01', user: 'david.wong@xyzpay.com.au', action: 'print_job',
    message: 'Print job completed', details: 'Printer: Exec-HP-Color, Pages: 8, Document: Board_Presentation.pptx' },
    
  ]
