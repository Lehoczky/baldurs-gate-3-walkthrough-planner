<script setup lang="ts">
import { Background } from "@vue-flow/background"
import {
  MarkerType,
  type NodeAddChange,
  type NodeChange,
  useVueFlow,
  VueFlow,
} from "@vue-flow/core"
import { useEventListener, watchOnce } from "@vueuse/core"
import { storeToRefs } from "pinia"
import ContextMenu from "primevue/contextmenu"
import type { MenuItem } from "primevue/menuitem"
import {
  computed,
  defineAsyncComponent,
  onMounted,
  ref,
  useTemplateRef,
  watch,
} from "vue"

import BossNode from "@/entities/bosses/BossNode.vue"
import CompanionNode from "@/entities/companions/CompanionNode.vue"
import ItemNode from "@/entities/items/ItemNode.vue"
import LocationNode from "@/entities/locations/LocationNode.vue"
import SpellNode from "@/entities/spells/SpellNode.vue"
import TraderNode from "@/entities/traders/TraderNode.vue"
import { HelpPanel } from "@/help-panel"
import { useStorageStore } from "@/store/storage"

import FlowContextMenu from "./contextmenu/FlowContextMenu.vue"
import EmptyFlow from "./EmptyFlow.vue"
import EndNode from "./SpecialNodes/EndNode.vue"
import GroupNode from "./SpecialNodes/GroupNode.vue"
import StartNode from "./SpecialNodes/StartNode.vue"
import { useNodeDrop } from "./useNodeDragAndDrop"

const {
  addEdges,
  addSelectedEdges,
  addSelectedNodes,
  getNodes,
  getSelectedNodes,
  onConnect,
  onEdgeContextMenu,
  onEdgeDoubleClick,
  onEdgesChange,
  onNodesChange,
  removeNodes,
} = useVueFlow()
onConnect((params) => addEdges(params))

const { onDragOver, onDrop } = useNodeDrop()
const flowContextMenu = useTemplateRef("flowContextMenu")
const edgeContextMenu = useTemplateRef("edgeContextMenu")
const storageStore = useStorageStore()
const { save, load, updateSavedState } = storageStore
const { hasUnsavedChanges, hasSave } = storeToRefs(storageStore)

onEdgesChange((changes) => {
  updateSavedState(changes)
})
onNodesChange((changes) => {
  updateSavedState(changes)
  selectNewlyAddedNodesOnChanges(changes)
})

onEdgeContextMenu(({ edge, event }) => {
  addSelectedEdges([edge])
  edgeContextMenu.value.show(event)
})
onEdgeDoubleClick(({ edge }) => {
  addSelectedEdges([edge])
  showEdgeLabelDialog.value = true
})
const LazyEdgeLabelDialog = defineAsyncComponent({
  loader: () => import("./EdgeLabelDialog.vue"),
  delay: 0,
})
const showEdgeLabelDialog = ref(false)
const edgeContextMenuItems = ref<MenuItem[]>([
  {
    label: "Edit label",
    icon: "i-lucide-message-square-text",
    command: () => {
      showEdgeLabelDialog.value = true
    },
  },
])

const LazyNoteNode = defineAsyncComponent({
  loader: () => import("./SpecialNodes/NoteNode.vue"),
  delay: 0,
})
requestIdleCallback(() => import("./SpecialNodes/NoteNode.vue"))

/**
 * Select the nodes that gets added to the flow.
 */
function selectNewlyAddedNodesOnChanges(changes: NodeChange[]) {
  const addedNodes = changes
    .filter(({ type }) => type === "add")
    .map((changes) => (changes as NodeAddChange).item)

  if (addedNodes.length) {
    addSelectedNodes(addedNodes)
  }
}

useEventListener("keydown", (event) => {
  const { key, ctrlKey, target } = event

  if (key === "Delete") {
    deleteSelectedNodes()
  } else if (ctrlKey && key === "a" && !isEditableElement(target)) {
    event.preventDefault()
    selectEveryNode()
  } else if (ctrlKey && key === "s") {
    event.preventDefault()
    save()
  } else if (key === "F1") {
    event.preventDefault()
    showTutorial.value = true
  }
})

/**
 * @see https://stackoverflow.com/a/75124481/10876366
 */
function isEditableElement(el: EventTarget) {
  if (el instanceof HTMLElement && el.isContentEditable) {
    return true
  }
  if (el instanceof HTMLInputElement) {
    if (/text|email|number|password|search|tel|url/.test(el.type || "")) {
      return !(el.disabled || el.readOnly)
    }
  }
  if (el instanceof HTMLTextAreaElement) {
    return !(el.disabled || el.readOnly)
  }
  return false
}

function deleteSelectedNodes() {
  removeNodes(getSelectedNodes.value)
}

function selectEveryNode() {
  addSelectedNodes(getNodes.value)
}

const isFlowEmpty = computed(() => !getNodes.value.length)
const isFlowPristine = ref(true)
watchOnce(hasUnsavedChanges, () => (isFlowPristine.value = false))
const showEmptyMessage = computed(() => {
  return isFlowEmpty.value && isFlowPristine.value
})

onMounted(() => {
  if (hasSave.value) {
    load()
  }
})

const showTutorial = ref(false)
const skipTutorial = localStorage.getItem("planner:skip-tutorial") === "true"

const unwatchEmptyMessage = watch(
  showEmptyMessage,
  () => (showTutorial.value = !skipTutorial && showEmptyMessage.value),
  { immediate: true },
)
if (skipTutorial) {
  unwatchEmptyMessage()
}

function closeTutorial() {
  showTutorial.value = false
  localStorage.setItem("planner:skip-tutorial", "true")
  unwatchEmptyMessage()
}
const LazyGettingStartedDialog = defineAsyncComponent({
  loader: () => import("@/getting-started/GettingStartedDialog.vue"),
  delay: 0,
})
</script>

<template>
  <div class="grid h-full w-full">
    <div class="relative bg-surface-950" @drop="onDrop">
      <VueFlow
        :zoom-on-double-click="false"
        :default-edge-options="{
          labelBgPadding: [8, 4],
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }"
        :min-zoom="0.2"
        @dragover="onDragOver($event)"
        @pane-context-menu="flowContextMenu.show($event)"
      >
        <Background />

        <template #node-item="props">
          <ItemNode v-bind="props" />
        </template>
        <template #node-location="props">
          <LocationNode v-bind="props" />
        </template>
        <template #node-companion="props">
          <CompanionNode v-bind="props" />
        </template>
        <template #node-boss="props">
          <BossNode v-bind="props" />
        </template>
        <template #node-spell="props">
          <SpellNode v-bind="props" />
        </template>
        <template #node-trader="props">
          <TraderNode v-bind="props" />
        </template>
        <template #node-start="props">
          <StartNode v-bind="props" />
        </template>
        <template #node-end="props">
          <EndNode v-bind="props" />
        </template>
        <template #node-note="props">
          <LazyNoteNode v-bind="props" />
        </template>
        <template #node-group="props">
          <GroupNode v-bind="props" />
        </template>
      </VueFlow>

      <EmptyFlow
        v-if="showEmptyMessage"
        class="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <LazyGettingStartedDialog v-if="showTutorial" @close="closeTutorial" />

      <HelpPanel class="absolute top-0 left-8" />
    </div>

    <FlowContextMenu ref="flowContextMenu" />
    <ContextMenu ref="edgeContextMenu" :model="edgeContextMenuItems" />
    <LazyEdgeLabelDialog
      v-if="showEdgeLabelDialog"
      @close="showEdgeLabelDialog = false"
    />
  </div>
</template>
