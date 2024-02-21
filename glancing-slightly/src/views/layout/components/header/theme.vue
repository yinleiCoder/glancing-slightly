<script setup>
import { ref, computed } from 'vue'
import {
  THEME_LIGHT,
  THEME_LIGHT_ICON,
  THEME_DARK,
  THEME_DARK_ICON,
  THEME_SYSTEM,
  THEME_SYSTEM_ICON
} from '@/constants'
import { useThemeStore } from '@/stores/theme'
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

/**
 * 主题切换：
 * 1. 监听主题的切换行为
 * 2. 根据行为保存当前需要展示的主题到状态管理
 * 3. 根据状态管理中保存的当前主题展示对应的主题图标
 * 4. 根据状态管理中保存的当前主题修改html的class
 */
const themeStore = useThemeStore()
const onThemeItemClick = (themeItem) => {
  themeStore.changeThemeType(themeItem.type)
}

const svgIconName = computed(() => {
  const findedTheme = themes.find((item) => {
    return item.type === themeStore.themeType
  })
  return findedTheme?.icon
})
</script>
<template>
  <yl-popover placement="bottom-left">
    <template #reference>
      <yl-svg-icon
        :name="svgIconName"
        class="w-4 h-4 p-1 cursor-pointer rounded duration-200 outline-0 hover:bg-zinc-100 dark:hover:bg-zinc-900"
        fillClass="fill-zinc-900 dark:fill-zinc-300"
      ></yl-svg-icon>
    </template>
    <div class="w-[140px] overflow-hidden">
      <div
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
        v-for="item in themes"
        :key="item.id"
        @click="onThemeItemClick(item)"
      >
        <yl-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fillClass="fill-zinc-900 dark:fill-zinc-300"
        ></yl-svg-icon>
        <span class="text-zinc-900 text-sm dark:text-zinc-300">{{
          item.name
        }}</span>
      </div>
    </div>
  </yl-popover>
</template>
