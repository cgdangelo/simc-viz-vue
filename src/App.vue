<template>
  <v-app dark>
    <v-navigation-drawer v-model="navigationDrawerOpen" app clipped>
      Navigation
    </v-navigation-drawer>

    <AppBar
      :build-level="buildLevel"
      :game-version="gameVersion"
      :simc-version="simcVersion"
      :wow-version="wowVersion"
      @toggle-navigation-drawer="toggleNavigationDrawer"
    ></AppBar>

    <v-content>
      <v-container fluid>
        Content
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'

export default {
  name: 'App',

  components: {AppBar},

  methods: {
    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  },

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      navigationDrawerOpen: false
    }
  }
}
</script>
