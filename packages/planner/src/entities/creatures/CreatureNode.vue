<script setup lang="ts">
import type { Creature } from "@bg3-walkthrough-planner/types"
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { ref, useTemplateRef } from "vue"

import { defineDeleteMenuItem } from "@/ui/contextmenu"

import BaseCreature from "./BaseCreature.vue"

interface NodeData extends Creature {}

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
    <Handle id="handle-1" type="source" :position="Position.Top" />
    <Handle id="handle-2" type="source" :position="Position.Bottom" />
    <Handle id="handle-3" type="source" :position="Position.Left" />
    <Handle id="handle-4" type="source" :position="Position.Right" />
    <BaseCreature
      :creature="data"
      aria-haspopup="true"
      @contextmenu="contextMenu.show($event)"
    />
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<style>
@reference "@/style.css";

.vue-flow__node-creature {
  @apply rounded-md;
}

.vue-flow__node-creature.selected {
  @apply ring-4 ring-surface-500;
}
</style>
