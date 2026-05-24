import { useClipboard } from "@vueuse/core"
import type { MenuItem } from "primevue/menuitem"

import { NODE_PROTOCOL } from "./protocol"

export function defineCopyNodeLinkMenuItem(nodeId: string): MenuItem {
  return {
    label: "Copy node link",
    icon: "i-lucide-link",
    command: () => {
      const { copy } = useClipboard()
      copy(createNodeLink(nodeId))
    },
  }
}

export function createNodeLink(nodeId: string): string {
  return `${NODE_PROTOCOL}:${nodeId}`
}
