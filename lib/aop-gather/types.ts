export type Lang = "es" | "en"

export type StageSlug = "discover" | "connect" | "collaborate" | "amplify"

export type LocalizedString = Record<Lang, string>

export type Stage = {
  slug: StageSlug
  order: 1 | 2 | 3 | 4
  label: LocalizedString
  moment: LocalizedString
  intro: LocalizedString
  questions: LocalizedString[]
  hint: LocalizedString
  objective: LocalizedString
  avoid: LocalizedString
  seek: LocalizedString
}

export type CardOption = {
  id: string
  emoji: string
  label: LocalizedString
}

// Dimension = the axis of the person this card surfaces (e.g. "energy_source",
// "pace"). The picker uses this to select 3 cards along orthogonal axes so
// they compose into a richer portrait for the AI, instead of 3 near-duplicates.
export type CardDimension = string

// source describes where the card came from. Curated = hand-approved by David.
// Generated = future AI-authored (v2). Kept on the type so the picker and
// analytics can differentiate without a schema migration when we add it.
export type CardSource = "curated" | "generated"

export type Card = {
  id: string
  stage: StageSlug
  dimension: CardDimension
  source: CardSource
  question: LocalizedString
  options: [CardOption, CardOption, CardOption]
}

export type Selection = {
  cardId: string
  optionId: string
}

export type StageSelections = Partial<Record<StageSlug, Selection[]>>

export type WelcomeContent = {
  eyebrow: LocalizedString
  title: LocalizedString
  body: LocalizedString[]
  invitation: LocalizedString[]
  prompt: LocalizedString
  cta: LocalizedString
}

export type ClosingContent = {
  eyebrow: LocalizedString
  title: LocalizedString
  body: LocalizedString
  photoCue: LocalizedString
  followUpLabel: LocalizedString
  followUpUrl: string
}
