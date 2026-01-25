<script setup lang="ts">
import type { Spell } from "@bg3-walkthrough-planner/types"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { addFilter } = dataStore

const options: Array<Spell["school"]> = [
  "Abjuration",
  "Conjuration",
  "Divination",
  "Divination",
  "Enchantment",
  "Evocation",
  "Illusion",
  "Necromancy",
  "Transmutation",
]

function applyFilter(school: Spell["school"] | null) {
  addFilter({
    category: "spells",
    name: "school",
    filter: school ? (entity: Spell) => entity.school === school : null,
  })
}
</script>

<template>
  <label>
    <div class="mb-1 text-xl">School</div>
    <Select
      :options="options"
      fluid
      show-clear
      @update:model-value="applyFilter($event)"
    />
  </label>
</template>
