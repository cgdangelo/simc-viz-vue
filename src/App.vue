<template>
  <v-app dark>
    <v-navigation-drawer :value="navigationDrawerOpen" app clipped>
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
        <v-expansion-panel :value="0">
          <v-expansion-panel-content>
            <span slot="header" class="headline">Raid Summary</span>

            <v-card>
              Hello
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar'

export default {
  name: 'App',

  components: {AppBar},

  computed: {
    buildLevel () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].build_level },
    gameVersion () { return this.$root.$data.report.sim.options.dbc.version_used },
    players () { return this.$root.$data.report.sim.players },
    simcVersion () { return this.$root.$data.report.version },
    wowVersion () { return this.$root.$data.report.sim.options.dbc[this.gameVersion].wow_version }
  },

  data () {
    return {
      navigationDrawerOpen: false
    }
  },

  methods: {
    toggleNavigationDrawer () {
      this.navigationDrawerOpen = !this.navigationDrawerOpen
    }
  }
}
</script>
