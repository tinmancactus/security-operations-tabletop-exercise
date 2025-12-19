export default [
  {
    id: 'LOG-0001',
    timestamp: '2025-01-01T08:00:00',
    system: 'internal-sso',
    type: 'auth',
    severity: 'info',
    source: '10.0.0.50',
    user: 'sample.user@acme.com',
    action: 'login_success',
    message: 'Successful authentication',
    details: 'MFA: Authenticator App'
  },
  {
    id: 'LOG-0002',
    timestamp: '2025-01-01T09:15:00',
    system: 'firewall',
    type: 'network',
    severity: 'medium',
    source: '203.0.113.50',
    user: null,
    action: 'connection_blocked',
    message: 'Blocked inbound connection',
    details: 'Port: 22, Protocol: TCP'
  }
]
