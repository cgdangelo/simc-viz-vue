import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import './plugins/highcharts'
import './plugins/vuetify'

import report from './report.json'

Vue.config.productionTip = false

new Vue({
  data: { report },
  render: h => h(App)
}).$mount('#app')
