import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createHmac } from "node:crypto";
import { isIP } from "node:net";
import { validateSubmission } from "@/app/lib/submissions";

export const runtime = "nodejs";
const MAX_BYTES = 16384;
const unavailable = () => NextResponse.json({ error: "Submissions are temporarily unavailable. Please try again later." }, { status: 503 });

export async function POST(req: NextRequest) {
  if (process.env.SUBMISSIONS_ENABLED !== "true") return NextResponse.json({ error: "Question submissions are not open yet." }, { status: 503 });
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  const salt = process.env.SUBMISSION_RATE_LIMIT_SECRET;
  if (!url || !key || !redisUrl || !redisToken || !salt) return unavailable();
  if (req.headers.get("origin") !== req.nextUrl.origin) return NextResponse.json({ error: "Please submit using the contribution form." }, { status: 403 });
  if (req.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return NextResponse.json({ error: "JSON is required." }, { status: 415 });

  // Trust the client address only behind Vercel's managed proxy.
  const ip = process.env.VERCEL === "1" ? req.headers.get("x-forwarded-for")?.split(",")[0].trim() : null;
  if (!ip || !isIP(ip)) return unavailable();
  try {
    const limiter = new Ratelimit({ redis: new Redis({ url: redisUrl, token: redisToken }), limiter: Ratelimit.slidingWindow(5, "10 m"), prefix: "scrubready:submissions", analytics: false, timeout: 3000 });
    const identifier = createHmac("sha256", salt).update(ip).digest("hex");
    const result = await limiter.limit(identifier);
    // Upstash normally permits requests on timeout; this endpoint fails closed.
    if (result.reason === "timeout") return unavailable();
    if (!result.success) return NextResponse.json({ error: "Too many attempts. Please try again in a few minutes." }, { status: 429, headers: { "Retry-After": String(Math.max(1, Math.ceil((result.reset - Date.now()) / 1000))) } });
  } catch { return unavailable(); }

  let body: unknown;
  try {
    if (Number(req.headers.get("content-length")) > MAX_BYTES) return NextResponse.json({ error: "Submission too large." }, { status: 413 });
    const reader = req.body?.getReader();
    if (!reader) throw new Error();
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        return NextResponse.json({ error: "Submission too large." }, { status: 413 });
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }

  let submission;
  try { submission = validateSubmission(body); }
  catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid submission." }, { status: 400 }); }
  if (submission.spam) return NextResponse.json({ ok: true });
  try {
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { error } = await supabase.from("pimp_submissions").insert({
      procedure: submission.procedure, question: submission.question,
      answer: submission.answer || null, context: submission.context || null, tags: submission.tags || null,
      anonymous: true, status: "pending",
    });
    if (error) return unavailable();
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch { return unavailable(); }
}
