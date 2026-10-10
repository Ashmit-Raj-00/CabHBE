import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { registrationCategories } from "@/lib/data";

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

  const data = parsed.data;

  const registration = await prisma.registration.create({
    data: {
      name: data.name,
      designation: data.designation,
      gender: data.gender,
      address: data.address,
      phone: data.phone,
      email: data.email,
      category: data.category,
      presentationType: data.presentationType,
      paperTitle: data.paperTitle,
      accommodationNeeded: data.accommodationNeeded,
      paymentAmount: data.paymentAmount,
      paymentCurrency: data.paymentCurrency,
      transactionId: data.transactionId,
      paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
      bankName: data.bankName,
    },
  });

  return NextResponse.json({ id: registration.id }, { status: 201 });
}
