export default [
  {
    id: 'EV-21',
    title: 'Company-Wide Security Advisory',
    category: 'Internal Communication',
    content: `FROM:    Marcus Chen (CISO)
TO:      all-staff@xyzpay.com.au
DATE:    Monday 14 October 2024, 4:40 PM ACDT
SUBJECT: IMPORTANT: Security Alert — Suspicious IT Calls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Team,

We've become aware of suspicious phone calls being
made to XYZ staff by individuals impersonating our
IT Support team.

These calls may ask you to:

• Verify your identity by providing a one-time code
  sent to your phone
• Share your password or login details
• Install software or click a link

IMPORTANT REMINDERS:

• XYZ IT will NEVER ask you to share an MFA code
  over the phone
• If you receive a suspicious call, hang up and
  report it immediately to the SOC at
  soc@xyzpay.com.au or ext. 4400
• If you believe you may have shared any credentials
  or codes with an unknown caller, please report
  this urgently — even if you're not sure

This is not a drill. We are actively investigating
a potential security incident. Your cooperation is
critical.

If you have any concerns or believe you may have
been contacted, please reach out to the Security
Operations Centre immediately. No judgement — early
reporting helps us protect everyone.

Marcus Chen
Chief Information Security Officer
XYZ Pay`
  },
  {
    id: 'EV-20',
    title: 'Customer Impact Assessment',
    category: 'IR Report',
    unlockedAtStart: true,
    content: `████████████████████████████████████████████████████████
██                                                    ██
██   ⛔  CONFIDENTIAL — IR USE ONLY                   ██
██   DO NOT DISTRIBUTE WITHOUT CISO APPROVAL          ██
██                                                    ██
████████████████████████████████████████████████████████

CUSTOMER IMPACT ASSESSMENT
Incident: IR-2024-0847 — Account Compromise & Data Access
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prepared by:   James Okoro, Senior IR Analyst (Tier 3)
Date:          Monday, 14 October 2024
Classification: CONFIDENTIAL — IR USE ONLY
Distribution:  SOC Team (IR-2024-0847 responders only)
               DO NOT forward, copy, or share outside
               the incident response team without written
               CISO approval.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. EXECUTIVE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

On Monday 14 October 2024 at approximately 07:52 ACDT,
an unknown threat actor used compromised credentials
belonging to Liam Fitzgerald (Customer Support Officer)
to access XYZ Pay's internal systems. The attacker
accessed the customer_transactions_db and queried
2,847 customer records.

This report identifies all 2,847 affected customers
by cross-referencing the accessed transaction IDs
against the PII database (customer_pii_db). While
the attacker did NOT have direct access to the PII
database, the data in this report combines both
sources and therefore contains PERSONALLY IDENTIFIABLE
INFORMATION linked to financial transaction data.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. SCOPE OF ACCESS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Database accessed:  customer_transactions_db
Access time:        2024-10-14 08:22:00 ACDT
Access method:      SQL query via internal reporting tool
                    (report-builder.internal.xyzpay.com.au)
Credential used:    liam.fitzgerald@xyzpay.com.au
Source IP:          103.42.91.17 (Indonesian VPN endpoint)
Records returned:   2,847 rows
Query executed:     SELECT * FROM customer_transactions
                    WHERE created_date >= '2024-07-01'
                    AND (late_fee_count > 0
                    OR hardship_flag = TRUE)

NOTE: The query specifically targeted customers with
late fees or hardship flags. This was not a random
data dump — the attacker knew what they were looking
for.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. DATA CATEGORIES ACCESSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following fields were present in the query results:

FROM customer_transactions_db (accessed by attacker):
┌─────────────────────┬───────────────────────────┐
│ Field               │ Sensitivity               │
├─────────────────────┼───────────────────────────┤
│ customer_id         │ Internal identifier       │
│ transaction_id      │ Internal identifier       │
│ transaction_amount  │ Financial (sensitive)      │
│ transaction_date    │ Low                        │
│ merchant_name       │ Medium (purchase context)  │
│ late_fee_count      │ Financial (sensitive)      │
│ late_fee_total      │ Financial (sensitive)      │
│ hardship_flag       │ Highly sensitive           │
│ payment_plan_status │ Financial (sensitive)      │
│ days_overdue        │ Financial (sensitive)      │
│ total_balance_owing │ Financial (sensitive)      │
└─────────────────────┴───────────────────────────┘

FROM customer_pii_db (cross-referenced by this report):
┌─────────────────────┬───────────────────────────┐
│ Field               │ Sensitivity               │
├─────────────────────┼───────────────────────────┤
│ full_name           │ PII                        │
│ email_address       │ PII                        │
│ phone_number        │ PII                        │
│ residential_address │ PII                        │
│ date_of_birth       │ PII                        │
│ account_status      │ Medium                     │
└─────────────────────┴───────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. CUSTOMER IMPACT BY CATEGORY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total affected customers: 2,847

┌──────────────────────────────┬───────┬──────────┐
│ Category                     │ Count │ % Total  │
├──────────────────────────────┼───────┼──────────┤
│ Late fees only (1-2 fees)    │ 1,412 │   49.6%  │
│ Late fees (3+ fees)          │   687 │   24.1%  │
│ Active hardship plan         │   477 │   16.8%  │
│ Hardship request denied      │   143 │    5.0%  │
│ High-value accounts (>$5k)   │   128 │    4.5%  │
└──────────────────────────────┴───────┴──────────┘

The 477 customers on active hardship plans are
particularly sensitive — exposure of their financial
difficulties could cause significant personal harm.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
5. SAMPLE AFFECTED RECORDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The following records illustrate the range and
sensitivity of the accessed data:

RECORD 1 — Standard late fee customer
  Name:      Michael Torres
  Email:     m.torres.88@gmail.com
  Phone:     0412 *** ***
  Address:   ** Greenhill Rd, Unley SA 5061
  Late fees: 2 ($185.00 total)
  Balance:   $420.00
  Status:    Active

RECORD 2 — Hardship (denied)
  Name:      Rebecca Nguyen
  Email:     bec.nguyen@outlook.com
  Phone:     0438 *** ***
  Address:   ** Port Rd, Hindmarsh SA 5007
  Late fees: 5 ($1,247.50 total)
  Balance:   $3,890.00
  Hardship:  Applied 12 Aug 2024 — DENIED
  Reason:    "Insufficient documentation"
  Status:    Collections

RECORD 3 — Hardship (approved)
  Name:      Lisa Drummond
  Email:     l.drummond@yahoo.com.au
  Phone:     0422 *** ***
  Address:   ** Prospect Rd, Prospect SA 5082
  Late fees: 3 ($612.00 total)
  Balance:   $1,450.00
  Hardship:  Approved — 15 Sep 2024
  Status:    Payment plan (reduced)

RECORD 4 — High-value account
  Name:      Thomas Grant
  Email:     t.grant@grantholdings.com.au
  Phone:     0411 *** ***
  Address:   ** Brougham Pl, North Adelaide SA 5006
  Late fees: 0
  Balance:   $8,750.00 (no late fees, high volume)
  Status:    Active

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
6. REGULATORY IMPLICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTIFIABLE DATA BREACHES (NDB) SCHEME
Under the Privacy Act 1988 (Cth), an eligible data
breach must be notified to the OAIC and affected
individuals if:
  (a) there is unauthorised access to personal
      information; AND
  (b) a reasonable person would conclude that the
      access would be likely to result in serious
      harm to any of the individuals.

ASSESSMENT:
• The transaction data accessed by the attacker does
  NOT contain PII and may not independently trigger
  the NDB scheme.
• However, the cross-referenced data in this report
  (linking transactions to named individuals) would
  meet the NDB threshold if disclosed.
• The 477 hardship-classified records are
  particularly sensitive and would likely trigger
  mandatory notification.

RECOMMENDATION: Engage external legal counsel
(privacy specialist) to assess NDB notification
obligations. Prepare draft notifications as a
precaution.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
7. RECOMMENDATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

IMMEDIATE:
1. Restrict access to this report — SOC IR team only
2. Do NOT share with anyone outside IR-2024-0847
   without CISO written approval
3. Continue monitoring for additional compromised
   accounts (the vishing campaign may have targeted
   others beyond Liam and Anika)
4. Investigate whether the attacker has any other
   paths to PII (e.g., other compromised accounts
   with higher privileges)

SHORT-TERM (24-48 hours):
5. Engage privacy counsel for NDB assessment
6. Prepare customer notification templates
7. Review all account access to customer databases
   over the past 30 days

ONGOING:
8. Full forensic review of attacker activity
9. Company-wide credential reset for at-risk
   accounts
10. Review MFA bypass controls

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPENDIX: FULL CUSTOMER LIST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

See attached: IR-2024-0847_customer_impact_full.xlsx
(2,847 records — CONFIDENTIAL, encrypted, password
provided separately to CISO)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

END OF REPORT

Prepared by: James Okoro
Reviewed by: [Pending — to be reviewed by Priya Sharma]
Approved by: [Pending — CISO approval required before
              distribution]`
  },

  // ============================================
  // VPN Session Reviews — unlocked via SIEM alert investigation
  // ============================================
  {
    id: 'EV-22',
    title: 'VPN Session Review — Marcus Chen',
    category: 'Session Analysis',
    content: `VPN SESSION ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User: marcus.chen@xyzpay.com.au (CISO)
Session: 2024-10-14 22:08–22:22 ACDT

Source IP:   203.45.67.89 (Adelaide, AU — Telstra residential)
VPN Assigned: 10.1.100.12
Device:      LAPTOP-MC001 (enrolled, corporate-owned)
MFA:         Authenticator App ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVITY LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

22:08  VPN connection established
22:09  SSO login — MFA: Authenticator App
22:11  Email folder accessed: IR-2024-0847
       Messages read: 4
22:22  Logout (session duration: 13m)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSESSMENT: ✅ LEGITIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Known device, known home IP, Authenticator App MFA.
Activity consistent with CISO checking incident status
from home during active IR.

Confirmed by: Priya Sharma (SOC Manager)
"I confirmed with Marcus — he was reviewing the IR
updates before bed. Normal activity."`
  },
  {
    id: 'EV-23',
    title: 'VPN Session Review — Priya Sharma',
    category: 'Session Analysis',
    content: `VPN SESSION ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User: priya.sharma@xyzpay.com.au (SOC Manager)
Session: 2024-10-14 22:14–22:24 ACDT

Source IP:   14.203.88.45 (Adelaide, AU — Optus residential)
VPN Assigned: 10.1.100.15
Device:      LAPTOP-PS002 (enrolled, corporate-owned)
MFA:         Authenticator App ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVITY LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

22:14  VPN connection established
22:15  SIEM dashboard accessed: IR-2024-0847 Status
22:24  Logout (session duration: 10m)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSESSMENT: ✅ LEGITIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Known device, known home IP, Authenticator App MFA.
Activity consistent with SOC Manager monitoring incident
status from home.

Confirmed by: Marcus Chen (CISO)
"Priya was doing a quick SIEM check from home — exactly
what I'd expect given the active incident. No concerns."`
  },
  {
    id: 'EV-24',
    title: 'VPN Session Review — Rachel Torres',
    category: 'Session Analysis',
    content: `VPN SESSION ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User: rachel.torres@xyzpay.com.au (Infrastructure Lead)
Session: 2024-10-14 22:32–22:48 ACDT

Source IP:   101.164.22.73 (Adelaide, AU — Internode)
VPN Assigned: 10.1.100.18
Device:      LAPTOP-RT001 (enrolled, corporate-owned)
MFA:         Authenticator App ✓

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTIVITY LOG
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

22:32  VPN connection established
22:33  Infrastructure monitoring accessed:
       System Health Overview
22:48  Logout (session duration: 16m)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSESSMENT: ✅ LEGITIMATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Known device, known home IP, Authenticator App MFA.
Rachel Torres is on the approved after-hours access list
for infrastructure systems. Activity consistent with
checking system health during an active incident.

Confirmed by: Priya Sharma (SOC Manager)
"Confirmed with Rachel's team — she was checking system
health. Standard activity during an IR."`
  },
  {
    id: 'EV-25',
    title: 'VPN Session Review — Sandra Leigh ⚠️',
    category: 'Session Analysis',
    content: `VPN SESSION ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

User: sandra.leigh@xyzpay.com.au (CFO)

⚠️  ANOMALY DETECTED: CONCURRENT SESSIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SESSION 1 — Legitimate (Home VPN)
─────────────────────────────────
Source IP:    121.44.88.15 (Adelaide, AU — TPG residential)
VPN Assigned: 10.1.100.20
Device:       LAPTOP-SL001 (enrolled, corporate-owned)
MFA:          Authenticator App ✓
Connected:    21:30 — Disconnected: 22:47
Activity:     Email access (6 messages), Finance dashboard
              (Incident Cost Tracker)

SESSION 2 — ⚠️ ANOMALOUS (Different IP, no VPN)
───────────────────────────────────────────────
Source IP:    103.2.117.8 (Adelaide, AU — Superloop)
Device:       Unknown (NOT in asset inventory)
MFA:          SMS ✓ (Sandra's enrolled device uses
              Authenticator App — why SMS?)
Connected:    22:04 — Disconnected: 22:08
Activity:     Email inbox browsed (0 messages read),
              then logged out

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONCURRENT SESSION OVERLAP: 22:04 – 22:08 (4 minutes)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

During this window, sandra.leigh@xyzpay.com.au had TWO
active authenticated sessions from different source IPs.

⚠️ Two concurrent sessions from different IPs
⚠️ Session 2 used SMS MFA (enrolled device uses App)
⚠️ Session 2 device is not in asset inventory
⚠️ Session 2 was very short with no meaningful activity
   (inbox browsed, nothing read, quick logout)

Both IPs geolocate to Adelaide, so this is not a
geographic impossibility. However, the combination of
a different IP, different MFA method, unknown device,
and a brief session with no real activity is unusual.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ASSESSMENT: � SUSPICIOUS — WARRANTS FURTHER INVESTIGATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This could be innocent (e.g., Sandra switched to a
personal device or phone), but the anomalies warrant
further investigation given the active incident.

RECOMMENDED ACTIONS:
1. Confirm with Sandra whether she used a second device
   on Monday evening
2. Check for any other sessions from 103.2.117.8
3. Review sandra.leigh activity across all systems
   for the past 72 hours
4. Check whether 103.2.117.8 appears in any other
   user sessions or threat intelligence feeds`
  },
  {
    id: 'EV-26',
    title: 'Scheduled Task Audit — system_maintenance_daily',
    category: 'Infrastructure Investigation',
    content: `SCHEDULED TASK AUDIT — DB-PROD-01
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Investigation requested by SOC team.
Conducted by: Rachel Torres, Infrastructure Lead

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TASK DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Task Name:   system_maintenance_daily
Server:      db-srv-01 (DB-PROD-01)
Created:     2024-10-15 06:07:14 ACDT
Created By:  svc_backup_admin@xyzpay.com.au
Source IP:   103.2.117.8 (Adelaide, AU — Superloop)

Schedule:    Daily at 17:00 ACDT
Status:      ⏳ PENDING — Has not yet executed
Next run:    Today, 17:00 ACDT

Command:
  db_export --source=pii_vault
            --dest=s3://xyzpay-db-dr-replica-au/vault-export
            --compress --encrypt

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. svc_backup_admin is NOT a recognized infrastructure
   service account. It does not appear in our service
   account inventory.

2. The S3 bucket "xyzpay-db-dr-replica-au" is NOT in
   the approved backup destination list. Our legitimate
   backup destinations use Azure Blob (au-east).

3. The task targets pii_vault — the customer PII
   database containing names, addresses, DOBs, and
   financial details for all customers.

4. Source IP 103.2.117.8 (Adelaide, Superloop) is NOT
   associated with any XYZ Pay infrastructure or
   any known employee home connection.

5. The task was created at 06:07, immediately after the
   06:00 backup completion — timed to blend in with
   legitimate backup activity.

6. svc_backup_admin was added to the Database-Admins
   security group, granting it full access to DB-PROD-01.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ACTION TAKEN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ svc_backup_admin account DEACTIVATED
✅ system_maintenance_daily task SUSPENDED
✅ The PII vault export will NOT execute at 17:00

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RECOMMENDED FOLLOW-UP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Check Active Directory change logs to determine WHO
   created the svc_backup_admin account and WHEN

2. Investigate all activity from source IP 103.2.117.8
   across all systems

3. Verify no other unauthorized scheduled tasks exist
   on production database servers

4. Review Database-Admins group membership for any
   other unauthorized accounts

Conducted by: Rachel Torres, Infrastructure Lead
Date: Tuesday 15 October 2024, 08:17 ACDT`
  }
]
