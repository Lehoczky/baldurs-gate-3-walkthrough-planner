<script setup lang="ts">
import type { Location } from "@bg3-walkthrough-planner/types"
import type { PropType } from "vue"

defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex h-[152px] cursor-move gap-2.5 rounded-md bg-surface-800 p-2 py-4 shadow-lg"
  >
    <img
      class="pointer-events-none relative shrink-0 rounded-md before:absolute before:inset-0 before:bg-surface-300 after:absolute after:top-1/2 after:left-1/2 after:i-lucide-image-off after:h-8 after:w-8 after:-translate-x-1/2 after:-translate-y-1/2 max-sm:pointer-events-none"
      :src="location.icon"
      width="210"
      height="118px"
      alt=""
    />

    <div class="my-1 flex flex-1 flex-col">
      <div class="flex flex-1 flex-col">
        <a
          :href="location.wikiLink"
          class="mb-1.5 text-xl leading-6 underline-offset-2 hover:underline"
          target="_blank"
        >
          {{ location.name }}
        </a>
        <div class="text-opacity-90 mb-1 text-sm leading-4 text-surface-200">
          {{ location.description }}.
        </div>
      </div>

      <div class="text-opacity-80 text-sm text-primary-300">
        {{ location.act }}, {{ location.area }}
      </div>
    </div>
  </div>
</template>
