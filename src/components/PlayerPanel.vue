<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline">{{player.name}}</span>

    <v-card>
      <v-container fluid grid-list-md class="grey darken-4">
        <v-layout row wrap>
          <v-flex>
            <v-data-table
              :headers="metricsHeaders"
              :items="outgoingMetrics"
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

          <v-flex>
            <v-data-table
              :headers="metricsHeaders"
              :items="outgoingMetrics"
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

          <template v-if="drawTankCharts">
            <v-flex>
              <v-data-table
                :headers="tankMetricsHeaders"
                :items="tankMetrics"
                hide-actions
                class="metrics-table"
              >
                <template slot="items" slot-scope="{ item }">
                  <td>{{item.name}}</td>
                  <td class="text-xs-right">{{item.tmi}}</td>
                  <td class="text-xs-right">{{item.msd}}</td>
                </template>
              </v-data-table>
            </v-flex>
          </template>

          <v-flex>
            <v-data-table
              :headers="resourceHeaders"
              :items="resourceChanges"
              hide-actions
              class="metrics-table"
            >
              <template slot="items" slot-scope="{ item }">
                <td>{{item.name}}</td>
                <td class="text-xs-right">{{item.generated}}</td>
                <td class="text-xs-right">{{item.spent}}</td>
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

  computed: {
    drawTankCharts () {
      return this.player.role === 'tank'
    },

    outgoingMetrics () {
      return [
        {name: 'Per Second', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Effective', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Error', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Second, Range', damage: 100, heal: 200, absorb: 300},
        {name: 'Per Resource', damage: 100, heal: 200, absorb: 300}
      ]
    },

    resourceChanges () {
      return [
        {name: 'Mana', generated: 100, spent: 200},
        {name: 'Insanity', generated: 100, spent: 200},
        {name: 'Patience', generated: 100, spent: 200}
      ]
    },

    resourceHeaders () {
      return [
        {text: 'Resources', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Generated', sortable: false, align: 'right'},
        {text: 'Spent', sortable: false, align: 'right'}
      ]
    },

    tankMetrics () {
      return [
        {name: 'Minimum', tmi: 100, msd: 200},
        {name: 'Maximum', tmi: 100, msd: 200},
        {name: 'Mean', tmi: 100, msd: 200},
        {name: 'Error', tmi: 100, msd: 200},
        {name: 'Range', tmi: 100, msd: 200}
      ]
    }
  },

  data () {
    return {
      metricsHeaders: [
        {text: 'Outgoing Metrics', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Damage', sortable: false, align: 'right'},
        {text: 'Heal', sortable: false, align: 'right'},
        {text: 'Absorb', sortable: false, align: 'right'}
      ],

      tankMetricsHeaders: [
        {text: 'Tank Metrics', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Theck-Meloree Index', sortable: false, align: 'right'},
        {text: 'Maximum Spike Damage', sortable: false, align: 'right'}
      ]
    }
  }
}
</script>
