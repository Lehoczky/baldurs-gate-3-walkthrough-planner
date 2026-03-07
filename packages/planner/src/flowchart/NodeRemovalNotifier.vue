<script setup lang="ts">
import { type GraphNode, useVueFlow } from "@vue-flow/core"
import Button from "primevue/button"
import Toast from "primevue/toast"
import { useToast } from "primevue/usetoast"

const { onNodesChange, findNode, addNodes } = useVueFlow()

const toast = useToast()
const selections: Record<string, GraphNode> = {}

onNodesChange((changes) => {
  for (const change of changes) {
    if (change.type === "select") {
      const { id, selected } = change
      if (selected) {
        selections[id] = findNode(id)
      } else {
        delete selections[id]
      }
    } else if (change.type === "remove") {
      const node = selections[change.id]
      delete selections[change.id]
      showNodeDeletedToast(node)
    }
  }
})

function showNodeDeletedToast(node: GraphNode) {
  const message = {
    severity: "error",
    group: "node-delete",
    detail: {
      undo: () => {
        addNodes(node)
        // Vue-flow adds the node back selected, but without firing
        // the selection event, so we add the node the selection array
        // manually.
        selections[node.id] = findNode(node.id)
        toast.remove(message)
      },
    },
  }
  toast.add(message)
}
</script>

<template>
  <Toast position="bottom-left" group="node-delete">
    <template #message="{ message }">
      <div class="flex flex-1 items-center gap-2">
        <div class="flex-1 text-lg font-medium">Node deleted</div>
        <Button severity="danger" size="small" @click="message.detail.undo()">
          Undo
        </Button>
      </div>
    </template>
  </Toast>
</template>
