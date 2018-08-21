<template>
  <v-toolbar app clipped-left>
    <v-toolbar-side-icon @click="$emit('toggle-navigation-drawer')"></v-toolbar-side-icon>

    <v-toolbar-title>
      SimulationCraft
    </v-toolbar-title>

    <v-subheader>
      Build Information
    </v-subheader>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppBar'
}
</script>
