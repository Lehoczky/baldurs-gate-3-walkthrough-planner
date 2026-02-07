import type { Boss } from "@bg3-walkthrough-planner/types"
import { log } from "@clack/prompts"
import type { Page } from "playwright"

const itemNamePlural = "bosses"
const url = "https://bg3.wiki/wiki/List_of_Bosses"

export async function getBosses(page: Page): Promise<Boss[]> {
  log.info(`Scraping ${url}`)

  await page.goto(url)
  const items = await getItemsOnPage(page)

  log.success(`Scraped ${items.length} ${itemNamePlural}.`)
  return items
}

async function getItemsOnPage(page: Page): Promise<Boss[]> {
  const bossesPerAct = await page.$$eval(
    `.mw-parser-output h3:has(.mw-headline)`,
    (headlines) => {
      return headlines.map((headline) => {
        const description = headline.nextElementSibling!
        const actLink = description.querySelector("a")!
        const actName = actLink.getAttribute("title")!

        const gallery = description.nextElementSibling!
        const galleryItems = [...gallery.querySelectorAll(".gallerybox")]

        return galleryItems.map((element) => {
          const linkElement = element.querySelector("big a")!
          const name = linkElement.getAttribute("title")!
          const relativeWikiLink = linkElement.getAttribute("href")!
          const wikiLink = `https://bg3.wiki${relativeWikiLink}`

          const image = element.querySelector("img")!
          const relativeImageLink = image.getAttribute("src")!
          const icon = `https://bg3.wiki${relativeImageLink}`

          return { name, icon, wikiLink, act: actName }
        })
      })
    },
  )
  return bossesPerAct.flat()
}
