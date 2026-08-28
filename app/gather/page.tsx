import { getLang } from "./lang"
import { WelcomeClient } from "./welcome-client"

export default async function GatherWelcomePage() {
  const lang = await getLang()
  return <WelcomeClient lang={lang} />
}
