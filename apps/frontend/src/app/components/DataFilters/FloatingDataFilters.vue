<template>
  <div
    class="bg-sidebar -translate-y-full px-4 pb-6 pt-3 transition-transform ease-out"
    :class="{
      '!translate-y-0': open,
    }"
  >
    <DataFilters />
    <button
      :title="open ? '' : 'Help'"
      class="bg-surface-900 border-surface-800 absolute -bottom-1 left-1/2 grid -translate-x-1/2 translate-y-1/2 place-items-center rounded-full border px-2 py-1 text-sm leading-none"
      @click="open = !open"
    >
      <span>Filters</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const open = ref(false)
</script>
