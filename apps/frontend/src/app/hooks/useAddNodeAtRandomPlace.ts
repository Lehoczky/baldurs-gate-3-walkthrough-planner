import type { Node } from "@vue-flow/core"
import { useVueFlow, type NodeRemoveChange } from "@vue-flow/core"
import { randomInt } from "../utils"

export function useAddNodeAtRandomPlace() {
  const { addNodes, project, onNodeDragStop, onNodesChange } = useVueFlow()

  const unmovedNodeIDs = ref(new Set<string>())

  async function addNodeAtRandomPlace(node: Node) {
    const unmovedNodeCount = unmovedNodeIDs.value.size
    const xOffset = unmovedNodeCount * (20 + randomInt(20))
    const yOffset = unmovedNodeCount * (10 + randomInt(10))
    const { x, y } = project({
      x: node.position.x + xOffset,
      y: node.position.y + yOffset,
    })

    addNodes([
      {
        ...node,
        position: { x, y },
      },
    ])

    unmovedNodeIDs.value.add(node.id)
  }

  onNodeDragStop(({ node }) => {
    if (node.type !== "item" && unmovedNodeIDs.value.has(node.id)) {
      unmovedNodeIDs.value.delete(node.id)
    }
  })

  onNodesChange((changes) => {
    const removedNodeIDs = changes
      .filter(({ type }) => type === "remove")
      .map((change: NodeRemoveChange) => change.id)

    for (const id of removedNodeIDs) {
      unmovedNodeIDs.value.delete(id)
    }
  })

  return { addNodeAtRandomPlace }
}
