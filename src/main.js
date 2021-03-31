
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import { locale, getLanguage, getLocaleValue } from '@/lang/index'
import 'default-passive-events'
import './permission'
import uAdmin from 'u-admin-component/src/index'
import uConfig from '@/config'
console.log(uAdmin)

const app = uAdmin.createApp(App)
const components = [
  Antd,
  store,
  router,
  uAdmin
]

components.forEach(item => {
  app.use(item)
})

app.config.productionTip = false
app.use({
  install(app){
    const curLocale = locale[getLanguage(locale)] || {}
    app.provide('locale', curLocale)
    app.provide('uConfig', uConfig)
    app.config.globalProperties.$t = function(key) {
      return getLocaleValue(curLocale, key)
    }
  }
}).mount('#app')
