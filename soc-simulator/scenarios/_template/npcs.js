// Import images if you have profile pictures
// import images from './images.js'

export default {
  manager: {
    id: 'manager',
    name: 'Alex Manager',
    role: 'SOC Manager',
    image: null, // Use: images.manager if you have images
    available: true,
    messagingMode: 'escalation',
    escalationCost: { first: 0, followUp: 1 },
    
    messageHistory: [],
    
    selfAssessmentCriteria: [
      'Clearly describes the issue',
      'Provides supporting evidence',
      'Includes relevant context',
      'Proposes next steps',
      'Assesses priority/severity'
    ],
    
    responses: {
      strong: {
        minScore: 4,
        title: 'Strong Escalation',
        content: 'Good work. This is exactly what I need. I will take it from here.'
      },
      partial: {
        minScore: 2,
        title: 'Partial Escalation',
        content: 'Thanks for the heads up. Can you provide more detail before I escalate this?'
      },
      weak: {
        minScore: 0,
        title: 'Weak Escalation',
        content: 'I need more information before I can act on this. What specifically are you reporting?'
      }
    }
  }
}
