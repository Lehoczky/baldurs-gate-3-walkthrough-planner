<script setup lang="ts">
import type { Spell } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "@/flowchart/useNodeDragAndDrop"

import BaseSpell from "./BaseSpell.vue"

const props = defineProps({
  spell: {
    type: Object as PropType<Spell>,
    required: true,
  },
})

const dragData = computed(() => ({
  nodeType: "spell",
  ...props.spell,
}))
</script>

<template>
  <BaseSpell
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :spell="spell"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
