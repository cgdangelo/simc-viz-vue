<template>
  <PlayerPanelSection title="Charts">
    <v-flex xs6>
      <StackedBarChart
        :data="actionsByApet"
        name="Damage Per Execute Time"
      />
    </v-flex>

    <v-flex xs6>
      <highcharts :options="spentTimeChart"/>
    </v-flex>

    <v-flex xs6>
      <v-layout column>
        <v-flex v-if="damageSourcesChart">
          <highcharts :options="damageSourcesChart"/>
        </v-flex>

        <v-flex v-if="healingSourcesChart">
          <highcharts :options="healingSourcesChart"/>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs6>
      <v-layout column>
        <v-flex v-if="dpsTimelineChart">
          <highcharts :options="dpsTimelineChart"/>
        </v-flex>

        <v-flex v-if="htpsTimelineChart">
          <highcharts :options="htpsTimelineChart"/>
        </v-flex>

        <v-flex v-if="dtpsTimelineChart">
          <highcharts :options="dtpsTimelineChart"/>
        </v-flex>
      </v-layout>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import PlayerPanelSection from './PlayerPanelSection'
import StackedBarChart from './StackedBarChart'

export default {
  name: 'PlayerPanelCharts',

  components: { PlayerPanelSection, StackedBarChart },

  props: {
    actionsByApet: {
      type: Array,
      required: true
    },

    spentTimeChart: {
      type: Object,
      required: true
    },

    damageSourcesChart: {
      type: Object,
      required: true
    },

    healingSourcesChart: {
      type: Object,
      required: true
    },

    dpsTimelineChart: {
      type: Object,
      required: true
    },

    htpsTimelineChart: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
