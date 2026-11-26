/**
 * VC Law dinners: sign-ups on the course site, matching in this sheet.
 *
 * One-time setup (about three minutes):
 *  1. In the "VC Law Dinners" sheet: Extensions > Apps Script. Delete what's
 *     there, paste this whole file, and save.
 *  2. Choose "setup" in the toolbar and press Run. Allow access when Google asks.
 *  3. Deploy > New deployment > type "Web app". Execute as: Me.
 *     Who has access: Anyone. Press Deploy and copy the web app URL.
 *  4. Send that URL to Claude (or paste it into the course site's settings).
 *
 * After that, everything happens from the "Dinners" menu in this sheet:
 *  - Open sign-ups / Close sign-ups
 *  - Run the matching: fills the Assignments tab (you can edit it by hand after)
 *  - Email everyone their dinner
 *
 * Tabs:
 *  Dinners      Guest | Date | Seats   (one row per dinner; edit freely)
 *  Picks        filled by the site: Time | Name | Email | 1st ... 5th
 *  Assignments  filled by "Run the matching": Name | Email | Dinner | Choice
 */
var MAX_PICKS = 5;
// The dinner list lives on the course site. The Dinners tab is refreshed from it,
// so add or remove guests by updating the site (ask Claude), not the tab.
var LIST_URL = 'https://mholbreich.github.io/vc-law/dinners.json';

function syncDinners_(force) {
  var cache = CacheService.getScriptCache();
  if (!force && cache.get('synced')) return;
  try {
    var r = UrlFetchApp.fetch(LIST_URL + '?t=' + Date.now(), { muteHttpExceptions: true });
    if (r.getResponseCode() !== 200) return;
    var list = (JSON.parse(r.getContentText()).dinners || []).filter(function (x) { return x && x.guest; });
    if (!list.length) return;
    var d = SpreadsheetApp.getActive().getSheetByName('Dinners');
    var last = d.getLastRow();
    if (last > 1) d.getRange(2, 1, last - 1, 3).clearContent();
    d.getRange(2, 1, list.length, 3).setValues(list.map(function (x) { return [x.guest, x.date || '', Number(x.seats) || 6]; }));
    cache.put('synced', '1', 300);
  } catch (e) {}
}
function refreshFromSite() { syncDinners_(true); SpreadsheetApp.getUi().alert('The Dinners tab now matches the course site.'); }

function setup() {
  var ss = SpreadsheetApp.getActive();
  var d = ss.getSheetByName('Dinners') || ss.insertSheet('Dinners');
  var head = d.getRange(1, 1, 1, 3).getValues()[0];
  if (String(head[0]) !== 'Guest' || String(head[1]) !== 'Date' || String(head[2]) !== 'Seats') {
    // Keep any guests already listed in column A, and their seats from the old layout.
    var last = d.getLastRow(), old = last > 1 ? d.getRange(2, 1, last - 1, 2).getValues() : [];
    d.clear();
    d.getRange(1, 1, 1, 3).setValues([['Guest', 'Date', 'Seats']]).setFontWeight('bold');
    var rows = old.filter(function (r) { return String(r[0]).trim(); })
      .map(function (r) { return [r[0], '', Number(r[1]) || 6]; });
    if (!rows.length) rows = ['Ron Zori', 'Taylor Sargent', 'Mason Angel', 'David Cohen', 'Erick Rabin', 'Megan Baier', 'Jamie Anderson', 'Elliott Portnoy', 'Michelle Longmire', 'Jerry Colonna']
      .map(function (g) { return [g, '', 6]; });
    d.getRange(2, 1, rows.length, 3).setValues(rows);
    d.setFrozenRows(1);
  }
  var p = ss.getSheetByName('Picks') || ss.insertSheet('Picks');
  if (!p.getRange(1, 1).getValue()) {
    p.getRange(1, 1, 1, 3 + MAX_PICKS).setValues([['Time', 'Name', 'Email', '1st', '2nd', '3rd', '4th', '5th']]).setFontWeight('bold');
    p.setFrozenRows(1);
  }
  var a = ss.getSheetByName('Assignments') || ss.insertSheet('Assignments');
  if (!a.getRange(1, 1).getValue()) {
    a.getRange(1, 1, 1, 4).setValues([['Name', 'Email', 'Dinner', 'Choice']]).setFontWeight('bold');
    a.setFrozenRows(1);
  }
  PropertiesService.getScriptProperties().setProperty('status', 'open');
  syncDinners_(true);
  ss.toast('Done. Now deploy it as a web app: Deploy > New deployment > Web app, Execute as Me, access Anyone.', 'VC Law dinners', 15);
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Dinners')
    .addItem('Open sign-ups', 'openSignups')
    .addItem('Close sign-ups', 'closeSignups')
    .addSeparator()
    .addItem('Refresh the dinner list from the site', 'refreshFromSite')
    .addItem('Run the matching', 'runMatching')
    .addItem('Email everyone their dinner', 'emailEveryone')
    .addToUi();
}
function openSignups() { setStatus_('open'); }
function closeSignups() { setStatus_('closed'); }
function setStatus_(s) {
  PropertiesService.getScriptProperties().setProperty('status', s);
  SpreadsheetApp.getUi().alert('Sign-ups are now ' + s + '.');
}

function dinners_() {
  var d = SpreadsheetApp.getActive().getSheetByName('Dinners');
  var last = d.getLastRow(); if (last < 2) return [];
  return d.getRange(2, 1, last - 1, 3).getValues()
    .filter(function (r) { return String(r[0]).trim(); })
    .map(function (r) {
      var date = r[1] instanceof Date ? Utilities.formatDate(r[1], Session.getScriptTimeZone(), 'EEE, MMM d') : String(r[1] || '');
      return { guest: String(r[0]).trim(), date: date, seats: Number(r[2]) || 6 };
    });
}
function picks_() {
  var p = SpreadsheetApp.getActive().getSheetByName('Picks');
  var last = p.getLastRow(); if (last < 2) return [];
  var byEmail = {};
  p.getRange(2, 1, last - 1, 3 + MAX_PICKS).getValues().forEach(function (r) {
    var email = String(r[2]).trim().toLowerCase(); if (!email) return;
    byEmail[email] = { name: String(r[1]).trim(), email: email, ranks: r.slice(3).map(String).filter(function (x) { return x.trim(); }) };
  });
  return Object.keys(byEmail).map(function (k) { return byEmail[k]; });
}
function json_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

/* The site reads the dinners and whether sign-ups are open. */
function doGet() {
  syncDinners_(false);
  var status = PropertiesService.getScriptProperties().getProperty('status') || 'open';
  var counts = {};
  picks_().forEach(function (s) { if (s.ranks[0]) counts[s.ranks[0]] = (counts[s.ranks[0]] || 0) + 1; });
  return json_({ status: status, dinners: dinners_(), firstChoiceCounts: counts });
}

/* The site sends { name, email, ranks: [guest, ...] }. A new submission replaces the old one. */
function doPost(e) {
  var lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    var status = PropertiesService.getScriptProperties().getProperty('status') || 'open';
    if (status !== 'open') return json_({ ok: false, error: 'closed' });
    var b = JSON.parse(e.postData.contents || '{}');
    var name = String(b.name || '').trim().slice(0, 80), email = String(b.email || '').trim().toLowerCase().slice(0, 120);
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json_({ ok: false, error: 'name_email' });
    var valid = dinners_().map(function (d) { return d.guest; });
    var ranks = (b.ranks || []).map(String).filter(function (g, i, a) { return valid.indexOf(g) >= 0 && a.indexOf(g) === i; }).slice(0, MAX_PICKS);
    if (!ranks.length) return json_({ ok: false, error: 'no_picks' });
    var p = SpreadsheetApp.getActive().getSheetByName('Picks');
    var row = [new Date(), name, email].concat(ranks); while (row.length < 3 + MAX_PICKS) row.push('');
    // Replace an earlier submission from the same email.
    var last = p.getLastRow(), at = -1;
    if (last > 1) p.getRange(2, 3, last - 1, 1).getValues().forEach(function (r, i) { if (String(r[0]).trim().toLowerCase() === email) at = i + 2; });
    if (at > 0) p.getRange(at, 1, 1, row.length).setValues([row]); else p.appendRow(row);
    try {
      MailApp.sendEmail(email, 'Your VC Law dinner picks',
        'Hi ' + name + ',\n\nThanks for signing up. Your picks, in order:\n\n' +
        ranks.map(function (g, i) { return (i + 1) + '. Dinner with ' + g; }).join('\n') +
        '\n\nYou can change them on the course site until sign-ups close. We will email you your dinner after that.\n');
    } catch (err) {}
    return json_({ ok: true, ranks: ranks, replaced: at > 0 });
  } finally { lock.releaseLock(); }
}

/* Matching: first choices first. When a dinner has more first choices than seats,
   a random draw decides. Then second choices for everyone still without a seat,
   and so on. Anyone left over goes to the dinner with the most open seats. */
function runMatching() {
  syncDinners_(true);
  var ds = dinners_(), ps = picks_();
  var left = {}; ds.forEach(function (d) { left[d.guest] = d.seats; });
  var placed = {}, out = [];
  // Shuffle once so every tie is broken by the same random order.
  for (var i = ps.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = ps[i]; ps[i] = ps[j]; ps[j] = t; }
  for (var r = 0; r < MAX_PICKS; r++) {
    ps.forEach(function (s) {
      if (placed[s.email]) return;
      var g = s.ranks[r];
      if (g && left[g] > 0) { left[g]--; placed[s.email] = true; out.push([s.name, s.email, g, r + 1]); }
    });
  }
  ps.forEach(function (s) {
    if (placed[s.email]) return;
    var best = ds.slice().sort(function (a, b) { return left[b.guest] - left[a.guest]; })[0];
    if (best && left[best.guest] > 0) { left[best.guest]--; out.push([s.name, s.email, best.guest, 'not ranked']); }
    else out.push([s.name, s.email, '(no seat left)', '']);
  });
  var a = SpreadsheetApp.getActive().getSheetByName('Assignments');
  a.clear(); a.getRange(1, 1, 1, 4).setValues([['Name', 'Email', 'Dinner', 'Choice']]).setFontWeight('bold');
  out.sort(function (x, y) { return String(x[2]).localeCompare(String(y[2])) || String(x[0]).localeCompare(String(y[0])); });
  if (out.length) a.getRange(2, 1, out.length, 4).setValues(out);
  var firsts = out.filter(function (o) { return o[3] === 1; }).length;
  SpreadsheetApp.getUi().alert('Matched ' + out.length + ' students. ' + firsts + ' got their first choice. Check the Assignments tab; you can edit it before emailing.');
}

function emailEveryone() {
  var ui = SpreadsheetApp.getUi();
  if (ui.alert('Email every student their dinner now?', ui.ButtonSet.YES_NO) !== ui.Button.YES) return;
  var a = SpreadsheetApp.getActive().getSheetByName('Assignments');
  var last = a.getLastRow(); if (last < 2) { ui.alert('Run the matching first.'); return; }
  var ds = {}; dinners_().forEach(function (d) { ds[d.guest] = d; });
  var sent = 0;
  a.getRange(2, 1, last - 1, 3).getValues().forEach(function (r) {
    var d = ds[r[2]]; if (!d || !r[1]) return;
    MailApp.sendEmail(String(r[1]), 'Your VC Law dinner: ' + d.guest,
      'Hi ' + r[0] + ',\n\nYou have a seat at the dinner with ' + d.guest + (d.date ? ' on ' + d.date : '') +
      ', right after class.\n\nIf you can no longer make it, please reply to this email so someone else can have your seat.\n');
    sent++;
  });
  ui.alert('Sent ' + sent + ' emails.');
}
