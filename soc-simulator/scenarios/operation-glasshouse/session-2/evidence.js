export default [
  {
    id: 'EV-21',
    title: 'Company-Wide Security Advisory',
    category: 'Internal Communication',
    content: `FROM:    Marcus Chen (CISO)
TO:      all-staff@xyzpay.com.au
DATE:    Monday 14 October 2024, 2:00 PM ACDT
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
  }
]
