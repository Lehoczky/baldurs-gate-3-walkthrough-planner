import { computed, type ComputedRef, shallowRef, watch } from "vue"

const isShown = shallowRef(false)
const searchText = shallowRef("")
const matchedCount = shallowRef(0)

export function useFlowSearch() {
  function toggle(): void {
    isShown.value = !isShown.value
  }
  function hide(): void {
    isShown.value = false
    searchText.value = ""
  }

  function checkMatch(callback: () => string): ComputedRef<boolean> {
    const isMatched = computed(() => {
      if (!searchText.value) {
        return true
      }

      const text = callback().toLowerCase()
      const textToSearch = searchText.value.toLowerCase()
      return text.includes(textToSearch)
    })

    watch(
      isMatched,
      (isMatched) => {
        const matchCountDiff = isMatched ? 1 : -1
        matchedCount.value += matchCountDiff
      },
      { immediate: true },
    )

    return isMatched
  }

  return { searchText, isShown, matchedCount, toggle, hide, checkMatch }
}
