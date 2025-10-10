<script setup lang="ts">
import { ref } from "vue"

import HelpListItem from "./HelpListItem.vue"
import HelpPanelButton from "./HelpPanelButton.vue"

const open = ref(false)
</script>

<template>
  <div
    class="bg-surface-900 z-20 w-72 -translate-y-full rounded-b-lg px-4 py-2.5 shadow transition-transform ease-out max-sm:hidden"
    :class="{
      'translate-y-0!': open,
    }"
  >
    <ul v-once class="space-y-2.5">
      <HelpListItem action="Open context menu" shortcut="Right Click" />
      <HelpListItem
        action="Select multiple nodes"
        shortcut="Ctrl + Left click"
      />
      <HelpListItem action="Drag selection" shortcut="Shift + Left click" />
      <HelpListItem action="Select all" shortcut="Ctrl + A" />
      <HelpListItem
        action="Delete selected node"
        shortcut="Delete / Backspace"
      />
      <HelpListItem action="Save" shortcut="Ctrl + S" />
      <HelpListItem action="Focus search" shortcut="Ctrl + K" />
      <HelpListItem action="Getting Started guide" shortcut="F1" />
    </ul>

    <HelpPanelButton v-model="open" />
  </div>
</template>
