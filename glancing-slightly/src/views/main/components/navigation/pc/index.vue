<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

const isOpenCategory = ref(false)
const triggerOpen = () => {
  isOpenCategory.value = !isOpenCategory.value
}

const currentCategoryIndex = ref(0)
const onCategoryItemClick = (index) => {
  currentCategoryIndex.value = index
}
</script>
<template>
  <div class="bg-white sticky top-0 left-0 w-ful z-10">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isOpenCategory ? 'h-[206px]' : 'h-[56px]']"
    >
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-100"
        @click="triggerOpen"
      >
        <yl-svg-icon
          :name="isOpenCategory ? 'fold' : 'expand'"
          class="w-1 h-1"
          fillClass="fill-zinc-900"
        ></yl-svg-icon>
      </div>
      <li
        v-for="(item, index) in categoryStore.categories"
        :key="item._id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 text-zinc-900 text-base font-medium h-4 leading-4 cursor-pointer hover:bg-zinc-100 rounded mr-1 mb-1"
        :class="{
          'text-zinc-900 bg-zinc-100': currentCategoryIndex === index
        }"
        @click="onCategoryItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
