/* More practice inboxes. Same format as inbox.js. */
Object.assign(window.INBOX, {
 "1": {
  "skill": "Think like the investor. Can you explain what a venture fund needs from this company, in numbers a founder will follow?",
  "debrief": [
   "Why does a $100M fund care whether Minion could be a billion-dollar company?",
   "What does the family office offer actually cost the founders?",
   "What did Priya want from you, and did you give it to her?"
  ],
  "intro": "You are a first-year associate at Hart & Lowell. Mostly Human AI is about to become a client. Before anyone signs anything, the founders want to understand who they'd be raising money from.",
  "mail": [
   {
    "id": "p",
    "at": 0,
    "from": "Priya Raman",
    "role": "Senior associate, Hart & Lowell",
    "subject": "Quick one before the Bernard call",
    "body": "Hey,\n\nBernard is on with Diane tomorrow and he's going to ask why VCs keep asking \"how big can this get?\" He thinks they're being rude. (They are, a little.)\n\nWhat do you think? Look at the Juniper fund numbers in the case file, then send me three bullets on why a $100M fund cares about a billion-dollar outcome. Do the math. I want to see the math.\n\nP.\n\nP.S. Hint: fund returner. Look it up if it's new.",
    "good": [
     "Show the math: a $100M fund owning about 10% at exit needs a $1B exit just to return the fund once",
     "Explain the power law: most investments return little, so each one has to be able to return the whole fund",
     "Put it in words Bernard would accept, not jargon",
     "Come back with an answer and a recommendation, as Priya asked"
    ],
    "model": "Priya,\n\n• Math: Juniper has a $100M fund and expects to own about 10% of Minion after dilution. To return the whole fund from this one company, Minion has to exit at about $1B.\n• Why it matters: most venture investments return little or nothing. A few winners pay for everything, so every investment has to have a real shot at being one of them.\n• For Bernard: when a VC asks how big this can get, they're asking whether Minion could be the company that pays for their fund. A $200M outcome can be a great result for the founders and still not matter much to a $100M fund.\n\nRecommendation: Bernard should have a one-slide answer to \"how big can this get\" before he pitches anyone.",
    "follow": {
     "from": "Priya Raman",
     "body": "Ha, \"rude but rational,\" I'm stealing that. Good. Diane will like the last line.\n\nP."
    }
   },
   {
    "id": "b",
    "at": 8,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Amazing news!!",
    "body": "Hi!!\n\nA family office (friend of a friend) just offered us $2M for 40% of the company. No board seat, no fancy terms, just a check. My uncle also wants to put in $50K as a loan.\n\nThis seems way easier than VCs. Should we just take it?? Abigail is skeptical but she's skeptical of everything. 😄\n\nBernard",
    "good": [
     "Don't say yes or no on the spot; lay out the tradeoff",
     "Explain that 40% for $2M values the company at $5M post-money, and what that does to future rounds and to founder ownership",
     "Note that later VCs may balk at a cap table with 40% held by a passive investor",
     "Flag the uncle's loan: terms, whether it converts, and securities law basics",
     "Suggest a call with Diane before anyone signs"
    ],
    "model": "Hi Bernard,\n\nCongratulations, it's great that people want in. Before you say yes, here's what the offer means:\n\n• $2M for 40% values the company at $5M after the money. That's low for a team like yours, and 40% is a lot to give up in a first round.\n• Later investors look at the cap table. If 40% is already gone to a passive holder, there's less room for them and for the three of you, and some VCs will pass for that reason alone.\n• Your uncle's loan is fine in principle, but we should write down the terms, including whether it's repaid or turns into stock.\n\nI'd suggest a quick call with Diane this week to compare this with a seed round before anyone signs.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Ok ok, call with Diane, got it! 40% does sound like a lot when you say it that way. 😅\n\nB."
    }
   }
  ]
 },
 "4": {
  "skill": "Price versus terms. Can you show what each term is worth in dollars, not adjectives?",
  "debrief": [
   "Which sheet is best for the founders at a $120M exit? At $400M?",
   "What is the pool shuffle, and how much does it change Investor 1's real price?",
   "Who do you represent when Abigail asks whether investors can fire her?",
   "Which point in Graham's draft would you push back on first, and why?"
  ],
  "intro": "Three Series A term sheets have arrived. You are company counsel. Use the term sheet comparator on the Tools tab as you go.",
  "mail": [
   {
    "id": "p",
    "at": 0,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "Three term sheets",
    "body": "Hi,\n\nThree Series A term sheets came in overnight. They're in the comparator. Bernard wants to sign Investor 2 because the price is highest.\n\nSend me a short comparison I can forward: the three to five terms that actually matter, and what each sheet means for the founders at a $120M exit. Make sure you explain the participation and the ratchet. The client won't know those words.\n\nThanks,\nDiane",
    "good": [
     "Lead with a recommendation, then the reasons",
     "Show that Investor 2's 1.5x participating preference and full ratchet can cost the founders more than the higher price gives them",
     "Explain the pool shuffle: a bigger pool in the pre-money lowers the effective price",
     "Use the comparator's numbers at $120M, not adjectives",
     "Keep it short enough to forward to the client"
    ],
    "model": "Diane,\n\nShort version: Investor 1 is the best deal for the founders, even though Investor 2's price is higher.\n\n• Price: Investor 2's $64M pre-money comes with a 15% pool taken from the pre-money, so the real price is lower than it looks.\n• Preference: Investor 2 gets 1.5x its money back first, then shares in what's left (\"participating\"). At a $120M exit that costs the common [comparator figure] compared with Investor 1.\n• Ratchet: if the company ever raises at a lower price, Investor 2's price drops all the way to the new one, which can wipe out much of the founders' stake.\n• Control: Investor 2's independent director is chosen by the investors, so they control the board in practice.\n\nRecommendation: negotiate with Investor 1, and use Investor 2's price as leverage.",
    "follow": {
     "from": "Diane Okafor",
     "body": "Nice. Put the $120M numbers in a little table and I'll send it tonight.\n\nD."
    }
   },
   {
    "id": "b",
    "at": 6,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "LET'S SIGN!!!",
    "body": "$64M pre!!! That's way more than the others. Investor 2 says the 1.5x participating thing is \"totally standard for a hot deal.\" Is it? They want an answer by Friday.\n\nAlso I don't totally get what a ratchet is but it sounds fine?\n\nB.",
    "good": [
     "Answer his question directly: participation with a 1.5x multiple is not standard for a Series A",
     "Explain the ratchet in one plain example",
     "Say you're sending Diane a comparison and suggest not signing before seeing it",
     "Remember the company is the client; don't get swept up in his deadline"
    ],
    "model": "Hi Bernard,\n\nShort answer: no, it isn't standard. Most Series A deals today use a 1x preference with no participation.\n\nThe ratchet in one example: if Investor 2 pays $10 a share and the company later raises at $5, its shares reprice as if it had paid $5, and that extra stock comes out of everyone else's ownership, mostly yours.\n\nI'm sending Diane a side-by-side tonight showing what each offer means for you at different exit values. Please hold off on signing until you've seen it. Friday is enough time.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Oh. That ratchet thing is not fine. 😬 Ok, waiting for the table.\n\nB."
    }
   },
   {
    "id": "a",
    "at": 12,
    "from": "Abigail Reyes",
    "role": "CTO and co-founder, Mostly Human AI",
    "subject": "One question",
    "body": "Can any of these investors replace me as CTO or take over decisions about the product? I want a yes or no, then the reason.\n\nAbigail",
    "good": [
     "Give a clear answer first, as she asked",
     "Explain that officers are chosen by the board, so the question is who controls the board under each sheet",
     "Point to Investor 2's expanded protective provisions (budget approval, officer hiring)",
     "Be clear that you advise the company, and suggest her own lawyer for her personal position"
    ],
    "model": "Abigail,\n\nYes, indirectly. The board appoints and removes officers, including the CTO, so the real question is who controls the board.\n\n• Investor 1 and Investor 3: the founders keep enough board seats that investors can't do it alone.\n• Investor 2: the independent director is picked by the investors, which gives them a working majority. Its sheet also requires investor approval of the budget and of hiring officers, which reaches product decisions.\n\nOne thing to be clear about: I represent the company, not any founder. If you want advice on protecting your own position, you should have your own lawyer look at this.\n\nBest,\n[You]",
    "follow": {
     "from": "Abigail Reyes",
     "body": "Clear. Thank you for answering the question I asked.\n\nA."
    }
   },
   {
    "id": "g",
    "at": 20,
    "from": "Graham Pierce",
    "role": "Partner, Stanton Whitfield (investor counsel)",
    "subject": "Kestrel Series A: first drafts",
    "body": "Dear colleague,\n\nPlease find attached our first drafts of the Series A documents for Kestrel's investment, based on the NVCA forms. A few points to note, all customary:\n\n1. The option pool increase is included in the pre-money valuation.\n2. The founders will give the representations and warranties personally, alongside the company.\n3. We have added a closing condition that each founder sign a new non-compete.\n\nWe'd be grateful for comments by Monday.\n\nKind regards,\nGraham Pierce",
    "good": [
     "Don't accept \"customary\" at face value; check each point against the term sheet",
     "The pool in the pre-money may be in the term sheet, but its size should match a real hiring plan",
     "Push back on founder reps: NVCA reps come from the company, and founder reps are a real ask",
     "Flag non-competes: limited or unenforceable in some states, and not in the term sheet",
     "Reply politely, and send the substantive points to Diane first"
    ],
    "model": "Graham,\n\nThanks for the drafts. We'll come back with a full markup by Monday. So you can plan, three early points:\n\n1. Pool: we'll size it to the company's hiring plan, and we'll send that plan.\n2. Founder reps: the term sheet doesn't call for them, and the NVCA forms have the company give the reps. We'll take them out.\n3. Non-competes: they aren't in the term sheet, and their enforceability varies by state. We'll propose the standard confidentiality and invention assignment instead.\n\nBest regards,\n[You]\n\n(Sent after checking with Diane.)",
    "follow": {
     "from": "Graham Pierce",
     "body": "Thank you. We'll look at the hiring plan with interest. On the founder representations, I suspect our client will feel strongly.\n\nRegards,\nGraham"
    }
   }
  ]
 },
 "5": {
  "skill": "Read the forms. Can you point to the clause and say what it does, before you argue about it?",
  "debrief": [
   "Which of Graham's provisions belong in the charter instead, and why?",
   "What should a drag-along always include to protect the common?",
   "Is Ruth a Major Investor? Where did you look?",
   "What did Priya want back from you?"
  ],
  "intro": "The Series A is in documents. You're working on the Investors' Rights Agreement, the Voting Agreement and the ROFR and Co-Sale Agreement.",
  "mail": [
   {
    "id": "g",
    "at": 0,
    "from": "Graham Pierce",
    "role": "Partner, Stanton Whitfield (investor counsel)",
    "subject": "Voting Agreement: drag-along and approvals",
    "body": "Dear colleague,\n\nTwo points in the Voting Agreement before our call:\n\n1. Drag-along: we have simplified the conditions. The drag can be triggered by the Series A holders alone.\n2. We have added a covenant that the company won't adopt an annual budget, hire or fire officers, or take on debt over $500,000 without the Series A director's approval.\n\nI trust these are acceptable.\n\nRegards,\nGraham",
    "good": [
     "Drag-along: insist on the NVCA conditions (approval by the board and by the common or a founder group, same consideration for all, limited and several liability, no non-competes)",
     "Approval rights: after Moelis and the 2024 amendment adding § 122(18), some of these can live in a stockholder agreement, but the safest place for key protective provisions is the charter",
     "Point out the approvals reach day-to-day management, beyond the term sheet",
     "Answer politely and precisely"
    ],
    "model": "Graham,\n\nThanks. Two responses:\n\n1. Drag-along: we need the standard NVCA conditions, starting with approval by the board and by the holders of a majority of the common. We also need equal consideration for everyone, liability that is several and capped at proceeds, and no non-competes for dragged holders.\n2. Approvals: the term sheet gives Kestrel the NVCA protective provisions in the charter. It doesn't give the Series A director approval over the budget or officers. We'll take that out. On location, we'd keep protective provisions in the charter, where their validity isn't in question after Moelis.\n\nHappy to talk.\n\nBest regards,\n[You]",
    "follow": {
     "from": "Graham Pierce",
     "body": "Understood. I'll take the approvals back to my client. On the drag, I can live with the board approval. The common's approval is a harder conversation.\n\nGraham"
    }
   },
   {
    "id": "r",
    "at": 7,
    "from": "Ruth Feldman",
    "role": "Angel investor",
    "subject": "Am I a \"Major Investor\"?",
    "body": "Hello,\n\nI'm a small investor in Mostly Human AI from the seed. I received a signature page for an Investors' Rights Agreement. Am I a \"Major Investor\"? I'd like to keep receiving financials and keep my pro rata in future rounds. That's all I ask.\n\nThank you,\nRuth Feldman",
    "good": [
     "Check the definition of Major Investor (a share threshold) and answer her",
     "Explain what Major Investors get (information and pro rata rights) and what others get",
     "Be clear you represent the company",
     "Kind and short, matching her tone"
    ],
    "model": "Dear Ruth,\n\nThanks for asking. I represent the company, so I can tell you what the agreement says, but not advise you on your own choices.\n\nUnder the draft, a \"Major Investor\" holds at least [threshold] shares of preferred stock. Based on your SAFE converting at the Series A, you'd hold [your number], which is below that, so you wouldn't receive the regular financial reports or the right to buy into future rounds under this agreement.\n\nIf those rights matter to you, the company can consider a side letter. I'll pass your request to Bernard.\n\nBest regards,\n[You]",
    "follow": {
     "from": "Ruth Feldman",
     "body": "Thank you. That's very clear. I'd appreciate it if Bernard would consider it.\n\nRuth"
    }
   },
   {
    "id": "pr",
    "at": 14,
    "from": "Priya Raman",
    "role": "Senior associate, Hart & Lowell",
    "subject": "What do you think?",
    "body": "Hey,\n\nGraham's going to fight on the drag. Before I get on the phone with him: what do you think our walk-away point is? Read section 3 of the NVCA Voting Agreement (the drag conditions) and the footnotes, and send me the two conditions you'd never give up and the one you'd trade.\n\nNo essays. I have a closing at 4.\n\nP.",
    "good": [
     "Actually read the form and its footnotes",
     "Pick two must-haves and one tradable point, with a reason for each",
     "Keep it short, since Priya is busy",
     "Recommendation, not a list of options"
    ],
    "model": "Priya,\n\nMust-haves:\n1. Same consideration for every holder of the same class. Otherwise the drag can be used to pay insiders more.\n2. Liability capped at what each holder receives, and several, not joint.\n\nTradable: the common's approval. We could accept board approval plus a founder vote instead.\n\n[You]",
    "follow": {
     "from": "Priya Raman",
     "body": "Ok you've earned a coffee. Good call on the trade, that's where I'd land too.\n\nP."
    }
   }
  ]
 },
 "6": {
  "skill": "Know who you represent. Did you stay counsel to the company while two founders fought?",
  "debrief": [
   "Can Bernard remove Abigail from the board? Who decides?",
   "What does the company owe Abigail, and what don't you owe her?",
   "What's on your agenda, and who runs the meeting?",
   "Why did Lena's email matter?"
  ],
  "intro": "Abigail and Bernard disagree about which Series A lead to choose and about who runs the product. The board has three founders and Tom Brandt. You are company counsel.",
  "mail": [
   {
    "id": "b",
    "at": 0,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Need a document today",
    "body": "Hi,\n\nAbigail is blocking the deal with Investor 2 and it's getting personal. Can you draft whatever I need to take her off the board? I own more stock than she does. I'd like it signed by tonight.\n\nPlease keep this between us for now.\n\nB.",
    "good": [
     "Don't draft it, and don't keep secrets from the company",
     "Explain that you represent the company, not Bernard",
     "Say who can remove a director (usually stockholders, and the Voting Agreement may control seats)",
     "Recommend a board meeting with proper notice, and tell Diane"
    ],
    "model": "Hi Bernard,\n\nI understand this is frustrating. I need to be straight with you: I represent the company, not you personally, so I can't prepare this quietly or keep it from the rest of the board.\n\nOn the substance: directors are generally removed by the stockholders, not by another director. Abigail's seat may also be protected by the Voting Agreement. Taking her off the board by tonight isn't realistic, and trying could put the financing at risk.\n\nWhat I'd suggest is a board meeting, properly called, to decide on the lead investor. I'm letting Diane know so we can help set it up. You may also want your own lawyer for your personal position.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Ok. That's fair. I was angry. Let's do the meeting.\n\nB."
    }
   },
   {
    "id": "a",
    "at": 6,
    "from": "Abigail Reyes",
    "role": "CTO and co-founder, Mostly Human AI",
    "subject": "Board meeting",
    "body": "I want to call a board meeting to vote on the lead investor before Bernard signs anything. Can I do that as a director?\n\nAlso, you've been helpful. Can you advise me on whether I should vote against Investor 2?\n\nAbigail",
    "good": [
     "Answer the first question: check the bylaws for who can call a special meeting and how much notice is needed",
     "Decline the second politely: you can't advise her as an individual",
     "Suggest her own counsel",
     "Treat her the same way you treated Bernard"
    ],
    "model": "Abigail,\n\nOn the meeting: under the company's bylaws, [any director / the chair / a majority] can call a special board meeting with [X] days' notice. I'll confirm the exact rule and help the company send proper notice.\n\nOn your vote: I can't advise you on that, because I represent the company and not any director personally. Your duty as a director is to the company and all its stockholders. If you want advice on your own position, you should have your own lawyer.\n\nBest,\n[You]",
    "follow": {
     "from": "Abigail Reyes",
     "body": "That's the answer I expected, and the right one.\n\nA."
    }
   },
   {
    "id": "d",
    "at": 12,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "Agenda and a memo",
    "body": "Hi,\n\nWe'll have a board meeting Thursday. Please draft the agenda and a one-page memo to the full board on process: who we represent, what each director owes, and how to deal with the disagreement. Make sure you explain this so that Tom, who isn't a lawyer, follows it.\n\nThanks,\nDiane",
    "good": [
     "Agenda: notice, quorum, presentation of the three offers, discussion, vote, minutes",
     "Memo: the firm represents the company; directors owe duties of care and loyalty to the company and stockholders",
     "Suggest the directors hear from the bidders and that the minutes show a real process",
     "Plain enough for a non-lawyer"
    ],
    "model": "Diane,\n\nAgenda (Thursday):\n1. Call to order, quorum\n2. Series A: summary of the three term sheets (counsel)\n3. Discussion\n4. Vote on the lead investor, and authorization to negotiate\n5. Minutes\n\nMemo, in short: Hart & Lowell represents the company. Each director owes care (be informed, read the materials) and loyalty (decide for the company, not yourself). Disagreement is normal. What matters is a fair, informed process recorded in the minutes. Directors who want personal advice should get their own counsel.\n\n[Full memo attached.]",
    "follow": {
     "from": "Diane Okafor",
     "body": "Thanks. Good job. Send it to me first, then the board.\n\nD."
    }
   },
   {
    "id": "l",
    "at": 18,
    "from": "Lena Ortiz",
    "role": "General partner, Kestrel Capital",
    "subject": "Heads up",
    "body": "Hi,\n\nI'll be direct. Kestrel won't lead a round into a founder fight. If the board can't agree on a lead and a product leader by next week, we'll step back.\n\nI'm telling you so the company can plan.\n\nLena",
    "good": [
     "Don't negotiate or reveal board discussions",
     "Thank her and say you'll pass it to the board",
     "Recognize this is material for the board's decision and forward it to Diane"
    ],
    "model": "Lena,\n\nThank you for being direct. I'll share this with the board ahead of Thursday's meeting.\n\nBest,\n[You]",
    "follow": {
     "from": "Lena Ortiz",
     "body": "Thanks. I hope we get there.\n\nL."
    }
   }
  ]
 },
 "7": {
  "skill": "See the deal from the fund's side. Why is the investor asking for this now?",
  "debrief": [
   "Why does Tom want to sell now? Think about where Juniper is in its fund life.",
   "What does the company control in Tom's sale?",
   "What information can go to a buyer, and what can't?"
  ],
  "intro": "Two years after the Series A. Tom Brandt's fund, Juniper Ventures, is near the end of its life. You are company counsel.",
  "mail": [
   {
    "id": "t",
    "at": 0,
    "from": "Tom Brandt",
    "role": "Partner, Juniper Ventures",
    "subject": "Small favor",
    "body": "Hi!\n\nJuniper Fund I is in year eight and our LPs would love some cash back. We're moving our Mostly Human stake into a continuation fund we manage, with a new secondary investor coming in alongside us. Super routine.\n\nCould the company waive the ROFR and approve the transfer this week? The buyer would also like a look at the last two board decks and the cap table.\n\nThanks!\nTom",
    "good": [
     "Don't approve anything yourself: the board decides on consents and ROFR waivers",
     "Check the transfer restrictions in the bylaws and the ROFR and Co-Sale Agreement",
     "Be careful with information: board decks are confidential, and an NDA is a minimum",
     "Note Tom is a director with an interest in the decision",
     "Friendly but noncommittal"
    ],
    "model": "Hi Tom,\n\nThanks for the heads up. I'll take this to the board. Under the ROFR and Co-Sale Agreement and the bylaws, the company has a right of first refusal, and the transfer needs the board's consent. Since you're on the board, you'll want to step out of that discussion.\n\nOn information: before anything goes to the buyer, the company will need an NDA, and the board will decide what can be shared. Board decks may be off limits.\n\nI'll come back to you after the board has met.\n\nBest,\n[You]",
    "follow": {
     "from": "Tom Brandt",
     "body": "Totally fair, I'll sit that one out. NDA's on its way.\n\nTom"
    }
   },
   {
    "id": "p",
    "at": 8,
    "from": "Priya Raman",
    "role": "Senior associate, Hart & Lowell",
    "subject": "What do you think?",
    "body": "Hey,\n\nYou saw Tom's email. What do you think is really going on? Hint: look at how long a venture fund lasts and what DPI means. Two sentences back to me, then one sentence on what the company should care about.\n\nP.",
    "good": [
     "Explain fund life: about ten years, with LPs expecting distributions (DPI) by year eight",
     "Explain that a continuation fund lets the GP return cash and keep upside",
     "Say what the company cares about: who the new holder is, information leakage, and the GP's conflict of interest"
    ],
    "model": "Priya,\n\nJuniper's fund is near the end of its ten-year life and its LPs want cash back (DPI), so Tom is selling to a vehicle he also runs, which returns cash and keeps the upside. That means Tom is both seller and buyer, which is a conflict for his LPs to sort out, not us.\n\nFor the company: who ends up on the cap table, what information they get, and whether Tom stays on the board.\n\n[You]",
    "follow": {
     "from": "Priya Raman",
     "body": "Yep. You'd make a decent VC. Don't, though. 😄\n\nP."
    }
   }
  ]
 },
 "9": {
  "skill": "Tax in plain English. Can you explain the rule, the deadline and the risk, without giving personal tax advice?",
  "debrief": [
   "What's wrong with Eli's loan if the note is non-recourse?",
   "What happens to the loan if the company files for an IPO?",
   "Does Bernard's stock qualify for QSBS? What do you need to know first?"
  ],
  "intro": "The company is between the Series A and the Series B. Tax questions arrive from all sides. You are company counsel.",
  "mail": [
   {
    "id": "e",
    "at": 0,
    "from": "Eli Brooks",
    "role": "Head of product, Mostly Human AI",
    "subject": "Early exercise + a note?",
    "body": "Hi! 👋\n\nI'd like to early-exercise all 200,000 of my options ($0.10 strike, so $20,000) and file an 83(b), so my capital gains and QSBS clocks start now. I don't want to tie up the cash, so can the company just lend me the $20K on a note secured by the shares? Totally standard at later-stage companies. Bernard already said yes.\n\nEli\n(cc Bernard)",
    "good": [
     "Board approval, not Bernard's yes",
     "A non-recourse note is generally treated as an option for tax, so the 83(b) and holding-period benefits may not work; it should be full recourse",
     "Interest at least at the IRS applicable federal rate",
     "Forgiveness of the loan is taxable income",
     "Sarbanes-Oxley § 402 bars loans to executive officers once the company files for an IPO, so the note has to be repaid before then",
     "You represent the company; Eli needs his own tax adviser"
    ],
    "model": "Hi Eli,\n\nThanks for the clear request. I'll take it to the board, since a loan to an officer needs board approval. A few points the board will want covered:\n\n• The note should be full recourse. If it isn't, the tax rules generally treat the purchase as an option, and the early exercise wouldn't do what you want.\n• It needs interest at least at the IRS minimum rate.\n• If the loan were ever forgiven, that would be taxable income to you.\n• If the company files for an IPO, the law bars loans to executive officers, so the note would have to be repaid before then.\n\nSince I represent the company, please check the tax side with your own adviser.\n\nBest,\n[You]",
    "follow": {
     "from": "Eli Brooks",
     "body": "All fair. Full recourse is fine. Good catch on the IPO piece. 👍\n\nE."
    }
   },
   {
    "id": "d",
    "at": 8,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "QSBS question from Bernard",
    "body": "Hi,\n\nBernard asks whether his founder shares qualify for QSBS and how much he could exclude if we sell. Before you answer him: make sure you check when his shares were issued, because the rules changed in 2025. Send me the questions we need answered first, then a draft answer.\n\nThanks,\nDiane",
    "good": [
     "List the facts needed: issue date, C corp status, gross assets at issuance, active business, holding period",
     "Explain the 2025 change: for stock issued after July 4, 2025, the gross-asset limit is $75M, the cap is $15M, and partial exclusions start after three years",
     "Don't promise him a number",
     "Draft for Bernard in plain language"
    ],
    "model": "Diane,\n\nQuestions first:\n1. When were Bernard's shares issued? Before or after July 4, 2025?\n2. Was the company a C corp with gross assets under the limit at that time?\n3. Is the business a qualifying active business? AI services are usually fine, but we should confirm.\n4. How long will he have held the shares at a sale?\n\nDraft for Bernard: \"Your shares may qualify for an exclusion from federal tax on gain. How much depends on when they were issued and how long you hold them. For stock issued after July 2025, partial exclusions start at three years and the full exclusion at five, up to a cap. We'll confirm your numbers once we have the dates. Please check your own situation with a tax adviser.\"",
    "follow": {
     "from": "Diane Okafor",
     "body": "Nice. Send me the dates when you have them.\n\nD."
    }
   }
  ]
 },
 "10": {
  "skill": "Protect the company under pressure. Did you find the clause, the deadline and the conflict?",
  "debrief": [
   "What does the missed cash covenant let the lender do?",
   "Why can't Lena's fund just approve its own bridge?",
   "What would a fair process for the bridge look like?"
  ],
  "intro": "Minion is popular, but inference costs are high. The company has venture debt and about five months of cash. You are company counsel.",
  "mail": [
   {
    "id": "d",
    "at": 0,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "Covenant problem",
    "body": "Hi,\n\nHana says cash dropped below the $5M minimum in the loan agreement last week. Please read the agreement tonight and tell me: is it a default, what notice do we owe the lender and by when, and what can the lender do? Make sure you give me the section numbers.\n\nThanks,\nDiane",
    "good": [
     "Find and cite the covenant, notice and default sections",
     "Say whether there's a cure period",
     "List lender remedies: acceleration, sweeping cash, default interest",
     "Recommend contacting the lender early about a waiver or amendment"
    ],
    "model": "Diane,\n\nShort answer: yes, it's likely a default.\n\n• Covenant (§ [x]): minimum cash of $5M, tested [monthly].\n• Notice (§ [y]): the company has to notify the lender within [z] business days of knowing about a default.\n• Cure: [none / X days].\n• Remedies (§ [w]): the lender can speed up repayment, charge default interest, and use its control over the bank accounts.\n\nRecommendation: call the lender before the notice deadline and ask for a waiver or a lower minimum. Lenders usually prefer to negotiate rather than enforce.",
    "follow": {
     "from": "Diane Okafor",
     "body": "Thanks. Good job on the section numbers. Set up the lender call for Thursday.\n\nD."
    }
   },
   {
    "id": "l",
    "at": 7,
    "from": "Lena Ortiz",
    "role": "General partner, Kestrel Capital",
    "subject": "Bridge offer",
    "body": "Hi,\n\nKestrel and Juniper are willing to bridge the company with $4M in notes. Terms: the notes convert at the next round with a 2x liquidation preference. We'd like a board vote this week. I'll be presenting it.\n\nLena",
    "good": [
     "Recognize the conflict: the bridge investors have directors on the board",
     "Recommend a process: independent director or special committee, outside offers, a rights offering to all holders",
     "Note the lender's consent may be needed for new debt",
     "Keep the tone neutral; send it to Diane"
    ],
    "model": "Lena,\n\nThank you. The company appreciates the support. Because Kestrel and Juniper both have directors on the board, we'll recommend that the board use a process that protects everyone. That could mean the independent director leading, a look at other options, and possibly offering the notes to all holders. We'll also check whether the lender needs to consent.\n\nI'll get back to you on timing after I've spoken with Diane.\n\nBest,\n[You]",
    "follow": {
     "from": "Lena Ortiz",
     "body": "Understood. We expected that. A rights offering is fine with us.\n\nL."
    }
   },
   {
    "id": "b",
    "at": 14,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Lender wants more",
    "body": "The lender says they'll waive the covenant if we give them more warrants and add a clause saying they can call the loan if \"investors stop supporting the company.\" Should I just sign? We need the cash.\n\nB.",
    "good": [
     "Explain the investor-abandonment clause: it hands the lender a trigger the company doesn't control",
     "Note the cost of the extra warrants",
     "Suggest negotiating: a time-limited waiver or a lower covenant",
     "Don't let him sign before the board sees it"
    ],
    "model": "Hi Bernard,\n\nPlease don't sign yet. Two things to know:\n\n• The \"investors stop supporting\" clause lets the lender call the loan based on what Kestrel and Juniper decide, which the company doesn't control. That's a serious risk right now.\n• More warrants mean more dilution for everyone.\n\nWe can push for a waiver without that clause, or a lower cash minimum for six months. The board should see the final terms before anyone signs. I'll set up a call with Diane today.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Got it, not signing. Call today works.\n\nB."
    }
   }
  ]
 },
 "11": {
  "skill": "Advise the board, not a person. Did you show who gets what, and who has a conflict?",
  "debrief": [
   "Run the waterfall at $60M. What does the common get?",
   "Why is Bernard's retention package a problem for the board?",
   "What do Lena's fund's interests look like compared with the common's?",
   "What process would you recommend?"
  ],
  "intro": "About six weeks of cash left. Two offers are on the table: a stock sale below the last valuation and an acqui-hire. You are company counsel.",
  "mail": [
   {
    "id": "d",
    "at": 0,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "Two offers",
    "body": "Hi,\n\nWe have two offers: a $60M stock purchase and an acqui-hire worth about $25M to the company plus jobs for the engineers. Please run both through the waterfall and send me a one-page memo for the board: who gets what, and the process you'd recommend. Make sure you explain the preferences so the board follows.\n\nThanks,\nDiane",
    "good": [
     "Use the waterfall: debt first, then preferences, then common",
     "Show that common may get little or nothing in the acqui-hire",
     "Flag the conflicts: management packages and preferred versus common (Trados)",
     "Recommend a process: independent director, outside advice, a record of options considered"
    ],
    "model": "Diane,\n\nWho gets what (from the waterfall):\n• $60M sale: the lender is paid first, then the preferred takes its preferences, which leaves the common about [figure].\n• Acqui-hire: after the lender and preferences, the common gets about [figure], and most of the value goes to the engineers as new pay.\n\nProcess: the board should rely on the independent director, look at alternatives, record why it chose what it did, and deal openly with management's retention packages. When the preferred and common have different interests, the directors owe their duties to the common too.",
    "follow": {
     "from": "Diane Okafor",
     "body": "Nice. Add one line on the timing risk and it's ready.\n\nD."
    }
   },
   {
    "id": "b",
    "at": 6,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Personal question",
    "body": "The buyer offered me a $3M retention bonus and a VP title if we take the $60M deal. The rest of the team gets a lot less. That's normal, right? Should I tell the board?\n\nB.",
    "good": [
     "Yes, he must disclose it to the board",
     "Explain why: a personal benefit creates a conflict in his vote",
     "You represent the company; he should get his own lawyer for the package",
     "Suggest the board consider a management carve-out or retention plan"
    ],
    "model": "Hi Bernard,\n\nYes, please tell the board, and before it votes. A $3M package that the other stockholders don't get is a personal interest in the deal, and the board needs to know to decide fairly. That protects you too.\n\nThe board may want to look at the retention terms across the team. Since I represent the company, please have your own lawyer review the offer.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Ok. I'll tell them Thursday. Kind of glad you said that.\n\nB."
    }
   },
   {
    "id": "a",
    "at": 12,
    "from": "Abigail Reyes",
    "role": "CTO and co-founder, Mostly Human AI",
    "subject": "The acqui-hire",
    "body": "If we take the acqui-hire, what happens to my unvested shares, the models I built, and my stock? Do the investors just take everything?\n\nAbigail",
    "good": [
     "Answer the general mechanics: unvested shares depend on the deal and any acceleration terms; the IP goes with the company's assets",
     "Explain the preference stack in plain words",
     "Be clear you represent the company; she needs her own lawyer for her position"
    ],
    "model": "Abigail,\n\nGenerally:\n• The models belong to the company, so they go with the deal.\n• Unvested shares depend on your stock agreement and the deal terms. Some agreements speed up vesting on a sale, and some don't.\n• In an acqui-hire, the price for the company is low, so after the lender and the investors' preferences, there may be little for the common, including you.\n\nI represent the company, so for your own position please talk to your own lawyer.\n\nBest,\n[You]",
    "follow": {
     "from": "Abigail Reyes",
     "body": "Understood. Thank you for not dressing it up.\n\nA."
    }
   }
  ]
 },
 "12": {
  "skill": "Liquidity without chaos. Did you match the right tool to each request?",
  "debrief": [
   "Why can't Eli just sell on a marketplace?",
   "Tender offer or negotiated secondary: which fits the company now?",
   "Does Marcus have registration rights? Where would you look?"
  ],
  "intro": "The Series B is closing. Employees and early investors want to sell. You are company counsel.",
  "mail": [
   {
    "id": "d",
    "at": 0,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "Employee liquidity",
    "body": "Hi,\n\nThe board wants to let employees sell some shares at the Series B. Kestrel would buy up to $10M. Please send me a short comparison: a company-run tender offer versus a negotiated secondary. Who can take part, what information they need, and which securities rules apply. Make sure you explain this so the board follows.\n\nThanks,\nDiane",
    "good": [
     "Tender offer: open to a broad group, with Regulation 14E rules (open 20 business days, equal treatment)",
     "Negotiated secondary: a few sellers, faster, but fairness and information concerns",
     "Information: buyers and sellers should have the same information",
     "Note the 409A and tax effects",
     "Recommendation"
    ],
    "model": "Diane,\n\n• Tender offer: open to all eligible holders. Tender offer rules (Regulation 14E) apply, so it stays open 20 business days and everyone gets the same price and information. Fairer, but slower and more costly.\n• Negotiated secondary: a few chosen sellers. Faster and cheaper, but it can feel unfair to everyone else and still raises information issues.\n• Either way: sellers need an information package, and the price may affect the next 409A.\n\nRecommendation: a tender offer, given how many employees have asked.",
    "follow": {
     "from": "Diane Okafor",
     "body": "Thanks. Good job. Board will like the recommendation.\n\nD."
    }
   },
   {
    "id": "e",
    "at": 6,
    "from": "Eli Brooks",
    "role": "Head of product, Mostly Human AI",
    "subject": "Selling on a marketplace?",
    "body": "Hey!\n\nA secondary marketplace says they'll buy my shares at $8. Better than the tender! Can I just go ahead? It's my stock. 🙂\n\nEli",
    "good": [
     "No: the bylaws and the ROFR and Co-Sale Agreement restrict transfers and require consent",
     "Explain the ROFR",
     "Mention that the company may decline transfers outside its program",
     "Represent the company; he can get his own advice"
    ],
    "model": "Hi Eli,\n\nNot without the company's consent. The bylaws restrict transfers of company stock, and the company has a right of first refusal on any sale. Many companies also decline transfers outside their own programs, to keep the cap table clean and the price consistent.\n\nThe board will decide on the tender offer soon. I'd wait for that. For your personal decision, check with your own adviser.\n\nBest,\n[You]",
    "follow": {
     "from": "Eli Brooks",
     "body": "Makes sense. I'll wait. 👍\n\nE."
    }
   },
   {
    "id": "m",
    "at": 12,
    "from": "Marcus Lee",
    "role": "Angel investor",
    "subject": "My IPO rights",
    "body": "Dear counsel,\n\nI understand an IPO may be coming. As an early investor I expect to sell all my shares on the first day, and I will also need DEMAND registration. Please confirm my registration rights under the \"Investors Agreement of Rights\" and the date I can sell.\n\nRegards,\nProf. Marcus Lee, PhD",
    "good": [
     "Check whether Marcus is party to the Investors' Rights Agreement and holds registrable securities",
     "Explain that demand rights belong to a group of holders, not one person, and usually start some time after the IPO",
     "Explain the lock-up: usually about 180 days",
     "Polite and firm; you represent the company"
    ],
    "model": "Dear Professor Lee,\n\nThanks for your note. I represent the company, so I can explain the documents but can't advise you personally.\n\n• Registration rights: these come from the Investors' Rights Agreement, and only holders who signed it have them. Demand rights must be exercised by a group of holders, not one person, and usually not until some time after an IPO.\n• Lock-up: in an IPO, early holders usually agree not to sell for about 180 days.\n\nThere's no IPO planned right now. If there is one, the company will contact all holders.\n\nBest regards,\n[You]",
    "follow": {
     "from": "Marcus Lee",
     "body": "Most disappointing. I shall consult my own counsel, who is very good.\n\nProf. Marcus Lee, PhD"
    }
   }
  ]
 },
 "13": {
  "skill": "Connect ideas to documents. Can you show where a big idea turns into a clause?",
  "debrief": [
   "Which thinker's idea best explains the 1x non-participating preference?",
   "Where does the power law show up in a term sheet?",
   "Is Bernard right to quote Thiel?"
  ],
  "intro": "No deal this week. Diane and the client have been reading.",
  "mail": [
   {
    "id": "b",
    "at": 0,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Read this on the plane!!",
    "body": "Just finished Zero to One. \"Competition is for losers!\" We should never raise a down round and stay private forever like the best companies. Can you put that in our charter? 😄\n\nB.",
    "good": [
     "Take the question seriously but answer it",
     "A charter can't prevent future financing, and a ban would hurt the company when it needs money",
     "Connect Thiel's idea (monopoly, long horizon) to what the documents actually do",
     "Light tone"
    ],
    "model": "Hi Bernard,\n\nGreat book. But no, we can't put that in the charter, and you wouldn't want it there. A ban on down rounds would block the company from raising money exactly when it might need it most.\n\nThiel's point is more about building something so different it has no real competition. The documents do reflect that long view: preferences and protective provisions are how investors protect themselves while waiting a long time for a big outcome.\n\nHappy to talk about it over coffee.\n\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Ha, ok, no charter amendment. Coffee yes!\n\nB."
    }
   },
   {
    "id": "p",
    "at": 6,
    "from": "Priya Raman",
    "role": "Senior associate, Hart & Lowell",
    "subject": "What do you think?",
    "body": "Hey,\n\nPick one thinker from this week's reading and one clause in our Series A documents. Three sentences: what the idea is, where it shows up in the clause, and whether the clause gets it right.\n\nNo citations needed. I just want to see you think.\n\nP.",
    "good": [
     "Pick one specific idea and one specific clause",
     "Explain the link clearly",
     "Take a position"
    ],
    "model": "Priya,\n\nPaul Graham says startups are built for growth, so a company either grows fast or fails. The protective provisions in our charter show investors worrying about the opposite risk: management taking the company somewhere slow and safe. I think the provisions get it mostly right, but the debt limit is too tight for a company that needs to spend to grow.\n\n[You]",
    "follow": {
     "from": "Priya Raman",
     "body": "Ooh, a take. I like it. Argue it at dinner.\n\nP."
    }
   }
  ]
 },
 "14": {
  "skill": "Use AI like a lawyer. Did you keep competence, confidentiality and judgment with you?",
  "debrief": [
   "What does ABA Formal Opinion 512 require before the firm uses AI on client documents?",
   "What's the risk in Bernard's AI-drafted consent?",
   "How should the bill reflect AI time savings?"
  ],
  "intro": "AI tools are everywhere, at the firm and at the client.",
  "mail": [
   {
    "id": "d",
    "at": 0,
    "from": "Diane Okafor",
    "role": "Partner, Hart & Lowell",
    "subject": "AI diligence",
    "body": "Hi,\n\nWe've been asked to run diligence on 200 customer contracts for a buyer of Mostly Human AI's assets, and the client asks if we can use an AI review tool to save fees. What do we need to do first? Make sure you cover what the ABA has said.\n\nThanks,\nDiane",
    "good": [
     "ABA Formal Opinion 512: competence, confidentiality, communication with the client, supervision, reasonable fees",
     "Check the tool's data terms (no training on client data, security)",
     "Get client consent where needed",
     "Lawyer review of the output",
     "Bill for actual time, not time saved"
    ],
    "model": "Diane,\n\nBefore we use the tool (ABA Formal Opinion 512):\n• Competence: we understand what it does well and badly, and a lawyer checks its output.\n• Confidentiality: the vendor can't train on or share client data. We check the terms and security, and get the client's informed consent if needed.\n• Communication: tell the client we're using it.\n• Supervision: the associates using it are trained and supervised.\n• Fees: bill for real time spent. We can't charge for time the tool saved.",
    "follow": {
     "from": "Diane Okafor",
     "body": "Thanks. Good job. Send me the vendor terms.\n\nD."
    }
   },
   {
    "id": "b",
    "at": 6,
    "from": "Bernard Walsh",
    "role": "CEO, Mostly Human AI",
    "subject": "Saved you some work!",
    "body": "I had an AI draft our board consent approving the asset sale, plus the bill of sale. Can you just give it a quick look and approve it today? Should save fees! 😄\n\nB.",
    "good": [
     "Thank him, but explain a lawyer still has to review it fully",
     "Spot the usual problems: wrong form, missing approvals (§ 271 stockholder vote), wrong names or numbers",
     "You're responsible for what you approve",
     "Give a realistic timeline"
    ],
    "model": "Hi Bernard,\n\nThanks, that may help. I'll need to review it properly, not just a quick look, because the company relies on it. An asset sale of this size also needs stockholder approval, not just the board, and AI drafts often miss that kind of step.\n\nI'll send comments tomorrow.\n\nBest,\n[You]",
    "follow": {
     "from": "Bernard Walsh",
     "body": "Ha, ok. It did look a little too easy.\n\nB."
    }
   }
  ]
 }
});
window.INBOX[8].mail.push({
 "id": "dn",
 "at": 22,
 "from": "Dana Park",
 "role": "First engineer, Mostly Human AI",
 "subject": "Sorry, a few questions!",
 "body": "Hi! Sorry to bother you!\n\nWith everything going on with the Series B, I realized I don't really understand my equity. My offer letter says 250,000 options. A few questions:\n\n1. Is 250,000 a lot? What percent of the company is that?\n2. What's a strike price? Mine says $0.0001. Is that a typo??\n3. Do I own the shares now, or do I have to buy them?\n4. My friend at Google said I should file an 83(b). What is that and is the deadline real?\n5. If I leave, do I lose everything?\n6. If we get bought, what happens to my options?\n\nSorry, that's a lot!\n\nDana\n\nP.S. Is it normal that the VCs paid $7 and I pay $0.0001?",
 "good": [
  "Answer the factual questions about the plan in plain English",
  "Percent = her options divided by fully diluted shares",
  "Strike is set at fair market value when granted; it's low because she joined at incorporation",
  "Options are a right to buy; exercising costs money and has tax effects",
  "83(b) applies to restricted stock or early exercise, within 30 days",
  "Leaving: unvested options end; vested options usually must be exercised within about 90 days",
  "Acquisition depends on the plan and the deal",
  "Personal tax choices: own adviser"
 ],
 "model": "Hi Dana,\n\nNot a bother at all. These are good questions. Here's how the company's plan works:\n\n1. 250,000 options is about [x]% of the company on a fully diluted basis.\n2. The strike is what you pay per share when you exercise. It's set at the stock's value when you were granted, and it's tiny because you joined at the very start. Not a typo!\n3. You own options, which are a right to buy shares. Buying (exercising) all 250,000 would cost about $25, but it can have tax consequences.\n4. An 83(b) election applies when you own stock that's still vesting, for example if you exercise early. If you do, the 30-day deadline is real and can't be extended.\n5. If you leave, unvested options end. Vested options usually have to be exercised within about 90 days.\n6. In a sale, it depends on the plan and the deal. Options can be assumed, cashed out or sometimes sped up.\n\nOn P.S.: yes. Investors buy preferred stock with extra rights, and your price was set years earlier.\n\nI represent the company, so for what you should do personally, please talk to a tax adviser.\n\nBest,\n[You]",
 "follow": {
  "from": "Dana Park",
  "body": "This is SO helpful, thank you!! Printing it out. One more: what's a tax adviser? 😅 Kidding. Mostly.\n\nDana"
 }
});
window.INBOX[8].debrief.push("Dana asked six questions. Which could you answer, and which did you send to her own adviser?");
