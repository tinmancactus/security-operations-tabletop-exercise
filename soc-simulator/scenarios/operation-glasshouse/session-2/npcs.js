import images from './images.js'

export default {
  priya: {
    id: 'priya',
    name: 'Priya Sharma',
    role: 'SOC Manager',
    image: images.priya,
    available: true,
    messagingMode: 'canned',
    escalationCost: { first: 0, followUp: 0 },
    onStrongEscalation: { switchMode: 'dnd' },
    
    cannedResponses: [
      {
        id: 'caught-up',
        label: "OK, I'm all caught up on my messages and the report.",
        delay: 3000,
        afterMode: 'escalation',
        unlockEvidence: ['EV-21'],
        npcReply: `Right. Here's where we are.

At 6:03 this morning, David Whitmore received an email from a group calling themselves "right_0ff". Marcus forwarded it to me an hour ago:

---
"Rise and shine, Mr. Whitmore. Rise and shine.

We have your customers' dirty laundry. Every late fee. Every hardship case. Every payment plan you've been squeezing people with. We're going to show the world what XYZ Pay really does to vulnerable people.

You have until 5pm today to write off all customer debt. Every single customer's balance must be $0.

If you don't comply, we publish everything.

Sincerely,
right_0ff"
---

Marcus is in with DW and the board now.

Here's what we need to figure out:
\u2022 Is this threat real? Do they actually have the data they claim?
\u2022 How did they get in? Is Liam's compromise the full picture or is there more?
\u2022 Are they still inside our systems right now?

You've got the overnight handover from Alex \u2014 start there. Check the alerts he flagged, review James's report, and follow whatever threads look most promising.

I'll be here if you need to escalate anything. Good luck.`
      }
    ],
    
    messageHistory: [
      // === Pre-Session 1 history ===
      {
        id: 'priya-hist-1',
        timestamp: '2024-10-09T09:00:00',
        gameTime: 'Wed 9:00am',
        from: 'npc',
        content: `Morning. Did you see the news about the PayFlex breach? 50,000 customer records exposed.

Board is asking questions. Marcus wants us to review our detection coverage for similar attack patterns.`
      },
      {
        id: 'priya-hist-2',
        timestamp: '2024-10-09T09:15:00',
        gameTime: 'Wed 9:15am',
        from: 'player',
        content: `Yeah, I saw the article - sounds like they got in through a compromised vendor account?`
      },
      {
        id: 'priya-hist-3',
        timestamp: '2024-10-09T09:18:00',
        gameTime: 'Wed 9:18am',
        from: 'npc',
        content: `That's what the initial reports say. Third-party risk is a blind spot for a lot of companies. We're not immune.`
      },
      {
        id: 'priya-hist-4',
        timestamp: '2024-10-11T11:30:00',
        gameTime: 'Fri 11:30am',
        from: 'npc',
        content: `Heads up - I'll be in and out of meetings Monday morning until about 11am. Should be reachable by message but might be slow to respond. James has an appointment first thing and will be starting later than usual, so contact me directly if anything comes up.`
      },
      {
        id: 'priya-hist-5',
        timestamp: '2024-10-11T11:35:00',
        gameTime: 'Fri 11:35am',
        from: 'player',
        content: `Got it, thanks for the heads up.`
      },
      // === Monday (Session 1 day) — post-session messages ===
      {
        id: 'priya-mon-1',
        timestamp: '2024-10-14T09:05:00',
        gameTime: 'Mon 9:05am',
        from: 'player',
        content: `Priya, critical alert just came through - H-0012. Liam Fitzgerald's account accessed 2,847 customer records from an Indonesian IP. James is online and looking at it now.`
      },
      {
        id: 'priya-mon-2',
        timestamp: '2024-10-14T09:12:00',
        gameTime: 'Mon 9:12am',
        from: 'npc',
        content: `I've seen it. James has confirmed the access is real and not a false positive. This is a confirmed account compromise.

I'm declaring a security incident. Pulling Marcus in now.`
      },
      {
        id: 'priya-mon-3',
        timestamp: '2024-10-14T10:05:00',
        gameTime: 'Mon 10:05am',
        from: 'npc',
        content: `Incident IR-2024-0847 is now open. Marcus has been briefed and is pulling out of his afternoon meetings to focus on this.

First priority is to make sure Liam's account is disabled if you haven't already done that.`
      },
      {
        id: 'priya-mon-4',
        timestamp: '2024-10-14T10:30:00',
        gameTime: 'Mon 10:30am',
        from: 'player',
        content: `Already disabled. Password and MFA revoked.`
      },
      {
        id: 'priya-mon-5',
        timestamp: '2024-10-14T11:00:00',
        gameTime: 'Mon 11:00am',
        from: 'npc',
        content: `Good. Rachel's team has blocked the attacker IP (103.42.91.17) at the perimeter firewall.

James is doing a deep dive on everything Liam's account touched over the past 30 days. I'll update you as we learn more.`
      },
      {
        id: 'priya-mon-6',
        timestamp: '2024-10-14T14:15:00',
        gameTime: 'Mon 2:15pm',
        from: 'npc',
        content: `Update: Marcus has sent a company-wide security advisory about vishing calls, "do not share MFA codes with anyone claiming to be from IT, report suspicious contacts to the SOC immediately."

Should help flush out anyone else who might have been targeted.

James has confirmed 2,847 transaction records were accessed through Liam's account but the good news is the transaction database doesn't contain PII — no names, no emails, no addresses. The personal data is in a separate database. He's going to work late tonight to cross-reference the customer IDs and build a full impact assessment.`
      },
      {
        id: 'priya-mon-7',
        timestamp: '2024-10-14T16:50:00',
        gameTime: 'Mon 4:50pm',
        from: 'npc',
        content: `I'm going to wrap up for the day. James is staying to finish the impact assessment. Alex comes on for night shift at 10.

Go home, get some rest. I have a feeling tomorrow is going to be a long day.`
      },
      {
        id: 'priya-mon-8',
        timestamp: '2024-10-14T16:55:00',
        gameTime: 'Mon 4:55pm',
        from: 'player',
        content: `Will do. Let me know if anything changes overnight.`
      },
    ],
    
    initialMessage: {
      delay: 120,
      timestamp: '2024-10-15T08:02:00',
      gameTime: 'Tue 8:02am',
      content: `Morning. Hope you've rested well. 

James worked late last night and finished the customer impact assessment. Please read it, catch up on all your messages then let me know when you're ready for an update on the situation.

Talk soon.`
    },
    
    selfAssessmentCriteria: [
      'Clearly identifies which crisis/threat is being escalated',
      'References specific evidence or IOCs',
      'Describes a timeline or sequence of events',
      'Proposes a specific recommendation or action',
      'Assesses priority relative to other active threats'
    ],
    
    responses: {
      strong: { 
        minScore: 4, 
        title: 'Strong Escalation',
        content: `This is solid work. You've connected the dots and I can take this straight to Marcus.

I'm going to switch to DND while I brief him — keep investigating and send me updates. I'll relay anything critical.`
      },
      partial: { 
        minScore: 2, 
        title: 'Partial Escalation',
        content: `I can see you're onto something but I need more before I can take this to Marcus. He's in with the CEO right now and I can't walk in half-prepared.

Can you clarify:
• What specific accounts or systems are affected?
• What's the timeline?
• What's your recommended action?

Send me an update when you have more.`
      },
      weak: { 
        minScore: 0, 
        title: 'Weak Escalation',
        content: `I've read your message but I'm not clear on what you're telling me.

We have multiple active threads right now and Marcus is in with the CEO. I need something concrete — which threat, what evidence, what do you recommend we do about it?

Go back, document what you have, and come back with specifics.`
      }
    }
  },
  
  james: {
    id: 'james',
    name: 'James Okoro',
    role: 'Senior IR Analyst (Tier 3)',
    image: images.james,
    available: false,
    messagingMode: 'auto-reply', // Sleeping in after overnight work
    escalationCost: { first: 2, followUp: 1 },
    
    messageHistory: [
      // === Pre-Session 1 history (previous week) ===
      {
        id: 'james-hist-1',
        timestamp: '2024-10-07T09:15:00',
        gameTime: 'Mon 7 Oct 9:15am',
        from: 'npc',
        content: `hey, you around? need a second pair of eyes on something`
      },
      {
        id: 'james-hist-2',
        timestamp: '2024-10-07T09:16:00',
        gameTime: 'Mon 7 Oct 9:16am',
        from: 'player',
        content: `Yeah, what's up?`
      },
      {
        id: 'james-hist-3',
        timestamp: '2024-10-07T09:18:00',
        gameTime: 'Mon 7 Oct 9:18am',
        from: 'npc',
        content: `false alarm, figured it out. was just some weird edge case in the waf logs. thanks anyway 👍`
      },
      {
        id: 'james-hist-4',
        timestamp: '2024-10-07T16:42:00',
        gameTime: 'Mon 7 Oct 4:42pm',
        from: 'npc',
        content: `fyi i'm not going to get to that siem tuning this week. marcus wants me focused on the security uplift stuff for the board presentation. fml 🫠`
      },
      {
        id: 'james-hist-5',
        timestamp: '2024-10-07T16:45:00',
        gameTime: 'Mon 7 Oct 4:45pm',
        from: 'player',
        content: `No worries, I know you're swamped. Good luck with the board stuff.`
      },
      {
        id: 'james-hist-6',
        timestamp: '2024-10-07T16:47:00',
        gameTime: 'Mon 7 Oct 4:47pm',
        from: 'npc',
        content: `lol thanks. gonna need it`
      },
      {
        id: 'james-hist-7',
        timestamp: '2024-10-11T16:47:00',
        gameTime: 'Fri 4:47pm',
        from: 'npc',
        content: `you coming for drinks tonight? few of us heading to nola after work`
      },
      {
        id: 'james-hist-8',
        timestamp: '2024-10-11T16:50:00',
        gameTime: 'Fri 4:50pm',
        from: 'player',
        content: `Maybe next time, got plans tonight.`
      },
      {
        id: 'james-hist-9',
        timestamp: '2024-10-11T16:51:00',
        gameTime: 'Fri 4:51pm',
        from: 'npc',
        content: `no worries, have a good weekend`
      },
      // === Monday Session 1 — James comes online late ===
      {
        id: 'james-mon-1',
        timestamp: '2024-10-14T08:53:00',
        gameTime: 'Mon 8:53am',
        from: 'npc',
        content: `hey, just logging in and catching up on my messages. thanks for handling everything so far. pri has forwarded me the details. gimme a moment while I catch up on the full situation...`
      },
      {
        id: 'james-mon-2',
        timestamp: '2024-10-14T08:54:00',
        gameTime: 'Mon 8:54am',
        from: 'npc',
        content: `ok this is not how I was planning my monday morning going 😬`
      },
      {
        id: 'james-mon-3',
        timestamp: '2024-10-14T08:55:30',
        gameTime: 'Mon 8:55am',
        from: 'npc',
        content: `OMFG did you see the siem alert that just came through? 2,847 records accessed 🤯`
      },
      {
        id: 'james-mon-4',
        timestamp: '2024-10-14T08:55:45',
        gameTime: 'Mon 8:55am',
        from: 'npc',
        content: `liam bruh`
      },
      // === Monday post-Session 1 — James takes lead on investigation ===
      {
        id: 'james-mon-5',
        timestamp: '2024-10-14T09:00:00',
        gameTime: 'Mon 9:00am',
        from: 'npc',
        content: `ok i'm taking lead on this. gonna need the rest of today to figure out exactly what they got into. i'll keep you posted`
      },
      {
        id: 'james-mon-6',
        timestamp: '2024-10-14T09:45:00',
        gameTime: 'Mon 9:45am',
        from: 'npc',
        content: `confirmed — the login at 07:52 from the indonesian IP is a legit compromise. not credential stuffing, this is targeted. someone called liam and talked him into giving up his MFA code.

they used his account to access the employee directory, org chart, finance team contacts, IT support docs and customer_transactions_db (the big one — 2,847 rows pulled at 08:22)`
      },
      {
        id: 'james-mon-7',
        timestamp: '2024-10-14T12:30:00',
        gameTime: 'Mon 12:30pm',
        from: 'npc',
        content: `good news bad news

bad news: 2,847 transaction records confirmed accessed. customer IDs, transaction amounts, dates, late fee amounts, hardship request flags. it's not great.

good news: it's the transaction db only. the PII (names, emails, phone numbers, addresses) that's all in a separate database that liam's account didn't have access to. so they have financial data tied to customer IDs but they can't identify who the customers actually are. yet.

still not good but could be a lot worse`
      },
      {
        id: 'james-mon-8',
        timestamp: '2024-10-14T12:35:00',
        gameTime: 'Mon 12:35pm',
        from: 'player',
        content: `That's something at least. What's the plan for next steps?`
      },
      {
        id: 'james-mon-9',
        timestamp: '2024-10-14T12:38:00',
        gameTime: 'Mon 12:38pm',
        from: 'npc',
        content: `i need to cross-reference those 2,847 customer IDs against the PII database so we know exactly who's affected. that way if this goes to the regulator (it probably will) we have a complete picture. marcus has approved overtime for me to get it done tonight`
      },
      {
        id: 'james-mon-10',
        timestamp: '2024-10-14T15:15:00',
        gameTime: 'Mon 3:15pm',
        from: 'npc',
        content: `quick update. i'm about halfway through the account activity review. nothing else jumps out beyond what we already know. the attacker was methodical, went straight for the customer db after doing some initial recon. knew what they wanted.

gonna push through and stay late to get the impact assessment done. priya knows.`
      },
      {
        id: 'james-mon-11',
        timestamp: '2024-10-14T17:30:00',
        gameTime: 'Mon 5:30pm',
        from: 'npc',
        content: `day shift has handed off. priya's gone home. i'm staying to finish the customer impact assessment. cross-referencing every one of those 2,847 customer IDs against the PII db so we have a complete list of who's affected. should have it done by tonight.`
      },
      // === Monday late night — James finishes report ===
      {
        id: 'james-mon-12',
        timestamp: '2024-10-14T22:35:00',
        gameTime: 'Mon 10:35pm',
        from: 'npc',
        content: `hey. report's done. 2,847 customers identified and categorised. spotted a few names in there that the board aren't going to like, and quite a few hardship cases. not great if any of this gets out.

uploaded it to the SOC shared drive, incident folder. have a read when you're in tomorrow.

alex just came on for night shift, i've briefed him on everything. i'm heading home now, absolutely knackered. been here since 9 this morning. gonna sleep in tomorrow so i'll be starting late, probably not in until 10 or 11. ping me if anything urgent comes up but fair warning i might not hear my phone 😴

catch you tomorrow`
      },
      {
        id: 'james-mon-13',
        timestamp: '2024-10-14T22:40:00',
        gameTime: 'Mon 10:40pm',
        from: 'player',
        content: `Nice work James, that's a huge effort. Get some rest, we'll hold the fort.`
      },
      {
        id: 'james-mon-14',
        timestamp: '2024-10-14T22:41:00',
        gameTime: 'Mon 10:41pm',
        from: 'npc',
        content: `cheers mate. good luck tomorrow, something tells me it's going to be a big one 😬`
      }
    ],
    
    autoReply: `I will be back at the office on Tuesday around 10-11am.

For urgent IR matters, contact Priya directly.

James`
  },

  marcus: {
    id: 'marcus',
    name: 'Marcus Chen',
    role: 'CISO',
    image: images.marcus,
    available: false,
    messagingMode: 'busy',
    escalationCost: { first: 3, followUp: 1 },
    
    messageHistory: [
      // === Pre-Session 1 history ===
      {
        id: 'marcus-hist-1',
        timestamp: '2024-10-10T14:30:00',
        gameTime: 'Thu 2:30pm',
        from: 'npc',
        content: `Quick note - thanks for handling that phishing report yesterday. Good catch on the lookalike domain.

I've mentioned to the board that our detection capabilities are improving. Keep up the good work.`
      },
      {
        id: 'marcus-hist-2',
        timestamp: '2024-10-10T14:35:00',
        gameTime: 'Thu 2:35pm',
        from: 'player',
        content: `Thanks Marcus, appreciate the feedback.`
      },
      {
        id: 'marcus-hist-3',
        timestamp: '2024-10-10T14:36:00',
        gameTime: 'Thu 2:36pm',
        from: 'npc',
        content: `FYI I'll be in board meetings most of Monday. Priya's your first point of contact. Only interrupt me if something's critical.`
      },
      // === Monday — incident response ===
      {
        id: 'marcus-mon-1',
        timestamp: '2024-10-14T10:30:00',
        gameTime: 'Mon 10:30am',
        from: 'npc',
        content: `I've been briefed by Priya. This is serious — confirmed account compromise with customer data access. I've pulled out of my afternoon meetings.

You and the team did good work flagging this. James is leading the technical investigation. Support him however you can.

I'll handle the executive comms. Don't discuss this outside the SOC team until I say otherwise.`
      },
      {
        id: 'marcus-mon-2',
        timestamp: '2024-10-14T14:20:00',
        gameTime: 'Mon 2:20pm',
        from: 'npc',
        content: `Just sent a company-wide advisory about vishing calls. Kept it general — no mention of the incident specifics. The board doesn't need the details yet, this is still an evolving situation.

Good work today. We'll regroup in the morning. Get some rest tonight.`
      },
      // === Tuesday morning ===
      {
        id: 'marcus-tue-1',
        timestamp: '2024-10-15T07:30:00',
        gameTime: 'Tue 7:30am',
        from: 'npc',
        content: `[[[TC NOTE: Do we need this message? Do we need it now? Priya shares all the same information...]]]
        Team, the situation has escalated. We received a direct threat from a group calling themselves "right_0ff" at 6am this morning. I've briefed the CEO.

I'll be in emergency meetings with the board most of today. Priya is your point of contact. I need the SOC to focus on:

1. Understanding the full scope of the compromise
2. Identifying any ongoing attacker access
3. Preparing a clear picture of what they have and what they can do with it

I will need a recommendation from you before my board meeting. More on that later.`
      }
    ]
  },

  sandra: {
    id: 'sandra',
    name: 'Sandra Leigh',
    role: 'CFO',
    image: images.sandra,
    available: false,
    messagingMode: 'busy',
    escalationCost: { first: 0, followUp: 0 },
    
    messageHistory: [
      // === Pre-Session 1 history — establishes Sandra's genuine voice ===
      {
        id: 'sandra-hist-1',
        timestamp: '2024-10-08T11:20:00',
        gameTime: 'Tue 8 Oct 11:20am',
        from: 'npc',
        content: `Hey 😊

Quick favour - we're getting a card for David's birthday next week. Can you sign it when you get a chance? It's on my desk.

SL`
      },
      {
        id: 'sandra-hist-2',
        timestamp: '2024-10-08T11:45:00',
        gameTime: 'Tue 8 Oct 11:45am',
        from: 'player',
        content: `Sure, I'll swing by this afternoon.`
      },
      {
        id: 'sandra-hist-3',
        timestamp: '2024-10-08T11:46:00',
        gameTime: 'Tue 8 Oct 11:46am',
        from: 'npc',
        content: `Thanks! 😊`
      },
      {
        id: 'sandra-hist-4',
        timestamp: '2024-10-09T15:30:00',
        gameTime: 'Wed 9 Oct 3:30pm',
        from: 'npc',
        content: `Hey 😊

Thanks so much for helping me with that MFA thing last week. I know I was being difficult about it but I do understand why it matters now. The video you sent explaining the SIM swap attacks was eye-opening!

Anyway, just wanted to say thanks for being patient with me.

SL`
      },
      {
        id: 'sandra-hist-5',
        timestamp: '2024-10-09T15:45:00',
        gameTime: 'Wed 9 Oct 3:45pm',
        from: 'player',
        content: `No problem at all, happy to help. Let me know if you have any other questions about it.`
      },
      {
        id: 'sandra-hist-6',
        timestamp: '2024-10-09T15:47:00',
        gameTime: 'Wed 9 Oct 3:47pm',
        from: 'npc',
        content: `Will do!`
      },
      // === Monday — Sandra checks in about the incident (genuine Sandra) ===
      {
        id: 'sandra-mon-1',
        timestamp: '2024-10-14T11:30:00',
        gameTime: 'Mon 11:30am',
        from: 'npc',
        content: `Hey 😊

Heard there's been some kind of security thing this morning? Marcus mentioned it briefly in the exec standup. Everything ok?

SL`
      },
      {
        id: 'sandra-mon-2',
        timestamp: '2024-10-14T11:45:00',
        gameTime: 'Mon 11:45am',
        from: 'player',
        content: `We're looking into an account compromise. Marcus is across it. Can't share details at this stage but it's being handled.`
      },
      {
        id: 'sandra-mon-3',
        timestamp: '2024-10-14T11:47:00',
        gameTime: 'Mon 11:47am',
        from: 'npc',
        content: `Ok no worries, just wanted to check in. Let me know if there's anything Finance needs to do 😊

SL`
      }
      // NOTE: From this point, any messages "from Sandra" in Session 2 are actually
      // from the attacker using her compromised account. The tone shift (no emojis,
      // no "SL" sign-off, more demanding) is a detection opportunity for students.
    ]
  },

  rachel: {
    id: 'rachel',
    name: 'Rachel Torres',
    role: 'Infrastructure Lead',
    image: images.rachel,
    available: false,
    messagingMode: 'busy',
    escalationCost: { first: 0, followUp: 0 },
    
    messageHistory: [
      // === Monday — firewall block confirmation ===
      {
        id: 'rachel-mon-1',
        timestamp: '2024-10-14T11:15:00',
        gameTime: 'Mon 11:15am',
        from: 'npc',
        content: `Hey, Priya asked us to block an IP at the perimeter, 103.42.91.17. That's done.

Also, Liam's account disable went through cleanly. Jodie from Customer Support came by asking when he'd get access back. I told her it's a security investigation and we'd let her know.

Let me know if you need any other firewall changes or account actions.`
      },
      {
        id: 'rachel-mon-2',
        timestamp: '2024-10-14T11:20:00',
        gameTime: 'Mon 11:20am',
        from: 'player',
        content: `Thanks Rachel. Will keep you posted if we need anything else.`
      },
      {
        id: 'rachel-mon-3',
        timestamp: '2024-10-14T11:22:00',
        gameTime: 'Mon 11:22am',
        from: 'npc',
        content: `No worries. Ping me anytime - my team's standing by in case this escalates.`
      }
    ]
  },

  alex: {
    id: 'alex',
    name: 'Alex Anderson',
    role: 'SOC Analyst (Night Shift)',
    image: images.alex,
    available: false,
    messagingMode: 'auto-reply',
    escalationCost: { first: 0, followUp: 0 },
    
    // Alex's Session 2 handover notes — delivered at session start
   initialMessage: {
      delay: 0,
      timestamp: '2024-10-15T07:55:00',
      gameTime: 'Tue 7:55am',
      content: `Morning team. Long night. Here's the handover.

OVERNIGHT SUMMARY - IR-2024-0847 (22:00 Mon - 08:00 Tue)
==========================================================

INCIDENT STATUS: ACTIVE - Security Incident IR-2024-0847
Severity: HIGH | Declared: Mon 10:00 | Lead: James Okoro (Tier 3)

HANDOVER FROM JAMES (22:00)
James briefed me when I came on. He's been working since 9am and has completed the Customer Impact Assessment — 2,847 customers identified. He's sent you a copy. He's heading home to sleep and will be in late tomorrow (probably 10-11am).

OVERNIGHT ACTIVITY
- SIEM: 18 alerts overnight. Mostly credential stuffing continuation from Tor exits (same pattern as Sunday night). Nothing that looks related to the Liam compromise, but I've flagged a couple of unusual ones for your review:
  • Alert at 01:17 — internal file share access from sandra.leigh, seemed odd for that time of night but she's CFO so maybe working late?
  • Alert at 02:14 — new scheduled task created on DB-PROD-01 ("system_maintenance_daily"). Could be legit from Rachel's infra team but I couldn't confirm overnight.
  [[[TC NOTE: Do we explicity mention these alerts and direct students to follow up on them at this stage? Or is that too much?]]]
- Liam's account: remains disabled. No further access attempts.
- Attacker IP 103.42.91.17: blocked at firewall. No hits overnight.
- Company-wide advisory: Marcus sent it yesterday arvo. No responses to the SOC overnight.

INCOMING
- Marcus sent an urgent message this morning. Sounds like something's just happened that's escalated things significantly. Priya's coming in early. I don't have any further details at this stage, sorry.

SYSTEMS
- All green. Backups completed 06:00.

That's me done. I'm heading home to crash. Back tonight at 22:00.

Stay sharp today. I have a feeling it's going to be a big one.

Alex`
    },
    
    autoReply: `Thanks for your message. I'm currently offline after night shift and will be back online at 22:00 tonight.

For urgent matters, please contact:
• Priya Sharma (SOC Manager)
• James Okoro (Tier 3)

This is an automated response.`
  }
}
