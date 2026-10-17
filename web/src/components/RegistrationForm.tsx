"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  bankDetails,
  earlyBirdDeadline,
  event as conference,
  feeTiers,
  settings,
  type FeeTier,
} from "@/content";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CopyIcon, MailIcon, WhatsappIcon } from "./icons";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";
const inputClass = `h-13 w-full min-w-0 scroll-mt-32 rounded-lg border border-ink-soft/40 bg-white px-4 text-base focus:border-red aria-[invalid=true]:border-2 aria-[invalid=true]:border-red ${focusRing}`;
const fileInputClass = `block w-full min-w-0 scroll-mt-32 rounded-lg text-base text-ink-mid file:mr-4 file:h-11 file:cursor-pointer file:rounded-lg file:border-0 file:bg-red-tint file:px-4 file:font-semibold file:text-red ${focusRing}`;
const labelClass = "text-sm font-semibold text-ink";
// A radio or checkbox shown as a tappable card or pill. The native control stays visible and focusable.
const choiceClass =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-ink-soft/30 bg-white transition-colors hover:border-red/60 has-checked:border-red has-checked:bg-red-tint has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-red";
const radioClass = "h-5 w-5 shrink-0 scroll-mt-32 accent-red";

const STEPS = [
  { title: "Registration", heading: "Choose your registration" },
  { title: "Your details", heading: "Tell us about yourself" },
  { title: "Payment", heading: "Pay the fee" },
];

type PresentationType = "NOT_PRESENTING" | "ORAL" | "POSTER";
// [value, option under "Will you present a paper?", wording in the summary]
const PRESENTATIONS: [PresentationType, string, string][] = [
  ["NOT_PRESENTING", "No", "Not presenting"],
  ["ORAL", "Oral", "Oral"],
  ["POSTER", "Poster", "Poster"],
];
const GENDERS: [string, string][] = [
  ["Male", "Male"],
  ["Female", "Female"],
  ["Other", "Other"],
  ["", "Prefer not to say"],
];

// Files the form can attach. Must match UPLOADS and MAX_FILE_MB in google-sheet/registrations.gs.
const FILES: Record<string, { types: string[]; described: string }> = {
  proof: { types: ["image/jpeg", "image/png", "image/webp", "application/pdf"], described: "JPG, PNG, WEBP or PDF" },
  abstract: { types: ["application/pdf"], described: "PDF" },
};
const MAX_FILE_MB = 5;
// Google can take a while to save a large attachment and send the emails.
const TIMEOUT_MS = 90_000;

const LABELS: Record<string, string> = {
  category: "Registration category",
  presentationType: "Will you present a paper?",
  paperTitle: "Paper / abstract title",
  abstract: "Abstract (PDF)",
  name: "Full name",
  designation: "Designation",
  email: "Email",
  phone: "Phone / WhatsApp",
  address: "Address",
  gender: "Gender",
  transactionId: "Transaction ID",
  paymentDate: "Transaction date",
  bankName: "Bank used",
  proof: "Payment screenshot or PDF",
};

type Errors = Record<string, string>;
type Done = { id: string; email: string; emailed: boolean; paid: boolean };
type SheetReply = { ok: boolean; id?: string; emailed?: boolean; error?: string; fields?: string[] };
type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

function isEarlyBird() {
  return Date.now() <= new Date(earlyBirdDeadline.iso).getTime();
}

function money(currency: FeeTier["currency"], amount: string) {
  return `${currency === "INR" ? "₹" : "$"}${amount}`;
}

function isField(el: EventTarget | Element): el is FieldElement {
  return el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement;
}

function fileProblem(name: string, file: File | undefined) {
  if (!file || file.size === 0) return null;
  if (!FILES[name].types.includes(file.type)) return `Attach a ${FILES[name].described} file.`;
  if (file.size > MAX_FILE_MB * 1024 * 1024) return `The file must be ${MAX_FILE_MB} MB or smaller.`;
  return null;
}

function fieldProblem(el: FieldElement) {
  const label = LABELS[el.name];
  if (el instanceof HTMLInputElement && el.type === "radio") return el.validity.valueMissing ? "Please choose one." : null;
  if (el.required && !el.value.trim()) return `Please fill in ${label}.`;
  if (el.validity.typeMismatch) return "Enter an email address like name@example.com.";
  if (el.validity.tooShort && "minLength" in el) return `${label} needs at least ${el.minLength} characters.`;
  if (!el.validity.valid) return `Please check ${label}.`;
  return null;
}

/** Problems with the fields inside `container`, in the order they appear. */
function findProblems(container: Element) {
  const problems: Errors = {};
  for (const el of Array.from(container.querySelectorAll("input, select, textarea"))) {
    if (!isField(el) || !(el.name in LABELS) || problems[el.name]) continue;
    const problem =
      el instanceof HTMLInputElement && el.type === "file" ? fileProblem(el.name, el.files?.[0]) : fieldProblem(el);
    if (problem) problems[el.name] = problem;
  }
  return problems;
}

function fixMessage(count: number) {
  return `Please fix the ${count === 1 ? "highlighted field" : `${count} highlighted fields`}.`;
}

function readAsBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function RequiredMark() {
  return (
    <span className="text-red" aria-hidden="true">
      {" "}
      *
    </span>
  );
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
        {required && <RequiredMark />}
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

/** A group of radio buttons with one label and one error message. */
function Choices({
  name,
  required,
  error,
  className = "",
  children,
}: {
  name: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={`min-w-0 ${className}`}>
      <legend className={`mb-2.5 ${labelClass}`}>
        {LABELS[name]}
        {required && <RequiredMark />}
      </legend>
      {children}
      {error && (
        <p id={`reg-${name}-error`} className="mt-2 text-sm font-semibold text-red">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. an old browser); the number is still on screen to copy by hand.
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg border border-ink-soft/30 bg-white px-3 text-sm font-semibold text-ink hover:border-red hover:text-red ${focusRing}`}
      >
        {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
        {copied ? "Copied" : "Copy"}
        <span className="sr-only"> {label}</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? `${label} copied` : ""}
      </span>
    </>
  );
}

function BankDetails() {
  const rows: [string, string, boolean][] = [
    ["Account number", bankDetails.accountNumber, true],
    ["IFSC code", bankDetails.ifsc, true],
    ["Account name", bankDetails.accountName, false],
    ["Bank", `${bankDetails.bankName}, ${bankDetails.branch}`, false],
  ];
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <dl className="grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2">
        {rows.map(([label, value, copyable]) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <dt className="text-sm text-ink-soft">{label}</dt>
              <dd className="font-semibold break-words text-ink">{value}</dd>
            </div>
            {copyable && <CopyButton text={value} label={label} />}
          </div>
        ))}
      </dl>
      {bankDetails.qrImage && (
        <div className="flex flex-col items-center text-center">
          <Image
            src={bankDetails.qrImage}
            alt={`QR code to pay ${bankDetails.accountName}`}
            width={160}
            height={160}
            className="h-40 w-40 rounded-lg"
          />
          <p className="mt-2 text-sm text-ink-soft">Scan with any UPI app</p>
        </div>
      )}
    </div>
  );
}

function Help() {
  return (
    <div className="text-sm text-ink-mid">
      <div className="font-semibold text-ink">Need help?</div>
      <a href={`mailto:${conference.submissionEmail}`} className="mt-2 flex items-center gap-2 font-semibold text-red hover:underline">
        <MailIcon size={18} /> {conference.submissionEmail}
      </a>
      {conference.whatsapp.map((number) => (
        <a
          key={number}
          href={`https://wa.me/${number.replace(/[^\d]/g, "")}`}
          className="mt-1.5 flex items-center gap-2 hover:text-red"
        >
          <WhatsappIcon size={18} /> {number}
        </a>
      ))}
    </div>
  );
}

export function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [presentationType, setPresentationType] = useState<PresentationType>("NOT_PRESENTING");
  const [accommodationNeeded, setAccommodationNeeded] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [done, setDone] = useState<Done | null>(null);
  const [focusRequest, setFocusRequest] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const stepHeadings = useRef<(HTMLLegendElement | null)[]>([]);
  const focusField = useRef<string | null>(null);
  const doneHeading = useRef<HTMLHeadingElement>(null);

  const [earlyBird] = useState(isEarlyBird);
  const tier = feeTiers.find((f) => f.category === category);
  const amount = tier ? (earlyBird ? tier.before : tier.after) : "";
  const fee = tier ? money(tier.currency, amount) : null;
  const presenting = presentationType !== "NOT_PRESENTING";
  const isLast = step === STEPS.length - 1;

  useEffect(() => {
    if (done) doneHeading.current?.focus();
  }, [done]);

  // After changing step or showing problems, focus the first field with a problem, or else bring
  // the form's top into view and focus the step heading, so keyboard and screen reader users follow.
  useEffect(() => {
    if (!focusRequest) return;
    const name = focusField.current;
    focusField.current = null;
    const field = name ? formRef.current?.querySelector<HTMLElement>(`[name="${name}"]`) : null;
    if (field) {
      field.focus();
      return;
    }
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    formRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
    stepHeadings.current[step]?.focus({ preventScroll: true });
  }, [focusRequest, step]);

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

  /** Props for each radio button in a group. */
  function radio(name: string) {
    return {
      name,
      "aria-invalid": errors[name] ? true : undefined,
      "aria-describedby": errors[name] ? `reg-${name}-error` : undefined,
    };
  }

  function stepOf(name: string) {
    const index = formRef.current
      ?.querySelector(`[name="${name}"]`)
      ?.closest("[data-step]")
      ?.getAttribute("data-step");
    return index == null ? null : Number(index);
  }

  function showProblems(problems: Errors, message: string) {
    setErrors(problems);
    setFormError(message);
    const first = Object.keys(problems)[0];
    if (!first) return;
    const firstStep = stepOf(first);
    if (firstStep !== null) setStep(firstStep);
    focusField.current = first;
    setFocusRequest((n) => n + 1);
  }

  function goToStep(target: number) {
    // Moving forward checks each step on the way, so nobody reaches Payment with an empty name.
    for (let index = step; index < target; index++) {
      const element = formRef.current?.querySelector(`[data-step="${index}"]`);
      const problems = element ? findProblems(element) : {};
      const count = Object.keys(problems).length;
      if (count) {
        showProblems(problems, fixMessage(count));
        return;
      }
    }
    setFormError(null);
    setStep(target);
    setFocusRequest((n) => n + 1);
  }

  function clearError(name: string) {
    if (!errors[name]) return;
    const next = { ...errors };
    delete next[name];
    setErrors(next);
    if (!Object.keys(next).length) setFormError(null);
  }

  /** Checks a field as the visitor leaves it, but only once they've typed something. */
  function checkOnLeave(target: EventTarget) {
    if (!isField(target) || !(target.name in LABELS) || target.type === "radio" || target.type === "file") return;
    if (!target.value.trim()) return;
    const problem = fieldProblem(target);
    if (problem) setErrors((previous) => ({ ...previous, [target.name]: problem }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // The Next button, or Enter in a field, moves on until the last step.
    if (!isLast) {
      goToStep(step + 1);
      return;
    }
    const formElement = event.currentTarget;

    const problems = findProblems(formElement);
    const count = Object.keys(problems).length;
    if (count) {
      showProblems(problems, fixMessage(count));
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
        showProblems({ [name]: "We couldn't read this file. Please choose it again." }, fixMessage(1));
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
      paymentAmount: amount,
      paymentCurrency: tier?.currency ?? "INR",
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
      <div className="mx-auto max-w-2xl rounded-2xl border-2 border-cyan bg-cyan-tint p-7 text-center sm:p-9">
        <h2 ref={doneHeading} tabIndex={-1} className="font-heading text-2xl text-ink outline-none sm:text-3xl">
          Registration received
        </h2>
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
            : `Haven't paid yet? Pay ${fee ?? "the fee"} to the account below, then reply to your confirmation email with the transaction ID and a screenshot of the payment.`}
        </p>
        {!done.paid && (
          <div className="mt-6 rounded-xl border border-border bg-white p-5 text-left">
            <BankDetails />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start lg:gap-8">
      <div className="min-w-0">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onChange={(e) => clearError((e.target as Element).getAttribute("name") ?? "")}
          onBlur={(e) => checkOnLeave(e.target)}
          noValidate
          className="relative scroll-mt-28 rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-8"
        >
          <nav aria-label="Registration steps">
            <ol className="grid grid-cols-3 gap-2 sm:gap-3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => goToStep(i)}
                    aria-current={i === step ? "step" : undefined}
                    className={`flex w-full flex-col gap-2 rounded-lg pb-1 text-left ${focusRing}`}
                  >
                    <span className={`h-1.5 w-full rounded-full ${i <= step ? "bg-red" : "bg-border"}`} />
                    <span className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          i < step ? "bg-red text-white" : i === step ? "border-2 border-red text-red" : "border-2 border-border text-ink-soft"
                        }`}
                      >
                        {i < step ? <CheckIcon size={14} /> : i + 1}
                      </span>
                      <span className={`text-xs font-semibold leading-tight sm:text-sm ${i === step ? "text-ink" : "text-ink-soft"}`}>
                        {s.title}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>

          {STEPS.map((s, i) => (
            <fieldset key={s.title} data-step={i} hidden={step !== i} className="mt-7 min-w-0">
              <legend
                ref={(el) => {
                  stepHeadings.current[i] = el;
                }}
                tabIndex={-1}
                className="font-heading text-2xl text-ink outline-none sm:text-[28px]"
              >
                <span className="mb-1 block font-sans text-sm font-semibold text-ink-soft">
                  Step {i + 1} of {STEPS.length}
                </span>
                {s.heading}
              </legend>
              {i < 2 ? (
                <p className="mb-6 mt-1 text-sm text-ink-soft">
                  Fields marked <span className="font-semibold text-red">*</span> are required.
                </p>
              ) : (
                <div className="mb-6" />
              )}

              {i === 0 && (
                <>
                  <Choices name="category" required error={errors.category}>
                    <p className="-mt-1 mb-3 text-sm text-ink-soft">
                      {earlyBird
                        ? `Early-bird rates until ${earlyBirdDeadline.label}.`
                        : "Early-bird rates have ended; standard rates apply."}
                    </p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {feeTiers.map((t) => (
                        <label key={t.category} className={`${choiceClass} p-3.5 sm:p-4`}>
                          <input
                            type="radio"
                            {...radio("category")}
                            value={t.category}
                            checked={category === t.category}
                            onChange={() => setCategory(t.category)}
                            required
                            className={radioClass}
                          />
                          <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-ink">
                            {t.category}
                          </span>
                          <span className="shrink-0 text-right">
                            <span className="block text-lg font-bold text-red">
                              {money(t.currency, earlyBird ? t.before : t.after)}
                            </span>
                            {earlyBird && (
                              <span className="block text-xs text-ink-soft">
                                then {money(t.currency, t.after)}
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </Choices>

                  <Choices name="presentationType" required className="mt-7" error={errors.presentationType}>
                    <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap">
                      {PRESENTATIONS.map(([value, label]) => (
                        <label key={value} className={`${choiceClass} h-12 justify-center gap-2 rounded-full px-2 sm:justify-start sm:gap-3 sm:px-4`}>
                          <input
                            type="radio"
                            {...radio("presentationType")}
                            value={value}
                            checked={presentationType === value}
                            onChange={() => setPresentationType(value)}
                            required
                            className={radioClass}
                          />
                          <span className="font-medium text-ink">{label}</span>
                        </label>
                      ))}
                    </div>
                  </Choices>

                  {presenting && (
                    <div className="mt-5 grid gap-5">
                      <Field name="paperTitle" error={errors.paperTitle}>
                        <input {...control("paperTitle")} enterKeyHint="next" className={inputClass} />
                      </Field>
                      <Field
                        name="abstract"
                        note={`${FILES.abstract.described}, up to ${MAX_FILE_MB} MB. Not ready yet? You can email it to ${conference.submissionEmail} later.`}
                        error={errors.abstract}
                      >
                        <input
                          {...control("abstract", true)}
                          type="file"
                          accept={FILES.abstract.types.join(",")}
                          className={fileInputClass}
                        />
                      </Field>
                    </div>
                  )}

                  <label className={`${choiceClass} mt-7 p-4`}>
                    <input
                      type="checkbox"
                      checked={accommodationNeeded}
                      onChange={(e) => setAccommodationNeeded(e.target.checked)}
                      className={radioClass}
                    />
                    <span className="font-medium text-ink">I need on-campus accommodation</span>
                  </label>
                </>
              )}

              {i === 1 && (
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field name="name" required error={errors.name}>
                    <input
                      {...control("name")}
                      required
                      minLength={2}
                      autoComplete="name"
                      enterKeyHint="next"
                      className={inputClass}
                    />
                  </Field>
                  <Field name="designation" required error={errors.designation}>
                    <input
                      {...control("designation")}
                      required
                      minLength={2}
                      autoComplete="organization-title"
                      enterKeyHint="next"
                      className={inputClass}
                    />
                  </Field>
                  <Field name="email" required note="Your confirmation is sent here." error={errors.email}>
                    <input
                      {...control("email", true)}
                      type="email"
                      required
                      autoComplete="email"
                      autoCapitalize="off"
                      spellCheck={false}
                      enterKeyHint="next"
                      className={inputClass}
                    />
                  </Field>
                  <Field name="phone" required error={errors.phone}>
                    <input
                      {...control("phone")}
                      type="tel"
                      required
                      minLength={6}
                      autoComplete="tel"
                      enterKeyHint="next"
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
                  <Choices name="gender" error={errors.gender} className="sm:col-span-2">
                    <div className="flex flex-wrap gap-2">
                      {GENDERS.map(([value, label]) => (
                        <label key={label} className={`${choiceClass} h-12 rounded-full px-4`}>
                          <input type="radio" {...radio("gender")} value={value} className={radioClass} />
                          <span className="font-medium text-ink">{label}</span>
                        </label>
                      ))}
                    </div>
                  </Choices>
                </div>
              )}

              {i === 2 && (
                <>
                  <div className="rounded-xl border border-border bg-wash p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-sm font-semibold text-ink-mid">Amount to pay</span>
                      <span className="font-heading text-3xl font-bold text-red" aria-live="polite">
                        {fee ?? "—"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-soft">
                      {tier ? tier.category : "Choose a category in step 1."}
                    </p>
                    <div className="mt-5 border-t border-border pt-5">
                      <BankDetails />
                    </div>
                  </div>

                  <p className="mt-6 text-base text-ink-mid">
                    <strong className="text-ink">Already paid?</strong> Add the details below.{" "}
                    <strong className="text-ink">Not yet?</strong> Leave them empty and submit; you can
                    send them later by replying to your confirmation email.
                  </p>

                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <Field name="transactionId" error={errors.transactionId}>
                      <input {...control("transactionId")} autoComplete="off" spellCheck={false} className={inputClass} />
                    </Field>
                    <Field name="paymentDate" error={errors.paymentDate}>
                      <input {...control("paymentDate")} type="date" className={inputClass} />
                    </Field>
                    <Field name="bankName" error={errors.bankName}>
                      <input {...control("bankName")} className={inputClass} />
                    </Field>
                    <Field
                      name="proof"
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
                </>
              )}
            </fieldset>
          ))}

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

          <div className="mt-8 flex items-center gap-3 border-t border-border pt-6">
            {step > 0 && (
              <button
                type="button"
                onClick={() => goToStep(step - 1)}
                className={`inline-flex h-12 items-center gap-2 rounded-xl px-4 text-base font-semibold text-ink hover:bg-black/5 sm:h-14 ${focusRing}`}
              >
                <ArrowLeftIcon size={20} /> Back
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className={`ml-auto inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-red px-6 text-base font-semibold text-white hover:bg-red-dark disabled:opacity-60 sm:h-14 sm:flex-none sm:px-8 sm:text-lg ${focusRing}`}
            >
              {isLast ? (
                submitting ? "Submitting…" : "Submit registration"
              ) : (
                <>
                  Next: {STEPS[step + 1].title} <ArrowRightIcon size={20} />
                </>
              )}
            </button>
          </div>
        </form>

        <details className="group mt-4 rounded-2xl border border-border bg-white">
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl p-5 font-semibold text-ink ${focusRing}`}>
            Just need the bank details?
            <ArrowRightIcon size={20} className="shrink-0 transition-transform group-open:rotate-90" />
          </summary>
          <div className="px-5 pb-5">
            <BankDetails />
          </div>
        </details>

        <div className="mt-6 lg:hidden">
          <Help />
        </div>
      </div>

      <aside className="hidden lg:sticky lg:top-28 lg:block" aria-label="Registration summary">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl text-ink">Your registration</h2>
          <dl className="mt-4 grid gap-3 text-sm">
            <div>
              <dt className="text-ink-soft">Category</dt>
              <dd className="font-semibold text-ink">{tier ? tier.category : "Not chosen yet"}</dd>
            </div>
            <div>
              <dt className="text-ink-soft">Presentation</dt>
              <dd className="font-semibold text-ink">
                {PRESENTATIONS.find(([value]) => value === presentationType)?.[2]}
              </dd>
            </div>
            <div>
              <dt className="text-ink-soft">Accommodation</dt>
              <dd className="font-semibold text-ink">{accommodationNeeded ? "Needed" : "Not needed"}</dd>
            </div>
          </dl>
          <div className="mt-5 border-t border-border pt-4">
            <div className="text-sm text-ink-soft">Fee</div>
            <div className="font-heading text-3xl font-bold text-red">{fee ?? "—"}</div>
            {tier && (
              <div className="mt-1 text-xs text-ink-soft">
                {earlyBird ? `Early-bird rate until ${earlyBirdDeadline.short}` : "Standard rate"}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-white p-6">
          <Help />
        </div>
      </aside>
    </div>
  );
}
