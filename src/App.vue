<template>
  <v-app dark>
    <v-navigation-drawer app clipped v-model="navigationDrawerOpen">
      Navigation
    </v-navigation-drawer>

    <AppBar @toggle-navigation-drawer="toggleNavigationDrawer"></AppBar>

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

  data () {
    return {
      navigationDrawerOpen: false
    }
  }
}
</script>
