import { z } from "zod"

export const companionSchema = z.strictObject({
  name: z.string(),
  icon: z.url(),
  wikiLink: z.url(),
})
export type Companion = z.infer<typeof companionSchema>

export const itemSchema = z.strictObject({
  name: z.string(),
  icon: z.url(),
  wikiLink: z.url(),
  rarity: z.string(),
})
export type Item = z.infer<typeof itemSchema>

export const raritySchema = z.enum([
  "Common",
  "Uncommon",
  "Rare",
  "Very Rare",
  "Legendary",
  "Story Item",
  "???",
])
export type Rarity = z.infer<typeof raritySchema>

export const itemWithArmourTypeSchema = z.strictObject({
  ...itemSchema.shape,
  armourType: z.string(),
})
export type ItemWithArmourType = z.infer<typeof itemWithArmourTypeSchema>

export const scrollSchema = z.strictObject({
  ...itemSchema.shape,
  level: z.string(),
})
export type Scroll = z.infer<typeof scrollSchema>

export const locationSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
  act: z.strictObject({
    name: z.string(),
    link: z.url(),
  }),
  area: z.strictObject({
    name: z.string(),
    link: z.string(),
  }),
  icon: z.url(),
  wikiLink: z.url(),
})
export type Location = z.infer<typeof locationSchema>

export const spellSchema = z.strictObject({
  name: z.string(),
  icon: z.url(),
  wikiLink: z.url(),
  level: z.string(),
  school: z.enum([
    "Abjuration",
    "Conjuration",
    "Divination",
    "Enchantment",
    "Evocation",
    "Illusion",
    "Necromancy",
    "Transmutation",
  ]),
})
export type Spell = z.infer<typeof spellSchema>

export const bossSchema = z.strictObject({
  name: z.string(),
  icon: z.url(),
  wikiLink: z.url(),
})
export type Boss = z.infer<typeof bossSchema>

export const traderSchema = z.strictObject({
  name: z.string(),
  icon: z.url(),
  wikiLink: z.url(),
  location: z.string(),
  goods: z.string(),
})
export type Trader = z.infer<typeof traderSchema>

export const savedWikiDataSchema = z.strictObject({
  weapons: z.array(itemSchema).default([]),
  clothes: z.array(itemSchema).default([]),
  armours: z.array(itemSchema).default([]),
  shields: z.array(itemSchema).default([]),
  headwears: z.array(itemSchema).default([]),
  cloaks: z.array(itemSchema).default([]),
  amulets: z.array(itemSchema).default([]),
  rings: z.array(itemSchema).default([]),
  footwears: z.array(itemSchema).default([]),
  handwears: z.array(itemSchema).default([]),
  arrows: z.array(itemSchema).default([]),
  coatings: z.array(itemSchema).default([]),
  elixirs: z.array(itemSchema).default([]),
  potions: z.array(itemSchema).default([]),
  grenades: z.array(itemSchema).default([]),
  scrolls: z.array(scrollSchema).default([]),
  companions: z.array(companionSchema).default([]),
  locations: z.array(locationSchema).default([]),
  spells: z.array(spellSchema).default([]),
  bosses: z.array(bossSchema).default([]),
  traders: z.array(traderSchema).default([]),
})
export type SavedWikiData = z.infer<typeof savedWikiDataSchema>

export interface Category {
  name: keyof SavedWikiData
  icon: string
}
