import markdownit from "markdown-it"
import { computed, type Ref } from "vue"

let md: ReturnType<typeof markdownit>

/**
 * Transform the given markdown string into HTML with
 * `markdown-it`.
 *
 * @param text the text to transform
 * @returns the rendered html
 *
 * @example
 * ```ts
 * const text = ref("# Hello")
 * const renderedText = useMarkdownIt(text)
 * // <h1>Hello</h1>
 * ```
 */
export function useMarkdownIt(text: Ref<string>) {
  if (!md) {
    md = markdownit({ linkify: true })
    md.linkify.set({ fuzzyEmail: false })
  }
  return computed(() => md.render(text.value))
}
