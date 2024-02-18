<template>
  <button
    :title="open ? '' : 'Help'"
    class="bg-surface-900 border-surface-800 absolute -bottom-1 left-1/2 grid size-6 -translate-x-1/2 translate-y-1/2 place-items-center rounded-b-full border"
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

<script setup lang="ts">
const open = defineModel({
  type: Boolean,
  required: true,
})
</script>
