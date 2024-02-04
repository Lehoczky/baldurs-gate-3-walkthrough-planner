<template>
  <div class="h-full">
    <NodeResizer :min-width="110" :min-height="110" />
    <Handle type="target" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <Handle type="source" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
    <div
      class="bg-surface-900 flex h-full items-center gap-1 rounded-md p-2 text-sm leading-4 shadow-lg"
      @contextmenu="contextMenu.show($event)"
      aria-haspopup="true"
    >
      <ItemIcon :src="data.icon" :rarity="data.rarity" />
      <div>{{ label }}</div>
    </div>
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import ContextMenu from "primevue/contextmenu"

import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"
import type { MenuItem } from "primevue/menuitem"

interface NodeData {
  icon: Item["icon"]
  rarity: string
}

defineProps<NodeProps<NodeData>>()

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = ref<ContextMenu>()
const contextMenuItems = ref<MenuItem[]>([
  { label: "Delete", icon: "i-lucide-delete", command: () => removeNodes(id) },
])
</script>
