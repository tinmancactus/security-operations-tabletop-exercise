export default {
  ips: {
    '185.100.20.50': {
      type: 'ip',
      reputation: 'malicious',
      riskScore: 88,
      category: 'VPN/Proxy Service',
      country: 'Russia',
      asn: 'AS12345 - Host Provider Ltd',
      firstSeen: '2025-11-12',
      lastSeen: '2026-04-23',
      tags:['vpn', 'brute-force', 'credential-stuffing'],
      reports: 342,
      summary: 'Known malicious VPN exit node. Frequently used by cybercrime groups to launch credential stuffing attacks against financial institutions.',
      recommendation: 'Block at perimeter firewall.'
    }
  },
  domains: {},
  hashes: {},
  emails: {},
  suggestions:['185.100.20.50', 'emily.chen@xyzpay.com.au']
}