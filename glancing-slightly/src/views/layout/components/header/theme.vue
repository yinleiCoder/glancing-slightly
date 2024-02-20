<script setup>
import {
  THEME_LIGHT,
  THEME_LIGHT_ICON,
  THEME_DARK,
  THEME_DARK_ICON,
  THEME_SYSTEM,
  THEME_SYSTEM_ICON
} from '@/constants'
const themes = [
  {
    id: '0',
    type: THEME_LIGHT,
    icon: THEME_LIGHT_ICON,
    name: '浅色'
  },
  {
    id: '1',
    type: THEME_DARK,
    icon: THEME_DARK_ICON,
    name: '深色'
  },
  {
    id: '2',
    type: THEME_SYSTEM,
    icon: THEME_SYSTEM_ICON,
    name: '跟随系统'
  }
]
</script>
<template>
  <yl-popover placement="bottom-left">
    <template #reference>
      <yl-svg-icon
        name="theme-light"
        class="w-4 h-4 p-1 cursor-pointer rounded duration-200 outline-0 hover:bg-zinc-100"
        fillClass="fill-zinc-900"
      ></yl-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100"
        v-for="item in themes"
        :key="item.id"
      >
        <yl-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900"
        ></yl-svg-icon>
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </yl-popover>
</template>
