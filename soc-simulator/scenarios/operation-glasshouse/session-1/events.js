// Timed events for messages and other non-alert triggers
// Alert scheduling is handled via visibleAt property on alerts themselves
export default [
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
  }
]
