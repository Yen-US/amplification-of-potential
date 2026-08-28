"use client"

import type { Lang, Selection, StageSelections, StageSlug } from "./types"

const VERSION_KEY = "aop_beacon_v"
const NAME_KEY = "aop_beacon_name"
const LANG_KEY = "aop_beacon_lang"
const SELECTIONS_KEY = "aop_beacon_selections"
const PROMPT_KEY_PREFIX = "aop_beacon_prompt_"
const EMAIL_SENT_KEY = "aop_beacon_email_sent"
const BEACON_KEY = "aop_beacon_id"

const BEACON_RE = /^[a-z0-9][a-z0-9-]{0,62}[a-z0-9]$/

const VERSION = "1"

function isBrowser(): boolean {
  return typeof window !== "undefined"
}

function read(key: string): string | null {
  if (!isBrowser()) return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key: string, value: string): void {
  if (!isBrowser()) return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // storage full or blocked — ignore
  }
}

function remove(key: string): void {
  if (!isBrowser()) return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

function ensureVersion() {
  if (read(VERSION_KEY) !== VERSION) {
    write(VERSION_KEY, VERSION)
  }
}

export function getName(): string | null {
  ensureVersion()
  const raw = read(NAME_KEY)
  if (!raw) return null
  const trimmed = raw.trim()
  return trimmed.length > 0 ? trimmed : null
}

export function setName(name: string): void {
  ensureVersion()
  write(NAME_KEY, name.trim().slice(0, 40))
}

export function clearName(): void {
  remove(NAME_KEY)
  remove(SELECTIONS_KEY)
}

export function getLang(): Lang | null {
  const v = read(LANG_KEY)
  return v === "es" || v === "en" ? v : null
}

export function setLang(lang: Lang): void {
  write(LANG_KEY, lang)
}

function readSelections(): StageSelections {
  const raw = read(SELECTIONS_KEY)
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === "object") return parsed as StageSelections
  } catch {
    // ignore malformed
  }
  return {}
}

export function getStageSelections(stage: StageSlug): Selection[] {
  return readSelections()[stage] ?? []
}

export function setStageSelections(stage: StageSlug, selections: Selection[]): void {
  const current = readSelections()
  current[stage] = selections
  write(SELECTIONS_KEY, JSON.stringify(current))
}

export function clearStageSelections(stage: StageSlug): void {
  const current = readSelections()
  delete current[stage]
  write(SELECTIONS_KEY, JSON.stringify(current))
}

export function savePromptForStage(stage: StageSlug, prompt: string): void {
  write(`${PROMPT_KEY_PREFIX}${stage}`, prompt)
}

export function getPromptForStage(stage: StageSlug): string | null {
  return read(`${PROMPT_KEY_PREFIX}${stage}`)
}

export function clearPromptForStage(stage: StageSlug): void {
  remove(`${PROMPT_KEY_PREFIX}${stage}`)
}

export function getAllStageSelections(): StageSelections {
  return readSelections()
}

export function hasSentEmail(): boolean {
  return read(EMAIL_SENT_KEY) === "1"
}

export function markEmailSent(): void {
  write(EMAIL_SENT_KEY, "1")
}

export function normalizeBeaconId(raw: string | null | undefined): string | null {
  if (!raw) return null
  const cleaned = raw.trim().toLowerCase()
  if (!BEACON_RE.test(cleaned)) return null
  return cleaned
}

export function getBeaconId(): string | null {
  return normalizeBeaconId(read(BEACON_KEY))
}

export function setBeaconId(id: string): void {
  const clean = normalizeBeaconId(id)
  if (!clean) return
  write(BEACON_KEY, clean)
}
