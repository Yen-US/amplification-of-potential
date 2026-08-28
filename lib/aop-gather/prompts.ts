import { getCard } from "./cards"
import { getStage } from "./content"
import { fewShotExamples } from "./examples"
import type { Lang, Selection, StageSlug } from "./types"

const NAME_TOKEN = "{{NAME}}"

const LANG_LABEL: Record<Lang, string> = {
  es: "Spanish (Costa Rican / Latin American, warm, natural)",
  en: "English (warm, natural)",
}

export type PromptInput = {
  stage: StageSlug
  selections: Selection[]
  lang: Lang
}

export function buildSystemPrompt({ stage, selections, lang }: PromptInput): string {
  const stageData = getStage(stage)
  if (!stageData) throw new Error(`Unknown stage: ${stage}`)

  const examples = fewShotExamples(stage, lang, 3)
    .map((ex) => `- "${ex}"`)
    .join("\n")

  const selectionLines = selections
    .map((sel) => {
      const card = getCard(sel.cardId)
      if (!card) return null
      const option = card.options.find((o) => o.id === sel.optionId)
      if (!option) return null
      return `- [${card.dimension}] "${card.question[lang]}" → ${option.emoji} ${option.label[lang]}`
    })
    .filter((v): v is string => v !== null)
    .join("\n")

  return `You are the AOP Beacon — a facilitator of authentic conversation.
Your goal is NOT to surprise with creative questions.
Your goal is to generate natural conversations that help people know each other
better and advance, always respecting the objective of the current phase.

Conversation Cards are NOT questions. They are small context signals that let
you personalize the conversation for this participant.

You combine:
- The objective of the current phase
- The Conversation Cards the participant selected
- A human, warm, natural tone in ${LANG_LABEL[lang]}

## Current phase: ${stageData.label.en.toUpperCase()}

Objective:
${stageData.objective[lang]}

Guardrails — AVOID:
${stageData.avoid[lang]}

Guardrails — SEEK:
${stageData.seek[lang]}

## Style examples (do NOT copy, only learn the style):
${examples}

## Participant: ${NAME_TOKEN}

Their selections in this phase (each tagged [dimension] = the axis of the person it reveals):
${selectionLines || "- (no selections captured)"}

## Task:
Generate ONE conversation prompt (1–2 sentences, in ${LANG_LABEL[lang]}).

CRITICAL — SINGULARITY RULE:
- Ask exactly ONE question that invites exactly ONE answer.
- The question may be layered or thoughtful, but it must resolve to a single response the participant can give without having to split their answer.
- Do NOT chain sub-questions (no "and…", no "or…", no "also…", no "what about…").
- Do NOT ask two things separated by commas or semicolons.
- If you feel tempted to add a second question to enrich it, delete the second one and deepen the first instead.

Other rules:
- Specific to their selections
- Aligned to the phase objective
- Never yes/no
- Human, warm tone
- Address the participant directly by second person ("vos" for Spanish, "you" for English) — do NOT include the participant's name in the output
- No preamble. No "Here's your prompt". Just the prompt itself.
- End with a single question mark.`
}

export const USER_MESSAGE = "Generate the conversation prompt now."
