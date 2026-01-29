import type { Scroll } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

import { classesToRarity, sortByRarity, uniqueItems } from "../shared/item.ts"

const itemNamePlural = "scrolls"
const url = "https://bg3.wiki/wiki/Scrolls"

export async function getScrolls(page: Page): Promise<Scroll[]> {
  log.info(`Scraping ${url}`)

  await page.goto(url)
  const items = await getItemsOnPage(page)

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items.toSorted(sortByRarity)
}

async function getItemsOnPage(page: Page): Promise<Scroll[]> {
  const nthDivColItemSelector = (n: number) =>
    `.mw-parser-output .div-col:nth-of-type(${n + 1}) .bg3wiki-itemicon`

  const categories = [
    { selector: nthDivColItemSelector(5), level: "Cantrip" },
    { selector: nthDivColItemSelector(6), level: "Level 1" },
    { selector: nthDivColItemSelector(7), level: "Level 2" },
    { selector: nthDivColItemSelector(8), level: "Level 3" },
    { selector: nthDivColItemSelector(9), level: "Level 4" },
    { selector: nthDivColItemSelector(10), level: "Level 5" },
    { selector: nthDivColItemSelector(11), level: "Level 6" },
  ]

  const promises = categories.map(({ selector, level }) => {
    return page.$$eval(
      selector,
      (elements, { level }) => {
        return elements.map((element) => {
          const classes = [...element.classList]
          const linkElement = element.querySelector("a")!
          const name = linkElement.getAttribute("title")!
          const icon = linkElement.querySelector("img")!.src
          const relativeWikiLink = linkElement.getAttribute("href")
          const wikiLink = `https://bg3.wiki${relativeWikiLink}`

          return { name, icon, wikiLink, classes, level }
        })
      },
      { level },
    )
  })

  const scrollsByCategory = await Promise.all(promises)

  return uniqueItems(scrollsByCategory.flat()).map(classesToRarity)
}
