"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { site, whatsappUrl } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full border border-border bg-background px-4 py-3.5 text-base outline-none transition-colors focus:border-accent sm:py-3 sm:text-sm";
const label =
  "mb-2 block text-[11px] font-medium tracking-[0.12em] uppercase text-muted";
const chip =
  "inline-block border border-border bg-background px-3.5 py-3 text-[13px] transition-colors hover:border-accent peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent sm:py-2.5 sm:text-xs";
const cityOptions = ["Shimoga", "Udupi", "Somewhere else"];
const projectOptions = [
  "Modular kitchen",
  "Wardrobes & storage",
  "Interior upgrade",
  "Full home interiors",
  "Not sure yet",
];
const stageOptions = [
  "New construction",
  "Renovating existing home",
  "Just exploring",
];
const callTimeOptions = ["Morning", "Afternoon", "Evening", "WhatsApp only"];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const phone = String(data.get("phone") || "").replace(/\D/g, "");
    const digits = phone.length > 10 ? phone.slice(-10) : phone;
    if (digits.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const projects = data.getAll("project").map(String);
    if (projects.length === 0) {
      setError("Please select at least one option under 'I am looking for'.");
      return;
    }

    setError("");
    setStatus("sending");

    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, String(value)));
    body.delete("project");
    body.set("project", projects.join(", "));
    body.set("page", window.location.href);

    try {
      // no-cors: Apps Script can't return CORS headers, so the reply can't be
      // read. A network failure throws; otherwise we treat it as sent.
      await fetch(site.formEndpoint, { method: "POST", mode: "no-cors", body });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col justify-center border border-border bg-background p-8 sm:p-10 lg:min-h-[420px]">
        <p className="font-serif text-4xl tracking-[-0.03em]">Thank you.</p>
        <p className="mt-4 max-w-[420px] text-sm leading-7 text-muted">
          We have your details and will get back to you shortly. If it is
          urgent, you can also message us on WhatsApp.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center bg-foreground px-5 py-3 text-xs font-medium text-white transition-colors hover:bg-accent"
          >
            Open WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="border-b border-foreground pb-1 text-xs font-medium"
          >
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative border border-border bg-background p-5 sm:p-9"
    >
      {/* Honeypot: hidden from people, bots fill it */}
      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Your name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            className={field}
          />
        </div>

        <div>
          <label htmlFor="phone" className={label}>
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={20}
            autoComplete="tel"
            inputMode="tel"
            placeholder="10-digit mobile number"
            className={field}
          />
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={label}>City *</legend>
          <div className="flex flex-wrap gap-2">
            {cityOptions.map((c, i) => (
              <label key={c} className="cursor-pointer">
                <input
                  type="radio"
                  name="city"
                  value={c}
                  required={i === 0}
                  className="peer sr-only"
                />
                <span className={chip}>{c}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="sm:col-span-2">
          <legend className={label}>
            I am looking for *{" "}
            <span className="normal-case tracking-normal">
              (select all that apply)
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {projectOptions.map((opt) => (
              <label key={opt} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="project"
                  value={opt}
                  className="peer sr-only"
                />
                <span className={chip}>{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <details className="group sm:col-span-2">
          <summary className="cursor-pointer list-none border-b border-foreground/20 py-3 text-xs font-medium text-muted [&::-webkit-details-marker]:hidden">
            + Add more details (optional)
          </summary>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="stage" className={label}>
                Project stage
              </label>
              <div className="relative">
                <select
                  id="stage"
                  name="stage"
                  defaultValue=""
                  className={`${field} appearance-none pr-10`}
                >
                  <option value="">Select (optional)</option>
                  {stageOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <div>
              <label htmlFor="calltime" className={label}>
                Best time to reach you
              </label>
              <div className="relative">
                <select
                  id="calltime"
                  name="calltime"
                  defaultValue=""
                  className={`${field} appearance-none pr-10`}
                >
                  <option value="">Select (optional)</option>
                  {callTimeOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>
        </details>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          Tell us more (optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          maxLength={800}
          className={field}
          placeholder="Room sizes, timeline, anything helpful"
        />
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          Something went wrong. Please try again, or message us on WhatsApp.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex min-h-12 items-center gap-4 bg-foreground px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send enquiry"}
        <ArrowRight size={15} />
      </button>

      <p className="mt-4 text-[11px] leading-5 text-muted">
        Fields marked * are required. We will use your details only to reply to
        this enquiry.
      </p>
    </form>
  );
}
