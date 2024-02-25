<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import { useCategoryStore } from '@/stores/category'
import Menu from '@/views/main/components/menu/index.vue'

const categoryStore = useCategoryStore()

const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

/**
 * 处理移动端下的滑块
 * 1. 选中item的下标
 * 2. 所有item元素的ref
 * 3. ul的横向滚动偏移位置
 * 4. 当前选中的index发生改变后，获取item下标元素的left width计算style
 */
const currentCategoryIndex = ref(0)
let itemRefs = []
const setItemsRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}

onBeforeUpdate(() => {
  itemRefs = []
})

const ulTarget = ref(null)
const { x: ulScrollLeft } = useScroll(ulTarget)

watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: `${width}px`
  }
})

// popup弹窗展示
let isPopupShow = ref(false)
const onShowPopup = () => {
  isPopupShow.value = true
}

const onItemClick = (index) => {
  currentCategoryIndex.value = index
  isPopupShow.value = false
}
</script>
<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden"
    >
      <li
        :style="sliderStyle"
        class="absolute h-[22px] dark:bg-zinc-800 bg-zinc-900 rounded duration-200"
      ></li>
      <li
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc z-20"
        @click="onShowPopup"
      >
        <yl-svg-icon name="hamburger" class="w-1.5 h-1.5"></yl-svg-icon>
      </li>
      <li
        v-for="(item, index) in categoryStore.categories"
        :key="item._id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        :ref="setItemsRef"
        @click="onItemClick(index)"
      >
        {{ item.name }}
      </li>
    </ul>
    <yl-popup v-model="isPopupShow"
      ><Menu @onItemClick="onItemClick"
    /></yl-popup>
  </div>
</template>
