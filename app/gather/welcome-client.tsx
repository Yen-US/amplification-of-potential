"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { STAGES, UI_COPY, WELCOME } from "@/lib/aop-gather/content"
import { getName, setBeaconId } from "@/lib/aop-gather/client-storage"
import type { Lang } from "@/lib/aop-gather/types"

export function WelcomeClient({ lang }: { lang: Lang }) {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [name, setNameState] = useState<string | null>(null)
  const first = STAGES[0]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const b = params.get("b")
    if (b) setBeaconId(b)

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
      <div
        role="status"
        aria-live="polite"
        className="min-h-[60dvh]"
      >
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
          {WELCOME.eyebrow[lang]}
        </div>
        <h1 className="mt-3 font-serif text-[2.25rem] leading-[1.05] tracking-tight">
          {WELCOME.title[lang]}
        </h1>
        {name && (
          <p className="mt-4 font-serif text-lg text-[var(--gold)]">
            {UI_COPY.helloName[lang]}, {name}.
          </p>
        )}
      </div>

      <div className="space-y-4 text-[15px] leading-relaxed text-white/85">
        {WELCOME.body.map((p, i) => (
          <p key={i}>{p[lang]}</p>
        ))}
      </div>

      <div className="border-l-2 border-[var(--gold)] pl-5">
        <ul className="space-y-2 font-serif text-lg leading-snug text-white">
          {WELCOME.invitation.map((line, i) => (
            <li key={i}>{line[lang]}</li>
          ))}
        </ul>
      </div>

      <div className="pt-2 text-center">
        <div className="font-serif text-2xl text-[var(--gold)]">{WELCOME.prompt[lang]}</div>
        <Link
          href={`/gather/${first.slug}`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100"
        >
          {WELCOME.cta[lang]}
          <ArrowRight className="h-4 w-4" />
        </Link>
        {name && (
          <div className="mt-4 text-[11px] tracking-[0.22em] text-white/40 uppercase">
            <Link href="/gather/name" className="hover:text-white/80">
              {UI_COPY.notMe[lang]} {name}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
