<script setup lang="ts">
import type { Creature } from "@bg3-walkthrough-planner/types"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const { addFilter } = useDataStore()

const options: Array<Creature["type"]["name"]> = [
  "Aberration",
  "Beast",
  "Celestial",
  "Construct",
  "Dragon",
  "Elemental",
  "Fey",
  "Fiend",
  "Giant",
  "Humanoid",
  "Monstrosity",
  "Ooze",
  "Plant",
  "Undead",
]

function applyFilter(type: Creature["type"]["name"] | null) {
  addFilter({
    category: "creatures",
    name: "type",
    filter: type ? (x: Creature) => x.type.name === type : null,
  })
}
</script>

<template>
  <label>
    <div class="mb-1 text-xl">Type</div>
    <Select
      :options="options"
      fluid
      show-clear
      @update:model-value="applyFilter($event)"
    />
  </label>
</template>
