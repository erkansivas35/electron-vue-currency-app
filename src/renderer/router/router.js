import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/Home.vue'
import CurrencyDetail from '../pages/CurrencyDetail.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/currency-detail/:coinId?/:coinType?/:id?',
      name: 'CurrencyDetail',
      component: CurrencyDetail
    }
  ]
})