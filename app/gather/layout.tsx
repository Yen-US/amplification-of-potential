import type { Metadata } from "next"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { getLang } from "./lang"
import { LangToggle } from "./lang-toggle"
import { UI_COPY } from "@/lib/aop-gather/content"
import { SponsorBanner } from "@/components/aop/sponsor-banner"

export const metadata: Metadata = {
  title: "AOP Beacon – The Conversation Experience",
  description:
    "A conversation catalyst that transforms introductions into meaningful connections through intentional conversations.",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "https://amplificationofpotential.com/gather",
    siteName: "AOP Beacon",
    title: "AOP Beacon – The Conversation Experience",
    description:
      "A conversation catalyst that transforms introductions into meaningful connections through intentional conversations.",
    images: [
      {
        url: "/amplificationofpotential/aop-beacon-og.png",
        width: 1200,
        height: 630,
        alt: "AOP Beacon — The Conversation Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AOP Beacon – The Conversation Experience",
    description:
      "A conversation catalyst that transforms introductions into meaningful connections through intentional conversations.",
    images: ["/amplificationofpotential/aop-beacon-og.png"],
  },
}

const NAVY = "#102a5c"
const GOLD = "#b8860b"

export default async function GatherLayout({ children }: { children: ReactNode }) {
  const lang = await getLang()

  return (
    <div
      className="min-h-screen min-h-dvh text-white"
      style={{
        ["--navy" as string]: NAVY,
        ["--gold" as string]: GOLD,
        overscrollBehavior: "contain",
        background:
          "radial-gradient(900px 600px at 50% -10%, rgba(184,134,11,0.14), transparent 60%)," +
          ` ${NAVY}`,
      }}
    >
      {/* backdrop-blur below creates a containing block — do NOT render position:fixed descendants inside this header without a portal */}
      <header
        className="sticky top-0 z-30 border-b border-white/10 bg-[var(--navy)]/85 backdrop-blur-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div
          className="mx-auto flex max-w-md items-center justify-between gap-3 py-3"
          style={{
            paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
            paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          }}
        >
          <Link href="/gather" className="flex items-center gap-2.5">
            <Image
              src="/amplificationofpotential/amplificationlogo.png"
              alt="Amplification of Potential"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
              priority
            />
            <div className="leading-tight">
              <div className="text-[9px] tracking-[0.28em] text-[var(--gold)] uppercase">
                Amplification
              </div>
              <div className="text-[10px] font-medium tracking-[0.18em] text-white uppercase">
                {UI_COPY.brand[lang]}
              </div>
            </div>
          </Link>
          <LangToggle current={lang} />
        </div>
      </header>

      <main
        className="mx-auto max-w-md pt-8 pb-16"
        style={{
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
        }}
      >
        {children}
        <SponsorBanner label={lang === "en" ? "With the support of" : "Con el apoyo de"} />
      </main>

      <footer
        className="border-t border-white/5 py-6 text-center text-[10px] tracking-[0.22em] text-white/40 uppercase"
        style={{
          paddingLeft: "max(1.25rem, env(safe-area-inset-left))",
          paddingRight: "max(1.25rem, env(safe-area-inset-right))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        {lang === "en" ? "Technology by" : "Tecnología por"}{" "}
        <Link
          href="https://presencia.studio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/60 hover:text-[var(--gold)]"
        >
          Presencia Studio
        </Link>
      </footer>
    </div>
  )
}
