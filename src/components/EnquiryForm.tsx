"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, CircleAlert, ImagePlus, LoaderCircle, X } from "lucide-react";
import { locations, site, whatsappLink } from "@/data/site";
import WhatsAppIcon from "./WhatsAppIcon";

export const projectTypes = [
  "Modular kitchen",
  "Wardrobe",
  "Walk-in wardrobe",
  "Custom stainless-steel solution",
  "Bespoke interior details",
  "Complete home interiors",
  "Not sure yet",
];

const budgets = [
  "Under ₹2 lakh",
  "₹2 – 5 lakh",
  "₹5 – 10 lakh",
  "₹10 – 20 lakh",
  "Above ₹20 lakh",
  "Prefer to discuss",
];

const MAX_FILES = 3;
const MAX_FILE_MB = 5;

type Values = {
  name: string;
  phone: string;
  studio: string;
  project: string;
  dimensions: string;
  budget: string;
  notes: string;
};
type Field = keyof Values | "files";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "sent" | "handoff" | "error";

const empty: Values = {
  name: "",
  phone: "",
  studio: "",
  project: "",
  dimensions: "",
  budget: "",
  notes: "",
};

// Accepts 10-digit Indian mobile numbers, with or without +91 / 0.
function normalisePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

function validate(v: Values, files: File[]): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[6-9]\d{9}$/.test(normalisePhone(v.phone)))
    e.phone = "Enter a 10-digit mobile number, for example 98765 43210.";
  if (!v.studio) e.studio = "Choose the studio nearest to you.";
  if (!v.project) e.project = "Select the type of project.";
  if (files.length > MAX_FILES) e.files = `Please attach up to ${MAX_FILES} images.`;
  else if (files.some((f) => !f.type.startsWith("image/")))
    e.files = "Reference files must be images (JPG, PNG, HEIC or WebP).";
  else if (files.some((f) => f.size > MAX_FILE_MB * 1024 * 1024))
    e.files = `Each image must be smaller than ${MAX_FILE_MB} MB.`;
  return e;
}

// The enquiry as a WhatsApp message, used when there is no form endpoint
// and as a follow-up option after submitting.
function summary(v: Values) {
  const details = [
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Preferred studio: ${v.studio}`,
    `Project type: ${v.project}`,
    v.dimensions.trim() && `Dimensions / requirements: ${v.dimensions.trim()}`,
    v.budget && `Budget range: ${v.budget}`,
    v.notes.trim() && `Notes: ${v.notes.trim()}`,
  ].filter(Boolean);
  return `Hello Sahyadri Steel Studio, I would like to enquire about a customised interior project.\n\n${details.join("\n")}`;
}

const label = "block text-[11px] font-semibold uppercase tracking-[0.18em] text-muted";
const input =
  "mt-2 w-full border-0 border-b border-line-strong bg-transparent px-0 py-3 text-base outline-none transition-colors placeholder:text-graphite/30 focus:border-graphite aria-[invalid=true]:border-error";
const chip =
  "inline-flex min-h-11 items-center border border-line-strong px-4 text-[13px] transition-colors hover:border-graphite peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-[13px] text-error">
      <CircleAlert size={14} className="mt-[3px] shrink-0" />
      {message}
    </p>
  );
}

export default function EnquiryForm() {
  const [values, setValues] = useState<Values>(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentName, setSentName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Contextual CTAs elsewhere on the page (e.g. "Design Your Wardrobe")
  // carry data attributes that preselect the matching options here.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-enquiry-project], [data-enquiry-studio]"
      );
      if (!link) return;
      const { enquiryProject, enquiryStudio } = link.dataset;
      setValues((v) => ({
        ...v,
        ...(enquiryProject && { project: enquiryProject }),
        ...(enquiryStudio && { studio: enquiryStudio }),
      }));
      setStatus((s) => (s === "sent" || s === "handoff" ? "idle" : s));
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (status === "sent" || status === "handoff") statusRef.current?.focus();
  }, [status]);

  const set = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next, files));
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values, files));
  };

  const errorFor = (field: Field) => (touched[field] ? errors[field] : undefined);

  const a11y = (field: Field) => ({
    "aria-invalid": Boolean(errorFor(field)),
    "aria-describedby": errorFor(field) ? `err-${field}` : undefined,
  });

  function addFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files, ...Array.from(list)];
    setFiles(next);
    setTouched((t) => ({ ...t, files: true }));
    setErrors(validate(values, next));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values, files);
    setErrors(found);
    setTouched({ name: true, phone: true, studio: true, project: true, files: true });

    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      formRef.current
        ?.querySelector<HTMLElement>(`[data-field="${first}"]`)
        ?.focus();
      return;
    }

    // Honeypot: real visitors never see or fill this field.
    const trap = new FormData(e.currentTarget).get("website");
    if (trap) {
      setStatus("sent");
      return;
    }

    setSentName(values.name.trim().split(" ")[0]);

    if (!site.formEndpoint) {
      window.open(whatsappLink(summary(values)), "_blank", "noopener,noreferrer");
      setStatus("handoff");
      return;
    }

    setStatus("sending");
    const fields: Record<string, string> = {
      name: values.name.trim(),
      phone: normalisePhone(values.phone),
      city: values.studio,
      studio: values.studio,
      project: values.project,
      dimensions: values.dimensions.trim(),
      budget: values.budget,
      message: values.notes.trim(),
      page: window.location.href,
    };

    try {
      let body: URLSearchParams | FormData;
      if (site.formAcceptsFiles && files.length) {
        const fd = new FormData();
        Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
        files.forEach((f) => fd.append("images", f));
        body = fd;
      } else {
        body = new URLSearchParams(fields);
      }
      // no-cors: Apps Script can't return CORS headers, so the reply can't be
      // read. A network failure throws; otherwise the request was delivered.
      await fetch(site.formEndpoint, { method: "POST", mode: "no-cors", body });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues(empty);
    setFiles([]);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  if (status === "sent" || status === "handoff") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col justify-center border border-line bg-ivory p-8 outline-none sm:p-12 lg:min-h-[560px]"
      >
        <span className="steel-rule w-16" aria-hidden="true" />
        <p className="display mt-8 text-5xl">
          Thank you{sentName ? `, ${sentName}` : ""}.
        </p>
        <p className="mt-5 max-w-[440px] text-[15px] leading-7 text-muted">
          {status === "sent"
            ? "Your enquiry has been submitted. Our team will get in touch on the number you shared."
            : "We have opened WhatsApp with your enquiry ready to go. Press send in WhatsApp to deliver it to our team."}
        </p>
        {status === "sent" && (
          <p className="mt-3 max-w-[440px] text-[15px] leading-7 text-muted">
            Have photos, a floor plan or inspiration images? Send them on
            WhatsApp so we can prepare for our conversation.
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href={whatsappLink(summary(values))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <WhatsAppIcon size={17} />
            {status === "sent" ? "Continue on WhatsApp" : "Open WhatsApp again"}
          </a>
          <button type="button" onClick={reset} className="link-line">
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).some((k) => touched[k as Field]);

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby="contact-title"
      className="relative border border-line bg-ivory p-6 sm:p-10 lg:p-12"
    >
      {/* Honeypot: hidden from people, bots fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
        <div>
          <label htmlFor="f-name" className={label}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input
            id="f-name"
            data-field="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            onBlur={() => blur("name")}
            className={input}
            {...a11y("name")}
          />
          <FieldError id="err-name" message={errorFor("name")} />
        </div>

        <div>
          <label htmlFor="f-phone" className={label}>
            Phone number <span aria-hidden="true">*</span>
          </label>
          <input
            id="f-phone"
            data-field="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={20}
            required
            placeholder="98765 43210"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            onBlur={() => blur("phone")}
            className={input}
            {...a11y("phone")}
          />
          <FieldError id="err-phone" message={errorFor("phone")} />
        </div>

        <fieldset className="sm:col-span-2" aria-describedby={errorFor("studio") ? "err-studio" : undefined}>
          <legend className={label}>
            Preferred studio <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {locations.map((loc, i) => (
              <label key={loc.slug} className="cursor-pointer">
                <input
                  type="radio"
                  name="studio"
                  value={loc.city}
                  checked={values.studio === loc.city}
                  onChange={() => set("studio", loc.city)}
                  onBlur={() => blur("studio")}
                  data-field={i === 0 ? "studio" : undefined}
                  className="peer sr-only"
                  required
                />
                <span className="flex min-h-16 items-center justify-between border border-line-strong px-5 font-serif text-xl transition-colors hover:border-graphite peer-checked:border-graphite peer-checked:bg-graphite peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-champagne-ink">
                  {loc.city}
                  <span className="hidden font-sans text-[10px] uppercase tracking-[0.18em] opacity-60 sm:inline">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </label>
            ))}
          </div>
          <FieldError id="err-studio" message={errorFor("studio")} />
        </fieldset>

        <fieldset className="sm:col-span-2" aria-describedby={errorFor("project") ? "err-project" : undefined}>
          <legend className={label}>
            Project type <span aria-hidden="true">*</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {projectTypes.map((p, i) => (
              <label key={p} className="cursor-pointer">
                <input
                  type="radio"
                  name="project"
                  value={p}
                  checked={values.project === p}
                  onChange={() => set("project", p)}
                  onBlur={() => blur("project")}
                  data-field={i === 0 ? "project" : undefined}
                  className="peer sr-only"
                  required
                />
                <span className={chip}>{p}</span>
              </label>
            ))}
          </div>
          <FieldError id="err-project" message={errorFor("project")} />
        </fieldset>

        <div className="sm:col-span-2">
          <label htmlFor="f-dimensions" className={label}>
            Approximate dimensions or requirements
          </label>
          <textarea
            id="f-dimensions"
            rows={2}
            maxLength={600}
            placeholder="e.g. L-shaped kitchen, roughly 10 ft × 8 ft, with a tall pantry unit"
            value={values.dimensions}
            onChange={(e) => set("dimensions", e.target.value)}
            className={`${input} resize-y`}
          />
        </div>

        <div>
          <label htmlFor="f-budget" className={label}>
            Budget range <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="f-budget"
              value={values.budget}
              onChange={(e) => set("budget", e.target.value)}
              className={`${input} appearance-none pr-8`}
            >
              <option value="">Select a range</option>
              {budgets.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-0 top-[calc(50%+4px)] -translate-y-1/2 text-muted" />
          </div>
        </div>

        <div>
          <span className={label}>Reference images</span>
          {site.formAcceptsFiles ? (
            <>
              <label
                htmlFor="f-files"
                className="mt-2 flex min-h-[52px] cursor-pointer items-center gap-3 border-b border-dashed border-line-strong py-3 text-[14px] text-muted transition-colors hover:text-graphite"
              >
                <ImagePlus size={18} strokeWidth={1.5} />
                Add up to {MAX_FILES} images ({MAX_FILE_MB} MB each)
              </label>
              <input
                id="f-files"
                data-field="files"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
                className="sr-only"
                {...a11y("files")}
              />
              {files.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {files.map((f, i) => (
                    <li key={f.name + i} className="flex items-center justify-between gap-3 text-[13px]">
                      <span className="truncate">{f.name}</span>
                      <button
                        type="button"
                        aria-label={`Remove ${f.name}`}
                        onClick={() => {
                          const next = files.filter((_, j) => j !== i);
                          setFiles(next);
                          setErrors(validate(values, next));
                        }}
                        className="flex h-8 w-8 shrink-0 items-center justify-center text-muted hover:text-graphite"
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <FieldError id="err-files" message={errorFor("files")} />
            </>
          ) : (
            <p className="mt-2 border-b border-dashed border-line-strong py-3 text-[14px] leading-6 text-muted">
              Share photos, plans or inspiration on{" "}
              <a
                href={whatsappLink(
                  "Hello Sahyadri Steel Studio, I would like to share some reference images for my project."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-graphite underline decoration-line-strong underline-offset-4 hover:decoration-graphite"
              >
                WhatsApp
              </a>
              .
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="f-notes" className={label}>
            Additional notes
          </label>
          <textarea
            id="f-notes"
            rows={3}
            maxLength={1000}
            placeholder="Timeline, style preferences, anything else we should know"
            value={values.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={`${input} resize-y`}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[360px] text-[12px] leading-5 text-muted">
          We use your details only to respond to this enquiry. See our{" "}
          <Link href="/privacy" className="underline underline-offset-4 hover:text-graphite">
            privacy note
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-dark shrink-0 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              Sending
              <LoaderCircle size={16} className="animate-spin" />
            </>
          ) : site.formEndpoint ? (
            <>
              Send enquiry
              <ArrowRight size={16} strokeWidth={1.6} />
            </>
          ) : (
            <>
              Continue on WhatsApp
              <WhatsAppIcon size={16} />
            </>
          )}
        </button>
      </div>

      <div aria-live="assertive" className="mt-4">
        {hasErrors && status !== "sending" && (
          <p className="text-[13px] text-error">Please check the highlighted fields above.</p>
        )}
        {status === "error" && (
          <p className="text-[13px] text-error">
            We couldn&rsquo;t send your enquiry. Please check your connection and
            try again, or{" "}
            <a
              href={whatsappLink(summary(values))}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              send it on WhatsApp instead
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
