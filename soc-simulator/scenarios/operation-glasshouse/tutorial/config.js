export default {
  id: 'onboarding-session-0',
  title: 'Onboarding',
  subtitle: 'Practice Session: The Coffee Shop Compromise',
  
  duration: 600, // 10 minutes
  startTime: { hour: 8, minute: 0 },
  tokens: 6,
  
  company: {
    name: 'XYZ Pay',
    industry: 'Buy Now Pay Later (BNPL)',
    location: 'Adelaide, Australia',
    employees: 150
  },
  
  briefing: {
    title: 'Welcome to the SOC Training Simulator',
    date: 'Thursday, 23 April 2026',
    shift: 'Morning Shift (08:00 - 08:10 ACDT)',
    content: `Welcome to XYZ Pay. This is a 10-minute practice scenario designed to familiarise you with your SOC workstation.

James Okoro, our Senior Incident Response Analyst, will guide you through the tools step-by-step. 

You have exactly 6 Action Tokens for this tutorial. Spend them wisely as instructed by James.

Click 'Begin Session' when you are ready.`
  },
  
  sessionEnd: {
    title: 'Practice Complete',
    message: 'The timer has ended. You should now understand the basics of the simulator.',
    downloadWarning: 'To finish the tutorial, please export your session report.',
    instructions: 'You can close this dialog to review your actions, or export the PDF to see how your actions were logged.'
  }
}