import type { Item } from "@bg3-walkthrough-planner/types"

const rarityPriority: Record<string, number> = {
  "???": 0,
  Common: 0,
  Uncommon: 1,
  Rare: 2,
  "Very Rare": 3,
  Legendary: 4,
  "Story Item": 5,
}

export function sortByRarity(items: Item[]) {
  return [...items].sort(
    (a, b) => rarityPriority[b.rarity] - rarityPriority[a.rarity],
  )
}
