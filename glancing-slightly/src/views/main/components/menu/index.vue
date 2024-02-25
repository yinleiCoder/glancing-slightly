<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
/**
 * 移动端弹层菜单
 */
defineEmits(['onItemClick'])
</script>
<template>
  <div class="py-2 h-[80vh] flex flex-col">
    <h2 class="text-lg text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
      所有分类
    </h2>
    <ul class="overflow-y-scroll">
      <li
        v-for="(item, index) in categoryStore.categories"
        :key="item._id"
        class="text-sm text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:active:bg-zinc-900"
        @click="$emit('onItemClick', index)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
