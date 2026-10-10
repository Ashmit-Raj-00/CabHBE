import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { RegistrationActions } from "@/components/admin/RegistrationActions";

type SearchParams = { status?: string; q?: string };

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  VERIFIED: "bg-emerald-100 text-emerald-800",
  REJECTED: "bg-red-tint text-red",
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status = "ALL", q = "" } = await searchParams;

  const registrations = await prisma.registration.findMany({
    where: {
      ...(status !== "ALL" ? { paymentStatus: status as "PENDING" | "VERIFIED" | "REJECTED" } : {}),
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: "insensitive" } },
              { email: { contains: q, mode: "insensitive" } },
              { transactionId: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  const counts = await prisma.registration.groupBy({
    by: ["paymentStatus"],
    _count: true,
  });
  const countFor = (s: string) => counts.find((c) => c.paymentStatus === s)?._count ?? 0;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl text-ink">Registrations</h1>
          <p className="mt-1 text-ink-soft">
            {registrations.length} shown · {countFor("PENDING")} pending · {countFor("VERIFIED")} verified ·{" "}
            {countFor("REJECTED")} rejected
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/registrations/export"
            className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-ink-mid hover:border-ink hover:text-ink"
          >
            Export CSV
          </a>
          <LogoutButton />
        </div>
      </div>

      <form method="get" className="mb-6 flex flex-wrap gap-3">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search name, email, transaction ID…"
          className="h-11 w-72 rounded-lg border border-border px-4 text-sm outline-none focus:border-red"
        />
        <select
          name="status"
          defaultValue={status}
          className="h-11 rounded-lg border border-border px-3 text-sm outline-none focus:border-red"
        >
          <option value="ALL">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="VERIFIED">Verified</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <button
          type="submit"
          className="h-11 rounded-lg bg-red px-5 text-sm font-semibold text-white hover:bg-red-dark"
        >
          Filter
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-bg text-ink-mid">
            <tr>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Contact</th>
              <th className="px-4 py-3 font-semibold">Payment</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Submitted</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="font-semibold text-ink">{r.name}</div>
                  <div className="text-ink-soft">{r.designation}</div>
                </td>
                <td className="px-4 py-3 text-ink-mid">{r.category}</td>
                <td className="px-4 py-3 text-ink-mid">
                  <div>{r.email}</div>
                  <div>{r.phone}</div>
                </td>
                <td className="px-4 py-3 text-ink-mid">
                  <div>
                    {r.paymentCurrency === "INR" ? "₹" : "$"}
                    {r.paymentAmount}
                  </div>
                  {r.transactionId && <div className="text-xs text-ink-soft">Txn: {r.transactionId}</div>}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[r.paymentStatus]}`}>
                    {r.paymentStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-soft">{r.createdAt.toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <RegistrationActions id={r.id} status={r.paymentStatus} />
                </td>
              </tr>
            ))}
            {registrations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-ink-soft">
                  No registrations match this filter yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
