import type { Node } from "@vue-flow/core"

export function createStartNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "start",
    data: {
      label: "Journey Starts",
    },
  }
}

export function createEndNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "end",
    data: {
      label: "Journey Ends",
    },
  }
}

export function createNoteNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "note",
    width: 300,
    height: 220,
    data: {
      label: "Write something here...",
      editing: true,
    },
  }
}

export function createGroupNode(): Omit<Node, "position"> {
  return {
    id: crypto.randomUUID(),
    type: "group",
    zIndex: -1002,
    data: {
      label: "Group",
    },
  }
}
