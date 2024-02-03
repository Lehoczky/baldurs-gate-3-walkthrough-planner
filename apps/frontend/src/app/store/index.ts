import type { SavedWikiData } from "@baldurs-gate-3-walkthrough-planner/types"
import { useFetch } from "@vueuse/core"

export const useStore = defineStore("store", () => {
  const {
    data,
    isFinished: storeLoaded,
    execute: fetchStoreData,
  } = useFetch("/data.json", {
    immediate: false,
    initialData: {},
  }).json<SavedWikiData>()

  const searchText = ref("")
  const categories = computed(() => Object.keys(data.value))
  const selectedCategory = ref("weapons")
  const entitiesForSelectedCategory = computed(() => {
    return data.value[selectedCategory.value] ?? []
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
    selectedCategory,
  }
})
