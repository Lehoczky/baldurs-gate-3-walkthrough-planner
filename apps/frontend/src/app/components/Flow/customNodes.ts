import type { Node } from "@vue-flow/core"

export function createStartNode() {
  return {
    id: crypto.randomUUID(),
    type: "start",
    label: "Journey Starts",
  } satisfies Partial<Node>
}

export function createEndNode() {
  return {
    id: crypto.randomUUID(),
    type: "end",
    label: "Journey Ends",
  } satisfies Partial<Node>
}

export function createNoteNode() {
  return {
    id: crypto.randomUUID(),
    type: "note",
    label: "Write something here...",
  } satisfies Partial<Node>
}

export function createGroupNode() {
  return {
    id: crypto.randomUUID(),
    type: "group",
    label: "Group",
    zIndex: -1000,
  } satisfies Partial<Node>
}
