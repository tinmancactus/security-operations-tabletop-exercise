export default[
  {
    id: 'LOG-001', timestamp: '2026-04-23T07:50:12', system: 'internal-sso', type: 'auth', severity: 'low',
    source: '185.100.20.50', user: 'emily.chen@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - incorrect password', details: 'Attempt 1'
  },
  {
    id: 'LOG-002', timestamp: '2026-04-23T07:50:45', system: 'internal-sso', type: 'auth', severity: 'low',
    source: '185.100.20.50', user: 'emily.chen@xyzpay.com.au', action: 'login_failed',
    message: 'Authentication failed - incorrect password', details: 'Attempt 2'
  },
  {
    id: 'LOG-003', timestamp: '2026-04-23T07:52:10', system: 'internal-sso', type: 'auth', severity: 'warning',
    source: '185.100.20.50', user: 'emily.chen@xyzpay.com.au', action: 'password_success',
    message: 'Primary authentication successful', details: 'Password verified. Triggering MFA challenge.'
  },
  {
    id: 'LOG-004', timestamp: '2026-04-23T07:54:22', system: 'internal-sso', type: 'auth', severity: 'info',
    source: '185.100.20.50', user: 'emily.chen@xyzpay.com.au', action: 'mfa_denied',
    message: 'MFA challenge denied by user', details: 'User pressed "Deny" on Authenticator App.'
  }
]