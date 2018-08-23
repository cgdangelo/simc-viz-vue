<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline font-weight-bold">{{player.name}}</span>

    <v-card>
      <v-container fluid class="grey darken-4">
        <v-expansion-panel
          :value="[true, true]"
          expand
          class="elevation-4"
        >
          <v-expansion-panel-content>
            <span slot="header" class="title">Results</span>

            <v-container fluid grid-list-md class="grey darken-4">
              <v-layout row>
                <v-flex>
                  <v-data-table
                    :headers="outgoingMetricsHeaders"
                    :items="outgoingMetrics"
                    hide-actions
                    item-key="name"
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
                    :headers="incomingMetricsHeaders"
                    :items="incomingMetrics"
                    hide-actions
                    item-key="name"
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
                      item-key="name"
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
                    item-key="name"
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
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <span slot="header" class="title">Talents</span>

            <v-container fluid grid-list-md class="grey darken-4">
              <v-layout row>
                <v-flex>
                  <v-stepper alt-labels value="-1">
                    <v-stepper-header>
                      <template v-for="talent in player.talents">
                        <v-stepper-step
                          :key="talent.name"
                          :step="getTalentTierLevel(talent.tier)"
                        >
                          {{talent.name}}
                        </v-stepper-step>
                      </template>
                    </v-stepper-header>
                  </v-stepper>
                </v-flex>
              </v-layout>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-container>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import { default as _get } from 'lodash/get'
import { numberFormat } from 'highcharts'
import { getPrimaryResourceBySpecialization } from '../util'

export default {
  name: 'PlayerPanel',

  props: ['confidence', 'confidenceEstimator', 'player'],

  computed: {
    drawTankCharts () {
      return this.player.role === 'tank'
    },

    incomingMetrics () {
      return [
        {
          name: 'Per Second',
          damage: numberFormat(this.getData('dtps.mean')),
          heal: numberFormat(this.getData('dtps.mean')),
          absorb: numberFormat(this.getData('atps.mean'))
        },
        {
          name: 'Per Second, Error',
          damage: this.buildErrorString('dtps'),
          heal: this.buildErrorString('htps'),
          absorb: this.buildErrorString('atps')
        },
        {
          name: 'Per Second, Range',
          damage: this.buildRangeString('dtps'),
          heal: this.buildRangeString('htps'),
          absorb: this.buildRangeString('atps')
        }
      ]
    },

    outgoingMetrics () {
      return [
        {
          name: 'Per Second',
          damage: numberFormat(this.getData('dps.mean')),
          heal: numberFormat(this.getData('hps.mean')),
          absorb: numberFormat(this.getData('aps.mean'))
        },
        {
          name: 'Per Second, Effective',
          damage: numberFormat(this.getData('dpse.mean')),
          heal: numberFormat(this.getData('hpse.mean')),
          absorb: 'N/A'
        },
        {
          name: 'Per Second, Error',
          damage: this.buildErrorString('dps'),
          heal: this.buildErrorString('hps'),
          absorb: this.buildErrorString('aps')
        },
        {
          name: 'Per Second, Range',
          damage: this.buildRangeString('dps'),
          heal: this.buildRangeString('hps'),
          absorb: this.buildRangeString('aps')
        },
        {
          name: 'Per Resource',
          damage: this.buildMetricPerPrimaryResourceString('dmg'),
          heal: this.buildMetricPerPrimaryResourceString('heal'),
          absorb: this.buildMetricPerPrimaryResourceString('absorb')
        }
      ]
    },

    resourceChanges () {
      const resourceLost = this.getData('resource_lost', {})
      const resourceGained = this.getData('resource_gained', {})
      const resourceNames = [...new Set([...Object.keys(resourceLost), ...Object.keys(resourceGained)])]

      resourceNames.sort()

      const fightLength = this.getData('fight_length.mean')

      return resourceNames.map(resourceName => ({
        name: resourceName,
        generated: numberFormat(this.getData(`resource_gained.${resourceName}.mean`) / fightLength),
        spent: numberFormat(this.getData(`resource_lost.${resourceName}.mean`) / fightLength)
      }))
    },

    tankMetrics () {
      return [
        {
          name: 'Minimum',
          tmi: numberFormat(this.getData('theck_meloree_index.min')),
          msd: numberFormat(this.getData('max_spike_amount.min'))
        },
        {
          name: 'Maximum',
          tmi: numberFormat(this.getData('theck_meloree_index.max')),
          msd: numberFormat(this.getData('max_spike_amount.max'))
        },
        {
          name: 'Mean',
          tmi: numberFormat(this.getData('theck_meloree_index.mean')),
          msd: numberFormat(this.getData('max_spike_amount.mean'))
        },
        {
          name: 'Error',
          tmi: this.buildErrorString('theck_meloree_index'),
          msd: this.buildErrorString('max_spike_amount')
        },
        {
          name: 'Range',
          tmi: this.buildRangeString('theck_meloree_index'),
          msd: this.buildRangeString('max_spike_amount')
        }
      ]
    }
  },

  data () {
    return {
      incomingMetricsHeaders: this.getDirectedMetricsHeaders('Incoming'),
      outgoingMetricsHeaders: this.getDirectedMetricsHeaders('Outgoing'),
      resourceHeaders: [
        {text: 'Resources', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Generated', sortable: false, align: 'right'},
        {text: 'Spent', sortable: false, align: 'right'}
      ],
      tankMetricsHeaders: [
        {text: 'Tank Metrics', sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Theck-Meloree Index', sortable: false, align: 'right'},
        {text: 'Maximum Spike Damage', sortable: false, align: 'right'}
      ]
    }
  },

  methods: {
    buildErrorString (dataset) {
      const meanStdDev = this.getData(`${dataset}.mean_std_dev`)
      const mean = this.getData(`${dataset}.mean`)

      return `${numberFormat(this.confidenceEstimator * meanStdDev)} / ${numberFormat((this.confidenceEstimator * meanStdDev * 100) / mean)}%`
    },

    buildMetricPerPrimaryResourceString (dataset) {
      const primaryResourceLost = this.getData(`resource_lost.${getPrimaryResourceBySpecialization(this.player.specialization)}.mean`)

      return numberFormat(this.getData(`${dataset}.mean`) / primaryResourceLost, 2)
    },

    buildRangeString (dataset) {
      const data = this.getData(`${dataset}.data`, [])

      if (!data || data.length === 0) {
        return `0 / 0%`
      }

      const sortedData = [...data]

      sortedData.sort()

      const lower = parseInt((0.5 + this.confidence / 2) * (sortedData.length - 1))
      const upper = parseInt((0.5 - this.confidence / 2) * (sortedData.length - 1))
      const range = sortedData[lower] - sortedData[upper]

      const mean = this.getData(`${dataset}.mean`)

      return `${numberFormat(range)} / ${numberFormat(range / mean * 100)}%`
    },

    getData (path, defaultValue = 0) {
      return _get(this.player, `collected_data.${path}`, defaultValue)
    },

    getDirectedMetricsHeaders (direction) {
      return [
        {text: `${direction} Metrics`, sortable: false, class: 'subheading font-weight-bold'},
        {text: 'Damage', sortable: false, align: 'right'},
        {text: 'Heal', sortable: false, align: 'right'},
        {text: 'Absorb', sortable: false, align: 'right'}
      ]
    },

    getTalentTierLevel (tier) {
      return tier !== 7 ? tier * 15 : 100
    }
  }
}
</script>
