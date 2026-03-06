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
    md = markdownit({ linkify: true, breaks: true })
    md.linkify.set({ fuzzyEmail: false })
    renderLinkTargetBlank(md)
  }
  return computed(() => md.render(text.value))
}

/**
 *
 * See: https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
 */
function renderLinkTargetBlank(md: markdownit) {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    tokens[idx].attrSet("target", "_blank")
    return defaultRender(tokens, idx, options, env, self)
  }
}
