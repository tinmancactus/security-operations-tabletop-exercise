// Session 2 service tickets
// Vishing reports from staff who came forward after Monday's security advisory

export default [
  // ============================================
  // VISHING REPORTS — visible at session start
  // ============================================
  {
    id: 'TKT-4480',
    priority: 'medium',
    status: 'open',
    category: 'Security — Vishing Report',
    from: {
      name: 'David Chen',
      email: 'david.chen@xyzpay.com.au',
      department: 'Sales'
    },
    subject: 'Suspicious call on Saturday',
    submitted: '2024-10-15T07:52:00',
    sla: '4 hours',
    content: `Hi Security team,

I saw the email from Marcus yesterday afternoon about suspicious IT calls and I think I need to report something.

On Saturday around 2pm I got a call from someone saying they were from IT Support. They said there was a system migration happening and they needed to verify my identity. They asked me to read out a code that came through on my phone.

I didn't think much of it at the time. The guy sounded professional and knew my name and department. But after reading Marcus's email, I'm pretty sure that was one of the calls he was warning about.

I'm really sorry if I've caused a problem. Please let me know what I need to do.

David Chen
Merchant Partnerships`,
    actions: [
      {
        id: 'contain-david',
        label: "Contain: Block IP & reset David's credentials",
        cost: 1,
        description: "Block the attacker's source IP and reset David Chen's password and MFA token",
        logMessage: "Contained david.chen: source IP blocked, password and MFA reset",
        logType: 'containment',
        closesTicket: true
      }
    ]
  },
  {
    id: 'TKT-4481',
    priority: 'medium',
    status: 'open',
    category: 'Security — Vishing Report',
    from: {
      name: 'Nadia Khoury',
      email: 'nadia.khoury@xyzpay.com.au',
      department: 'Marketing'
    },
    subject: 'Suspicious phone call',
    submitted: '2024-10-15T07:58:00',
    sla: '4 hours',
    content: `Hi,

David Chen just told me about the call he got on Saturday and the security advisory. I got the same thing: a call on Sunday morning, around 9am. He said he was from IT and asked me to verify a code on my phone.

I gave them the code. It seemed completely normal at the time.

I didn't think anything of it until David mentioned his call just now. Is this bad?

Nadia`,
    actions: [
      {
        id: 'contain-nadia',
        label: "Contain: Block IP & reset Nadia's credentials",
        cost: 1,
        description: "Block the attacker's source IP and reset Nadia Khoury's password and MFA token",
        logMessage: "Contained nadia.khoury: source IP blocked, password and MFA reset",
        logType: 'containment',
        closesTicket: true
      }
    ]
  },

  // ============================================
  // VISHING REPORTS — staff who hung up (not compromised)
  // ============================================
  {
    id: 'TKT-4475',
    priority: 'low',
    status: 'open',
    category: 'Security — Vishing Report',
    from: {
      name: 'Linda Park',
      email: 'linda.park@xyzpay.com.au',
      department: 'HR'
    },
    subject: 'Call from IT',
    submitted: '2024-10-14T17:08:00',
    sla: '8 hours',
    content: `Hi Security,

I just read the security advisory that went out. I got a call like that on Monday around 2:30pm, before the email came out.

A man called saying he was from IT Support and asked me to confirm some account details and read out a code from my phone. I thought it sounded a bit off as we normally just do MFA through the app, not over the phone. I told him I'd call the help desk back myself and he hung up pretty quickly after that.

I didn't think much of it at the time but after reading Marcus's email I figured I should report it.

I didn't give him any codes or passwords.

Linda Park
HR Coordinator`,
    actions: [
      {
        id: 'review-linda',
        label: 'Review and acknowledge',
        cost: 1,
        description: 'Verify no compromise, log vishing attempt as intelligence',
        notification: 'Linda Park: No compromise. Vishing attempt logged as campaign intelligence.',
        logMessage: 'Reviewed linda.park vishing report — no compromise, call attempt logged',
        logType: 'investigation',
        closesTicket: true
      }
    ]
  },
  {
    id: 'TKT-4476',
    priority: 'low',
    status: 'open',
    category: 'Security — Vishing Report',
    from: {
      name: 'Mei Zhang',
      email: 'mei.zhang@xyzpay.com.au',
      department: 'Finance'
    },
    subject: 'Weird call last week',
    submitted: '2024-10-14T23:42:00',
    sla: '8 hours',
    content: `Hi,

Sorry for the late email. I\'ve been thinking about Marcus\'s security advisory since I read it this afternoon and I think I should report something.

Last week I got a call from someone saying they were from IT. They said my account needed to be re-verified because of a system update. They asked me to read a code from my phone.

I was in a meeting at the time so I said I\'d call back. They said it was urgent and I really needed to do it now. I told them I was busy and hung up. They didn't call back.

I don\'t think I gave them anything but wanted to flag it just in case.

Mei Zhang
Finance`,
    actions: [
      {
        id: 'review-mei',
        label: 'Review and acknowledge',
        cost: 1,
        description: 'Verify no compromise, log vishing attempt as intelligence',
        notification: 'Mei Zhang: No compromise. Vishing attempt logged — note early date (Thursday 10th).',
        logMessage: 'Reviewed mei.zhang vishing report — no compromise, attempt dated Thu 10 Oct (pre-Liam)',
        logType: 'investigation',
        closesTicket: true
      }
    ]
  },

  // ============================================
  // DELAYED TICKETS — arrive during session
  // ============================================
  {
    id: 'TKT-4477',
    priority: 'low',
    status: 'open',
    category: 'Security — Vishing Report',
    visibleAt: 900, // ~15 minutes into session
    notification: {
      message: 'New service ticket from Ben Torres (Engineering)',
      type: 'info'
    },
    from: {
      name: 'Ben Torres',
      email: 'ben.torres@xyzpay.com.au',
      department: 'Engineering'
    },
    subject: 'Reporting a suspicious call from Saturday',
    submitted: '2024-10-15T08:15:00',
    sla: '8 hours',
    content: `Hey team,

Couple of people in the office were talking about getting weird IT calls. I got one too on Saturday arvo, maybe around 3:30. Guy said he was from the help desk and needed me to verify my account.

I was at the pub so I just told him I\'d sort it out Monday and hung up. He seemed annoyed but didn\'t push it.

Just flagging it in case it\'s part of the same thing. Didn\'t give him anything.

Ben`,
    actions: [
      {
        id: 'review-ben',
        label: 'Review and acknowledge',
        cost: 1,
        description: 'Verify no compromise, log vishing attempt as intelligence',
        notification: 'Ben Torres: No compromise. Vishing attempt logged as campaign intelligence.',
        logMessage: 'Reviewed ben.torres vishing report — no compromise, call attempt Sat afternoon logged',
        logType: 'investigation',
        closesTicket: true
      }
    ]
  },
  {
    id: 'TKT-4482',
    priority: 'medium',
    status: 'open',
    category: 'MFA Reset on new phone',
    visibleAt: 180, // 3 minutes into session
    notification: {
      message: 'New service ticket from Tom Bradshaw',
      type: 'info'
    },
    from: {
      name: 'Tom Bradshaw',
      email: 'tom.bradshaw@xyzpay.com.au',
      department: 'Sales'
    },
    subject: 'MFA setup on new phone',
    submitted: '2024-10-15T08:03:00',
    sla: '4 hours',
    content: `Hi Security,

Hi team, I just read Marcus's email and thought I should flag something just in case.

I recently switched to a new phone and needed to get my authenticator app set up again. I called the IT help desk on Monday morning and they walked me through re-enrolling my MFA.

Is that the kind of thing you're looking for? It wasn't a call TO me, I called them. But I wanted to mention it given what's going on.

Tom Bradshaw
Sales`,
    actions: [
      {
        id: 'contain-tom',
        label: "Contain: Block IP & reset Tom's credentials",
        cost: 1,
        description: "Block the attacker's source IP and reset Tom Bradshaw's password and MFA token",
        logMessage: "Reset tom.bradshaw credentials as precaution — no anomalous activity found",
        logType: 'containment',
        closesTicket: true
      }
    ]
  }
]
