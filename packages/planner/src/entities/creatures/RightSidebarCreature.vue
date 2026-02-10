<script setup lang="ts">
import type { Creature } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseCreature from "./BaseCreature.vue"

const props = defineProps({
  creature: {
    type: Object as PropType<Creature>,
    required: true,
  },
})

const dragData = computed(() => ({
  nodeType: "creature",
  ...props.creature,
}))
</script>

<template>
  <BaseCreature
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :creature="creature"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
