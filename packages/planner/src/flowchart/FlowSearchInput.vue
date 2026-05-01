<script setup lang="ts">
import { useVueFlow } from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"
import Button from "primevue/button"
import { computed, onMounted, useTemplateRef, watch } from "vue"

import { useFlowSearch } from "./useFlowSearch"

const { searchText, matchedNodes, hide } = useFlowSearch()
const matchedCount = computed(() => {
  return matchedNodes.value.length
})

const { getNodes, fitView } = useVueFlow()
const nodeCount = computed(() => {
  return getNodes.value.length
})

const element = useTemplateRef("root")
useEventListener(element, "keydown", (event) => {
  if (event.key === "Escape") {
    hide()
  }
})

const input = useTemplateRef("input")
onMounted(() => {
  input.value.focus()
})

let nextNodeIndex = 0
function focusFoundNode() {
  const nodeId = matchedNodes.value[nextNodeIndex]
  fitView({ nodes: [nodeId] })
  nextNodeIndex = (nextNodeIndex + 1) % matchedCount.value
}
watch(searchText, () => {
  nextNodeIndex = 0
})
</script>

<template>
  <div
    ref="root"
    class="absolute top-4 right-4 flex items-center gap-1 rounded-md bg-surface-900 px-3 py-2 ring-surface-800 has-focus-within:ring-2"
  >
    <div class="flex w-3xs items-center gap-2">
      <input
        ref="input"
        v-model="searchText"
        type="text"
        class="flex-1 outline-0"
        @keyup.enter="focusFoundNode()"
      />
      <div v-if="searchText" class="text-sm text-muted-color">
        {{ matchedCount }} / {{ nodeCount }}
      </div>
    </div>
    <Button
      variant="text"
      size="small"
      rounded
      aria-label="Cancel search"
      class="aspect-square [--p-button-sm-padding-x:4px]"
      @click="hide()"
    >
      <span class="i-ri-close-line"></span>
    </Button>
  </div>
</template>
