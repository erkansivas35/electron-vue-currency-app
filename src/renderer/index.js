import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

require('./font-awesome/index')
Vue.use(require('vue-moment'));


new Vue({
  el: '#app',
  router,
  render(h) {
    return h(App)
  }
})