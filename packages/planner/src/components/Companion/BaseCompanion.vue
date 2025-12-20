<script setup lang="ts">
import type { Companion } from "@bg3-walkthrough-planner/types"
import type { PropType } from "vue"

defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})
</script>

<template>
  <div
    v-once
    class="flex size-[150px] cursor-move flex-col items-center justify-center rounded-md bg-surface-800 p-2 text-center text-sm leading-4 shadow-lg"
  >
    <img
      class="pointer-events-none mb-2 size-[110px] rounded-md object-cover object-top max-sm:pointer-events-none"
      :src="companion.icon"
      width="110"
      height="110"
      alt=""
    />

    <a
      :href="companion.wikiLink"
      class="underline-offset-1 hover:underline"
      target="_blank"
    >
      {{ companion.name }}
    </a>
  </div>
</template>
