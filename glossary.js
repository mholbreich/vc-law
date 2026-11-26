/* Plain-English glossary. Terms are underlined on first use on each page. */
window.GLOSSARY = {
  "SAFE": "Simple Agreement for Future Equity. An investor pays now and gets shares later, usually when the company raises a priced round. It isn't debt and has no interest or maturity date.",
  "post-money SAFE": "A SAFE whose cap fixes the investor's percentage of the company just before the next round, counting all SAFEs. The founders bear the dilution from every SAFE.",
  "pre-money SAFE": "An older SAFE form whose cap is measured before any SAFEs convert, so SAFE holders dilute each other as well as the founders.",
  "valuation cap": "The highest company valuation at which a SAFE or note converts. A lower cap means more shares for the investor.",
  "discount": "A SAFE or note term that lets the investor convert at a percentage below the price new investors pay.",
  "MFN": "Most favored nation. If the company later gives another investor better terms, the MFN holder can take them too.",
  "pro rata": "The right to invest in future rounds to keep your percentage ownership from shrinking.",
  "pre-money": "The company's value before the new investment. Pre-money plus the new money equals post-money.",
  "post-money": "The company's value right after the new investment comes in.",
  "fully diluted": "Counting every share as if all options, warrants and convertible securities had become stock.",
  "option pool": "Shares set aside for future grants to employees, advisors and directors.",
  "pool shuffle": "Making the option pool bigger inside the pre-money valuation, so existing holders, not the new investor, pay for it. It lowers the real price per share.",
  "liquidation preference": "The amount preferred stock gets back in a sale before common stock gets anything, usually 1x the money invested.",
  "participating preferred": "Preferred stock that gets its preference back and then also shares in what's left alongside the common. Sometimes called double-dipping.",
  "conversion": "Preferred stock switching into common stock, usually because a share of common would be worth more than the preference.",
  "anti-dilution": "Protection that lowers an investor's conversion price if the company later sells shares more cheaply.",
  "full ratchet": "The harshest anti-dilution: the investor's price drops all the way to the new, lower price, no matter how few shares are sold.",
  "broad-based weighted average": "The market-standard anti-dilution formula. The price adjusts partway, depending on how much stock is sold at the lower price.",
  "down round": "A financing at a lower price per share than the last round.",
  "protective provisions": "Decisions the company can't make without the preferred stock's approval, such as selling the company or creating a senior class.",
  "drag-along": "A clause that lets a group of holders force everyone else to approve and join a sale of the company.",
  "ROFR": "Right of first refusal. Before a stockholder sells to an outsider, the company (and sometimes investors) can buy the shares on the same terms.",
  "co-sale": "The right to sell alongside a founder who sells shares, on the same terms.",
  "Major Investor": "An investor holding enough shares to get extra rights, such as information and pro rata rights, under the Investors' Rights Agreement.",
  "information rights": "The right to receive the company's financial statements and budget.",
  "registration rights": "The right to make the company register your shares with the SEC so you can sell them publicly.",
  "lock-up": "An agreement not to sell shares for a period, usually about 180 days, after an IPO.",
  "vesting": "Earning stock or options over time. Unvested shares can be bought back, or unvested options lost, if the person leaves.",
  "cliff": "A waiting period, usually one year, before any vesting happens. At the cliff a full year's worth vests at once.",
  "acceleration": "Vesting that speeds up, usually on a sale of the company (single trigger) or on a sale plus being let go (double trigger).",
  "83(b)": "A tax election to be taxed on restricted stock when you get it, rather than as it vests. It must be filed within 30 days, with no extensions.",
  "409A": "The tax rule, and the independent valuation, that sets the fair market value of common stock. Options must be priced at or above it.",
  "strike price": "The price per share an option holder pays to buy the stock. Also called the exercise price.",
  "ISO": "Incentive stock option. Can get better tax treatment than an ordinary option, but only for employees, with limits, and with alternative minimum tax risk.",
  "NSO": "Nonqualified stock option. The difference between the stock's value and the strike is taxed as ordinary income when exercised.",
  "AMT": "Alternative minimum tax. A parallel tax calculation that can catch the paper gain on exercising ISOs.",
  "early exercise": "Buying option shares before they vest, so they become restricted stock and an 83(b) election can start the tax clocks sooner.",
  "QSBS": "Qualified small business stock under Section 1202. Gain on qualifying startup stock can be partly or fully excluded from federal tax if held long enough.",
  "secondary": "A sale of existing shares by a stockholder, rather than new shares sold by the company. The company gets no money.",
  "tender offer": "An offer to buy shares from many holders at once on the same terms. Tender offer rules require it to stay open at least 20 business days.",
  "continuation fund": "A new vehicle, run by the same VC firm, that buys a stake from the firm's older fund so its investors can cash out.",
  "DPI": "Distributions to paid-in capital. How much cash a fund has actually returned, per dollar its investors put in.",
  "MOIC": "Multiple on invested capital. Total value divided by the money invested.",
  "IRR": "Internal rate of return. Investment return adjusted for how long the money was tied up.",
  "carried interest": "The VC firm's share of a fund's profits, usually 20%.",
  "management fee": "The annual fee a VC firm charges its fund, often about 2% of committed capital.",
  "power law": "The pattern in venture where a few investments produce almost all the returns.",
  "venture debt": "Loans to venture-backed startups, usually with warrants and covenants, often taken alongside an equity round.",
  "warrant": "A right to buy shares at a set price, often given to lenders.",
  "covenant": "A promise in a loan agreement, like keeping a minimum cash balance. Breaking it can be a default.",
  "acqui-hire": "An acquisition mainly to hire the team. The price for the company is often low, and much of the value goes to employees as new pay.",
  "waterfall": "The order in which sale proceeds are paid: debt, then preferred preferences, then common.",
  "fiduciary duty": "A director's legal duties of care and loyalty to the company and its stockholders.",
  "side letter": "A separate agreement giving one investor extra rights beyond the main documents.",
  "term sheet": "A short, mostly non-binding summary of a financing's key terms, signed before the full documents are drafted."
};

/* Where each term comes from: Library ids. The first one is where a click goes. */
window.GLOSSARY_LAW = {
"SAFE": [
"res-yc-safe"
],
"post-money SAFE": [
"res-yc-safe"
],
"pre-money SAFE": [
"res-yc-safe"
],
"valuation cap": [
"res-yc-safe"
],
"discount": [
"res-yc-safe"
],
"MFN": [
"res-yc-safe"
],
"pro rata": [
"form-side-letter",
"res-nvca"
],
"pre-money": [
"res-nvca"
],
"post-money": [
"res-nvca"
],
"fully diluted": [
"res-nvca"
],
"option pool": [
"dgcl-157",
"res-nvca"
],
"pool shuffle": [
"res-nvca"
],
"liquidation preference": [
"dgcl-151",
"res-nvca"
],
"participating preferred": [
"dgcl-151",
"res-nvca"
],
"conversion": [
"dgcl-151",
"res-nvca"
],
"anti-dilution": [
"dgcl-151",
"res-nvca"
],
"full ratchet": [
"dgcl-151",
"res-nvca"
],
"broad-based weighted average": [
"dgcl-151",
"res-nvca"
],
"down round": [
"dgcl-151",
"res-nvca"
],
"protective provisions": [
"dgcl-242",
"dgcl-151",
"res-nvca"
],
"drag-along": [
"dgcl-122",
"res-nvca"
],
"ROFR": [
"dgcl-202",
"res-nvca"
],
"co-sale": [
"res-nvca"
],
"Major Investor": [
"res-nvca"
],
"information rights": [
"res-nvca"
],
"registration rights": [
"res-nvca",
"form-s1"
],
"lock-up": [
"rule-144",
"res-nvca"
],
"vesting": [
"irc-83"
],
"cliff": [
"irc-83"
],
"acceleration": [
"irc-83"
],
"83(b)": [
"irc-83"
],
"409A": [
"irc-409a",
"regs-409a"
],
"strike price": [
"regs-409a",
"dgcl-157"
],
"ISO": [
"irc-422"
],
"NSO": [
"irc-83"
],
"AMT": [
"irc-422"
],
"early exercise": [
"irc-83"
],
"QSBS": [
"irc-1202",
"irc-1045"
],
"secondary": [
"sec-4a7",
"rule-144",
"dgcl-202"
],
"tender offer": [
"reg-14e",
"rule-13e4"
],
"continuation fund": [
"ica-3c1"
],
"DPI": [
"kupor"
],
"MOIC": [
"kupor"
],
"IRR": [
"kupor"
],
"carried interest": [
"kupor"
],
"management fee": [
"kupor"
],
"power law": [
"mallaby"
],
"venture debt": [
"form-warrant"
],
"warrant": [
"form-warrant",
"dgcl-157"
],
"covenant": [
"form-warrant"
],
"acqui-hire": [
"dgcl-271"
],
"waterfall": [
"dgcl-151",
"res-nvca"
],
"fiduciary duty": [
"dgcl-141",
"dgcl-144"
],
"side letter": [
"form-side-letter"
],
"term sheet": [
"res-nvca"
]
};
