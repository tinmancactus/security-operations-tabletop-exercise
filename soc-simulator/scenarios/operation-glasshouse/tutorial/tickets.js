export default[
  {
    id: 'TKT-0101',
    priority: 'medium',
    status: 'open',
    category: 'Security — Suspicious Activity',
    visibleAt: 0,
    
    from: {
      name: 'Emily Chen',
      email: 'emily.chen@xyzpay.com.au',
      department: 'Marketing'
    },
    
    subject: 'Weird MFA prompt on my phone',
    submitted: '2026-04-23T07:55:00',
    sla: '4 hours',
    content: `Hi IT,

I'm just getting my morning coffee at the cafe downstairs before coming up to the office, and my phone just buzzed with an XYZ Pay authenticator approval request. 

I definitely wasn't trying to log in, so I hit "Deny". 

Just wanted to let you know in case it's important.

Thanks,
Emily`,
    
    actions:[
      {
        id: 'reset-emily-password',
        label: 'Force Password Reset',
        cost: 1,
        description: 'Invalidate current session tokens and force the user to reset their password on next login.',
        closesTicket: true,
        notification: 'Password reset forced for Emily Chen',
        logMessage: 'Forced password reset for emily.chen@xyzpay.com.au',
        logType: 'containment'
      }
    ]
  }
]