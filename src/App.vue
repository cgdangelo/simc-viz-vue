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
                      :players="players"
                      :accessor="playersByDPSAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs6>
                    <StackedPlayerBarChart
                      v-if="drawPriorityDPSChart"
                      name="Priority Target Damage Per Second"
                      :players="players"
                      :accessor="playersByPriorityDPSAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>
                </v-layout>

                <v-layout v-if="drawTankCharts" row>
                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Damage Taken Per Second"
                      :players="players"
                      :accessor="playersByDTPSAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Heal & Absorb Per Second"
                      :players="players"
                      :accessor="playersByHAPSAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs4>
                    <StackedPlayerBarChart
                      name="Theck-Meloree Index"
                      :players="players"
                      :accessor="playersByTMIAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <span slot="header" class="headline">APM / DPS Variance</span>

            <v-card>
              <v-container fluid>
                <v-layout row>
                  <v-flex xs6>
                    <StackedPlayerBarChart
                      name="Actions Per Minute"
                      :players="players"
                      :accessor="playersByAPMAccessor">
                    </StackedPlayerBarChart>
                  </v-flex>

                  <v-flex xs6>
                    <StackedPlayerBarChart
                      name="DPS Variance"
                      :players="players"
                      :accessor="playersByDPSVarianceAccessor">
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

function createCollectedDataAccessor (collectedDataGroup, collectedDataValue = 'mean', defaultValue = 0) {
  return (player) => _.get(player, `collected_data.${collectedDataGroup}.${collectedDataValue}`, defaultValue)
}

export default {
  name: 'App',

  components: {StackedPlayerBarChart, AppBar},

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    drawPriorityDPSChart () { return this.$root.$data.report.sim.targets.length > 1 },
    drawTankCharts () { return this.players.some(player => player.role === 'tank') },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    players () { return this.$root.$data.report.sim.players },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      navigationDrawerOpen: false,
      playersByAPMAccessor: player => createCollectedDataAccessor('executed_foreground_actions')(player) / createCollectedDataAccessor('fight_length')(player) * 60,
      playersByDPSAccessor: createCollectedDataAccessor('dps'),
      playersByDPSVarianceAccessor: player => createCollectedDataAccessor('dps', 'std_dev')(player) / createCollectedDataAccessor('dps')(player) * 100,
      playersByDTPSAccessor: createCollectedDataAccessor('dtps'),
      playersByHAPSAccessor: player => createCollectedDataAccessor('hps')(player) + createCollectedDataAccessor('aps')(player),
      playersByPriorityDPSAccessor: createCollectedDataAccessor('prioritydps'),
      playersByTMIAccessor: createCollectedDataAccessor('theck_meloree_index')
    }
  },

  methods: {
    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
