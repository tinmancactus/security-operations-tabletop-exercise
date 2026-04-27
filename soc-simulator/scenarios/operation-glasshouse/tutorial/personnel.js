import images from './images.js'

export default {
  'priya-sharma': {
    id: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    department: 'Security',
    email: 'priya.sharma@xyzpay.com.au',
    avatar: '👩‍💼',
    image: images.priya,
    reportsTo: 'marcus-chen',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2022-03-15',
    bio: 'Built the SOC from scratch. Pragmatic and supportive but expects evidence, not hunches. First escalation point for Medium+ severity.',
    calendar: []
  },

  'james-okoro': {
    id: 'james-okoro',
    name: 'James Okoro',
    role: 'Senior IR Analyst (Tier 3)',
    department: 'Security',
    email: 'james.okoro@xyzpay.com.au',
    avatar: '🔬',
    image: images.james,
    reportsTo: 'priya-sharma',
    location: 'Level 3, Adelaide HQ (SOC)',
    startDate: '2022-06-01',
    bio: 'Only Tier 3 analyst. Handles forensics, malware analysis, and leads major IR. Technically brilliant but can be brusque when overworked.',
    calendar: []
  },
  'emily-chen': {
    id: 'emily-chen',
    name: 'Emily Chen',
    role: 'Marketing Coordinator',
    department: 'Marketing',
    email: 'emily.chen@xyzpay.com.au',
    avatar: '👩‍💻',
    image: images.emily,
    reportsTo: null,
    location: 'Level 2, Adelaide HQ',
    startDate: '2023-02-10',
    bio: 'Handles social media and digital marketing campaigns.',
    calendar: []
  }
}