<template>
  <Panel position="bottom-left" class="flex gap-2">
    <FlowNodeControlElement @dragstart="onDragStart($event, 'start')">
      <div>New Start Node</div>
    </FlowNodeControlElement>

    <FlowNodeControlElement @dragstart="onDragStart($event, 'end')">
      <div>New End Node</div>
    </FlowNodeControlElement>

    <FlowNodeControlElement @dragstart="onDragStart($event, 'note')">
      <div>New Note</div>
    </FlowNodeControlElement>

    <Button label="Save" @click="save" />
    <Button label="Load" @click="load" />
  </Panel>
</template>

<script setup lang="ts">
import { Panel, useVueFlow } from "@vue-flow/core"
import Button from "primevue/button"

function onDragStart(event: DragEvent, type: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow-node-type", type)
    event.dataTransfer.effectAllowed = "move"
  }
}

const { toObject, setNodes, setEdges, setTransform } = useVueFlow()

function save() {
  localStorage.setItem("wp:saved-flow", JSON.stringify(toObject()))
}

function load() {
  const flow = JSON.parse(localStorage.getItem("wp:saved-flow"))

  if (flow) {
    const [x = 0, y = 0] = flow.position
    setNodes(flow.nodes)
    setEdges(flow.edges)
    setTransform({ x, y, zoom: flow.zoom || 0 })
  }
}
</script>
