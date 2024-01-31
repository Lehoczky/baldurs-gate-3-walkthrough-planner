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

function toItem({ classes, name, icon, wikiLink }: RawScrapedItem): Item {
  return {
    name,
    icon,
    wikiLink,
    rarity: rarityBasedOnClassList(classes),
  }
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

export function generateLogMessageForDuplicateItems(items: Item[]) {
  const count = items.length
  const infoHeading = `Removed ${count} duplicates: `
  const infoList = items.map((item) => item.name).join(", ")
  return infoHeading + infoList
}

export interface ItemWithArmourType {
  name: string
  icon: string
  wikiLink: string
  rarity: string
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

/** Utils */

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
