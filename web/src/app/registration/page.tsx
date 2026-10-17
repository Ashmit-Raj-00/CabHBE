import type { Metadata } from "next";
import { PageHero, Section } from "@/components/Section";
import { RegistrationForm } from "@/components/RegistrationForm";
import { earlyBirdDeadline } from "@/content";

export const metadata: Metadata = {
  title: "Registration — CABHBE-26",
};

export default function RegistrationPage() {
  return (
    <>
      <PageHero
        eyebrow="Registration"
        title="Register for CABHBE-26"
        subtitle={`Three short steps. Early-bird rates apply until ${earlyBirdDeadline.label}.`}
      />

      <Section className="bg-wash">
        <RegistrationForm />
      </Section>
    </>
  );
}
