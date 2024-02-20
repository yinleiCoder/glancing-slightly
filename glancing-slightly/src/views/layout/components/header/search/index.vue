<script setup>
import { ref } from 'vue'
const inputValue = ref('')
</script>
<template>
  <div class="w-full">
    <yl-search v-model="inputValue">
      <template #dropdown>
        <div>dropdown 占位</div>
      </template>
    </yl-search>
  </div>
</template>
