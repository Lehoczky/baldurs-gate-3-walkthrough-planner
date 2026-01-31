import type { Item } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import {
  classesToRarity,
  type RawScrapedItem,
  sortByRarity,
  uniqueItems,
} from "../shared/item.ts"

const itemNamePlural = "weapons"
const urls = [
  "https://bg3.wiki/wiki/List_of_common_weapons",
  "https://bg3.wiki/wiki/List_of_uncommon_weapons",
  "https://bg3.wiki/wiki/List_of_rare_weapons",
  "https://bg3.wiki/wiki/List_of_very_rare_weapons",
  "https://bg3.wiki/wiki/List_of_legendary_weapons",
]

export async function getWeapons(page: Page): Promise<Item[]> {
  const items: Item[] = []

  for (const url of urls) {
    log.info(`Scraping ${url}`)

    await page.goto(url)
    const itemsOnPage = await getItemsOnPage(page)
    items.push(...itemsOnPage)
  }

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items.toSorted(sortByRarity)
}

async function getItemsOnPage(page: Page): Promise<Item[]> {
  const rawItems: RawScrapedItem[] = await page.$$eval(
    `.mw-parser-output > .wikitable td:first-of-type .bg3wiki-itemicon`,
    (elements) => {
      return elements.map((element) => {
        const classes = [...element.classList]
        const linkElement = element.querySelector("a")
        const name = linkElement!.getAttribute("title")!
        const icon = linkElement!.querySelector("img")!.src
        const relativeWikiLink = linkElement!.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`

        return { name, icon, wikiLink, classes }
      })
    },
  )

  return uniqueItems(rawItems).map(classesToRarity)
}
