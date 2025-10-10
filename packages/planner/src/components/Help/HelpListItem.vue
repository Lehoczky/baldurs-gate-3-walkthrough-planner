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
      class="bg-surface-900 border-surface-800 flex items-center rounded-md border px-1 py-0.5 text-xs leading-none"
    >
      {{ shortcut }}
    </div>
  </li>
</template>
