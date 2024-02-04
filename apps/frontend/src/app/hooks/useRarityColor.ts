export function useRarityColor(rarity: Ref<string>) {
  const color = computed<string>(() => {
    switch (rarity.value) {
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

  return color
}
