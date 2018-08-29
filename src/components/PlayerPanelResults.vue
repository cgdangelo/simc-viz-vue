<template>
  <PlayerPanelSection title="Results">
    <PlayerPanelResultsDirectedMetricsTable :items="outgoingMetrics"/>

    <PlayerPanelResultsDirectedMetricsTable
      :items="incomingMetrics"
      incoming
    />

    <PlayerPanelResultsTankMetricsTable
      v-if="drawTankCharts"
      :items="tankMetrics"
    />

    <PlayerPanelResultsResourcesTable :items="resourceChanges"/>
  </PlayerPanelSection>
</template>

<script>
import PlayerPanelResultsDirectedMetricsTable from './PlayerPanelResultsDirectedMetricsTable'
import PlayerPanelSection from './PlayerPanelSection'
import PlayerPanelResultsTankMetricsTable from './PlayerPanelResultsTankMetricsTable'
import PlayerPanelResultsResourcesTable from './PlayerPanelResultsResourcesTable'

export default {
  name: 'PlayerPanelResults',

  components: {
    PlayerPanelResultsResourcesTable,
    PlayerPanelResultsDirectedMetricsTable,
    PlayerPanelSection,
    PlayerPanelResultsTankMetricsTable
  },

  props: {
    drawTankCharts: {
      type: Boolean,
      default: false
    },

    incomingMetrics: {
      type: Array
    },

    outgoingMetrics: {
      type: Array
    },

    resourceChanges: {
      type: Array
    },

    tankMetrics: {
      type: Array
    }
  }
}
</script>
