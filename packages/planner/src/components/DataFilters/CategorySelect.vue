<script setup lang="ts">
import Select from "primevue/select"
</script>

<template>
  <Select option-label="name" option-value="name" scroll-height="400px" fluid>
    <template #option="{ option }">
      <div class="flex items-center gap-1.5">
        <img :src="option.icon" width="44" height="44" />
        <div class="capitalize">{{ option.name }}</div>
      </div>
    </template>
  </Select>
</template>
