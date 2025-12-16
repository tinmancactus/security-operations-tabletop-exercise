const IMG_PATH = '/scenarios/operation-glasshouse/session-1/img'

export default {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    avatar: '👩‍💼',
    image: `${IMG_PATH}/priya.jpg`,
    available: true,
    messagingMode: 'escalation', // 'escalation' = scoring/rubric, 'auto-reply' = out of office, 'dnd' = no messaging
    escalationCost: { first: 2, followUp: 0 },
    
    messageHistory: [
      {
        id: 'priya-hist-1',
        timestamp: '2024-10-09T09:00:00+10:30',
        gameTime: 'Wed 9:00am',
        from: 'npc',
        content: `Morning. Did you see the news about the PayFlex breach? 50,000 customer records exposed.

Board is asking questions. Marcus wants us to review our detection coverage for similar attack patterns. Can you pull together a summary of our current alerting for credential-based attacks?

No rush - end of week is fine.`
      },
      {
        id: 'priya-hist-2',
        timestamp: '2024-10-09T09:15:00+10:30',
        gameTime: 'Wed 9:15am',
        from: 'player',
        content: `Will do. I saw the article - sounds like they got in through a compromised vendor account?`
      },
      {
        id: 'priya-hist-3',
        timestamp: '2024-10-09T09:18:00+10:30',
        gameTime: 'Wed 9:18am',
        from: 'npc',
        content: `That's what the initial reports say. Third-party risk is a blind spot for a lot of companies. We're not immune.

Let me know if you need access to any additional threat intel sources for the review.`
      },
      {
        id: 'priya-hist-4',
        timestamp: '2024-10-11T11:30:00+10:30',
        gameTime: 'Fri 11:30am',
        from: 'npc',
        content: `Heads up - I'll be in a leadership offsite Monday morning until about 11am. Should be reachable by message but might be slow to respond.

James is around if anything urgent comes up. Otherwise just document and I'll review when I'm back.`
      },
      {
        id: 'priya-hist-5',
        timestamp: '2024-10-11T11:35:00+10:30',
        gameTime: 'Fri 11:35am',
        from: 'player',
        content: `Got it, thanks for the heads up.`
      }
    ],
    
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
  
  james: {
    id: 'james',
    name: 'James Okoro',
    role: 'Senior IR Analyst (Tier 3)',
    avatar: '🔒',
    image: `${IMG_PATH}/james.jpg`,
    available: false,
    messagingMode: 'dnd',
    escalationCost: { first: 2, followUp: 1 },
    
    messageHistory: [
      {
        id: 'james-hist-1',
        timestamp: '2024-10-07T09:15:00+10:30',
        gameTime: 'Mon 9:15am',
        from: 'npc',
        content: `hey, you around? need a second pair of eyes on something`
      },
      {
        id: 'james-hist-2',
        timestamp: '2024-10-07T09:16:00+10:30',
        gameTime: 'Mon 9:16am',
        from: 'player',
        content: `Yeah, what's up?`
      },
      {
        id: 'james-hist-3',
        timestamp: '2024-10-07T09:18:00+10:30',
        gameTime: 'Mon 9:18am',
        from: 'npc',
        content: `false alarm, figured it out. was just some weird edge case in the waf logs. thanks anyway 👍`
      },
      {
        id: 'james-hist-4',
        timestamp: '2024-10-07T16:42:00+10:30',
        gameTime: 'Mon 4:42pm',
        from: 'npc',
        content: `fyi i'm not going to get to that siem tuning this week. marcus wants me focused on the security uplift stuff for the board presentation. fml 🫠`
      },
      {
        id: 'james-hist-5',
        timestamp: '2024-10-07T16:45:00+10:30',
        gameTime: 'Mon 4:45pm',
        from: 'player',
        content: `No worries, I know you're swamped. Good luck with the board stuff.`
      },
      {
        id: 'james-hist-6',
        timestamp: '2024-10-07T16:47:00+10:30',
        gameTime: 'Mon 4:47pm',
        from: 'npc',
        content: `lol thanks. gonna need it -__-`
      },
      {
        id: 'james-hist-7',
        timestamp: '2024-10-11T16:47:00+10:30',
        gameTime: 'Fri 4:47pm',
        from: 'npc',
        content: `you coming for drinks tonight? few of us heading to nola after work`
      },
      {
        id: 'james-hist-8',
        timestamp: '2024-10-11T16:50:00+10:30',
        gameTime: 'Fri 4:50pm',
        from: 'player',
        content: `Maybe next time, got plans tonight.`
      },
      {
        id: 'james-hist-9',
        timestamp: '2024-10-11T16:51:00+10:30',
        gameTime: 'Fri 4:51pm',
        from: 'npc',
        content: `no worries, have a good weekend`
      }
    ],
    
    responseRubric: [
      { id: 'technical-detail', keywords: ['ip', 'hash', 'ioc', 'log', 'payload', 'c2', 'malware', 'lateral'], points: 1 },
      { id: 'specific-question', keywords: ['can you', 'could you', 'what do you think', 'is this', 'does this look'], points: 1 },
      { id: 'evidence-reference', keywords: ['evidence', 'alert', 'ticket', 'found', 'discovered', 'noticed'], points: 1 }
    ],
    
    responses: {
      strong: {
        minScore: 2,
        title: 'Engaged Response',
        content: `yeah i can take a look. send me the details and i'll dig into it.

if it's urgent ping me directly, otherwise i'll get to it when i'm done with this board deck bs`
      },
      partial: {
        minScore: 1,
        title: 'Brief Response',
        content: `bit swamped rn with the security uplift stuff. can you give me the tldr?

if it's not urgent it might have to wait til tomorrow`
      },
      weak: {
        minScore: 0,
        title: 'Dismissive Response',
        content: `sorry mate, drowning over here. unless it's actively on fire can it wait?

escalate to priya if you need someone now`
      }
    }
  },

  marcus: {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'CISO',
    avatar: '👔',
    image: `${IMG_PATH}/marcus.jpg`,
    available: false,
    messagingMode: 'busy', // In meetings most of the day
    escalationCost: { first: 3, followUp: 1 },
    
    messageHistory: [
      {
        id: 'marcus-hist-1',
        timestamp: '2024-10-10T14:30:00+10:30',
        gameTime: 'Thu 2:30pm',
        from: 'npc',
        content: `Quick note - thanks for handling that phishing report yesterday. Good catch on the lookalike domain.

I've mentioned to the board that our detection capabilities are improving. Keep up the good work.`
      },
      {
        id: 'marcus-hist-2',
        timestamp: '2024-10-10T14:35:00+10:30',
        gameTime: 'Thu 2:35pm',
        from: 'player',
        content: `Thanks Marcus, appreciate the feedback.`
      },
      {
        id: 'marcus-hist-3',
        timestamp: '2024-10-10T14:36:00+10:30',
        gameTime: 'Thu 2:36pm',
        from: 'npc',
        content: `FYI I'll be in board meetings most of Monday. Priya's your first point of contact. Only interrupt me if something's critical.`
      }
    ],
    
    responseRubric: [
      { id: 'executive-summary', keywords: ['summary', 'impact', 'risk', 'business', 'customers', 'data'], points: 1 },
      { id: 'severity-assessment', keywords: ['critical', 'high', 'severity', 'urgent', 'priority'], points: 1 },
      { id: 'recommendation', keywords: ['recommend', 'suggest', 'propose', 'should', 'action'], points: 1 }
    ],
    
    responses: {
      strong: {
        minScore: 2,
        title: 'CISO Response',
        content: `Thanks for the escalation. I'm stepping out of my meeting to address this.

Continue your investigation and keep Priya updated. I'll brief the executive team and get back to you within the hour.

Do NOT take any containment actions that could impact business operations without my explicit approval.`
      },
      partial: {
        minScore: 1,
        title: 'CISO Response',
        content: `I'm in back-to-back meetings today. Is this something Priya can handle?

If you genuinely need CISO-level decision making, send me a one-paragraph summary with:
1. What's happening
2. Business impact
3. What you need from me

Otherwise, work with Priya.`
      },
      weak: {
        minScore: 0,
        title: 'CISO Response',
        content: `I'm not clear why this needs my attention right now. Please work with Priya on triage.

Escalate to me only when you have:
- Confirmed incident (not just suspicious activity)
- Clear business impact
- Specific decision you need from me

Thanks.`
      }
    }
  },

  sandra: {
    id: 'sandra',
    name: 'Sandra Leigh',
    role: 'CFO',
    avatar: '💼',
    image: `${IMG_PATH}/sandra.jpg`,
    available: false,
    messagingMode: 'busy',
    escalationCost: { first: 0, followUp: 0 },
    
    messageHistory: [
      {
        id: 'sandra-hist-1',
        timestamp: '2024-10-08T11:20:00+10:30',
        gameTime: 'Tue 11:20am',
        from: 'npc',
        content: `Hey 😊

Quick favour - we're getting a card for David's birthday next week. Can you sign it when you get a chance? It's on my desk.

SL`
      },
      {
        id: 'sandra-hist-2',
        timestamp: '2024-10-08T11:45:00+10:30',
        gameTime: 'Tue 11:45am',
        from: 'player',
        content: `Sure, I'll swing by this afternoon.`
      },
      {
        id: 'sandra-hist-3',
        timestamp: '2024-10-08T11:46:00+10:30',
        gameTime: 'Tue 11:46am',
        from: 'npc',
        content: `Thanks! 😊`
      },
      {
        id: 'sandra-hist-4',
        timestamp: '2024-10-09T15:30:00+10:30',
        gameTime: 'Wed 3:30pm',
        from: 'npc',
        content: `Hey 😊

Thanks so much for helping me with that MFA thing last week. I know I was being difficult about it but I do understand why it matters now. The video you sent explaining the SIM swap attacks was eye-opening!

Anyway, just wanted to say thanks for being patient with me.

SL`
      },
      {
        id: 'sandra-hist-5',
        timestamp: '2024-10-09T15:45:00+10:30',
        gameTime: 'Wed 3:45pm',
        from: 'player',
        content: `No problem at all, happy to help. Let me know if you have any other questions about it.`
      },
      {
        id: 'sandra-hist-6',
        timestamp: '2024-10-09T15:47:00+10:30',
        gameTime: 'Wed 3:47pm',
        from: 'npc',
        content: `Will do!`
      }
    ],
    
    responseRubric: [],
    
    responses: {
      strong: {
        minScore: 0,
        title: 'CFO Response',
        content: `Hey 😊

Thanks for reaching out. I'm not sure this is something I can help with directly - security matters should go through Marcus or Priya.

Is there something specific you need from Finance?

SL`
      },
      partial: {
        minScore: 0,
        title: 'CFO Response',
        content: `Hey 😊

Thanks for reaching out. I'm not sure this is something I can help with directly - security matters should go through Marcus or Priya.

Is there something specific you need from Finance?

SL`
      },
      weak: {
        minScore: 0,
        title: 'CFO Response',
        content: `Hey 😊

Thanks for reaching out. I'm not sure this is something I can help with directly - security matters should go through Marcus or Priya.

Is there something specific you need from Finance?

SL`
      }
    }
  },

  rachel: {
    id: 'rachel',
    name: 'Rachel Torres',
    role: 'Infrastructure Lead',
    avatar: '👩‍🔧',
    image: `${IMG_PATH}/rachel.jpg`,
    available: false,
    messagingMode: 'busy', // Becomes available only after disable-liam action
    status: 'dnd', // 'dnd', 'awaiting-response', 'resolved'
    escalationCost: { first: 0, followUp: 0 },
    
    // Special message sent when player disables Liam's account
    accountDisableMessage: {
      delay: 60000, // 1 minute after action
      content: `Hey, Jodie Williams from Customer Support just dropped by IT. One of her team members, Liam Fitzgerald, says he's completely locked out of his account.

I can see the account was disabled about a moment ago. Was that you? If so, can you give me a quick rundown of what's going on so we can update Jodie?

She's asking when he'll be able to get back in.`
    },
    
    // Response after player explains
    accountDisableResponse: `Thanks for the heads up. That makes sense - I'll let Jodie know it's a security issue and that access will be restored once you've completed your investigation.

I won't re-enable the account without checking with you first.

Good luck with the investigation.`,
    
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
    role: 'SOC Analyst',
    avatar: '🌙',
    image: `${IMG_PATH}/alex.jpg`,
    available: false,
    messagingMode: 'auto-reply', // Out of office with auto-response
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
