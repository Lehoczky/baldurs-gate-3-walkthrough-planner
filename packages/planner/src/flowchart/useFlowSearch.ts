import { computed, type ComputedRef, shallowRef } from "vue"

const isShown = shallowRef(false)
const searchText = shallowRef("")

export function useFlowSearch() {
  function toggle(): void {
    isShown.value = !isShown.value
  }
  function hide(): void {
    isShown.value = false
    searchText.value = ""
  }

  function checkMatch(callback: () => string): ComputedRef<boolean> {
    return computed(() => {
      if (!searchText.value) {
        return true
      }

      const text = callback().toLowerCase()
      const textToSearch = searchText.value.toLowerCase()
      return text.includes(textToSearch)
    })
  }

  return { searchText, isShown, toggle, hide, checkMatch }
}
