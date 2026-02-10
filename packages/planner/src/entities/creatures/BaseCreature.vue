<script setup lang="ts">
import type { Creature } from "@bg3-walkthrough-planner/types"
import { computed, type PropType, ref } from "vue"
import TextClamp from "vue3-text-clamp"

const props = defineProps({
  creature: {
    type: Object as PropType<Creature>,
    required: true,
  },
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.creature.name : null))
</script>

<template>
  <div
    v-once
    class="relative flex w-[196px] cursor-move items-center gap-2 rounded-md bg-surface-800 px-4 py-4 text-sm leading-4 shadow-lg"
  >
    <img
      class="pointer-events-none size-[32px] rounded-md object-cover object-top max-sm:pointer-events-none"
      :src="creature.icon"
      width="45"
      height="45"
      alt=""
    />

    <a :href="creature.wikiLink" class="group" target="_blank">
      <TextClamp
        class="underline-offset-1 group-hover:underline"
        :title="title"
        :text="creature.name"
        :max-lines="2"
        @clamp-change="isTextClamped = $event"
      />
    </a>

    <div
      class="text absolute top-0 right-4 grid -translate-y-1/3 rounded-full border border-surface-700 bg-surface-900 px-2.5 py-1"
    >
      <a
        :href="creature.type.url"
        target="_blank"
        class="text-xs leading-none underline-offset-1 hover:underline"
      >
        {{ creature.type.name }}
      </a>
    </div>
  </div>
</template>
