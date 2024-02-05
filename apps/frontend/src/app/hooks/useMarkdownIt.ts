import type MarkdownItConstructor from "markdown-it"

let md: InstanceType<typeof MarkdownItConstructor>

export function useMarkdownIt(text: Ref<string>) {
  const render = ref(() => text.value)

  async function init() {
    const markdownit = (await import("markdown-it")).default
    md = markdownit({ linkify: true })
    md.linkify.set({ fuzzyEmail: false })
    render.value = () => md.render(text.value)
  }
  if (!md) {
    init()
  }
  return computed(() => render.value())
}
