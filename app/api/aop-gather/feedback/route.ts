import { NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const STAGE_VALUES = ["discover", "connect", "collaborate", "amplify"] as const
const LANG_VALUES = ["es", "en"] as const

const bodySchema = z.object({
  stage: z.enum(STAGE_VALUES),
  lang: z.enum(LANG_VALUES),
  rating: z.enum(["up", "down"]),
  prompt: z.string().min(1).max(600),
  source: z.enum(["ai", "fallback"]),
  selections: z
    .array(
      z.object({
        cardId: z.string().min(1).max(32),
        optionId: z.string().min(1).max(32),
      }),
    )
    .min(1)
    .max(6),
  beacon: z.string().trim().min(1).max(64).nullable().optional(),
})

const RATE_LIMIT = 30
const RATE_WINDOW_MS = 60_000
const rateBuckets = new Map<string, { count: number; resetAt: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const bucket = rateBuckets.get(ip)
  if (!bucket || bucket.resetAt < now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (bucket.count >= RATE_LIMIT) return false
  bucket.count += 1
  return true
}

function getIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0]?.trim() || "unknown"
  return req.headers.get("x-real-ip") || "unknown"
}

export async function POST(req: Request) {
  const ip = getIp(req)
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 })
  }

  let parsed
  try {
    const raw = await req.json()
    parsed = bodySchema.safeParse(raw)
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 })
  }

  const supabase = createServerClient()
  if (!supabase) {
    // Storage not configured — accept quietly so the UX still confirms.
    // Feedback is a nice-to-have, never a hard dependency of the flow.
    return NextResponse.json({ ok: true, stored: false }, { status: 200 })
  }

  const { stage, lang, rating, prompt, source, selections, beacon } = parsed.data

  const { error } = await supabase.from("aop_beacon_feedback").insert({
    stage,
    lang,
    rating,
    prompt_text: prompt,
    source,
    selections,
    beacon: beacon ?? null,
  })

  if (error) {
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, stored: true }, { status: 200 })
}
