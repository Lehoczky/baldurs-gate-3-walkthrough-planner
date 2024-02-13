<template>
  <div
    class="bg-surface-900 flex h-[110px] w-[110px] cursor-move flex-col items-center justify-center rounded-md p-1 text-center text-sm leading-4 shadow-lg"
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
import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"
import TextClamp from "vue3-text-clamp"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.item.name : null))
</script>
