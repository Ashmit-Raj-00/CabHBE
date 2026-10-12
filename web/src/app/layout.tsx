import type { Metadata } from "next";
import { Lora, Work_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackgroundBlobs } from "@/components/BackgroundBlobs";
import { BackToTop } from "@/components/BackToTop";
import { event, settings } from "@/content";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = settings.siteUrl;
const title = "CABHBE-26 — International Conference on Biotechnology";
const description = `${event.fullName}. ${event.dates}, ${event.venue}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "CABHBE-26",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${lora.variable} ${workSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans text-ink">
        <BackgroundBlobs />
        <Header />
        <main className="flex-1">{children}</main>
        <BackToTop />
        <Footer />
      </body>
    </html>
  );
}
