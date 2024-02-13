<template>
  <div class="rounded-md bg-black px-6 py-3 text-slate-100 shadow-lg">
    <div aria-haspopup="true" @contextmenu="contextMenu.show($event)">
      {{ label }}
    </div>
    <Handle type="target" :position="Position.Left" />
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position, useNode, useVueFlow } from "@vue-flow/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { defineDeleteMenuItem } from "../../contextmenu"

defineProps<NodeProps>()

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = ref<ContextMenu>()
const contextMenuItems = ref<MenuItem[]>([
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])
</script>

<style>
.vue-flow__node-end {
  @apply rounded-md;
}

.vue-flow__node-end.selected {
  @apply ring-4 ring-slate-700;
}
</style>
