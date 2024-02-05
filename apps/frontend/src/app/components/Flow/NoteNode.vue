<template>
  <div
    class="flex h-full overflow-auto rounded-md bg-yellow-300 p-4 text-slate-800 shadow-lg"
  >
    <NodeResizer :min-width="120" :min-height="120" />
    <div aria-haspopup="true" @contextmenu="contextMenu.show($event)">
      <textarea
        v-if="editing"
        ref="textarea"
        v-model="text"
        class="nodrag mt-0.5 w-full flex-1 resize-none bg-yellow-300 text-sm text-slate-800 outline-none placeholder:italic placeholder:text-slate-500"
        placeholder="Write something here..."
      />
      <div
        v-else
        class="prose prose-sm max-w-none flex-1 cursor-text"
        @dblclick="startEditing"
        v-html="renderedText"
      />
    </div>
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<script setup lang="ts">
import { useNode, type NodeProps, useVueFlow } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import { onClickOutside } from "@vueuse/core"
import { useMarkdownIt } from "../../hooks/useMarkdownIt"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { defineDeleteMenuItem } from "../../contextmenu"

const props = defineProps<NodeProps>()

const { node } = useNode()
const editing = ref(false)
const textarea = ref<HTMLTextAreaElement>()
const text = ref(props.label as string)
const renderedText = useMarkdownIt(computed(() => node.label as string))

async function startEditing() {
  editing.value = true
  await nextTick()
  textarea.value.select()
}

onClickOutside(textarea, () => {
  editing.value = false
  node.label = text.value
})

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = ref<ContextMenu>()
const contextMenuItems = ref<MenuItem[]>([
  {
    label: "Edit",
    icon: "i-lucide-edit-3",
    command: () => startEditing(),
  },
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])
</script>

<style>
.vue-flow__node-note {
  @apply rounded-md;
}

.vue-flow__node-note.selected {
  @apply ring-4 ring-yellow-400;
}
</style>
