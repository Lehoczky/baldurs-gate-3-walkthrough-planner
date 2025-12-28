import type { SavedWikiData } from "@bg3-walkthrough-planner/types"
import { useFetch } from "@vueuse/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref, watch } from "vue"

import { categories as categories_ } from "../constants/categories"

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
