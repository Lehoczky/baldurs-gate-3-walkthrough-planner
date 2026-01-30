import type { Item } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import {
  type RawScrapedItem,
  sortByRarity,
  toItem,
  uniqueItems,
} from "../shared/item.ts"

const itemNamePlural = "armours"
const url = "https://bg3.wiki/wiki/Armour"

export async function getArmours(page: Page): Promise<Item[]> {
  log.info(`Scraping ${url}`)

  await page.goto(url)
  const items = await getItemsOnPage(page)

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items.toSorted(sortByRarity)
}

async function getItemsOnPage(page: Page): Promise<Item[]> {
  const rawItems: RawScrapedItem[] = await page.$$eval(
    `.mw-parser-output > table:nth-of-type(n+1):nth-of-type(-n+4) td:first-of-type .bg3wiki-itemicon`,
    (elements) => {
      return elements.map((element) => {
        const classes = [...element.classList]
        const linkElement = element.querySelector("a")
        const name = linkElement!.getAttribute("title")!
        const icon = linkElement!.querySelector("img")!.src
        const wikiLink = linkElement!.getAttribute("href")!

        return { name, icon, wikiLink, classes }
      })
    },
  )

  return uniqueItems(rawItems).map(toItem)
}
