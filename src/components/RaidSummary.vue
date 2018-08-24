<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline font-weight-bold">Raid Summary</span>

    <v-card>
      <v-container fluid grid-list-md class="grey darken-4">
        <v-layout row wrap>
          <v-flex v-bind="{ [`xs${drawPriorityDpsChart ? 6 : 12}`]: true }" class="mb-3">
            <StackedPlayerBarChart
              name="Damage Per Second"
              :data="playersByDps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <StackedPlayerBarChart
              v-if="drawPriorityDpsChart"
              name="Priority Target Damage Per Second"
              :data="playersByPriorityDps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs4 class="mb-3">
            <StackedPlayerBarChart
              name="Damage Taken Per Second"
              :data="playersByDtps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs4 class="mb-3">
            <StackedPlayerBarChart
              name="Heal & Absorb Per Second"
              :data="playersByHaps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs4 class="mb-3">
            <StackedPlayerBarChart
              name="Theck-Meloree Index"
              :data="playersByTmi"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <StackedPlayerBarChart
              name="Actions Per Minute"
              :data="playersByApm"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs6 class="mb-3">
            <StackedPlayerBarChart
              name="DPS Variance"
              :data="playersByDpsVariance"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex>
            <RaidEvents
              :events="raidEvents"
              :max-time="maxTime"
            >
            </RaidEvents>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import StackedPlayerBarChart from './StackedBarChart'
import RaidEvents from './RaidEvents'

export default {
  name: 'RaidSummary',

  components: {RaidEvents, StackedPlayerBarChart},

  props: [
    'maxTime',
    'playersByDps',
    'playersByPriorityDps',
    'playersByDtps',
    'playersByHaps',
    'playersByTmi',
    'playersByApm',
    'playersByDpsVariance',
    'raidEvents'
  ],

  computed: {
    drawPriorityDpsChart () {
      return this.playersByPriorityDps.length > 0
    },

    drawTankCharts () {
      return this.playersByDtps.length + this.playersByHaps.length + this.playersByTmi.length > 0
    }
  }
}
</script>
