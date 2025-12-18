// System logs for Session 1
// Mix of routine noise, credential stuffing attempts, and the real attack indicators

export default [
  // === AUTHENTICATION LOGS ===
  
  // Credential stuffing noise (customer portal) - background attack, unrelated to main incident
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
    
  // Normal employee logins (noise)
  { id: 'LOG-0010', timestamp: '2024-10-14T08:15:42', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.23', user: 'jenny.marcos@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-JM001' },
  { id: 'LOG-0011', timestamp: '2024-10-14T08:17:33', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: DESKTOP-RT001' },
  { id: 'LOG-0012', timestamp: '2024-10-14T08:22:15', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.67', user: 'marcus.chen@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: Authenticator App, Device: LAPTOP-MC001' },
    
  // More credential stuffing (different IP block)
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
  { id: 'LOG-0056', timestamp: '2024-10-14T08:22:44', system: 'hr-portal', type: 'access', severity: 'low',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'page_view',
    message: 'Accessed Executive Assistant Contact Details', details: 'Viewed: /directory/executive-support' },
  { id: 'LOG-0057', timestamp: '2024-10-14T08:28:00', system: 'customer-db', type: 'access', severity: 'high',
    source: '103.42.91.17', user: 'liam.fitzgerald@xyzpay.com.au', action: 'query_executed',
    message: 'Database query executed', details: 'Table: customers, Query type: SELECT, Rows returned: 15,847' },
    
  // Normal Liam login on Monday (legitimate)
  { id: 'LOG-0060', timestamp: '2024-10-14T07:56:12', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'login_success',
    message: 'Successful authentication via SSO', details: 'MFA: SMS, Device: DESKTOP-LF001, Location: Adelaide Office' },
    
  // === SYSTEM LOGS (noise) ===
  
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
    
  // === FIREWALL LOGS ===
  
  { id: 'LOG-0150', timestamp: '2024-10-14T08:02:11', system: 'firewall', type: 'network', severity: 'low',
    source: '185.220.101.42', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-0151', timestamp: '2024-10-14T08:02:45', system: 'firewall', type: 'network', severity: 'low',
    source: '91.240.118.29', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
  { id: 'LOG-0152', timestamp: '2024-10-14T08:31:02', system: 'firewall', type: 'network', severity: 'low',
    source: '194.26.192.71', user: null, action: 'connection_blocked',
    message: 'Inbound connection blocked - rate limit exceeded', details: 'Destination: customer-portal, Port: 443' },
    
  // === EMAIL LOGS ===
  
  { id: 'LOG-0200', timestamp: '2024-10-14T08:20:33', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'external', user: 'newsletter@retailmetrics.com.au', action: 'email_delivered',
    message: 'Email delivered', details: 'To: jenny.marcos@xyzpay.com.au, Subject: "Your weekly analytics report"' },
  { id: 'LOG-0201', timestamp: '2024-10-14T08:25:17', system: 'email-gateway', type: 'email', severity: 'low',
    source: 'external', user: 'support@amaz0n-verify.com', action: 'email_quarantined',
    message: 'Email quarantined - suspected phishing', details: 'To: all-staff@xyzpay.com.au, Subject: "Verify your account"' },
  { id: 'LOG-0202', timestamp: '2024-10-14T08:45:02', system: 'email-gateway', type: 'email', severity: 'info',
    source: 'internal', user: 'priya.sharma@xyzpay.com.au', action: 'email_sent',
    message: 'Email sent', details: 'To: soc-team@xyzpay.com.au, Subject: "Morning briefing notes"' },
    
  // === VPN LOGS ===
  
  { id: 'LOG-0250', timestamp: '2024-10-14T07:55:22', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '203.45.67.89', user: 'marcus.chen@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Home Office, Duration: Active' },
  { id: 'LOG-0251', timestamp: '2024-10-14T08:10:45', system: 'vpn-gateway', type: 'network', severity: 'info',
    source: '118.209.33.12', user: 'james.okoro@xyzpay.com.au', action: 'vpn_connect',
    message: 'VPN connection established', details: 'Location: Home Office, Duration: Active' },
    
  // === APPLICATION LOGS ===
  
  { id: 'LOG-0300', timestamp: '2024-10-14T08:00:01', system: 'customer-portal', type: 'application', severity: 'info',
    source: 'app-srv-01', user: 'SYSTEM', action: 'service_start',
    message: 'Application service started', details: 'Version: 4.2.1, Health: OK' },
  { id: 'LOG-0301', timestamp: '2024-10-14T07:48:44', system: 'payment-api', type: 'application', severity: 'info',
    source: 'api-srv-01', user: 'SYSTEM', action: 'transaction_processed',
    message: 'Transaction batch processed', details: 'Count: 1,247, Total: $89,432.50' },
  { id: 'LOG-0302', timestamp: '2024-10-14T07:45:12', system: 'customer-portal', type: 'application', severity: 'warning',
    source: 'app-srv-02', user: 'SYSTEM', action: 'high_memory',
    message: 'High memory usage detected', details: 'Usage: 87%, Threshold: 85%' },
    
  // === MORE CREDENTIAL STUFFING (ongoing) ===
  
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
    
  // === NORMAL BUSINESS ACTIVITY ===
  
  { id: 'LOG-0500', timestamp: '2024-10-14T07:55:22', system: 'hr-portal', type: 'access', severity: 'info',
    source: '10.1.50.45', user: 'rachel.torres@xyzpay.com.au', action: 'page_view',
    message: 'Accessed HR Portal', details: 'Viewed: /leave-requests' },
  { id: 'LOG-0501', timestamp: '2024-10-14T07:58:11', system: 'internal-wiki', type: 'access', severity: 'info',
    source: '10.1.50.67', user: 'marcus.chen@xyzpay.com.au', action: 'page_edit',
    message: 'Wiki page edited', details: 'Page: /wiki/security/incident-response-playbook' },
  { id: 'LOG-0502', timestamp: '2024-10-14T07:52:33', system: 'finance-system', type: 'access', severity: 'info',
    source: '10.1.50.112', user: 'anika.patel@xyzpay.com.au', action: 'report_generated',
    message: 'Financial report generated', details: 'Report: Monthly Reconciliation October 2024' },
  { id: 'LOG-0503', timestamp: '2024-10-14T08:06:00', system: 'customer-portal', type: 'access', severity: 'info',
    source: '10.1.50.89', user: 'liam.fitzgerald@xyzpay.com.au', action: 'ticket_updated',
    message: 'Support ticket updated', details: 'Ticket: #TKT-4472, Status: Open' },
    
  ]
