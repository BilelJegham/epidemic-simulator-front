import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import AccueilPage from './views/AccueilPage.vue'
import AboutPage from './views/AboutPage.vue'
import ContributePage from './views/ContributePage.vue'
import Router from 'vue-router'
import stockInit from 'highcharts/modules/stock'
import '@fortawesome/fontawesome-free/css/all.css'

import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";
import './registerServiceWorker'

stockInit(Highcharts)
darkUnica(Highcharts);
Vue.config.productionTip = false
Vue.use(HighchartsVue)
Vue.use(VueMaterial)

Vue.use(VueAxios, axios)
const linkActiveClass = 'my-link-active-class'

Vue.material.router.linkActiveClass = linkActiveClass
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Simulator',
      component: AccueilPage,
    },
    {
      path: '/c/:country',
      name: 'Simulator Country',
      component: AccueilPage,
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage,
    },
    {
      path: '/contribute',
      name: 'Contribute',
      component: ContributePage,
    },
  ],  
  linkActiveClass
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
