<script setup lang="ts">
import { type NodeProps, useNode, useVueFlow } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import { onClickOutside } from "@vueuse/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { computed, onMounted, ref, useTemplateRef } from "vue"

import { defineDeleteMenuItem } from "../../contextmenu"
import { useMarkdownIt } from "../../hooks/useMarkdownIt"

const props = defineProps<NodeProps>()

const { node } = useNode()
const editing = ref()
const textarea = useTemplateRef("textarea")
const text = ref(props.data.label as string)
const renderedText = useMarkdownIt(computed(() => node.data.label as string))

function startEditing() {
  editing.value = true
  setTimeout(() => textarea.value.select(), 50)
}

onClickOutside(textarea, () => {
  editing.value = false
  node.data.label = text.value
})

onMounted(() => {
  if (props.data.editing) {
    startEditing()
  }
})

const { id } = useNode()
const { removeNodes } = useVueFlow()
const contextMenu = useTemplateRef("contextMenu")
const contextMenuItems = ref<MenuItem[]>([
  {
    label: "Edit",
    icon: "i-lucide-edit-3",
    command: () => startEditing(),
  },
  defineDeleteMenuItem({ command: () => removeNodes(id) }),
])
</script>

<template>
  <div
    class="relative flex h-full rounded-md bg-yellow-300 text-slate-800 shadow-lg"
  >
    <NodeResizer :min-width="120" :min-height="120" />
    <div
      aria-haspopup="true"
      class="nowheel w-full overflow-hidden rounded-md"
      @contextmenu="contextMenu.show($event)"
    >
      <textarea
        v-if="editing"
        ref="textarea"
        v-model="text"
        class="nodrag scrollbar-thin scrollbar-track-yellow-400 scrollbar-thumb-yellow-600 mt-0.5 h-full w-full flex-1 resize-none bg-yellow-300 p-4 text-sm text-slate-800 outline-none placeholder:text-slate-500 placeholder:italic"
        placeholder="Write something here..."
      />
      <div
        v-else
        class="scrollbar-thin scrollbar-track-yellow-400 scrollbar-thumb-yellow-600 prose prose-sm h-full max-w-none flex-1 cursor-text overflow-auto p-4 prose-slate"
        @dblclick="startEditing"
        v-html="renderedText"
      />
    </div>
    <div
      v-if="editing"
      class="absolute top-0 right-4 flex -translate-y-1/2 items-center gap-1 rounded-full bg-yellow-400 px-2 py-1.5 text-sm leading-none font-medium shadow"
    >
      <span class="i-lucide-edit-3" />
      <span>Editing</span>
    </div>
    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<style>
@reference "../../style.css";

.vue-flow__node-note {
  @apply rounded-md;
}

.vue-flow__node-note.selected {
  @apply ring-4 ring-yellow-400;
}
</style>
