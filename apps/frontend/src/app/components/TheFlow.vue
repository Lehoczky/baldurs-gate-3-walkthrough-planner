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

    <div class="absolute left-1/2 top-6 -translate-x-1/2">
      <FlowMenubar />
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
  type Node,
  type GraphNode,
  type XYPosition,
  type NodeChange,
  type FlowExportObject,
} from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import { useCustomNode } from "../hooks/useCustomNode"
import { useToast } from "primevue/usetoast"

const {
  findNode,
  onConnect,
  addEdges,
  addNodes,
  project,
  removeNodes,
  getSelectedNodes,
  vueFlowRef,
  addSelectedNodes,
  getNodes,
  onNodesChange,
  toObject,
  fromObject,
} = useVueFlow({
  zoomOnDoubleClick: false,
})
onConnect((params) => addEdges(params))

onNodesChange((changes) => {
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

/**
 * Delete the selected nodes when "Delete" key
 * is pressed.
 */
useEventListener("keydown", ({ key }) => {
  if (key === "Delete") {
    deleteSelectedNodes()
  }
})
function deleteSelectedNodes() {
  removeNodes(getSelectedNodes.value)
}

const contextMenu = ref<ContextMenu>()
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
    command: () => addCustomNode("start"),
  },
  {
    label: "New End Node",
    icon: "i-lucide-flame-kindling",
    command: () => addCustomNode("end"),
  },
  {
    label: "New Note",
    icon: "i-lucide-notebook",
    command: () => addCustomNode("note"),
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

const lastOpenedContextMenuPosition = ref<XYPosition>()
/**
 * Open the context menu and save it's position
 * to know where to place newly created nodes.
 */
function openContextMenu(event: MouseEvent) {
  contextMenu.value.show(event)
  lastOpenedContextMenuPosition.value = {
    x: event.clientX,
    y: event.clientY,
  }
}

const { create } = useCustomNode()
function addCustomNode(type: string) {
  const { left, top } = vueFlowRef.value.getBoundingClientRect()

  const position = project({
    x: lastOpenedContextMenuPosition.value.x - left,
    y: lastOpenedContextMenuPosition.value.y - top,
  })
  const node = {
    ...create(type),
    position,
  }
  addNodes(node)
}

function onDragOver(event: DragEvent) {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move"
  }
}

async function onDrop(event: DragEvent) {
  const { left, top } = vueFlowRef.value.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  })

  const id = crypto.randomUUID()
  const rawNodeData = event.dataTransfer?.getData("application/vueflow-node")
  const nodeData = JSON.parse(rawNodeData)
  const node: Node = {
    id,
    type: nodeData.type,
    position,
    label: nodeData.name,
    data: { ...nodeData },
  }
  addNodes(node)
  await nextTick()
  centerNodeToItsOwnPosition(id)
}

/**
 * Align node position after drop, so it's centered to the mouse.
 */
function centerNodeToItsOwnPosition(id: string) {
  const node = findNode(id)
  if (!node) {
    return
  }

  const stop = watch(
    () => node.dimensions,
    (dimensions) => {
      if (dimensions.width > 0 && dimensions.height > 0) {
        translateToCenter(node)
        stop()
      }
    },
    { deep: true, flush: "post" },
  )
}

function translateToCenter(node: GraphNode) {
  node.position = {
    x: node.position.x - node.dimensions.width / 2,
    y: node.position.y - node.dimensions.height / 2,
  }
}

const toast = useToast()
function save() {
  localStorage.setItem("wp:saved-flow", JSON.stringify(toObject()))
  toast.add({
    summary: "Save Successful",
    severity: "success",
    life: 1000,
  })
}

function load() {
  const flow: FlowExportObject = JSON.parse(
    localStorage.getItem("wp:saved-flow"),
  )

  if (flow) {
    fromObject(flow)
  }
}
</script>
