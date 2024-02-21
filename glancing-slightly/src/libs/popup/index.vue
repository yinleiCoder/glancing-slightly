<script setup>
import { useScrollLock } from '@vueuse/core'
import { watch } from 'vue'
/**
 *popup弹窗自底向上弹出
 1. popup展开时，内容视图应该不属于任何一个组件内部
 2. popup应该包含背景蒙版、内容的包裹
 3. popup应该通过双向绑定进行控制展示和隐藏
 4. pop展示时，滚动应该被锁定
 5. 内容区域应该接收所有的attrs并通过插槽让调用方指定其内容
 */
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

// 锁定滚动
let isLocked = useScrollLock(document.body)
watch(
  () => props.modelValue,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>
<template>
  <div>
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="modelValue"
          class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
          @click="emits('update:modelValue', false)"
        />
      </Transition>
      <Transition name="popup">
        <div
          v-if="modelValue"
          v-bind="$attrs"
          class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0"
        >
          <slot />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s;
}

.popup-enter-from,
.popup-leave-to {
  transform: translateY(100%);
}
</style>
