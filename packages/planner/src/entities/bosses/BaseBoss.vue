<script setup lang="ts">
import type { Boss } from "@bg3-walkthrough-planner/types"
import { computed, type PropType, ref } from "vue"
import TextClamp from "vue3-text-clamp"

const props = defineProps({
  boss: {
    type: Object as PropType<Boss>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.boss.name : null))
</script>

<template>
  <div
    v-once
    class="flex size-[150px] cursor-move flex-col items-center justify-center rounded-md bg-surface-800 p-2 text-center text-sm leading-4 shadow-lg"
  >
    <img
      class="pointer-events-none mb-2 size-[110px] rounded-md object-cover object-top max-sm:pointer-events-none"
      :src="boss.icon"
      width="110"
      height="110"
      alt=""
    />

    <a :href="boss.wikiLink" class="group" target="_blank">
      <TextClamp
        class="underline-offset-1 group-hover:underline"
        :title="title"
        :text="boss.name"
        :max-lines="1"
        @clamp-change="isTextClamped = $event"
      />
    </a>
  </div>
</template>
