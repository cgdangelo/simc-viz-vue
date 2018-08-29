<template>
  <v-expansion-panel-content>
    <span slot="header" class="title">Results</span>

    <v-container fluid grid-list-md class="grey darken-4">
      <v-layout row>
        <slot></slot>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'PlayerPanelSection',

  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
