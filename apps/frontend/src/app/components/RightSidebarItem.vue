<template>
  <div
    class="flex h-[110px] w-[110px] flex-col items-center justify-center rounded-md bg-[#242424] p-1 text-center text-sm leading-4 shadow-lg"
    :draggable="true"
    @dragstart="onDragStart"
  >
    <ItemIcon class="mb-1.5" :src="item.icon" :rarity="item.rarity" />

    <a :href="item.wikiLink" class="group" target="_blank">
      <TextClamp
        class="underline-offset-1 group-hover:underline"
        :title="title"
        :text="item.name"
        :max-lines="2"
        @clamp-change="isTextClamped = $event"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
import TextClamp from "vue3-text-clamp"

import ItemIcon from "./ItemIcon.vue"
import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.item.name : null))

function onDragStart(event: DragEvent) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow-node-name", props.item.name)
    event.dataTransfer.setData("application/vueflow-node-icon", props.item.icon)
    event.dataTransfer.setData(
      "application/vueflow-node-rarity",
      props.item.rarity,
    )
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
