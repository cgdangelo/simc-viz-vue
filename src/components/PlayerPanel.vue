<template>
  <v-expansion-panel-content>
    <span slot="header" class="headline font-weight-bold">{{player.name}}</span>

    <v-card>
      <v-container fluid class="grey darken-4">
        <v-expansion-panel
          :value="[true, true, true]"
          expand
          class="elevation-8"
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
                      <td class="text--secondary">{{item.name}}</td>
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
                      <td class="text--secondary">{{item.name}}</td>
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
                        <td class="text--secondary">{{item.name}}</td>
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
                      <td class="text--secondary">{{item.name}}</td>
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
                  <v-stepper alt-labels value="-1" class="grey darken-3">
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

          <v-expansion-panel-content>
            <span slot="header" class="title">Charts</span>

            <v-container fluid grid-list-md class="grey darken-4">
              <v-layout row>
                <v-flex xs6>
                  <v-layout column>
                    <v-flex>
                      <StackedBarChart
                        name="Damage Per Execute Time"
                        :data="actionsByApet"
                      >
                      </StackedBarChart>
                    </v-flex>

                    <v-flex v-if="damageSourcesChart">
                      <highcharts :options="damageSourcesChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="healingSourcesChart">
                      <highcharts :options="healingSourcesChart"></highcharts>
                    </v-flex>

                    <v-flex>
                      <highcharts :options="spentTimeChart"></highcharts>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs6>
                  <v-layout column>
                    <v-flex v-if="dpsTimelineChart">
                      <highcharts :options="dpsTimelineChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="dtpsTimelineChart">
                      <highcharts :options="dtpsTimelineChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="htpsTimelineChart">
                      <highcharts :options="htpsTimelineChart"></highcharts>
                    </v-flex>
                  </v-layout>
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
import * as Color from 'color'
import * as sma from 'sma'
import { default as _get } from 'lodash/get'
import { default as _capitalize } from 'lodash/capitalize'
import { numberFormat } from 'highcharts'
import { getColorByResource, getColorBySchool, getSpecializationData } from '../util'
import StackedBarChart from './StackedBarChart'

export default {
  name: 'PlayerPanel',
  components: {StackedBarChart},
  props: ['confidence', 'confidenceEstimator', 'player'],

  computed: {
    actionsByApet () {
      const actionsByApet = this.player.stats.filter(action => !action.pet && action.apet > 0)

      actionsByApet.sort((a, b) => b.apet - a.apet)

      return actionsByApet.map(action => ({
        color: getColorBySchool(action.school),
        name: action.name,
        y: action.apet
      }))
    },

    damageSourcesChart () {
      return this.getMetricSourceChart('damage')
    },

    dpsHistogramChart () {
      return this.getMetricHistogramChart('dps')
    },

    dpsTimelineChart () {
      return this.getTimelineChart(
        'Damage Per Second',
        this.getData('timeline_dmg.data', []),
        this.getData('dps.mean'),
        getSpecializationData(this.player.specialization).color
      )
    },

    dtpsTimelineChart () {
      return this.getTimelineChart(
        'Damage Taken Per Second',
        this.getData('timeline_dmg_taken.data', []),
        this.getData('dtps.mean'),
        getColorByResource('health')
      )
    },

    drawTankCharts () {
      return this.player.role === 'tank'
    },

    healingSourcesChart () {
      return this.getMetricSourceChart('heal')
    },

    htpsTimelineChart () {
      return this.getTimelineChart(
        'Healing Taken Per Second',
        this.getData('timeline_healing_taken.data', []),
        this.getData('htps.mean'),
        getColorByResource('health')
      )
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
      const resourceNames = [
        ...new Set([
          ...Object.keys(resourceLost),
          ...Object.keys(resourceGained)
        ])
      ]

      resourceNames.sort()

      const fightLength = this.getData('fight_length.mean')

      return resourceNames.map(resourceName => ({
        name: resourceName,
        generated: numberFormat(this.getData(`resource_gained.${resourceName}.mean`) / fightLength),
        spent: numberFormat(this.getData(`resource_lost.${resourceName}.mean`) / fightLength)
      }))
    },

    spentTimeChart () {
      const spentTime = this.player.stats
        .filter(action => !action.background && !action.quiet && !action.pet && action.total_time > 0)
        .map(action => ({
          color: getColorBySchool(action.school),
          name: action.name,
          y: action.total_time
        }))

      spentTime.push({
        color: '#fff',
        name: 'Waiting',
        y: this.getData('waiting_time.mean')
      })

      return {
        title: {
          text: 'Spent Time'
        },
        series: [
          {
            data: spentTime,
            dataLabels: {
              formatter () {
                return `<span style="color: ${this.point.color}">${this.point.name}</span><br />${numberFormat(
                  this.point.y)}s`
              }
            },
            name: 'Spent Time',
            type: 'pie'
          }
        ]
      }
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
        {text: 'Resources', sortable: false, class: 'subheading text--primary font-weight-bold'},
        {text: 'Generated', sortable: false, align: 'right'},
        {text: 'Spent', sortable: false, align: 'right'}
      ],
      tankMetricsHeaders: [
        {text: 'Tank Metrics', sortable: false, class: 'subheading text--primary font-weight-bold'},
        {text: 'Theck-Meloree Index', sortable: false, align: 'right'},
        {text: 'Maximum Spike Damage', sortable: false, align: 'right'}
      ]
    }
  },

  methods: {
    buildErrorString (dataset) {
      const meanStdDev = this.getData(`${dataset}.mean_std_dev`)
      const mean = this.getData(`${dataset}.mean`)

      return `${numberFormat(this.confidenceEstimator * meanStdDev)} /
      ${numberFormat((this.confidenceEstimator * meanStdDev * 100) / mean)}%`
    },

    buildMetricPerPrimaryResourceString (dataset) {
      const primaryResourceLost = this.getData(
        `resource_lost.${getSpecializationData(this.player.specialization).primaryResource}.mean`
      )

      return numberFormat(this.getData(`${dataset}.mean`) / primaryResourceLost, 2)
    },

    buildRangeString (dataset) {
      const data = this.getData(`${dataset}.data`, [])

      if (!data || data.length === 0) {
        return `0.00 / 0.00%`
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
        {text: `${direction} Metrics`, sortable: false, class: 'subheading text--primary font-weight-bold'},
        {text: 'Damage', sortable: false, align: 'right'},
        {text: 'Heal', sortable: false, align: 'right'},
        {text: 'Absorb', sortable: false, align: 'right'}
      ]
    },

    getTalentTierLevel (tier) {
      return tier !== 7 ? tier * 15 : 100
    },

    getMetricHistogramChart (metric) {
      return {
        series: [
          {
            baseSeries: 's1',
            color: getSpecializationData(this.player.specialization).color,
            name: 'Iterations',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1
          },
          {
            data: this.getData(`${metric}.data`),
            id: 's1',
            name: metric,
            type: 'scatter'
          }
        ],
        title: {
          text: 'DPS Distribution'
        },
        xAxis: [
          {
            labels: false,
            opposite: true
          },
          {
            labels: {
              style: {
                fontSize: null
              },
              y: null
            },
            title: {
              text: metric
            }
          }
        ],
        yAxis: [
          {
            labels: false,
            opposite: true
          },
          {
            title: {
              text: 'Iterations'
            }
          }
        ]
      }
    },

    getMetricSourceChart (metric) {
      const metricSources = this.player.stats
        .filter(action => action.type === metric && action.portion_amount > 0)
        .map(action => ({
          color: getColorBySchool(action.school),
          name: action.name,
          pet: action.pet,
          source: action.source,
          y: action.portion_amount * 100
        }))

      if (metricSources.length === 0) {
        return null
      }

      return {
        title: {
          text: `${_capitalize(metric)} Sources`
        },

        series: [
          {
            type: 'pie',
            name: _capitalize(metric),
            data: metricSources
          }
        ]
      }
    },

    getTimelineChart (name, timelineData, mean, color) {
      if (timelineData.length === 0 || mean === 0) {
        return null
      }

      return {
        chart: {
          zoomType: 'x'
        },
        series: [
          {
            color,
            data: sma(timelineData, 20, n => n).map((y, i) => [i * 1000, y]),
            dataLabels: false,
            name,
            type: 'areaspline'
          }
        ],
        title: {
          text: name
        },
        xAxis: {
          crosshair: true,
          labels: {
            y: null
          },
          type: 'datetime'
        },
        yAxis: {
          plotLines: [
            {
              color: Color(color).lighten(0.25).string(),
              label: {
                align: 'right',
                style: {
                  color: Color(color).lighten(0.25).string(),
                  fontSize: '1rem',
                  fontWeight: 'bold'
                },
                text: `Mean: ${numberFormat(mean)}`,
                textAlign: 'right'
              },
              value: mean,
              width: 2,
              zIndex: 5
            }
          ]
        }
      }
    }
  }
}
</script>

<style scoped>
>>> .v-stepper__label {
  text-align: center;
}
</style>
