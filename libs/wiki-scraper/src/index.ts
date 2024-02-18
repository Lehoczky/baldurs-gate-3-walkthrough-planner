import path from "node:path"

import type {
  Item,
  SavedWikiData,
} from "@baldurs-gate-3-walkthrough-planner/types"
import { consola } from "consola"
import ora from "ora"
import type { Response } from "playwright"
import { chromium } from "playwright"

import { bosses } from "./lib/bosses"
import { companions } from "./lib/companions"
import { writeJsonFile } from "./lib/fsExtra"
import {
  generateLogMessageForDuplicateItems,
  getArmoursFromPage,
  getEasyToScrapeEquipmentsFromPage,
  getElixirsFromPage,
  getEquipmentsFromTableWithRarityColumnFromPage,
  getFootwearsFromPage,
  getGrenadesFromPage,
  getHandwearFromPage,
  getHeadwearsFromPage,
  getScrollsFromPage,
  separateItemDuplicates,
} from "./lib/item"
import { locations } from "./lib/locations"
import { sortByRarity } from "./lib/sorter"
import { scrapeSpells } from "./lib/spells"

async function main() {
  const spinner = ora("Opening browser page").start()
  const browser = await chromium.launch()
  const context = await browser.newContext({ baseURL: "https://bg3.wiki/" })
  const page = await context.newPage()
  spinner.succeed("Browser opened")

  try {
    const weapons = await scrapeItemType({
      itemName: "weapons",
      gotoFn: () => page.goto("/wiki/List_of_Weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const clothes = await scrapeItemType({
      itemName: "clothes",
      gotoFn: () => page.goto("/wiki/Clothing"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const shields = await scrapeItemType({
      itemName: "shields",
      gotoFn: () => page.goto("/wiki/Shields"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const cloaks = await scrapeItemType({
      itemName: "cloaks",
      gotoFn: () => page.goto("/wiki/Cloaks"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const amulets = await scrapeItemType({
      itemName: "amulets",
      gotoFn: () => page.goto("/wiki/Amulets"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const rings = await scrapeItemType({
      itemName: "rings",
      gotoFn: () => page.goto("/wiki/Rings"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const armours = await scrapeItemType({
      itemName: "armours",
      gotoFn: () => page.goto("/wiki/Armour"),
      scraperFn: () => getArmoursFromPage(page),
    })
    const headwears = await scrapeItemType({
      itemName: "headwears",
      gotoFn: () => page.goto("/wiki/Headwear"),
      scraperFn: () => getHeadwearsFromPage(page),
    })
    const footwears = await scrapeItemType({
      itemName: "footwear",
      gotoFn: () => page.goto("/wiki/Footwear"),
      scraperFn: () => getFootwearsFromPage(page),
    })
    const handwears = await scrapeItemType({
      itemName: "handwears",
      gotoFn: () => page.goto("/wiki/Handwear"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const arrows = await scrapeItemType({
      itemName: "arrows",
      gotoFn: () => page.goto("/wiki/Arrows"),
      scraperFn: () => getEquipmentsFromTableWithRarityColumnFromPage(page),
    })
    const coatings = await scrapeItemType({
      itemName: "coatings",
      gotoFn: () => page.goto("/wiki/Coatings"),
      scraperFn: () => getEquipmentsFromTableWithRarityColumnFromPage(page),
    })
    const elixirs = await scrapeItemType({
      itemName: "elixirs",
      gotoFn: () => page.goto("/wiki/Elixirs"),
      scraperFn: () => getElixirsFromPage(page),
    })
    const potions = await scrapeItemType({
      itemName: "potions",
      gotoFn: () => page.goto("/wiki/Potions"),
      scraperFn: () => getEquipmentsFromTableWithRarityColumnFromPage(page),
    })
    const grenades = await scrapeItemType({
      itemName: "grenades",
      gotoFn: () => page.goto("/wiki/Grenades"),
      scraperFn: () => getGrenadesFromPage(page),
    })
    const scrolls = await scrapeItemType({
      itemName: "scrolls",
      gotoFn: () => page.goto("/wiki/Scrolls"),
      scraperFn: () => getScrollsFromPage(page),
    })

    const spells = await scrapeSpells(page)
    consola.success(`Successfully scraped ${spells.length} spells`)

    const filePath = path.join(
      "../../",
      "apps",
      "frontend",
      "public",
      "data.json",
    )
    const scrapedData: SavedWikiData = {
      weapons,
      clothes,
      armours,
      shields,
      headwears,
      cloaks,
      amulets,
      rings,
      footwears,
      handwears,
      arrows,
      coatings,
      elixirs,
      potions,
      grenades,
      scrolls,
      companions,
      locations,
      spells,
      bosses,
    }
    await writeJsonFile(filePath, scrapedData)
    consola.success(`Saved scraped items to: ${filePath}`)
  } catch (error) {
    consola.error(error)
  } finally {
    await context.close()
    await browser.close()
  }
}
interface ScrapeItemTypeParams {
  itemName: string
  gotoFn: () => Promise<Response | null>
  scraperFn: () => Promise<Item[]>
}

async function scrapeItemType({
  itemName,
  gotoFn,
  scraperFn,
}: ScrapeItemTypeParams) {
  const spinner = ora(`Scraping ${itemName}`).start()
  try {
    await gotoFn()

    const items = await scraperFn()
    const itemsCount = items.length
    spinner.succeed(`Successfully scraped ${itemsCount} ${itemName}`)

    const [itemsWithoutDuplicates, duplicates] = separateItemDuplicates(items)
    if (duplicates.length) {
      consola.info(generateLogMessageForDuplicateItems(duplicates))

      const itemsCountWithoutDuplicates = itemsWithoutDuplicates.length
      const duplicateSummaryMessage = `Found ${itemsCountWithoutDuplicates} ${itemName} in total`
      consola.info(duplicateSummaryMessage)
    }
    consola.log("")

    return sortByRarity(itemsWithoutDuplicates)
  } catch (error) {
    spinner.fail(`Couldn't retrieve ${itemName}`)
    throw error
  }
}

await main()
