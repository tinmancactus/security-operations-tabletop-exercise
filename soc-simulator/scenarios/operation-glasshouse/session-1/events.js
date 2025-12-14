export default [
  {
    id: 'alert-liam-login',
    triggerAt: 1200, // 40:00 remaining (20 min elapsed)
    type: 'alert',
    alertId: 'M-2489',
    notification: {
      message: 'New SIEM alert: Unusual login pattern detected',
      type: 'warning'
    }
  },
  {
    id: 'priya-checkin',
    triggerAt: 2400, // 20:00 remaining (40 min elapsed)
    type: 'message',
    npcId: 'priya',
    content: `Hey team, quick check-in. Anything interesting this morning? Marcus asked me for a status update—apparently the board is nervous after that competitor breach last month. Let me know if there's anything I should flag.`,
    notification: {
      message: 'New message from Priya Sharma',
      type: 'info'
    }
  },
  {
    id: 'cliffhanger',
    triggerAt: 3300, // 05:00 remaining (55 min elapsed)
    type: 'alert',
    alertId: 'H-0012',
    pauseTimer: true,
    notification: {
      message: '🚨 CRITICAL ALERT: Sensitive data access detected',
      type: 'danger'
    }
  }
]
