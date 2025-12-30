import type { MenuItem } from "primevue/menuitem"

export function defineDeleteMenuItem(props: Partial<MenuItem>): MenuItem {
  return {
    label: "Delete",
    icon: "i-lucide-trash-2",
    ...props,
  }
}
