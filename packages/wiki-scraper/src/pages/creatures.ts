import type { Creature } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

const itemNamePlural = "creatures"
const types: Array<{ name: Creature["type"]["name"]; url: string }> = [
  { name: "Aberration", url: "https://bg3.wiki/wiki/Aberration" },
  { name: "Beast", url: "https://bg3.wiki/wiki/Beast" },
  { name: "Celestial", url: "https://bg3.wiki/wiki/Celestial" },
  { name: "Construct", url: "https://bg3.wiki/wiki/Construct" },
  { name: "Dragon", url: "https://bg3.wiki/wiki/Dragon" },
  { name: "Elemental", url: "https://bg3.wiki/wiki/Elemental" },
  { name: "Fey", url: "https://bg3.wiki/wiki/Fey" },
  { name: "Fiend", url: "https://bg3.wiki/wiki/Fiend" },
  { name: "Giant", url: "https://bg3.wiki/wiki/Giant_(creature_type)" },
  { name: "Humanoid", url: "https://bg3.wiki/wiki/Humanoid" },
  { name: "Monstrosity", url: "https://bg3.wiki/wiki/Monstrosity" },
  { name: "Ooze", url: "https://bg3.wiki/wiki/Ooze" },
  { name: "Plant", url: "https://bg3.wiki/wiki/Plant" },
  { name: "Undead", url: "https://bg3.wiki/wiki/Undead" },
]

export async function getCreatures(page: Page): Promise<Creature[]> {
  const elements: Creature[] = []

  for (const type of types) {
    log.info(`Scraping ${type.url}`)

    await page.goto(type.url)
    const itemsOnPage = await getItemsOnPage(page, type)
    elements.push(...itemsOnPage)
  }

  log.success(`Scraped ${elements.length} ${itemNamePlural}.`)
  return elements.toSorted((a, b) => a.name.localeCompare(b.name))
}

async function getItemsOnPage(
  page: Page,
  type: (typeof types)[number],
): Promise<Creature[]> {
  return await page.$$eval(
    `.mw-parser-output li:has(.bg3wiki-round-image)`,
    (elements, { type }) => {
      return elements.map((element) => {
        const linkElement = element.querySelector("a[title]")
        const name = linkElement!.getAttribute("title")!
        const icon = linkElement!.querySelector("img")!.src
        const relativeWikiLink = linkElement!.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`

        return { name, icon, wikiLink, type }
      })
    },
    { type },
  )
}
