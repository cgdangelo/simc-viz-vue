<template>
  <highcharts :options="chartOptions"/>
</template>

<script>
export default {
  name: 'StackedBarChart',

  props: {
    data: {
      type: Array,
      required: true
    },

    name: {
      type: String,
      required: true
    }
  },

  computed: {
    chartOptions () {
      const { data } = this

      return {
        chart: {
          height: Math.max(400, this.data.length * 40)
        },

        title: {
          text: this.name
        },

        xAxis: {
          categories: this.data.map(bar => bar.name),
          labels: {
            formatter () {
              return `<span style="color: ${data[this.pos].color}">${this.value}</span>`
            },
            style: {
              fontWeight: 'bold'
            }
          }
        },

        yAxis: {
          labels: {
            style: {
              fontWeight: 'normal'
            }
          }
        },

        series: [
          {
            type: 'bar',
            name: this.name,
            data: this.data
          }
        ]
      }
    }
  }
}
</script>
