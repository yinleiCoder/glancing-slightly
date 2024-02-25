<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
<template>
  <div class="bg-white dark:bg-zinc-900 rounded pb-1 h-[280px] w-[230px]">
    <div class="relative w-full rounded cursor-zoom-in group">
      <img :src="data.photo" class="w-full rounded bg-transparent" />
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/40 absolute top-0 left-0 right-0 bottom-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <yl-button class="absolute top-1.5 left-1.5">分享</yl-button>
        <yl-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></yl-button>
        <yl-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          icon="download"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></yl-button>
        <yl-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          icon="fullscreen"
          size="small"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        ></yl-button>
      </div>
      <p class="text-sm mt-1 text-zinc-900 dark:text-zinc-300">
        {{ data.title }}
      </p>
      <div class="flex items-center mt-1">
        <img :src="data.avatar" class="h-3 w-3 rounded-full" alt="" />
        <span class="text-sm text-zinc-500 ml-1">{{ data.username }}</span>
      </div>
    </div>
  </div>
</template>
