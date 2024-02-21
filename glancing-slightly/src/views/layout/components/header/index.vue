<script setup>
import { useRouter } from 'vue-router'
import Search from './search/index.vue'
import Theme from './theme.vue'
import Me from './me.vue'

const router = useRouter()

const onGoToHome = () => {
  router.push('/')
}
</script>
<template>
  <div
    class="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center">
      <img
        src="https://img.zcool.cn/community/01220e5eea7b46a801215aa0c9d77c.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100/quality,q_100/format,webp"
        alt="Logo"
        class="h-4 cursor-pointer mr-2 rounded-full"
        onclick="onGoToHome"
      />
      <Search class="mr-1"></Search>
      <Theme class="mr-1"></Theme>
      <Me></Me>
    </div>
  </div>
</template>
