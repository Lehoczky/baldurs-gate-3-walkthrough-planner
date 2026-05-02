<script setup lang="ts">
import { type GraphNode, useVueFlow } from "@vue-flow/core"
import Button from "primevue/button"
import Toast, { type ToastMessageOptions } from "primevue/toast"
import { useToast } from "primevue/usetoast"

const { onNodesChange, findNode, addNodes } = useVueFlow()

const toast = useToast()
const selections: Record<string, GraphNode> = {}

onNodesChange((changes) => {
  const deletedNodes: GraphNode[] = []

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
      deletedNodes.push(node)
      delete selections[change.id]
    }
  }

  if (deletedNodes.length) {
    showNodeDeletedToast(deletedNodes)
  }
})

function showNodeDeletedToast(nodes: GraphNode[]) {
  const firstNode = nodes[0]
  if (!firstNode) {
    // Somehow when we delete every node, we get undefined for every node
    return
  }
  let summary = `Node deleted: ${firstNode.data?.name ?? firstNode.type}`
  if (nodes.length > 1) {
    summary = `${summary}, and ${nodes.length - 1} others`
  }

  const message: ToastMessageOptions = {
    severity: "error",
    group: "node-delete",
    summary,
    life: 8000,
    detail: {
      undo: () => {
        addNodes(nodes)
        // Vue-flow adds the node back selected, but without firing
        // the selection event, so we add the node the selection array
        // manually.
        for (const node of nodes) {
          selections[node.id] = findNode(node.id)
        }
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
        <div class="flex flex-1 items-center gap-1.5 text-lg font-medium">
          <span class="i-lucide-trash-2"></span>
          <span>{{ message.summary }}</span>
        </div>
        <Button severity="danger" size="small" @click="message.detail.undo()">
          Undo
        </Button>
      </div>
    </template>
  </Toast>
</template>
