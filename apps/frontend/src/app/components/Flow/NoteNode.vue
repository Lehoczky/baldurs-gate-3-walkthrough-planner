<template>
  <div
    class="flex h-full overflow-auto rounded-md bg-yellow-300 p-4 text-slate-800 shadow-lg"
  >
    <NodeResizer :min-width="120" :min-height="120" />
    <textarea
      ref="textarea"
      v-if="editing"
      v-model="text"
      class="nodrag flex-1 resize-none bg-yellow-300 text-slate-800 outline-none"
      placeholder="Write something here..."
    />
    <div
      v-else
      class="prose prose-sm max-w-none flex-1 cursor-text"
      @dblclick="startEditing"
      v-html="renderedText"
    />
  </div>
</template>

<script setup lang="ts">
import { useNode, type NodeProps } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import { onClickOutside } from "@vueuse/core"
import { useMarkdownIt } from "../../hooks/useMarkdownIt"

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
</script>
