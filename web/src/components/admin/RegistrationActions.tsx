"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Status = "PENDING" | "VERIFIED" | "REJECTED";

export function RegistrationActions({ id, status }: { id: string; status: Status }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function setStatus(next: Status) {
    setError(null);
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus: next }),
    });
    if (!res.ok) {
      setError("Update failed.");
      return;
    }
    startTransition(() => router.refresh());
  }

  return (
    <div className="flex flex-col items-end gap-1.5">
      <div className="flex gap-2">
        <button
          onClick={() => setStatus("VERIFIED")}
          disabled={isPending || status === "VERIFIED"}
          className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
        >
          Verify
        </button>
        <button
          onClick={() => setStatus("REJECTED")}
          disabled={isPending || status === "REJECTED"}
          className="rounded-lg bg-red px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-40"
        >
          Reject
        </button>
        {status !== "PENDING" && (
          <button
            onClick={() => setStatus("PENDING")}
            disabled={isPending}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-ink-mid disabled:opacity-40"
          >
            Reset
          </button>
        )}
      </div>
      {error && <span className="text-xs font-semibold text-red">{error}</span>}
    </div>
  );
}
