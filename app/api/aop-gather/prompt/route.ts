import { NextResponse } from "next/server"
import OpenAI from "openai"
import { z } from "zod"
import { pickRandomExample } from "@/lib/aop-gather/examples"
import { USER_MESSAGE, buildSystemPrompt } from "@/lib/aop-gather/prompts"
import type { Lang, StageSlug } from "@/lib/aop-gather/types"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const STAGE_VALUES = ["discover", "connect", "collaborate", "amplify"] as const
const LANG_VALUES = ["es", "en"] as const

const bodySchema = z.object({
  stage: z.enum(STAGE_VALUES),
  lang: z.enum(LANG_VALUES),
  selections: z
    .array(
      z.object({
        cardId: z.string().min(1).max(32),
        optionId: z.string().min(1).max(32),
      }),
    )
    .min(1)
    .max(6),
})

const MODEL = "gpt-5.4-mini"
const TIMEOUT_MS = 4000
const RATE_LIMIT = 60
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

function fallbackResponse(stage: StageSlug, lang: Lang) {
  return NextResponse.json(
    { prompt: pickRandomExample(stage, lang), source: "fallback" },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  )
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

  const { stage, lang, selections } = parsed.data
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return fallbackResponse(stage, lang)
  }

  const systemPrompt = buildSystemPrompt({ stage, selections, lang })

  const client = new OpenAI({ apiKey, timeout: TIMEOUT_MS, maxRetries: 0 })

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const completion = await client.chat.completions.create(
      {
        model: MODEL,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: USER_MESSAGE },
        ],
        temperature: 0.8,
        max_completion_tokens: 200,
      },
      { signal: controller.signal },
    )
    clearTimeout(timer)

    const raw = completion.choices?.[0]?.message?.content?.trim()
    if (!raw) return fallbackResponse(stage, lang)

    const cleaned = raw
      .replace(/^["'“”‘’]/, "")
      .replace(/["'“”‘’]$/, "")
      .trim()

    return NextResponse.json(
      { prompt: cleaned, source: "ai" },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    )
  } catch {
    return fallbackResponse(stage, lang)
  }
}
