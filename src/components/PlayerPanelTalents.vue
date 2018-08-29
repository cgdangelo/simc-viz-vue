<template>
  <v-expansion-panel-content>
    <span slot="header" class="title">Talents</span>

    <v-container fluid grid-list-md class="grey darken-4">
      <v-layout row>
        <v-flex>
          <v-stepper alt-labels value="-1" class="grey darken-3">
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
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'PlayerPanelTalents',

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
