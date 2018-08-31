<template>
  <v-expansion-panel-content>
    <span
      slot="header"
      class="headline font-weight-bold"
    >
      Raid Summary
    </span>

    <v-card>
      <v-container
        fluid
        grid-list-md
        class="grey darken-4"
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            v-bind="{ [`xs${drawPriorityDpsChart ? 6 : 12}`]: true }"
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByDps"
              name="Damage Per Second"
            />
          </v-flex>

          <v-flex
            xs6
            class="mb-3"
          >
            <StackedPlayerBarChart
              v-if="drawPriorityDpsChart"
              :data="playersByPriorityDps"
              name="Priority Target Damage Per Second"
            />
          </v-flex>

          <v-flex
            xs4
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByDtps"
              name="Damage Taken Per Second"
            />
          </v-flex>

          <v-flex
            xs4
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByHaps"
              name="Heal & Absorb Per Second"
            />
          </v-flex>

          <v-flex
            xs4
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByTmi"
              name="Theck-Meloree Index"
            />
          </v-flex>

          <v-flex
            xs6
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByApm"
              name="Actions Per Minute"
            />
          </v-flex>

          <v-flex
            xs6
            class="mb-3"
          >
            <StackedPlayerBarChart
              :data="playersByDpsVariance"
              name="DPS Variance"
            />
          </v-flex>

          <v-flex>
            <RaidEvents
              :events="raidEvents"
              :max-time="maxTime"
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import RaidEvents from './RaidEvents'
import StackedPlayerBarChart from './StackedBarChart'

export default {
  name: 'RaidSummary',

  components: { RaidEvents, StackedPlayerBarChart },

  props: {
    maxTime: {
      type: Number,
      required: true
    },

    playersByApm: {
      type: Array,
      required: true
    },

    playersByDps: {
      type: Array,
      required: true
    },

    playersByDpsVariance: {
      type: Array,
      required: true
    },

    playersByDtps: {
      type: Array,
      required: true
    },

    playersByHaps: {
      type: Array,
      required: true
    },

    playersByPriorityDps: {
      type: Array,
      required: true
    },

    playersByTmi: {
      type: Array,
      required: true
    }
  },

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
