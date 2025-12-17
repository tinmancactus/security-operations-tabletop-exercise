// Timed events for messages and other non-alert triggers
// Alert scheduling is handled via visibleAt property on alerts themselves
export default [
  {
    id: 'priya-checkin',
    triggerAt: 2400, // 20:00 remaining (40 min elapsed)
    type: 'message',
    npcId: 'priya',
    skipIfMessaged: 'priya', // Don't send if player has already messaged this NPC
    content: `Hey team, I hope everything is going well this morning. The board seem a bit nervous about the recent competitor breaches. Don't hestitate to escalate any matters with me if anything important comes up.`,
    notification: {
      message: 'New message from Priya Sharma',
      type: 'info'
    }
  }
]
