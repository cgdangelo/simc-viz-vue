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
      required: false,
      default: () => {}
    },

    damageSourcesChart: {
      type: Object,
      required: false,
      default: () => {}
    },

    dpsTimelineChart: {
      type: Object,
      required: false,
      default: () => {}
    },

    dtpsTimelineChart: {
      type: Object,
      required: false,
      default: () => {}
    },

    healingSourcesChart: {
      type: Object,
      required: false,
      default: () => {}
    },

    htpsTimelineChart: {
      type: Object,
      required: false,
      default: () => {}
    },

    spentTimeChart: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
