import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/main.css'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

Vue.directive('document-click', {
  bind (el, binding, vnode) {
    document.addEventListener('click', binding.value, false)
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})