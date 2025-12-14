const IMG_PATH = '/scenarios/operation-glasshouse/session-1/img'

export default {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    avatar: '👩‍💼',
    image: `${IMG_PATH}/priya.jpg`,
    available: true,
    escalationCost: { first: 2, followUp: 0 },
    
    responseRubric: [
      { 
        id: 'names-account', 
        keywords: ['liam', 'fitzgerald', 'liam.fitzgerald', 'account', 'user'], 
        points: 1,
        description: 'Names a specific user account of concern'
      },
      { 
        id: 'has-evidence', 
        keywords: ['mfa', 'bypass', 'vishing', 'social engineering', 'phone call', 'code', '6-digit', 'indonesia', '103.42', 'vpn'], 
        points: 1,
        description: 'References key evidence (MFA bypass, suspicious login)'
      },
      { 
        id: 'has-timeline', 
        keywords: ['sunday', '10am', '10:14', 'timeline', 'yesterday', 'morning', 'sequence'], 
        points: 1,
        description: 'Describes a timeline of events'
      },
      { 
        id: 'proposes-action', 
        keywords: ['disable', 'block', 'investigate', 'recommend', 'suggest', 'should we', 'next step', 'contain'], 
        points: 1,
        description: 'Proposes a specific action or asks a specific question'
      },
      { 
        id: 'has-severity', 
        keywords: ['severity', 'high', 'medium', 'critical', 'priority', 'urgent', 'serious', 'significant'], 
        points: 1,
        description: 'Includes severity assessment with justification'
      }
    ],
    
    responses: {
      strong: { 
        minScore: 4, 
        title: 'Strong Escalation',
        content: `Good work. This is exactly what I need to know early.

The MFA bypass pattern is concerning—looks like coordinated social engineering, not opportunistic stuffing. They called Liam directly, suggesting prior recon.

I'm authorising you to:
• Continue deep investigation on Liam's account
• Check if other employees got similar calls
• Prepare containment options (but wait—I'll brief Marcus first)

I'll brief Marcus at 10:30. Update me every 15 min. Here's James's mobile if you need Tier 3 urgently: 0412 XXX XXX

Keep me posted.`
      },
      partial: { 
        minScore: 2, 
        title: 'Partial Escalation',
        content: `Thanks for the heads up. I can see something's going on but need more detail before taking this to Marcus.

Can you clarify:
• Which specific account(s) are affected?
• What's the timeline of events?
• What's your severity assessment and why?

I've got meetings until 11. Send an update when you have more.

(Note: Follow-up escalation is free—you can message me again when you have more details.)`
      },
      weak: { 
        minScore: 0, 
        title: 'Weak Escalation',
        content: `I've read your message but I'm not clear what you're asking me to do.

Is this an incident or just suspicious activity? What's the impact? I need specifics—affected systems, IOCs, timeline—before I can justify pulling anyone off other work.

Credential stuffing is business as usual. If something's different, spell it out clearly. Document what you have and come back with something concrete.

(Note: Follow-up escalation is free—you can message me again when you have more details.)`
      }
    }
  },
  
  rachel: {
    id: 'rachel',
    name: 'Rachel Torres',
    role: 'Infrastructure Lead',
    avatar: '👩‍🔧',
    image: `${IMG_PATH}/rachel.jpg`,
    available: true,
    escalationCost: { first: 2, followUp: 1 },
    
    responseRubric: [
      { id: 'specific-ip', keywords: ['185.220', '91.240', '194.26', '103.42', 'ip address'], points: 1 },
      { id: 'specific-action', keywords: ['block', 'firewall', 'disable', 'isolate'], points: 1 },
      { id: 'has-justification', keywords: ['because', 'due to', 'evidence', 'attack', 'malicious'], points: 1 }
    ],
    
    responses: {
      strong: {
        minScore: 3,
        title: 'Action Confirmed',
        content: `Got it. I'll implement that change now.

Just to confirm what I'm doing:
[Action will be implemented based on request]

This will take effect within 5 minutes. I'll ping you when it's done.

Note: If this causes any business impact, I'll need you to document the justification for the change request.`
      },
      partial: {
        minScore: 1,
        title: 'Need More Details',
        content: `Got your ticket. What exactly do you need? We're mid-patching cycle so I need to know if this is urgent.

For emergency changes I need:
1. Specific systems/IPs affected
2. What action you want
3. Business justification
4. SOC Manager approval

Let me know and I'll prioritise.`
      },
      weak: {
        minScore: 0,
        title: 'Unclear Request',
        content: `I'm not sure what you're asking for here. Can you be more specific?

What system or IP are we talking about? What do you want me to do?`
      }
    }
  },

  alex: {
    id: 'alex',
    name: 'Alex Anderson',
    role: 'SOC Analyst (Night Shift)',
    avatar: '🌙',
    image: `${IMG_PATH}/alex.jpg`,
    available: false, // Out of office
    escalationCost: { first: 0, followUp: 0 },
    
    // Initial message sent at session start
    initialMessage: {
      delay: 0, // Immediate
      content: `Morning team! Shift handover notes below. I'm heading home to sleep - back online tonight.

OVERNIGHT SUMMARY (22:00 - 06:00)
================================

CREDENTIAL STUFFING (ongoing)
- Customer portal seeing continued brute force attempts
- Sources: 185.220.101.42, 91.240.118.29, 194.26.192.71 (known Tor exits)
- ~2,400 failed attempts overnight, 0 successful
- Rate limiting is holding, no action required
- Created alert M-2471 for tracking

SERVICE TICKETS
- TKT-4471: Liam F from Customer Support logged a ticket about a "weird call from IT" - sounds like possible vishing attempt? Might be worth a follow-up.
- TKT-4472: Jenny M reported a suspicious email - I had a quick look, seems like legit marketing but flagged for review.

SYSTEMS
- All green. Backups completed 06:00.
- Patch window scheduled Friday night - Rachel's team handling.

Nothing else jumped out at me. Quiet night overall.

Catch you tonight!
- Alex`
    },
    
    responseRubric: [], // No scoring needed
    
    responses: {
      // All responses are the same - out of office
      strong: {
        minScore: 0,
        title: 'Out of Office',
        content: `Thanks for your message. I'm currently offline after night shift and will be back online at 22:00 tonight.

For urgent matters, please contact:
• Priya Sharma (SOC Manager) - available now
• James Okoro (Tier 3) - for active incidents

This is an automated response.`
      },
      partial: {
        minScore: 0,
        title: 'Out of Office',
        content: `Thanks for your message. I'm currently offline after night shift and will be back online at 22:00 tonight.

For urgent matters, please contact:
• Priya Sharma (SOC Manager) - available now
• James Okoro (Tier 3) - for active incidents

This is an automated response.`
      },
      weak: {
        minScore: 0,
        title: 'Out of Office',
        content: `Thanks for your message. I'm currently offline after night shift and will be back online at 22:00 tonight.

For urgent matters, please contact:
• Priya Sharma (SOC Manager) - available now
• James Okoro (Tier 3) - for active incidents

This is an automated response.`
      }
    }
  }
}
