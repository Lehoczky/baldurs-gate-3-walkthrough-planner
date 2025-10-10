export interface Companion {
  name: string
  icon: string
  wikiLink: string
}

export interface Item {
  name: string
  icon: string
  wikiLink: string
  rarity: string
}

export interface ItemWithArmourType extends Item {
  armourType: string
}

export interface Scroll extends Item {
  level: string
}

export interface Location {
  name: string
  description: string
  act: string
  area: string
  icon: string
  wikiLink: string
}

export interface Spell {
  name: string
  icon: string
  wikiLink: string
  level: string
}

export interface Boss {
  name: string
  icon: string
  wikiLink: string
}

export interface SavedWikiData {
  weapons: Item[]
  clothes: Item[]
  armours: Item[]
  shields: Item[]
  headwears: Item[]
  cloaks: Item[]
  amulets: Item[]
  rings: Item[]
  footwears: Item[]
  handwears: Item[]
  arrows: Item[]
  coatings: Item[]
  elixirs: Item[]
  potions: Item[]
  grenades: Item[]
  scrolls: Item[]
  companions: Companion[]
  locations: Location[]
  spells: Spell[]
  bosses: Boss[]
}

export interface Category {
  name: keyof SavedWikiData
  icon: string
}
