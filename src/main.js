import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

if (window.Cypress) {
  window.store = store
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
