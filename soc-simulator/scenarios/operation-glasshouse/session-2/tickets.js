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
    subject: 'I think I messed up — suspicious call on Saturday',
    submitted: '2024-10-15T07:52:00',
    sla: '4 hours',
    content: `Hi Security team,

I saw the email from Marcus yesterday afternoon about suspicious IT calls and I think I need to report something.

On Saturday around 2pm I got a call from someone saying they were from IT Support. They said there was a system migration happening and they needed to verify my identity. They asked me to read out a code that came through on my phone.

I didn't think much of it at the time — the guy sounded professional and knew my name and department. But after reading Marcus's email, I'm pretty sure that was one of the calls he was warning about.

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
    subject: 'Got a similar call to David — Sunday morning',
    submitted: '2024-10-15T07:58:00',
    sla: '4 hours',
    content: `Hi,

David Chen just told me about the call he got on Saturday and the security advisory. I got the same thing — a call on Sunday morning, around 9am. Someone claiming to be IT, asked me to verify a code on my phone.

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
  // DELAYED TICKET — arrives a few minutes in
  // ============================================
  {
    id: 'TKT-4482',
    priority: 'medium',
    status: 'open',
    category: 'Security — MFA Report',
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
        label: "Contain: Reset Tom's credentials",
        cost: 1,
        description: "Reset Tom Bradshaw's password and MFA token as a precaution",
        logMessage: "Reset tom.bradshaw credentials as precaution — no anomalous activity found",
        logType: 'containment',
        closesTicket: true
      }
    ]
  }
]
