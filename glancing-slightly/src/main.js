import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import router from './router'
import './styles/index.css'
import App from './App.vue'
import { useRem } from './utils/flexible'
import useTheme from './utils/theme'
import ylLibs from './libs'
import 'virtual:svg-icons-register'

const pinia = createPinia()
pinia.use(
  createPersistedState({
    auto: true
  })
)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ylLibs)

useRem()
useTheme()

app.mount('#app')
