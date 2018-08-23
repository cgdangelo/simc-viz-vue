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
      @toggle-navigation-drawer="toggleNavigationDrawer">
    </AppBar>

    <v-content>
      <v-container fluid>
        <v-expansion-panel expand :value="0">
          <v-expansion-panel-content>
            <span slot="header" class="headline">Raid Summary</span>

            <v-card>
              <v-container fluid grid-list-xl>
                <v-layout row>
                  <v-flex v-bind="{ [`xs${drawPriorityDPSChart ? 6 : 12}`]: true }">
                    <StackedPlayerBarChart
                      name="Damage Per Second"
                      :players="playersByDPS">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs6>
                    <StackedPlayerBarChart
                      v-if="drawPriorityDPSChart"
                      name="Priority Target Damage Per Second"
                      :players="playersByPriorityDPS">
                    </StackedPlayerBarChart>
                  </v-flex>
                </v-layout>

                <v-layout v-if="drawTankCharts" row>
                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Damage Taken Per Second"
                      :players="playersByDTPS">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Heal & Absorb Per Second"
                      :players="playersByHAPS">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Theck-Meloree Index"
                      :players="playersByTMI">
                    </StackedPlayerBarChart>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs6>
                    <StackedPlayerBarChart
                      name="Actions Per Minute"
                      :players="playersByAPM">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs6>
                    <StackedPlayerBarChart
                      name="DPS Variance"
                      :players="playersByDPSVariance">
                    </StackedPlayerBarChart>
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
import StackedPlayerBarChart from './components/StackedPlayerBarChart'

function createSortedPlayersList (players, accessor, filterEmpties = true) {
  const sortedPlayers = players.map(player => ({
    name: player.name,
    y: accessor(player)
  }))

  sortedPlayers.sort((a, b) => b.y - a.y)

  return filterEmpties ? sortedPlayers.filter(player => player.y > 0) : sortedPlayers
}

function createCollectedDataAccessor (collectedDataGroup, collectedDataValue = 'mean', defaultValue = 0) {
  return (player) => _.get(player, `collected_data.${collectedDataGroup}.${collectedDataValue}`, defaultValue)
}

const playersByAPMAccessor = player => createCollectedDataAccessor('executed_foreground_actions')(player) / createCollectedDataAccessor('fight_length')(player) * 60
const playersByDPSAccessor = createCollectedDataAccessor('dps')
const playersByDPSVarianceAccessor = player => createCollectedDataAccessor('dps', 'std_dev')(player) / createCollectedDataAccessor('dps')(player) * 100
const playersByDTPSAccessor = createCollectedDataAccessor('dtps')
const playersByHAPSAccessor = player => createCollectedDataAccessor('hps')(player) + createCollectedDataAccessor('aps')(player)
const playersByPriorityDPSAccessor = createCollectedDataAccessor('prioritydps')
const playersByTMIAccessor = createCollectedDataAccessor('theck_meloree_index')

export default {
  name: 'App',

  components: {StackedPlayerBarChart, AppBar},

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    drawPriorityDPSChart () { return this.$root.$data.report.sim.targets.length > 1 },
    drawTankCharts () { return this.players.some(player => player.role === 'tank') },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    players () { return this.$root.$data.report.sim.players },

    playersByAPM () { return createSortedPlayersList(this.players, playersByAPMAccessor) },
    playersByDPS () { return createSortedPlayersList(this.players, playersByDPSAccessor) },
    playersByDPSVariance () { return createSortedPlayersList(this.players, playersByDPSVarianceAccessor) },
    playersByDTPS () { return createSortedPlayersList(this.players, playersByDTPSAccessor) },
    playersByHAPS () { return createSortedPlayersList(this.players, playersByHAPSAccessor) },
    playersByPriorityDPS () { return createSortedPlayersList(this.players, playersByPriorityDPSAccessor) },
    playersByTMI () { return createSortedPlayersList(this.players, playersByTMIAccessor) },

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
