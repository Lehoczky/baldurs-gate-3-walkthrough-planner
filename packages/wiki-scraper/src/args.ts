import { parseArgs as _parseArgs } from "node:util"

import type { SavedWikiData } from "@bg3-walkthrough-planner/types"

export function parseArgs() {
  const { values } = _parseArgs({
    options: {
      only: {
        type: "string",
      },
    },
    allowPositionals: false,
  })

  const only = values.only?.split(" ")

  return {
    shouldScrape: (category: keyof SavedWikiData) => {
      return !only || only.includes(category)
    },
  }
}
