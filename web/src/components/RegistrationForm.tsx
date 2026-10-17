"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  earlyBirdDeadline,
  event as conference,
  feeTiers,
  registrationCategories,
  settings,
} from "@/content";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";
const inputClass = `h-13 w-full min-w-0 rounded-lg border border-border bg-white px-4 text-base focus:border-red aria-[invalid=true]:border-2 aria-[invalid=true]:border-red ${focusRing}`;
const fileInputClass = `block w-full min-w-0 rounded-lg text-base text-ink-mid file:mr-4 file:h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-tint file:px-4 file:font-semibold file:text-red ${focusRing}`;
const labelClass = "text-sm font-semibold text-ink";
const legendClass = "mb-4 font-heading text-xl font-bold text-ink";

// Files the form can attach. Must match UPLOADS and MAX_FILE_MB in google-sheet/registrations.gs.
const FILES: Record<string, { types: string[]; described: string }> = {
  proof: { types: ["image/jpeg", "image/png", "image/webp", "application/pdf"], described: "JPG, PNG, WEBP or PDF" },
  abstract: { types: ["application/pdf"], described: "PDF" },
};
const MAX_FILE_MB = 5;
// Google can take a while to save a large attachment and send the emails.
const TIMEOUT_MS = 90_000;

const LABELS: Record<string, string> = {
  name: "Full Name",
  designation: "Designation",
  gender: "Gender",
  phone: "Phone / WhatsApp",
  email: "Email",
  address: "Address",
  category: "Registration Category",
  presentationType: "Presentation",
  paperTitle: "Paper / Abstract Title",
  abstract: "Abstract (PDF)",
  transactionId: "Transaction ID",
  paymentDate: "Transaction Date",
  bankName: "Bank Used",
  proof: "Payment Screenshot or PDF",
};

type Errors = Record<string, string>;
type Done = { id: string; email: string; emailed: boolean; paid: boolean };
type SheetReply = { ok: boolean; id?: string; emailed?: boolean; error?: string; fields?: string[] };

function feeForCategory(category: string) {
  const isEarlyBird = Date.now() <= new Date(earlyBirdDeadline.iso).getTime();
  const tier = feeTiers.find((f) => f.category === category);
  if (!tier) return { amount: "", currency: "INR" as const };
  return { amount: isEarlyBird ? tier.before : tier.after, currency: tier.currency };
}

function fileProblem(name: string, file: File | undefined) {
  if (!file || file.size === 0) return null;
  if (!FILES[name].types.includes(file.type)) return `Attach a ${FILES[name].described} file.`;
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `The file must be ${MAX_FILE_MB} MB or smaller.`;
  return null;
}

function fieldProblem(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  const label = LABELS[el.name];
  if (el.required && !el.value.trim()) return `Please fill in ${label}.`;
  if (el.validity.typeMismatch) return "Enter an email address like name@example.com.";
  if (el.validity.tooShort && "minLength" in el) return `${label} needs at least ${el.minLength} characters.`;
  if (!el.validity.valid) return `Please check ${label}.`;
  return null;
}

/** Problems with each form field, in the order the fields appear. */
function findProblems(form: HTMLFormElement) {
  const problems: Errors = {};
  for (const el of Array.from(form.elements)) {
    const isField =
      el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement;
    if (!isField || !(el.name in LABELS)) continue;
    const problem =
      el instanceof HTMLInputElement && el.type === "file" ? fileProblem(el.name, el.files?.[0]) : fieldProblem(el);
    if (problem) problems[el.name] = problem;
  }
  return problems;
}

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function Field({
  name,
  required,
  note,
  error,
  wide,
  children,
}: {
  name: string;
  required?: boolean;
  note?: string;
  error?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={`reg-${name}`} className={labelClass}>
        {LABELS[name]}
        {required && (
          <span className="text-red" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {note && (
        <p id={`reg-${name}-note`} className="text-sm text-ink-soft">
          {note}
        </p>
      )}
      {error && (
        <p id={`reg-${name}-error`} className="text-sm font-semibold text-red">
          {error}
        </p>
      )}
    </div>
  );
}

export function RegistrationForm() {
  const [category, setCategory] = useState(registrationCategories[0]);
  const [presentationType, setPresentationType] = useState<"NOT_PRESENTING" | "ORAL" | "POSTER">(
    "NOT_PRESENTING"
  );
  const [accommodationNeeded, setAccommodationNeeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const fee = useMemo(() => feeForCategory(category), [category]);

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  /** Props that tie a form control to its label, hint and error message. */
  function control(name: string, hasNote = false) {
    const describedBy = [hasNote && `reg-${name}-note`, errors[name] && `reg-${name}-error`]
      .filter(Boolean)
      .join(" ");
    return {
      id: `reg-${name}`,
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": describedBy || undefined,
    };
  }

  function showProblems(problems: Errors, message: string) {
    setErrors(problems);
    setFormError(message);
    const first = Object.keys(problems)[0];
    if (first) document.getElementById(`reg-${first}`)?.focus();
  }

  function clearError(name: string) {
    if (!errors[name]) return;
    setErrors((previous) => {
      const next = { ...previous };
      delete next[name];
      return next;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;

    const problems = findProblems(formElement);
    const count = Object.keys(problems).length;
    if (count) {
      showProblems(problems, `Please fix the ${count === 1 ? "highlighted field" : `${count} highlighted fields`} above.`);
      return;
    }

    const form = new FormData(formElement);
    const files: Record<string, { type: string; data: string }> = {};
    for (const name of Object.keys(FILES)) {
      const file = form.get(name);
      if (!(file instanceof File) || file.size === 0) continue;
      try {
        files[name] = { type: file.type, data: await readAsBase64(file) };
      } catch {
        showProblems({ [name]: "We couldn't read this file. Please choose it again." }, "Please fix the highlighted field above.");
        return;
      }
    }

    setErrors({});
    setFormError(null);
    setSubmitting(true);

    const payload = {
      name: String(form.get("name") ?? ""),
      designation: String(form.get("designation") ?? ""),
      gender: String(form.get("gender") ?? ""),
      address: String(form.get("address") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      category,
      presentationType,
      paperTitle: String(form.get("paperTitle") ?? "") || undefined,
      accommodationNeeded,
      paymentAmount: fee.amount,
      paymentCurrency: fee.currency,
      transactionId: String(form.get("transactionId") ?? "") || undefined,
      paymentDate: String(form.get("paymentDate") ?? "") || undefined,
      bankName: String(form.get("bankName") ?? "") || undefined,
      proof: files.proof,
      abstract: files.abstract,
      website: String(form.get("website") ?? "") || undefined,
    };
    const paid = Boolean(payload.transactionId || payload.proof);

    const sheetUrl = settings.registrationSheetUrl;
    if (!sheetUrl) {
      setSubmitting(false);
      if (process.env.NODE_ENV === "development") {
        console.log("[registration] settings.registrationSheetUrl is empty — not saved:", payload);
        setDone({ id: "CABHBE26-TEST", email: payload.email, emailed: false, paid });
        return;
      }
      setFormError(
        `Online registration isn't open yet. Please email your details and payment proof to ${conference.submissionEmail}, or use the offline form on the Downloads page.`
      );
      return;
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    let result: SheetReply;
    try {
      // Sent as plain text (no custom headers) so the browser can post straight to
      // Google without a CORS preflight, which Apps Script cannot answer.
      const res = await fetch(sheetUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      result = await res.json();
    } catch {
      setFormError(
        controller.signal.aborted
          ? `We didn't hear back in time, but your registration may still have been saved. Check your email (including spam) for a confirmation before submitting again, or write to ${conference.submissionEmail}.`
          : `We couldn't send your registration. Please check your connection and try again, or email ${conference.submissionEmail}.`
      );
      return;
    } finally {
      clearTimeout(timer);
      setSubmitting(false);
    }

    if (!result.ok) {
      const fieldErrors: Errors = {};
      for (const field of result.fields ?? []) {
        if (field in LABELS) fieldErrors[field] = `Please check ${LABELS[field]}.`;
      }
      showProblems(fieldErrors, result.error ?? "Something went wrong. Please try again.");
      return;
    }

    setDone({ id: result.id ?? "", email: payload.email, emailed: Boolean(result.emailed), paid });
  }

  if (done) {
    return (
      <div className="rounded-2xl border-2 border-cyan bg-cyan-tint p-9 text-center">
        <h3 ref={doneHeading} tabIndex={-1} className="font-heading text-2xl text-ink outline-none">
          Registration received
        </h3>
        {done.id && (
          <p className="mt-3 text-lg text-ink-mid">
            Your registration ID is <strong className="text-ink">{done.id}</strong>. Please quote it
            whenever you write to us.
          </p>
        )}
        <p className="mx-auto mt-3 max-w-lg text-lg text-ink-mid">
          {done.emailed
            ? `We've emailed a confirmation to ${done.email}. If it isn't in your inbox within a few minutes, check your spam folder.`
            : `The organizing committee will confirm by email to ${done.email}.`}
        </p>
        <p className="mx-auto mt-3 max-w-lg text-base text-ink-mid">
          {done.paid
            ? "The committee will check your payment and email you again once it is verified."
            : `Haven't paid yet? Pay using the bank details below, then email your transaction ID and a screenshot of the payment to ${conference.submissionEmail}, quoting your registration ID.`}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onChange={(e) => clearError((e.target as Element).getAttribute("name") ?? "")}
      noValidate
      className="relative rounded-2xl border border-border bg-white p-5 sm:p-9"
    >
      <p className="mb-7 text-sm text-ink-soft">
        Fields marked <span className="font-semibold text-red">*</span> are required.
      </p>

      <fieldset>
        <legend className={legendClass}>Your details</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="name" required error={errors.name}>
            <input {...control("name")} required minLength={2} autoComplete="name" className={inputClass} />
          </Field>
          <Field name="designation" required error={errors.designation}>
            <input
              {...control("designation")}
              required
              minLength={2}
              autoComplete="organization-title"
              className={inputClass}
            />
          </Field>
          <Field name="gender" error={errors.gender}>
            <select {...control("gender")} className={inputClass} defaultValue="">
              <option value="">Prefer not to say</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </Field>
          <Field name="phone" required error={errors.phone}>
            <input
              {...control("phone")}
              type="tel"
              required
              minLength={6}
              autoComplete="tel"
              className={inputClass}
            />
          </Field>
          <Field name="email" required wide note="Your confirmation is sent here." error={errors.email}>
            <input
              {...control("email", true)}
              type="email"
              required
              autoComplete="email"
              spellCheck={false}
              className={inputClass}
            />
          </Field>
          <Field name="address" required wide error={errors.address}>
            <textarea
              {...control("address")}
              required
              minLength={5}
              rows={2}
              autoComplete="street-address"
              className={`${inputClass} h-auto py-3`}
            />
          </Field>
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className={legendClass}>Registration</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="category" required wide error={errors.category}>
            <select
              {...control("category")}
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            >
              {registrationCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field name="presentationType" required error={errors.presentationType}>
            <select
              {...control("presentationType")}
              required
              value={presentationType}
              onChange={(e) => setPresentationType(e.target.value as typeof presentationType)}
              className={inputClass}
            >
              <option value="NOT_PRESENTING">Not Presenting</option>
              <option value="ORAL">Oral</option>
              <option value="POSTER">Poster</option>
            </select>
          </Field>
          {presentationType !== "NOT_PRESENTING" && (
            <>
              <Field name="paperTitle" error={errors.paperTitle}>
                <input {...control("paperTitle")} className={inputClass} />
              </Field>
              <Field
                name="abstract"
                wide
                note={`${FILES.abstract.described}, up to ${MAX_FILE_MB} MB. If it isn't ready yet, you can email it to ${conference.submissionEmail} later.`}
                error={errors.abstract}
              >
                <input
                  {...control("abstract", true)}
                  type="file"
                  accept={FILES.abstract.types.join(",")}
                  className={fileInputClass}
                />
              </Field>
            </>
          )}
          <label className="flex items-center gap-3 sm:col-span-2">
            <input
              type="checkbox"
              checked={accommodationNeeded}
              onChange={(e) => setAccommodationNeeded(e.target.checked)}
              className={`h-5 w-5 accent-red ${focusRing}`}
            />
            <span className="text-base text-ink-mid">I need on-campus accommodation</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="mt-9">
        <legend className={legendClass}>Payment</legend>
        <div className="mb-6 rounded-xl border border-border bg-bg p-5">
          <div className="text-sm font-semibold text-ink-mid">Applicable registration fee</div>
          <div className="font-heading mt-1 text-2xl font-bold text-red" aria-live="polite">
            {fee.currency === "INR" ? "₹" : "$"}
            {fee.amount}
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Based on today&apos;s date and the early-bird cutoff of {earlyBirdDeadline.label}. Pay
            using the bank details below, then fill in your payment details here. If you haven&apos;t
            paid yet, you can register now and send them later.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="transactionId" error={errors.transactionId}>
            <input {...control("transactionId")} autoComplete="off" spellCheck={false} className={inputClass} />
          </Field>
          <Field name="paymentDate" error={errors.paymentDate}>
            <input {...control("paymentDate")} type="date" className={inputClass} />
          </Field>
          <Field name="bankName" wide error={errors.bankName}>
            <input {...control("bankName")} className={inputClass} />
          </Field>
          <Field
            name="proof"
            wide
            note={`${FILES.proof.described}, up to ${MAX_FILE_MB} MB.`}
            error={errors.proof}
          >
            <input
              {...control("proof", true)}
              type="file"
              accept={FILES.proof.types.join(",")}
              className={fileInputClass}
            />
          </Field>
        </div>
      </fieldset>

      {/* Hidden from people and screen readers; bots that fill in every field give themselves away here. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {/* Always on the page, so screen readers announce the messages as they appear. */}
      <div role="alert">
        {formError && <p className="mt-6 text-base font-semibold text-red">{formError}</p>}
      </div>
      <div role="status">
        {submitting && (
          <p className="mt-4 text-base text-ink-mid">
            Saving your registration. This can take up to a minute; please keep this page open.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={`mt-7 h-14 w-full rounded-xl bg-red text-lg font-semibold text-white hover:bg-red-dark disabled:opacity-60 sm:w-auto sm:px-10 ${focusRing}`}
      >
        {submitting ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}
