import { type GraphNode, type Node, useVueFlow } from "@vue-flow/core"
import { nextTick, watch } from "vue"

const DATA_TRANSFER_ID = "application/vueflow-node"

export function onDragStart(event: DragEvent, dragData: object) {
  if (event.dataTransfer) {
    event.dataTransfer.setData(DATA_TRANSFER_ID, JSON.stringify(dragData))
    event.dataTransfer.effectAllowed = "move"

    const target = event.target as HTMLElement
    target.setAttribute("data-dragging", "")
    target.addEventListener("dragend", () => {
      target.removeAttribute("data-dragging")
    })
  }
}

/**
 * Composable to handle dropping elements to the
 * VueFlow canvas.
 *
 * @example
 * ```vue
 * <template>
 *  <div v-on:drop="onDrop">
 *    <VueFlow v-on:onDragOver="onDragOver($event as any)"></VueFlow>
 *  </div>
 * </template>
 *
 * <script setup lang=ts>
 *  const { onDragOver, onDrop } = useNodeDrop()
 * </script>
 * ```
 */
export function useNodeDrop() {
  function onDragOver(event: DragEvent) {
    event.preventDefault()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "move"
    }
  }

  const { vueFlowRef, project, addNodes, findNode } = useVueFlow()

  async function onDrop(event: DragEvent) {
    const { left, top } = vueFlowRef.value.getBoundingClientRect()

    const position = project({
      x: event.clientX - left,
      y: event.clientY - top,
    })

    const id = crypto.randomUUID()
    const rawNodeData = event.dataTransfer?.getData(DATA_TRANSFER_ID)
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

  return {
    /**
     * Bind to the `VueFlow` component's `dragover` event
     * to enable dropping the dragged element.
     */
    onDragOver,
    /**
     * Bind to the `VueFlow` component parent's `drop` event
     * to place the dragged element at the cursor's position.
     */
    onDrop,
  }
}
