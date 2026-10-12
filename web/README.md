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

How it works: the registration form sends each registration from the visitor's browser to a small Google Apps Script (`google-sheet/registrations.gs`) attached to the sheet. The script checks the fields, then appends one row to a **Registrations** tab. If something is missing or invalid, the visitor sees which fields to fix.

Until the sheet is connected, the form tells visitors to email their registration or use the offline form.

### One-time setup

1. Using the committee's Google account, create a Google Sheet (e.g. "CABHBE-26 Registrations") and share it with the organizers.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in all of `google-sheet/registrations.gs`, and save.
3. Click **Deploy → New deployment**, choose type **Web app**, and set *Execute as: Me* and *Who has access: Anyone*. Click **Deploy** and authorize access. Google shows an "unverified app" warning for your own scripts; choose *Advanced → Go to … (unsafe)*. Copy the **Web app URL** (it ends in `/exec`).
4. Open that URL in a browser. It should say *"CABHBE-26 registration endpoint is running."*
5. Paste the URL into `registrationSheetUrl` in `src/content/settings.ts`, then build and upload the site again (see "Publishing to GoDaddy").
6. Submit a test registration on the live site. A **Registrations** tab appears in the sheet with your row. Delete the test row afterwards.

### Day to day (organizers)

- New rows arrive with **Payment Status** set to `PENDING`. After checking the bank statement, change it with the dropdown to `VERIFIED` or `REJECTED`. Use **Admin Note** for anything else.
- To get an email for each new registration, use **Tools → Notification settings → Edit notifications** in the sheet.
- To export, use **File → Download → CSV / Microsoft Excel**.
- Don't rename the **Registrations** tab or reorder its columns, because the script fills columns by position. You can add your own columns to the right.
- If you edit the script later, go to **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**. The URL stays the same.
