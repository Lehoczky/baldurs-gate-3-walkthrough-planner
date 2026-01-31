<script setup lang="ts">
import type { Trader } from "@bg3-walkthrough-planner/types"
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { ref, useTemplateRef } from "vue"

import { defineDeleteMenuItem } from "@/ui/contextmenu"

import BaseLocation from "./BaseTrader.vue"

interface NodeData extends Trader {}

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
    <Handle id="trader-handle-1" type="source" :position="Position.Top" />
    <Handle id="trader-handle-2" type="source" :position="Position.Bottom" />
    <Handle id="trader-handle-3" type="source" :position="Position.Left" />
    <Handle id="trader-handle-4" type="source" :position="Position.Right" />
    <BaseLocation
      :trader="data"
      class="w-120"
      aria-haspopup="true"
      @contextmenu="contextMenu.show($event)"
    />
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<style>
@reference "@/style.css";

.vue-flow__node-trader {
  @apply rounded-md;
}

.vue-flow__node-trader.selected {
  @apply ring-4 ring-surface-500;
}
</style>
