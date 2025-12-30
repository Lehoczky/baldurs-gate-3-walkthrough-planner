import { useVueFlow } from "@vue-flow/core"
import { computed } from "vue"

export function useDeselectElements() {
  const { getSelectedElements, addSelectedNodes, addSelectedEdges } =
    useVueFlow()

  const areAnyElementsSelected = computed(() => {
    return Boolean(getSelectedElements.value.length)
  })

  function deselectElements() {
    if (areAnyElementsSelected.value) {
      addSelectedNodes([])
      addSelectedEdges([])
    }
  }

  return {
    deselectElements,
  }
}
