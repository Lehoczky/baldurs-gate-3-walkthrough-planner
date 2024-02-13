import { type Node,useVueFlow, type XYPosition } from "@vue-flow/core"

const lastOpenedContextMenuPosition = ref<XYPosition>()

export function useAddNodeFromContextMenu() {
  const { vueFlowRef, project, addNodes } = useVueFlow()

  function addCustomNode(node: Omit<Node, "position">) {
    const { left, top } = vueFlowRef.value.getBoundingClientRect()

    const position = project({
      x: lastOpenedContextMenuPosition.value.x - left,
      y: lastOpenedContextMenuPosition.value.y - top,
    })

    addNodes({
      ...node,
      position,
    })
  }

  function saveContextMenuPosition(event: MouseEvent) {
    lastOpenedContextMenuPosition.value = {
      x: event.clientX,
      y: event.clientY,
    }
  }

  return { addCustomNode, saveContextMenuPosition }
}
