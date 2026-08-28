"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import type { Lang } from "@/lib/aop-gather/types"

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

export async function setLangAction(lang: Lang, currentPath: string) {
  const store = await cookies()
  store.set("lang", lang, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
  })
  revalidatePath(currentPath)
}
