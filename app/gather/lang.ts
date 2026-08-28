import { cookies } from "next/headers"
import { DEFAULT_LANG } from "@/lib/aop-gather/content"
import type { Lang } from "@/lib/aop-gather/types"

export async function getLang(): Promise<Lang> {
  const store = await cookies()
  const value = store.get("lang")?.value
  return value === "en" || value === "es" ? value : DEFAULT_LANG
}
