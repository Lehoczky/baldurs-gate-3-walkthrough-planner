<script setup lang="ts">
import Button from "primevue/button"
import Dialog from "primevue/dialog"
import InputText from "primevue/inputtext"
import { ref } from "vue"

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
})

defineEmits<{
  (event: "close", payload?: string): void
}>()

const label = ref(props.label)
</script>

<template>
  <Dialog
    modal
    dismissable-mask
    class="w-120"
    visible
    @update:visible="$emit('close')"
  >
    <template #header>
      <div class="flex items-center gap-2">
        <div class="text-lg font-bold">Edit group label</div>
        <div class="i-lucide-message-square-text" />
      </div>
    </template>

    <form @submit.prevent="$emit('close', label)">
      <label class="flex flex-col">
        <div class="mb-1 text-base">Label</div>
        <InputText v-model="label" type="text" autofocus />
      </label>
    </form>

    <template #footer>
      <Button
        label="Cancel"
        severity="danger"
        outlined
        @click="$emit('close')"
      />
      <Button label="Save" severity="success" @click="$emit('close', label)" />
    </template>
  </Dialog>
</template>
