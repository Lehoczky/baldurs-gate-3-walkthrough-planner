export type ItemsByRarity = Record<Rarity, Item[]>

export type Rarity =
  | "Common"
  | "Uncommon"
  | "Rare"
  | "Very Rare"
  | "Legendary"
  | "Story Item"

export interface Item {
  name: string
  icon: string
  wikiLink: string
}
