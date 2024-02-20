import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './styles/index.css'
import App from './App.vue'
import { useRem } from './utils/flexible'
import ylLibs from './libs'
import 'virtual:svg-icons-register'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ylLibs)

useRem()

app.mount('#app')
