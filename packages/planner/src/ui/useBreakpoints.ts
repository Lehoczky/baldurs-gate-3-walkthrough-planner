import {
  breakpointsTailwind,
  useBreakpoints as _useBreakpoints,
} from "@vueuse/core"

export function useBreakpoints() {
  return _useBreakpoints(breakpointsTailwind)
}
