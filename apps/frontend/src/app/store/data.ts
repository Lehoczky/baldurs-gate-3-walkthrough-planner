import type { SavedWikiData } from "@baldurs-gate-3-walkthrough-planner/types"
import { useFetch } from "@vueuse/core"
import { categories as categories_ } from "../constants/categories"
import { first } from "lodash-es"

export const useDataStore = defineStore("data", () => {
  const {
    data,
    isFinished: storeLoaded,
    execute: fetchStoreData,
  } = useFetch("/data.json", {
    immediate: false,
    initialData: {},
  }).json<SavedWikiData>()

  const searchText = ref("")
  const categories = ref(categories_)
  const selectedCategoryName = ref(first(categories_).name)
  const entitiesForSelectedCategory = computed(() => {
    return data.value[selectedCategoryName.value] ?? []
  })

  const shownEntities = computed(() => {
    if (!searchText.value) {
      return entitiesForSelectedCategory.value
    }

    return entitiesForSelectedCategory.value.filter(({ name }) =>
      name.toLowerCase().startsWith(searchText.value.toLowerCase()),
    )
  })

  return {
    data,
    categories,
    storeLoaded,
    fetchStoreData,
    entitiesForSelectedCategory,
    shownEntities,
    searchText,
    selectedCategoryName,
  }
})
