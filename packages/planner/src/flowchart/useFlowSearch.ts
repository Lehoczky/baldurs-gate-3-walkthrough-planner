import { useVueFlow } from "@vue-flow/core"
import { without } from "es-toolkit/array"
import { computed, type ComputedRef, shallowRef, watch } from "vue"

const isShown = shallowRef(false)
const searchText = shallowRef("")
const matchedNodes = shallowRef<string[]>([])

export function useFlowSearch() {
  const { onNodesChange } = useVueFlow()

  function toggle(): void {
    isShown.value = !isShown.value
  }
  function hide(): void {
    isShown.value = false
    searchText.value = ""
  }

  function checkMatch(
    nodeId: string,
    callback: () => string,
  ): ComputedRef<boolean> {
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
        matchedNodes.value = isMatched
          ? [...matchedNodes.value, nodeId]
          : without(matchedNodes.value, nodeId)
      },
      { immediate: true },
    )

    return isMatched
  }

  onNodesChange((changes) => {
    for (const change of changes) {
      if (change.type === "remove") {
        matchedNodes.value = without(matchedNodes.value, change.id)
      }
    }
  })

  return { searchText, isShown, matchedNodes, toggle, hide, checkMatch }
}
