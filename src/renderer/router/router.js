import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/Home.vue'
import CurrencyDetail from '../pages/CurrencyDetail.vue'
import CoinTranslate from '../pages/CoinTranslate.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/currency-detail/:coinId?/:coinType?',
      name: 'CurrencyDetail',
      component: CurrencyDetail
    },
    {
      path: '/coin-translate',
      name: 'CoinTranslate',
      component: CoinTranslate
    }
  ]
})