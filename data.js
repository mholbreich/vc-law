/* Course content. Text marked src:"draft" is copied word for word from
   Venture_Capital_Law_Spring_2027_Draft_Syllabus.docx. Anything with
   status:"suggested" was added in the app and is not yet assigned. */
window.COURSE = {
  policiesIntro: "Students are expected to know and abide by university policies and guidelines.",
  classTime: "4:30 to 7:00 pm",
  dinnerTime: "7:30 pm",
  tagline: "How startups raise money, who ends up owning what, and what the lawyers do in between.",
  title: "Venture Capital Law",
  term: "Spring 2027 · University of Colorado Law School",
  meta: "Thursdays, 4:30 to 7:00 pm · 2½ hours per session · 14 class meetings · Draft for discussion",
  description: "This course examines venture capital as an asset class, a profession, and a legal practice. Students follow a fictional venture-backed company from formation through financing, governance, employee and founder issues, distress, and liquidity. The course emphasizes how venture lawyers exercise judgment: interpreting deal terms, identifying material issues, advising clients, negotiating creatively, and drafting precisely.",
  objectives: [
    "Explain the economic incentives of venture investors, funds, founders, and employees.",
    "Analyze and negotiate SAFEs, preferred-stock terms, and core NVCA financing documents.",
    "Model dilution and exit proceeds; identify key tax consequences, including QSBS and Section 83(b).",
    "Advise on governance, fiduciary duties, conflicts, founder departures, distress, and acquisitions.",
    "Exercise transactional judgment: distinguish material issues from negotiating noise and propose workable solutions.",
    "Determine whether venture capital is a path you’d like to pursue."
  ],
  format: "Each class is split evenly. The first half is The Practice of Venture Capital Law: doctrine, discussion and practical exercises. After a 10-minute break, the second half is The Lived Experience of Venture Capital: a conversation with a guest.",
  grading: [["Participation", 10], ["A written thought piece", 10], ["Final exam", 80]],
  policies: [
    ["Attendance", "Colorado Law requires regular, punctual attendance. Missing or arriving late to more than 20% of classes can lower your grade.", "https://www.colorado.edu/law/media/9080", "Law School Rules"],
    ["Honor Code", "The Colorado Law Honor Code applies to all work in this course.", "https://www.colorado.edu/law/academics/honor-code", "Honor Code"],
    ["Exams", "The final exam is graded anonymously and administered by the Dean’s office.", "", ""],
    ["Accommodations", "If you have accommodations through Disability Services, send me your letter early. If you have a temporary illness, injury or a religious observance that conflicts with class or the exam, let me know as soon as you can. Disability Services: 303-492-8671, dsinfo@colorado.edu.", "", ""],
    ["Respect and reporting", "Treat everyone in class with professional courtesy. If you experience discrimination, harassment or sexual misconduct, contact OIEC (303-492-2127, cureport@colorado.edu). I am required to share reports with OIEC.", "", ""],
    ["Wellbeing", "If you are struggling, Counseling and Psychiatric Services is available 24/7 at 303-492-2277.", "", ""]
  ],
  policiesLink: "https://www.colorado.edu/academicaffairs/policies-customs-guidelines/required-syllabus-statements",
  publicUrl: "https://mholbreich.github.io/vc-law/",
  thisWeekNote: "",
  dinnerSheetId: "11Akds9BNsDOIuxniIDPcN1WHR-HbdE7rnnexpj8KKmg",
  dinnerForm: "",
  dinnerApi: "https://script.google.com/macros/s/AKfycbzuQw4ct76-A-yuXk5b4J_mqCuP-NAMsJWsm-0g0ywvaVED1lKjZ2H56KyLA3R-dnLE/exec", // web app URL from dinners/dinner-signup.gs
  instructor: { name: "Matthew Holbreich", bio: "Matthew Holbreich is a General Partner at GCVC, a venture fund backed by general counsels that invests in legal, regulatory and compliance technology, and the founder of Squad Capital, an operator fund backed by founders across the US, Europe and Israel. He also leads corporate affairs at Medable, coaches venture-backed CEOs and fund managers, and advises companies in defense and robotics. Before investing, he was a tech and venture capital lawyer at Fenwick & West and Lowenstein Sandler. Earlier, he taught philosophy and literature at Yeshiva University. He holds a JD from NYU School of Law, a PhD in political science from the University of Notre Dame and a BA from Tufts University." },
  officeHours: "By appointment.",
  email: "your.email@colorado.edu",
  bookingUrl: "https://vimcal.com/",
  transactionFile: "Students work with one fictional startup across the semester, switching between company and investor counsel. The file evolves through formation, a SAFE round, Series A, governance conflict, founder departure, debt/distress, and competing exit offers. Exercises include cap-table calculations, annotated NVCA provisions, negotiation plans, concise client emails, and selective clause drafting.",
  materials: "Primary materials will include current NVCA model documents, YC SAFE materials, selected Delaware decisions, transactional excerpts, tax authorities, and current venture-market research. Specific readings, guest names, office hours, grading rubrics, accessibility information, and university-required policies will be finalized before publication.",
  calendarNote: "No class scheduled Thursday, March 18 (spring break). Calendar dates and institutional policies should be confirmed against the final CU Law academic calendar."
};

/* stage groups the lifecycle route on the home page */
window.STAGES = [
  { id: "market", name: "The asset class", color: "#3f6e8c" },
  { id: "found", name: "Formation and seed", color: "#b88a2e" },
  { id: "priced", name: "Priced rounds", color: "#a6432b" },
  { id: "people", name: "Control, people and tax", color: "#5b6b3a" },
  { id: "exit", name: "Downside and exits", color: "#6c3f6e" },
  { id: "future", name: "The future", color: "#3f6e8c" }
];

/* weeks: focus, guest and prep are verbatim from the draft */
window.WEEKS = [
  { n: 1, date: "Jan 14", stage: "market", title: "Venture Capital as an Asset Class",
    focus: "History, fund returns and power laws, portfolio construction, fund life cycles, IRR/MOIC/DPI, comparison with other asset classes. Introduce fictional company and the question of venture-backability.",
    guest: "Experienced venture investor",
    proposedGuests: "Ron Zori, Taylor Sargent and/or Mason Angel",
    prep: "Peter Thiel, Zero to One (selections); introductory VC return/portfolio reading.",
    readings: ["zero-to-one", "kupor", "venture-monitor"],
    scenarios: [{ label: "What a $100M fund needs to return", tool: "fund" }],
    tools: [], caseCh: "intro" },
  { n: 2, date: "Jan 21", stage: "found", title: "Incorporation, Founder Equity, and IP",
    focus: "Delaware formation; founder stock and vesting; 83(b); QSBS eligibility; capitalization; assignment of inventions and IP diligence (about 30 minutes).",
    guest: "Startup formation/IP counsel",
    prep: "Formation checklist; founder restricted stock agreement; IP assignment excerpt.",
    readings: ["res-cooley", "kupor", "irc-83", "irc-1202"],
    scenarios: [{ label: "The founder split and option pool", tool: "dilution", d: "Incorporation" }, { label: "Should the founders file 83(b) elections?", tool: "tax", x: "83b" }],
    tools: ["captable", "tax"], caseCh: "formation" },
  { n: 3, date: "Jan 28", stage: "found", title: "Seed Financing: SAFEs and Early Capital",
    focus: "Post-money and pre-money SAFE mechanics, valuation caps, discounts, conversion, dilution and cap-table modeling; investor/company counseling. Securities exemptions introduced briefly in context.",
    guest: "Seed investor or emerging-company lawyer",
    prep: "YC SAFE forms and user guide; sample cap table.",
    readings: ["res-yc-safe", "form-side-letter", "venture-deals", "reg-d-506", "sec-4a2"],
    scenarios: [{ label: "Two angels on SAFEs, then a Seed", tool: "dilution", d: "Pre-seed" }, { label: "The cap table after the Seed", tool: "captable", asof: "Seed" }],
    tools: ["dilution", "captable"], caseCh: "safe", exercises: ["ex-safe-letters"] },
  { n: 4, date: "Feb 4", stage: "priced", title: "Priced Equity I: Stock Purchase Agreement and Charter",
    focus: "Term-sheet economics; pre/post-money valuation; liquidation preferences, participation, conversion and anti-dilution; SPA representations, closing conditions, and diligence issues.",
    guest: "Venture financing partner",
    prep: "NVCA model Stock Purchase Agreement and Amended & Restated Certificate of Incorporation.",
    readings: ["res-nvca", "venture-deals", "kupor"],
    scenarios: [{ label: "Three Series A term sheets", tool: "termsheets", s: "a" }, { label: "The Series A pool shuffle", tool: "dilution", d: "Series A" }],
    tools: ["termsheets", "dilution", "waterfall"], caseCh: "seriesA", exercises: ["ex-term-sheets"] },
  { n: 5, date: "Feb 11", stage: "priced", title: "Priced Equity II: Investor Rights and Control Documents",
    focus: "NVCA Investors’ Rights Agreement, Voting Agreement, ROFR/Co-Sale Agreement; information, registration, pro rata, board designation, drag-along and transfer rights; side letters and special investor rights.",
    guest: "Venture financing partner or investor counsel",
    prep: "NVCA model IRA, Voting Agreement, ROFR/Co-Sale Agreement; sample side letter.",
    readings: ["res-nvca", "form-side-letter", "venture-deals"],
    scenarios: [{ label: "Investor 2’s control terms", tool: "termsheets", s: "b" }],
    tools: ["termsheets"], caseCh: "seriesA", exercises: ["ex-control"] },
  { n: 6, date: "Feb 18", stage: "people", title: "Corporate Governance and Fiduciary Duties",
    focus: "Board structure, protective provisions in practice, conflicts, company-versus-founder representation, Delaware fiduciary principles, board process, and investor/founder tensions.",
    guest: "Independent director or venture governance counsel",
    prep: "Selected Delaware opinions and board-consent materials.",
    readings: ["res-nvca", "kupor", "venture-deals"],
    scenarios: [{ label: "Who holds the votes after the Series A", tool: "captable", asof: "Series A" }],
    tools: [], caseCh: "dispute", exercises: ["ex-governance"] },
  { n: 7, date: "Feb 25", stage: "market", title: "The Life of a Venture Capitalist and the Fund",
    dateNote: "Time may change: this class may start later that Thursday or move to Friday, Feb 26. Watch this page for the final time.",
    focus: "Career and daily work of a VC: sourcing, theses, diligence, investment committees, portfolio support, LP relations. Fund formation and economics: LPA, GP/LP structure, management fees, carry, side letters, fundraising constraints. The market right now: fundraising, valuations, capital concentration and exits.",
    guest: "VC general partner and/or fund formation lawyer",
    prep: "Sample fund term summary/LPA excerpts; investment committee memo.",
    readings: ["kupor", "ica-3c1", "advisers-vc-exempt", "venture-monitor", "carta-data"],
    scenarios: [{ label: "A $100M fund’s fees and carry", tool: "fund" }, { label: "Fund returns at 2x instead of 3x", tool: "fund", f: { grossMoic: 2 } }],
    tools: ["fund"], caseCh: null },
  { n: 8, date: "Mar 4", stage: "people", title: "Employee Equity and Founder Departures",
    focus: "Options, RSUs, 409A, vesting, exercise and tax consequences; executive/founder termination after Series A; repurchase, board rights, separation and conflicts.",
    guest: "Executive compensation or employment lawyer",
    prep: "Equity incentive plan excerpts; option grant; founder separation scenario.",
    readings: ["irc-409a", "regs-409a", "irc-422", "rule-701"],
    scenarios: [{ label: "An early employee’s options: ISO or NSO", tool: "tax", x: "options" }, { label: "What it costs to exercise", tool: "tax", x: "exercise" }],
    tools: ["tax", "captable"], caseCh: "departure", exercises: ["ex-departure"] },
  { n: 9, date: "Mar 11", stage: "people", title: "Venture Tax: Structuring and Optimization",
    focus: "QSBS synthesis; 83(b) and employee equity tax review; capital gains; entity and transaction structuring; tax issues in secondaries and exits.",
    guest: "Venture tax partner",
    prep: "Selected Code sections and practical QSBS/exit structuring examples.",
    readings: ["irc-1202", "irc-1045", "irc-83", "irc-422", "irc-1-h", "irs-tc409"],
    scenarios: [{ label: "QSBS on a $25M gain", tool: "tax", x: "qsbs" }],
    tools: ["tax"], caseCh: "formation" },
  { n: 10, date: "Mar 25", stage: "exit", title: "Debt, Convertible Notes, and Distressed Financing",
    focus: "Convertible notes versus SAFEs; venture debt, warrants, covenants and lender economics; insider bridge, down rounds, recapitalizations, low-cash board decisions and fiduciary considerations.",
    guest: "Venture debt lender or restructuring counsel",
    prep: "Convertible note and venture debt term sheets; distressed bridge scenario.",
    readings: ["form-note-ts", "form-note", "form-vd-ts", "form-warrant", "res-yc-safe", "res-nvca"],
    scenarios: [{ label: "A $30M sale with $8M of venture debt", tool: "waterfall", c: { wf: { exit: 30e6, debt: 8e6, seniority: "stacked" } } }],
    tools: ["waterfall", "captable"], caseCh: "debt", exercises: ["ex-bridge"] },
  { n: 11, date: "Apr 1", stage: "exit", title: "M&A and Exit Negotiations",
    focus: "Board evaluation of competing asset-sale and stock-sale offers; purchase price and allocation; representations, indemnities, escrows, earnouts; targeted purchase-agreement negotiation and drafting.",
    guest: "M&A partner",
    prep: "Selected acquisition agreement provisions and competing offers.",
    readings: ["venture-deals", "kupor", "res-nvca", "res-cooley"],
    scenarios: [{ label: "A $150M sale, below the last post-money", tool: "waterfall", c: { wf: { exit: 150e6, debt: 0, seniority: "stacked" } } }],
    tools: ["waterfall"], caseCh: "exit", exercises: ["ex-exit"] },
  { n: 12, date: "Apr 8", stage: "exit", title: "Liquidity: Secondaries, Tender Offers, and IPOs",
    focus: "Employee/founder secondaries, transfer restrictions, tender offers, registration rights, IPO process, and how liquidity choices affect constituencies.",
    guest: "Capital markets or secondary transactions lawyer",
    prep: "Tender/secondary transaction materials; IPO registration statement excerpts.",
    readings: ["kupor", "rule-13e4", "reg-14e", "rule-144", "sec-4a7", "form-s1"],
    scenarios: [{ label: "Charlie’s secondary in the Series B", tool: "captable", asof: "Series B" }, { label: "Dilution through the Series B", tool: "dilution", d: "Series B" }],
    tools: ["dilution", "captable"], caseCh: "seriesB" },
  { n: 13, date: "Apr 15", stage: "future", title: "The Ideas Behind Venture",
    focus: "The thinkers who shaped how venture works, and where their ideas show up in the documents: Thiel on monopoly and the power law, Paul Graham on growth and YC, Andreessen on software and founder control, Christensen on disruption, and the skeptics, Mazzucato on the state’s role. Each student makes the best case for one thinker and names a deal term the idea explains.",
    guest: "An investor known for writing publicly",
    prep: "Read the short pieces by your assigned thinker, plus Mallaby’s introduction. Come with one term from a financing document that their idea explains.",
    readings: ["zero-to-one", "pg-growth", "pg-ds", "andreessen-software", "christensen", "mazzucato", "mallaby"],
    scenarios: [{ label: "Why one winner has to return the fund", tool: "fund" }],
    tools: ["fund"], caseCh: null },
  { n: 14, date: "Apr 22", stage: "future", title: "Legal AI and the Future of Venture Practice",
    focus: "Practical legal AI workflows for diligence, drafting, research, cap-table and document review; confidentiality, verification, professional responsibility, and changes to venture-law business models.",
    guest: "Legal AI founder",
    prep: "Current product demos or workflow materials; professional-responsibility guidance.",
    readings: ["aba-512", "res-cooley"],
    tools: [], caseCh: null }
];

/* status: "draft" = named in the Spring 2027 draft; "2023" = assigned in the
   Spring 2023 syllabus; "suggested" = added in the app, not yet assigned */
window.READINGS = {
  "dgcl-122": { t: "8 Del. C. § 122(18) (stockholder agreements, added 2024)", kind: "Delaware law", topic: "Governance", status: "reference", note: "Lets a corporation agree to give stockholders approval rights, the response to Moelis", url: "https://delcode.delaware.gov/title8/c001/sc02/index.html" },
  "dgcl-141": { t: "8 Del. C. § 141 (board of directors)", kind: "Delaware law", topic: "Governance", status: "reference", note: "The board manages the corporation; removal of directors", url: "https://delcode.delaware.gov/title8/c001/sc04/index.html" },
  "dgcl-144": { t: "8 Del. C. § 144 (interested director and controller transactions, as amended 2025)", kind: "Delaware law", topic: "Governance", status: "reference", note: "Safe harbors for conflicted transactions", url: "https://delcode.delaware.gov/title8/c001/sc04/index.html" },
  "dgcl-151": { t: "8 Del. C. § 151 (classes and series of stock)", kind: "Delaware law", topic: "Financing", status: "reference", note: "Where preferences, conversion and voting rights of preferred stock come from", url: "https://delcode.delaware.gov/title8/c001/sc05/index.html" },
  "dgcl-157": { t: "8 Del. C. § 157 (rights and options)", kind: "Delaware law", topic: "Employee equity", status: "reference", note: "The board's power to issue options and warrants", url: "https://delcode.delaware.gov/title8/c001/sc05/index.html" },
  "dgcl-202": { t: "8 Del. C. § 202 (restrictions on transfer of securities)", kind: "Delaware law", topic: "Liquidity", status: "reference", note: "Rights of first refusal and consent requirements", url: "https://delcode.delaware.gov/title8/c001/sc06/index.html" },
  "dgcl-242": { t: "8 Del. C. § 242 (amending the certificate of incorporation)", kind: "Delaware law", topic: "Financing", status: "reference", note: "Class votes that protect preferred stock", url: "https://delcode.delaware.gov/title8/c001/sc08/index.html" },
  "dgcl-271": { t: "8 Del. C. § 271 (sale of all or substantially all assets)", kind: "Delaware law", topic: "Exit", status: "reference", note: "Board and stockholder approval of an asset sale", url: "https://delcode.delaware.gov/title8/c001/sc10/index.html" },
  "res-nvca": { t: "NVCA Model Legal Documents", kind: "Resource", topic: "Financing", status: "draft", note: "Term sheet, stock purchase agreement, charter, investors’ rights, voting and ROFR/co-sale agreements", url: "https://nvca.org/model-legal-documents/" },
  "res-yc-safe": { t: "Y Combinator SAFE documents", kind: "Resource", topic: "Financing", status: "draft", note: "The post-money SAFE, side letters and user guide", url: "https://www.ycombinator.com/documents" },
  "form-side-letter": { t: "Side letter (YC Pro Rata Side Letter)", kind: "Form", topic: "Financing", status: "draft", note: "Y Combinator’s standard side letter giving a SAFE holder pro rata rights; listed with the SAFE documents", url: "https://www.ycombinator.com/documents" },
  "form-note-ts": { t: "Convertible note term sheet (Cooley GO)", kind: "Form", topic: "Financing", status: "draft", note: "Free generator for a Series Seed convertible note term sheet", url: "https://www.cooleygo.com/convertible-note-term-sheet/" },
  "form-note": { t: "Convertible promissory note (Cooley GO Series Seed note package)", kind: "Form", topic: "Financing", status: "draft", note: "Term sheet, convertible promissory note, investor questionnaire and board consent", url: "https://www.cooleygo.com/documents/series-seed-notes-financing-package/" },
  "form-warrant": { t: "Warrant to purchase preferred stock (venture lender form)", kind: "Form", topic: "Financing", status: "draft", note: "A full lender warrant from a real deal: Guardant Health’s Series B Preferred warrant to Square 1 Bank (2014), filed with the SEC. Covers cash and net exercise, adjustments, treatment on an acquisition and transfer limits", url: "https://contracts.justia.com/companies/guardant-health-inc-4491/contract/290263" },
  "form-vd-ts": { t: "Venture debt term sheet", kind: "Form", topic: "Financing", status: "draft", note: "To be added", url: "" },
  "aba-512": { t: "ABA Formal Opinion 512 on generative AI tools (2024), as summarized in Business Law Today", kind: "Resource", topic: "Practice", status: "suggested", note: "Competence, confidentiality, supervision and fees when lawyers use AI", url: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-october/aba-ethics-opinion-generative-ai-offers-useful-framework/" },
  "res-cooley": { t: "Cooley GO", kind: "Resource", topic: "Formation", status: "draft", note: "Startup guides, explainers and free document generators", url: "https://www.cooleygo.com/" },
  "zero-to-one": { t: "Peter Thiel with Blake Masters, Zero to One", kind: "Book", topic: "Asset class", status: "draft", url: "https://www.penguinrandomhouse.com/books/234730/zero-to-one-by-peter-thiel-with-blake-masters/" },
  "venture-deals": { t: "Brad Feld and Jason Mendelson, Venture Deals, 4th edition", kind: "Book", topic: "Financing", status: "draft", url: "https://www.oreilly.com/library/view/venture-deals-4th/9781119594826/" },
  "kupor": { t: "Scott Kupor, Secrets of Sand Hill Road", kind: "Book", topic: "Asset class", status: "draft", url: "https://www.penguinrandomhouse.com/books/562394/secrets-of-sand-hill-road-by-scott-kupor/" },
  "irc-83": { t: "26 U.S.C. § 83 (property transferred for services; 83(b) election)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/83" },
  "irc-1202": { t: "26 U.S.C. § 1202 (qualified small business stock), as amended in 2025", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/1202" },
  "irc-1045": { t: "26 U.S.C. § 1045 (QSBS rollover)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/1045" },
  "irc-409a": { t: "26 U.S.C. § 409A (nonqualified deferred compensation)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/409A" },
  "regs-409a": { t: "Treas. Reg. § 1.409A-1 (stock rights and valuation)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/26/1.409A-1" },
  "irc-422": { t: "26 U.S.C. § 422 (incentive stock options)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/422" },
  "irc-1-h": { t: "26 U.S.C. § 1(h) (capital gains rates)", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/26/1" },
  "irs-tc409": { t: "IRS Topic No. 409, Capital Gains and Losses", kind: "Tax authority", topic: "Tax", status: "suggested", url: "https://www.irs.gov/taxtopics/tc409" },
  "reg-d-506": { t: "17 C.F.R. § 230.506 (Regulation D, Rule 506)", kind: "Securities rule", topic: "Securities", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/230.506" },
  "sec-4a2": { t: "Securities Act § 4(a)(2) and § 4(a)(7), 15 U.S.C. § 77d", kind: "Securities rule", topic: "Securities", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/15/77d" },
  "sec-4a7": { t: "Securities Act § 4(a)(7) resales, 15 U.S.C. § 77d", kind: "Securities rule", topic: "Liquidity", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/15/77d" },
  "rule-701": { t: "17 C.F.R. § 230.701 (compensatory equity offerings)", kind: "Securities rule", topic: "Securities", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/230.701" },
  "rule-144": { t: "17 C.F.R. § 230.144 (resales of restricted securities)", kind: "Securities rule", topic: "Liquidity", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/230.144" },
  "rule-13e4": { t: "17 C.F.R. § 240.13e-4 (issuer tender offers)", kind: "Securities rule", topic: "Liquidity", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/240.13e-4" },
  "reg-14e": { t: "17 C.F.R. § 240.14e-1 (Regulation 14E tender offer practices)", kind: "Securities rule", topic: "Liquidity", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/240.14e-1" },
  "form-s1": { t: "SEC Form S-1 (registration statement) instructions", kind: "Securities rule", topic: "Liquidity", status: "suggested", url: "https://www.sec.gov/files/forms-1.pdf" },
  "ica-3c1": { t: "Investment Company Act § 3(c)(1) and (c)(7), 15 U.S.C. § 80a-3", kind: "Securities rule", topic: "Funds", status: "suggested", url: "https://www.law.cornell.edu/uscode/text/15/80a-3" },
  "advisers-vc-exempt": { t: "17 C.F.R. § 275.203(l)-1 (venture capital fund adviser exemption)", kind: "Securities rule", topic: "Funds", status: "suggested", url: "https://www.law.cornell.edu/cfr/text/17/275.203(l)-1" },
  "pg-growth": { t: "Paul Graham, “Startup = Growth” (2012)", kind: "Essay", topic: "Ideas", status: "draft", url: "https://paulgraham.com/growth.html" },
  "pg-ds": { t: "Paul Graham, “Do Things That Don’t Scale” (2013)", kind: "Essay", topic: "Ideas", status: "draft", url: "https://paulgraham.com/ds.html" },
  "andreessen-software": { t: "Marc Andreessen, “Why Software Is Eating the World” (2011)", kind: "Essay", topic: "Ideas", status: "draft", url: "https://a16z.com/why-software-is-eating-the-world/" },
  "christensen": { t: "Clayton Christensen, The Innovator’s Dilemma (selections)", kind: "Book", topic: "Ideas", status: "draft", url: "" },
  "mazzucato": { t: "Mariana Mazzucato, The Entrepreneurial State (selections)", kind: "Book", topic: "Ideas", status: "draft", url: "" },
  "mallaby": { t: "Sebastian Mallaby, The Power Law: Venture Capital and the Making of the New Future (introduction)", kind: "Book", topic: "Ideas", status: "draft", url: "" },
  "venture-monitor": { t: "PitchBook-NVCA Venture Monitor (latest quarter)", kind: "Market data", topic: "Market", status: "suggested", url: "https://nvca.org/research/pitchbook-nvca-venture-monitor/" },
  "carta-data": { t: "Carta Data Desk", kind: "Market data", topic: "Market", status: "suggested", url: "https://carta.com/data/" },
};

/* Mostly Human AI. Facts follow the project handoff; every number is
   illustrative and not final. */
window.CASE = {
  intro: { title: "Meet Mostly Human AI", week: 1, body: "Mostly Human AI is a consumer AI agent company. Its product, Minion, handles everyday tasks such as bookings, shopping and scheduling. Is it venture-backable, and what would a venture investor need to believe?", people: ["Abigail, technical founder and CTO, who built Minion", "Bernard, charismatic CEO", "Charlie, pragmatic third founder and COO"] },
  formation: { title: "Formation and founder equity", week: 2, body: "Three founders incorporate in Delaware. Several additional people ask for equity. Students advise on entity choice, founder allocation, vesting, IP ownership, early grants, 83(b) elections and QSBS, and decide who deserves equity and on what terms." },
  safe: { title: "The SAFE seed round", week: 3, body: "The company raises on post-money SAFEs. Two investors ask for side letters. Students model conversion and dilution and advise on the special rights requested.", open: "Exact side-letter terms are not set. Candidates: pro rata rights, information rights, MFN." },
  seriesA: { title: "Series A: competing term sheets", week: 4, body: "Multiple investors deliver term sheets. Students compare valuation, control, preferences, investor rights and commercial tradeoffs across both NVCA document weeks." },
  dispute: { title: "The founder dispute", week: 6, body: "Abigail and Bernard disagree over strategy, control and the choice of lead investor; Charlie mediates. Governance may have to be resolved before the Series A can close. The board will have five seats: two founders, two investors, one independent." },
  departure: { title: "Founder departure", week: 8, body: "Charlie wants liquidity before leaving for another opportunity, and the company learns of the departure. Issues: vested and unvested equity, repurchase, ROFR, consent, disclosure, board rights and separation.", open: "Departure timing is flexible; Series B is the suggested moment." },
  seriesB: { title: "Series B and the secondary", week: 12, body: "The Series B includes a secondary. Students compare a negotiated secondary with a tender offer: eligibility, information and the securities rules that apply, without a full tender-offer drafting exercise." },
  debt: { title: "Venture debt and distress", week: 10, body: "Minion is popular, but inference costs and weak monetization make growth unsustainable. The company takes on venture debt with warrants and covenants, then faces low cash, lender pressure and a possible down round or insider bridge.", open: "Nomenclature for the later debt round needs settling, since Series C usually means preferred equity." },
  exit: { title: "The distressed exit", week: 11, body: "With about six weeks of runway, the board weighs an acquisition below the last valuation, an acqui-hire of the engineering team and IP, and a highly dilutive rescue. Students consider fiduciary duties, stakeholder incentives, the liquidation waterfall, the lender's position and a conflicted-director transaction that needs stockholder cleansing under current Delaware law.", open: "Facts are illustrative. The ending may stay unresolved so students advise the board." }
};

/* Series A term sheets for the comparator. Illustrative case facts. */
window.TERM_SHEETS = [
  { id: "a", name: "Investor 1: brand-name lead", pre: 48e6, inv: 12e6, pool: 0.12, pref: 1, participating: false, cap: 0, antidilution: "Broad-based weighted average", board: "2 common, 2 Series A, 1 independent", protective: "NVCA standard list", other: "Pro rata for Major Investors; no redemption" },
  { id: "b", name: "Investor 2: highest headline price", pre: 64e6, inv: 14e6, pool: 0.15, pref: 1.5, participating: true, cap: 3, antidilution: "Full ratchet for 18 months, then broad-based", board: "2 common, 2 Series A, 1 independent chosen by Series A", protective: "Expanded list including budget approval and hiring of officers", other: "Redemption at holder’s option after 5 years; super pro rata" },
  { id: "c", name: "Investor 3: insider-friendly", pre: 40e6, inv: 10e6, pool: 0.10, pref: 1, participating: false, cap: 0, antidilution: "Broad-based weighted average", board: "3 common, 1 Series A, 1 independent", protective: "NVCA standard list", other: "Founder secondary of $1.5M allowed at closing" }
];

window.EXERCISES = [
  { id: "ex-safe-letters", week: 3, title: "Two SAFE side letters", role: "Company counsel", prompt: "Two seed investors want side letters: one asks for pro rata rights in the next round and monthly financials, the other asks for an MFN and a board observer seat. Mark up each request, say which you would accept, and write a five-sentence email to the CEO explaining the cost of each.", issues: ["MFN scope and how it interacts with later SAFEs", "Pro rata in the next priced round versus all future rounds", "Observer rights: confidentiality, privilege carve-outs, competitor exclusion", "Precedent effect for later seed investors"] },
  { id: "ex-term-sheets", week: 4, title: "Three competing Series A term sheets", role: "Company counsel, then investor counsel", prompt: "Use the term sheet comparator. Rank the three offers for the founders, then for the common stock as a whole, at exits of $40M, $120M and $400M. Identify the two terms in Investor 2’s sheet you would spend negotiating capital on, and what you would trade.", issues: ["Headline price versus effective price after the pool shuffle", "Participating preference with cap: where conversion kicks in", "Full ratchet exposure in a down round", "Redemption right as a lender-like claim", "Board control shifting through the independent seat"] },
  { id: "ex-control", week: 5, title: "Control documents markup", role: "Investor counsel", prompt: "Using the NVCA Voting Agreement and ROFR/Co-Sale Agreement, draft the board composition and drag-along provisions for the chosen lead. Then read Moelis and § 122(18) and flag any provision that would be better placed in the charter.", issues: ["Drag-along conditions (minimum price, same consideration, limits on reps)", "Board designation mechanics and removal", "Stockholder agreement limits on board authority after Moelis and § 122(18)"] },
  { id: "ex-governance", week: 6, title: "The board meeting", role: "Company counsel", prompt: "Abigail and Bernard disagree over which lead to choose. Prepare the agenda and a one-page memo to the board on process: who you represent, what each director owes, and how to handle the conflict.", issues: ["Company counsel represents the company, not a founder", "Independent director’s role in a split board", "Records, minutes and consent mechanics"] },
  { id: "ex-departure", week: 8, title: "Charlie’s departure and secondary", role: "Company counsel", prompt: "Charlie wants to sell vested shares to the incoming Series B investor and leave. Advise the board on the ROFR, consent rights, repurchase of unvested shares, disclosure obligations and the tax result for Charlie.", issues: ["ROFR waiver versus exercise", "Repurchase price for unvested shares", "Information parity for a buyer and seller", "Tax and QSBS holding period effects"] },
  { id: "ex-bridge", week: 10, title: "The insider bridge", role: "Investor counsel, then counsel to the board", prompt: "Insiders offer a bridge note with a 2x liquidation multiple on conversion. Model it in the waterfall, then advise the board on process, given that two directors are designated by the bridge investors.", issues: ["Entire fairness exposure and Trados-style analysis", "Rights offering to all holders", "Special committee and stockholder cleansing", "Lender consent under the venture debt facility"] },
  { id: "ex-exit", week: 11, title: "Competing exit offers", role: "Counsel to the board", prompt: "Compare an asset sale, a stock sale below the last post-money and an acqui-hire. Use the waterfall to show who receives what under each, then draft a one-page board memo recommending a process.", issues: ["§ 271 versus merger approvals", "Who bears the deal’s indemnity and escrow", "Management carve-out plans", "Lender payoff and warrant treatment"] }
];

/* Guests. Bios are drawn from public sources and should be checked with each
   guest. Nobody is confirmed yet. */
window.GUESTS = [
  { name: "Ron Zori", photo: "https://cdn.prod.website-files.com/69ca9a18b40272cd4150f1b9/6a6b50d9ab329530891de262_Screenshot%202026-07-30%20at%209.22.47%E2%80%AFAM.png", org: "Lerer Hippeau", li: "https://www.linkedin.com/in/ron-zori-9b718681/", bio: "Venture partner at Lerer Hippeau, the New York seed firm, where he invests in fintech and consumer companies and builds the firm’s pipeline of Israeli and European startups. A former professional soccer player in Israel, he led revenue at Knotel and business development at Public, and has long been an angel investor." },
  { name: "Taylor Sargent", photo: "https://industrious.vc/wp-content/uploads/2026/01/Taylor-Sargent-1-1366x945.png", org: "Industrious Ventures", li: "https://www.linkedin.com/in/taylorcsargent/", bio: "Partner at Industrious Ventures, which leads early rounds in space, defense, robotics and deep tech. He was previously a lead scientist for satellite communications at NASA Goddard and a technical advisor managing about $130 million of DARPA investments." },
  { name: "Mason Angel", photo: "https://industrious.vc/wp-content/uploads/2026/01/Mason-Angel-1-1366x945.png", org: "Industrious Ventures", li: "", bio: "Founding partner of Industrious Ventures. He invests in commercial space, autonomous systems and technologies that support national defense and the industrial base, and is studying space resources at the Colorado School of Mines." },
  { name: "David Cohen", org: "Collaborative Fund", photo: "guests/david-cohen.jpg", li: "https://www.linkedin.com/in/dkcohen/", bio: "General partner and general counsel at Collaborative Fund, a New York consumer fund with over $2 billion under management. He was on the founding team of Reinvent Capital with Mark Pincus and Reid Hoffman, served as COO and chief legal officer of the family office Workplay Ventures, and helped Zynga with its turnaround. He studied at Middlebury and UVA Law." },
  { name: "Erick Rabin", org: "GCVC", photo: "guests/erick-rabin.jpg", li: "https://www.linkedin.com/in/erick-rabin-472a9921/", bio: "General partner at GCVC, a venture fund backed by general counsels that invests in legal, regulatory and compliance technology. He is also general counsel and chief compliance officer of Bilt, and began his career at Davis Polk & Wardwell." },
  { name: "Legal tech founder", org: "", li: "", placeholder: true, bio: "To be announced." },
  { name: "Megan Baier", with: "Jamie Anderson", org: "Wilson Sonsini", photo: "guests/megan-baier.jpg", li: "https://www.linkedin.com/in/megan-baier-3389368/", bio: "Co-CEO and chairwoman of Wilson Sonsini. Based in New York, she has led many IPOs and public offerings, advises public companies on governance, and works with venture-backed companies as they grow." },
  { name: "Jamie Anderson", with: "Megan Baier", org: "Midi Health", li: "https://www.linkedin.com/in/jamie-anderson-6018b930/", bio: "Chief legal officer of Midi Health. A healthcare lawyer for more than 20 years, she was previously chief legal officer of Virta Health, spent nearly a decade at DaVita, rising to associate general counsel, and began her career at Akin Gump. She studied at George Washington University and American University’s Washington College of Law." },
  { name: "Elliott Portnoy", photo: "guests/elliott-portnoy.jpg", org: "", li: "https://www.linkedin.com/in/elliottportnoy/", bio: "Founding global CEO of Dentons, which he built into the world’s largest law firm by headcount, leading it from its 2013 formation until 2024. Before that he chaired Sonnenschein and led SNR Denton." },
  { name: "Michelle Longmire", org: "Medable", li: "https://www.linkedin.com/in/michellelongmire/", photo: "https://milkeninstitute.org/sites/default/files/2024-01/Michelle%20Longmire%20OG%20Headshot.png", bio: "Co-founder and CEO of Medable, which builds technology for clinical trials that patients can join from home. A Stanford-trained physician-scientist, she has raised about $500 million in venture capital." },
  { name: "Jerry Colonna", org: "Reboot", maybe: true, li: "https://www.linkedin.com/in/jerry-colonna-reboot/", bio: "Co-founder and CEO of Reboot, the Boulder executive coaching firm, and author of Reboot and Reunion. He co-founded the venture firm Flatiron Partners and was a partner at J.P. Morgan Partners." }
];

/* The one-time Google Apps Script that builds the dinner sign-up form (also in dinners/setup-form.gs). */
window.DINNER_SCRIPT = "/**\n * VC Law dinners: one-time setup.\n *\n * In the \"VC Law Dinners\" sheet: Extensions > Apps Script, paste this whole\n * file over what is there, save, choose \"setup\" in the toolbar and press Run.\n * Google asks you to allow access once. After that you never touch it again.\n *\n * What it does:\n *  - creates the sign-up form: their name, then five dropdowns to rank dinners 1 to 5\n *  - links the form to this sheet, so answers land in a \"Form Responses\" tab\n *  - fills the choices from the Dinners tab, and refreshes them every time\n *    you edit that tab\n *  - writes the form's link into cell D2 of the Dinners tab\n * Running setup again is safe: it reuses the same form.\n */\nvar DINNERS_TAB = 'Dinners';\nvar CHOICES = ['1st choice', '2nd choice', '3rd choice', '4th choice', '5th choice'];\n\nfunction setup() {\n  var ss = SpreadsheetApp.getActive();\n  var form;\n  var url = ss.getFormUrl();\n  if (url) {\n    form = FormApp.openByUrl(url);\n  } else {\n    form = FormApp.create('VC Law dinners: sign up');\n    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());\n  }\n  form.setTitle('VC Law dinners: sign up');\n  form.setDescription('Put in your name, then rank the five dinners you would most like to attend, 1 being your favorite. Pick a different dinner in each box. Seats are assigned so that as many people as possible get one of their top choices. If you submit again, your latest answer counts.');\n  try { form.setRequireLogin(false); } catch (e) {}   // let students outside your organization answer\n  form.setCollectEmail(false);\n\n  // Build the questions: name, then 1st to 5th choice. Rebuilt if they don't match.\n  var titles = form.getItems().map(function (it) { return it.getTitle(); });\n  var want = ['Your name'].concat(CHOICES);\n  if (titles.join('|') !== want.join('|')) {\n    form.getItems().forEach(function (it) { form.deleteItem(it); });\n    form.addTextItem().setTitle('Your name').setRequired(true);\n    CHOICES.forEach(function (t) { form.addListItem().setTitle(t).setRequired(true); });\n  }\n  refreshChoices();\n\n  // Keep the choices in step with the Dinners tab.\n  ScriptApp.getProjectTriggers().forEach(function (t) { ScriptApp.deleteTrigger(t); });\n  ScriptApp.newTrigger('refreshChoices').forSpreadsheet(ss).onEdit().create();\n  ScriptApp.newTrigger('refreshChoices').forSpreadsheet(ss).onChange().create();\n\n  ss.getSheetByName(DINNERS_TAB).getRange('D2').setValue(form.getPublishedUrl());\n  SpreadsheetApp.getUi().alert('Done. The form link is in cell D2 of the Dinners tab, and the course site will show it to students.');\n}\n\nfunction refreshChoices() {\n  var ss = SpreadsheetApp.getActive();\n  var url = ss.getFormUrl();\n  if (!url) return;\n  var sh = ss.getSheetByName(DINNERS_TAB);\n  var last = sh.getLastRow();\n  if (last \u003c 2) return;\n  var names = sh.getRange(2, 1, last - 1, 1).getValues()\n    .map(function (r) { return String(r[0]).trim(); })\n    .filter(function (n, i, a) { return n && a.indexOf(n) === i; });\n  if (!names.length) return;\n  var form = FormApp.openByUrl(url);\n  form.getItems(FormApp.ItemType.LIST).forEach(function (item) {\n    var list = item.asListItem();\n    if (CHOICES.indexOf(list.getTitle()) >= 0) list.setChoiceValues(names);\n  });\n}\n";

/* Dinners as students see them on the sign-up page. The key must match the
   Guest column in the Google Sheet's Dinners tab exactly. */
window.DINNER_INFO = {
  "Ron Zori": { org: "Lerer Hippeau", blurb: "Investor and operator in fintech, robotics, defense and other industries." },
  "Taylor Sargent and Mason Angel": { org: "Industrious Ventures", blurb: "Two defense and space investors. Taylor was a NASA scientist and managed DARPA investments; Mason founded the fund." },
  "David Cohen": { org: "Collaborative Fund", blurb: "General partner and general counsel at Collaborative Fund, a New York consumer fund with over $2 billion under management." },
  "Erick Rabin": { org: "GCVC and Bilt", blurb: "General partner at GCVC, a fund backed by general counsels, and general counsel of Bilt, a $10 billion fintech." },
  "Megan Baier and Jamie Anderson": { org: "Wilson Sonsini and Midi Health", blurb: "Megan is co-CEO and chairwoman of Wilson Sonsini, the leading Silicon Valley law firm for startups and venture capital. Jamie is chief legal officer of Midi Health and has been a healthcare lawyer for more than 20 years." },
  "Elliott Portnoy": { org: "Dentons", blurb: "Founding global CEO of Dentons, which he built into the world’s largest law firm by headcount." },
  "Michelle Longmire": { org: "Medable", blurb: "CEO and co-founder of Medable, which runs clinical trials patients can join from home. She has raised about $500 million in venture capital." },
  // Not confirmed yet; add to dinners.json too if he says yes.
  "Jerry Colonna": { org: "Reboot", blurb: "Executive coach to founders and VCs, author of Reboot, and co-founder of the venture firm Flatiron Partners." }
};
