<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigation from './mobile/index.vue'
import pcNavigation from './pc/index.vue'
</script>
<template>
  <mobile-navigation v-if="isMobileTerminal" />
</template>
