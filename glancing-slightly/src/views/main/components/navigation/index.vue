<script setup>
import { onMounted, ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { getCategory } from '@/apis/category'
import { ALL_CATEGORY_ITEM } from '../../../../constants'

const categories = ref([])

const getCategoryData = async () => {
  categories.value = await getCategory()
  categories.value.unshift(ALL_CATEGORY_ITEM)
}

getCategoryData()
</script>
<template>
  <mobile-navigation v-if="isMobileTerminal" :data="categories" />
</template>
