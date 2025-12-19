export default [
  {
    id: 'M-0001',
    severity: 'medium',
    title: 'Sample Alert',
    timestamp: '2025-01-01T09:15:00',
    source: '10.0.0.100',
    target: 'internal-system',
    user: 'user@acme.com',
    status: 'open',
    visibleAt: 0, // Visible from session start
    
    details: `This is a sample alert.

Source: 10.0.0.100
Target: internal-system
User: user@acme.com

Add your investigation details here.`,
    
    actions: [
      {
        id: 'investigate-sample',
        label: 'Investigate',
        cost: 1,
        description: 'Investigate this alert',
        unlocksEvidence: 'EV-1'
      }
    ]
  }
]
