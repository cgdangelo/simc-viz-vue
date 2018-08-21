import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

const localeNumber = new Intl.NumberFormat().formatToParts(1000.1)

Highcharts.setOptions({
  credits: false,
  legend: false,

  chart: {
    style: {
      fontFamily: 'Roboto, sans-serif'
    }
  },

  lang: {
    decimalPoint: localeNumber.find(part => part.type === 'decimal').value,
    thousandsSep: localeNumber.find(part => part.type === 'group').value
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true
      }
    }
  }
})

Vue.use(HighchartsVue)
