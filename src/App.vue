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
      :player-name-filter.sync="playerNameFilter"
      @toggle-navigation-drawer="toggleNavigationDrawer"
    >
    </AppBar>

    <v-content>
      <v-container fluid>
        <v-expansion-panel expand>
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
    players () { return this.$root.$data.report.sim.players },
    playersByApm () { return createSortedPlayersList(this.players, playersByAPMAccessor).filter(this.showPlayer) },
    playersByDps () { return createSortedPlayersList(this.players, playersByDPSAccessor).filter(this.showPlayer) },
    playersByDpsVariance () { return createSortedPlayersList(this.players, playersByDPSVarianceAccessor).filter(this.showPlayer) },
    playersByDtps () { return createSortedPlayersList(this.players, playersByDTPSAccessor).filter(this.showPlayer) },
    playersByHaps () { return createSortedPlayersList(this.players, playersByHAPSAccessor).filter(this.showPlayer) },
    playersByPriorityDps () { return createSortedPlayersList(this.players, playersByPriorityDPSAccessor).filter(this.showPlayer) },
    playersByTmi () { return createSortedPlayersList(this.players, playersByTMIAccessor).filter(this.showPlayer) },
    raidEvents () { return this.$root.$data.report.sim.raid_events },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      navigationDrawerOpen: false,
      playerNameFilter: ''
    }
  },

  methods: {
    getSpecializationData,

    showPlayer (player) {
      if (this.playerNameFilter.length === 0) {
        return true
      }

      try {
        const regexp = new RegExp(this.playerNameFilter.toLocaleLowerCase())

        return regexp.test(player.name.toLocaleLowerCase())
      } catch (e) {
        return false
      }
    },

    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
