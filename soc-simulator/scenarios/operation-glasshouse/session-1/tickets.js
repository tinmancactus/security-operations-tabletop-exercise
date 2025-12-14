export default [
  {
    id: 'TKT-4471',
    priority: 'low',
    status: 'open',
    category: 'Security — General Inquiry',
    from: {
      name: 'Liam Fitzgerald',
      email: 'liam.fitzgerald@xyzpay.com.au',
      department: 'Customer Support'
    },
    subject: 'Weird call from IT department',
    submitted: '2024-10-13T16:42:00+10:30',
    sla: '48 hours',
    content: `Hi,

Got a call from IT support this morning asking me to verify something. Seemed legit but wanted to flag it just in case. Not urgent, just thought I'd mention it.

Thanks,
Liam`,
    actions: [
      {
        id: 'interview-liam',
        label: 'Interview Liam',
        cost: 2,
        description: 'In-depth interview — probing questions about the call',
        unlocksEvidence: 'EV-5'
      },
      {
        id: 'check-liam-account',
        label: 'Check Liam\'s account activity',
        cost: 2,
        description: 'Review authentication logs and recent activity for liam.fitzgerald',
        unlocksEvidence: 'EV-9',
        requiresEvidence: ['EV-5']
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
  }
]
