import { NextResponse } from "next/server";
import { z } from "zod";
import { event, registrationCategories } from "@/content";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(200),
  designation: z.string().trim().min(2).max(200),
  gender: z.string().trim().max(50).optional(),
  address: z.string().trim().min(5).max(500),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email(),
  category: z.enum(registrationCategories as [string, ...string[]]),
  presentationType: z.enum(["ORAL", "POSTER", "NOT_PRESENTING"]),
  paperTitle: z.string().trim().max(300).optional(),
  accommodationNeeded: z.boolean(),
  paymentAmount: z.string().trim().min(1).max(30),
  paymentCurrency: z.enum(["INR", "USD"]),
  transactionId: z.string().trim().max(100).optional(),
  paymentDate: z.iso.date().optional(),
  bankName: z.string().trim().max(100).optional(),
});

/**
 * Registrations are appended to a Google Sheet by a small Apps Script web app
 * (google-sheet/registrations.gs). The organizing committee reviews entries and
 * marks payments verified directly in that sheet — there is no database.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.log("[registration] GOOGLE_SHEET_WEBHOOK_URL is not set — logged here only:", parsed.data);
      return NextResponse.json({ ok: true }, { status: 201 });
    }
    console.error("[registration] GOOGLE_SHEET_WEBHOOK_URL is not set; registration was not saved.");
    return NextResponse.json(
      { error: `Online registration is temporarily unavailable. Please email ${event.submissionEmail}.` },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...parsed.data, secret: process.env.GOOGLE_SHEET_SECRET }),
      signal: AbortSignal.timeout(20_000),
    });
    const result = await res.json().catch(() => null);
    if (!res.ok || !result?.ok) {
      throw new Error(result?.error ?? `Google Sheet responded with HTTP ${res.status}`);
    }
  } catch (err) {
    console.error("[registration] Could not save to the Google Sheet:", err);
    return NextResponse.json(
      { error: `We couldn't save your registration. Please try again, or email ${event.submissionEmail}.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
