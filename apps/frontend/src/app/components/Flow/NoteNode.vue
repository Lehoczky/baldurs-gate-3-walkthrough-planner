<template>
  <div class="h-full rounded-md bg-yellow-300 p-4 text-slate-800 shadow-lg">
    <NodeResizer :min-width="120" :min-height="120" />
    <textarea
      ref="textarea"
      v-if="editing"
      v-model="text"
      class="nodrag h-full w-full resize-none bg-yellow-300 text-slate-800"
      placeholder="Write something here..."
    />
    <div v-else class="h-full cursor-text" @dblclick="startEditing">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNode, type NodeProps } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"
import { onClickOutside } from "@vueuse/core"

const props = defineProps<NodeProps>()

const { node } = useNode()
const editing = ref(false)
const textarea = ref<HTMLTextAreaElement>()
const text = ref(props.label as string)

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
