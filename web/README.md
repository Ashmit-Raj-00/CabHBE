# CABHBE-26 website

Next.js site for the 2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research, GIET University, Gunupur.

There is **no database**:

- All website text, dates, fees, people and photos live in **`src/content/`**.
- Online registrations are saved to a **Google Sheet**, which the organizing committee uses to review entries and verify payments.

## Run it locally

```bash
npm install
cp .env.example .env.local   # optional; see "Registrations" below
npm run dev                  # http://localhost:3000
```

If `GOOGLE_SHEET_WEBHOOK_URL` isn't set, `npm run dev` accepts test registrations and prints them in the terminal instead of saving them.

## Editing content

Routine changes only touch files in `src/content/`. You don't need to edit pages or components.

| To change… | Edit |
| --- | --- |
| Conference dates, paper deadlines, early-bird cutoff | `conference.ts` → `dates` |
| Contact email, WhatsApp numbers, venue, conveners | `conference.ts` → `event` |
| Registration fees and categories | `conference.ts` → `feeTiers` |
| Bank details for payment | `conference.ts` → `bankDetails` |
| Paper themes, submission guidelines | `conference.ts` → `themes`, `submissionGuidelines` |
| Files on the Downloads page | `conference.ts` → `downloads` (put the PDF in `public/downloads/`) |
| Advisory panel, patrons, organizing committee | `people.ts` |
| Campus photos, map pin, accommodation rates, university facts | `venue.ts` |
| FAQ on the Contact page | `faq.ts` |
| Explore the Region page | `explore.ts` |

Tips:

- **Dates are written once**, as `"YYYY-MM-DD"`, in `dates`. The site formats them ("30 November 2026") and updates every page that shows them, including the deadline list, fee cards, registration form, FAQ, countdown and share image.
- Change only the text inside the quotes, and keep the comma at the end of each line.
- To add a person, fee, photo or FAQ, copy an existing `{ ... },` block and edit the copy.
- Images go in `public/images/<folder>/` and are referenced as `"/images/<folder>/file.webp"`. Keep them under ~300 KB (`.webp` or `.jpg`).
- Run `npm run build` before publishing. A typo such as a missing comma or a bad date stops the build with a message pointing at the line, so a mistake never reaches the live site.

### Publishing a change

The project is linked to the Vercel project `cabhbe-26`. From this folder:

```bash
npx vercel --prod
```

The live site updates in about a minute. Registrations in the Google Sheet are not affected by redeploys.

## Registrations (Google Sheet)

How it works: the registration form posts to `/api/registration`, which checks the fields, then forwards them to a small Google Apps Script (`google-sheet/registrations.gs`). The script appends one row per registration to a **Registrations** tab.

### One-time setup

1. Using the committee's Google account, create a Google Sheet (e.g. "CABHBE-26 Registrations") and share it with the organizers.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code and paste in all of `google-sheet/registrations.gs`.
3. Generate a secret with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Paste it as the `SECRET` value at the top of the script, then save.
4. Click **Deploy → New deployment**, choose type **Web app**, and set *Execute as: Me* and *Who has access: Anyone*. Click **Deploy** and authorize access. Google shows an "unverified app" warning for your own scripts; choose *Advanced → Go to … (unsafe)*. Copy the **Web app URL** (it ends in `/exec`).
5. Open that URL in a browser. It should say *"CABHBE-26 registration endpoint is running."*
6. Give the website the URL and secret:
   - Locally, put them in `.env.local` as `GOOGLE_SHEET_WEBHOOK_URL` and `GOOGLE_SHEET_SECRET`.
   - On Vercel, run `npx vercel env add GOOGLE_SHEET_WEBHOOK_URL production` and `npx vercel env add GOOGLE_SHEET_SECRET production`, then `npx vercel --prod`.
7. Submit a test registration on the site. A **Registrations** tab appears in the sheet with your row. Delete the test row afterwards.

### Day to day (organizers)

- New rows arrive with **Payment Status** set to `PENDING`. After checking the bank statement, change it with the dropdown to `VERIFIED` or `REJECTED`. Use **Admin Note** for anything else.
- To get an email for each new registration, use **Tools → Notification settings → Edit notifications** in the sheet.
- To export, use **File → Download → CSV / Microsoft Excel**.
- Don't rename the **Registrations** tab or reorder its columns, because the script fills columns by position. You can add your own columns to the right.
- If you edit the script later, go to **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same.

## Environment variables

| Name | Purpose |
| --- | --- |
| `GOOGLE_SHEET_WEBHOOK_URL` | Apps Script Web app URL that saves registrations |
| `GOOGLE_SHEET_SECRET` | Shared secret; must match `SECRET` in the script |
| `NEXT_PUBLIC_SITE_URL` | Public site URL, used for share images and links |
