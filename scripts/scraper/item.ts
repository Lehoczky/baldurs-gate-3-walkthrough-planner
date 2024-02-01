import { countBy } from "lodash-es"
import type { Page } from "playwright"

interface RawScrapedItem {
  name: string
  icon: string
  wikiLink: string
  classes: string[]
}

export interface Item {
  name: string
  icon: string
  wikiLink: string
  rarity: string
}

/** Equipment */

export async function getEasyToScrapeEquipmentsFromPage(
  page: Page,
): Promise<Item[]> {
  const itemLinksSelector = `.mw-parser-output > table .bg3wiki-itemicon`

  const scrapedItems = await page
    .locator(itemLinksSelector)
    .evaluateAll((elements) =>
      elements.map((element) => {
        const classes = Array.from(element.classList)
        const linkElement = element.querySelector("a")
        const name = linkElement.getAttribute("title")
        const icon = linkElement.querySelector("img").src
        const relativeWikiLink = linkElement.getAttribute("href")
        const wikiLink = `https://bg3.wiki${relativeWikiLink}`

        return { name, icon, wikiLink, classes }
      }),
    )
  return scrapedItems.map(toItem)
}

export function separateItemDuplicates(items: Item[]): [Item[], Item[]] {
  const filteredItems: Item[] = []
  const usedWikiLinks: string[] = []
  const duplicates: Item[] = []

  for (const cloth of items) {
    if (usedWikiLinks.includes(cloth.wikiLink)) {
      duplicates.push(cloth)
    } else {
      filteredItems.push(cloth)
      usedWikiLinks.push(cloth.wikiLink)
    }
  }

  return [filteredItems, duplicates]
}

export function generateLogMessageForDuplicateItems(duplicates: Item[]) {
  const count = duplicates.length
  const infoHeading = `Removed ${count} duplicates: `
  const duplicatesWithCount = countBy(duplicates, (item) => item.name)
  const infoList = Object.entries(duplicatesWithCount)
    .map(([name, count]) => `${name} (${count})`)
    .join(", ")
    .trimEnd()
  return infoHeading + infoList
}

export interface ItemWithArmourType extends Item {
  armourType: string
}

interface ItemWithArmourTypeScrapeCategory {
  armourType: string
  selector: string
}

export async function getArmoursFromPage(
  page: Page,
): Promise<ItemWithArmourType[]> {
  return await scrapeArmourCategories(page, [
    {
      armourType: "Light armour",
      selector: `.mw-parser-output > table:nth-of-type(1) .bg3wiki-itemicon`,
    },
    {
      armourType: "Medium armour",
      selector: `.mw-parser-output > table:nth-of-type(2) .bg3wiki-itemicon`,
    },
    {
      armourType: "Heavy armour",
      selector: `.mw-parser-output > table:nth-of-type(3) .bg3wiki-itemicon`,
    },
  ])
}

export async function getHeadwearsFromPage(page: Page) {
  return await scrapeArmourCategories(page, [
    {
      armourType: "Non-Armour",
      selector: `.mw-parser-output > table:nth-of-type(1) .bg3wiki-itemicon`,
    },
    {
      armourType: "Light armour",
      selector: `.mw-parser-output > table:nth-of-type(2) .bg3wiki-itemicon`,
    },
    {
      armourType: "Medium armour",
      selector: `.mw-parser-output > table:nth-of-type(3) .bg3wiki-itemicon`,
    },
    {
      armourType: "Heavy armour",
      selector: `.mw-parser-output > table:nth-of-type(4) .bg3wiki-itemicon`,
    },
  ])
}

export async function getFootwearsFromPage(page: Page) {
  return await scrapeArmourCategories(page, [
    {
      armourType: "Non-Armour",
      selector: `.mw-parser-output > table:nth-of-type(1) .bg3wiki-itemicon`,
    },
    {
      armourType: "Light armour",
      selector: `.mw-parser-output > table:nth-of-type(2) .bg3wiki-itemicon`,
    },
    {
      armourType: "Medium armour",
      selector: `.mw-parser-output > table:nth-of-type(3) .bg3wiki-itemicon`,
    },
    {
      armourType: "Heavy armour",
      selector: `.mw-parser-output > table:nth-of-type(4) .bg3wiki-itemicon`,
    },
  ])
}

export async function getHandwearFromPage(page: Page) {
  return await scrapeArmourCategories(page, [
    {
      armourType: "Non-Armour",
      selector: `.mw-parser-output > table:nth-of-type(1) .bg3wiki-itemicon`,
    },
    {
      armourType: "Light armour",
      selector: `.mw-parser-output > table:nth-of-type(2) .bg3wiki-itemicon`,
    },
    {
      armourType: "Medium armour",
      selector: `.mw-parser-output > table:nth-of-type(3) .bg3wiki-itemicon`,
    },
    {
      armourType: "Heavy armour",
      selector: `.mw-parser-output > table:nth-of-type(4) .bg3wiki-itemicon`,
    },
  ])
}

async function scrapeArmourCategories(
  page: Page,
  categories: ItemWithArmourTypeScrapeCategory[],
) {
  const promises = categories.map((category) =>
    scrapeWithArmourType(page, category),
  )
  const armoursByCategory = await Promise.all(promises)
  return armoursByCategory.flat()
}

async function scrapeWithArmourType(
  page: Page,
  { selector, armourType }: ItemWithArmourTypeScrapeCategory,
) {
  const scrapedItems = await page.locator(selector).evaluateAll((elements) =>
    elements.map((element) => {
      const classes = Array.from(element.classList)
      const linkElement = element.querySelector("a")
      const name = linkElement.getAttribute("title")
      const icon = linkElement.querySelector("img").src
      const relativeWikiLink = linkElement.getAttribute("href")
      const wikiLink = `https://bg3.wiki${relativeWikiLink}`

      return { classes, name, icon, wikiLink }
    }),
  )
  return scrapedItems.map(toItem).map((item) => ({ ...item, armourType }))
}

/** Consumables */

export async function getEquipmentsFromTableWithRarityColumnFromPage(
  page: Page,
  itemRowSelector = `.mw-parser-output > table > tbody tr`,
) {
  return await page.locator(itemRowSelector).evaluateAll((elements) =>
    elements.map((element) => {
      const linkElement =
        element.querySelector<HTMLAnchorElement>("td:nth-child(1) a")
      const name = linkElement.getAttribute("title")
      const icon = linkElement.querySelector("img").src
      const relativeWikiLink = linkElement.getAttribute("href")
      const wikiLink = `https://bg3.wiki${relativeWikiLink}`
      const rarityCell = element.querySelector("td:nth-child(2)")
      const rarity = rarityCell.textContent.trim()

      return { name, icon, wikiLink, rarity }
    }),
  )
}

export async function getElixirsFromPage(page: Page) {
  const normalElixirs =
    await getEquipmentsFromTableWithRarityColumnFromPage(page)

  // Yeah, I'm hardcoding it. Not worth to scrape for just this one item
  const elixirOfUniversalResistance: Item = {
    name: "Elixir of Universal Resistance",
    icon: "/w/images/thumb/b/bb/ELX_Elixir_of_Universal_Resistance_Unfaded_Icon.png/40px-ELX_Elixir_of_Universal_Resistance_Unfaded_Icon.png",
    rarity: "Very Rare",
    wikiLink: "https://bg3.wiki/wiki/Elixir_of_Universal_Resistance",
  }
  return [...normalElixirs, elixirOfUniversalResistance]
}

export async function getGrenadesFromPage(page: Page) {
  const getRegularGrenadesAndExplosiveSatchels =
    getEasyToScrapeEquipmentsFromPage(page)
  const getSpecialGrenades = getEquipmentsFromTableWithRarityColumnFromPage(
    page,
    `.mw-parser-output > table:nth-of-type(3) > tbody tr`,
  )
  const grenades = Promise.all([
    getRegularGrenadesAndExplosiveSatchels,
    getSpecialGrenades,
  ])
  return (await grenades).flat()
}

interface Scroll extends Item {
  level: string
}

export async function getScrollsFromPage(page: Page): Promise<Scroll[]> {
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

  const promises = categories.map(({ selector, level }) =>
    page.locator(selector).evaluateAll(
      (elements, level) =>
        elements.map((element) => {
          const classes = Array.from(element.classList)
          const linkElement = element.querySelector("a")
          const name = linkElement.getAttribute("title")
          const icon = linkElement.querySelector("img").src
          const relativeWikiLink = linkElement.getAttribute("href")
          const wikiLink = `https://bg3.wiki${relativeWikiLink}`

          return { name, icon, wikiLink, classes, level }
        }),
      level,
    ),
  )
  const scrollsByCategory = await Promise.all(promises)

  return scrollsByCategory.flat().map(({ classes, ...props }) => ({
    ...props,
    rarity: rarityBasedOnClassList(classes),
  }))
}

/** Utils */

function toItem({ classes, ...props }: RawScrapedItem): Item {
  return {
    ...props,
    rarity: rarityBasedOnClassList(classes),
  }
}

function rarityBasedOnClassList(classes: string[]) {
  if (classes.includes("bg3wiki-itemicon-common")) {
    return "Common"
  }
  if (classes.includes("bg3wiki-itemicon-uncommon")) {
    return "Uncommon"
  }
  if (classes.includes("bg3wiki-itemicon-rare")) {
    return "Rare"
  }
  if (classes.includes("bg3wiki-itemicon-very-rare")) {
    return "Very Rare"
  }
  if (classes.includes("bg3wiki-itemicon-legendary")) {
    return "Legendary"
  }
  if (classes.includes("bg3wiki-itemicon-story")) {
    return "Story Item"
  }
  return "???"
}
