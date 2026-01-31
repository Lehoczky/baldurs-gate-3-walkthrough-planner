import type { Trader } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import { uniqueItems } from "../shared/item.ts"

const itemNamePlural = "traders"
const url = "https://bg3.wiki/wiki/List_of_traders"

export async function getTraders(page: Page): Promise<Trader[]> {
  log.info(`Scraping ${url}`)

  await page.goto(url)
  const items = await getItemsOnPage(page)

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items
}

async function getItemsOnPage(page: Page): Promise<Trader[]> {
  const rawItems = await page.$$eval(
    `.mw-parser-output > .wikitable tr:has(td)`,
    (elements) => {
      return elements.map((element) => {
        const firstCol = element.querySelector("td:nth-of-type(1)")!
        const linkElement = firstCol.querySelector("a")!
        const name = firstCol.querySelector("a")!.getAttribute("title")!
        const icon = firstCol.querySelector("img")!.src
        const relativeWikiLink = linkElement!.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`

        const secondCol = element.querySelector("td:nth-of-type(2)")!
        const location = secondCol.textContent

        const lastCol = element.querySelector("td:nth-of-type(4)")!
        const goods = lastCol.textContent

        return {
          name,
          icon,
          wikiLink,
          location,
          goods,
        }
      })
    },
  )

  return uniqueItems(rawItems)
}
