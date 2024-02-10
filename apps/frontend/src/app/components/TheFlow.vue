<template>
  <div class="relative grid">
    <div class="bg-[#222222]" @drop="onDrop">
      <VueFlow
        :min-zoom="0.2"
        @dragover="onDragOver($event as any)"
        @contextmenu="openContextMenu($event as any)"
      >
        <Background />

        <template #node-item="props">
          <ItemNode v-bind="props" />
        </template>
        <template #node-location="props">
          <LocationNode v-bind="props" />
        </template>
        <template #node-companion="props">
          <CompanionNode v-bind="props" />
        </template>
        <template #node-start="props">
          <StartNode v-bind="props" />
        </template>
        <template #node-end="props">
          <EndNode v-bind="props" />
        </template>
        <template #node-note="props">
          <NoteNode v-bind="props" />
        </template>
      </VueFlow>
    </div>

    <ContextMenu ref="contextMenu" :model="contextMenuItems" />
  </div>
</template>

<script setup lang="ts">
import { Background } from "@vue-flow/background"
import {
  useVueFlow,
  VueFlow,
  type NodeAddChange,
  type NodeChange,
} from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { useCustomNode } from "../hooks/useCustomNode"
import { useNodeDrop } from "../hooks/useNodeDragAndDrop"
import { useAddNodeFromContextMenu } from "../hooks/useAddNodeFromContextMenu"
import { useStorageStore } from "../store/storage"

const {
  findNode,
  onConnect,
  addEdges,
  removeNodes,
  getSelectedNodes,
  addSelectedNodes,
  getNodes,
  onNodesChange,
  onEdgesChange,
} = useVueFlow({
  id: "main",
  zoomOnDoubleClick: false,
})
onConnect((params) => addEdges(params))

const storageStore = useStorageStore()
const { save, load } = storageStore
const { hasUnsavedChanges } = storeToRefs(storageStore)

onEdgesChange(() => {
  hasUnsavedChanges.value = true
})
onNodesChange((changes) => {
  hasUnsavedChanges.value = true
  selectNewlyAddedNodesOnChanges(changes)
})

/**
 * Select the nodes that gets added to the flow.
 */
function selectNewlyAddedNodesOnChanges(changes: NodeChange[]) {
  const addedNodes = changes
    .filter(({ type }) => type === "add")
    .map((changes: NodeAddChange) => changes.item.id)
    .map((id) => findNode(id))

  if (addedNodes.length) {
    addSelectedNodes(addedNodes)
  }
}

useEventListener("keydown", ({ key }) => {
  if (key === "Delete") {
    deleteSelectedNodes()
  }
})

function deleteSelectedNodes() {
  removeNodes(getSelectedNodes.value)
}

const contextMenu = ref<ContextMenu>()
const { create } = useCustomNode()
const { saveContextMenuPosition, addCustomNode } = useAddNodeFromContextMenu()
const contextMenuItems = ref<MenuItem[]>([
  {
    label: "Select All",
    icon: "i-lucide-box-select",
    command: () => selectEveryNode(),
  },
  {
    separator: true,
  },
  {
    label: "New Start Node",
    icon: "i-lucide-arrow-right",
    command: () => addCustomNode(create("start")),
  },
  {
    label: "New End Node",
    icon: "i-lucide-flame-kindling",
    command: () => addCustomNode(create("end")),
  },
  {
    label: "New Note",
    icon: "i-lucide-notebook",
    command: () => addCustomNode(create("note")),
  },
  {
    separator: true,
  },
  { label: "Save", icon: "i-lucide-save", command: () => save() },
  { label: "Load", icon: "i-lucide-archive-restore", command: () => load() },
])

function selectEveryNode() {
  addSelectedNodes(getNodes.value)
}

/**
 * Open the context menu and save it's position
 * to know where to place newly created nodes.
 */
function openContextMenu(event: MouseEvent) {
  contextMenu.value.show(event)
  saveContextMenuPosition(event)
}

const { onDragOver, onDrop } = useNodeDrop()
</script>
