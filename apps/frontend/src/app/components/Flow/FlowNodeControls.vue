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
  </Panel>
</template>

<script setup lang="ts">
import { Panel } from "@vue-flow/core"

function onDragStart(event: DragEvent, type: string) {
  if (event.dataTransfer) {
    event.dataTransfer.setData("application/vueflow-node-type", type)
    event.dataTransfer.effectAllowed = "move"
  }
}
</script>
