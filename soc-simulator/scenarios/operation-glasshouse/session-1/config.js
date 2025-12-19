export default {
  id: 'operation-glasshouse-s1',
  title: 'Operation Glasshouse',
  subtitle: 'Session 1: Static',
  
  duration: 3600, // 60 minutes in seconds
  startTime: { hour: 8, minute: 0 }, // Session starts at 8:00am in-game
  tokens: 12,
  
  company: {
    name: 'XYZ Pay',
    industry: 'Buy Now Pay Later (BNPL)',
    location: 'Adelaide, Australia',
    employees: 150
  },
  
  briefing: {
    title: 'Welcome to the SOC',
    date: 'Monday, 14 October 2024',
    shift: 'Day Shift (08:00 - 16:00 ACDT)',
    content: `You are a Security Operations Centre (SOC) team at XYZ Pay, a Buy Now Pay Later fintech company based in Adelaide.

It's Monday morning. You've just started your shift and are taking over from the night team.

Your job is to monitor security alerts, investigate suspicious activity, and escalate incidents appropriately. You have limited time and resources—choose your actions wisely.

Your team has 12 action tokens. Each investigation, escalation, or action costs tokens. You cannot do everything, so prioritise what matters most.

Some events will occur automatically as time passes. Watch the clock.

All names, domain names, locations and IP addresses are fictional. Use the in-game tools to investigate them, not publicly available sources.

Good luck.`
  },
  
  sessionEnd: {
    title: 'Session Complete',
    message: 'The timer has ended.',
    downloadWarning: 'You must save your session report now. It will not be available to download later.',
    instructions: 'Follow any instructions from your tutor regarding next steps and submission of your report.'
  }
}
