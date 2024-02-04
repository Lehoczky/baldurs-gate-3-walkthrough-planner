<template>
  <div
    class="flex cursor-move select-none flex-col items-center justify-center rounded-md bg-slate-700 px-4 py-2 text-center shadow-lg"
    :draggable="true"
  >
    <slot />
  </div>
</template>
