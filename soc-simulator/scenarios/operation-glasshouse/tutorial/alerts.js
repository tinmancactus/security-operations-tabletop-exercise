export default[
  {
    id: 'M-0042',
    severity: 'medium',
    title: 'Impossible Travel / Anomalous Login Attempt',
    timestamp: '2026-04-23T07:53:00',
    source: '185.100.20.50',
    target: 'internal-sso',
    user: 'emily.chen@xyzpay.com.au',
    status: 'open',
    visibleAt: 0,
    
    details: `Impossible travel distance detected for user authentication.
    
User: emily.chen@xyzpay.com.au
Source IP: 185.100.20.50 (Geolocated: Eastern Europe)
Previous IP: 203.45.67.89 (Adelaide, AU) - 14 hours ago

Time difference makes travel impossible. 
MFA status: Pending/Denied.`,
    
    actions:[
      {
        id: 'investigate-emily-auth',
        label: 'Investigate Account Activity',
        cost: 2,
        description: 'Pull detailed authentication and application logs for this user account over the last 24 hours.',
        unlocksEvidence: 'EV-1'
      }
    ]
  }
]