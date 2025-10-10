<script setup lang="ts">
import type { Item } from "@bg3-walkthrough-planner/types"
import { computed, type PropType, ref } from "vue"
import TextClamp from "vue3-text-clamp"

import ItemIcon from "./ItemIcon.vue"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.item.name : null))
</script>

<template>
  <div
    class="bg-surface-800 flex size-[110px] cursor-move flex-col items-center justify-center rounded-md p-1 text-center text-sm leading-4 shadow-lg"
  >
    <ItemIcon
      class="pointer-events-none mb-1.5"
      :src="item.icon"
      :rarity="item.rarity"
    />

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
