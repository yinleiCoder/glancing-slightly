<script>
const LOCAITON_TOP_LETT = 'top-left'
const LOCAITON_TOP_RIGHT = 'top-right'
const LOCATION_BOTTOM_LEFT = 'bottom-left'
const LOCAITON_BOTTOM_RIGHT = 'bottom-right'
const DELAY_TIME = 800

const placementEnum = [
  LOCAITON_TOP_LETT,
  LOCAITON_TOP_RIGHT,
  LOCATION_BOTTOM_LEFT,
  LOCAITON_BOTTOM_RIGHT
]
</script>
<script setup>
import { nextTick, ref, watch } from 'vue'

/**
 * popover气泡组件
 * 1. 指定所有可选位置
 * 2. 通过prop控制指定位置
 * 3. 获取元素的dom，读取元素的尺寸
 * 4. 生成气泡的style控制每个位置的样式
 * 5. 根据prop计算style
 */
const props = defineProps({
  placement: {
    type: String,
    default: LOCATION_BOTTOM_LEFT,
    validator(val) {
      const res = placementEnum.includes(val)
      if (!res) {
        throw new Error(
          `placement argument must be included ${placementEnum.join('、')}`
        )
      }
      return res
    }
  }
})

const isPopoverShow = ref(false)
let timeoutId

const onMouseenter = () => {
  isPopoverShow.value = true
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
}

const onMouseleave = () => {
  timeoutId = setTimeout(() => {
    isPopoverShow.value = false
    timeoutId = null
  }, DELAY_TIME)
}

const referenceTarget = ref(null)
const contentTarget = ref(null)

const useElementsSize = (target) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

const contentStyle = ref({
  top: 0,
  left: 0
})

watch(isPopoverShow, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      case LOCAITON_TOP_LETT:
        contentStyle.value.top = 0
        contentStyle.value.left = `${-useElementsSize(contentTarget.value)
          .width}px`
        break
      case LOCAITON_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = `${
          useElementsSize(referenceTarget.value).width
        }px`
        break
      case LOCATION_BOTTOM_LEFT:
        contentStyle.value.top = `${
          useElementsSize(referenceTarget.value).height
        }px`
        contentStyle.value.left = `${-useElementsSize(contentTarget.value)
          .width}px`
        break
      case LOCAITON_BOTTOM_RIGHT:
        contentStyle.value.top = `${
          useElementsSize(referenceTarget.value).height
        }px`
        contentStyle.value.left = `${
          useElementsSize(referenceTarget.value).width
        }px`
        break
    }
  })
})
</script>
<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div ref="referenceTarget">
      <slot name="reference" />
    </div>
    <Transition name="slide">
      <div
        ref="contentTarget"
        v-if="isPopoverShow"
        :style="contentStyle"
        class="absolute p-1 z-20 bg-white border rounded-md dark:bg-zinc-900 dark:border-zinc-700"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
