<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  name: 'RaidEvents',

  props: {
    maxTime: {
      type: Number,
      required: true
    },

    events: {
      type: Array,
      required: true
    }
  },

  computed: {
    chartOptions () {
      const yAxisCategories = this.events.map(event => event.name || event.type)
      const chartData = []

      this.events.forEach((event, i) => {
        const first = (event.first > 0 ? event.first : 0) * 1000
        const last = (event.last > 0 ? event.last : this.maxTime) * 1000

        let duration

        if (event.duration > 0) {
          duration = event.duration
        } else if (event.type === 'movement_distance') {
          duration = (event.move_distance || 7.0) / 7.0
        } else {
          duration = 1
        }

        duration *= 1000

        chartData.push({x: first, x2: first + duration, y: i})

        for (let t = first; t < last; t += event.cooldown * 1000) {
          chartData.push({
            originalEvent: event,
            x: t,
            x2: t + duration,
            y: i
          })
        }
      })

      return {
        chart: {
          height: this.events.length * 75,
          zoomType: 'x'
        },
        series: [
          {
            data: chartData,
            dataLabels: false,
            pointWidth: 20,
            type: 'xrange'
          }
        ],
        title: {
          text: 'Raid Events'
        },
        tooltip: {
          formatter () {
            const start = this.series.chart.time.dateFormat('%M:%S', this.x)
            const end = this.series.chart.time.dateFormat('%M:%S', this.x2)
            const options = Object.entries(this.point.originalEvent || {})
              .map(option => option.join(' = '))
              .join('\n')

            return `${start} - ${end}<hr /><h3>${this.yCategory}</h3><pre style="margin: 0">${options}</pre>`
          },
          outside: true,
          useHTML: true,
          xDateFormat: '%M:%S'
        },
        xAxis: {
          crosshair: {
            snap: false
          },
          dateTimeLabelFormats: {
            day: '%M:%S',
            second: '%M:%S'
          },
          labels: {
            style: {
              textShadow: null
            },
            y: null
          },
          max: 300 * 1000,
          min: 0,
          type: 'datetime'
        },
        yAxis: {
          categories: yAxisCategories,
          labels: {
            style: {
              color: '#fff',
              fontSize: '1rem'
            }
          }
        }
      }
    }
  }
}
</script>
