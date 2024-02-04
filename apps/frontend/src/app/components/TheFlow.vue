<template>
  <div class="bg-[#232323]" @drop="onDrop">
    <VueFlow @dragover="onDragOver($event as any)">
      <Background />
      <Controls :position="PanelPosition.TopLeft" />
      <FlowNodeControls />

      <template #node-item="props">
        <ItemNode v-bind="props" />
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
import { useVueFlow, VueFlow, PanelPosition } from "@vue-flow/core"
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
  const type = event.dataTransfer?.getData("application/vueflow-node-type")

  switch (type) {
    case "item":
    case "companion":
    case "location": {
      const label = event.dataTransfer?.getData("application/vueflow-node-name")
      const icon = event.dataTransfer?.getData("application/vueflow-node-icon")
      const rarity = event.dataTransfer?.getData(
        "application/vueflow-node-rarity",
      )

      const newNode = {
        id,
        type: "item",
        position,
        label,
        data: {
          icon,
          rarity,
        },
      }

      addNodes([newNode])
      break
    }
    case "note": {
      const newNode = {
        id,
        type: "note",
        position,
        label: "Write something here...",
      }

      addNodes([newNode])
      break
    }
    case "start": {
      const newNode = {
        id,
        type: "start",
        position,
        label: "Journey Starts",
      }

      addNodes([newNode])
      break
    }
    case "end": {
      const newNode = {
        id,
        type: "end",
        position,
        label: "Journey Ends",
      }

      addNodes([newNode])
      break
    }
    default:
      return
  }

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(id)!
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
</script>
