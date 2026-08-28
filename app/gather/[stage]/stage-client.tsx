"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Camera } from "lucide-react"
import { CLOSING, STAGES, UI_COPY } from "@/lib/aop-gather/content"
import {
  getAllStageSelections,
  getBeaconId,
  getName,
  getPromptForStage,
  hasSentEmail,
  markEmailSent,
} from "@/lib/aop-gather/client-storage"
import type { Lang, Stage, StageSlug } from "@/lib/aop-gather/types"

type Props = {
  stage: Stage
  lang: Lang
  next?: Stage
}

export function StageClient({ stage, lang, next }: Props) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [name, setNameState] = useState<string | null>(null)

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

  if (!ready) {
    return (
      <div role="status" aria-live="polite" className="min-h-[60dvh]">
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  const isClosing = stage.slug === "amplify"

  return (
    <div className="flex flex-col gap-9">
      <div className="flex items-center justify-between text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
        <span>
          {UI_COPY.stageEyebrow[lang]} 0{stage.order} · {stage.label[lang]}
        </span>
        <span className="text-white/40">{stage.moment[lang]}</span>
      </div>

      <div>
        <h1 className="font-serif text-[2rem] leading-[1.1] tracking-tight">
          {stage.label[lang]}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-white/80">{stage.intro[lang]}</p>
        {name && (
          <p className="mt-3 text-[13px] tracking-wide text-white/50">
            {UI_COPY.helloName[lang]}, <span className="text-white">{name}</span>.
          </p>
        )}
      </div>

      <StageProgress order={stage.order} />

      <div className="pt-2">
        <Link
          href={`/gather/${stage.slug}/cards`}
          className="inline-flex min-h-11 w-full items-center justify-between gap-2 rounded-full bg-[var(--gold)] px-7 py-4 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100"
        >
          <span>{UI_COPY.startTurn[lang]}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <p className="mt-3 text-center text-[12px] text-white/45">{stage.hint[lang]}</p>
      </div>

      {isClosing ? (
        <ClosingBlock lang={lang} />
      ) : (
        next && (
          <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm">
            <span>
              <span className="block text-[10px] tracking-[0.28em] text-[var(--gold)]/70 uppercase">
                {UI_COPY.stageEyebrow[lang]} 0{next.order}
              </span>
              <span className="mt-1 block font-serif text-lg text-white/70">
                {next.label[lang]}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-white/30" />
          </div>
        )
      )}

      <Link
        href="/gather"
        className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.22em] text-white/45 uppercase hover:text-white/80"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {UI_COPY.back[lang]}
      </Link>
    </div>
  )
}

function StageProgress({ order }: { order: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex gap-2" aria-hidden>
      {STAGES.map((s) => (
        <span
          key={s.slug}
          className={`h-1 flex-1 rounded-full ${
            s.order <= order ? "bg-[var(--gold)]" : "bg-white/15"
          }`}
        />
      ))}
    </div>
  )
}

function ClosingBlock({ lang }: { lang: Lang }) {
  return (
    <div className="mt-2 flex flex-col gap-6">
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-white/[0.04] p-6 text-center">
        <div className="text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
          {CLOSING.eyebrow[lang]}
        </div>
        <h2 className="mt-3 font-serif text-[1.6rem] leading-snug">{CLOSING.title[lang]}</h2>
        <p className="mt-4 text-sm leading-relaxed text-white/75">{CLOSING.body[lang]}</p>

        <div className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/15 bg-[var(--navy)] px-5 py-2.5 text-[12px] tracking-[0.22em] text-white uppercase">
          <Camera className="h-4 w-4 text-[var(--gold)]" />
          {CLOSING.photoCue[lang]}
        </div>
      </div>

      <EmailOptin lang={lang} />

      <a
        href={CLOSING.followUpUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 self-center rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100"
      >
        {CLOSING.followUpLabel[lang]}
        <ArrowRight className="h-4 w-4" />
      </a>
    </div>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function EmailOptin({ lang }: { lang: Lang }) {
  const [sent, setSent] = useState(false)
  const [nameValue, setNameValue] = useState("")
  const [emailValue, setEmailValue] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot localStorage hydrate on mount
    if (hasSentEmail()) setSent(true)
    const storedName = getName()
    if (storedName) setNameValue(storedName)
    setHydrated(true)
  }, [])

  if (!hydrated) return null

  if (sent) {
    return (
      <div className="rounded-2xl border border-[var(--gold)]/30 bg-white/[0.04] p-6 text-center text-[12px] tracking-[0.22em] text-white/60 uppercase">
        {UI_COPY.emailThanks[lang]}
      </div>
    )
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const email = emailValue.trim().toLowerCase()
    const name = nameValue.trim()
    if (name.length === 0 || name.length > 120) {
      setError(UI_COPY.emailError[lang])
      return
    }
    if (!EMAIL_RE.test(email) || email.length > 200) {
      setError(UI_COPY.emailError[lang])
      return
    }
    setSubmitting(true)
    setError(null)

    const selections = getAllStageSelections()
    const stages: StageSlug[] = ["discover", "connect", "collaborate", "amplify"]
    const journey: Record<string, { selections: typeof selections.discover; prompt?: string }> = {}
    for (const s of stages) {
      const sel = selections[s] ?? []
      const prompt = getPromptForStage(s)
      if (sel.length === 0 && !prompt) continue
      journey[s] = { selections: sel, ...(prompt ? { prompt } : {}) }
    }

    try {
      const beacon = getBeaconId()
      const res = await fetch("/api/aop-gather/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ email, name, lang, journey, ...(beacon ? { beacon } : {}) }),
      })
      if (!res.ok) throw new Error("bad_status")
      markEmailSent()
      setSent(true)
    } catch {
      setError(UI_COPY.emailError[lang])
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex flex-col gap-5 rounded-2xl border border-[var(--gold)]/30 bg-white/[0.04] p-6 text-left"
    >
      <div>
        <h3 className="font-serif text-[1.35rem] leading-tight text-white">
          {UI_COPY.emailHeading[lang]}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          {UI_COPY.emailBody[lang]}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="aop-optin-name"
          className="text-[11px] tracking-[0.22em] text-white/50 uppercase"
        >
          {UI_COPY.emailNameLabel[lang]}
        </label>
        <input
          id="aop-optin-name"
          type="text"
          autoComplete="name"
          maxLength={120}
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value)
            if (error) setError(null)
          }}
          placeholder={UI_COPY.emailNamePlaceholder[lang]}
          className="min-w-0 border-b border-white/25 bg-transparent pb-2 font-serif text-base text-white placeholder:text-white/25 focus:border-[var(--gold)] focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="aop-optin-email"
          className="text-[11px] tracking-[0.22em] text-white/50 uppercase"
        >
          {UI_COPY.emailInvite[lang]}
        </label>
        <input
          id="aop-optin-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={200}
          value={emailValue}
          onChange={(e) => {
            setEmailValue(e.target.value)
            if (error) setError(null)
          }}
          placeholder={UI_COPY.emailPlaceholder[lang]}
          className="min-w-0 border-b border-white/25 bg-transparent pb-2 font-serif text-base text-white placeholder:text-white/25 focus:border-[var(--gold)] focus:outline-none"
        />
      </div>

      {error && <div className="text-[12px] text-red-300/80">{error}</div>}

      <button
        type="submit"
        disabled={
          submitting || nameValue.trim().length === 0 || emailValue.trim().length === 0
        }
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100 disabled:opacity-40"
      >
        {UI_COPY.emailSubmit[lang]}
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  )
}
