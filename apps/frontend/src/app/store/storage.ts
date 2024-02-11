import { useVueFlow, type FlowExportObject } from "@vue-flow/core"
import { useTitle } from "@vueuse/core"
import { useToast } from "primevue/usetoast"
import { download, parseJsonFile } from "../utils"
import { useFileDialog } from "@vueuse/core"
import { first } from "lodash-es"

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

  async function load() {
    const flow: FlowExportObject = JSON.parse(localStorage.getItem(STORAGE_KEY))

    if (flow) {
      await fromObject(flow)
      setTimeout(() => {
        hasUnsavedChanges.value = false
      })
    }
  }

  const { open, onChange } = useFileDialog({
    accept: "text/*",
    multiple: false,
  })

  onChange(async (files) => {
    const file = first(files)
    await loadFileIntoFlow(file)
  })

  function saveToFile() {
    const defaultFileName = "bg3 walkthrough plan.json"
    download(defaultFileName, JSON.stringify(toObject()))
    hasUnsavedChanges.value = false
  }

  function loadFromFile() {
    open()
  }

  async function loadFileIntoFlow(file: File) {
    try {
      const data = await parseJsonFile<FlowExportObject>(file)
      if (!data.nodes) {
        toast.add({
          summary: "The selected file doesn't seem to contain any elements.",
          detail: "The loading was skipped.",
          severity: "warn",
        })
        return
      }
      await fromObject(data)

      setTimeout(() => {
        hasUnsavedChanges.value = false
      })
    } catch (error) {
      if (error instanceof Error) {
        const detail =
          error instanceof SyntaxError
            ? "The selected file doesn't seem to contain valid JSON."
            : error.message

        toast.add({
          summary: "Failed to load file",
          detail,
          severity: "error",
        })
      } else {
        throw error
      }
    }
  }

  return {
    hasUnsavedChanges,
    save,
    load,
    saveToFile,
    loadFromFile,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStorageStore, import.meta.hot))
}
