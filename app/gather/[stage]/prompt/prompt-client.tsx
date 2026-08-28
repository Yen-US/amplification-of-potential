"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowRight, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react"
import { UI_COPY, getNextStage, getStage } from "@/lib/aop-gather/content"
import {
  clearPromptForStage,
  clearStageSelections,
  getBeaconId,
  getName,
  getPromptForStage,
  getStageSelections,
  savePromptForStage,
} from "@/lib/aop-gather/client-storage"
import type { Lang, StageSlug } from "@/lib/aop-gather/types"

type Props = {
  stageSlug: StageSlug
  lang: Lang
}

type State =
  | { status: "loading" }
  | { status: "ready"; prompt: string; source: "ai" | "fallback" }
  | { status: "error"; message: string }

export function PromptClient({ stageSlug, lang }: Props) {
  const router = useRouter()
  const stage = getStage(stageSlug)
  const next = getNextStage(stageSlug)
  const [state, setState] = useState<State>({ status: "loading" })
  const [name, setNameState] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null)
  const inFlight = useRef(false)

  const run = useCallback(async () => {
    if (inFlight.current) return
    inFlight.current = true

    const cached = getPromptForStage(stageSlug)
    if (cached) {
      setState({ status: "ready", prompt: cached, source: "ai" })
      inFlight.current = false
      return
    }

    const selections = getStageSelections(stageSlug)
    if (selections.length === 0) {
      router.replace(`/gather/${stageSlug}/cards`)
      inFlight.current = false
      return
    }

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)

    try {
      const res = await fetch("/api/aop-gather/prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify({ stage: stageSlug, selections, lang }),
      })
      clearTimeout(timeout)

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data = (await res.json()) as { prompt?: string; source?: "ai" | "fallback" }
      if (!data.prompt) throw new Error("empty prompt")

      savePromptForStage(stageSlug, data.prompt)
      setState({
        status: "ready",
        prompt: data.prompt,
        source: data.source === "fallback" ? "fallback" : "ai",
      })
    } catch (err) {
      clearTimeout(timeout)
      const msg = err instanceof Error ? err.message : "unknown"
      setState({ status: "error", message: msg })
    } finally {
      inFlight.current = false
    }
  }, [stageSlug, lang, router])

  useEffect(() => {
    const n = getName()
    if (!n) {
      router.replace("/gather/name")
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot localStorage hydrate on mount
    setNameState(n)
    void run()
  }, [router, run])

  function retry() {
    clearPromptForStage(stageSlug)
    setState({ status: "loading" })
    void run()
  }

  function replay() {
    clearStageSelections(stageSlug)
    clearPromptForStage(stageSlug)
    router.replace(`/gather/${stageSlug}/cards`)
  }

  function sendFeedback(rating: "up" | "down") {
    if (feedback || state.status !== "ready") return
    setFeedback(rating)
    const beacon = getBeaconId()
    const payload = {
      stage: stageSlug,
      lang,
      rating,
      prompt: state.prompt,
      source: state.source,
      selections: getStageSelections(stageSlug),
      ...(beacon ? { beacon } : {}),
    }
    // Fire-and-forget. Feedback must never block the flow.
    void fetch("/api/aop-gather/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      keepalive: true,
      body: JSON.stringify(payload),
    }).catch(() => {})
  }

  if (!stage) return null

  const displayName = name ?? ""

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center justify-between text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
        <span>
          {UI_COPY.stageEyebrow[lang]} 0{stage.order} · {stage.label[lang]}
        </span>
        <span className="text-white/40">{stage.moment[lang]}</span>
      </div>

      {state.status === "loading" && (
        <div
          role="status"
          aria-live="polite"
          className="flex min-h-[50dvh] flex-col items-center justify-center gap-3"
        >
          <div className="h-8 w-8 rounded-full border-2 border-white/15 border-t-[var(--gold)] motion-safe:animate-spin" />
          <p className="text-sm text-white/60">{UI_COPY.generating[lang]}</p>
        </div>
      )}

      {state.status === "error" && (
        <div className="flex min-h-[40dvh] flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-white/70">
            {lang === "es"
              ? "No pudimos generar la pregunta. Intentemos otra vez."
              : "We couldn't generate the prompt. Let's try again."}
          </p>
          <button
            type="button"
            onClick={retry}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition active:scale-[0.98] motion-reduce:active:scale-100"
          >
            <RotateCcw className="h-4 w-4" />
            {lang === "es" ? "Reintentar" : "Retry"}
          </button>
        </div>
      )}

      {state.status === "ready" && (
        <>
          <div>
            <div className="text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
              {UI_COPY.forWhom[lang]} {displayName || "…"}
            </div>
            <p className="mt-5 font-serif text-[1.6rem] leading-[1.2] text-white">
              {state.prompt}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3">
            {feedback === null ? (
              <>
                <span className="text-[11px] tracking-[0.22em] text-white/40 uppercase">
                  {UI_COPY.feedbackAsk[lang]}
                </span>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => sendFeedback("up")}
                    aria-label="thumbs up"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition hover:border-[var(--gold)]/60 hover:bg-white/[0.08] active:scale-[0.95]"
                  >
                    <ThumbsUp className="h-4 w-4 text-white/70" />
                  </button>
                  <button
                    type="button"
                    onClick={() => sendFeedback("down")}
                    aria-label="thumbs down"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] transition hover:border-[var(--gold)]/60 hover:bg-white/[0.08] active:scale-[0.95]"
                  >
                    <ThumbsDown className="h-4 w-4 text-white/70" />
                  </button>
                </div>
              </>
            ) : (
              <div className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-white/45 uppercase">
                {feedback === "up" ? (
                  <ThumbsUp className="h-3.5 w-3.5 text-[var(--gold)]" />
                ) : (
                  <ThumbsDown className="h-3.5 w-3.5 text-[var(--gold)]" />
                )}
                {UI_COPY.feedbackThanks[lang]}
              </div>
            )}
          </div>

          <div className="pt-2">
            {next ? (
              <Link
                href={`/gather/${next.slug}`}
                className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100"
              >
                <span>{UI_COPY.ready[lang]}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <Link
                href={`/gather/${stageSlug}`}
                className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100"
              >
                <span>{UI_COPY.ready[lang]}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}

            <div className="mt-6 flex items-center justify-between text-[11px] tracking-[0.22em] text-white/40 uppercase">
              <button
                type="button"
                onClick={replay}
                className="inline-flex items-center gap-2 hover:text-white/70"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {lang === "es" ? "Repetir cards" : "Redo cards"}
              </button>
              {state.source === "fallback" && (
                <span className="text-white/30">
                  {lang === "es" ? "Pregunta curada" : "Curated prompt"}
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
