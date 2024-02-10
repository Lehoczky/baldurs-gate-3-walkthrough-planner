<template>
  <BaseCompanion
    draggable="true"
    :companion="companion"
    @dragstart="onDragStart($event, dragData)"
  />
</template>

<script setup lang="ts">
import type { Companion } from "@baldurs-gate-3-walkthrough-planner/types"
import { onDragStart } from "../../hooks/useNodeDragAndDrop"

const props = defineProps({
  companion: {
    type: Object as PropType<Companion>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "companion",
  ...props.companion,
}))
</script>
