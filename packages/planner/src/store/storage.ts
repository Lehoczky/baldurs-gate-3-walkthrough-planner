import {
  type EdgeChange,
  type FlowExportObject,
  type NodeChange,
  useVueFlow,
} from "@vue-flow/core"
import { useTitle } from "@vueuse/core"
import { useFileDialog } from "@vueuse/core"
import { acceptHMRUpdate, defineStore } from "pinia"
import { useToast } from "primevue/usetoast"
import { computed, ref } from "vue"

const STORAGE_KEY = "planner:saved-flow"

interface SavedData {
  savedAt: string
  flow: FlowExportObject
}

export const useStorageStore = defineStore("storage", () => {
  const hasSave = ref(hasNonEmptyFlowInStorage())
  const hasUnsavedChanges = ref(false)
  const title = computed(() => {
    return hasUnsavedChanges.value
      ? "* Walkthrough planner | Baldur's Gate 3"
      : "Walkthrough planner | Baldur's Gate 3"
  })
  useTitle(title)

  function hasNonEmptyFlowInStorage() {
    const flowInStorage = localStorage.getItem(STORAGE_KEY)
    if (!flowInStorage) {
      return false
    }

    try {
      const parsedFlow = JSON.parse(flowInStorage)
      const nodes = parsedFlow?.flow?.nodes
      return Array.isArray(nodes) && nodes.length
    } catch {
      return false
    }
  }

  const { toObject, fromObject } = useVueFlow()

  function flowToObject() {
    const flowObject = toObject()
    for (const node of flowObject.nodes) {
      if (node.type === "note") {
        node.data.editing = false
      }
    }
    return flowObject
  }

  const toast = useToast()
  function save() {
    const savedData: SavedData = {
      savedAt: new Date().toDateString(),
      flow: flowToObject(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedData))
    hasUnsavedChanges.value = false
    hasSave.value = true
    toast.add({
      summary: "Save Successful",
      severity: "success",
      life: 1000,
    })
  }

  async function load() {
    const savedData: SavedData = JSON.parse(localStorage.getItem(STORAGE_KEY)!)

    if (savedData) {
      await fromObject(savedData.flow)
      setTimeout(() => {
        hasUnsavedChanges.value = false
        toast.add({
          summary: `Loaded save from ${savedData.savedAt}`,
          severity: "info",
          life: 2500,
        })
      })
    }
  }

  const { open, onChange } = useFileDialog({
    accept: "text/*",
    multiple: false,
  })

  onChange(async (files) => {
    const file = files![0]
    await loadFileIntoFlow(file!)
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

  function updateSavedState(changes: Array<NodeChange | EdgeChange>) {
    const shouldUpdateSavedState = changes.some(({ type }) => type !== "select")
    if (shouldUpdateSavedState) {
      hasUnsavedChanges.value = true
    }
  }

  return {
    hasUnsavedChanges,
    updateSavedState,
    save,
    load,
    saveToFile,
    loadFromFile,
    hasSave,
  }
})

/**
 * Opens the user's system file dialog prompting to download
 * the given data.
 *
 * @param fileName default name of the saved file. This is what will show up as file name in the user's file dialog.
 * @param data the content of the file.
 * @param mime [mime type](https://developer.mozilla.org/en-US/docs/Glossary/MIME_type) of the file
 * @param bom
 */
function download(
  fileName: string,
  data: string | ArrayBuffer | ArrayBufferView | Blob,
  mime = "text/plain",
  bom?: string | Uint8Array,
) {
  const blobData = bom === undefined ? [data] : [bom, data]
  const blob = new Blob(blobData as any, { type: mime })
  const a = document.createElement("a")

  a.download = fileName
  a.href = URL.createObjectURL(blob)
  a.click()
  setTimeout(() => {
    URL.revokeObjectURL(a.href)
    a.remove()
  }, 200)
}

async function parseJsonFile<T = any>(file: File) {
  const text = await file.text()
  return JSON.parse(text) as T
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStorageStore, import.meta.hot))
}
