<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline">{{player.name}}</span>

    <v-card>
      <v-container fluid grid-list-md class="grey darken-4">
        <v-layout row>
          <v-flex xs6>
            <v-data-table
              :headers="metricsHeaders"
              :items="getOutgoingMetrics(player)"
              hide-actions
            >
              <template slot="items" slot-scope="{ item }">
                <td>{{item.name}}</td>
                <td class="text-xs-right">{{item.damage}}</td>
                <td class="text-xs-right">{{item.heal}}</td>
                <td class="text-xs-right">{{item.absorb}}</td>
              </template>
            </v-data-table>
          </v-flex>

          <v-flex xs6>
            <v-data-table
              :headers="metricsHeaders"
              :items="getOutgoingMetrics(player)"
              hide-actions
              class="metrics-table"
            >
              <template slot="items" slot-scope="{ item }">
                <td>{{item.name}}</td>
                <td class="text-xs-right">{{item.damage}}</td>
                <td class="text-xs-right">{{item.heal}}</td>
                <td class="text-xs-right">{{item.absorb}}</td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
export default {
  name: 'PlayerPanel',

  props: ['player'],

  data () {
    return {
      metricsHeaders: [
        {text: 'Outgoing Metrics', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Damage', sortable: false, align: 'right'},
        {text: 'Heal', sortable: false, align: 'right'},
        {text: 'Absorb', sortable: false, align: 'right'}
      ]
    }
  },

  methods: {
    getOutgoingMetrics (player) {
      return [
        {name: 'Per Second', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Effective', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Error', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Range', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Resource', damage: 100, heal: 200, absorb: 300}
      ]
    }
  }
}
</script>
