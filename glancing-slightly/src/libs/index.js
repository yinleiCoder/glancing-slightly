import { defineAsyncComponent } from 'vue'
import svgIcon from './svg-icon/index.vue'
import popup from './popup/index.vue'

/**
 * 构建自己的物料库并自动化注册
 * 1. 获取当前路径下所有文件夹的index.vue
 * 2. 遍历获取到的组件模块
 * 3. app.component进行全局注册组件
 */
export default {
  install(app) {
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = `yl-${fullPath.replace('./', '').split('/')[0]}`
      app.component(componentName, defineAsyncComponent(fn))
    }
  }
}
