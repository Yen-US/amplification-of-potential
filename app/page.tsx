import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Building2,
  Compass,
  Ear,
  Eye,
  Handshake,
  LightbulbIcon,
  Link2,
  Lock,
  Mail,
  MapPin,
  Phone,
  PenTool,
  Quote,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  Users,
} from "lucide-react"

import { AmplificationNav } from "./nav-client"
import { BeaconLink } from "./beacon-link"

export const metadata: Metadata = {
  title: "Amplification of Potential — Turning Potential Into Impact",
  description:
    "Helping established visions expand their impact through clarity, alignment, and strategic growth. Led by David Francillette.",
  openGraph: {
    type: "website",
    url: "https://amplificationofpotential.com",
    siteName: "Amplification of Potential",
    title: "Amplification of Potential",
    description:
      "Helping established visions expand their impact through clarity, alignment, and strategic growth.",
    images: ["/amplificationofpotential/amplificationlogo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amplification of Potential",
    description:
      "Helping established visions expand their impact through clarity, alignment, and strategic growth.",
    images: ["/amplificationofpotential/amplificationlogo.png"],
  },
}

const NAVY = "#102a5c"
const GOLD = "#b8860b"
const WHATSAPP_URL = "https://wa.me/50688986689"
const WHATSAPP_DISPLAY = "+506 8898 6689"
const PHONE_US = "+1 941 227 2272"
const EMAIL = "David.Francillette@inovve.lat"

const audiences = [
  {
    icon: Users,
    title: "Leaders",
    body: "Guiding direction, decisions, and the development of the people around them.",
  },
  {
    icon: Building2,
    title: "Organizations",
    body: "Businesses, nonprofits, ministries, and initiatives seeking sustainable growth.",
  },
  {
    icon: Handshake,
    title: "Communities",
    body: "Groups committed to positive change and long-term, compounding impact.",
  },
  {
    icon: Sparkles,
    title: "Established Projects",
    body: "Initiatives with proven value, ready to expand their reach and effectiveness.",
  },
]

const reasons = [
  {
    icon: LightbulbIcon,
    title: "I have a vision.",
    body: "Something bigger feels possible — but the path forward isn't clear yet.",
  },
  {
    icon: Lock,
    title: "I feel stuck.",
    body: "Talent, resources and opportunities exist. Progress isn't matching the potential.",
  },
  {
    icon: Users,
    title: "I need the right people.",
    body: "Growth requires alignment, trusted partners, and the right connections to move forward.",
  },
  {
    icon: TrendingUp,
    title: "My impact is ready to grow.",
    body: "Something is working. I want to multiply it sustainably — not break what we built.",
  },
  {
    icon: Compass,
    title: "Let's explore.",
    body: "I'm not sure what's next, but I know one focused conversation would help.",
  },
]

const shifts = [
  { from: "Confusion", to: "Clarity" },
  { from: "Isolation", to: "Alignment" },
  { from: "Ideas", to: "Action" },
  { from: "Effort", to: "Momentum" },
  { from: "Potential", to: "Impact" },
]

const framework = [
  {
    icon: Ear,
    label: "Listen",
    body: "Understand story, context, goals, and the real challenges underneath.",
  },
  {
    icon: Eye,
    label: "Observe",
    body: "Identify patterns, strengths, opportunities, and obstacles that aren't obvious yet.",
  },
  {
    icon: Link2,
    label: "Align",
    body: "Connect people, resources, and priorities around a shared purpose.",
  },
  {
    icon: PenTool,
    label: "Design",
    body: "Create practical strategies and sustainable growth plans you can actually run.",
  },
  {
    icon: Rocket,
    label: "Execute",
    body: "Support implementation, accountability, and measurable progress over time.",
  },
]

const amplificationLevels = [
  "Person",
  "Family",
  "Team",
  "Organization",
  "Community",
  "Region",
  "World",
]

const stories = [
  {
    title: "From Vision to Reality",
    body: "A guest experience company became #1 in its destination by aligning people, partnerships and purpose around a clear strategic direction.",
  },
  {
    title: "Connecting Communities",
    body: "Multiple organizations stopped duplicating effort and started collaborating — amplifying their collective impact across the region.",
  },
  {
    title: "Expanding Opportunity",
    body: "Families and entrepreneurs gained access to new opportunities through strategic partnerships and resource alignment.",
  },
]

const beliefs = [
  "Every person has unique value.",
  "Every organization has strengths worth developing.",
  "Every community contains untapped potential.",
  "Growth becomes sustainable when people, resources and purpose align.",
  "Transformation begins with service.",
  "Collaboration creates more value than competition.",
  "Meaningful impact can continue to grow.",
]

export default function AmplificationOfPotentialPage() {
  return (
    <div
      id="top"
      className="min-h-screen min-h-dvh bg-white text-[#0c1a3a]"
      style={{ ["--navy" as string]: NAVY, ["--gold" as string]: GOLD }}
    >
      <AmplificationNav whatsappHref={WHATSAPP_URL} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1100px 600px at 70% -10%, rgba(184,134,11,0.10), transparent 60%), radial-gradient(900px 600px at 10% 110%, rgba(16,42,92,0.08), transparent 60%)",
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:py-28">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/amplificationofpotential/amplificationlogo.png"
                alt=""
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <span className="text-[12px] tracking-[0.32em] text-[var(--gold)] uppercase">
                Turning Potential Into Impact
              </span>
            </div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-[var(--navy)] md:text-7xl">
              Amplification
              <br />
              of Potential
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#3a4356] md:text-xl">
              Helping established visions expand their impact through{" "}
              <span className="text-[var(--navy)]">clarity</span>,{" "}
              <span className="text-[var(--navy)]">alignment</span>, and{" "}
              <span className="text-[var(--navy)]">strategic growth</span>.
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5b6478]">
              You&apos;ve already invested years building something valuable — a business, a team, a
              mission, a community. Growth is no longer about starting. It&apos;s about creating the
              clarity, alignment and momentum needed for the next stage.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BeaconLink className="inline-flex items-center gap-2 rounded-full bg-[var(--navy)] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-[#1a3a7a]">
                Experience Our Beacon
                <ArrowRight className="h-4 w-4" />
              </BeaconLink>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--navy)]/20 px-7 py-3.5 text-sm font-medium text-[var(--navy)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                Let&apos;s Explore
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--navy)]/75 underline-offset-4 transition hover:text-[var(--gold)] hover:underline"
              >
                Write to David
              </Link>
            </div>

            <blockquote className="mt-12 flex max-w-md items-start gap-3 border-l-2 border-[var(--gold)] pl-5">
              <Quote className="h-5 w-5 shrink-0 text-[var(--gold)]" />
              <p className="font-serif text-lg italic leading-snug text-[var(--navy)]">
                Every person has unique value. We are all needed.
              </p>
            </blockquote>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[var(--navy)]/10 bg-[#f6f3ec] shadow-[0_30px_80px_-30px_rgba(16,42,92,0.35)]">
              <Image
                src="/amplificationofpotential/davidprofile.png"
                alt="David Francillette, Founder of Amplification of Potential"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--navy)]/90 via-[var(--navy)]/40 to-transparent p-8 text-white">
                <div className="text-[11px] tracking-[0.28em] text-[var(--gold)] uppercase">
                  Founder
                </div>
                <div className="font-serif text-2xl">David Francillette</div>
                <div className="mt-1 text-sm text-white/80">Amplification of Potential</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who I Serve */}
      <section id="who" className="scroll-mt-20 bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
                Who I Serve
              </div>
              <h2 className="font-serif text-4xl tracking-tight md:text-5xl">
                Who I work with
              </h2>
            </div>
            <p className="hidden max-w-md text-sm text-white/70 md:block">
              I partner with people and organizations already creating value and ready for their
              next stage of growth.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-4 bg-[var(--navy)] p-7 transition hover:bg-[#162f63]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="font-serif text-xl">{title}</div>
                <p className="text-sm leading-relaxed text-white/75">{body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-base text-white/80">
            If you&apos;ve already built something meaningful,{" "}
            <span className="text-[var(--gold)]">you belong here</span>.
          </p>
        </div>
      </section>

      {/* Why People Reach Out */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
              Why People Reach Out
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
              Common situations.
            </h2>
            <p className="mt-6 text-base text-[#5b6478]">
              You probably recognise yourself in one of these. The conversation usually starts
              here.
            </p>
            <Link
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-[var(--navy)] underline-offset-4 hover:text-[var(--gold)] hover:underline"
            >
              Start the conversation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="group rounded-sm border border-black/8 bg-white p-6 transition hover:border-[var(--gold)] hover:shadow-[0_18px_40px_-20px_rgba(16,42,92,0.25)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--navy)]/5 text-[var(--navy)] transition group-hover:bg-[var(--gold)]/15 group-hover:text-[var(--gold)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-4 font-medium text-[var(--navy)]">{title}</div>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6478]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Changes */}
      <section className="bg-[#f7f4ec]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
            What Changes
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
            When things become aligned.
          </h2>

          <div className="mt-12 grid gap-3">
            {shifts.map(({ from, to }, idx) => (
              <div
                key={from}
                className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 border-b border-[var(--navy)]/10 pb-3 last:border-0"
              >
                <div className="text-right text-base text-[#7a8194] md:text-lg">{from}</div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-[var(--gold)]" />
                </div>
                <div className="font-serif text-xl text-[var(--navy)] md:text-2xl">{to}</div>
                <span className="sr-only">step {idx + 1}</span>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-2xl text-base leading-relaxed text-[#3a4356]">
            People gain confidence. Teams collaborate better. Organizations move faster.
            Communities create greater impact.
          </p>
        </div>
      </section>

      {/* How I Help / AP5 Framework */}
      <section id="process" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
              How I Help
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
              I don&apos;t create potential.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-[#5b6478]">
              I help people recognise, develop and amplify the potential that already exists.
              My role: bring clarity where there is complexity, alignment where there is
              fragmentation, and momentum where growth is ready to happen.
            </p>
          </div>
          <div className="rounded-sm border border-[var(--navy)]/10 bg-[var(--navy)] p-8 text-white">
            <div className="text-[11px] tracking-[0.28em] text-[var(--gold)] uppercase">
              The AP5™ Framework
            </div>
            <div className="mt-2 font-serif text-2xl">The Amplification Process</div>
            <p className="mt-4 text-sm text-white/70">
              Five connected steps that turn an established vision into measurable, sustainable
              growth.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-black/8 sm:grid-cols-2 lg:grid-cols-5">
          {framework.map(({ icon: Icon, label, body }, i) => (
            <div key={label} className="relative flex flex-col gap-3 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <span className="text-[11px] tracking-[0.22em] text-[var(--gold)] uppercase">
                  0{i + 1}
                </span>
              </div>
              <div className="font-serif text-xl text-[var(--navy)]">{label}</div>
              <p className="text-sm leading-relaxed text-[#5b6478]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Amplification Model */}
      <section className="bg-[var(--navy)] text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
              The Amplification Model
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
              How impact grows.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
              Lasting transformation grows through people. One person&apos;s clarity expands naturally
              into families, teams, organizations, communities — and beyond. Every level
              amplifies the next.
            </p>
          </div>
          <ol className="flex flex-col gap-2">
            {amplificationLevels.map((level, i) => (
              <li
                key={level}
                className="flex items-center justify-between border-l-2 border-[var(--gold)] bg-white/[0.04] px-5 py-4"
                style={{ marginLeft: `${i * 12}px` }}
              >
                <span className="font-serif text-xl">{level}</span>
                <span className="text-[11px] tracking-[0.22em] text-[var(--gold)] uppercase">
                  Level {i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
          Stories of Transformation
        </div>
        <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
          Stories of amplification.
        </h2>
        <p className="mt-4 max-w-2xl text-base text-[#5b6478]">
          Situation → Alignment → Growth → Impact.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {stories.map((s, i) => (
            <article
              key={s.title}
              className="flex flex-col gap-5 rounded-sm border border-black/8 bg-white p-7 transition hover:border-[var(--gold)]"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-3xl text-[var(--gold)]">0{i + 1}</span>
                <span className="h-px flex-1 bg-[var(--gold)]/30" />
              </div>
              <h3 className="font-serif text-2xl text-[var(--navy)]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-[#5b6478]">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="bg-[#f7f4ec]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_1.5fr]">
          <div>
            <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
              Core Beliefs
            </div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
              What we believe.
            </h2>
            <p className="mt-6 max-w-sm text-base text-[#5b6478]">
              The principles that guide every conversation, strategy and engagement.
            </p>
          </div>
          <ul className="space-y-4">
            {beliefs.map((b, i) => (
              <li
                key={b}
                className="flex items-start gap-4 border-b border-[var(--navy)]/10 pb-4 last:border-0"
              >
                <span className="mt-1 font-mono text-xs tracking-wider text-[var(--gold)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-snug text-[var(--navy)]">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* About David */}
      <section id="about" className="mx-auto grid max-w-6xl scroll-mt-20 gap-12 px-6 py-20 md:grid-cols-[1fr_1.4fr]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm border border-[var(--navy)]/10 bg-gradient-to-br from-[#f6f3ec] to-[#eae4d2]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/amplificationofpotential/amplificationlogo.png"
              alt=""
              width={260}
              height={260}
              className="h-1/2 w-1/2 object-contain opacity-80"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--navy)]/90 to-transparent p-7 text-white">
            <div className="text-[11px] tracking-[0.28em] text-[var(--gold)] uppercase">
              Founder
            </div>
            <div className="font-serif text-2xl">David Francillette</div>
            <div className="text-sm text-white/80">Amplification of Potential</div>
          </div>
        </div>

        <div>
          <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
            About David
          </div>
          <h2 className="font-serif text-4xl leading-tight tracking-tight text-[var(--navy)] md:text-5xl">
            Helping established
            <br />
            visions grow.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[#3a4356]">
            <p>
              For years, I&apos;ve worked alongside leaders, organizations, businesses, ministries
              and communities to create clarity, strengthen alignment and expand meaningful
              impact.
            </p>
            <p>
              My focus is simple:{" "}
              <span className="text-[var(--navy)]">helping established visions grow</span>. Not
              starting from zero. Not consulting from a distance. Walking with the people doing
              the work — until the next stage becomes real.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Stat value="20+" label="Years partnering with leaders" />
            <Stat value="#1" label="Destination ranking achieved with a client" />
            <Stat value="5" label="Step AP5™ framework" />
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-[var(--navy)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 md:grid-cols-[1.1fr_1fr]">
            <div>
              <div className="mb-3 text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
                Let&apos;s Explore
              </div>
              <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">
                Sometimes one conversation
                <br />
                changes everything.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                If something on this page resonates, that&apos;s reason enough to talk. Let&apos;s start
                there — no agenda, just a focused conversation about what&apos;s next.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <BeaconLink className="inline-flex items-center gap-2 rounded-full bg-[var(--gold)] px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--navy)] transition hover:bg-[#cf9a1f]">
                  Experience Our Beacon
                  <ArrowRight className="h-4 w-4" />
                </BeaconLink>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  WhatsApp David
                </Link>
                <Link
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-medium text-white transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
                >
                  Send an email
                </Link>
              </div>
            </div>

            <div className="rounded-sm border border-white/10 bg-white/[0.04] p-8">
              <div className="text-[11px] tracking-[0.28em] text-[var(--gold)] uppercase">
                David Francillette
              </div>
              <div className="mt-1 font-serif text-2xl">Founder</div>

              <ul className="mt-8 space-y-5 text-sm">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={EMAIL}
                  href={`mailto:${EMAIL}`}
                />
                <ContactRow
                  icon={Phone}
                  label="Phone (US)"
                  value={PHONE_US}
                  href={`tel:${PHONE_US.replace(/\s/g, "")}`}
                />
                <ContactRow
                  icon={Target}
                  label="WhatsApp"
                  value={WHATSAPP_DISPLAY}
                  href={WHATSAPP_URL}
                />
                <ContactRow
                  icon={MapPin}
                  label="Based in"
                  value="Costa Rica · serving worldwide"
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/amplificationofpotential/amplificationlogo.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <div className="text-xs tracking-wide text-[#5b6478]">
              © {new Date().getFullYear()} Amplification of Potential · David Francillette
            </div>
          </div>
          <div className="text-xs tracking-[0.22em] text-[var(--gold)] uppercase">
            Turning Potential Into Impact
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <Link
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-[max(1.25rem,env(safe-area-inset-right))] bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_30px_-8px_rgba(37,211,102,0.55)] transition hover:bg-[#1ebe5d] motion-safe:hover:scale-105 sm:right-[max(2rem,env(safe-area-inset-right))] sm:bottom-[max(2rem,env(safe-area-inset-bottom))]"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.11 17.27c-.27-.13-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.85 1.06-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.49-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.13-.6-1.46-.82-2-.22-.52-.44-.45-.6-.46-.16 0-.34-.02-.52-.02-.18 0-.47.07-.71.34-.25.27-.94.92-.94 2.25 0 1.33.96 2.62 1.1 2.8.13.18 1.9 2.91 4.61 4.07.64.28 1.15.45 1.54.58.65.21 1.24.18 1.7.11.52-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.31zM16.01 4C9.93 4 5 8.93 5 15c0 1.93.5 3.81 1.46 5.46L5 27l6.7-1.4A11.04 11.04 0 0 0 16 26c6.07 0 11-4.93 11-11S22.08 4 16.01 4z" />
        </svg>
      </Link>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-sm border border-[var(--navy)]/10 bg-white p-5">
      <div className="font-serif text-3xl text-[var(--navy)]">{value}</div>
      <div className="mt-2 text-xs leading-snug tracking-wide text-[#5b6478] uppercase">
        {label}
      </div>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)]/15 text-[var(--gold)]">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] tracking-[0.22em] text-white/50 uppercase">{label}</div>
        <div className="truncate text-base text-white">{value}</div>
      </div>
    </>
  )
  if (href) {
    return (
      <li>
        <a
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="flex items-center gap-4 transition hover:text-[var(--gold)]"
        >
          {content}
        </a>
      </li>
    )
  }
  return <li className="flex items-center gap-4">{content}</li>
}
