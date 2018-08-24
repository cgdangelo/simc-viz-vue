import Vue from 'vue'
import HighchartsVue from 'highcharts-vue'
import Highcharts, { numberFormat } from 'highcharts'
import initXrange from 'highcharts/modules/xrange'

initXrange(Highcharts)

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
      fontWeight: 'bold',
      textOutline: '1px black'
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
        valueDecimals: 2,
        xDateFormat: '%M:%S'
      }
    },

    areaspline: {
      fillOpacity: 0.25
    },

    bar: {
      borderColor: '#000',
      dataLabels: {
        align: 'left',
        format: '{y:,.2f}',
        inside: true,
        style: {
          fontSize: '1rem'
        },
        y: 2
      },
      groupPadding: 0.075,
      pointPadding: 0.075
    },

    pie: {
      dataLabels: {
        formatter () {
          let dataLabel = ''

          if (this.series.data[this.point.x].pet === true) {
            dataLabel = `<b>${this.series.data[this.point.x].source}</b><br />`
          }

          dataLabel += `<span style="color: ${this.point.color}">${this.point.name}</span><br />${numberFormat(
            this.point.y, 1)}%`

          return dataLabel
        },
        style: {
          color: '#fff',
          fontSize: '1rem'
          // textOutline: '1px black',
          // textShadow: null
        }
      }
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
        color: '#999',
        fontSize: '1rem',
        // textShadow: '1px 1px 0px black',
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
        color: '#999',
        fontSize: '1rem',
        fontWeight: 'bold'
      }
    },
    title: null
  }
})

Vue.use(HighchartsVue)
