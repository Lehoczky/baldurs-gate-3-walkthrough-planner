<template>
  <ErrorMessage severity="error" :closable="false">
    <div>Failed to load necessary data.</div>
    <div class="text-sm">
      Please open a bug ticket on
      <a
        href="https://github.com/Lehoczky/baldurs-gate-3-walkthrough-planner"
        target="_blank"
        class="underline underline-offset-2"
        >Github</a
      >.
    </div>
  </ErrorMessage>
</template>

<script setup lang="ts">
import ErrorMessage from "primevue/message"
</script>
