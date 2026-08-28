import { notFound } from "next/navigation"
import { getLang } from "../../lang"
import { STAGES, getStage } from "@/lib/aop-gather/content"
import { PromptClient } from "./prompt-client"
import type { StageSlug } from "@/lib/aop-gather/types"

export function generateStaticParams() {
  return STAGES.map((s) => ({ stage: s.slug }))
}

export default async function PromptPage({
  params,
}: {
  params: Promise<{ stage: string }>
}) {
  const { stage: slug } = await params
  const stage = getStage(slug)
  if (!stage) notFound()

  const lang = await getLang()
  return <PromptClient stageSlug={stage.slug as StageSlug} lang={lang} />
}
