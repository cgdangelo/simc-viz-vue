import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import report from './report.json'

Vue.config.productionTip = false

new Vue({
  data: {report},
  render: h => h(App)
}).$mount('#app')
