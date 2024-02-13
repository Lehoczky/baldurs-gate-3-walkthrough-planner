<template>
  <div
    class="flex h-[150px] w-[150px] cursor-move flex-col items-center justify-center rounded-md bg-[#242424] p-2 text-center text-sm leading-4 shadow-lg"
  >
    <img
      class="mb-2 h-[110px] w-[110px] rounded-md object-cover object-top"
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

<script setup lang="ts">
import type { Companion } from "@baldurs-gate-3-walkthrough-planner/types"

defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})
</script>
