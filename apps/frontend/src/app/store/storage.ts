import { useVueFlow, type FlowExportObject } from "@vue-flow/core"
import { useTitle } from "@vueuse/core"
import { useToast } from "primevue/usetoast"

const STORAGE_KEY = "wp:saved-flow"

export const useStorageStore = defineStore("storage", () => {
  const hasUnsavedChanges = ref(false)
  const title = computed(() => {
    return hasUnsavedChanges.value
      ? "Walkthrough planner * | Baldur's Gate 3"
      : "Walkthrough planner | Baldur's Gate 3"
  })
  useTitle(title)

  const { toObject, fromObject } = useVueFlow({ id: "main" })

  const toast = useToast()
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toObject()))
    hasUnsavedChanges.value = false
    toast.add({
      summary: "Save Successful",
      severity: "success",
      life: 1000,
    })
  }

  function load() {
    const flow: FlowExportObject = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (flow) {
      hasUnsavedChanges.value = false
      fromObject(flow)
    }
  }

  return {
    hasUnsavedChanges,
    save,
    load,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStorageStore, import.meta.hot))
}
