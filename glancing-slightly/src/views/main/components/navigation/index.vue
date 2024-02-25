<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { useCategoryStore } from '@/stores/category'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()
categoryStore.getCategories()
</script>
<template>
  <mobile-navigation v-if="isMobileTerminal" />
  <pc-navigation v-else />
</template>
