<script setup lang="ts">
import { onClickOutside } from "@vueuse/core"
import { ref, useTemplateRef } from "vue"

import DataFilters from "./DataFilters.vue"

const open = ref(false)
const root = useTemplateRef("root")
onClickOutside(root, () => (open.value = false))
</script>

<template>
  <div
    ref="root"
    class="-translate-y-full bg-surface-900 px-4 pt-3 pb-6 transition-transform ease-out"
    :class="{
      'translate-y-0!': open,
    }"
  >
    <DataFilters />
    <button
      :title="open ? '' : 'Help'"
      class="absolute -bottom-1 left-1/2 grid -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border border-surface-800 bg-surface-900 px-2 py-1 text-sm leading-none"
      @click="open = !open"
    >
      <span>Filters</span>
    </button>
  </div>
</template>
