"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type Sponsor = {
  name: string
  href: string
  src: string
}

const SPONSORS: Sponsor[] = [
  {
    name: "iDEA Studio",
    href: "https://ideastudiocr.com",
    src: "/amplificationofpotential/sponsors/Logo iDEA.png",
  },
  {
    name: "Presencia Studio",
    href: "https://presencia.studio",
    src: "/amplificationofpotential/sponsors/PresenciaLogoBW.png",
  },
  {
    name: "Tekana",
    href: "https://tekana.cr",
    src: "/amplificationofpotential/sponsors/Tekana.png",
  },
  {
    name: "Black Stallion Eco Ranch",
    href: "https://www.blackstallionecoranch.com",
    src: "/amplificationofpotential/sponsors/bsr.png",
  },
  {
    name: "Inovve",
    href: "https://inovve.lat",
    src: "/amplificationofpotential/sponsors/innove.png",
  },
]

const ROTATION_MS = 3200

export function SponsorBanner({ label }: { label?: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SPONSORS.length)
    }, ROTATION_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      aria-label={label ?? "Sponsors"}
      className="mx-auto mt-10 flex w-full max-w-md flex-col items-center gap-3"
    >
      {label ? (
        <p className="text-[10px] tracking-[0.28em] text-white/40 uppercase">
          {label}
        </p>
      ) : null}

      <div className="relative h-24 w-full overflow-hidden">
        {SPONSORS.map((sponsor, i) => {
          const isActive = i === index
          return (
            <Link
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-700 ease-out ${
                isActive
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={200}
                height={48}
                className="h-12 w-auto object-contain opacity-90 brightness-0 invert transition duration-300 group-hover:opacity-100"
                sizes="200px"
              />
              <span className="text-[10px] tracking-[0.24em] text-white/60 uppercase">
                {sponsor.name}
              </span>
            </Link>
          )
        })}
      </div>

      <div className="flex items-center gap-1.5" aria-hidden>
        {SPONSORS.map((s, i) => (
          <span
            key={s.name}
            className={`h-1 w-1 rounded-full transition-colors ${
              i === index ? "bg-white/60" : "bg-white/15"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
