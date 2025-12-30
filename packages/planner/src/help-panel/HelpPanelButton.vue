<script setup lang="ts">
const open = defineModel({
  type: Boolean,
  required: true,
})
</script>

<template>
  <button
    :title="open ? '' : 'Help'"
    class="absolute -bottom-1 left-1/2 grid size-10 -translate-x-1/2 translate-y-1/2 place-items-center rounded-b-full border border-surface-800 bg-surface-900 md:size-6"
    :class="{
      'rounded-full': open,
    }"
    @click="open = !open"
  >
    <span
      class="i-ri-arrow-down-s-line"
      :class="{
        'rotate-180': open,
      }"
    />
  </button>
</template>
