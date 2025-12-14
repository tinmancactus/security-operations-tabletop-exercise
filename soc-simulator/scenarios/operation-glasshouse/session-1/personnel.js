// Base path for images - relative to scenario folder
const IMG_PATH = '/scenarios/operation-glasshouse/session-1/img'

export default {
  // Executive Team
  'david-whitmore': {
    id: 'david-whitmore',
    name: 'David Whitmore',
    role: 'Chief Executive Officer',
    department: 'Executive',
    email: 'david.whitmore@xyzpay.com.au',
    phone: '08 8XXX 0001',
    avatar: '👨‍💼',
    image: `${IMG_PATH}/david.jpg`,
    reportsTo: null,
    location: 'Level 5, Adelaide HQ',
    startDate: '2019-03-01',
    bio: 'Founder and CEO. Focused on Series C funding round. Not technically literate but trusts his executive team.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:30', duration: 90, title: 'Investor Call (Series C)', location: 'Private Office' },
        { time: '14:00', duration: 120, title: 'Board Preparation', location: 'Private Office' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '08:00', duration: 60, title: 'Breakfast with CFO', location: 'External' },
        { time: '11:00', duration: 60, title: 'All Hands Prep', location: 'Boardroom' },
        { time: '15:00', duration: 120, title: 'Series C Legal Review', location: 'Private Office' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 120, title: 'Board Meeting', location: 'Boardroom' },
        { time: '14:00', duration: 60, title: '1:1 with CTO', location: 'Private Office' },
      ]},
      { day: 'Thursday', entries: [
        { time: '10:00', duration: 60, title: '1:1 with CFO', location: 'Private Office' },
        { time: '13:00', duration: 180, title: 'Investor Site Visit', location: 'Adelaide HQ' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '11:00', duration: 60, title: 'All Hands Meeting', location: 'Town Hall' },
      ]},
    ]
  },

  'sandra-leigh': {
    id: 'sandra-leigh',
    name: 'Sandra Leigh',
    role: 'Chief Financial Officer',
    department: 'Executive',
    email: 'sandra.leigh@xyzpay.com.au',
    phone: '08 8XXX 0002',
    avatar: '👩‍💼',
    image: `${IMG_PATH}/sandra.jpg`,
    reportsTo: 'david-whitmore',
    location: 'Level 5, Adelaide HQ',
    startDate: '2020-06-15',
    bio: 'Oversees all financial operations. Sceptical of security spending. Known to find MFA "annoying".',
    // CRITICAL: Calendar shows she's in meetings when "she" sends suspicious emails in Session 2
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:00', duration: 120, title: 'Budget Review - IT', location: 'Finance Meeting Room' },
        { time: '14:00', duration: 60, title: '1:1 with Finance Team', location: 'Office' },
        { time: '16:00', duration: 60, title: 'Audit Committee Prep', location: 'Office' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '08:00', duration: 60, title: 'Breakfast with CEO', location: 'External' },
        { time: '10:00', duration: 120, title: 'Series C Financial Model Review', location: 'Boardroom' },
        { time: '14:00', duration: 120, title: 'External Auditor Call', location: 'Office', note: 'Do Not Disturb' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 120, title: 'Board Meeting', location: 'Boardroom', note: 'No devices - board policy' },
        { time: '12:00', duration: 60, title: 'Board Lunch', location: 'External' },
        { time: '14:00', duration: 120, title: 'Board Meeting (continued)', location: 'Boardroom', note: 'No devices - board policy' },
      ]},
      { day: 'Thursday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Team Standup', location: 'Finance Meeting Room' },
        { time: '10:00', duration: 60, title: '1:1 with CEO', location: 'CEO Office' },
        { time: '13:00', duration: 180, title: 'Investor Site Visit', location: 'Adelaide HQ' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:00', duration: 120, title: 'Month-End Close Review', location: 'Finance Meeting Room' },
        { time: '14:00', duration: 60, title: 'Weekly Finance Wrap', location: 'Office' },
      ]},
    ]
  },

  'michael-tran': {
    id: 'michael-tran',
    name: 'Michael Tran',
    role: 'Chief Technology Officer',
    department: 'Executive',
    email: 'michael.tran@xyzpay.com.au',
    phone: '08 8XXX 0003',
    avatar: '👨‍💻',
    image: `${IMG_PATH}/michael.jpg`,
    reportsTo: 'david-whitmore',
    location: 'Level 4, Adelaide HQ',
    startDate: '2019-05-01',
    bio: 'Oversees all technology. Has delegated security to Marcus. Supportive of SOC but conflict-averse.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:30', duration: 60, title: 'Engineering Leads Sync', location: 'Tech Hub' },
        { time: '14:00', duration: 60, title: '1:1 with CISO', location: 'Office' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 120, title: 'Architecture Review', location: 'Tech Hub' },
        { time: '14:00', duration: 60, title: 'Vendor Review - Cloud', location: 'Office' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 120, title: 'Board Meeting', location: 'Boardroom' },
        { time: '14:00', duration: 60, title: '1:1 with Infrastructure', location: 'Office' },
      ]},
      { day: 'Thursday', entries: [
        { time: '10:00', duration: 120, title: 'Sprint Planning', location: 'Tech Hub' },
        { time: '14:00', duration: 60, title: 'Security Uplift Review', location: 'SOC' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '11:00', duration: 60, title: 'All Hands Meeting', location: 'Town Hall' },
        { time: '14:00', duration: 60, title: 'Tech Debt Review', location: 'Tech Hub' },
      ]},
    ]
  },

  // Security Team
  'marcus-chen': {
    id: 'marcus-chen',
    name: 'Marcus Chen',
    role: 'Chief Information Security Officer',
    department: 'Security',
    email: 'marcus.chen@xyzpay.com.au',
    phone: '08 8XXX 1001',
    avatar: '🛡️',
    image: `${IMG_PATH}/marcus.jpg`,
    reportsTo: 'david-whitmore',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2023-08-01',
    bio: 'Joined 14 months ago from Big 4 consulting. Competent but stretched thin. Still building credibility with the board.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:30', duration: 60, title: 'SOC Team Sync', location: 'SOC' },
        { time: '14:00', duration: 60, title: '1:1 with CTO', location: 'CTO Office' },
        { time: '15:30', duration: 60, title: 'Vendor Call - SIEM', location: 'Office' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'Risk Committee Prep', location: 'Office' },
        { time: '11:00', duration: 60, title: '1:1 with Priya', location: 'SOC' },
        { time: '14:00', duration: 120, title: 'Security Awareness Training', location: 'Training Room' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 120, title: 'Board Meeting (Security Update)', location: 'Boardroom' },
        { time: '14:00', duration: 60, title: 'Incident Response Planning', location: 'SOC' },
      ]},
      { day: 'Thursday', entries: [
        { time: '09:00', duration: 60, title: 'Threat Intel Review', location: 'SOC' },
        { time: '10:30', duration: 90, title: 'Security Uplift Review', location: 'Tech Hub' },
        { time: '14:00', duration: 60, title: 'Compliance Review', location: 'Office' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'Executive Standup', location: 'Boardroom' },
        { time: '10:30', duration: 60, title: 'SOC Weekly Wrap', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'Security Metrics Review', location: 'Office' },
      ]},
    ]
  },

  'priya-sharma': {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    department: 'Security',
    email: 'priya.sharma@xyzpay.com.au',
    phone: '08 8XXX 1002',
    avatar: '👩‍💼',
    image: `${IMG_PATH}/priya.jpg`,
    reportsTo: 'marcus-chen',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2022-03-15',
    bio: 'Built the SOC from scratch. Pragmatic and supportive but expects evidence, not hunches. First escalation point for Medium+ severity.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '08:30', duration: 30, title: 'SOC Handover (Night Shift)', location: 'SOC' },
        { time: '10:30', duration: 60, title: 'SOC Team Sync', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'Alert Tuning Review', location: 'SOC' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '08:30', duration: 30, title: 'SOC Handover', location: 'SOC' },
        { time: '11:00', duration: 60, title: '1:1 with Marcus', location: 'CISO Office' },
        { time: '14:00', duration: 60, title: 'Playbook Review', location: 'SOC' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '08:30', duration: 30, title: 'SOC Handover', location: 'SOC' },
        { time: '10:00', duration: 60, title: '1:1s with Analysts', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'IR Planning with James', location: 'SOC' },
      ]},
      { day: 'Thursday', entries: [
        { time: '08:30', duration: 30, title: 'SOC Handover', location: 'SOC' },
        { time: '09:00', duration: 60, title: 'Threat Intel Review', location: 'SOC' },
        { time: '14:00', duration: 120, title: 'Security Uplift Review', location: 'Tech Hub' },
      ]},
      { day: 'Friday', entries: [
        { time: '08:30', duration: 30, title: 'SOC Handover', location: 'SOC' },
        { time: '10:30', duration: 60, title: 'SOC Weekly Wrap', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'Metrics & Reporting', location: 'SOC' },
      ]},
    ]
  },

  'james-okoro': {
    id: 'james-okoro',
    name: 'James Okoro',
    role: 'Senior IR Analyst (Tier 3)',
    department: 'Security',
    email: 'james.okoro@xyzpay.com.au',
    phone: '0412 XXX XXX',
    avatar: '🔬',
    image: `${IMG_PATH}/james.jpg`,
    reportsTo: 'priya-sharma',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2022-06-01',
    bio: 'Only Tier 3 analyst. Handles forensics, malware analysis, and leads major IR. Technically brilliant but can be brusque when overworked.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 180, title: 'Forensics Lab Time', location: 'SOC Lab' },
        { time: '14:00', duration: 120, title: 'Malware Analysis', location: 'SOC Lab' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 120, title: 'Threat Hunting', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'Tool Development', location: 'SOC Lab' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 120, title: 'Case Review', location: 'SOC' },
        { time: '14:00', duration: 60, title: 'IR Planning with Priya', location: 'SOC' },
        { time: '15:30', duration: 90, title: 'Analyst Training', location: 'Training Room' },
      ]},
      { day: 'Thursday', entries: [
        { time: '09:00', duration: 60, title: 'Threat Intel Review', location: 'SOC' },
        { time: '10:30', duration: 150, title: 'Deep Dive Analysis', location: 'SOC Lab' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'SOC Weekly Wrap', location: 'SOC' },
        { time: '10:30', duration: 120, title: 'Documentation', location: 'SOC' },
        { time: '14:00', duration: 120, title: 'Research Time', location: 'SOC Lab' },
      ]},
    ]
  },

  // Infrastructure
  'rachel-torres': {
    id: 'rachel-torres',
    name: 'Rachel Torres',
    role: 'Infrastructure Manager',
    department: 'IT Operations',
    email: 'rachel.torres@xyzpay.com.au',
    phone: '08 8XXX 2001',
    avatar: '👩‍🔧',
    image: `${IMG_PATH}/rachel.jpg`,
    reportsTo: 'michael-tran',
    location: 'Level 4, Adelaide HQ',
    startDate: '2020-02-01',
    bio: 'Manages servers, networking, AD, backups, and patching. Team is perpetually behind on patching due to business pressure to avoid downtime.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '08:00', duration: 60, title: 'Infrastructure Standup', location: 'Server Room' },
        { time: '10:00', duration: 120, title: 'Patching Planning', location: 'Office' },
        { time: '14:00', duration: 60, title: 'Change Advisory Board', location: 'Tech Hub' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '08:00', duration: 60, title: 'Infrastructure Standup', location: 'Server Room' },
        { time: '10:00', duration: 180, title: 'Maintenance Window Prep', location: 'Server Room' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '08:00', duration: 60, title: 'Infrastructure Standup', location: 'Server Room' },
        { time: '14:00', duration: 60, title: '1:1 with CTO', location: 'CTO Office' },
      ]},
      { day: 'Thursday', entries: [
        { time: '08:00', duration: 60, title: 'Infrastructure Standup', location: 'Server Room' },
        { time: '10:00', duration: 120, title: 'Capacity Planning', location: 'Office' },
        { time: '14:00', duration: 60, title: 'Security Uplift Review', location: 'SOC' },
      ]},
      { day: 'Friday', entries: [
        { time: '08:00', duration: 60, title: 'Infrastructure Standup', location: 'Server Room' },
        { time: '10:00', duration: 60, title: 'Weekly Metrics', location: 'Office' },
        { time: '22:00', duration: 240, title: 'Maintenance Window', location: 'Server Room', note: 'Monthly patching' },
      ]},
    ]
  },

  // Employees (Social Engineering Victims)
  'liam-fitzgerald': {
    id: 'liam-fitzgerald',
    name: 'Liam Fitzgerald',
    role: 'Customer Support Team Lead',
    department: 'Customer Support',
    email: 'liam.fitzgerald@xyzpay.com.au',
    phone: '08 8XXX 3001',
    avatar: '👨‍💻',
    image: `${IMG_PATH}/liam.jpg`,
    reportsTo: null, // Reports to CS Manager (not in org chart)
    location: 'Level 2, Adelaide HQ',
    startDate: '2021-04-01',
    bio: 'Leads the customer support team. Helpful and trusting - perhaps too trusting.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'CS Team Standup', location: 'Support Floor' },
        { time: '14:00', duration: 60, title: 'Queue Review', location: 'Support Floor' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'CS Team Standup', location: 'Support Floor' },
        { time: '11:00', duration: 60, title: 'Training - New Hires', location: 'Training Room' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 60, title: 'CS Team Standup', location: 'Support Floor' },
        { time: '14:00', duration: 60, title: '1:1s', location: 'Meeting Room' },
      ]},
      { day: 'Thursday', entries: [
        { time: '09:00', duration: 60, title: 'CS Team Standup', location: 'Support Floor' },
        { time: '10:00', duration: 60, title: 'Escalation Review', location: 'Support Floor' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'CS Team Standup', location: 'Support Floor' },
        { time: '15:00', duration: 60, title: 'Weekly Wrap', location: 'Support Floor' },
      ]},
    ]
  },

  'anika-patel': {
    id: 'anika-patel',
    name: 'Anika Patel',
    role: 'Finance Analyst',
    department: 'Finance',
    email: 'anika.patel@xyzpay.com.au',
    phone: '08 8XXX 4001',
    avatar: '👩‍💼',
    image: `${IMG_PATH}/anika.jpg`,
    reportsTo: 'sandra-leigh',
    location: 'Level 5, Adelaide HQ',
    startDate: '2022-01-15',
    bio: 'Finance team analyst. Reports to Sandra. More cautious than Liam but still fell for vishing attack.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Standup', location: 'Finance Meeting Room' },
        { time: '10:00', duration: 120, title: 'Budget Review Support', location: 'Finance Meeting Room' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Standup', location: 'Finance Meeting Room' },
        { time: '10:00', duration: 180, title: 'Series C Model Work', location: 'Desk' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Standup', location: 'Finance Meeting Room' },
        { time: '14:00', duration: 60, title: '1:1 with Sandra', location: 'CFO Office' },
      ]},
      { day: 'Thursday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Standup', location: 'Finance Meeting Room' },
        { time: '10:00', duration: 120, title: 'Reconciliation', location: 'Desk' },
      ]},
      { day: 'Friday', entries: [
        { time: '09:00', duration: 60, title: 'Finance Standup', location: 'Finance Meeting Room' },
        { time: '14:00', duration: 60, title: 'Weekly Finance Wrap', location: 'Finance Meeting Room' },
      ]},
    ]
  },

  // SOC Analysts
  'alex-anderson': {
    id: 'alex-anderson',
    name: 'Alex Anderson',
    role: 'SOC Analyst (Night Shift)',
    department: 'Security',
    email: 'alex.anderson@xyzpay.com.au',
    phone: '08 8XXX 1003',
    avatar: '🌙',
    image: `${IMG_PATH}/alex.jpg`,
    reportsTo: 'priya-sharma',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2023-01-10',
    bio: 'Night shift SOC analyst. Handles overnight monitoring and prepares handover notes for the day team. Thorough but sometimes misses context that develops during business hours.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '22:00', duration: 480, title: 'Night Shift', location: 'SOC' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '22:00', duration: 480, title: 'Night Shift', location: 'SOC' },
      ]},
      { day: 'Wednesday', entries: [
        { time: '22:00', duration: 480, title: 'Night Shift', location: 'SOC' },
      ]},
      { day: 'Thursday', entries: [
        { time: '22:00', duration: 480, title: 'Night Shift', location: 'SOC' },
      ]},
      { day: 'Friday', entries: [
        { time: '14:00', duration: 60, title: 'SOC Weekly Wrap', location: 'SOC' },
      ]},
    ]
  },
}
