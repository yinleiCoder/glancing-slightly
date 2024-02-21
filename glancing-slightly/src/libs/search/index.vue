<script>
const EMIT_SEARCH = 'search'
const EMIT_CLEAR = 'clear'
const EMIT_INPUT = 'input'
const EMIT_FOCUS = 'focus'
const EMIT_BLUR = 'blur'
</script>
<script setup>
import { ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
/**
 * 搜索组件：
 * 1. 双向绑定
 * 2. 在hover时展示
 * 3. 清空输入文本
 * 4. 触发搜索
 * 5. 控制下拉展示区的展示
 * 6. 事件处理
 */
const searchModel = defineModel()

const emits = defineEmits([
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])

const onClearClick = () => {
  searchModel.value = ''
  emits(EMIT_CLEAR)
}

const onSearchHandler = () => {
  emits(EMIT_SEARCH, searchModel.value)
}

const isFocus = ref(false)
const searchContainerTarget = ref(null)
const onFocusHandler = () => {
  isFocus.value = true
  emits(EMIT_FOCUS)
}

const onBlurHandler = () => {
  emits(EMIT_BLUR)
}

onClickOutside(searchContainerTarget, () => {
  isFocus.value = false
})

watch(searchModel, (val) => {
  emits(EMIT_INPUT, val)
})
</script>
<template>
  <div
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
    ref="searchContainerTarget"
  >
    <div>
      <yl-svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
      ></yl-svg-icon>
      <input
        type="text"
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-medium border border-zinc-100 dark:border-zinc-700 text-sm focus:border-red-300 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700"
        placeholder="搜索"
        v-model="searchModel"
        @keyup.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <yl-svg-icon
        v-show="searchModel"
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500"
        name="clear"
        @click="onClearClick"
      ></yl-svg-icon>
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <yl-button
        icon="search"
        class="opacity-0 group-hover:opacity-100 absolute translate-y-[-50%] duration-500 top-[50%] right-2 rounded-full"
        @click="onSearchHandler"
      ></yl-button>
    </div>
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl"
      >
        <slot name="dropdown" />
      </div>
    </Transition>
  </div>
</template>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
