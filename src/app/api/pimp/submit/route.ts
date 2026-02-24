import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

type Payload = {
  procedure: string;
  question: string;
  answer?: string;
  context?: string;
  tags?: string;
  anonymous: boolean;

  honeypot?: string;
  startedAt?: number;
};

export async function POST(req: NextRequest) {
  try {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return NextResponse.json(
        { error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local" },
        { status: 500 }
      );
    }

    const ip = getClientIp(req);
    const ua = req.headers.get("user-agent") ?? "";

    const body = (await req.json()) as Payload;

    // Honeypot: bots fill hidden fields
    if (body.honeypot && body.honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true }); // pretend success
    }

    // Too-fast check (basic bot filter)
    if (typeof body.startedAt === "number") {
      const elapsed = Date.now() - body.startedAt;
      if (elapsed < 2500) {
        return NextResponse.json({ error: "Submission too fast. Please try again." }, { status: 400 });
      }
    }

    const procedure = (body.procedure ?? "").trim();
    const question = (body.question ?? "").trim();
    const answer = (body.answer ?? "").trim();
    const context = (body.context ?? "").trim();
    const tags = (body.tags ?? "").trim();
    const anonymous = !!body.anonymous;

    if (!procedure || !question) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    // Basic length limits
    if (question.length > 800) return NextResponse.json({ error: "Question too long." }, { status: 400 });
    if (answer.length > 1200) return NextResponse.json({ error: "Answer too long." }, { status: 400 });
    if (context.length > 800) return NextResponse.json({ error: "Context too long." }, { status: 400 });
    if (tags.length > 200) return NextResponse.json({ error: "Tags too long." }, { status: 400 });

    // Optional: block links (common spam)
    const combined = `${question} ${answer} ${context} ${tags}`.toLowerCase();
    if (combined.includes("http://") || combined.includes("https://")) {
      return NextResponse.json({ error: "Links are not allowed." }, { status: 400 });
    }

    const supabase = createClient(url, key, { auth: { persistSession: false } });

    const { error } = await supabase.from("pimp_submissions").insert({
      procedure,
      question,
      answer: answer || null,
      context: context || null,
      tags: tags || null,
      anonymous,
      status: "pending",
      ip,
      user_agent: ua,
    });

    if (error) {
      return NextResponse.json(
        { error: "Database insert failed.", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}