import { getCardsForStage } from "./cards"
import type { Card, StageSlug } from "./types"

// Deterministic per-participant card selection.
//
// Same (name, stage) always yields the same 3 cards — so a participant who
// re-enters the flow sees a stable set, but two different names see different
// sets. This keeps the pool feeling alive without introducing non-determinism
// or making David re-approve every render.
//
// Diversity is enforced by picking one card per `dimension`. That way the 3
// signals we send to the model are orthogonal (e.g. pace + learning +
// curiosity) instead of near-duplicates.

function fnv1a(input: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}

function mulberry32(seed: number) {
  let s = seed >>> 0
  return function next() {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pickCards({
  stage,
  seed,
  count = 3,
}: {
  stage: StageSlug
  seed: string
  count?: number
}): Card[] {
  const pool = getCardsForStage(stage)
  if (pool.length <= count) return pool

  const rand = mulberry32(fnv1a(`${seed}::${stage}`))

  const byDimension = new Map<string, Card[]>()
  for (const card of pool) {
    const bucket = byDimension.get(card.dimension) ?? []
    bucket.push(card)
    byDimension.set(card.dimension, bucket)
  }

  const dimensions = shuffle(Array.from(byDimension.keys()), rand)
  const picked: Card[] = []

  for (const dim of dimensions) {
    if (picked.length >= count) break
    const bucket = byDimension.get(dim)!
    const choice = bucket[Math.floor(rand() * bucket.length)]
    picked.push(choice)
  }

  // If we ran out of distinct dimensions before hitting count, top up from
  // the remaining pool (unlikely with 8 dimensions × 3 picks, but keeps the
  // picker safe if the pool ever shrinks).
  if (picked.length < count) {
    const remaining = shuffle(
      pool.filter((c) => !picked.some((p) => p.id === c.id)),
      rand,
    )
    for (const c of remaining) {
      if (picked.length >= count) break
      picked.push(c)
    }
  }

  return picked
}
