// Remove after https://github.com/drag-drop-touch-js/dragdroptouch/pull/103 is merged
declare module "@dragdroptouch/drag-drop-touch" {
  type DragDropTouchConfiguration = {
    allowDragScroll: boolean
    contextMenuDelayMS: number
    dragImageOpacity: number
    dragScrollPercentage: number
    dragScrollSpeed: number
    dragThresholdPixels: number
    isPressHoldMode: boolean
    forceListen: boolean
    pressHoldDelayMS: number
    pressHoldMargin: number
    pressHoldThresholdPixels: number
  }
  declare const DefaultConfiguration: DragDropTouchConfiguration

  declare function enableDragDropTouch(
    dragRoot?: Document | Element,
    dropRoot?: Document | Element,
    options?: Partial<typeof DefaultConfiguration>,
  ): void

  export { enableDragDropTouch }
}
