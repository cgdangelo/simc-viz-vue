<template>
  <PlayerPanelSection title="Abilities">
    <PlayerPanelAbilitiesTable
      v-if="damageAbilities"
      :abilities="damageAbilities"
      :class="{ 'mb-3': healingAbilities }"
      type="damage"
    />

    <PlayerPanelAbilitiesTable
      v-if="healingAbilities"
      :abilities="healingAbilities"
      type="heal"
    />
  </PlayerPanelSection>
</template>

<script>
import PlayerPanelAbilitiesTable from './PlayerPanelAbilitiesTable'
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelAbilities',

  components: { PlayerPanelAbilitiesTable, PlayerPanelSection },

  props: {
    damageAbilities: {
      type: Array,
      default: () => []
    },

    healingAbilities: {
      type: Array,
      default: () => []
    }
  }
}
</script>
