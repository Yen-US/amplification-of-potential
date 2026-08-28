import { getLang } from "../lang"
import { NameClient } from "./name-client"

export default async function NamePage() {
  const lang = await getLang()
  return <NameClient lang={lang} />
}
