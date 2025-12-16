export default [
  // ============================================
  // NOISE TICKETS - SOC-appropriate security reports
  // ============================================
  {
    id: 'TKT-4469',
    priority: 'low',
    status: 'open',
    category: 'Security — Phishing Report',
    visibleAt: 300, // 5 min into session
    from: {
      name: 'Andrew Walsh',
      email: 'andrew.walsh@xyzpay.com.au',
      department: 'Sales'
    },
    subject: 'Suspicious email from "DocuSign"',
    submitted: '2024-10-14T08:05:00+10:30',
    sla: '24 hours',
    content: `Hi Security team,

I got an email this morning that looks like it's from DocuSign asking me to sign a contract. I don't remember any contracts pending so I thought I'd check before clicking anything.

Subject line was "Action Required: Contract #4892 awaiting your signature"

Is this legit or should I delete it?

Thanks,
Andrew`,
    actions: []
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

I'm trying to access contractpodai.com for our new contract management system but it's being blocked by the web filter. Legal has approved this tool and we need it for the Q4 contract review cycle.

Can you please review and whitelist this site?

Thanks,
Sophie`,
    actions: []
  },
  
  // ============================================
  // NOISE TICKETS - Appear during session
  // ============================================
  {
    id: 'TKT-4473',
    priority: 'low',
    status: 'open',
    category: 'Security — General Inquiry',
    visibleAt: 1200, // 20 min into session
    from: {
      name: 'Ben Harrison',
      email: 'ben.harrison@xyzpay.com.au',
      department: 'Engineering'
    },
    subject: 'Think my account might be compromised?',
    submitted: '2024-10-14T09:22:00+10:30',
    sla: '4 hours',
    content: `Hi Security,

I just checked my account activity and I'm seeing logins from a device I don't recognise - something called "Ben's iPhone" but I have an Android phone?

Wait... actually I think that might be my old work phone from before I switched. Can you confirm? Just want to make sure no one else is in my account.

Sorry if this is a false alarm!

Ben`,
    actions: []
  },
  
  // ============================================
  // STORY TICKETS - Key investigation items
  // ============================================
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
