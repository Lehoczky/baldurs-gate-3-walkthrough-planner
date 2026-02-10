import { chromium } from "playwright"

import { parseArgs } from "./args.ts"
import { getAmulets } from "./pages/amulets.ts"
import { getArmours } from "./pages/armours.ts"
import { getArrows } from "./pages/arrows.ts"
import { getBosses } from "./pages/bosses.ts"
import { getCloaks } from "./pages/cloaks.ts"
import { getClothes } from "./pages/clothes.ts"
import { getCoatings } from "./pages/coatings.ts"
import { getCompanions } from "./pages/companions.ts"
import { getCreatures } from "./pages/creatures.ts"
import { getElixirs } from "./pages/elixirs.ts"
import { getFootwears } from "./pages/footwears.ts"
import { getGrenades } from "./pages/grenades.ts"
import { getHandwears } from "./pages/handwears.ts"
import { getHeadwears } from "./pages/headwears.ts"
import { getLocations } from "./pages/locations.ts"
import { getPotions } from "./pages/potions.ts"
import { getRings } from "./pages/rings.ts"
import { getScrolls } from "./pages/scrolls.ts"
import { getShields } from "./pages/shields.ts"
import { getSpells } from "./pages/spells.ts"
import { getTraders } from "./pages/traders.ts"
import { getWeapons } from "./pages/weapons.ts"
import { createStorage } from "./saved-data.ts"

const { dryRun, shouldScrape } = parseArgs()
const storage = createStorage({
  dryRun,
})
const savedData = await storage.load()

const browser = await chromium.launch()
const page = await browser.newPage()

try {
  if (shouldScrape("amulets")) savedData.amulets = await getAmulets(page)
  if (shouldScrape("armours")) savedData.armours = await getArmours(page)
  if (shouldScrape("arrows")) savedData.arrows = await getArrows(page)
  if (shouldScrape("bosses")) savedData.bosses = await getBosses(page)
  if (shouldScrape("cloaks")) savedData.cloaks = await getCloaks(page)
  if (shouldScrape("clothes")) savedData.clothes = await getClothes(page)
  if (shouldScrape("coatings")) savedData.coatings = await getCoatings(page)
  if (shouldScrape("companions")) savedData.companions = getCompanions()
  if (shouldScrape("creatures")) savedData.creatures = await getCreatures(page)
  if (shouldScrape("elixirs")) savedData.elixirs = await getElixirs(page)
  if (shouldScrape("footwears")) savedData.footwears = await getFootwears(page)
  if (shouldScrape("grenades")) savedData.grenades = await getGrenades(page)
  if (shouldScrape("handwears")) savedData.handwears = await getHandwears(page)
  if (shouldScrape("headwears")) savedData.headwears = await getHeadwears(page)
  if (shouldScrape("locations")) savedData.locations = getLocations()
  if (shouldScrape("potions")) savedData.potions = await getPotions(page)
  if (shouldScrape("rings")) savedData.rings = await getRings(page)
  if (shouldScrape("scrolls")) savedData.scrolls = await getScrolls(page)
  if (shouldScrape("shields")) savedData.shields = await getShields(page)
  if (shouldScrape("spells")) savedData.spells = await getSpells(page)
  if (shouldScrape("traders")) savedData.traders = await getTraders(page)
  if (shouldScrape("weapons")) savedData.weapons = await getWeapons(page)
} finally {
  browser.close()
}

await storage.save(savedData)
