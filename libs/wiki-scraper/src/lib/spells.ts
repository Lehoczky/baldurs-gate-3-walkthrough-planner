import type { Spell } from "@baldurs-gate-3-walkthrough-planner/types"
import type { Page } from "playwright"

export async function scrapeSpells(page: Page): Promise<Spell[]> {
  await page.goto("https://bg3.wiki/wiki/List_of_cantrips")
  const cantrips: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "Cantrip" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_1st_level_spells")

  const level1: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "1st level" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_2nd_level_spells")

  const level2: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "2nd level" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_3rd_level_spells")

  const level3: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "3rd level" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_4th_level_spells")

  const level4: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "4th level" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_5th_level_spells")

  const level5: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "5th level" }
      }),
    )

  await page.goto("https://bg3.wiki/wiki/List_of_6th_level_spells")

  const level6: Spell[] = await page
    .locator(".mw-parser-output > table:nth-of-type(3) td:first-of-type")
    .evaluateAll((elements) =>
      elements.map((element) => {
        const linkElement = element.querySelector<HTMLAnchorElement>("a")
        const name = linkElement.getAttribute("title")
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const icon = element.querySelector("img").src

        return { name, icon, wikiLink, level: "6th level" }
      }),
    )

  return [
    ...level6,
    ...level5,
    ...level4,
    ...level3,
    ...level2,
    ...level1,
    ...cantrips,
  ]
}
