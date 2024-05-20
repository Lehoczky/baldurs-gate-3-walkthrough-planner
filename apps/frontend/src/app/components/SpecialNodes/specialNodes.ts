import type { Node } from "@vue-flow/core"

export function createStartNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "start",
    label: "Journey Starts",
  }
}

export function createEndNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "end",
    label: "Journey Ends",
  }
}

export function createNoteNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "note",
    label: "Write something here...",
    width: 300,
    height: 220,
  }
}

export function createGroupNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "group",
    label: "Group",
    zIndex: -1002,
  }
}
