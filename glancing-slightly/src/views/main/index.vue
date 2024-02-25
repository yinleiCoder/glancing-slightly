<script setup>
import navigation from './components/navigation/index.vue'
import list from './components/list/index.vue'
</script>
<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500">
    <navigation />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list></list>
    </div>
  </div>
</template>
