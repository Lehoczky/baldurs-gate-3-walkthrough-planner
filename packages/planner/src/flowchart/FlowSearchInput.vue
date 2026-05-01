<script setup lang="ts">
import { useVueFlow } from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"
import Button from "primevue/button"
import { computed, onMounted, useTemplateRef } from "vue"

import { useFlowSearch } from "./useFlowSearch"

const flowSearch = useFlowSearch()
const { getNodes } = useVueFlow()
const nodeCount = computed(() => {
  return getNodes.value.length
})

const element = useTemplateRef("root")
useEventListener(element, "keydown", (event) => {
  if (event.key === "Escape") {
    flowSearch.hide()
  }
})

const input = useTemplateRef("input")
onMounted(() => {
  input.value.focus()
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
        v-model="flowSearch.searchText.value"
        type="text"
        class="flex-1 outline-0"
      />
      <div v-if="flowSearch.searchText.value" class="text-sm text-muted-color">
        {{ flowSearch.matchedCount }} / {{ nodeCount }}
      </div>
    </div>
    <Button
      variant="text"
      size="small"
      rounded
      aria-label="Cancel search"
      class="aspect-square [--p-button-sm-padding-x:4px]"
      @click="flowSearch.hide()"
    >
      <span class="i-ri-close-line"></span>
    </Button>
  </div>
</template>
