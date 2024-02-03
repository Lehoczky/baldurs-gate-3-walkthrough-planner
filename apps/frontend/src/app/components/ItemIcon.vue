<template>
  <img
    class="item-icon rounded-md"
    :src="src"
    :style="style"
    width="50"
    height="50"
  />
</template>

<script setup lang="ts">
import type { StyleValue } from "vue"

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  rarity: {
    type: String,
    default: undefined,
  },
})

const rarityColor = computed<string>(() => {
  switch (props.rarity) {
    case undefined:
      return "transparent"
    case "Common":
      return "72, 72, 72"
    case "Uncommon":
      return "1, 189, 57"
    case "Rare":
      return "1, 191, 255"
    case "Very Rare":
      return "209, 1, 123"
    case "Legendary":
      return "183, 134, 29"
    case "Story Item":
      return "255, 89, 1"
  }
})

const style = computed<StyleValue>(() => {
  return {
    "--item-rarity-color": rarityColor.value,
  }
})
</script>

<style scoped>
.item-icon {
  background: linear-gradient(
    rgba(var(--item-rarity-color), 0%),
    rgba(var(--item-rarity-color), 12.5%)
  );
  border: solid 1px rgba(var(--item-rarity-color), 60%);
}
</style>
