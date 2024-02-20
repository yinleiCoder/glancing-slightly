<script setup>
const menus = [
  {
    id: 0,
    title: '用户资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    title: '退出登录',
    icon: 'logout',
    path: ''
  }
]
</script>
<template>
  <yl-popover class="flex items-center" placement="bottom-left">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded cursor-pointer duration-200 outline-0 hover:bg-zinc-100"
      >
        <img
          class="w-4 h-4 rounded-full object-cover"
          src="https://img.zcool.cn/community/0193fb601fb0a411013f79285f29f6.jpg?x-oss-process=image/resize,m_fill,w_160,h_160,limit_0/auto-orient,1/sharpen,100/quality,q_100/format,webp"
          alt="me"
        />
        <yl-svg-icon
          class="h-2.5 w-2.5 ml-0.5"
          name="arrowdown"
          fillClass="fill-zinc-900"
        ></yl-svg-icon>
      </div>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100"
        v-for="item in menus"
        :key="item.id"
      >
        <yl-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></yl-svg-icon>
        <span class="text-zinc-800 text-sm">{{ item.title }}</span>
      </div>
    </div>
  </yl-popover>
</template>
