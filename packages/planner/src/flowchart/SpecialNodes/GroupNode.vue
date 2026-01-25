<script setup lang="ts">
import { Handle, type NodeProps, Position } from "@vue-flow/core"
import { useNode, useVueFlow } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import { useToString } from "@vueuse/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { defineAsyncComponent, ref, useTemplateRef } from "vue"

import { defineDeleteMenuItem } from "@/ui/contextmenu"

const props = defineProps<NodeProps>()
const labelAsString = useToString(props.data.label)

const showDialog = ref(false)
const LazyGroupLabelDialog = defineAsyncComponent({
  loader: () => import("./GroupLabelDialog.vue"),
  delay: 0,
})

const { id, node } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = useTemplateRef("contextMenu")
const contextMenuItems = ref<MenuItem[]>([
  {
    label: "Edit Group Name",
    icon: "i-lucide-message-square-text",
    command: () => (showDialog.value = true),
  },
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])

function editGroupName(value: string | undefined) {
  if (value !== undefined) {
    node.data.label = value
  }
  showDialog.value = false
}
</script>

<template>
  <div
    class="group-node relative h-full rounded-md border-4 border-current text-primary-600 shadow-lg"
  >
    <Handle id="group-handle-1" type="target" :position="Position.Top" />
    <Handle id="group-handle-2" type="source" :position="Position.Bottom" />
    <Handle id="group-handle-3" type="source" :position="Position.Left" />
    <Handle id="group-handle-4" type="source" :position="Position.Right" />
    <NodeResizer :min-width="240" :min-height="240" />
    <div
      aria-haspopup="true"
      @dblclick="showDialog = true"
      @contextmenu="contextMenu.show($event)"
    >
      <div
        class="absolute top-0 right-0 rounded-bl-lg border-b-2 border-l-2 border-current bg-surface-950 px-6 py-3"
      >
        {{ labelAsString }}
      </div>
    </div>
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
    <LazyGroupLabelDialog
      v-if="showDialog"
      :label="labelAsString"
      @close="editGroupName"
    />
  </div>
</template>

<style>
@reference "@/style.css";

.vue-flow__node-group {
  @apply rounded-md;
}

.vue-flow__node-group.selected {
  @apply ring-4 ring-primary-800;
}
</style>

<style scoped>
.group-node {
  --handle-bg: var(--color-primary-500);
  --handle-border: var(--color-primary-300);
}
</style>
