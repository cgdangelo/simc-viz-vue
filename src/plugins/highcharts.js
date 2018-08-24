import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts from 'highcharts'

const localeNumber = new Intl.NumberFormat().formatToParts(1000.1)

Highcharts.setOptions({
  credits: false,
  legend: false,

  chart: {
    backgroundColor: '#424242',
    spacing: [25, 50, 25, 25],
    style: {
      fontFamily: 'Roboto, sans-serif'
    }
  },

  title: {
    style: {
      color: '#fff',
      fontWeight: 'bold'
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
      },

      tooltip: {
        valueDecimals: 2
      }
    },

    bar: {
      borderColor: '#000',
      dataLabels: {
        align: 'left',
        format: '{y:,.2f}',
        inside: true,
        style: {
          fontSize: '1.2rem'
        },
        y: 2
      },
      groupPadding: 0.075,
      pointPadding: 0.075
    }
  },

  xAxis: {
    dateTimeLabelFormats: {
      day: '%M:%S',
      millisecond: '%M:%S',
      minute: '%M:%S',
      second: '%M:%S'
    },
    gridLineColor: 'transparent',
    labels: {
      style: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textShadow: '1px 1px 0px black',
        whiteSpace: 'nowrap'
      },
      y: 5
    },
    lineWidth: 0,
    tickLength: 0
  },
  yAxis: {
    gridLineColor: '#333',
    labels: {
      style: {
        fontSize: '0.9rem'
      }
    },
    title: null
  }
})

Vue.use(HighchartsVue)
