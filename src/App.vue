<template>
  <v-app dark>
    <v-navigation-drawer app clipped v-model="navigationDrawerOpen">
      Navigation
    </v-navigation-drawer>

    <v-toolbar app clipped-left>
      <v-toolbar-side-icon @click="toggleNavigationDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>SimulationCraft</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        Content
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

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
