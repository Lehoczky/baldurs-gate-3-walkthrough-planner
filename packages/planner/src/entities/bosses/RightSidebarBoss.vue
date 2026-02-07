<script setup lang="ts">
import type { Boss } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseBoss from "./BaseBoss.vue"

const props = defineProps({
  boss: {
    type: Object as PropType<Boss>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "boss",
  ...props.boss,
}))
</script>

<template>
  <BaseBoss
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :boss="boss"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
