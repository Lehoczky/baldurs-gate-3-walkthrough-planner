import path from "node:path"

import type { SavedWikiData } from "@bg3-walkthrough-planner/types"
import { consola } from "consola"
import ora from "ora"
import { chromium } from "playwright"

import { writeJsonFile } from "./fsExtra.ts"
import { bosses } from "./pages/bosses.ts"
import { companions } from "./pages/companions.ts"
import {
  getArmoursFromPage,
  getEasyToScrapeEquipmentsFromPage,
  getElixirsFromPage,
  getEquipmentsFromTableWithRarityColumnFromPage,
  getFootwearsFromPage,
  getGrenadesFromPage,
  getHandwearFromPage,
  getHeadwearsFromPage,
  getScrollsFromPage,
  scrapeItemType,
} from "./pages/item.ts"
import { locations } from "./pages/locations.ts"
import { scrapeSpells } from "./pages/spells.ts"

const DATA_FILE_PATH = path.join("../planner/public/data.json")

async function main() {
  const spinner = ora("Opening browser page").start()
  const browser = await chromium.launch()
  const context = await browser.newContext({ baseURL: "https://bg3.wiki/" })
  const page = await context.newPage()
  spinner.succeed("Browser opened")

  try {
    const commonWeapons = await scrapeItemType({
      itemName: "common weapons",
      gotoFn: () => page.goto("/wiki/List_of_common_weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const uncommonWeapons = await scrapeItemType({
      itemName: "uncommon weapons",
      gotoFn: () => page.goto("/wiki/List_of_uncommon_weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const rareWeapons = await scrapeItemType({
      itemName: "rare weapons",
      gotoFn: () => page.goto("/wiki/List_of_rare_weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const veryRareWeapons = await scrapeItemType({
      itemName: "very rare weapons",
      gotoFn: () => page.goto("/wiki/List_of_very_rare_weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const legendaryWeapons = await scrapeItemType({
      itemName: "legendary weapons",
      gotoFn: () => page.goto("/wiki/List_of_legendary_weapons"),
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
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const elixirs = await scrapeItemType({
      itemName: "elixirs",
      gotoFn: () => page.goto("/wiki/Elixirs"),
      scraperFn: () => getElixirsFromPage(page),
    })
    const potions = await scrapeItemType({
      itemName: "potions",
      gotoFn: () => page.goto("/wiki/Potions"),
      scraperFn: () =>
        getEasyToScrapeEquipmentsFromPage(
          page,
          `.mw-parser-output > table th .bg3wiki-itemicon`,
        ),
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

    const scrapedData: SavedWikiData = {
      weapons: [
        ...legendaryWeapons,
        ...veryRareWeapons,
        ...rareWeapons,
        ...uncommonWeapons,
        ...commonWeapons,
      ],
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
    await writeJsonFile(DATA_FILE_PATH, scrapedData)
    consola.success(`Saved scraped items to: ${DATA_FILE_PATH}`)
  } catch (error) {
    consola.error(error)
  } finally {
    await context.close()
    await browser.close()
  }
}

await main()
