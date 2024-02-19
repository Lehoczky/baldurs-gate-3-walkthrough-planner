<template>
  <div
    v-once
    class="bg-card flex size-[150px] cursor-move flex-col items-center justify-center rounded-md p-2 text-center text-sm leading-4 shadow-lg"
  >
    <img
      class="mb-2 size-[110px] rounded-md object-cover object-top max-sm:pointer-events-none"
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
