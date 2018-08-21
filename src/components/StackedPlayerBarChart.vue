<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>

function createSortedPlayersList (players, accessor, filterEmpties = true) {
  const sortedPlayers = players.map(player => ({
    name: player.name,
    y: accessor(player)
  }))

  sortedPlayers.sort((a, b) => b.y - a.y)

  return filterEmpties ? sortedPlayers.filter(player => player.y > 0) : sortedPlayers
}

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
    },

    accessor: {
      type: Function,
      required: true
    }
  },

  computed: {
    chartOptions () {
      const sortedPlayers = createSortedPlayersList(this.players, this.accessor)

      return {
        chart: {
          height: Math.max(300, sortedPlayers.length * 25)
        },

        title: {
          text: this.name
        },

        xAxis: {
          categories: sortedPlayers.map(player => player.name)
        },

        series: [
          {
            type: 'bar',
            name: this.name,
            data: sortedPlayers
          }
        ]
      }
    }
  }
}
</script>
