<template>
  <div class="bg-[#232323]" @drop="onDrop">
    <VueFlow @dragover="onDragOver($event as any)">
      <Background />
      <Controls />

      <template #node-item="props">
        <ItemNode v-bind="props" />
      </template>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import { Background } from "@vue-flow/background"
import { Controls } from "@vue-flow/controls"
import { useVueFlow, VueFlow } from "@vue-flow/core"
import { useEventListener } from "@vueuse/core"

import ItemNode from "./ItemNode.vue"

const {
  findNode,
  onConnect,
  addEdges,
  addNodes,
  project,
  removeNodes,
  getSelectedNodes,

  vueFlowRef,
} = useVueFlow()
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
  const { left, top } = vueFlowRef.value!.getBoundingClientRect()

  const position = project({
    x: event.clientX - left,
    y: event.clientY - top,
  })

  const id = crypto.randomUUID()
  const label = event.dataTransfer?.getData("application/vueflow-node-name")
  const icon = event.dataTransfer?.getData("application/vueflow-node-icon")
  const rarity = event.dataTransfer?.getData("application/vueflow-node-rarity")

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

  // align node position after drop, so it's centered to the mouse
  nextTick(() => {
    const node = findNode(id)!
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
