<template>
  <img class="item-icon rounded-md" :src="src" width="50" height="50" />
</template>

<script setup lang="ts">
import { useRarityColor } from "../../hooks/useRarityColor"

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

const rarityColor = useRarityColor(toRef(props, "rarity"))
</script>

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
