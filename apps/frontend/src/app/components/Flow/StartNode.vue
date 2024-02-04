<template>
  <div class="rounded-md bg-slate-300 px-6 py-3 text-slate-800 shadow-lg">
    <div>{{ label }}</div>
    <Handle type="source" :position="Position.Right" />
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position } from "@vue-flow/core"

defineProps<NodeProps>()
</script>
