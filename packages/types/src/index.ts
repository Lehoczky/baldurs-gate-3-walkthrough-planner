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
  act: z.string(),
  area: z.string(),
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

export const savedWikiDataSchema = z.strictObject({
  weapons: z.array(itemSchema),
  clothes: z.array(itemSchema),
  armours: z.array(itemSchema),
  shields: z.array(itemSchema),
  headwears: z.array(itemSchema),
  cloaks: z.array(itemSchema),
  amulets: z.array(itemSchema),
  rings: z.array(itemSchema),
  footwears: z.array(itemSchema),
  handwears: z.array(itemSchema),
  arrows: z.array(itemSchema),
  coatings: z.array(itemSchema),
  elixirs: z.array(itemSchema),
  potions: z.array(itemSchema),
  grenades: z.array(itemSchema),
  scrolls: z.array(scrollSchema),
  companions: z.array(companionSchema),
  locations: z.array(locationSchema),
  spells: z.array(spellSchema),
  bosses: z.array(bossSchema),
})
export type SavedWikiData = z.infer<typeof savedWikiDataSchema>

export interface Category {
  name: keyof SavedWikiData
  icon: string
}
