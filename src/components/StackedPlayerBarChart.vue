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
      return {
        chart: {
          height: Math.max(300, this.players.length * 25)
        },

        title: {
          text: this.name
        },

        xAxis: {
          categories: this.players.map(player => player.name)
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
