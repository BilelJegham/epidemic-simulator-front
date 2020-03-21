import Vue from 'vue'
import App from './App.vue'
import HighchartsVue from 'highcharts-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css' 
import AccueilPage from './views/AccueilPage.vue'
import Router from 'vue-router'
import stockInit from 'highcharts/modules/stock'

import Highcharts from "highcharts";
import darkUnica from "highcharts/themes/dark-unica";

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
      name: 'Home',
      component: AccueilPage,
    },
  ],  
  linkActiveClass
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
