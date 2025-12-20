<script setup lang="ts">
import type { Item } from "@bg3-walkthrough-planner/types"
import { computed, type PropType } from "vue"

import { onDragStart } from "../../hooks/useNodeDragAndDrop"
import BaseItem from "./BaseItem.vue"

const props = defineProps({
  item: {
    type: Object as PropType<Item>,
    required: true,
  },
})

const dragData = computed(() => ({
  type: "item",
  ...props.item,
}))
</script>

<template>
  <BaseItem
    draggable="true"
    class="transition-color duration-200 has-data-dragging:bg-surface-700! data-dragging:bg-surface-700!"
    :item="item"
    @dragstart="onDragStart($event, dragData)"
  />
</template>
