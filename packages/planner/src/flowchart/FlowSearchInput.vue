<script setup lang="ts">
import { useEventListener } from "@vueuse/core"
import Button from "primevue/button"
import { onMounted, useTemplateRef } from "vue"

import { useFlowSearch } from "./useFlowSearch"

const flowSearch = useFlowSearch()

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
    <input
      ref="input"
      v-model="flowSearch.searchText.value"
      type="text"
      class="outline-0"
    />
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
