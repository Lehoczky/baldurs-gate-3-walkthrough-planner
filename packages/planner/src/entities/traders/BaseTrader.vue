<script setup lang="ts">
import type { Trader } from "@bg3-walkthrough-planner/types"
import type { PropType } from "vue"

defineProps({
  trader: {
    type: Object as PropType<Trader>,
    required: true,
  },
})
</script>

<template>
  <div
    class="flex h-[128px] cursor-move flex-col rounded-md bg-surface-800 p-2 py-4 shadow-lg"
  >
    <div class="mb-3 flex gap-2">
      <img
        :src="trader.icon"
        alt=""
        width="30"
        height="30"
        class="pointer-events-none rounded-full"
      />
      <a
        :href="trader.wikiLink"
        class="text-xl underline-offset-2 hover:underline"
        target="_blank"
        >{{ trader.name }}</a
      >
    </div>

    <div class="mb-1.5 flex items-center gap-1">
      <img
        src="https://bg3.wiki/w/images/4/4d/Map_Menu_Icon.png"
        alt=""
        width="52"
        height="52"
        class="pointer-events-none size-6"
      />
      <div>{{ trader.location }}</div>
    </div>

    <div class="flex items-center gap-1">
      <img
        src="https://bg3.wiki/w/images/0/06/Trader_Map_Icon.png"
        alt=""
        width="64"
        height="64"
        class="pointer-events-none size-6"
      />
      <div>{{ trader.goods }}</div>
    </div>
  </div>
</template>
