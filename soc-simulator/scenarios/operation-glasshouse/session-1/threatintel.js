// Threat Intelligence Database for Session 1
// Contains IOC lookups for IPs, domains, hashes, and emails

export default {
  // IP Address Intelligence
  ips: {
    // Credential stuffing sources (Tor exit nodes)
    '185.220.101.42': {
      type: 'ip',
      reputation: 'malicious',
      riskScore: 85,
      category: 'Tor Exit Node',
      country: 'Germany',
      asn: 'AS205100 - F3 Netze e.V.',
      firstSeen: '2023-01-15',
      lastSeen: '2024-10-14',
      tags: ['tor', 'proxy', 'credential-stuffing', 'brute-force'],
      reports: 1247,
      summary: 'Known Tor exit node frequently associated with credential stuffing campaigns and automated scanning activity. High volume of authentication attempts across multiple sectors.',
      relatedCampaigns: ['Credential Harvesting Wave Q3 2024'],
      recommendation: 'Block at perimeter. Do not consider logins from this IP as legitimate.'
    },
    '91.240.118.29': {
      type: 'ip',
      reputation: 'malicious',
      riskScore: 82,
      category: 'Tor Exit Node',
      country: 'Netherlands',
      asn: 'AS51852 - Private Layer INC',
      firstSeen: '2022-08-20',
      lastSeen: '2024-10-14',
      tags: ['tor', 'proxy', 'credential-stuffing', 'scanner'],
      reports: 892,
      summary: 'Tor exit node with history of credential stuffing and vulnerability scanning. Part of rotating proxy infrastructure used by multiple threat actors.',
      relatedCampaigns: ['Credential Harvesting Wave Q3 2024'],
      recommendation: 'Block at perimeter. Monitor for any successful authentications.'
    },
    '194.26.192.71': {
      type: 'ip',
      reputation: 'malicious',
      riskScore: 78,
      category: 'Tor Exit Node',
      country: 'Romania',
      asn: 'AS9009 - M247 Ltd',
      firstSeen: '2023-05-10',
      lastSeen: '2024-10-14',
      tags: ['tor', 'proxy', 'brute-force'],
      reports: 654,
      summary: 'Tor exit node associated with brute force attacks. Commonly rotated with other exit nodes in coordinated campaigns.',
      relatedCampaigns: [],
      recommendation: 'Block at perimeter.'
    },
    
    // THE REAL ATTACK - Indonesian VPN
    '103.42.91.17': {
      type: 'ip',
      reputation: 'suspicious',
      riskScore: 45,
      category: 'VPN/Proxy Service',
      country: 'Indonesia',
      asn: 'AS138915 - PT. Mora Telematika Indonesia',
      firstSeen: '2024-06-22',
      lastSeen: '2024-10-14',
      tags: ['vpn', 'proxy', 'commercial-vpn'],
      reports: 12,
      summary: 'Commercial VPN endpoint in Indonesia. Limited threat intelligence available. Used by privacy-conscious users but also occasionally by threat actors for geographic obfuscation.',
      relatedCampaigns: [],
      recommendation: 'Contextual analysis required. Legitimate VPN use is possible, but unusual for corporate access. Verify with user if unexpected.'
    },
    
    // Legitimate IPs (for comparison)
    '203.45.67.89': {
      type: 'ip',
      reputation: 'clean',
      riskScore: 5,
      category: 'Residential ISP',
      country: 'Australia',
      asn: 'AS1221 - Telstra',
      firstSeen: '2024-01-10',
      lastSeen: '2024-10-14',
      tags: ['residential', 'australian-isp'],
      reports: 0,
      summary: 'Australian residential IP address. No malicious activity reported.',
      relatedCampaigns: [],
      recommendation: 'No action required.'
    },
    '118.209.33.12': {
      type: 'ip',
      reputation: 'clean',
      riskScore: 3,
      category: 'Residential ISP',
      country: 'Australia',
      asn: 'AS4804 - Microplex PTY LTD',
      firstSeen: '2024-03-15',
      lastSeen: '2024-10-14',
      tags: ['residential', 'australian-isp'],
      reports: 0,
      summary: 'Australian residential IP address. No malicious activity reported.',
      relatedCampaigns: [],
      recommendation: 'No action required.'
    }
  },

  // Domain Intelligence
  domains: {
    'amaz0n-verify.com': {
      type: 'domain',
      reputation: 'malicious',
      riskScore: 95,
      category: 'Phishing',
      registrar: 'NameCheap Inc.',
      registrationDate: '2024-10-01',
      expirationDate: '2025-10-01',
      tags: ['phishing', 'typosquat', 'brand-impersonation', 'amazon'],
      reports: 234,
      summary: 'Typosquatting domain impersonating Amazon. Used in credential phishing campaigns targeting corporate email users. Note the zero instead of "o".',
      relatedCampaigns: ['Amazon Credential Phishing Oct 2024'],
      recommendation: 'Block domain. Report to abuse@namecheap.com. Check if any users clicked links from this domain.'
    },
    'retailmetrics.com.au': {
      type: 'domain',
      reputation: 'clean',
      riskScore: 5,
      category: 'Business Services',
      registrar: 'Melbourne IT',
      registrationDate: '2018-03-15',
      expirationDate: '2025-03-15',
      tags: ['legitimate', 'analytics', 'australian-business'],
      reports: 0,
      summary: 'Legitimate Australian business analytics company. Provides retail metrics and reporting services.',
      relatedCampaigns: [],
      recommendation: 'No action required. Legitimate business domain.'
    },
    'xyzpay.com.au': {
      type: 'domain',
      reputation: 'clean',
      riskScore: 0,
      category: 'Internal',
      registrar: 'Melbourne IT',
      registrationDate: '2019-01-10',
      expirationDate: '2026-01-10',
      tags: ['internal', 'corporate'],
      reports: 0,
      summary: 'XYZ Pay corporate domain. This is our organisation.',
      relatedCampaigns: [],
      recommendation: 'Internal domain - no action required.'
    }
  },

  // Hash Intelligence (for future sessions with malware)
  hashes: {
    'e99a18c428cb38d5f260853678922e03': {
      type: 'hash',
      hashType: 'MD5',
      reputation: 'malicious',
      riskScore: 90,
      category: 'Malware',
      malwareFamily: 'Generic Trojan',
      firstSeen: '2024-08-15',
      lastSeen: '2024-10-10',
      tags: ['trojan', 'infostealer', 'credential-theft'],
      reports: 45,
      summary: 'Information stealing trojan. Harvests browser credentials, cookies, and cryptocurrency wallets. Delivered via phishing attachments.',
      relatedCampaigns: ['InfoStealer Campaign Aug 2024'],
      recommendation: 'Isolate affected system. Full forensic analysis required.'
    }
  },

  // Email Intelligence
  emails: {
    'support@amaz0n-verify.com': {
      type: 'email',
      reputation: 'malicious',
      riskScore: 95,
      category: 'Phishing',
      domain: 'amaz0n-verify.com',
      tags: ['phishing', 'brand-impersonation'],
      reports: 156,
      summary: 'Phishing email address associated with Amazon credential theft campaign. Sends fake account verification emails.',
      relatedCampaigns: ['Amazon Credential Phishing Oct 2024'],
      recommendation: 'Block sender. Check mail logs for recipients who received emails from this address.'
    }
  },

  // Search suggestions for autocomplete
  suggestions: [
    '185.220.101.42',
    '91.240.118.29', 
    '194.26.192.71',
    '103.42.91.17',
    '203.45.67.89',
    'amaz0n-verify.com',
    'retailmetrics.com.au',
    'xyzpay.com.au',
    'support@amaz0n-verify.com'
  ]
}
