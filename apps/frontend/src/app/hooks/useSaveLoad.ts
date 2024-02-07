import { useVueFlow, type FlowExportObject } from "@vue-flow/core"
import { useToast } from "primevue/usetoast"

export function useSaveLoad() {
  const toast = useToast()
  const { toObject, fromObject } = useVueFlow()

  function save() {
    localStorage.setItem("wp:saved-flow", JSON.stringify(toObject()))
    toast.add({
      summary: "Save Successful",
      severity: "success",
      life: 1000,
    })
  }

  function load() {
    const flow: FlowExportObject = JSON.parse(
      localStorage.getItem("wp:saved-flow"),
    )

    if (flow) {
      fromObject(flow)
    }
  }

  return {
    save,
    load,
  }
}
