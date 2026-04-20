// Session 2 personnel — reuse Session 1 personnel and add new characters
// David Chen (Sales), Nadia Khoury (Marketing), Tom Bradshaw (Sales)
// All three compromised via vishing; come forward after Monday security advisory

import session1Personnel from '../session-1/personnel.js'

export default {
  ...session1Personnel,
  
  // New characters for Session 2
  'david-chen': {
    id: 'david-chen',
    name: 'David Chen',
    role: 'Merchant Partnerships Manager',
    department: 'Sales',
    email: 'david.chen@xyzpay.com.au',
    avatar: '👨‍💼',
    image: null, // TODO: Add profile image
    reportsTo: null,
    location: 'Level 2, Adelaide HQ',
    startDate: '2021-09-01',
    bio: 'Manages merchant partnerships and onboarding. Compromised via vishing on Saturday — account accessed briefly by attacker but never used.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Sales Standup', location: 'Sales Floor' },
        { time: '10:00', duration: 120, title: 'Merchant Onboarding Calls', location: 'Meeting Room' },
        { time: '14:00', duration: 60, title: 'Pipeline Review', location: 'Sales Floor' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'Sales Standup', location: 'Sales Floor' },
        { time: '10:00', duration: 180, title: 'Merchant Site Visits', location: 'External' },
      ]},
    ]
  },

  'nadia-khoury': {
    id: 'nadia-khoury',
    name: 'Nadia Khoury',
    role: 'Marketing Coordinator',
    department: 'Marketing',
    email: 'nadia.khoury@xyzpay.com.au',
    avatar: '👩‍💼',
    image: null, // TODO: Add profile image
    reportsTo: null,
    location: 'Level 2, Adelaide HQ',
    startDate: '2023-03-15',
    bio: 'Coordinates marketing campaigns and social media. Compromised via vishing on Sunday — account accessed briefly from EU VPN but never used.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Marketing Standup', location: 'Marketing Pod' },
        { time: '10:00', duration: 120, title: 'Campaign Review', location: 'Marketing Pod' },
        { time: '14:00', duration: 60, title: 'Content Planning', location: 'Marketing Pod' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'Marketing Standup', location: 'Marketing Pod' },
        { time: '10:00', duration: 120, title: 'Social Media Calendar', location: 'Desk' },
      ]},
    ]
  },

  'tom-bradshaw': {
    id: 'tom-bradshaw',
    name: 'Tom Bradshaw',
    role: 'Account Executive',
    department: 'Sales',
    email: 'tom.bradshaw@xyzpay.com.au',
    avatar: '👨‍�',
    image: null, // TODO: Add profile image
    reportsTo: null,
    location: 'Level 2, Adelaide HQ',
    startDate: '2023-06-12',
    bio: 'Account executive focused on mid-market merchants.',
    calendar: [
      { day: 'Monday', entries: [
        { time: '09:00', duration: 60, title: 'Sales Standup', location: 'Sales Floor' },
        { time: '10:00', duration: 120, title: 'Client Calls', location: 'Meeting Room' },
        { time: '14:00', duration: 60, title: 'Pipeline Review', location: 'Sales Floor' },
      ]},
      { day: 'Tuesday', entries: [
        { time: '09:00', duration: 60, title: 'Sales Standup', location: 'Sales Floor' },
        { time: '10:00', duration: 120, title: 'Client Calls', location: 'Meeting Room' },
      ]},
    ]
  }
}
