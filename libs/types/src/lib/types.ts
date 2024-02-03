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
