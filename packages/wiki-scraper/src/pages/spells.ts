import type { Spell } from "@bg3-walkthrough-planner/types"
import type { Page } from "playwright"

export async function scrapeSpells(page: Page): Promise<Spell[]> {
  await page.goto("https://bg3.wiki/wiki/Abjuration")
  const abjuration: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Abjuration" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Conjuration")
  const conjuration: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Conjuration" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Divination")
  const divination: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Divination" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Enchantment_(school)")
  const enchantment: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Enchantment" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Evocation")
  const evocation: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Evocation" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Illusion")
  const illusion: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Illusion" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Necromancy")
  const necromancy: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Necromancy" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/Transmutation")
  const transmutation: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(2) > tbody > tr")
    .evaluateAll<Spell[]>((elements) =>
      elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")
        const linkElement = firstCol.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = firstCol.querySelector("img").src

        const secondCol = element.querySelector("td:nth-of-type(2)")
        const level = secondCol.textContent

        return { name, icon, wikiLink, level, school: "Transmutation" }
      }),
    )

  const everySpell = [
    ...necromancy,
    ...illusion,
    ...evocation,
    ...enchantment,
    ...divination,
    ...conjuration,
    ...abjuration,
    ...transmutation,
  ]

  return everySpell.map((spell) => ({
    ...spell,
    level: readableSpellLevel(spell.level),
  }))
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
