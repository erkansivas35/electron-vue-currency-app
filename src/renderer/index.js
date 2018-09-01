import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

require('./font-awesome/index')


new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})