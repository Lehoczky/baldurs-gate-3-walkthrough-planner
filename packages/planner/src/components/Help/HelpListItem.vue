<script setup lang="ts">
defineProps({
  action: {
    type: String,
    required: true,
  },
  shortcut: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <li class="flex justify-between">
    <div class="text-sm">
      {{ action }}
    </div>

    <div
      class="flex items-center rounded-md border border-surface-800 bg-surface-900 px-1 py-0.5 text-xs leading-none"
    >
      {{ shortcut }}
    </div>
  </li>
</template>
