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
    >
    </AppBar>

    <v-content>
      <v-container fluid>
        <v-expansion-panel expand :value="[false, true, true, true, true]">
          <RaidSummary
            :players-by-apm="playersByApm"
            :players-by-dps="playersByDps"
            :players-by-dps-variance="playersByDpsVariance"
            :players-by-dtps="playersByDtps"
            :players-by-haps="playersByHaps"
            :players-by-priority-dps="playersByPriorityDps"
            :players-by-tmi="playersByTmi"
          >
          </RaidSummary>

          <v-expansion-panel-content v-for="player in players" :key="player.name">
            <span slot="header" class="headline">{{player.name}}</span>

            <v-card>
              <v-container fluid grid-list-md class="grey darken-4">
                <v-layout row>
                  <v-flex xs6>
                    <v-data-table
                      :headers="metricsHeaders"
                      :items="getOutgoingMetrics(player)"
                      hide-actions
                    >
                      <template slot="items" slot-scope="{ item }">
                        <td>{{item.name}}</td>
                        <td class="text-xs-right">{{item.damage}}</td>
                        <td class="text-xs-right">{{item.heal}}</td>
                        <td class="text-xs-right">{{item.absorb}}</td>
                      </template>
                    </v-data-table>
                  </v-flex>

                  <v-flex xs6>
                    <v-data-table
                      :headers="metricsHeaders"
                      :items="getOutgoingMetrics(player)"
                      hide-actions
                      class="metrics-table"
                    >
                      <template slot="items" slot-scope="{ item }">
                        <td>{{item.name}}</td>
                        <td class="text-xs-right">{{item.damage}}</td>
                        <td class="text-xs-right">{{item.heal}}</td>
                        <td class="text-xs-right">{{item.absorb}}</td>
                      </template>
                    </v-data-table>
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
import RaidSummary from './components/RaidSummary'

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

  components: {RaidSummary, StackedPlayerBarChart, AppBar},

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    players () { return this.$root.$data.report.sim.players },
    playersByApm () { return createSortedPlayersList(this.players, playersByAPMAccessor) },
    playersByDps () { return createSortedPlayersList(this.players, playersByDPSAccessor) },
    playersByDpsVariance () { return createSortedPlayersList(this.players, playersByDPSVarianceAccessor) },
    playersByDtps () { return createSortedPlayersList(this.players, playersByDTPSAccessor) },
    playersByHaps () { return createSortedPlayersList(this.players, playersByHAPSAccessor) },
    playersByPriorityDps () { return createSortedPlayersList(this.players, playersByPriorityDPSAccessor) },
    playersByTmi () { return createSortedPlayersList(this.players, playersByTMIAccessor) },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      metricsHeaders: [
        {text: 'Outgoing Metrics', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Damage', sortable: false, align: 'right'},
        {text: 'Heal', sortable: false, align: 'right'},
        {text: 'Absorb', sortable: false, align: 'right'}
      ],
      navigationDrawerOpen: false
    }
  },

  methods: {
    getOutgoingMetrics (player) {
      return [
        {name: 'Per Second', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Effective', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Error', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Range', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Resource', damage: 100, heal: 200, absorb: 300}
      ]
    },

    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
