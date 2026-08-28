import { NextResponse } from "next/server"
import { z } from "zod"
import { createServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const LANG_VALUES = ["es", "en"] as const
const STAGE_VALUES = ["discover", "connect", "collaborate", "amplify"] as const

const stageEntrySchema = z
  .object({
    selections: z
      .array(
        z.object({
          cardId: z.string().min(1).max(32),
          optionId: z.string().min(1).max(32),
        }),
      )
      .max(6)
      .optional(),
    prompt: z.string().max(600).optional(),
  })
  .strict()

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  name: z.string().trim().min(1).max(40),
  lang: z.enum(LANG_VALUES),
  beacon: z.string().trim().min(1).max(64).nullable().optional(),
  journey: z.record(z.enum(STAGE_VALUES), stageEntrySchema),
})

const RATE_LIMIT = 10
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
    return NextResponse.json({ ok: true, stored: false }, { status: 200 })
  }

  const { email, name, lang, beacon, journey } = parsed.data

  const { error } = await supabase.from("aop_beacon_email_optins").insert({
    email,
    name,
    lang,
    beacon: beacon ?? null,
    journey,
  })

  if (error) {
    return NextResponse.json({ ok: false, error: "insert_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true, stored: true }, { status: 200 })
}
