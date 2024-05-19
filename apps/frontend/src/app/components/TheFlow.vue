<template>
  <div class="grid">
    <div class="relative bg-canvas" @drop="onDrop">
      <VueFlow
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
          <LazyNoteNode v-bind="props" />
        </template>
        <template #node-group="props">
          <GroupNode v-bind="props" />
        </template>
      </VueFlow>

      <EmptyFlow
        v-if="showEmptyMessage"
        class="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2"
      />
      <LazyGettingStartedDialog
        v-if="showTutorial"
        @close="showTutorial = false"
      />

      <HelpPanel class="absolute left-8 top-0" />
    </div>

    <FlowContextMenu ref="flowContextMenu" />
    <ContextMenu ref="edgeContextMenu" :model="edgeContextMenuItems" />
    <LazyEdgeLabelDialog
      v-if="showEdgeLabelDialog"
      @close="showEdgeLabelDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { Background } from "@vue-flow/background"
import {
  MarkerType,
  type NodeAddChange,
  type NodeChange,
  useVueFlow,
  VueFlow,
} from "@vue-flow/core"
import { useEventListener, watchOnce } from "@vueuse/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"

import { useNodeDrop } from "../hooks/useNodeDragAndDrop"
import { useStorageStore } from "../store/storage"
import { isEditableElement } from "../utils"
import FlowContextMenu from "./Flow/FlowContextMenu.vue"

const {
  addEdges,
  addSelectedEdges,
  addSelectedNodes,
  getNodes,
  getSelectedNodes,
  onConnect,
  onEdgeContextMenu,
  onEdgeDoubleClick,
  onEdgesChange,
  onNodesChange,
  removeNodes,
} = useVueFlow({
  id: "main",
  zoomOnDoubleClick: false,
  defaultEdgeOptions: {
    labelBgPadding: [8, 4],
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  minZoom: 0.2,
})
onConnect((params) => addEdges(params))

const { onDragOver, onDrop } = useNodeDrop()
const flowContextMenu = ref<InstanceType<typeof FlowContextMenu>>()
const edgeContextMenu = ref<ContextMenu>()
const storageStore = useStorageStore()
const { save, load, updateSavedState } = storageStore
const { hasUnsavedChanges, hasSave } = storeToRefs(storageStore)

onEdgesChange((changes) => {
  updateSavedState(changes)
})
onNodesChange((changes) => {
  updateSavedState(changes)
  selectNewlyAddedNodesOnChanges(changes)
})

onEdgeContextMenu(({ edge, event }) => {
  addSelectedEdges([edge])
  edgeContextMenu.value.show(event)
})
onEdgeDoubleClick(({ edge }) => {
  addSelectedEdges([edge])
  showEdgeLabelDialog.value = true
})
const LazyEdgeLabelDialog = defineAsyncComponent({
  loader: () => import("./Flow/EdgeLabelDialog.vue"),
  delay: 0,
})
const showEdgeLabelDialog = ref(false)
const edgeContextMenuItems = ref<MenuItem[]>([
  {
    label: "Edit label",
    icon: "i-lucide-message-square-text",
    command: () => {
      showEdgeLabelDialog.value = true
    },
  },
])

const LazyNoteNode = defineAsyncComponent({
  loader: () => import("./SpecialNodes/NoteNode.vue"),
  delay: 0,
})
requestIdleCallback(() => import("./SpecialNodes/NoteNode.vue"))

/**
 * Select the nodes that gets added to the flow.
 */
function selectNewlyAddedNodesOnChanges(changes: NodeChange[]) {
  const addedNodes = changes
    .filter(({ type }) => type === "add")
    .map((changes: NodeAddChange) => changes.item)

  if (addedNodes.length) {
    addSelectedNodes(addedNodes)
  }
}

useEventListener("keydown", (event) => {
  const { key, ctrlKey, target } = event

  if (key === "Delete") {
    deleteSelectedNodes()
  } else if (ctrlKey && key === "a" && !isEditableElement(target)) {
    event.preventDefault()
    selectEveryNode()
  } else if (ctrlKey && key === "s") {
    event.preventDefault()
    save()
  } else if (key === "F1") {
    event.preventDefault()
    showTutorial.value = true
  }
})

function deleteSelectedNodes() {
  removeNodes(getSelectedNodes.value)
}

function selectEveryNode() {
  addSelectedNodes(getNodes.value)
}

const isFlowEmpty = computed(() => !getNodes.value.length)
const isFlowPristine = ref(true)
watchOnce(hasUnsavedChanges, () => (isFlowPristine.value = false))
const showEmptyMessage = computed(() => {
  return isFlowEmpty.value && isFlowPristine.value
})

onMounted(() => {
  if (hasSave) {
    load()
  }
})

const showTutorial = ref(showEmptyMessage.value)
const LazyGettingStartedDialog = defineAsyncComponent({
  loader: () => import("./GettingStartedDialog.vue"),
  delay: 0,
})
</script>
