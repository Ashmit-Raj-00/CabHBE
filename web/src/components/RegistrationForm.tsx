"use client";

import { useMemo, useState, type FormEvent } from "react";
import { earlyBirdDeadline, feeTiers, registrationCategories } from "@/lib/data";

const inputClass =
  "h-13 w-full min-w-0 rounded-lg border border-border bg-white px-4 text-base outline-none focus:border-red";
const labelClass = "text-sm font-semibold text-ink";

function feeForCategory(category: string) {
  const isEarlyBird = Date.now() <= new Date(earlyBirdDeadline.iso).getTime();
  const tier = feeTiers.find((f) => f.category === category);
  if (!tier) return { amount: "", currency: "INR" as const };
  return { amount: isEarlyBird ? tier.before : tier.after, currency: tier.currency };
}

export function RegistrationForm() {
  const [category, setCategory] = useState(registrationCategories[0]);
  const [presentationType, setPresentationType] = useState<"NOT_PRESENTING" | "ORAL" | "POSTER">(
    "NOT_PRESENTING"
  );
  const [accommodationNeeded, setAccommodationNeeded] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fee = useMemo(() => feeForCategory(category), [category]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
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
    };

    const res = await fetch("/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
      return;
    }

    setStatus("success");
    event.currentTarget.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border-2 border-cyan bg-cyan-tint p-9 text-center">
        <h3 className="font-heading text-2xl text-ink">Registration received</h3>
        <p className="mx-auto mt-3 max-w-md text-lg text-ink-mid">
          Thank you — your registration has been recorded. The organizing committee will verify
          your payment and confirm by email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-white p-5 sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Full Name</span>
          <input name="name" required className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Designation</span>
          <input name="designation" required className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Gender</span>
          <select name="gender" className={inputClass} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Phone / WhatsApp</span>
          <input name="phone" type="tel" required className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={labelClass}>Email</span>
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={labelClass}>Address</span>
          <textarea name="address" required rows={2} className={`${inputClass} h-auto py-3`} />
        </label>

        <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={labelClass}>Registration Category</span>
          <select
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
        </label>

        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Presentation</span>
          <select
            value={presentationType}
            onChange={(e) => setPresentationType(e.target.value as typeof presentationType)}
            className={inputClass}
          >
            <option value="NOT_PRESENTING">Not Presenting</option>
            <option value="ORAL">Oral</option>
            <option value="POSTER">Poster</option>
          </select>
        </label>

        {presentationType !== "NOT_PRESENTING" && (
          <label className="flex min-w-0 flex-col gap-1.5">
            <span className={labelClass}>Paper / Abstract Title</span>
            <input name="paperTitle" className={inputClass} />
          </label>
        )}

        <label className="flex items-center gap-3 sm:col-span-2">
          <input
            type="checkbox"
            checked={accommodationNeeded}
            onChange={(e) => setAccommodationNeeded(e.target.checked)}
            className="h-5 w-5 accent-red"
          />
          <span className="text-base text-ink-mid">I need on-campus accommodation</span>
        </label>
      </div>

      <div className="my-7 rounded-xl border border-border bg-bg p-5">
        <div className="text-sm font-semibold text-ink-mid">Applicable registration fee</div>
        <div className="font-heading mt-1 text-2xl font-bold text-red">
          {fee.currency === "INR" ? "₹" : "$"}
          {fee.amount}
        </div>
        <p className="mt-1 text-sm text-ink-soft">
          Based on today&apos;s date and the early-bird cutoff of {earlyBirdDeadline.label}. Pay
          using the bank details below, then enter your transaction reference.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Transaction ID (after payment)</span>
          <input name="transactionId" className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5">
          <span className={labelClass}>Transaction Date</span>
          <input name="paymentDate" type="date" className={inputClass} />
        </label>
        <label className="flex min-w-0 flex-col gap-1.5 sm:col-span-2">
          <span className={labelClass}>Bank Used</span>
          <input name="bankName" className={inputClass} />
        </label>
      </div>

      {errorMessage && <p className="mt-4 text-base font-semibold text-red">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-7 h-14 w-full rounded-xl bg-red text-lg font-semibold text-white hover:bg-red-dark disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {status === "submitting" ? "Submitting…" : "Submit Registration"}
      </button>
    </form>
  );
}
