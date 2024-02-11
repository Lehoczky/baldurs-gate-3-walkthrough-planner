<template>
  <div class="grid">
    <div class="bg-[#222222]" @drop="onDrop">
      <VueFlow
        :min-zoom="0.2"
        @dragover="onDragOver($event as any)"
        @contextmenu="flowContextMenu.show($event as any)"
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

    <FlowContextMenu ref="flowContextMenu" />
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
import FlowContextMenu from "./Flow/FlowContextMenu.vue"
import { useNodeDrop } from "../hooks/useNodeDragAndDrop"
import { useStorageStore } from "../store/storage"

const {
  findNode,
  onConnect,
  addEdges,
  removeNodes,
  getSelectedNodes,
  addSelectedNodes,
  onNodesChange,
  onEdgesChange,
} = useVueFlow({
  id: "main",
  zoomOnDoubleClick: false,
})
onConnect((params) => addEdges(params))

const { onDragOver, onDrop } = useNodeDrop()
const flowContextMenu = ref<InstanceType<typeof FlowContextMenu>>()
const storageStore = useStorageStore()
const { save } = storageStore
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

useEventListener("keydown", (event) => {
  const { key, ctrlKey } = event

  if (key === "Delete") {
    deleteSelectedNodes()
  } else if (ctrlKey && key === "s") {
    event.preventDefault()
    save()
  }
})

function deleteSelectedNodes() {
  removeNodes(getSelectedNodes.value)
}
</script>
