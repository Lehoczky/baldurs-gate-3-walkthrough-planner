<template>
  <Menubar :model="menubarItems" class="" />
</template>

<script setup lang="ts">
import Menubar from "primevue/menubar"
import type { MenuItem } from "primevue/menuitem"
import { useAddNodeAtRandomPlace } from "../../hooks/useAddNodeAtRandomPlace"
import { useSaveLoad } from "../../hooks/useSaveLoad"
import { useCustomNode } from "../../hooks/useCustomNode"

const menubarItems = ref<MenuItem[]>([
  {
    label: "Add",
    icon: "i-lucide-plus",
    items: [
      {
        label: "New Start Node",
        icon: "i-lucide-arrow-right",
        command: () => add("start"),
      },
      {
        label: "New End Node",
        icon: "i-lucide-flame-kindling",
        command: () => add("end"),
      },
      {
        label: "New Note",
        icon: "i-lucide-notebook",
        command: () => add("note"),
      },
    ],
  },
  { label: "Save", icon: "i-lucide-save", command: () => save() },
  { label: "Load", icon: "i-lucide-archive-restore", command: () => load() },
])

const { addNodeAtRandomPlace } = useAddNodeAtRandomPlace()
const { create } = useCustomNode()

function add(type: string) {
  addNodeAtRandomPlace({
    ...create(type),
    position: { x: 200, y: 200 },
  })
}

const { save, load } = useSaveLoad()
</script>
