<template>
  <div
    class="bg-card flex h-[152px] cursor-move gap-2.5 rounded-md p-2 py-4 shadow-lg"
  >
    <img
      class="before:bg-surface-300 after:i-lucide-image-off relative shrink-0 rounded-md before:absolute before:inset-0 after:absolute after:left-1/2 after:top-1/2 after:h-8 after:w-8 after:-translate-x-1/2 after:-translate-y-1/2"
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
        <div class="text-surface-200 mb-1 text-sm leading-4 text-opacity-90">
          {{ location.description }}.
        </div>
      </div>

      <div class="text-primary-300 text-sm text-opacity-80">
        {{ location.act }}, {{ location.area }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"

defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
})
</script>
