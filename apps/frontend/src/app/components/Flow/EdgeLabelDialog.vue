<!-- eslint-disable vue/no-static-inline-styles -->

<template>
  <Dialog
    modal
    dismissable-mask
    :style="{ width: '30rem' }"
    visible
    @update:visible="close"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <div class="text-lg font-bold">Edit edge label</div>
        <div class="i-lucide-message-square-text" />
      </div>
    </template>

    <form @submit.prevent="saveAndClose">
      <label class="flex flex-col">
        <div class="mb-1 text-base">Label</div>
        <InputText v-model="label" type="text" autofocus />
      </label>
    </form>

    <template #footer>
      <Button label="Cancel" severity="danger" outlined @click="close" />
      <Button label="Add Label" severity="success" @click="saveAndClose" />
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import { useVueFlow } from "@vue-flow/core"
import { first } from "lodash-es"

const emit = defineEmits<{
  (event: "close"): void
}>()

const { getSelectedEdges } = useVueFlow({
  id: "main",
})
const firstSelectedEdge = computed(() => first(getSelectedEdges.value))
const initialLabel = computed(() => {
  return (firstSelectedEdge.value.label as string) ?? ""
})
const label = ref(initialLabel.value)

function saveAndClose() {
  for (const edge of getSelectedEdges.value) {
    edge.label = label.value
  }
  close()
}

function close() {
  emit("close")
}
</script>
