import type { Card } from "./types"

// Pool per phase. David-approved cards carry source: "curated". Newer drafts
// authored by Yenson (pending David sign-off) carry source: "curated" too once
// approved — the "generated" bucket is reserved for future AI-authored cards.
//
// `dimension` groups cards by the axis of the person they surface. The picker
// selects one card per dimension so the 3 shown to a participant are
// orthogonal — pace + learning + curiosity → richer context than 3 variants of
// "what do you enjoy".
export const CARDS: Card[] = [
  // ─── DISCOVER ────────────────────────────────────────────────────────────
  {
    id: "d.energy",
    stage: "discover",
    dimension: "energy_source",
    source: "curated",
    question: { es: "¿Dónde recargás energía?", en: "Where do you recharge?" },
    options: [
      { id: "beach", emoji: "🏖️", label: { es: "Playa", en: "Beach" } },
      { id: "mountain", emoji: "⛰️", label: { es: "Montaña", en: "Mountains" } },
      { id: "city", emoji: "🏙️", label: { es: "Ciudad", en: "City" } },
    ],
  },
  {
    id: "d.enjoy",
    stage: "discover",
    dimension: "creative_mode",
    source: "curated",
    question: { es: "¿Qué disfrutás más?", en: "What do you enjoy most?" },
    options: [
      { id: "create", emoji: "🎨", label: { es: "Crear", en: "Creating" } },
      { id: "learn", emoji: "📚", label: { es: "Aprender", en: "Learning" } },
      { id: "explore", emoji: "🧭", label: { es: "Explorar", en: "Exploring" } },
    ],
  },
  {
    id: "d.share",
    stage: "discover",
    dimension: "social_scale",
    source: "curated",
    question: { es: "¿Cómo preferís compartir?", en: "How do you prefer to share?" },
    options: [
      { id: "one_on_one", emoji: "👥", label: { es: "Uno a uno", en: "One-on-one" } },
      { id: "small_group", emoji: "👨‍👩‍👧", label: { es: "Grupo pequeño", en: "Small group" } },
      { id: "big_group", emoji: "🎉", label: { es: "Grupo grande", en: "Big group" } },
    ],
  },
  {
    id: "d.pace",
    stage: "discover",
    dimension: "pace",
    source: "curated",
    question: { es: "¿A qué ritmo te movés hoy?", en: "What pace are you moving at today?" },
    options: [
      { id: "slow", emoji: "🐢", label: { es: "Con calma", en: "Slow" } },
      { id: "steady", emoji: "🚶", label: { es: "Constante", en: "Steady" } },
      { id: "fast", emoji: "🏃", label: { es: "A toda velocidad", en: "Full speed" } },
    ],
  },
  {
    id: "d.learning",
    stage: "discover",
    dimension: "learning_channel",
    source: "curated",
    question: { es: "¿Cómo aprendés mejor?", en: "How do you learn best?" },
    options: [
      { id: "observing", emoji: "👁️", label: { es: "Observando", en: "Observing" } },
      { id: "listening", emoji: "👂", label: { es: "Escuchando", en: "Listening" } },
      { id: "doing", emoji: "🤲", label: { es: "Haciendo", en: "Doing" } },
    ],
  },
  {
    id: "d.time_of_day",
    stage: "discover",
    dimension: "daily_rhythm",
    source: "curated",
    question: {
      es: "¿Cuándo te sentís más vos?",
      en: "When do you feel most yourself?",
    },
    options: [
      { id: "morning", emoji: "🌅", label: { es: "En la mañana", en: "Morning" } },
      { id: "midday", emoji: "☀️", label: { es: "Al mediodía", en: "Midday" } },
      { id: "night", emoji: "🌙", label: { es: "En la noche", en: "Night" } },
    ],
  },
  {
    id: "d.rest",
    stage: "discover",
    dimension: "rest_mode",
    source: "curated",
    question: { es: "¿Cómo te reponés?", en: "How do you refill?" },
    options: [
      { id: "quiet", emoji: "📖", label: { es: "Con calma", en: "Quietly" } },
      { id: "moving", emoji: "🌊", label: { es: "En movimiento", en: "Moving" } },
      { id: "unplanned", emoji: "💤", label: { es: "Sin plan", en: "No plan" } },
    ],
  },
  {
    id: "d.curiosity",
    stage: "discover",
    dimension: "current_curiosity",
    source: "curated",
    question: {
      es: "¿Qué te tiene curioso últimamente?",
      en: "What has you curious lately?",
    },
    options: [
      { id: "story", emoji: "🎬", label: { es: "Una historia", en: "A story" } },
      { id: "idea", emoji: "🧩", label: { es: "Una idea", en: "An idea" } },
      { id: "place", emoji: "🌍", label: { es: "Un lugar", en: "A place" } },
    ],
  },

  // ─── CONNECT ─────────────────────────────────────────────────────────────
  {
    id: "c.value",
    stage: "connect",
    dimension: "core_value",
    source: "curated",
    question: { es: "¿Qué valor apreciás más?", en: "Which value do you cherish most?" },
    options: [
      { id: "curiosity", emoji: "🔍", label: { es: "Curiosidad", en: "Curiosity" } },
      { id: "trust", emoji: "🤝", label: { es: "Confianza", en: "Trust" } },
      { id: "freedom", emoji: "🕊️", label: { es: "Libertad", en: "Freedom" } },
    ],
  },
  {
    id: "c.share",
    stage: "connect",
    dimension: "sharing_gift",
    source: "curated",
    question: { es: "¿Qué disfrutás compartir?", en: "What do you enjoy sharing?" },
    options: [
      { id: "ideas", emoji: "💡", label: { es: "Ideas", en: "Ideas" } },
      { id: "experiences", emoji: "✨", label: { es: "Experiencias", en: "Experiences" } },
      { id: "knowledge", emoji: "🧠", label: { es: "Conocimiento", en: "Knowledge" } },
    ],
  },
  {
    id: "c.inspire",
    stage: "connect",
    dimension: "inspiration_source",
    source: "curated",
    question: { es: "¿Qué te inspira más?", en: "What inspires you most?" },
    options: [
      { id: "people", emoji: "👥", label: { es: "Personas", en: "People" } },
      { id: "nature", emoji: "🌿", label: { es: "Naturaleza", en: "Nature" } },
      { id: "challenges", emoji: "🎯", label: { es: "Retos", en: "Challenges" } },
    ],
  },
  {
    id: "c.connection",
    stage: "connect",
    dimension: "connection_moment",
    source: "curated",
    question: {
      es: "¿Cuándo te sentís más conectado?",
      en: "When do you feel most connected?",
    },
    options: [
      { id: "deep_talk", emoji: "🗣️", label: { es: "Hablando hondo", en: "Deep talk" } },
      { id: "silence", emoji: "🤫", label: { es: "En silencio", en: "In silence" } },
      { id: "laughter", emoji: "😂", label: { es: "Riendo", en: "Laughing" } },
    ],
  },
  {
    id: "c.growth",
    stage: "connect",
    dimension: "growth_area",
    source: "curated",
    question: {
      es: "¿Dónde estás creciendo hoy?",
      en: "Where are you growing today?",
    },
    options: [
      { id: "work", emoji: "💼", label: { es: "En lo que hago", en: "In my work" } },
      { id: "relationships", emoji: "❤️", label: { es: "En relaciones", en: "In relationships" } },
      { id: "inner", emoji: "🧘", label: { es: "Adentro", en: "Inside" } },
    ],
  },
  {
    id: "c.teacher",
    stage: "connect",
    dimension: "main_teacher",
    source: "curated",
    question: {
      es: "¿Qué te ha enseñado más de la vida?",
      en: "What has taught you the most about life?",
    },
    options: [
      { id: "family", emoji: "👨‍👩‍👧", label: { es: "La familia", en: "Family" } },
      { id: "travel", emoji: "🌍", label: { es: "Los viajes", en: "Travel" } },
      { id: "books", emoji: "📚", label: { es: "Los libros", en: "Books" } },
    ],
  },
  {
    id: "c.memory",
    stage: "connect",
    dimension: "memory_texture",
    source: "curated",
    question: {
      es: "¿Cómo recordás lo importante?",
      en: "How do you remember what matters?",
    },
    options: [
      { id: "sound", emoji: "🎶", label: { es: "Por sonidos", en: "By sound" } },
      { id: "image", emoji: "🎨", label: { es: "Por imágenes", en: "By image" } },
      { id: "word", emoji: "💬", label: { es: "Por palabras", en: "By words" } },
    ],
  },
  {
    id: "c.moves",
    stage: "connect",
    dimension: "what_moves_you",
    source: "curated",
    question: { es: "¿Qué te mueve más?", en: "What moves you most?" },
    options: [
      { id: "purpose", emoji: "🎯", label: { es: "Un propósito", en: "A purpose" } },
      { id: "story", emoji: "💫", label: { es: "Una historia", en: "A story" } },
      { id: "someone", emoji: "🤝", label: { es: "Alguien cercano", en: "Someone close" } },
    ],
  },

  // ─── COLLABORATE ─────────────────────────────────────────────────────────
  {
    id: "co.mode",
    stage: "collaborate",
    dimension: "work_mode",
    source: "curated",
    question: { es: "¿Cuál disfrutás más?", en: "Which do you enjoy most?" },
    options: [
      { id: "start", emoji: "🚀", label: { es: "Empezar", en: "Starting" } },
      { id: "organize", emoji: "📋", label: { es: "Organizar", en: "Organizing" } },
      { id: "improve", emoji: "⚙️", label: { es: "Mejorar", en: "Improving" } },
    ],
  },
  {
    id: "co.challenge",
    stage: "collaborate",
    dimension: "challenge_response",
    source: "curated",
    question: {
      es: "Cuando aparece un reto, normalmente…",
      en: "When a challenge shows up, you usually…",
    },
    options: [
      { id: "imagine", emoji: "💭", label: { es: "Imaginás", en: "Imagine" } },
      { id: "analyze", emoji: "🔬", label: { es: "Analizás", en: "Analyze" } },
      { id: "act", emoji: "⚡", label: { es: "Actuás", en: "Act" } },
    ],
  },
  {
    id: "co.contribution",
    stage: "collaborate",
    dimension: "contribution",
    source: "curated",
    question: { es: "¿Qué disfrutás aportar?", en: "What do you enjoy contributing?" },
    options: [
      { id: "energy", emoji: "🔥", label: { es: "Energía", en: "Energy" } },
      { id: "clarity", emoji: "🎯", label: { es: "Claridad", en: "Clarity" } },
      { id: "structure", emoji: "📐", label: { es: "Organización", en: "Structure" } },
    ],
  },
  {
    id: "co.idea_flow",
    stage: "collaborate",
    dimension: "idea_flow",
    source: "curated",
    question: { es: "¿Cómo te llegan las ideas?", en: "How do ideas reach you?" },
    options: [
      { id: "sudden", emoji: "💡", label: { es: "De pronto", en: "Suddenly" } },
      { id: "rest", emoji: "🚿", label: { es: "Al descansar", en: "At rest" } },
      { id: "talk", emoji: "🗣️", label: { es: "Al hablar", en: "In conversation" } },
    ],
  },
  {
    id: "co.team_role",
    stage: "collaborate",
    dimension: "team_role",
    source: "curated",
    question: {
      es: "En un equipo te sale natural…",
      en: "In a team it comes naturally to…",
    },
    options: [
      { id: "guide", emoji: "🧭", label: { es: "Guiar", en: "Guide" } },
      { id: "connect", emoji: "🌉", label: { es: "Conectar", en: "Connect" } },
      { id: "execute", emoji: "🛠️", label: { es: "Ejecutar", en: "Execute" } },
    ],
  },
  {
    id: "co.uncertainty",
    stage: "collaborate",
    dimension: "uncertainty_response",
    source: "curated",
    question: {
      es: "Ante lo incierto normalmente…",
      en: "When facing uncertainty you usually…",
    },
    options: [
      { id: "jump", emoji: "🚀", label: { es: "Saltás", en: "Jump" } },
      { id: "study", emoji: "🔍", label: { es: "Investigás", en: "Investigate" } },
      { id: "gather", emoji: "🤝", label: { es: "Buscás compañía", en: "Bring someone" } },
    ],
  },
  {
    id: "co.notice",
    stage: "collaborate",
    dimension: "first_notice",
    source: "curated",
    question: {
      es: "Al entrar a un lugar notás primero…",
      en: "Walking into a place, you notice first…",
    },
    options: [
      { id: "aesthetic", emoji: "🎨", label: { es: "Lo estético", en: "The aesthetic" } },
      { id: "systems", emoji: "⚙️", label: { es: "Cómo funciona", en: "How it works" } },
      { id: "people", emoji: "👥", label: { es: "Quién está", en: "Who's there" } },
    ],
  },
  {
    id: "co.legacy",
    stage: "collaborate",
    dimension: "legacy",
    source: "curated",
    question: {
      es: "¿Qué te gustaría dejar sembrado?",
      en: "What would you like to plant?",
    },
    options: [
      { id: "idea", emoji: "🧠", label: { es: "Una idea", en: "An idea" } },
      { id: "work", emoji: "🏛️", label: { es: "Una obra", en: "Something built" } },
      { id: "person", emoji: "🌱", label: { es: "Una persona", en: "A person" } },
    ],
  },

  // ─── AMPLIFY ─────────────────────────────────────────────────────────────
  {
    id: "a.takeaway",
    stage: "amplify",
    dimension: "takeaway",
    source: "curated",
    question: {
      es: "¿Qué te gustaría llevarte hoy?",
      en: "What would you like to take with you today?",
    },
    options: [
      { id: "inspiration", emoji: "✨", label: { es: "Inspiración", en: "Inspiration" } },
      { id: "relationships", emoji: "🤝", label: { es: "Relaciones", en: "Relationships" } },
      { id: "clarity", emoji: "🎯", label: { es: "Claridad", en: "Clarity" } },
    ],
  },
  {
    id: "a.offer",
    stage: "amplify",
    dimension: "offering",
    source: "curated",
    question: { es: "¿Qué te gustaría ofrecer?", en: "What would you like to offer?" },
    options: [
      { id: "help", emoji: "🙌", label: { es: "Ayuda", en: "Help" } },
      { id: "knowledge", emoji: "🧠", label: { es: "Conocimiento", en: "Knowledge" } },
      { id: "time", emoji: "⏳", label: { es: "Tiempo", en: "Time" } },
    ],
  },
  {
    id: "a.moment",
    stage: "amplify",
    dimension: "current_moment",
    source: "curated",
    question: {
      es: "¿Qué representa mejor este momento para vos?",
      en: "What best represents this moment for you?",
    },
    options: [
      { id: "grow", emoji: "🌱", label: { es: "Crecer", en: "Growing" } },
      { id: "share", emoji: "💫", label: { es: "Compartir", en: "Sharing" } },
      { id: "build", emoji: "🏗️", label: { es: "Construir", en: "Building" } },
    ],
  },
  {
    id: "a.next_step",
    stage: "amplify",
    dimension: "next_step_scale",
    source: "curated",
    question: {
      es: "El próximo paso lo darías…",
      en: "Your next step, you'd take it…",
    },
    options: [
      { id: "alone", emoji: "🚶", label: { es: "Solo", en: "Alone" } },
      { id: "with_one", emoji: "🤝", label: { es: "Con alguien", en: "With someone" } },
      { id: "with_many", emoji: "🌐", label: { es: "Con varios", en: "With many" } },
    ],
  },
  {
    id: "a.energy",
    stage: "amplify",
    dimension: "energy_direction",
    source: "curated",
    question: {
      es: "Salís con energía para…",
      en: "You leave with energy to…",
    },
    options: [
      { id: "create", emoji: "🎨", label: { es: "Crear", en: "Create" } },
      { id: "talk", emoji: "💬", label: { es: "Hablar", en: "Talk" } },
      { id: "change", emoji: "🌱", label: { es: "Cambiar algo", en: "Change something" } },
    ],
  },
  {
    id: "a.horizon",
    stage: "amplify",
    dimension: "horizon",
    source: "curated",
    question: {
      es: "¿Hacia dónde estás mirando?",
      en: "Where are you looking?",
    },
    options: [
      { id: "week", emoji: "📅", label: { es: "Esta semana", en: "This week" } },
      { id: "year", emoji: "🗓️", label: { es: "Este año", en: "This year" } },
      { id: "beyond", emoji: "🌌", label: { es: "Más adelante", en: "Further out" } },
    ],
  },
  {
    id: "a.courage",
    stage: "amplify",
    dimension: "courage",
    source: "curated",
    question: {
      es: "¿Qué necesitaría más coraje hoy?",
      en: "What would take courage today?",
    },
    options: [
      { id: "start", emoji: "✍️", label: { es: "Empezar algo", en: "Start something" } },
      { id: "say", emoji: "📣", label: { es: "Decir algo", en: "Say something" } },
      { id: "release", emoji: "🕊️", label: { es: "Soltar algo", en: "Let go" } },
    ],
  },
  {
    id: "a.promise",
    stage: "amplify",
    dimension: "promise",
    source: "curated",
    question: {
      es: "¿Qué te gustaría prometerte?",
      en: "What would you like to promise yourself?",
    },
    options: [
      { id: "message", emoji: "💌", label: { es: "Un mensaje", en: "A message" } },
      { id: "call", emoji: "📞", label: { es: "Una llamada", en: "A call" } },
      { id: "meeting", emoji: "☕", label: { es: "Un encuentro", en: "A meeting" } },
    ],
  },
]

export function getCardsForStage(stage: string): Card[] {
  return CARDS.filter((c) => c.stage === stage)
}

export function getCard(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id)
}
