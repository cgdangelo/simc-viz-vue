<template>
  <v-app dark>
    <v-navigation-drawer :value="navigationDrawerOpen" app clipped>
      Navigation
    </v-navigation-drawer>

    <AppBar
      :build-level="buildLevel"
      :game-version="gameVersion"
      :simc-version="simcVersion"
      :wow-version="wowVersion"
      @toggle-navigation-drawer="toggleNavigationDrawer"
    ></AppBar>

    <v-content>
      <v-container fluid>
        <v-expansion-panel expand :value="0">
          <v-expansion-panel-content>
            <span slot="header" class="headline">Raid Summary</span>

            <v-card>
              <v-container fluid grid-list-xl>
                <v-layout row wrap>
                  <v-flex v-bind="{ [`xs${chartOptions.playersByPriorityDPS ? 6 : 12}`]: true }">
                    <highcharts :options="chartOptions.playersByDPS"></highcharts>
                  </v-flex>

                  <v-flex v-if="chartOptions.playersByPriorityDPS" xs6>
                    <highcharts :options="chartOptions.playersByPriorityDPS"></highcharts>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'
import _ from 'lodash'

function createSortedPlayersList (players, accessor, filterEmpties = true) {
  const sortedPlayers = players.map(player => ({
    name: player.name,
    y: accessor(player)
  }))

  sortedPlayers.sort((a, b) => b.y - a.y)

  return filterEmpties ? sortedPlayers.filter(player => player.y > 0) : sortedPlayers
}

function createSortedPlayersListByCollectedData (players, collectedDataGroup, collectedDataValue = 'mean', defaultValue = 0) {
  return createSortedPlayersList(players, player => _.get(player, `collected_data.${collectedDataGroup}.${collectedDataValue}`, defaultValue))
}

export default {
  name: 'App',

  components: {AppBar},

  computed: {
    chartOptions () {
      const {players} = this.$root.$data.report.sim

      const chartOptions = {}

      const playersByDPS = createSortedPlayersListByCollectedData(players, 'dps')

      chartOptions.playersByDPS = {
        chart: {
          height: Math.max(300, playersByDPS.length * 25)
        },

        title: {
          text: 'Damage Per Second'
        },

        xAxis: {
          categories: playersByDPS.map(player => player.name)
        },

        series: [
          {
            type: 'bar',
            name: 'DPS',
            data: playersByDPS
          }
        ]
      }

      if (this.$root.$data.report.sim.targets.length > 1) {
        const playersByPriorityDPS = createSortedPlayersListByCollectedData(players, 'prioritydps')

        chartOptions.playersByPriorityDPS = {
          chart: {
            height: Math.max(300, playersByPriorityDPS.length * 25)
          },

          title: {
            text: 'Priority Target Damage Per Second'
          },

          xAxis: {
            categories: playersByPriorityDPS.map(player => player.name)
          },

          series: [
            {
              type: 'bar',
              name: 'Priority DPS',
              data: playersByPriorityDPS
            }
          ]
        }
      }

      return chartOptions
    },

    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    players () { return this.$root.$data.report.sim.players },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      navigationDrawerOpen: false
    }
  },

  methods: {
    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
