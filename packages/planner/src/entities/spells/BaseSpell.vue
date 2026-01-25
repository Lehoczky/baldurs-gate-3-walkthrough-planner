<script setup lang="ts">
import type { Spell } from "@bg3-walkthrough-planner/types"
import { computed, type PropType, ref } from "vue"
import TextClamp from "vue3-text-clamp"

const props = defineProps({
  spell: {
    type: Object as PropType<Spell>,
    required: true,
  },
})

const schoolLink = computed(() => {
  return `https://bg3.wiki/wiki/${props.spell.school}`
})

const isTextClamped = ref(false)
const title = computed(() => (isTextClamped.value ? props.spell.name : null))
</script>

<template>
  <div
    class="flex h-[130px] w-[120px] cursor-move flex-col items-center justify-center rounded-md bg-surface-800 p-1 text-center text-sm leading-4 shadow-lg"
  >
    <img
      class="mb-1.5 rounded-md max-sm:pointer-events-none"
      :src="spell.icon"
      width="50"
      height="50"
      alt=""
    />

    <a :href="spell.wikiLink" class="group" target="_blank">
      <TextClamp
        class="underline-offset-1 group-hover:underline"
        :title="title"
        :text="spell.name"
        :max-lines="2"
        @clamp-change="isTextClamped = $event"
      />
    </a>

    <div class="text-neutral-400">{{ spell.level }}</div>
    <a
      :href="schoolLink"
      target="_blank"
      class="text-xs text-neutral-500 hover:underline"
    >
      {{ spell.school }}
    </a>
  </div>
</template>
