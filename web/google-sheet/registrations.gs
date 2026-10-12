/**
 * CABHBE-26 — saves website registrations into this Google Sheet.
 *
 * One-time setup (full steps in web/README.md → "Registrations"):
 *   1. In the Google Sheet: Extensions → Apps Script. Replace everything there with this file. Save.
 *   2. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
 *   3. Copy the Web app URL (ends in /exec) into `registrationSheetUrl` in
 *      web/src/content/settings.ts, then rebuild and re-upload the website.
 *
 * After changing this file: Deploy → Manage deployments → Edit (pencil) → Version: "New version"
 * → Deploy. The URL stays the same.
 *
 * Organizers work directly in the "Registrations" tab: set Payment Status from the dropdown,
 * write in Admin Note, sort/filter, or File → Download → CSV / Excel.
 */

const SHEET_NAME = "Registrations";
const STATUSES = ["PENDING", "VERIFIED", "REJECTED"];

const PRESENTATION = { ORAL: "Oral", POSTER: "Poster", NOT_PRESENTING: "Not presenting" };

// Each column: [header, value from the website form]. To add a column, add a line at the END
// so existing rows keep lining up.
const COLUMNS = [
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
  ["Admin Note", () => ""],
];
const STATUS_COLUMN = 2;

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
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const data = JSON.parse(e.postData.contents);
    const problems = validate(data);
    if (problems.length) {
      return reply({ ok: false, error: "Please check: " + problems.join(", ") + "." });
    }

    const sheet = getSheet();
    sheet.appendRow(COLUMNS.map((column) => column[1](data)));

    const statusRule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sheet.getRange(sheet.getLastRow(), STATUS_COLUMN).setDataValidation(statusRule);

    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: "Something went wrong saving your registration. Please try again." });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the Web app URL in a browser shows this — a quick way to check the deployment. */
function doGet() {
  return ContentService.createTextOutput("CABHBE-26 registration endpoint is running.");
}

/** Returns the labels of fields that are missing or invalid. */
function validate(r) {
  const problems = [];
  FIELDS.forEach(([field, label, min, max]) => {
    const value = r[field] === undefined || r[field] === null ? "" : String(r[field]).trim();
    if ((min > 0 && value.length < min) || value.length > max) problems.push(label);
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(r.email || "").trim())) problems.push("Email");
  if (!PRESENTATION[r.presentationType]) problems.push("Presentation");
  if (r.paymentCurrency !== "INR" && r.paymentCurrency !== "USD") problems.push("Currency");
  return problems.filter((label, i) => problems.indexOf(label) === i);
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow(COLUMNS.map((column) => column[0]));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Stores the value as plain text, so input like "=SUM(...)" or "+91…" is never turned into a formula or number. */
function text(value) {
  return value === undefined || value === null || value === "" ? "" : "'" + String(value).trim();
}

function reply(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
