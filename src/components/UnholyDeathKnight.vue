<template>
  <PlayerPanel
    :confidence="confidence"
    :confidence-estimator="confidenceEstimator"
    :player="player"
  >
    <PlayerPanelSection
      slot="custom-section"
      title="Rune Waste"
    >
      <v-flex>
        Custom rune waste section.
      </v-flex>
    </PlayerPanelSection>

    <PlayerPanelSection
      slot="custom-section"
      title="Bench Temperature"
    >
      <v-flex>
        Visualize temperature changes of bench surface over time.
      </v-flex>
    </PlayerPanelSection>
  </PlayerPanel>
</template>

<script>
import PlayerPanel from './PlayerPanel'
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'UnholyDeathKnight',

  components: { PlayerPanelSection, PlayerPanel },

  extends: PlayerPanel
}
</script>
