<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon @click="$emit('toggle-navigation-drawer')"></v-toolbar-side-icon>

    <v-toolbar-title>
      SimulationCraft
    </v-toolbar-title>

    <v-subheader>
      {{buildInformation}}
    </v-subheader>

    <v-spacer/>

    <v-text-field
      append-icon="search"
      class="pa-0"
      color="secondary"
      label="Search"
      hide-details
      single-line
      @change="$emit('update:playerNameFilter', $event)"
    />
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppBar',

  props: {
    buildLevel: {
      type: Number,
      required: true
    },

    gameVersion: {
      type: String,
      required: true
    },

    playerNameFilter: {
      type: String,
      default: ''
    },

    simcVersion: {
      type: String,
      required: true
    },

    wowVersion: {
      type: String,
      required: true
    }
  },

  computed: {
    buildInformation () {
      return `${this.simcVersion} for ${this.gameVersion} ${this.wowVersion}.${this.buildLevel}`
    }
  }
}
</script>
