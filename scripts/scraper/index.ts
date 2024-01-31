import path from "node:path"

import { consola } from "consola"
import ora from "ora"
import type { Response } from "playwright"
import { chromium } from "playwright"

import { writeJsonFile } from "./fsExtra"
import type { Item } from "./item"
import {
  generateLogMessageForDuplicateItems,
  getArmoursFromPage,
  getEasyToScrapeEquipmentsFromPage,
  getFootwearsFromPage,
  getHandwearFromPage,
  getHeadwearsFromPage,
  separateItemDuplicates,
} from "./item"

async function main() {
  const spinner = ora("Opening browser page").start()
  const browser = await chromium.launch()
  const context = await browser.newContext()
  const page = await context.newPage()
  spinner.succeed("Browser opened")

  try {
    const weapons = await scrapeItemType({
      itemName: "weapons",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/List_of_Weapons"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const clothes = await scrapeItemType({
      itemName: "clothes",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Clothing"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const shields = await scrapeItemType({
      itemName: "shields",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Shields"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const cloaks = await scrapeItemType({
      itemName: "cloaks",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Cloaks"),
      scraperFn: () => getEasyToScrapeEquipmentsFromPage(page),
    })
    const amulets = await scrapeItemType({
      itemName: "amulets",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Amulets"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const rings = await scrapeItemType({
      itemName: "rings",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Rings"),
      scraperFn: () => getHandwearFromPage(page),
    })
    const armours = await scrapeItemType({
      itemName: "armours",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Armour"),
      scraperFn: () => getArmoursFromPage(page),
    })
    const headwears = await scrapeItemType({
      itemName: "headwears",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Headwear"),
      scraperFn: () => getHeadwearsFromPage(page),
    })
    const footwears = await scrapeItemType({
      itemName: "footwear",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Footwear"),
      scraperFn: () => getFootwearsFromPage(page),
    })
    const handwears = await scrapeItemType({
      itemName: "handwears",
      gotoFn: () => page.goto("https://bg3.wiki/wiki/Handwear"),
      scraperFn: () => getHandwearFromPage(page),
    })

    const filePath = path.join("public", "items.json")
    await writeJsonFile(filePath, {
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
    })
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
  gotoFn: () => Promise<Response>
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
    consola.info(generateLogMessageForDuplicateItems(duplicates))

    const itemsCountWithoutDuplicates = itemsWithoutDuplicates.length
    consola.info(`Found ${itemsCountWithoutDuplicates} ${itemName} in total\n`)
    return itemsWithoutDuplicates
  } catch (error) {
    spinner.fail(`Couldn't retrieve ${itemName}`)
    throw error
  }
}

await main()
