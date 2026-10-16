# CABHBE-26 website

Next.js site for the 2nd International Conference on Advancement of Biotechnology in Healthcare, Bioproducts and Environmental Research, GIET University, Gunupur.

There is **no database and no server**:

- All website text, dates, fees, people and photos live in **`src/content/`**.
- `npm run build` turns the site into plain HTML files in **`out/`**, which you upload to GoDaddy (or any web host).
- Online registrations are sent straight from the visitor's browser to a **Google Sheet**, which the organizing committee uses to review entries and verify payments.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

While `registrationSheetUrl` in `src/content/settings.ts` is empty, `npm run dev` accepts test registrations and prints them in the browser console instead of saving them.

## Editing content

Routine changes only touch files in `src/content/`. You don't need to edit pages or components.

| To change… | Edit |
| --- | --- |
| Website address, Google Sheet link | `settings.ts` |
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

## Publishing to GoDaddy

1. Build the site:
   ```bash
   npm run build
   ```
   This creates the `out/` folder: `index.html`, one folder per page, images, PDFs and a `.htaccess` file for GoDaddy.
2. Zip the **contents** of `out/`, not the folder itself, so `index.html` sits at the top of the zip. On Linux/macOS, run `cd out && zip -r ../cabhbe26-website-upload.zip .`. On Windows, open `out`, select everything, then right-click → *Compress to ZIP file*.
3. In GoDaddy **cPanel → File Manager**, open `public_html`. Delete or move any old site files there.
4. **Upload** the zip into `public_html`, right-click it → **Extract** into `/public_html`, then delete the zip.

To publish a change later, edit the content, then repeat these steps. Uploading a new version doesn't affect registrations already in the Google Sheet.

Notes:

- The site must sit at the root of the domain (`yourdomain.com`), not a subfolder.
- Set `siteUrl` in `settings.ts` to the real address before building, so link previews on WhatsApp and social media show the right picture.
- To see hidden files like `.htaccess` in File Manager, open *Settings → Show Hidden Files*.

## Registrations (Google Sheet)

How it works: the registration form sends each registration from the visitor's browser to a small Google Apps Script (`google-sheet/registrations.gs`) attached to the sheet. The script checks the fields, then:

- appends one row to a **Registrations** tab, with a registration ID like `CABHBE26-0001`
- saves the payment screenshot or PDF, if one was attached, to a **CABHBE-26 Payment Proofs** folder in Google Drive and links it in the row
- emails the registrant a confirmation with their registration ID, and emails the committee a copy
- emails the registrant again when an organizer sets **Payment Status** to `VERIFIED` or `REJECTED`
- saves an Excel (.xlsx) copy of the whole sheet to a **CABHBE-26 Backups** folder in Drive every night, keeping the last 30

If something is missing or invalid, the visitor sees which fields to fix. Until the sheet is connected, the form tells visitors to email their registration or use the offline form.

All emails are sent from the Google account that sets up the script, so use the committee's account (`conferencebiotech@giet.edu`). A Google Workspace account can send about 1,500 emails a day; a personal Gmail account only 100. Each registration uses two (registrant and committee), plus one when its payment is verified or rejected.

### One-time setup

1. Signed in to the committee's Google account, create a Google Sheet (e.g. "CABHBE-26 Registrations") and share it with the organizers.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in all of `google-sheet/registrations.gs`, and save.
3. Check the `SETTINGS` block at the top of the script, especially `committeeEmail` and `website`. Save again if you changed anything.
4. In the toolbar's function list, pick **setup** and click **Run**. Google asks for access to Sheets, Drive and sending email. Google shows an "unverified app" warning for your own scripts; choose *Advanced → Go to … (unsafe)* → *Allow*. When it finishes, the log shows how many emails the account can send today.
5. Click **Deploy → New deployment**, choose type **Web app**, and set *Execute as: Me* and *Who has access: Anyone*. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
6. Open that URL in a browser. It should say *"CABHBE-26 registration endpoint is running."*
7. Paste the URL into `registrationSheetUrl` in `src/content/settings.ts`, then publish the site again (push to GitHub for Vercel, or see "Publishing to GoDaddy").
8. Submit a test registration on the live site, using your own email and a small screenshot. Check that the row, the confirmation email, the committee email and the file in **CABHBE-26 Payment Proofs** all arrive. Then delete the test row. The next registration still gets a new ID, so real IDs may start at `CABHBE26-0002`.
9. In Drive, share the **CABHBE-26 Payment Proofs** folder with the organizers who verify payments, so the links in the sheet open for them.

### Day to day (organizers)

- New rows arrive with **Payment Status** set to `PENDING`. After checking the bank statement, change it with the dropdown to `VERIFIED` or `REJECTED`. **The registrant is emailed the moment you choose**, so double-check first. The **Status Email** column shows when it was sent. Choosing the same status again doesn't send a second email.
- **Admin Note** is filled in automatically when a registration uses the same email or transaction ID as an earlier one, which usually means someone submitted twice. Use it for your own notes too; registrants never see it.
- **Confirmation Email** shows whether the confirmation went out. If it says *Not sent*, the account probably hit its daily email limit; email that person by hand.
- To export, use **File → Download → Microsoft Excel**, or open the latest file in **CABHBE-26 Backups**.
- Don't rename the **Registrations** tab or reorder its columns, because the script fills columns by position. You can add your own columns to the right.
- If you edit the script later, go to **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same. Run **setup** again only if you changed the triggers.

### Emails landing in spam

Ask the person who manages giet.edu's DNS and Google Admin to add `include:_spf.google.com` to the domain's SPF record and to turn on DKIM signing (Google Admin → Apps → Google Workspace → Gmail → Authenticate email). Without these, mail sent from a giet.edu Google account is more likely to be marked as spam.
