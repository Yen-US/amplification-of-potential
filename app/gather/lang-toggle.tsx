"use client"

import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { setLangAction } from "./actions"
import { LANGS } from "@/lib/aop-gather/content"
import type { Lang } from "@/lib/aop-gather/types"

export function LangToggle({ current }: { current: Lang }) {
  const pathname = usePathname()
  const [pending, startTransition] = useTransition()

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex overflow-hidden rounded-full border border-white/20 bg-white/5 text-[11px] tracking-[0.18em] uppercase"
    >
      {LANGS.map((lang) => {
        const active = lang === current
        return (
          <button
            key={lang}
            type="button"
            disabled={pending || active}
            aria-pressed={active}
            onClick={() => {
              startTransition(async () => {
                await setLangAction(lang as Lang, pathname)
              })
            }}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center px-3.5 py-2 text-[12px] transition ${
              active
                ? "bg-[var(--gold)] text-[var(--navy)]"
                : "text-white/70 hover:text-white"
            } ${pending && !active ? "opacity-50" : ""}`}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}
