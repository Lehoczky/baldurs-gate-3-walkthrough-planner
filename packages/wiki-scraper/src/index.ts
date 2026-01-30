import { chromium } from "playwright"

import { parseArgs } from "./args.ts"
import { getAmulets } from "./pages/amulets.ts"
import { getArmours } from "./pages/armours.ts"
import { getCompanions } from "./pages/companions.ts"
import { getLocations } from "./pages/locations.ts"
import { getWeapons } from "./pages/weapons.ts"
import { getSavedData, saveData } from "./saved-data.ts"

const { shouldScrape } = parseArgs()
const savedData = await getSavedData()

const browser = await chromium.launch()
const page = await browser.newPage()

if (shouldScrape("amulets")) savedData.amulets = await getAmulets(page)
if (shouldScrape("armours")) savedData.armours = await getArmours(page)
// TODO
if (shouldScrape("arrows")) savedData.arrows = await getArmours(page)
// if (shouldScrape("bosses")) savedData.bosses = await getArmours(page)
// if (shouldScrape("cloaks")) savedData.cloaks = await getArmours(page)
// if (shouldScrape("clothes")) savedData.clothes = await getArmours(page)
// if (shouldScrape("coatings")) savedData.coatings = await getArmours(page)
if (shouldScrape("companions")) savedData.companions = getCompanions()
// if (shouldScrape("elixirs")) savedData.elixirs = await getArmours(page)
// if (shouldScrape("footwears")) savedData.footwears = await getArmours(page)
// if (shouldScrape("grenades")) savedData.grenades = await getArmours(page)
// if (shouldScrape("handwears")) savedData.handwears = await getArmours(page)
// if (shouldScrape("headwears")) savedData.headwears = await getArmours(page)
if (shouldScrape("locations")) savedData.locations = getLocations()
// if (shouldScrape("potions")) savedData.potions = await getArmours(page)
// if (shouldScrape("rings")) savedData.rings = await getArmours(page)
// if (shouldScrape("scrolls")) savedData.scrolls = await getArmours(page)
// if (shouldScrape("shields")) savedData.shields = await getArmours(page)
// if (shouldScrape("spells")) savedData.spells = await getArmours(page)
// TODO ends
if (shouldScrape("weapons")) savedData.weapons = await getWeapons(page)

await saveData(savedData)
