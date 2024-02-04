<template>
  <div
    class="flex h-[144px] cursor-move items-center gap-2 rounded-md bg-[#242424] p-2 shadow-lg"
    :draggable="true"
    @dragstart="onDragStart"
  >
    <img class="aspect-video rounded-md" :src="location.icon" width="210" />

    <div>
      <a
        :href="location.wikiLink"
        class="text-xl underline-offset-2 hover:underline"
        target="_blank"
      >
        {{ location.name }}
      </a>

      <div class="text-sm leading-4">{{ location.description }}.</div>
      <div class="text-sm">{{ location.act }}, {{ location.area }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Location } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  location: {
    type: Object as PropType<Location>,
    required: true,
  },
})

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow-node-type", "location")
    event.dataTransfer.setData(
      "application/vueflow-node-name",
      props.location.name,
    )
    event.dataTransfer.setData(
      "application/vueflow-node-icon",
      props.location.icon,
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
