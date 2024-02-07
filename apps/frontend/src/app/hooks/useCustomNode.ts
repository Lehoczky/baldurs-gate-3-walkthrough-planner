const TEXT_PER_TYPE = {
  start: "Journey Starts",
  end: "Journey Ends",
  note: "Write something here...",
} as const

export function useCustomNode() {
  function create(type: string) {
    return {
      id: crypto.randomUUID(),
      type,
      label: TEXT_PER_TYPE[type],
    }
  }

  return { create }
}
