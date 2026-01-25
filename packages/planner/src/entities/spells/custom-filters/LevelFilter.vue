<script setup lang="ts">
import type { Spell } from "@bg3-walkthrough-planner/types"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { addFilter } = dataStore

const options: Array<Spell["level"]> = [
  "Cantrip",
  "1st level",
  "2nd level",
  "3rd level",
  "4th level",
  "5th level",
  "6th level",
]

function applyFilter(level: Spell["level"] | null) {
  addFilter({
    category: "spells",
    name: "level",
    filter: level ? (entity: Spell) => entity.level === level : null,
  })
}
</script>

<template>
  <label>
    <div class="mb-1 text-xl">Level</div>
    <Select
      :options="options"
      fluid
      show-clear
      @update:model-value="applyFilter($event)"
    />
  </label>
</template>
