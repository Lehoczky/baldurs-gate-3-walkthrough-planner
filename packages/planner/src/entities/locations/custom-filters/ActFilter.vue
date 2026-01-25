<script setup lang="ts">
import type { Location } from "@bg3-walkthrough-planner/types"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { addFilter } = dataStore

const options: Array<Location["act"]> = ["Act One", "Act Two", "Act Three"]

function applyFilter(act: string | null) {
  addFilter({
    category: "locations",
    name: "act",
    filter: act ? (location: Location) => location.act === act : null,
  })
}
</script>

<template>
  <label>
    <div class="mb-1 text-xl">Act</div>
    <Select
      :options="options"
      fluid
      show-clear
      @update:model-value="applyFilter($event)"
    />
  </label>
</template>
