export default [
  // ============================================
  // NOISE TICKETS - SOC-appropriate security reports
  // ============================================
  {
    id: 'TKT-4469',
    priority: 'low',
    status: 'open',
    category: 'Security — Phishing Report',
    visibleAt: 660, // 11 min into session
    from: {
      name: 'Andrew Walsh',
      email: 'andrew.walsh@xyzpay.com.au',
      department: 'Sales'
    },
    subject: 'DocuSign email',
    submitted: '2024-10-14T08:05:00+10:30',
    sla: '24 hours',
    content: `Hi Security team,

I got an email this morning that looks like it's from DocuSign asking me to sign a contract. I don't remember any contracts pending so I thought I'd check before clicking anything.

Subject line was "Action Required: Contract #4892 awaiting your signature"

Is this legit or should I delete it?

Thanks,
Andrew`,
    actions: [
      {
        id: 'analyse-andrew-email',
        label: 'Analyse reported email',
        cost: 1,
        description: 'Check email headers, links, and sender reputation',
        unlocksEvidence: 'EV-11'
      },
      {
        id: 'inform-andrew-safe',
        label: 'Inform Andrew email is safe',
        cost: 0,
        description: 'Tell Andrew the email is legitimate and safe to click',
        closesTicket: true,
        requiresEvidence: ['EV-11']
      },
      {
        id: 'advise-andrew-delete',
        label: 'Advise Andrew to delete email',
        cost: 0,
        description: 'Warn Andrew this is phishing and to delete the email',
        closesTicket: true,
        requiresEvidence: ['EV-11']
      }
    ]
  },
  {
    id: 'TKT-4470',
    priority: 'low',
    status: 'open',
    category: 'Security — Access Review',
    visibleAt: 600, // 10 min into session
    from: {
      name: 'Sophie Turner',
      email: 'sophie.turner@xyzpay.com.au',
      department: 'Legal'
    },
    subject: 'Request to unblock website - contractpodai.com',
    submitted: '2024-10-11T15:40:00+10:30',
    sla: '48 hours',
    content: `Hi Security,

I'm trying to access contractpodai.com for our new contract management system but it's being blocked by the web filter. Legal has approved this tool and we need it for the Q4 contract review cycle, which I'll be working on starting next week.

Can you please review and whitelist this site?

Thanks,
Sophie`,
    actions: []
  },
  // ============================================
  // STORY TICKETS - Key investigation items
  // ============================================
  {
    id: 'TKT-4471',
    priority: 'low',
    status: 'open',
    category: 'Security — Vishing Report',
    from: {
      name: 'Anika Patel',
      email: 'anika.patel@xyzpay.com.au',
      department: 'Finance'
    },
    subject: 'Suspicious call yesterday (Sunday)',
    submitted: '2024-10-13T10:17:00+10:30',
    sla: '48 hours',
    content: `Hi Security,

I got a strange call on my work phone today (Sunday 13/10). Someone claiming to be from IT Support said there was an issue with my account and asked me to verify my identity.

It seemed a bit suspicious to me, so I hung up and didn't get a call back.

Probably nothing, but wanted to flag it just in case.

Thanks,
Anika`,
    actions: [
      {
        id: 'interview-anika',
        label: 'Interview Anika',
        cost: 1,
        description: 'Quick interview about the suspicious call',
        unlocksEvidence: 'EV-10'
      },
      {
        id: 'reset-anika-password',
        label: 'Reset Anika\'s password',
        cost: 1,
        description: 'Precautionary password reset for Anika\'s account'
      },
      {
        id: 'close-anika-ticket',
        label: 'Log and close',
        cost: 0,
        description: 'Document the report and close the ticket',
        closesTicket: true
      }
    ]
  },
  {
    id: 'TKT-4472',
    priority: 'low',
    status: 'open',
    category: 'Security — General Inquiry',
    visibleAt: 360, // 6 min into session
    notification: {
      message: 'New service ticket from Liam Fitzgerald',
      type: 'info'
    },
    from: {
      name: 'Liam Fitzgerald',
      email: 'liam.fitzgerald@xyzpay.com.au',
      department: 'Customer Support'
    },
    subject: 'Weird call from IT this morning?',
    submitted: '2024-10-14T08:15:00+10:30',
    sla: '48 hours',
    content: `Hi,

Got a call from IT support this morning asking me to verify something. Seemed legit at the time but now I'm second-guessing myself. Something feels a bit off about it.

Probably nothing, just thought I'd mention it.

Thanks,
Liam`,
    actions: [
      {
        id: 'interview-liam',
        label: 'Interview Liam',
        cost: 2,
        description: 'In-depth interview — probing questions about the call',
        unlocksEvidence: 'EV-5'
      }
    ]
  },
  {
    id: 'TKT-4468',
    priority: 'low',
    status: 'open',
    category: 'Security — Phishing Report',
    from: {
      name: 'Jenny Marcos',
      email: 'jenny.marcos@xyzpay.com.au',
      department: 'Marketing'
    },
    subject: 'Suspicious email - please check',
    submitted: '2024-10-11T14:23:00+10:30',
    sla: '48 hours',
    content: `Hi Security team,

I received an email that looks a bit dodgy. It's asking me to click a link to "verify my account" for some retail analytics platform. I don't remember signing up for this. Screenshot attached.

Can you check if it's legit?

Thanks,
Jenny`,
    attachment: 'email_screenshot.png',
    actions: [
      {
        id: 'analyse-jenny-email',
        label: 'Analyse reported email',
        cost: 2,
        description: 'Full email header analysis, link investigation, vendor verification',
        unlocksEvidence: 'EV-6'
      },
      {
        id: 'jenny-email-safe',
        label: 'Inform Jenny: Email is safe',
        cost: 0,
        description: 'Reply to Jenny confirming the email is legitimate and close the ticket',
        requiresEvidence: ['EV-6'],
        closesTicket: true,
        exclusiveGroup: 'jenny-response'
      },
      {
        id: 'jenny-email-delete',
        label: 'Advise Jenny: Delete the email',
        cost: 0,
        description: 'Reply to Jenny advising her to delete the suspicious email and close the ticket',
        requiresEvidence: ['EV-6'],
        closesTicket: true,
        exclusiveGroup: 'jenny-response'
      }
    ]
  },
  
  // ============================================
  // ACTION-TRIGGERED TICKETS
  // ============================================
  {
    id: 'TKT-4475',
    priority: 'medium',
    status: 'open',
    category: 'Security — Vishing Report',
    triggeredBy: 'disable-liam', // Only shown after this action
    triggerDelaySeconds: 600, // 10 minutes of game time after action
    from: {
      name: 'David Chen',
      email: 'david.chen@xyzpay.com.au',
      department: 'Finance'
    },
    subject: 'Suspicious call from "IT Support"',
    submitted: '2024-10-14T08:45:00+10:30',
    sla: '4 hours',
    content: `Hi Security,

I just got a strange call from someone claiming to be from IT Support. The number was blocked/withheld.

They said there was a security issue with my account and asked me to verify my identity by reading out a one-time code that would be sent to my phone. This sounded exactly like the vishing attacks we were warned about in training, so I told them I'd call the IT helpdesk directly and hung up.

No code ever came through to my phone.

Wanted to flag this immediately given the security training we've had.

Thanks,
David`,
    actions: []
  }
]
