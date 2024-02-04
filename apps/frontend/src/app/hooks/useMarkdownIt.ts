import markdownit from "markdown-it"

let md: ReturnType<typeof markdownit>

export function useMarkdownIt(text: Ref<string>) {
  if (!md) {
    md = markdownit({ linkify: true })
    md.linkify.set({ fuzzyEmail: false })
  }
  return computed(() => md.render(text.value))
}
