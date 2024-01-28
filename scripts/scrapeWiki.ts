import { writeFile } from "node:fs/promises"
import path from "node:path"

import type { Page } from "playwright"
import { chromium } from "playwright"

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()

  try {
    await scrapeWeapons(page)
  } finally {
    await context.close()
    await browser.close()
  }
}

async function scrapeWeapons(page: Page) {
  await page.goto("https://bg3.wiki/wiki/List_of_Weapons")

  const rarities = await gerWeaponRaritiesFromPage(page)

  const weaponsPerNthRarity = await Promise.all(
    rarities.map((_, i) => getWeaponsForNthRarityFromPage(page, i)),
  )
  const weapons = Object.fromEntries(
    rarities.map((rarity, i) => [rarity, weaponsPerNthRarity[i]]),
  )

  const filePath = path.join("public", "weapons.json")
  await writeJsonFile(filePath, weapons)
}

async function gerWeaponRaritiesFromPage(page: Page) {
  return await page
    .locator("h2 > .mw-headline")
    .evaluateAll((elements) =>
      elements
        .map((element) => element.textContent)
        .filter((rarity) => rarity !== "Legacy content"),
    )
}

async function getWeaponsForNthRarityFromPage(page: Page, n: number) {
  const itemLinksSelector = `.mw-parser-output > table:nth-of-type(${n + 1}) .bg3wiki-itemicon a`

  return await page.locator(itemLinksSelector).evaluateAll((elements) =>
    elements.map((element) => {
      const name = element.getAttribute("title")
      const icon = element.querySelector("img").src

      const relativeWikiLink = element.getAttribute("href")
      const wikiLink = `https://bg3.wiki${relativeWikiLink}`

      return { name, icon, wikiLink }
    }),
  )
}

async function writeJsonFile(path: string, data: object) {
  await writeFile(path, JSON.stringify(data, null, 2))
}

await main()
