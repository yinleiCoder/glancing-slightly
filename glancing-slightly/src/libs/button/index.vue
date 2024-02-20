<script>
const typeEnum = {
  primary: 'text-white bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800',
  main: 'bg-main hover:bg-hover-main  active:bg-main',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200'
}

const sizeEnum = {
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  'icon-default': {
    button: 'w-3.5 h-3.5',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const EMITS_CLICK = 'click'
</script>
<script setup>
import { computed } from 'vue'

/**
 *button按钮:
 1. 构建type风格和size大小
 2. props控制按钮
 3. 区分icon button和text button
 4. 根据配置数据，实现相应按钮
 5. 处理点击事件
 */
const props = defineProps({
  icon: String,
  iconColor: String,
  iconClass: String,
  type: {
    type: String,
    default: 'main',
    validator(val) {
      const keys = Object.keys(typeEnum)
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`type must be included ${keys.join('、')}`)
      }
      return res
    }
  },
  size: {
    type: String,
    default: 'default',
    validator(val) {
      const keys = Object.keys(sizeEnum).filter((key) => !key.includes('icon'))
      const res = keys.includes(val)
      if (!res) {
        throw new Error(`size must be included ${keys.join('、')}`)
      }
      return res
    }
  },
  isActiveAnimation: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits([EMITS_CLICK])

const sizeKey = computed(() => {
  return props.icon ? `icon-${props.size}` : props.size
})

const onBtnClick = () => {
  if (props.isLoading) return
  emits(EMITS_CLICK)
}
</script>
<template>
  <button
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
      typeEnum[type],
      sizeEnum[sizeKey].button,
      { 'active:scale-105': isActiveAnimation }
    ]"
    @click.stop="onBtnClick"
  >
    <yl-svg-icon
      v-if="isLoading"
      name="loading"
      class="w-2 h-2 animate-spin mr-1"
    ></yl-svg-icon>
    <yl-svg-icon
      v-if="icon"
      :name="icon"
      class="m-auto"
      :class="sizeEnum[sizeKey].icon"
      :color="iconColor"
      :fillClass="iconClass"
    ></yl-svg-icon>
    <slot v-else />
  </button>
</template>
