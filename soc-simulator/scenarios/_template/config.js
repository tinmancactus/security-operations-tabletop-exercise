export default {
  id: 'template-scenario',
  title: 'Scenario Title',
  subtitle: 'Session 1',
  
  duration: 3600, // 60 minutes in seconds
  startTime: { hour: 9, minute: 0 }, // In-game start time (9:00am)
  tokens: 10,
  
  company: {
    name: 'Acme Corp',
    industry: 'Technology',
    location: 'Sydney, Australia',
    employees: 200
  },
  
  briefing: {
    title: 'Welcome',
    date: 'Monday, 1 January 2025',
    shift: 'Day Shift (09:00 - 17:00)',
    content: `Welcome to the Security Operations Centre.

Your job is to monitor security alerts, investigate suspicious activity, and escalate incidents appropriately.

Good luck.`
  },
  
  sessionEnd: {
    title: 'Session Complete',
    message: 'The timer has ended.',
    downloadWarning: 'You must save your session report now. It will not be available to download later.',
    instructions: 'Follow any instructions from your tutor regarding next steps.'
  },
  
  credits: {
    story: 'Story by [Author Name]',
    acknowledgements: '',
    assets: '',
    disclaimer: 'This scenario is entirely fictional. All characters, companies, events, and incidents depicted are products of the imagination. Any resemblance to actual persons, living or dead, or actual companies or events is purely coincidental.'
  }
}
