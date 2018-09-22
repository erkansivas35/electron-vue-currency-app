import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faChartBar, faRocket, faNewspaper, faCog, faAngleDoubleRight, faCoins } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faChartBar, faRocket, faNewspaper, faCog, faAngleDoubleRight, faCoins)

Vue.component('font-awesome-icon', FontAwesomeIcon)