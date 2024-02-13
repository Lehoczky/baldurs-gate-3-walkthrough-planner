<template>
  <div>
    <Handle type="source" :position="Position.Top" />
    <Handle type="source" :position="Position.Bottom" />
    <Handle type="source" :position="Position.Left" />
    <Handle type="source" :position="Position.Right" />
    <BaseLocation
      :location="data"
      class="w-[30rem]"
      aria-haspopup="true"
      @contextmenu="contextMenu.show($event)"
    />
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"

import { defineDeleteMenuItem } from "../../contextmenu"

interface NodeData extends Location {}

defineProps<NodeProps<NodeData>>()

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = ref<ContextMenu>()
const contextMenuItems = ref<MenuItem[]>([
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])
</script>

<style>
.vue-flow__node-location {
  @apply rounded-md;
}

.vue-flow__node-location.selected {
  @apply ring-surface-500 ring-4;
}
</style>
