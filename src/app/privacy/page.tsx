import type { Metadata } from "next";
import { site, whatsappUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Sahyadri Steel Studio handles the details you share through this website.",
};

// PLACEHOLDER: replace with a privacy policy reviewed for the business
// before launch. Keep it consistent with how enquiries are actually stored.
export default function PrivacyPage() {
  return (
    <main className="pb-24 pt-[calc(var(--header-height)+64px)] sm:pb-32">
      <div className="shell max-w-[760px]">
        <p className="eyebrow text-muted">Privacy</p>
        <h1 className="display h-lg mt-6">
          Your details, <em>handled with care.</em>
        </h1>
        <p className="mt-6 inline-block border border-dashed border-champagne-ink/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-champagne-ink">
          Placeholder · full policy to be published
        </p>

        <div className="mt-12 space-y-8 text-[15px] leading-7 text-muted">
          <section>
            <h2 className="font-serif text-2xl text-graphite">What we collect</h2>
            <p className="mt-3">
              When you send an enquiry, we receive the details you enter in the
              form: your name, phone number, preferred studio, project type and
              any notes about your project.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-graphite">How we use it</h2>
            <p className="mt-3">
              We use these details only to respond to your enquiry and to
              discuss your project with you.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-graphite">WhatsApp and Instagram</h2>
            <p className="mt-3">
              If you contact us on WhatsApp or Instagram, those conversations
              are also subject to the privacy policies of those services.
            </p>
          </section>
          <section>
            <h2 className="font-serif text-2xl text-graphite">Questions</h2>
            <p className="mt-3">
              To ask about or remove the details you have shared, message us on{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite underline underline-offset-4"
              >
                WhatsApp ({site.whatsappDisplay})
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
