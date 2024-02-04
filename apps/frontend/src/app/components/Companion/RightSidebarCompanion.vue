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

    <a :href="companion.wikiLink" class="group" target="_blank">
      <TextClamp
        class="underline-offset-1 group-hover:underline"
        :title="title"
        :text="companion.name"
        :max-lines="2"
        @clamp-change="isTextClamped = $event"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import TextClamp from "vue3-text-clamp"

import type { Companion } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() =>
  isTextClamped.value ? props.companion.name : null,
)

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
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
