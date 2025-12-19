export default {
  'ceo': {
    id: 'ceo',
    name: 'Jane Executive',
    role: 'Chief Executive Officer',
    department: 'Executive',
    email: 'jane.executive@acme.com',
    avatar: '👩‍💼',
    image: null,
    reportsTo: null,
    location: 'Head Office',
    startDate: '2020-01-01',
    bio: 'CEO of Acme Corp.',
    calendar: [
      {
        day: 'Monday',
        entries: [
          { time: '09:00', duration: 60, title: 'Executive Meeting', location: 'Boardroom' }
        ]
      }
    ]
  },
  'it-manager': {
    id: 'it-manager',
    name: 'Bob Tech',
    role: 'IT Manager',
    department: 'IT',
    email: 'bob.tech@acme.com',
    avatar: '👨‍💻',
    image: null,
    reportsTo: 'ceo',
    location: 'Level 2',
    startDate: '2021-06-15',
    bio: 'Manages IT infrastructure and security.',
    calendar: []
  }
}
