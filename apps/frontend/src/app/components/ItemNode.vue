<template>
  <div class="h-full">
    <NodeResizer :min-width="110" :min-height="110" />
    <Handle type="target" :position="Position.Top" />
    <div
      class="flex h-full items-center gap-1 rounded-md bg-[#242424] p-2 text-sm leading-4 shadow-lg"
    >
      <ItemIcon :src="data.icon" :rarity="data.rarity" />
      <div>{{ label }}</div>
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position } from "@vue-flow/core"
import { NodeResizer } from "@vue-flow/node-resizer"

import type { Item } from "@baldurs-gate-3-walkthrough-planner/types"

interface NodeData {
  icon: Item["icon"]
  rarity: string
}

defineProps<NodeProps<NodeData>>()
</script>
