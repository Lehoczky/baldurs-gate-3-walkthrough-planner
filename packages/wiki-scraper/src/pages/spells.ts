import type { Spell } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import { uniqueItems } from "../shared/item.ts"

const itemNamePlural = "spells"
const urls: Array<{ school: Spell["school"]; url: string }> = [
  { school: "Abjuration", url: "https://bg3.wiki/wiki/Abjuration" },
  { school: "Conjuration", url: "https://bg3.wiki/wiki/Conjuration" },
  { school: "Divination", url: "https://bg3.wiki/wiki/Divination" },
  { school: "Enchantment", url: "https://bg3.wiki/wiki/Enchantment_(school)" },
  { school: "Evocation", url: "https://bg3.wiki/wiki/Evocation" },
  { school: "Illusion", url: "https://bg3.wiki/wiki/Illusion" },
  { school: "Necromancy", url: "https://bg3.wiki/wiki/Necromancy" },
  { school: "Transmutation", url: "https://bg3.wiki/wiki/Transmutation" },
]

export async function getSpells(page: Page): Promise<Spell[]> {
  const spells: Spell[] = []

  for (const { school, url } of urls) {
    log.info(`Scraping ${url}`)

    await page.goto(url)
    const spellsOnPage = await getSpellsOnPage(page, school)
    spells.push(...spellsOnPage)
  }

  log.success(`Scraped ${spells.length} ${itemNamePlural}.`)
  return spells.map((spell) => ({
    ...spell,
    level: readableSpellLevel(spell.level),
  }))
}

async function getSpellsOnPage(
  page: Page,
  school: Spell["school"],
): Promise<Spell[]> {
  const raw = await page.$$eval(
    `.mw-parser-output h2:nth-of-type(2) + div .wikitable tr:has(td)`,
    (elements) => {
      return elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")!
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement!.getAttribute("title")!
        const relativeWikiLink = linkElement!.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img")!.src

        const secondCol = element.querySelector("td:nth-of-type(2)")!
        const level = secondCol.textContent

        return { name, icon, wikiLink, level }
      })
    },
  )

  return uniqueItems(raw).map((x) => ({ ...x, school }))
}

function readableSpellLevel(level: string): string {
  switch (level) {
    case "C":
      return "Cantrip"
    case "1":
      return "1st level"
    case "2":
      return "2nd level"
    case "3":
      return "3rd level"
    case "4":
      return "4th level"
    case "5":
      return "5th level"
    case "6":
      return "6th level"
    default:
      return level
  }
}
