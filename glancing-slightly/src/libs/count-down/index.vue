<script>
const EMITS_FINISH = 'finish'
const EMITS_CHANGE = 'change'
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { computed, onUnmounted, watch, ref } from 'vue'
import dayjs from '@/utils/date'

const props = defineProps({
  time: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_FINISH, EMITS_CHANGE])

const duration = ref(0)
let intervalId
const start = () => {
  close()
  intervalId = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}

const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  if (duration.value <= 0) {
    emits(EMITS_FINISH)
    close()
  }
}

const close = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
}

onUnmounted(() => {
  close()
})

watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>
<template>
  <div>
    <slot>
      <p>{{ showTime }}</p>
    </slot>
  </div>
</template>
