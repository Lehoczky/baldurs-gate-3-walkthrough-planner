<script setup lang="ts">
import type { Location } from "@bg3-walkthrough-planner/types"
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { ref, useTemplateRef } from "vue"

import { defineDeleteMenuItem } from "@/ui/contextmenu"

import BaseLocation from "./BaseLocation.vue"

interface NodeData extends Location {}

defineProps<NodeProps<NodeData>>()

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = useTemplateRef("contextMenu")
const contextMenuItems = ref<MenuItem[]>([
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])
</script>

<template>
  <div>
    <Handle id="location-handle-1" type="source" :position="Position.Top" />
    <Handle id="location-handle-2" type="source" :position="Position.Bottom" />
    <Handle id="location-handle-3" type="source" :position="Position.Left" />
    <Handle id="location-handle-4" type="source" :position="Position.Right" />
    <BaseLocation
      :location="data"
      class="w-120"
      aria-haspopup="true"
      @contextmenu="contextMenu.show($event)"
    />
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<style>
@reference "@/style.css";

.vue-flow__node-location {
  @apply rounded-md;
}

.vue-flow__node-location.selected {
  @apply ring-4 ring-surface-500;
}
</style>
