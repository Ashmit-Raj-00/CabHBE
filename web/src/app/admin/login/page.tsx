"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { DnaIcon } from "@/components/icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Unable to sign in.");
      setSubmitting(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-white p-9">
        <div className="mb-7 flex items-center gap-3">
          <DnaIcon size={34} className="text-red" />
          <div>
            <div className="font-heading text-xl font-bold text-ink">CABHBE-26 Admin</div>
            <div className="text-sm text-ink-soft">Organizing committee sign in</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-lg border border-border px-4 text-base outline-none focus:border-red"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold text-ink">Password</span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-lg border border-border px-4 text-base outline-none focus:border-red"
            />
          </label>

          {error && <p className="text-sm font-semibold text-red">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 h-12 rounded-lg bg-red text-base font-semibold text-white hover:bg-red-dark disabled:opacity-60"
          >
            {submitting ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
