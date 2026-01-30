import { chromium } from "playwright"

import { parseArgs } from "./args.ts"
import { getAmulets } from "./pages/amulets.ts"
import { getArmours } from "./pages/armours.ts"
import { getWeapons } from "./pages/weapons.ts"
import { getSavedData, saveData } from "./saved-data.ts"

const { shouldScrape } = parseArgs()
const savedData = await getSavedData()

const browser = await chromium.launch()
const page = await browser.newPage()

if (shouldScrape("amulets")) savedData.amulets = await getAmulets(page)
if (shouldScrape("armours")) savedData.armours = await getArmours(page)
// TODO
if (shouldScrape("arrows")) savedData.armours = await getArmours(page)
if (shouldScrape("bosses")) savedData.armours = await getArmours(page)
if (shouldScrape("cloaks")) savedData.armours = await getArmours(page)
if (shouldScrape("clothes")) savedData.armours = await getArmours(page)
if (shouldScrape("coatings")) savedData.armours = await getArmours(page)
if (shouldScrape("companions")) savedData.armours = await getArmours(page)
if (shouldScrape("elixirs")) savedData.armours = await getArmours(page)
if (shouldScrape("footwears")) savedData.armours = await getArmours(page)
if (shouldScrape("grenades")) savedData.armours = await getArmours(page)
if (shouldScrape("handwears")) savedData.armours = await getArmours(page)
if (shouldScrape("headwears")) savedData.armours = await getArmours(page)
if (shouldScrape("locations")) savedData.armours = await getArmours(page)
if (shouldScrape("potions")) savedData.armours = await getArmours(page)
if (shouldScrape("rings")) savedData.armours = await getArmours(page)
if (shouldScrape("scrolls")) savedData.armours = await getArmours(page)
if (shouldScrape("shields")) savedData.armours = await getArmours(page)
if (shouldScrape("spells")) savedData.armours = await getArmours(page)
// TODO ends
if (shouldScrape("weapons")) savedData.weapons = await getWeapons(page)

await saveData(savedData)
