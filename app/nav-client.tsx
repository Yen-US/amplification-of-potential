"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { ArrowRight, Menu, X } from "lucide-react"
import { BeaconLink } from "./beacon-link"

const links = [
  { href: "#who", label: "Who I Serve" },
  { href: "#process", label: "Process" },
  { href: "#stories", label: "Stories" },
  { href: "#about", label: "About David" },
  { href: "#contact", label: "Contact" },
]

export function AmplificationNav({
  whatsappHref,
}: {
  whatsappHref: string
}) {
  const [open, setOpen] = useState(false)
  const openButtonRef = useRef<HTMLButtonElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!open) return

    const body = document.body
    const html = document.documentElement
    const scrollY = window.scrollY
    const prev = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    }

    body.style.overflow = "hidden"
    body.style.position = "fixed"
    body.style.top = `-${scrollY}px`
    body.style.left = "0"
    body.style.right = "0"
    body.style.width = "100%"
    html.style.overflow = "hidden"
    html.style.overscrollBehavior = "contain"

    return () => {
      body.style.overflow = prev.bodyOverflow
      body.style.position = prev.bodyPosition
      body.style.top = prev.bodyTop
      body.style.left = prev.bodyLeft
      body.style.right = prev.bodyRight
      body.style.width = prev.bodyWidth
      html.style.overflow = prev.htmlOverflow
      html.style.overscrollBehavior = prev.htmlOverscroll
      window.scrollTo(0, scrollY)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => closeButtonRef.current?.focus(), 0)
      return () => window.clearTimeout(id)
    }
    openButtonRef.current?.focus()
    return
  }, [open])

  const drawer = (
    <div
      className="fixed inset-0 z-[100] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{ height: "100dvh" }}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/40"
        style={{ height: "100dvh" }}
      />
      <div
        className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl"
        style={{
          height: "100dvh",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/amplificationofpotential/amplificationlogo.png"
              alt=""
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
            <div className="text-[11px] tracking-[0.22em] text-[var(--gold)] uppercase">
              Menu
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--navy)]/15 text-[var(--navy)]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-6 py-6"
          style={{ WebkitOverflowScrolling: "touch", overscrollBehavior: "contain" }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-black/5 py-3 font-serif text-lg text-[var(--navy)] transition hover:text-[var(--gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 flex-col gap-3 border-t border-black/5 px-6 py-6">
          <BeaconLink
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1a3a7a]"
          >
            Experience Our Beacon
            <ArrowRight className="h-4 w-4" />
          </BeaconLink>
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--navy)]/20 px-6 py-3 text-sm font-medium text-[var(--navy)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
          >
            WhatsApp David
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="#top" className="flex items-center gap-3">
            <Image
              src="/amplificationofpotential/amplificationlogo.png"
              alt="Amplification of Potential"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <div className="leading-tight">
              <div className="text-[11px] tracking-[0.22em] text-[var(--gold)] uppercase">
                Amplification
              </div>
              <div className="text-xs font-medium tracking-wide text-[var(--navy)] uppercase">
                of Potential
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--navy)]/75 transition hover:text-[var(--gold)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 sm:flex">
            <BeaconLink className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#1a3a7a]">
              Experience Our Beacon
              <ArrowRight className="h-4 w-4" />
            </BeaconLink>
          </div>

          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--navy)]/15 text-[var(--navy)] lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="amplification-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {open && typeof document !== "undefined" && createPortal(drawer, document.body)}
    </>
  )
}
