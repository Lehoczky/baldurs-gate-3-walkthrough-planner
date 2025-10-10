import { useVueFlow } from "@vue-flow/core"
import { computed } from "vue"

export function useDeselectElements() {
  const { getSelectedElements, addSelectedElements } = useVueFlow({
    id: "main",
  })

  const areAnyElementsSelected = computed(() => {
    return Boolean(getSelectedElements.value.length)
  })

  function deselectElements() {
    if (areAnyElementsSelected.value) {
      addSelectedElements([])
    }
  }

  return {
    deselectElements,
  }
}
