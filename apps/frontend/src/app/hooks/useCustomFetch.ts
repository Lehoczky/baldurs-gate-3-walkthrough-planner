import { createFetch } from "@vueuse/core"

export const useCustomFetch = createFetch({
  baseUrl: "/baldurs-gate-3-walkthrough-planner",
})
