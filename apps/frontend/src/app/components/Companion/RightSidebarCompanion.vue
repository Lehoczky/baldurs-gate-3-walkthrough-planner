<template>
  <div
    class="flex h-[150px] w-[150px] cursor-move flex-col items-center justify-center rounded-md bg-[#242424] p-2 text-center text-sm leading-4 shadow-lg"
    :draggable="true"
    @dragstart="onDragStart"
  >
    <img
      class="mb-2 rounded-md"
      :src="companion.icon"
      width="110"
      height="110"
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

const props = defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow-node-type", "companion")
    event.dataTransfer.setData(
      "application/vueflow-node-name",
      props.companion.name,
    )
    event.dataTransfer.setData(
      "application/vueflow-node-icon",
      props.companion.icon,
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
