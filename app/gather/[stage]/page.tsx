import { notFound } from "next/navigation"
import { getLang } from "../lang"
import { STAGES, getNextStage, getStage } from "@/lib/aop-gather/content"
import { StageClient } from "./stage-client"

export function generateStaticParams() {
  return STAGES.map((s) => ({ stage: s.slug }))
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ stage: string }>
}) {
  const { stage: slug } = await params
  const stage = getStage(slug)
  if (!stage) notFound()

  const lang = await getLang()
  const next = getNextStage(stage.slug)

  return <StageClient stage={stage} lang={lang} next={next} />
}
