import type { ClosingContent, Lang, Stage, WelcomeContent } from "./types"

export const LANGS = ["es", "en"] as const

export const DEFAULT_LANG: Lang = "es"

export const LANG_LABEL: Record<Lang, string> = {
  es: "ES",
  en: "EN",
}

export const UI_COPY = {
  facilitatorHint: {
    es: "Esperá la indicación del facilitador para avanzar a la siguiente etapa.",
    en: "Wait for the facilitator's cue before moving to the next stage.",
  },
  stageEyebrow: {
    es: "Etapa",
    en: "Stage",
  },
  questionsEyebrow: {
    es: "Conversen sobre",
    en: "Talk about",
  },
  back: {
    es: "Volver",
    en: "Back",
  },
  begin: {
    es: "Comenzar la conversación",
    en: "Begin the conversation",
  },
  brand: {
    es: "Experiencia conversacional",
    en: "Conversation experience",
  },
  startTurn: {
    es: "Comenzar mi turno",
    en: "Start my turn",
  },
  next: {
    es: "Siguiente",
    en: "Next",
  },
  generating: {
    es: "Preparando tu pregunta…",
    en: "Preparing your prompt…",
  },
  cardProgress: {
    es: "Pregunta",
    en: "Card",
  },
  ready: {
    es: "Listo, conversemos",
    en: "Ready, let's talk",
  },
  forWhom: {
    es: "Para",
    en: "For",
  },
  askName: {
    es: "¿Cómo te llamás?",
    en: "What's your name?",
  },
  namePlaceholder: {
    es: "Tu nombre",
    en: "Your name",
  },
  continue: {
    es: "Continuar",
    en: "Continue",
  },
  notMe: {
    es: "No soy",
    en: "I'm not",
  },
  helloName: {
    es: "Hola",
    en: "Hi",
  },
  feedbackAsk: {
    es: "¿Te sirvió esta pregunta?",
    en: "Did this prompt land?",
  },
  feedbackThanks: {
    es: "Gracias por la señal.",
    en: "Thanks for the signal.",
  },
  emailHeading: {
    es: "Continúa tu experiencia AOP",
    en: "Continue your AOP experience",
  },
  emailBody: {
    es: "Recibí una reflexión personalizada basada en las decisiones y conversaciones que viviste durante la experiencia, y seguí amplificando el potencial que ya empezaste a expresar hoy.",
    en: "Receive a personalized reflection based on the decisions and conversations you lived through this experience, and keep amplifying the potential you already began to express today.",
  },
  emailNameLabel: {
    es: "Nombre",
    en: "Name",
  },
  emailNamePlaceholder: {
    es: "Tu nombre",
    en: "Your name",
  },
  emailInvite: {
    es: "Correo electrónico",
    en: "Email",
  },
  emailPlaceholder: {
    es: "tu@correo.com",
    en: "you@email.com",
  },
  emailSubmit: {
    es: "Recibir mi reflexión personalizada",
    en: "Receive my personalized reflection",
  },
  emailThanks: {
    es: "Listo. Te enviaremos tu reflexión al correo.",
    en: "Done. We'll send your reflection to your inbox.",
  },
  emailError: {
    es: "Revisá los datos e intentá de nuevo.",
    en: "Please check the details and try again.",
  },
  emailOptional: {
    es: "Opcional",
    en: "Optional",
  },
} satisfies Record<string, Record<Lang, string>>

export const WELCOME: WelcomeContent = {
  eyebrow: {
    es: "Bienvenidos",
    en: "Welcome",
  },
  title: {
    es: "Una experiencia de conversación",
    en: "The AOP Conversation Experience",
  },
  body: [
    {
      es: "Toda colaboración significativa empieza con una conversación significativa.",
      en: "Every meaningful collaboration begins with a meaningful conversation.",
    },
    {
      es: "Esta experiencia fue diseñada por Amplification Of Potential para transformar una mesa de personas en una mesa de conexiones.",
      en: "This experience has been designed by Amplification Of Potential to help transform a table of individuals into a table of connections.",
    },
    {
      es: "A lo largo de la noche, nuevas conversaciones se irán abriendo a medida que avance el evento.",
      en: "Throughout the event, new conversations will unlock as the evening progresses.",
    },
    {
      es: "No hay respuestas correctas o incorrectas.",
      en: "There are no right or wrong answers.",
    },
  ],
  invitation: [
    {
      es: "Escuchá con curiosidad.",
      en: "Listen with curiosity.",
    },
    {
      es: "Hablá con autenticidad.",
      en: "Speak with authenticity.",
    },
    {
      es: "Permitite descubrir a las personas a tu alrededor.",
      en: "Allow yourself to discover the people around you.",
    },
  ],
  prompt: {
    es: "¿Listos?",
    en: "Ready?",
  },
  cta: {
    es: "Comenzar la conversación",
    en: "Begin the conversation",
  },
}

export const STAGES: Stage[] = [
  {
    slug: "discover",
    order: 1,
    label: {
      es: "Descubrir",
      en: "Discover",
    },
    moment: {
      es: "Recepción",
      en: "Reception",
    },
    intro: {
      es: "Romper el hielo. Ambiente cómodo. Autenticidad sin evaluación.",
      en: "Break the ice. A comfortable space. Authenticity without evaluation.",
    },
    questions: [
      {
        es: "Contá algo que hoy te dio curiosidad.",
        en: "Share something that sparked your curiosity today.",
      },
      {
        es: "¿Qué recuerdo simple te hizo sonreír esta semana?",
        en: "What simple memory made you smile this week?",
      },
      {
        es: "¿Qué te trajo a esta mesa esta noche?",
        en: "What brought you to this table tonight?",
      },
    ],
    hint: {
      es: "No es entrevista. Es una invitación a conocerse.",
      en: "This isn't an interview. It's an invitation to know each other.",
    },
    objective: {
      es: "Romper el hielo, crear un ambiente cómodo y permitir que las personas se muestren con autenticidad, sin sensación de ser evaluadas.",
      en: "Break the ice, create a comfortable atmosphere, and let people show up authentically without feeling evaluated.",
    },
    avoid: {
      es: "Preguntas personales fuertes, temas profesionales, dinero, política, religión, conflictos, traumas.",
      en: "Heavy personal questions, professional topics, money, politics, religion, conflicts, traumas.",
    },
    seek: {
      es: "Historias, recuerdos, gustos, curiosidades, preferencias, experiencias positivas.",
      en: "Stories, memories, tastes, curiosities, preferences, positive experiences.",
    },
  },
  {
    slug: "connect",
    order: 2,
    label: {
      es: "Conectar",
      en: "Connect",
    },
    moment: {
      es: "Entrada",
      en: "Entrée",
    },
    intro: {
      es: "Puntos en común. Valores compartidos. Nuevas perspectivas.",
      en: "Common ground. Shared values. New perspectives.",
    },
    questions: [
      {
        es: "¿Qué valor guía las decisiones importantes que tomás?",
        en: "Which value guides the important decisions you make?",
      },
      {
        es: "¿Cuál ha sido una conversación que cambió tu forma de ver las cosas?",
        en: "What's a conversation that changed how you see things?",
      },
      {
        es: "¿Qué fortaleza tuya descubrieron otros antes que vos?",
        en: "What strength of yours did others recognize before you did?",
      },
    ],
    hint: {
      es: "Busquen los momentos de \"yo también\" y \"nunca lo había visto así\".",
      en: "Look for the \"me too\" and \"I never saw it that way\" moments.",
    },
    objective: {
      es: "Encontrar puntos en común y valores compartidos. Provocar el momento \"yo también\" o \"nunca lo había visto así\".",
      en: "Find common ground and shared values. Spark the \"me too\" or \"I never saw it that way\" moment.",
    },
    avoid: {
      es: "Debates polarizantes, comparaciones, juicios.",
      en: "Polarizing debates, comparisons, judgments.",
    },
    seek: {
      es: "Empatía, historias, aprendizaje mutuo, escucha.",
      en: "Empathy, stories, mutual learning, listening.",
    },
  },
  {
    slug: "collaborate",
    order: 3,
    label: {
      es: "Colaborar",
      en: "Collaborate",
    },
    moment: {
      es: "Plato fuerte",
      en: "Main course",
    },
    intro: {
      es: "Pensar juntos. Construir ideas. No hay respuestas correctas.",
      en: "Think together. Build ideas. There are no right answers.",
    },
    questions: [
      {
        es: "¿Qué reto estás trabajando hoy que valdría la pena compartir con esta mesa?",
        en: "What challenge are you working on that would be worth sharing with this table?",
      },
      {
        es: "¿Dónde sentís que necesitás claridad o la gente correcta?",
        en: "Where do you feel you need clarity or the right people around you?",
      },
      {
        es: "¿Cómo podría alguien en esta mesa apoyar lo que estás construyendo?",
        en: "How could someone at this table support what you are building?",
      },
    ],
    hint: {
      es: "No busquen la respuesta correcta. Piensen en voz alta.",
      en: "Don't look for the right answer. Think out loud together.",
    },
    objective: {
      es: "Pasar de conversar a construir. Pensar juntos, aportar perspectivas, imaginar posibilidades.",
      en: "Move from talking to building. Think together, contribute perspectives, imagine possibilities.",
    },
    avoid: {
      es: "Buscar la respuesta correcta. Debates cerrados. Juicios.",
      en: "Chasing the right answer. Closed debates. Judgments.",
    },
    seek: {
      es: "Creatividad, resolver retos, nuevas perspectivas, construir ideas.",
      en: "Creativity, solving challenges, new perspectives, building ideas.",
    },
  },
  {
    slug: "amplify",
    order: 4,
    label: {
      es: "Amplificar",
      en: "Amplify",
    },
    moment: {
      es: "Cierre",
      en: "Closing",
    },
    intro: {
      es: "Reflexión y acción. Cargar energía para lo que sigue.",
      en: "Reflection and action. Carry the energy forward.",
    },
    questions: [
      {
        es: "¿Qué conversación de esta noche te gustaría continuar?",
        en: "What conversation from tonight would you like to continue?",
      },
      {
        es: "¿Con quién de esta mesa querés dar el siguiente paso?",
        en: "Who at this table do you want to take a next step with?",
      },
      {
        es: "Si esta mesa decidiera amplificar algo juntos, ¿qué sería?",
        en: "If this table decided to amplify something together, what would it be?",
      },
    ],
    hint: {
      es: "Intercambien contacto antes de levantarse de la mesa.",
      en: "Exchange contact before you leave the table.",
    },
    objective: {
      es: "Salir con una reflexión, una idea, una conexión o una acción. Cargar energía para actuar después del evento.",
      en: "Leave with a reflection, an idea, a connection, or an action. Carry energy to act after the event.",
    },
    avoid: {
      es: "Promesas vagas. Compromisos irreales.",
      en: "Vague promises. Unrealistic commitments.",
    },
    seek: {
      es: "Reflexión concreta, acciones pequeñas, conexiones que sigan vivas.",
      en: "Concrete reflection, small actions, connections that stay alive.",
    },
  },
]

export const CLOSING: ClosingContent = {
  eyebrow: {
    es: "Cierre",
    en: "Closing",
  },
  title: {
    es: "Una mesa de personas, ahora una mesa de conexiones.",
    en: "A table of individuals, now a table of connections.",
  },
  body: {
    es: "Gracias por escuchar con curiosidad y hablar con autenticidad. Las mejores colaboraciones empiezan con conversaciones como esta.",
    en: "Thank you for listening with curiosity and speaking with authenticity. The best collaborations begin with conversations like this one.",
  },
  photoCue: {
    es: "Momento de foto grupal",
    en: "Group photo moment",
  },
  followUpLabel: {
    es: "Seguir con Amplification of Potential",
    en: "Continue with Amplification of Potential",
  },
  followUpUrl: "https://amplificationofpotential.com",
}

export function getStage(slug: string): Stage | undefined {
  return STAGES.find((s) => s.slug === slug)
}

export function getNextStage(slug: string): Stage | undefined {
  const idx = STAGES.findIndex((s) => s.slug === slug)
  if (idx === -1 || idx === STAGES.length - 1) return undefined
  return STAGES[idx + 1]
}
