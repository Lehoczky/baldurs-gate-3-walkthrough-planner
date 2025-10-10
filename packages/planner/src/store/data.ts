import type { SavedWikiData } from "@bg3-walkthrough-planner/types"
import { useFetch } from "@vueuse/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref, watch } from "vue"

import { categories as categories_ } from "../constants/categories"

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

  const searchText = ref("")
  const categories = ref(categories_)
  const selectedCategoryName = ref(categories_[0]!.name)
  const entitiesForSelectedCategory = computed(() => {
    return data.value![selectedCategoryName.value] ?? []
  })

  const shownEntities = computed(() => {
    if (!searchText.value) {
      return entitiesForSelectedCategory.value
    }

    return entitiesForSelectedCategory.value.filter(({ name }) =>
      name.toLowerCase().includes(searchText.value.toLowerCase()),
    )
  })

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
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDataStore, import.meta.hot))
}
