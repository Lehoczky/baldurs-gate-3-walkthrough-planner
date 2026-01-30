import type { Item } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import { sortByRarity, uniqueItems } from "../shared/item.ts"

const itemNamePlural = "arrows"
const url = "https://bg3.wiki/wiki/Arrows"

export async function getArrows(page: Page): Promise<Item[]> {
  log.info(`Scraping ${url}`)

  await page.goto(url)
  const items = await getItemsOnPage(page)

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items.toSorted(sortByRarity)
}

async function getItemsOnPage(page: Page): Promise<Item[]> {
  const rawItems: Item[] = await page.$$eval(
    `.mw-parser-output > table > tbody tr`,
    (elements) => {
      return elements.map((element) => {
        const linkElement =
          element.querySelector<HTMLAnchorElement>(":nth-child(1) a")
        const name = linkElement!.getAttribute("title")!
        const icon = linkElement!.querySelector("img")!.src
        const relativeWikiLink = linkElement!.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`
        const rarityCell = element.querySelector("td:nth-child(2)")
        const rarity = rarityCell!.textContent.trim()

        return { name, icon, wikiLink, rarity }
      })
    },
  )

  return uniqueItems(rawItems)
}
