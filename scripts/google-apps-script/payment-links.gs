/**
 * New Adam: email a payment link after each Google Form registration.
 *
 * Lives in the registrations (form responses) sheet: Extensions → Apps Script.
 * Setup steps are in scripts/google-apps-script/README.md.
 *
 * On each form submission it asks the website for a payment link (the site
 * works out the price, locked to the moment they registered), writes
 * "Amount due" and "Payment link" on their row, and emails them the link.
 */

const CONFIG = {
  // One copy of this script per event's sheet: change these for the next event.
  endpoint: "https://salarystructure.newadam.co/api/events/salarystructure/payment-link",
  eventName: "The Salary Structure Workshop",
  eventWhen: "October 22–23, Mallberry Suites, Cagayan de Oro",
  secretariat: "Mary Joy Dulangon, +63 976 437 2504 (call, text or Viber)",

  // Column headers in the responses sheet.
  columns: {
    timestamp: "Timestamp",
    name: "Name",
    email: "Email Address",
    seats: "Number of Participants in a Group", // blank = 1 person
    status: "Remarks",
    amount: "Amount due", // added by setup()
    link: "Payment link", // added by setup()
  },
  // Rows whose status contains one of these don't get a link.
  skipStatuses: ["cancelled", "canceled", "refunded", "withdrawn"],
};

/** Run once from the editor: adds the two columns and the form-submit trigger. */
function setup() {
  const sheet = responsesSheet_();
  [CONFIG.columns.amount, CONFIG.columns.link].forEach((header) => {
    if (columnIndex_(sheet, header) === -1) sheet.getRange(1, sheet.getLastColumn() + 1).setValue(header);
  });
  const exists = ScriptApp.getProjectTriggers().some((t) => t.getHandlerFunction() === "onFormSubmit");
  if (!exists) ScriptApp.newTrigger("onFormSubmit").forSpreadsheet(SpreadsheetApp.getActive()).onFormSubmit().create();
  if (!secret_()) throw new Error("Add PAYMENT_LINK_SECRET under Project Settings → Script properties, then run setup again.");
  Logger.log("Ready. New registrations will get a payment link by email.");
}

/** Trigger: a new form response came in. */
function onFormSubmit(e) {
  processRow_(e.range.getSheet(), e.range.getRow(), { sendEmail: true });
}

/** Sheet menu for the secretariat. */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("New Adam")
    .addItem("Email payment link to selected row", "emailSelectedRow")
    .addItem("Fill in missing payment links (no emails)", "fillMissingLinks")
    .addToUi();
}

/** (Re)sends the link to the registration on the selected row. */
function emailSelectedRow() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const row = sheet.getActiveRange().getRow();
  if (row < 2) return SpreadsheetApp.getUi().alert("Select a registration row first.");
  const result = processRow_(sheet, row, { sendEmail: true, force: true });
  SpreadsheetApp.getUi().alert(result);
}

/** Adds links for earlier registrations without emailing anyone. */
function fillMissingLinks() {
  const sheet = responsesSheet_();
  const linkCol = columnIndex_(sheet, CONFIG.columns.link);
  let filled = 0;
  for (let row = 2; row <= sheet.getLastRow(); row++) {
    if (linkCol !== -1 && sheet.getRange(row, linkCol + 1).getValue()) continue;
    if (processRow_(sheet, row, { sendEmail: false }).startsWith("Link ready")) filled++;
  }
  SpreadsheetApp.getUi().alert(`Added ${filled} payment link(s). No emails were sent.`);
}

/* ---------- internals ---------- */

function processRow_(sheet, row, { sendEmail, force = false }) {
  const c = CONFIG.columns;
  const get = (header) => {
    const i = columnIndex_(sheet, header);
    return i === -1 ? "" : sheet.getRange(row, i + 1).getValue();
  };
  const set = (header, value) => {
    const i = columnIndex_(sheet, header);
    if (i !== -1) sheet.getRange(row, i + 1).setValue(value);
  };

  const name = String(get(c.name)).trim();
  const email = String(get(c.email)).trim();
  if (!name) return "Skipped: no name on this row.";
  const status = String(get(c.status)).toLowerCase();
  if (CONFIG.skipStatuses.some((word) => status.includes(word))) return "Skipped: marked " + status + ".";
  if (!force && get(c.link)) return "Skipped: already has a link.";

  // Blank means one person; otherwise it must be a number.
  const raw = String(get(c.seats)).trim();
  const seats = raw === "" ? 1 : Number((raw.match(/^\d+/) || [""])[0]);
  if (!seats) {
    set(c.amount, `Check seats: "${raw}"`);
    return `Check seats: "${raw}" isn't a number. Fix it, then use the menu to email the link.`;
  }

  const stamp = get(c.timestamp);
  const registeredAt = stamp instanceof Date ? stamp.getTime() : Date.now();

  const res = UrlFetchApp.fetch(CONFIG.endpoint, {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + secret_() },
    payload: JSON.stringify({ seats, registeredAt, ref: "row" + row }),
    muteHttpExceptions: true,
  });
  const data = JSON.parse(res.getContentText() || "{}");
  if (res.getResponseCode() !== 200 || !data.url) {
    set(c.amount, "Link error: " + (data.error || res.getResponseCode()));
    return "Link error: " + (data.error || res.getResponseCode());
  }

  set(c.amount, `${data.totalLabel} (${seats} × ₱${data.perSeat.toLocaleString("en-PH")}, ${data.tier})`);
  set(c.link, data.url);

  if (sendEmail && email) {
    MailApp.sendEmail({ to: email, subject: `Your payment link · ${CONFIG.eventName}`, name: "New Adam", ...emailBody_(name, seats, data) });
    return "Link ready and emailed to " + email + ".";
  }
  return sendEmail ? "Link ready, but there's no email address on this row." : "Link ready.";
}

function emailBody_(name, seats, data) {
  const first = name.split(/\s+/)[0];
  const seatsText = seats === 1 ? "1 seat" : `${seats} seats`;
  const lines = [
    `Hi ${first},`,
    `Thank you for registering for ${CONFIG.eventName} (${CONFIG.eventWhen}).`,
    `Amount due for ${seatsText}: ${data.totalLabel} (${data.tier}).`,
    `Pay online by online banking (BPI, UnionBank) or QR Ph from GCash, Maya and 30+ banks:`,
    data.url,
    `Your receipt arrives by email as soon as you pay, and our secretariat will confirm your seat.`,
    `Paying by company PO, bank transfer or check? Just reply or contact ${CONFIG.secretariat}.`,
    `See you there,\nNew Adam`,
  ];
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#18243a;max-width:520px">
      <p>Hi ${escape_(first)},</p>
      <p>Thank you for registering for <b>${escape_(CONFIG.eventName)}</b> (${escape_(CONFIG.eventWhen)}).</p>
      <p style="font-size:18px;margin:20px 0 6px"><b>Amount due: ${escape_(data.totalLabel)}</b></p>
      <p style="margin:0;color:#526078">${seatsText} · ${escape_(data.tier)}</p>
      <p style="margin:24px 0">
        <a href="${data.url}" style="background:#2454d6;color:#fff;text-decoration:none;padding:12px 22px;border-radius:99px;font-weight:bold">Pay ${escape_(data.totalLabel)} online</a>
      </p>
      <p>Online banking (BPI, UnionBank) or QR Ph from GCash, Maya and 30+ banks. Your receipt arrives by email as soon as you pay, and our secretariat will confirm your seat.</p>
      <p style="color:#526078">Paying by company PO, bank transfer or check? Just reply or contact ${escape_(CONFIG.secretariat)}.</p>
      <p>See you there,<br>New Adam</p>
    </div>`;
  return { body: lines.join("\n\n"), htmlBody: html };
}

function responsesSheet_() {
  // The sheet the form writes to (the first one, unless the form says otherwise).
  const ss = SpreadsheetApp.getActive();
  return ss.getSheets().find((s) => s.getFormUrl()) || ss.getSheets()[0];
}

function columnIndex_(sheet, header) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const want = header.trim().toLowerCase();
  return headers.findIndex((h) => String(h).trim().toLowerCase() === want);
}

function secret_() {
  return PropertiesService.getScriptProperties().getProperty("PAYMENT_LINK_SECRET") || "";
}

function escape_(text) {
  return String(text).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
}
