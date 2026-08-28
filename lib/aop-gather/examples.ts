import type { Lang, StageSlug } from "./types"

type Example = Record<Lang, string>

// 5 fallback questions per phase.
// ⭐ = David v1 · ✍️ = Yenson (pending approval).
// Content mirrors .planning/clients/amplificationofpotential/beacon-v1-content.md
export const EXAMPLES: Record<StageSlug, Example[]> = {
  discover: [
    {
      es: "Si pudieras organizar un día perfecto en la playa con un pequeño grupo de personas, ¿qué actividad nunca podría faltar y por qué?",
      en: "If you could plan a perfect day at the beach with a small group of people, what activity could never be missing — and why?",
    },
    {
      es: "¿Qué lugar has visitado recientemente que te dejó con ganas de volver, y qué fue lo que más te sorprendió?",
      en: "What's a place you've visited recently that left you wanting to come back — and what surprised you most about it?",
    },
    {
      es: "Si tuvieras una tarde completamente libre esta semana, ¿cómo la usarías para sentirte totalmente vos?",
      en: "If you had a completely free afternoon this week, how would you spend it to feel most like yourself?",
    },
    {
      es: "¿Qué pequeño ritual disfrutas hacer al empezar el día que la mayoría no conoce?",
      en: "What small daily ritual do you enjoy that most people don't know about?",
    },
    {
      es: "Cuando descubres algo nuevo que te fascina —una serie, un lugar, una idea— ¿cómo suele llegar a ti?",
      en: "When you discover something new that fascinates you — a show, a place, an idea — how does it usually find its way to you?",
    },
  ],
  connect: [
    {
      es: "¿Cuál ha sido una conversación que cambió tu forma de ver las cosas?",
      en: "What's a conversation you've had that changed the way you see things?",
    },
    {
      es: "¿Quién ha sido una persona inesperada que te enseñó algo que todavía llevas contigo?",
      en: "Who has been an unexpected person who taught you something you still carry with you?",
    },
    {
      es: "¿Qué es algo que hoy valoras mucho y que hace unos años ni siquiera notabas?",
      en: "What's something you deeply value today that you didn't even notice a few years ago?",
    },
    {
      es: "¿Qué historia de tu familia o de alguien cercano sientes que dice mucho de quién eres?",
      en: "What story from your family — or someone close to you — feels like it says a lot about who you are?",
    },
    {
      es: "¿En qué momento sentiste que alguien realmente te escuchó, y qué hizo esa persona distinto?",
      en: "When was a time you felt truly heard, and what did that person do differently?",
    },
  ],
  collaborate: [
    {
      es: "Si este grupo tuviera que resolver un reto en una sola tarde, ¿qué fortaleza crees que aportarías naturalmente?",
      en: "If this group had to solve a challenge in a single afternoon, what strength do you feel you'd naturally bring?",
    },
    {
      es: "Si pudieran diseñar juntos un espacio donde las personas se sintieran más ellas mismas, ¿cómo se vería o qué tendría?",
      en: "If you could design together a space where people felt most themselves, what would it look like — or what would it have?",
    },
    {
      es: "¿Qué idea llevas rondando hace tiempo y que te encantaría explorar con alguien que piense distinto?",
      en: "What idea have you been carrying around for a while that you'd love to explore with someone who thinks differently?",
    },
    {
      es: "Si tuvieran que inventar una tradición nueva para reunirse cada año, ¿qué le pondrían de especial?",
      en: "If you had to invent a new tradition to gather every year, what would make it special?",
    },
    {
      es: "¿Qué reto de tu comunidad te gustaría atacar si tuvieras un equipo diverso durante un mes?",
      en: "What challenge in your community would you like to take on with a diverse team for a month?",
    },
  ],
  amplify: [
    {
      es: "Después de esta conversación, ¿qué pequeña acción podrías hacer durante la próxima semana para amplificar el impacto que ya estás generando?",
      en: "After this conversation, what small action could you take during the next week to amplify the impact you're already creating?",
    },
    {
      es: "¿Qué es algo que hoy salió a la superficie y que te gustaría no dejar atrás cuando salgas por la puerta?",
      en: "What surfaced today that you'd like to carry with you when you walk out that door?",
    },
    {
      es: "Si pudieras dejar algo en manos de una sola persona de esta mesa, ¿qué sería y a quién se lo confiarías?",
      en: "If you could leave something in the hands of just one person at this table, what would it be — and who would you trust it to?",
    },
    {
      es: "¿Qué idea sientes que te toca compartir con alguien fuera de este espacio, y quién viene a tu mente?",
      en: "What idea feels like yours to share with someone outside this room, and who comes to mind?",
    },
    {
      es: "¿A qué te comprometes contigo mismo antes de despedirte hoy, aunque sea algo pequeño?",
      en: "What's one thing you'll commit to yourself before saying goodbye today — even something small?",
    },
  ],
}

export function pickRandomExample(stage: StageSlug, lang: Lang): string {
  const set = EXAMPLES[stage]
  const i = Math.floor(Math.random() * set.length)
  return set[i][lang]
}

export function fewShotExamples(stage: StageSlug, lang: Lang, count = 3): string[] {
  const set = EXAMPLES[stage]
  return set.slice(0, count).map((ex) => ex[lang])
}
