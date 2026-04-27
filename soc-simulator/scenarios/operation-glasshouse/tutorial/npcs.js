import images from './images.js'

export default {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    image: images.priya,
    available: true,
    messagingMode: 'escalation',
    escalationCost: { first: 1, followUp: 0 },
    
    messageHistory:[
      {
        id: 'priya-hist-1',
        timestamp: '2026-04-20T09:00:00',
        gameTime: 'Monday 9:00am',
        from: 'npc',
        content: `Welcome to the team! I'm Priya, the SOC Manager. 

I'll be in and out of meetings today. James will show you the ropes and help you get familiar with the workstation. 

If you find a confirmed threat, escalate it to me here. Make sure to include all relevant details using the self-assessment rubric.`
      }
    ],
    
    selfAssessmentCriteria:[
      'Identified the affected user account (Emily Chen)',
      'Noted the malicious IP address (185.100.20.50)',
      'Confirmed the user\'s password was compromised',
      'Stated that MFA prevented the breach',
      'Confirmed you forced a password reset'
    ],
    
    responses: {
      strong: { 
        minScore: 4, 
        title: 'Strong Escalation',
        content: `Excellent analysis. You connected the ticket, the logs, and the threat intel perfectly. Great job containing the threat by resetting her password.

You're a natural at this! You've successfully completed the onboarding.`
      },
      partial: { 
        minScore: 2, 
        title: 'Partial Escalation',
        content: `I see where you're going, but you missed a few details in your report. It's crucial to be thorough when escalating incidents.

Either way, you identified the core issue. Good work.`
      },
      weak: { 
        minScore: 0, 
        title: 'Weak Escalation',
        content: `I need a bit more context here. It's important to provide concrete IOCs and timelines when escalating to management.

Review your evidence and try to be more thorough next time. But you made it through the tutorial!`
      }
    }
  },

  james: {
    id: 'james',
    name: 'James Okoro',
    role: 'Senior IR Analyst',
    image: images.james,
    available: true,
    messagingMode: 'online', 
    escalationCost: { first: 0, followUp: 0 },
    
    initialMessage: {
      delay: 2,
      timestamp: '2026-04-23T08:00:02',
      gameTime: '08:00am',
      content: `Hey, welcome to your first day! I'm James, the Senior IR Analyst. I'm going to walk you through your workstation. 

First up, check the 'Tickets' tab on the left. Emily from Marketing just submitted something. Read it, then check the 'SIEM' tab to see if we have an alert matching her report. 

Go ahead and click 'Investigate Account Activity' on that alert. I'll check back with you once you've pulled that data.`
    },

    specialInteractions:[
      {
        type: 'canned-handoff',
        triggeredByAction: 'investigate-emily-auth',
        delaySeconds: 3,
        promptMessage: `Nice work pulling those auth logs. Review the Evidence Card that just unlocked in the 'Evidence' tab. What does it tell us?`,
        cannedResponses:[
          {
            id: 'tut-step-2',
            label: 'The attacker guessed her password, but MFA stopped them.',
            delay: 1500,
            npcReply: `Exactly. MFA saved the day. But we need to verify everything.`,
            additionalReplies:[
              { content: `Next, go to the 'Logs' tab and search for Emily's email. You'll see the raw authentication events.`, delayMs: 3000 },
              { content: `Grab the source IP address from those logs, then paste it into the 'Intel' tab. We need to know what we're dealing with.`, delayMs: 3000 },
              { content: `Once you've confirmed it's a malicious IP, go back to the 'Tickets' tab and click 'Force Password Reset' on Emily's ticket to secure her account. Let me know here once it's done.`, delayMs: 4000 }
            ],
            // tut-step-3 only becomes available AFTER tut-step-2's guidance finishes,
            // keeping the player on the happy path and preventing skip-ahead.
            appendCannedResponses:[
              {
                id: 'tut-step-3',
                label: `Done. I've reset Emily's password.`,
                delay: 1500,
                npcReply: `Excellent. You've contained the immediate threat by invalidating her session and forcing a password reset. Now we escalate.`,
                additionalReplies:[
                  { content: `Go to the 'Messages' tab and select Priya. Use the self-assessment checkboxes to make sure you include all the details: the affected user, the malicious IP, the password compromise, and the containment action you took.`, delayMs: 4000 },
                  { content: `Oh, one last thing! You can download your session report at any time by going to the 'Actions' tab (the clipboard icon) and exporting it as a PDF. Or, you can just wait for the timer to hit zero. Good luck!`, delayMs: 4000 }
                ],
                afterMode: 'dnd'
              }
            ]
          }
        ]
      }
    ]
  }
}