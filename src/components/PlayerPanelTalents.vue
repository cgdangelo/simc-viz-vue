<template>
  <PlayerPanelSection title="Talents">
    <v-flex>
      <v-stepper
        alt-labels
        value="-1"
        class="grey darken-3"
      >
        <v-stepper-header>
          <template v-for="talent in talents">
            <v-stepper-step
              :key="talent.name"
              :step="talent.tier"
            >
              {{talent.name}}
            </v-stepper-step>
          </template>
        </v-stepper-header>
      </v-stepper>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelTalents',

  components: {PlayerPanelSection},

  props: {
    talents: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>
