<template>
  <div class="rounded-md bg-black px-6 py-3 text-slate-100 shadow-lg">
    <div>{{ label }}</div>
    <Handle type="source" :position="Position.Left" />
  </div>
</template>

<script setup lang="ts">
import type { NodeProps } from "@vue-flow/core"
import { Handle, Position } from "@vue-flow/core"

defineProps<NodeProps>()
</script>
