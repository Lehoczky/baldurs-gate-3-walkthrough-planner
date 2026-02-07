<script setup lang="ts">
import type { Boss } from "@bg3-walkthrough-planner/types"
import Select from "primevue/select"

import { useDataStore } from "@/store/data"

const dataStore = useDataStore()
const { addFilter } = dataStore

const options: Array<Boss["act"]> = ["Act One", "Act Two", "Act Three"]

function applyFilter(act: string | null) {
  addFilter({
    category: "bosses",
    name: "act",
    filter: act ? (boss: Boss) => boss.act === act : null,
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
