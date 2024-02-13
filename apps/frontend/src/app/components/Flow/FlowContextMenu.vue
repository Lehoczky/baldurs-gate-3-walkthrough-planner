<template>
  <ContextMenu ref="contextMenu" :model="contextMenuItems" />
</template>

<script setup lang="ts">
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { useAddNodeFromContextMenu } from "../../hooks/useAddNodeFromContextMenu"
import { useStorageStore } from "../../store/storage"
import { useVueFlow } from "@vue-flow/core"
import {
  createEndNode,
  createGroupNode,
  createNoteNode,
  createStartNode,
} from "./customNodes"

const storageStore = useStorageStore()
const { save, load, saveToFile, loadFromFile } = storageStore
const { removeNodes, addSelectedNodes, getNodes } = useVueFlow({
  id: "main",
})
const { saveContextMenuPosition, addCustomNode } = useAddNodeFromContextMenu()
const contextMenuItems = ref<MenuItem[]>([
  {
    label: "Select All",
    icon: "i-lucide-box-select",
    command: () => selectEveryNode(),
  },
  {
    label: "Clear Canvas",
    icon: "i-lucide-trash-2",
    command: () => removeEveryNode(),
  },
  {
    separator: true,
  },
  {
    label: "New Start Node",
    icon: "i-lucide-arrow-right",
    command: () => addCustomNode(createStartNode()),
  },
  {
    label: "New End Node",
    icon: "i-lucide-flame-kindling",
    command: () => addCustomNode(createEndNode()),
  },
  {
    label: "New Note",
    icon: "i-lucide-notebook",
    command: () => addCustomNode(createNoteNode()),
  },
  {
    separator: true,
  },
  {
    label: "New Group",
    icon: "i-lucide-group",
    command: () => addCustomNode(createGroupNode()),
  },
  {
    separator: true,
  },
  {
    label: "Save",
    icon: "i-lucide-save",
    command: () => save(),
  },
  {
    label: "Load",
    icon: "i-lucide-archive-restore",
    command: () => load(),
  },
  {
    separator: true,
  },
  {
    label: "Save to file",
    icon: "i-lucide-hard-drive-download",
    command: () => saveToFile(),
  },
  {
    label: "Load from file",
    icon: "i-lucide-hard-drive-upload",
    command: () => loadFromFile(),
  },
])

const contextMenu = ref<ContextMenu>()
/**
 * Open the context menu and save it's position
 * to know where to place newly created nodes.
 */
function show(event: MouseEvent) {
  contextMenu.value.show(event)
  saveContextMenuPosition(event)
}
defineExpose({
  show,
})

function selectEveryNode() {
  addSelectedNodes(getNodes.value)
}

function removeEveryNode() {
  removeNodes(getNodes.value)
}
</script>
