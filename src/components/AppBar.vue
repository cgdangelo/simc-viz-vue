<template>
  <v-toolbar
    app
    clipped-left
  >
    <v-toolbar-side-icon @click="$emit('toggle-navigation-drawer')"/>

    <v-toolbar-title>
      SimulationCraft
    </v-toolbar-title>

    <v-subheader>
      {{buildInformation}}
    </v-subheader>

    <v-spacer/>

    <v-flex xs4>
      <v-text-field
        append-icon="search"
        class="pa-0"
        color="secondary"
        :error-messages="regexError"
        label="Search"
        :hide-details="regexError.length === 0"
        prefix="/"
        single-line
        :success="playerNameFilter.length > 0 && regexError.length === 0"
        suffix="/"
        @change="$emit('update:playerNameFilter', $event)"
      />
    </v-flex>
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
    },

    regexError () {
      try {
        RegExp(this.playerNameFilter)

        return ''
      } catch (e) {
        return e.message
      }
    }
  }
}
</script>
