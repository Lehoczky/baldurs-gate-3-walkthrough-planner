import { writeFile } from "node:fs/promises"
import path from "node:path"

import { consola } from "consola"
import ora from "ora"
import type { Page } from "playwright"
import { chromium } from "playwright"

export interface Item {
  name: string
  icon: string
  wikiLink: string
}

async function main() {
  const spinner = ora("Opening browser page").start()
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  spinner.succeed("Browser opened")

  try {
    const weaponsByRarity = await scrapeWeapons(page)

    const filePath = path.join("public", "weapons.json")
    await writeJsonFile(filePath, weaponsByRarity)
    consola.success(`Saved scraped items to: ${filePath}`)
  } catch (error) {
    consola.error(error)
  } finally {
    await context.close()
    await browser.close()
  }
}

async function scrapeWeapons(page: Page) {
  const spinner = ora("Scraping weapons").start()
  await page.goto("https://bg3.wiki/wiki/List_of_Weapons")

  const rarities = await getWeaponRaritiesFromPage(page)

  const weaponsPerNthRarity = await Promise.all(
    rarities.map((_, i) => getWeaponsForNthRarityFromPage(page, i)),
  )
  const weaponsByRarity = Object.fromEntries(
    rarities.map((rarity, i) => [rarity, weaponsPerNthRarity[i]]),
  )
  const weaponsCount = Object.values(weaponsByRarity).flat().length
  spinner.succeed(`Successfully scraped ${weaponsCount} weapons`)

  const weaponsByRarityWithoutDuplicates = removeDuplicates(weaponsByRarity)
  const weaponsCountWithoutDuplicates = Object.values(
    weaponsByRarityWithoutDuplicates,
  ).flat().length

  consola.info(`Found ${weaponsCountWithoutDuplicates} weapons in total`)
  return weaponsByRarityWithoutDuplicates
}

async function getWeaponRaritiesFromPage(page: Page) {
  return await page
    .locator("h2 > .mw-headline")
    .evaluateAll((elements) =>
      elements
        .map((element) => element.textContent)
        .filter((rarity) => rarity !== "Legacy content"),
    )
}

async function getWeaponsForNthRarityFromPage(
  page: Page,
  n: number,
): Promise<Item[]> {
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

function removeDuplicates(weaponsByRarity: Record<string, Item[]>) {
  const filteredItems: Record<string, Item[]> = {}
  const everyDuplicate: Item[] = []

  for (const [rarity, weapons] of Object.entries(weaponsByRarity)) {
    filteredItems[rarity] = []
    const usedWikiLinks: string[] = []
    const duplicatesForRarity: Item[] = []

    for (const weapon of weapons) {
      if (usedWikiLinks.includes(weapon.wikiLink)) {
        duplicatesForRarity.push(weapon)
      } else {
        filteredItems[rarity].push(weapon)
        usedWikiLinks.push(weapon.wikiLink)
      }
    }

    everyDuplicate.push(...duplicatesForRarity)
  }

  const duplicateCount = everyDuplicate.length
  const infoHeading = `Removed ${duplicateCount} duplicated weapons: `
  const infoList = everyDuplicate.map((item) => item.name).join(", ")
  const infoMessage = infoHeading + infoList
  consola.info(infoMessage)

  return filteredItems
}

async function writeJsonFile(path: string, data: object) {
  await writeFile(path, JSON.stringify(data, null, 2))
}

await main()
