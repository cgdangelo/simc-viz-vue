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
        <v-toolbar class="mb-4">
          <v-switch
            v-for="classSwitch in classSwitches"
            :key="classSwitch.value"
            v-model="enabledClasses"
            :color="getSpecializationData(`${classSwitch.specPrefix} ${classSwitch.value}`).color"
            :label="classSwitch.value"
            :value="classSwitch.value.toLocaleLowerCase()"
            hide-details
          />

          <v-text-field
            v-model="playersFilter"
            append-icon="search"
            label="Search"
            hide-details
            single-line
            class="pa-0"
          />
        </v-toolbar>

        <v-expansion-panel expand :value="[false, true, true, true, true]">
          <RaidSummary
            :max-time="maxTime"
            :players-by-apm="playersByApm"
            :players-by-dps="playersByDps"
            :players-by-dps-variance="playersByDpsVariance"
            :players-by-dtps="playersByDtps"
            :players-by-haps="playersByHaps"
            :players-by-priority-dps="playersByPriorityDps"
            :players-by-tmi="playersByTmi"
            :raid-events="raidEvents"
          >
          </RaidSummary>

          <PlayerPanel
            v-for="player in players"
            :key="player.name"
            v-show="showPlayer(player)"
            :player="player"
            :confidence="confidence"
            :confidence-estimator="confidenceEstimator"
          />
        </v-expansion-panel>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import _ from 'lodash'
import AppBar from './components/AppBar'
import PlayerPanel from './components/PlayerPanel'
import RaidSummary from './components/RaidSummary'
import StackedPlayerBarChart from './components/StackedBarChart'
import { getSpecializationData } from './util'

function createSortedPlayersList (players, accessor, filterEmpties = true) {
  const sortedPlayers = players.map(player => ({
    color: getSpecializationData(player.specialization).color,
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

  components: { PlayerPanel, RaidSummary, StackedPlayerBarChart, AppBar },

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    confidence () { return this.$root.$data.report.sim.options.confidence },
    confidenceEstimator () { return this.$root.$data.report.sim.options.confidence_estimator },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    maxTime () { return this.$root.$data.report.sim.options.max_time },
    players () { return this.$root.$data.report.sim.players.slice(0, 5) },
    playersByApm () { return createSortedPlayersList(this.players, playersByAPMAccessor) },
    playersByDps () { return createSortedPlayersList(this.players, playersByDPSAccessor) },
    playersByDpsVariance () { return createSortedPlayersList(this.players, playersByDPSVarianceAccessor) },
    playersByDtps () { return createSortedPlayersList(this.players, playersByDTPSAccessor) },
    playersByHaps () { return createSortedPlayersList(this.players, playersByHAPSAccessor) },
    playersByPriorityDps () { return createSortedPlayersList(this.players, playersByPriorityDPSAccessor) },
    playersByTmi () { return createSortedPlayersList(this.players, playersByTMIAccessor) },
    raidEvents () { return this.$root.$data.report.sim.raid_events },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    const classSwitches = [
      { value: 'Death Knight', specPrefix: 'frost' },
      { value: 'Demon Hunter', specPrefix: 'havoc' },
      { value: 'Druid', specPrefix: 'balance' }
    ]

    return {
      classSwitches,
      enabledClasses: classSwitches.map(classSwitch => classSwitch.value.toLocaleLowerCase()),
      navigationDrawerOpen: false,
      playersFilter: ''
    }
  },

  methods: {
    getClass (player) {
      const matches = player.specialization.toLocaleLowerCase().match(/(death knight|demon hunter)$/g)

      return matches ? matches[0] : null
    },

    getSpecializationData,

    showPlayer (player) {
      return (this.playersFilter.length === 0 || player.name.toLocaleLowerCase().indexOf(this.playersFilter.toLocaleLowerCase()) !== -1) &&
        (this.enabledClasses.length === 0 || this.enabledClasses.indexOf(this.getClass(player)) !== -1)
    },

    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
