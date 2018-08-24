<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
export default {
  name: 'StackedPlayerBarChart',

  props: {
    name: {
      type: String,
      required: true
    },

    players: {
      type: Array,
      required: true
    }
  },

  computed: {
    chartOptions () {
      const {players} = this

      return {
        chart: {
          height: Math.max(300, this.players.length * 40)
        },

        title: {
          text: this.name
        },

        xAxis: {
          categories: this.players.map(player => player.name),
          labels: {
            formatter () {
              return `<span style="color: ${players[this.pos].color}">${this.value}</span>`
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
            data: this.players
          }
        ]
      }
    }
  }
}
</script>
