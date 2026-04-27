export default[
  {
    id: 'EV-1',
    title: 'Auth Analysis: emily.chen',
    category: 'Log Analysis',
    content: `AUTHENTICATION LOG ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Analysis period: Last 24 Hours
User: emily.chen@xyzpay.com.au

FINDINGS:
1. At 07:50 ACDT, 4 failed login attempts (incorrect password) originated from 185.100.20.50.
2. At 07:52 ACDT, a SUCCESSFUL password authentication occurred from 185.100.20.50.
3. At 07:53 ACDT, an MFA push notification was generated and sent to the user's registered mobile device.
4. At 07:54 ACDT, the MFA request was explicitly DENIED by the user.

CONCLUSION:
The user's password has been successfully compromised, likely via a credential stuffing or phishing attack. 
However, the attacker was stopped by the Multi-Factor Authentication (MFA) challenge. The attacker currently has the correct password but no access.

RECOMMENDATION:
Immediate password reset required.`
  }
]