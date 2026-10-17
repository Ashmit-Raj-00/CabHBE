/**
 * CABHBE-26 — saves website registrations into this Google Sheet and emails registrants.
 *
 * What it does:
 *   - Each registration becomes a row in the "Registrations" tab with an ID like CABHBE26-0001.
 *     A payment screenshot/PDF, if attached, is saved to the "Payment Proofs" folder in Drive,
 *     and an abstract PDF to the "Abstracts" folder.
 *   - The registrant gets a confirmation email, and the committee gets a copy of each registration.
 *   - Setting Payment Status to VERIFIED or REJECTED emails the registrant straight away.
 *   - Every night an Excel (.xlsx) copy of the sheet is saved to the "Backups" folder in Drive.
 *
 * Emails are sent from the Google account that deploys this script.
 *
 * One-time setup (full steps in web/README.md → "Registrations"):
 *   1. In the Google Sheet: Extensions → Apps Script. Replace everything there with this file. Save.
 *   2. Pick `setup` in the toolbar's function list → Run → allow access.
 *   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
 *   4. Copy the Web app URL (ends in /exec) into `registrationSheetUrl` in
 *      web/src/content/settings.ts, then rebuild and publish the website.
 *
 * After changing this file: Deploy → Manage deployments → Edit (pencil) → Version: "New version"
 * → Deploy. The URL stays the same.
 */

const SETTINGS = {
  conference: "CABHBE-26",
  conferenceFullName:
    "2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research",
  // Registrants reply to this address, and it receives a copy of each new registration.
  committeeEmail: "conferencebiotech@giet.edu",
  // The website, without a slash at the end — same as `siteUrl` in web/src/content/settings.ts.
  website: "https://cabhbe2026.vercel.app",
  idPrefix: "CABHBE26",
  notifyCommittee: true,
  // true also emails the nightly Excel backup to the committee.
  emailDailyBackup: false,
  backupsToKeep: 30,
  timeZone: "Asia/Kolkata",
};

const SHEET_NAME = "Registrations";
const BACKUP_FOLDER = SETTINGS.conference + " Backups";
const STATUSES = ["PENDING", "VERIFIED", "REJECTED"];

const PRESENTATION = { ORAL: "Oral", POSTER: "Poster", NOT_PRESENTING: "Not presenting" };
const MAX_PER_EMAIL_PER_HOUR = 5;

// Files the form can attach: [field, label shown to the visitor, allowed types → extension, Drive folder].
// Each file's link goes in the column named after its label.
const UPLOADS = [
  [
    "proof",
    "Payment Proof",
    { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "application/pdf": "pdf" },
    SETTINGS.conference + " Payment Proofs",
  ],
  ["abstract", "Abstract", { "application/pdf": "pdf" }, SETTINGS.conference + " Abstracts"],
];
const MAX_FILE_MB = 5;

// Each column: [header, value from the website form]. To add a column, add a line at the END
// so existing rows keep lining up.
const COLUMNS = [
  ["Registration ID", (r) => r.id],
  ["Submitted At", () => new Date()],
  ["Payment Status", () => "PENDING"],
  ["Name", (r) => text(r.name)],
  ["Designation", (r) => text(r.designation)],
  ["Gender", (r) => text(r.gender)],
  ["Email", (r) => text(r.email)],
  ["Phone", (r) => text(r.phone)],
  ["Address", (r) => text(r.address)],
  ["Category", (r) => text(r.category)],
  ["Presentation", (r) => text(PRESENTATION[r.presentationType])],
  ["Paper Title", (r) => text(r.paperTitle)],
  ["Accommodation Needed", (r) => (r.accommodationNeeded === true ? "Yes" : "No")],
  ["Amount", (r) => text(r.paymentAmount)],
  ["Currency", (r) => text(r.paymentCurrency)],
  ["Transaction ID", (r) => text(r.transactionId)],
  ["Transaction Date", (r) => text(r.paymentDate)],
  ["Bank", (r) => text(r.bankName)],
  ["Payment Proof", (r) => r.fileUrls["Payment Proof"] || ""],
  ["Admin Note", (r) => r.note],
  ["Confirmation Email", () => ""],
  ["Status Email", () => ""],
  ["Abstract", (r) => r.fileUrls["Abstract"] || ""],
];

// [field, label shown to the visitor, minimum length (0 = optional), maximum length]
const FIELDS = [
  ["name", "Full Name", 2, 200],
  ["designation", "Designation", 2, 200],
  ["gender", "Gender", 0, 50],
  ["address", "Address", 5, 500],
  ["phone", "Phone / WhatsApp", 6, 30],
  ["email", "Email", 5, 200],
  ["category", "Registration Category", 2, 200],
  ["paperTitle", "Paper / Abstract Title", 0, 300],
  ["paymentAmount", "Fee", 1, 30],
  ["transactionId", "Transaction ID", 0, 100],
  ["paymentDate", "Transaction Date", 0, 10],
  ["bankName", "Bank Used", 0, 100],
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "We couldn't read your registration. Please try again." });
  }

  // People never see the "website" field, but bots fill in every field. Tell them it worked and save nothing.
  if (data.website) return reply({ ok: true, id: "" });

  const problems = validate(data);
  if (problems.length) {
    return reply({
      ok: false,
      error: "Please check: " + problems.map((p) => p.label).join(", ") + ".",
      fields: problems.map((p) => p.field),
    });
  }
  if (tooManyAttempts(data.email)) {
    return reply({
      ok: false,
      error: `Too many registrations from this email address in the last hour. Please write to ${SETTINGS.committeeEmail} if you need help.`,
    });
  }

  const files = [];
  let record;
  try {
    data.fileUrls = {};
    UPLOADS.forEach(([field, label, types, folder]) => {
      if (!data[field]) return;
      const file = saveFile(data[field], types, folder, data.name);
      data.fileUrls[label] = file.getUrl();
      files.push(file);
    });
    record = saveRow(data);
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: "Something went wrong saving your registration. Please try again." });
  }

  // The registration is saved from here on, so nothing below may turn this into an error reply.
  files.forEach((file) => {
    try {
      file.setName(record["Registration ID"] + " - " + file.getName());
    } catch (err) {
      console.error(err);
    }
  });
  const emailed = sendConfirmation(record);
  notifyCommittee(record);
  return reply({ ok: true, id: record["Registration ID"], emailed });
}

/** Opening the Web app URL in a browser shows this — a quick way to check the deployment. */
function doGet() {
  return ContentService.createTextOutput("CABHBE-26 registration endpoint is running.");
}

/**
 * Run once from the editor: pick `setup` in the toolbar → Run. Creates the Registrations tab, the
 * Drive folders, and the triggers for status emails and nightly backups. Safe to run again.
 */
function setup() {
  getSheet();
  UPLOADS.forEach(([, , , folder]) => getFolder(folder));
  getFolder(BACKUP_FOLDER);

  ScriptApp.getProjectTriggers().forEach((trigger) => ScriptApp.deleteTrigger(trigger));
  ScriptApp.newTrigger("onStatusEdit").forSpreadsheet(SpreadsheetApp.getActive()).onEdit().create();
  ScriptApp.newTrigger("backupToExcel").timeBased().everyDays(1).atHour(23).inTimezone(SETTINGS.timeZone).create();

  console.log(
    "Setup done. This account can send " + MailApp.getRemainingDailyQuota() + " more emails today."
  );
}

/** Returns the fields that are missing or invalid, as { field, label }. */
function validate(r) {
  const problems = [];
  FIELDS.forEach(([field, label, min, max]) => {
    const value = r[field] === undefined || r[field] === null ? "" : String(r[field]).trim();
    if ((min > 0 && value.length < min) || value.length > max) problems.push({ field, label });
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r.email || "").trim())) {
    problems.push({ field: "email", label: "Email" });
  }
  if (!PRESENTATION[r.presentationType]) problems.push({ field: "presentationType", label: "Presentation" });
  if (r.paymentCurrency !== "INR" && r.paymentCurrency !== "USD") {
    problems.push({ field: "paymentCurrency", label: "Currency" });
  }
  UPLOADS.forEach(([field, label, types]) => {
    const file = r[field];
    if (!file) return;
    const sizeOk = typeof file.data === "string" && file.data.length * 0.75 <= MAX_FILE_MB * 1024 * 1024;
    if (!types[file.type] || !sizeOk) problems.push({ field, label });
  });
  return problems.filter((p, i) => problems.findIndex((q) => q.field === p.field) === i);
}

/** Stops one address from being used to flood the sheet or the email quota. */
function tooManyAttempts(email) {
  const cache = CacheService.getScriptCache();
  const key = "attempts:" + String(email).trim().toLowerCase();
  const count = Number(cache.get(key) || 0) + 1;
  cache.put(key, String(count), 3600);
  return count > MAX_PER_EMAIL_PER_HOUR;
}

function saveFile(file, types, folder, name) {
  const bytes = Utilities.base64Decode(file.data);
  const fileName = String(name).trim() + "." + types[file.type];
  return getFolder(folder).createFile(Utilities.newBlob(bytes, file.type, fileName));
}

/** Appends the registration under a lock, so two at once never get the same ID. Returns it as a record. */
function saveRow(data) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) throw new Error("Timed out waiting for the sheet lock.");
  try {
    const sheet = getSheet();
    data.id = nextId();
    data.note = duplicateNote(sheet, data);
    const values = COLUMNS.map((column) => column[1](data));
    sheet.appendRow(values);

    const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sheet.getRange(sheet.getLastRow(), col("Payment Status")).setDataValidation(statusRule);
    SpreadsheetApp.flush();
    return recordFrom(values);
  } finally {
    lock.releaseLock();
  }
}

function nextId() {
  const properties = PropertiesService.getScriptProperties();
  const number = Number(properties.getProperty("lastRegistrationNumber") || 0) + 1;
  properties.setProperty("lastRegistrationNumber", String(number));
  return SETTINGS.idPrefix + "-" + String(number).padStart(4, "0");
}

/** Flags a likely repeat in Admin Note, e.g. someone who submitted twice or reused a transaction ID. */
function duplicateNote(sheet, data) {
  if (sheet.getLastRow() < 2) return "";
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, COLUMNS.length).getValues().map(recordFrom);
  const same = (a, b) => String(a).trim().toLowerCase() === String(b || "").trim().toLowerCase();
  const notes = [];

  const sameEmail = rows.find((row) => same(row["Email"], data.email));
  if (sameEmail) notes.push("Same email as " + sameEmail["Registration ID"]);
  if (data.transactionId) {
    const sameTransaction = rows.find((row) => same(row["Transaction ID"], data.transactionId));
    if (sameTransaction) notes.push("Same transaction ID as " + sameTransaction["Registration ID"]);
  }
  return notes.join("; ");
}

function sendConfirmation(record) {
  const paid = record["Transaction ID"] || record["Payment Proof"];
  const nextStep = paid
    ? "The organizing committee will check your payment against the bank statement and email you again once it is verified."
    : `We haven't received your payment details yet. Please pay <b>${h(fee(record))}</b> using the bank details at ` +
      `<a href="${SETTINGS.website}/registration/">${SETTINGS.website}/registration/</a>, then reply to this email ` +
      "with your transaction ID and a screenshot of the payment.";

  let result;
  try {
    sendEmail(record["Email"], `${SETTINGS.conference} registration received — ${record["Registration ID"]}`, [
      `Dear ${h(record["Name"])},`,
      `Thank you for registering for the ${h(SETTINGS.conferenceFullName)} (${h(SETTINGS.conference)}). ` +
        `Your registration ID is <b>${h(record["Registration ID"])}</b>. Please quote it whenever you write to us.`,
      nextStep,
    ], details(record));
    result = "Sent " + now();
  } catch (err) {
    console.error(err);
    result = "Not sent: " + err.message;
  }
  setCellById(record["Registration ID"], "Confirmation Email", result);
  return result.indexOf("Sent") === 0;
}

function notifyCommittee(record) {
  if (!SETTINGS.notifyCommittee) return;
  try {
    const rows = COLUMNS.map(([header]) => [header, record[header] instanceof Date ? now() : record[header]]);
    sendEmail(
      SETTINGS.committeeEmail,
      `New registration ${record["Registration ID"]} — ${record["Name"]} (${record["Category"]})`,
      [`A new registration has arrived. Open the sheet: <a href="${SpreadsheetApp.getActive().getUrl()}">Registrations</a>`],
      rows.filter(([header, value]) => value !== "" && header !== "Confirmation Email" && header !== "Status Email")
    );
  } catch (err) {
    console.error(err);
  }
}

/**
 * Runs on every edit (installed by `setup`). When an organizer sets Payment Status to VERIFIED or
 * REJECTED, emails the registrant and records it in the Status Email column.
 */
function onStatusEdit(e) {
  const sheet = e.range.getSheet();
  const statusColumn = col("Payment Status");
  if (sheet.getName() !== SHEET_NAME) return;
  if (e.range.getColumn() > statusColumn || e.range.getLastColumn() < statusColumn) return;

  const first = Math.max(e.range.getRow(), 2);
  const last = e.range.getLastRow();
  if (last < first) return;

  const rows = sheet.getRange(first, 1, last - first + 1, COLUMNS.length).getValues().map(recordFrom);
  rows.forEach((record, i) => {
    const status = record["Payment Status"];
    if (status !== "VERIFIED" && status !== "REJECTED") return;
    if (String(record["Status Email"]).indexOf(status + " emailed") === 0) return;
    sheet.getRange(first + i, col("Status Email")).setValue(sendStatusEmail(record, status));
  });
}

function sendStatusEmail(record, status) {
  const verified = status === "VERIFIED";
  const subject = verified
    ? `${SETTINGS.conference} registration confirmed — ${record["Registration ID"]}`
    : `${SETTINGS.conference} payment could not be verified — ${record["Registration ID"]}`;
  const message = verified
    ? `Your payment has been verified and your registration for ${h(SETTINGS.conference)} is <b>confirmed</b>. ` +
      "Please keep this email and quote your registration ID at the registration desk."
    : `We could not match your payment of ${h(fee(record))}` +
      (record["Transaction ID"] ? ` (transaction ID ${h(record["Transaction ID"])})` : "") +
      " with our bank records. Please reply to this email with a clear screenshot or PDF of the payment, " +
      "and we will check it again.";

  try {
    sendEmail(record["Email"], subject, [`Dear ${h(record["Name"])},`, message], details(record));
    return status + " emailed " + now();
  } catch (err) {
    console.error(err);
    return "Not sent (" + status + "): " + err.message;
  }
}

/** Runs every night (installed by `setup`): saves an Excel copy of the sheet to the Backups folder. */
function backupToExcel() {
  const spreadsheet = SpreadsheetApp.getActive();
  const url = "https://docs.google.com/spreadsheets/d/" + spreadsheet.getId() + "/export?format=xlsx";
  const response = UrlFetchApp.fetch(url, { headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() } });
  const date = Utilities.formatDate(new Date(), SETTINGS.timeZone, "yyyy-MM-dd");
  const blob = response.getBlob().setName(`${SETTINGS.conference} Registrations ${date}.xlsx`);

  const folder = getFolder(BACKUP_FOLDER);
  folder.createFile(blob);

  const backups = [];
  const files = folder.getFiles();
  while (files.hasNext()) backups.push(files.next());
  backups
    .sort((a, b) => b.getDateCreated() - a.getDateCreated())
    .slice(SETTINGS.backupsToKeep)
    .forEach((file) => file.setTrashed(true));

  if (SETTINGS.emailDailyBackup) {
    MailApp.sendEmail({
      to: SETTINGS.committeeEmail,
      subject: `${SETTINGS.conference} registrations backup ${date}`,
      body: "The Excel copy of the registrations sheet is attached.",
      attachments: [blob],
    });
  }
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActive();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map((column) => column[0]));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  } else if (sheet.getLastColumn() < COLUMNS.length) {
    // Headers for columns added to COLUMNS after the tab was created.
    sheet.getRange(1, 1, 1, COLUMNS.length).setValues([COLUMNS.map((column) => column[0])]).setFontWeight("bold");
  }
  return sheet;
}

/** The Drive folder with this name, created next to the spreadsheet the first time. */
function getFolder(name) {
  const properties = PropertiesService.getScriptProperties();
  const id = properties.getProperty("folder:" + name);
  if (id) {
    try {
      const folder = DriveApp.getFolderById(id);
      if (!folder.isTrashed()) return folder;
    } catch (err) {
      // Deleted for good — make a new one below.
    }
  }
  const parents = DriveApp.getFileById(SpreadsheetApp.getActive().getId()).getParents();
  const folder = (parents.hasNext() ? parents.next() : DriveApp.getRootFolder()).createFolder(name);
  properties.setProperty("folder:" + name, folder.getId());
  return folder;
}

function setCellById(id, header, value) {
  const sheet = getSheet();
  if (sheet.getLastRow() < 2) return;
  const found = sheet
    .getRange(2, col("Registration ID"), sheet.getLastRow() - 1)
    .createTextFinder(id)
    .matchEntireCell(true)
    .findNext();
  if (found) sheet.getRange(found.getRow(), col(header)).setValue(value);
}

/** 1-based column number of a header in COLUMNS. */
function col(header) {
  return COLUMNS.findIndex((column) => column[0] === header) + 1;
}

/** A row's values keyed by header, without the ' that `text` adds. */
function recordFrom(values) {
  const record = {};
  COLUMNS.forEach(([header], i) => {
    record[header] = typeof values[i] === "string" ? values[i].replace(/^'/, "") : values[i];
  });
  return record;
}

/** The summary table at the bottom of every email to a registrant. */
function details(record) {
  return [
    ["Registration ID", record["Registration ID"]],
    ["Name", record["Name"]],
    ["Category", record["Category"]],
    ["Presentation", record["Presentation"]],
    ["Paper Title", record["Paper Title"]],
    ["Abstract", record["Abstract"] ? "Received" : ""],
    ["Accommodation", record["Accommodation Needed"]],
    ["Fee", fee(record)],
    ["Transaction ID", record["Transaction ID"] || "Not given yet"],
    ["Payment Proof", record["Payment Proof"] ? "Received" : "Not attached"],
  ].filter(([, value]) => value !== "");
}

function fee(record) {
  return (record["Currency"] === "INR" ? "₹" : "US$") + record["Amount"];
}

/** `paragraphs` are HTML — wrap anything a visitor typed in h(). `rows` are plain text. */
function sendEmail(to, subject, paragraphs, rows) {
  const table = rows.length
    ? '<table style="border-collapse:collapse;margin:16px 0">' +
      rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#6f727b;vertical-align:top">${h(label)}</td>` +
            `<td style="padding:4px 0;font-weight:bold">${h(value)}</td></tr>`
        )
        .join("") +
      "</table>"
    : "";
  const signature =
    `Organizing Committee, ${h(SETTINGS.conference)}<br>GIET University, Gunupur, Odisha<br>` +
    `<a href="mailto:${SETTINGS.committeeEmail}">${SETTINGS.committeeEmail}</a> · ` +
    `<a href="${SETTINGS.website}">${SETTINGS.website.replace(/^https?:\/\//, "")}</a>`;
  const html =
    '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#141416;max-width:600px">' +
    paragraphs.map((p) => `<p>${p}</p>`).join("") +
    table +
    `<p>${signature}</p></div>`;

  MailApp.sendEmail({
    to,
    subject,
    htmlBody: html,
    body: plainText(paragraphs.join("\n\n") + "\n\n" + rows.map(([l, v]) => `${l}: ${v}`).join("\n") + "\n\n" + signature),
    name: SETTINGS.conference + " Organizing Committee",
    replyTo: SETTINGS.committeeEmail,
  });
}

/** Escapes text for use inside email HTML. */
function h(value) {
  const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (c) => entities[c]);
}

function plainText(html) {
  const entities = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" };
  return html
    .replace(/<br>/g, "\n")
    .replace(/<a href="([^"]+)">[^<]*<\/a>/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39);/g, (e) => entities[e])
    .replace(/mailto:/g, "");
}

function now() {
  return Utilities.formatDate(new Date(), SETTINGS.timeZone, "d MMM yyyy, HH:mm");
}

/** Stores the value as plain text, so input like "=SUM(...)" or "+91…" is never turned into a formula or number. */
function text(value) {
  return value === undefined || value === null || value === "" ? "" : "'" + String(value).trim();
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
