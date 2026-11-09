import { NextResponse } from "next/server";
import { isValidPhone, normalisePhone } from "@/lib/enquiry";
import { locations, site } from "@/data/site";

// Receives the enquiry form, checks it, and passes it to the studio's Google
// Apps Script on the server. The browser gets a real answer, so the page only
// says "sent" when the hand-over worked.

export const dynamic = "force-dynamic";

// Best-effort limit per address. Serverless instances don't share memory, so
// this slows a flood rather than stopping it; add Cloudflare Turnstile or
// Vercel's WAF rate limiting for a hard limit.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "too_many" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: real visitors never fill it. Answer as if it worked.
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const name = text(body.name, 80);
  const phoneRaw = text(body.phone, 20);
  const studio = text(body.studio, 40);
  const project = text(body.project, 200);

  if (
    name.length < 2 ||
    !isValidPhone(phoneRaw) ||
    !locations.some((l) => l.city === studio) ||
    !project
  ) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const endpoint = process.env.FORM_ENDPOINT || site.formEndpoint;
  if (!endpoint) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  const fields = new URLSearchParams({
    name,
    phone: normalisePhone(phoneRaw),
    city: studio,
    studio,
    project,
    dimensions: text(body.dimensions, 600),
    budget: text(body.budget, 40),
    message: text(body.message, 1000),
    page: text(body.page, 300),
  });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: fields,
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Apps Script answered ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Enquiry hand-over failed:", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }
}
