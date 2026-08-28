"use client"

import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { pickCards } from "@/lib/aop-gather/card-picker"
import { UI_COPY, getStage } from "@/lib/aop-gather/content"
import {
  clearPromptForStage,
  getName,
  setStageSelections,
} from "@/lib/aop-gather/client-storage"
import type { Lang, Selection, Stage, StageSlug } from "@/lib/aop-gather/types"

type Props = {
  stageSlug: StageSlug
  lang: Lang
}

export function CardsClient({ stageSlug, lang }: Props) {
  const router = useRouter()
  const stage: Stage | undefined = getStage(stageSlug)
  const [ready, setReady] = useState(false)
  const [name, setNameState] = useState<string | null>(null)
  const [selections, setSelections] = useState<Selection[]>([])
  const cards = useMemo(
    () => (name ? pickCards({ stage: stageSlug, seed: name }) : []),
    [name, stageSlug],
  )
  const currentIndex = selections.length
  const currentCard = cards[currentIndex]
  const done = cards.length > 0 && currentIndex >= cards.length

  useEffect(() => {
    const n = getName()
    if (!n) {
      router.replace("/gather/name")
      return
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot localStorage hydrate on mount
    setNameState(n)
    setReady(true)
  }, [router])

  useEffect(() => {
    if (!done) return
    setStageSelections(stageSlug, selections)
    clearPromptForStage(stageSlug)
    router.replace(`/gather/${stageSlug}/prompt`)
  }, [done, selections, stageSlug, router])

  if (!ready || !stage) {
    return (
      <div role="status" aria-live="polite" className="min-h-[60dvh]">
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  if (done || !currentCard) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex min-h-[50dvh] items-center justify-center text-sm text-white/60"
      >
        {UI_COPY.generating[lang]}
      </div>
    )
  }

  function choose(cardId: string, optionId: string) {
    setSelections((prev) => {
      if (prev.some((s) => s.cardId === cardId)) return prev
      return [...prev, { cardId, optionId }]
    })
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
        <span>
          {UI_COPY.stageEyebrow[lang]} 0{stage.order} · {stage.label[lang]}
        </span>
        <span className="text-white/40">
          {UI_COPY.cardProgress[lang]} {currentIndex + 1}/{cards.length}
        </span>
      </div>

      <ProgressBar total={cards.length} current={currentIndex} />

      {name && (
        <div className="text-[13px] tracking-wide text-white/50">
          {UI_COPY.helloName[lang]}, <span className="text-white">{name}</span>.
        </div>
      )}

      <div>
        <h1 className="font-serif text-[1.8rem] leading-[1.15] tracking-tight">
          {currentCard.question[lang]}
        </h1>
      </div>

      <div className="grid gap-3">
        {currentCard.options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => choose(currentCard.id, opt.id)}
            className="flex min-h-11 items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-left transition active:scale-[0.99] motion-reduce:active:scale-100 hover:border-[var(--gold)]/60 hover:bg-white/[0.07]"
          >
            <span className="text-3xl leading-none" aria-hidden>
              {opt.emoji}
            </span>
            <span className="font-serif text-lg text-white">{opt.label[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ProgressBar({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-2" aria-hidden>
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i < current ? "bg-[var(--gold)]" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  )
}
