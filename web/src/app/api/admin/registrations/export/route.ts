import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const registrations = await prisma.registration.findMany({ orderBy: { createdAt: "desc" } });

  const headers = [
    "Name",
    "Designation",
    "Email",
    "Phone",
    "Category",
    "Presentation Type",
    "Paper Title",
    "Accommodation Needed",
    "Amount",
    "Currency",
    "Transaction ID",
    "Transaction Date",
    "Bank",
    "Payment Status",
    "Submitted At",
  ];

  const rows = registrations.map((r) =>
    [
      r.name,
      r.designation,
      r.email,
      r.phone,
      r.category,
      r.presentationType,
      r.paperTitle ?? "",
      r.accommodationNeeded ? "Yes" : "No",
      r.paymentAmount,
      r.paymentCurrency,
      r.transactionId ?? "",
      r.paymentDate ? r.paymentDate.toISOString().slice(0, 10) : "",
      r.bankName ?? "",
      r.paymentStatus,
      r.createdAt.toISOString(),
    ]
      .map((v) => csvEscape(String(v)))
      .join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="cabhbe26-registrations.csv"`,
    },
  });
}
