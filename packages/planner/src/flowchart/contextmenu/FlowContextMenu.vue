<script setup lang="ts">
import { useVueFlow } from "@vue-flow/core"
import { storeToRefs } from "pinia"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { ref, useTemplateRef } from "vue"

import { useStorageStore } from "@/store/storage"

import {
  createEndNode,
  createGroupNode,
  createNoteNode,
  createStartNode,
} from "../SpecialNodes/specialNodes"
import { useAddNodeFromContextMenu } from "./useAddNodeFromContextMenu"

const storageStore = useStorageStore()
const { hasSave } = storeToRefs(storageStore)
const { save, load, deleteSave, saveToFile, loadFromFile } = storageStore
const { removeNodes, addSelectedNodes, getNodes } = useVueFlow()
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
    disabled: () => !hasSave.value,
    command: () => load(),
  },
  {
    label: "Delete save",
    icon: "i-lucide-trash-2",
    disabled: () => !hasSave.value,
    command: () => deleteSave(),
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

const contextMenu = useTemplateRef("contextMenu")
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

<template>
  <ContextMenu ref="contextMenu" :model="contextMenuItems" />
</template>
