import type { PluginSimple } from "markdown-it"

import { NODE_PROTOCOL } from "./protocol"

export type NavigateToNodeEvent = CustomEvent<{ id: string }>

export const nodeLink: PluginSimple = (md) => {
  const defaultRender =
    md.renderer.rules.link_open ||
    function (tokens, idx, options, _env, self) {
      return self.renderToken(tokens, idx, options)
    }

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx]

    const href = token.attrGet("href")
    if (isNodeLink(href)) {
      const nodeId = href.split(":")[1]
      token.attrSet("href", "javascript:void(0)")
      token.attrSet(
        "onclick",
        /*javascript*/ `javascript:this.dispatchEvent(new CustomEvent('navigate-to-node', { bubbles: true, detail: { id: '${nodeId}' } }))`,
      )
      token.attrSet(
        "class",
        "inline-flex items-center gap-0.5 after:bg-contain after:size-3 after:bg-[url(https://api.iconify.design/lucide:link.svg)]",
      )
    }

    return defaultRender(tokens, idx, options, env, self)
  }
}

function isNodeLink(href: string) {
  return href.startsWith(`${NODE_PROTOCOL}:`)
}
