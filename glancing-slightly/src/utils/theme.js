import { watch } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

/**
 * 监听设备系统主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

/**
 * 更改主题
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = THEME_LIGHT
      break
    case THEME_DARK:
      themeClassName = THEME_DARK
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? THEME_DARK : THEME_LIGHT
      break
  }
  document.querySelector('html').className = themeClassName
}

export default () => {
  const themeStore = useThemeStore()
  // 当主题改变时或进入系统时，进行html class配置
  watch(
    () => themeStore.themeType,
    (val) => {
      changeTheme(val)
    },
    { immediate: true }
  )
}
