<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline font-weight-bold">Raid Summary</span>

    <v-card>
      <v-container fluid grid-list-xl>
        <v-layout row>
          <v-flex v-bind="{ [`xs${drawPriorityDpsChart ? 6 : 12}`]: true }">
            <StackedPlayerBarChart
              name="Damage Per Second"
              :players="playersByDps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs6>
            <StackedPlayerBarChart
              v-if="drawPriorityDpsChart"
              name="Priority Target Damage Per Second"
              :players="playersByPriorityDps"
            >
            </StackedPlayerBarChart>
          </v-flex>
        </v-layout>

        <v-layout v-if="drawTankCharts" row>
          <v-flex xs4>
            <StackedPlayerBarChart
              name="Damage Taken Per Second"
              :players="playersByDtps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs4>
            <StackedPlayerBarChart
              name="Heal & Absorb Per Second"
              :players="playersByHaps"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs4>
            <StackedPlayerBarChart
              name="Theck-Meloree Index"
              :players="playersByTmi"
            >
            </StackedPlayerBarChart>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs6>
            <StackedPlayerBarChart
              name="Actions Per Minute"
              :players="playersByApm"
            >
            </StackedPlayerBarChart>
          </v-flex>

          <v-flex xs6>
            <StackedPlayerBarChart
              name="DPS Variance"
              :players="playersByDpsVariance"
            >
            </StackedPlayerBarChart>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import StackedPlayerBarChart from './StackedPlayerBarChart'

export default {
  name: 'RaidSummary',

  components: {StackedPlayerBarChart},

  props: ['playersByDps', 'playersByPriorityDps', 'playersByDtps', 'playersByHaps', 'playersByTmi', 'playersByApm', 'playersByDpsVariance'],

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
