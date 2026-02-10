import type { Category, SavedWikiData } from "@bg3-walkthrough-planner/types"
import { useFetch } from "@vueuse/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref, watch } from "vue"

const categories_: Category[] = [
  {
    name: "amulets",
    icon: "https://bg3.wiki/w/images/thumb/0/08/Keepsake_Locket_A_Faded.png/196px-Keepsake_Locket_A_Faded.png",
  },
  {
    name: "armours",
    icon: "https://bg3.wiki/w/images/thumb/2/21/Padded_Armour_Icon.png/196px-Padded_Armour_Icon.png",
  },
  {
    name: "arrows",
    icon: "https://bg3.wiki/w/images/thumb/b/b4/Arrow_of_Fire_Faded.png/196px-Arrow_of_Fire_Faded.png",
  },
  {
    name: "bosses",
    icon: "https://bg3.wiki/w/images/thumb/e/ea/Creatures.png/150px-Creatures.png",
  },
  {
    name: "cloaks",
    icon: "https://bg3.wiki/w/images/thumb/2/2a/Cloak_Of_Protection_Faded.png/196px-Cloak_Of_Protection_Faded.png",
  },
  {
    name: "clothes",
    icon: "https://bg3.wiki/w/images/thumb/8/87/Simple_Robe_Icon.png/196px-Simple_Robe_Icon.png",
  },
  {
    name: "coatings",
    icon: "https://bg3.wiki/w/images/thumb/f/f5/COAT_Arsonist%27s_Oil_Faded.png/196px-COAT_Arsonist%27s_Oil_Faded.png",
  },
  {
    name: "companions",
    icon: "https://bg3.wiki/w/images/thumb/7/7d/Companions.png/150px-Companions.png",
  },
  {
    name: "creatures",
    icon: "https://bg3.wiki/w/images/thumb/5/5a/NPCs.png/100px-NPCs.png.webp",
  },
  {
    name: "elixirs",
    icon: "https://bg3.wiki/w/images/thumb/b/bc/ELX_Elixir_of_Cold_Resistance_Faded.png/196px-ELX_Elixir_of_Cold_Resistance_Faded.png",
  },
  {
    name: "footwears",
    icon: "https://bg3.wiki/w/images/thumb/7/73/Boots_Leather_Faded.png/196px-Boots_Leather_Faded.png",
  },
  {
    name: "grenades",
    icon: "https://bg3.wiki/w/images/b/b7/GRN_Smokepowder_Bomb_Faded.png",
  },
  {
    name: "handwears",
    icon: "https://bg3.wiki/w/images/thumb/8/8d/Gloves_Metal_Icon.png/196px-Gloves_Metal_Icon.png",
  },
  {
    name: "headwears",
    icon: "https://bg3.wiki/w/images/thumb/a/a4/Circlet_of_Fire_Icon.png/196px-Circlet_of_Fire_Icon.png",
  },
  {
    name: "locations",
    icon: "https://bg3.wiki/w/images/thumb/c/c2/Waypoint.png/150px-Waypoint.png",
  },
  {
    name: "potions",
    icon: "https://bg3.wiki/w/images/thumb/c/ce/POT_Potion_of_Everlasting_Vigour_Faded.png/196px-POT_Potion_of_Everlasting_Vigour_Faded.png",
  },
  {
    name: "rings",
    icon: "https://bg3.wiki/w/images/thumb/6/63/Crushers_Ring_Icon.png/196px-Crushers_Ring_Icon.png",
  },
  {
    name: "scrolls",
    icon: "https://bg3.wiki/w/images/thumb/7/7f/Scroll_of_Magic_Missile_Faded.png/196px-Scroll_of_Magic_Missile_Faded.png",
  },
  {
    name: "shields",
    icon: "https://bg3.wiki/w/images/thumb/9/9d/Studded_Shield_Icon.png/196px-Studded_Shield_Icon.png",
  },
  {
    name: "spells",
    icon: "https://bg3.wiki/w/images/thumb/1/19/Magic_Missile_Icon.png/150px-Magic_Missile_Icon.png",
  },
  {
    name: "traders",
    icon: "https://bg3.wiki/w/images/a/ac/Trade_Icon.png",
  },
  {
    name: "weapons",
    icon: "https://bg3.wiki/w/images/thumb/f/f1/Greataxe_Faded.png/196px-Greataxe_Faded.png",
  },
]

type EntityPredicate = (entity: any) => boolean

export const useDataStore = defineStore("data", () => {
  const {
    data,
    error,
    isFinished: storeLoaded,
    execute: fetchStoreData,
  } = useFetch("/baldurs-gate-3-walkthrough-planner/data.json", {
    immediate: false,
    initialData: {},
  }).json<SavedWikiData>()

  const categories = ref(categories_)
  const selectedCategoryName = ref(categories_[0]!.name)
  const entitiesForSelectedCategory = computed(() => {
    return data.value![selectedCategoryName.value] ?? []
  })

  const filters = ref<
    Record<keyof SavedWikiData, Record<string, EntityPredicate>>
  >({
    weapons: {},
    clothes: {},
    armours: {},
    shields: {},
    headwears: {},
    cloaks: {},
    amulets: {},
    rings: {},
    footwears: {},
    handwears: {},
    arrows: {},
    coatings: {},
    elixirs: {},
    potions: {},
    grenades: {},
    scrolls: {},
    companions: {},
    locations: {},
    spells: {},
    bosses: {},
    traders: {},
    creatures: {},
  })

  const searchText = ref("")
  const shownEntities = computed(() => {
    const filtered = entitiesForSelectedCategory.value.filter((entity) => {
      const filtersForCategory = Object.values(
        filters.value[selectedCategoryName.value],
      )
      return filtersForCategory.every((filter) => filter(entity) === true)
    })

    if (!searchText.value) {
      return filtered
    }
    return filtered.filter(({ name }) =>
      name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  })
  watch(selectedCategoryName, (name) => {
    filters.value[name] = {}
  })

  interface AddFilterProps {
    category: keyof SavedWikiData
    name: string
    filter: EntityPredicate | null
  }
  function addFilter({ category, name, filter }: AddFilterProps) {
    if (filter) {
      filters.value[category][name] = filter
    } else {
      delete filters.value[category][name]
    }
  }

  watch(selectedCategoryName, () => (searchText.value = ""))

  return {
    data,
    error,
    categories,
    storeLoaded,
    fetchStoreData,
    entitiesForSelectedCategory,
    shownEntities,
    searchText,
    selectedCategoryName,
    addFilter,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
