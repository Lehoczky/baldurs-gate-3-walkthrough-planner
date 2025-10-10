<script setup lang="ts">
import { computed } from "vue"

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

const rarityColor = computed(() => {
  switch (props.rarity) {
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
    default:
      return "transparent"
  }
})
</script>

<template>
  <img
    class="item-icon rounded-md max-sm:pointer-events-none"
    :src="src"
    width="50"
    height="50"
    alt=""
  />
</template>

<style scoped>
.item-icon {
  --item-rarity-color: v-bind(rarityColor);

  background: linear-gradient(
    rgba(var(--item-rarity-color), 0%),
    rgba(var(--item-rarity-color), 12.5%)
  );
  border: solid 1px rgba(var(--item-rarity-color), 60%);
}
</style>
