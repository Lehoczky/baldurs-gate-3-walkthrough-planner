import type { Item, Rarity } from "@bg3-walkthrough-planner/types"
import { uniqBy } from "es-toolkit/array"

export interface RawScrapedItem {
  name: string
  icon: string
  wikiLink: string
  classes: string[]
}

const rarityPriority: Record<string, number> = {
  "???": 0,
  Common: 0,
  Uncommon: 1,
  Rare: 2,
  "Very Rare": 3,
  Legendary: 4,
  "Story Item": 5,
}

export function uniqueItems<T extends RawScrapedItem>(items: T[]): T[] {
  return uniqBy(items, (item) => item.wikiLink)
}

export function sortByRarity<T extends Item>(a: T, b: T): number {
  return rarityPriority[b.rarity] - rarityPriority[a.rarity]
}

export function toItem({ classes, wikiLink, ...props }: RawScrapedItem): Item {
  return {
    ...props,
    wikiLink: `https://bg3.wiki${wikiLink}`,
    rarity: rarityBasedOnClassList(classes),
  }
}

function rarityBasedOnClassList(classes: string[]): Rarity {
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
