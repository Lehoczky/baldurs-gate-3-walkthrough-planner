<script setup lang="ts">
import "swiper/css"
import "swiper/css/pagination"

import Button from "primevue/button"
import Dialog from "primevue/dialog"
import Swiper from "swiper"
import { Pagination } from "swiper/modules"
import { onMounted, ref } from "vue"

let swiper: Swiper

const pageTitles = ["Drag & Drop", "Notes"]
const title = ref(pageTitles[0])
const isBeginning = ref(true)
const isEnd = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    swiper = new Swiper(".swiper", {
      modules: [Pagination],
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
      },
      on: {
        slideChange(swiper) {
          title.value = pageTitles[swiper.activeIndex]
          isBeginning.value = swiper.isBeginning
          isEnd.value = swiper.isEnd
        },
      },
    })
  })
})

const emit = defineEmits<{
  (event: "close"): void
}>()

function close() {
  emit("close")
}
</script>

<template>
  <Dialog
    class="w-11/12 md:w-160"
    visible
    :header="title"
    modal
    dismissable-mask
    @update:visible="close"
  >
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="mb-4">
            Drag & drop any weapon, item, location and more, directly to the
            chart. You can connect them with edges to put them in sequence,
            signal dependencies, or whatever comes into your mind!
          </div>
          <img
            class="w-full"
            src="/drag-n-drop.gif"
            width="500"
            height="400"
            alt="Video showing how to drag elements from the sidebar"
          />
        </div>

        <div class="swiper-slide">
          <div class="mb-4">Write notes for yourself, even in markdown:</div>
          <img
            class="w-full"
            src="/note.gif"
            width="500"
            height="400"
            alt="Video showing how to drag elements from the sidebar"
          />
        </div>
      </div>

      <div class="swiper-pagination" />

      <div class="mt-1 flex justify-between p-1">
        <Button
          label="Prev"
          :disabled="isBeginning"
          class="z-10 w-24"
          @click="swiper?.slidePrev()"
        />
        <Button
          label="Next"
          :disabled="isEnd"
          class="z-10 w-24"
          @click="swiper?.slideNext()"
        />
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.swiper {
  --swiper-theme-color: var(--color-primary-500);
}
</style>
