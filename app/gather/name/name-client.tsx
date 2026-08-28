"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { UI_COPY } from "@/lib/aop-gather/content"
import { getName, setName } from "@/lib/aop-gather/client-storage"
import type { Lang } from "@/lib/aop-gather/types"

export function NameClient({ lang }: { lang: Lang }) {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const existing = getName()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot localStorage hydrate on mount
    if (existing) setValue(existing)
    setHydrated(true)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed.length === 0) return
    setName(trimmed)
    router.replace("/gather")
  }

  const disabled = value.trim().length === 0

  return (
    <div className="flex min-h-[60dvh] flex-col justify-center gap-10">
      <div>
        <div className="text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
          {UI_COPY.brand[lang]}
        </div>
        <h1 className="mt-3 font-serif text-[2.25rem] leading-[1.05] tracking-tight">
          {UI_COPY.askName[lang]}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          inputMode="text"
          autoComplete="given-name"
          autoCapitalize="words"
          maxLength={40}
          value={hydrated ? value : ""}
          onChange={(e) => setValue(e.target.value)}
          placeholder={UI_COPY.namePlaceholder[lang]}
          aria-label={UI_COPY.askName[lang]}
          className="w-full border-b-2 border-white/25 bg-transparent pb-3 font-serif text-2xl text-white placeholder:text-white/25 focus:border-[var(--gold)] focus:outline-none"
        />

        <button
          type="submit"
          disabled={disabled}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--navy)] transition active:scale-[0.98] motion-reduce:active:scale-100 disabled:opacity-40"
        >
          {UI_COPY.continue[lang]}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
