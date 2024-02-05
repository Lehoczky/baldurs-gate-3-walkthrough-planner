<template>
  <div class="bg-[#222222]" @drop="onDrop">
    <VueFlow :min-zoom="0.2" @dragover="onDragOver($event as any)">
      <Background />
      <Controls :position="PanelPosition.TopLeft" />
      <FlowNodeControls />

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
</template>

<script setup lang="ts">
import { Background } from "@vue-flow/background"
import { Controls } from "@vue-flow/controls"
import {
  useVueFlow,
  VueFlow,
  PanelPosition,
  type XYPosition,
} from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"

const {
  findNode,
  onConnect,
  addEdges,
  addNodes,
  project,
  removeNodes,
  getSelectedNodes,
  vueFlowRef,
} = useVueFlow({
  zoomOnDoubleClick: false,
})
onConnect((params) => addEdges(params))

useEventListener("keydown", ({ key }) => {
  if (key === "Delete") {
    removeNodes(getSelectedNodes.value)
  }
})

function onDragOver(event: DragEvent) {
  event.preventDefault()

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move"
  }
}

function onDrop(event: DragEvent) {
  const { left, top } = vueFlowRef.value.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  })

  const id = crypto.randomUUID()
  const rawNodeData = event.dataTransfer?.getData("application/vueflow-node")
  const nodeData = JSON.parse(rawNodeData)
  const node = createNode(id, position, nodeData)
  addNodes(node)

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(id)
    if (!node) {
      return
    }
    node.selected = true

    const stop = watch(
      () => node.dimensions,
      (dimensions) => {
        if (dimensions.width > 0 && dimensions.height > 0) {
          node.position = {
            x: node.position.x - node.dimensions.width / 2,
            y: node.position.y - node.dimensions.height / 2,
          }
          stop()
        }
      },
      { deep: true, flush: "post" },
    )
  })
}

function createNode(
  id: string,
  position: XYPosition,
  data: Record<string, any>,
) {
  switch (data.type) {
    case "item":
    case "location":
    case "companion": {
      return {
        id,
        type: data.type,
        position,
        label: data.name,
        data: { ...data },
      }
    }
    case "note": {
      return {
        id,
        type: "note",
        position,
        label: "Write something here...",
      }
    }
    case "start": {
      return {
        id,
        type: "start",
        position,
        label: "Journey Starts",
      }
    }
    case "end": {
      return {
        id,
        type: "end",
        position,
        label: "Journey Ends",
      }
    }
    default:
      return
  }
}
</script>
