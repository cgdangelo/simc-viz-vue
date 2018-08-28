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
                      <td class="text-xs-right">{{numberFormat(item.damage)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.heal)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.absorb)}}</td>
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
                      <td class="text--secondary">{{numberFormat(item.name)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.damage)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.heal)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.absorb)}}</td>
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
                        <td class="text-xs-right">{{numberFormat(item.tmi)}}</td>
                        <td class="text-xs-right">{{numberFormat(item.msd)}}</td>
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
                      <td class="text-xs-right">{{numberFormat(item.generated)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.spent)}}</td>
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
              <v-layout row wrap>
                <v-flex xs6>
                    <StackedBarChart
                      name="Damage Per Execute Time"
                      :data="actionsByApet"
                    >
                    </StackedBarChart>
                </v-flex>

                <v-flex xs6>
                  <highcharts :options="spentTimeChart"></highcharts>
                </v-flex>

                <v-flex xs6>
                  <v-layout column>
                    <v-flex v-if="damageSourcesChart">
                      <highcharts :options="damageSourcesChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="healingSourcesChart">
                      <highcharts :options="healingSourcesChart"></highcharts>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs6>
                  <v-layout column>
                    <v-flex v-if="dpsTimelineChart">
                      <highcharts :options="dpsTimelineChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="htpsTimelineChart">
                      <highcharts :options="htpsTimelineChart"></highcharts>
                    </v-flex>

                    <v-flex v-if="dtpsTimelineChart">
                      <highcharts :options="dtpsTimelineChart"></highcharts>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <span slot="header" class="title">Abilities</span>

            <v-container fluid grid-list-md class="grey darken-4">
              <v-layout row wrap>
                <v-flex v-if="damageAbilities">
                  <v-toolbar class="grey darken-3 elevation-0">
                    <v-toolbar-title>Damage Abilities</v-toolbar-title>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="abilitiesTableHeaders"
                    :items="damageAbilities"
                    hide-actions
                  >
                    <template slot="headerCell" slot-scope="{ header }">
                      <v-tooltip bottom>
                        <span slot="activator">{{header.text}}</span>
                        <span>{{header.tooltip}}</span>
                      </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                      <td>{{item.name}}</td>
                      <td>{{item.type}}</td>
                      <td class="text-xs-right">{{numberFormat(item.aps)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.apsPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.execute)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.interval)}}s</td>
                      <td class="text-xs-right">{{numberFormat(item.ape)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.apet)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.count)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.hit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.crit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.avgHit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.critPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.blockPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.uptimePct)}}%</td>
                    </template>
                  </v-data-table>
                </v-flex>

                <v-flex v-if="healingAbilities">
                  <v-toolbar class="grey darken-3 elevation-0">
                    <v-toolbar-title>Heal/Absorb Abilities</v-toolbar-title>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="abilitiesTableHeaders"
                    :items="healingAbilities"
                    hide-actions
                  >
                    <template slot="headerCell" slot-scope="{ header }">
                      <v-tooltip bottom>
                        <span slot="activator">{{header.text}}</span>
                        <span>{{header.tooltip}}</span>
                      </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                      <td>{{item.name}}</td>
                      <td>{{item.type}}</td>
                      <td class="text-xs-right">{{numberFormat(item.aps)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.apsPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.execute)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.interval)}}s</td>
                      <td class="text-xs-right">{{numberFormat(item.ape)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.apet)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.count)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.hit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.crit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.avgHit)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.critPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.blockPct)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.uptimePct)}}%</td>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-container>
          </v-expansion-panel-content>

          <v-expansion-panel-content>
            <span slot="header" class="title">Buffs</span>

            <v-container fluid grid-list-md class="grey darken-4">
              <v-layout row wrap>
                <v-flex>
                  <v-divider></v-divider>
                  <v-data-table
                    :headers="buffsTableHeaders"
                    :items="buffs"
                    hide-actions
                  >
                    <template slot="headerCell" slot-scope="{ header }">
                      <v-tooltip bottom>
                        <span slot="activator">{{header.text}}</span>
                        <span>{{header.tooltip}}</span>
                      </v-tooltip>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                      <td :data-tooltip-href="getWowDbLink(item.spellId)">{{item.name}}</td>
                      <td class="text-xs-right">{{numberFormat(item.start)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.refresh)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.interval)}}s</td>
                      <td class="text-xs-right">{{numberFormat(item.trigger)}}s</td>
                      <td class="text-xs-right">{{numberFormat(item.uptime)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.benefit)}}%</td>
                      <td class="text-xs-right">{{numberFormat(item.overflow)}}</td>
                      <td class="text-xs-right">{{numberFormat(item.expiry)}}</td>
                    </template>
                  </v-data-table>
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

    damageAbilities () {
      return this.getMetricActions('damage')
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

    buffs () {
      return this.player.buffs
        .filter(buff => buff.spell)
        .map(buff => ({
          spellId: buff.spell,
          source: buff.source || this.player.name,
          name: buff.name,
          start: buff.start_count || 0,
          refresh: buff.refresh_count || 0,
          interval: buff.interval || 0,
          trigger: buff.trigger || 0,
          uptime: buff.uptime || 0,
          benefit: buff.benefit || 0,
          overflow: buff.overflow_total || 0,
          expiry: buff.expire_count || 0
        }))
    },

    healingAbilities () {
      return this.getMetricActions('heal', 'absorb')
    },

    healingSourcesChart () {
      return this.getMetricSourceChart('heal', 'absorb')
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
          damage: this.getData('dtps.mean'),
          heal: this.getData('dtps.mean'),
          absorb: this.getData('atps.mean')
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
          damage: this.getData('dps.mean'),
          heal: this.getData('hps.mean'),
          absorb: this.getData('aps.mean')
        },
        {
          name: 'Per Second, Effective',
          damage: this.getData('dpse.mean'),
          heal: this.getData('hpse.mean'),
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
        generated: this.getData(`resource_gained.${resourceName}.mean`) / fightLength,
        spent: this.getData(`resource_lost.${resourceName}.mean`) / fightLength
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
          tmi: this.getData('theck_meloree_index.min'),
          msd: this.getData('max_spike_amount.min')
        },
        {
          name: 'Maximum',
          tmi: this.getData('theck_meloree_index.max'),
          msd: this.getData('max_spike_amount.max')
        },
        {
          name: 'Mean',
          tmi: this.getData('theck_meloree_index.mean'),
          msd: this.getData('max_spike_amount.mean')
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
      abilitiesTableHeaders: [
        {
          value: 'name',
          text: 'Name',
          tooltip: 'Name of the ability.'
        },
        {
          value: 'type',
          text: 'Type',
          tooltip: 'Type (direct or over-time) of the ability.'
        },
        {
          value: 'aps',
          text: 'APS',
          tooltip: 'Average amount per active player duration.',
          align: 'right'
        },
        {
          value: 'apsPct',
          text: 'APS %',
          tooltip: 'Percentage of total amount contributed by a single action.',
          align: 'right'
        },
        {
          value: 'execute',
          text: 'Execute',
          tooltip: 'Average number of times the action was performed.',
          align: 'right'
        },
        {
          value: 'interval',
          text: 'Interval',
          tooltip: 'Average amount of time between executes.',
          align: 'right'
        },
        {
          value: 'ape',
          text: 'APE',
          tooltip: 'Average amount per execute.',
          align: 'right'
        },
        {
          value: 'apet',
          text: 'APET',
          tooltip: 'Average damage per execute time of an individual action; the amount of damage generated, divided by the time taken to execute the action, including time spent in the GCD.',
          align: 'right'
        },
        {
          value: 'count',
          text: 'Count',
          tooltip: 'Average number of times an action is executed per iteration.',
          align: 'right'
        },
        {
          value: 'hit',
          text: 'Hit',
          tooltip: 'Average non-crit amount.',
          align: 'right'
        },
        {
          value: 'crit',
          text: 'Crit',
          tooltip: 'Average crit amount.',
          align: 'right'
        },
        {
          value: 'avgHit',
          text: 'Avg',
          tooltip: 'Average direct amount per execution.',
          align: 'right'
        },
        {
          value: 'critPct',
          text: 'Crit %',
          tooltip: 'Percentage of executes that resulted in critical strikes.',
          align: 'right'
        },
        {
          value: 'blockPct',
          text: 'Block %',
          tooltip: 'Percentage of executes that resulted in a blocked strike.',
          align: 'right'
        },
        {
          value: 'uptimePct',
          text: 'Uptime %',
          tooltip: 'Amount of time a periodic effect was active on the target.',
          align: 'right'
        }
      ],
      buffsTableHeaders: [
        {
          value: 'name',
          text: 'Name',
          tooltip: 'Name of the buff.'
        },
        {
          value: 'start',
          text: 'Start',
          tooltip: 'Average number of times the buff was applied.',
          align: 'right'
        },
        {
          value: 'refresh',
          text: 'Refresh',
          tooltip: 'Average number of times the buff was refreshed.',
          align: 'right'
        },
        {
          value: 'interval',
          text: 'Interval',
          tooltip: 'Average time between applications.',
          align: 'right'
        },
        {
          value: 'trigger',
          text: 'Trigger',
          tooltip: 'I honestly do not remember.',
          align: 'right'
        },
        {
          value: 'uptime',
          text: 'Uptime',
          tooltip: 'Amount of time the buff was active.',
          align: 'right'
        },
        {
          value: 'benefit',
          text: 'Benefit',
          tooltip: 'The percentage of times the buff had a actual benefit for its mainly intended purpose, eg. damage buffed / spell executes.',
          align: 'right'
        },
        {
          value: 'overflow',
          text: 'Overflow',
          tooltip: 'Average number of times the buff overflowed its maximum stacks, or refreshed.',
          align: 'right'
        },
        {
          value: 'expiry',
          text: 'Expiry',
          tooltip: 'Average number of times the buff ran its full duration and expired.',
          align: 'right'
        }
      ],
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

    getMetricActions (...metrics) {
      const fightLength = this.getData('fight_length.mean')

      const actions = this.player.stats
        .filter(action => metrics.indexOf(action.type) !== -1 && action.actual_amount && action.actual_amount.mean > 0)
        .map(action => {
          const type = !action.tick_results || action.tick_results.mean === 0 ? 'Direct' : 'Periodic'
          const count = (type === 'Direct' ? action.num_direct_results.mean : action.num_tick_results.mean) || 0
          const results = action.tick_results || action.direct_results

          return {
            value: false,
            source: action.source,
            name: action.name,
            type: type,
            aps: action.actual_amount.mean / fightLength,
            apsPct: action.portion_amount * 100,
            execute: action.num_executes.mean,
            interval: (action.total_intervals && action.total_intervals.mean) || 0,
            ape: action.actual_amount.mean / action.num_executes.mean,
            apet: action.apet,
            count: count,
            hit: (results && results.hit && results.hit.avg_actual_amount.mean) || 0,
            crit: (results && results.crit && results.crit.avg_actual_amount.mean) || 0,
            avgHit: (results && results.hit && results.hit.avg_actual_amount.sum / action.num_executes.count) || 0,
            critPct: (results && results.crit && results.crit.pct) || 0,
            blockPct: (results && results['hit (blocked)'] && results['hit (blocked)'].pct) || 0,
            uptimePct: type === 'Periodic'
              ? action.total_tick_time && action.total_tick_time.mean / fightLength * 100
              : 0
          }
        })

      if (actions.length === 0) {
        return null
      }

      return actions
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

    getMetricSourceChart (...metrics) {
      const metricSources = this.player.stats
        .filter(action => metrics.indexOf(action.type) !== -1 && action.portion_amount > 0)
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

      const title = metrics.map(m => _capitalize(m)).join('/')

      return {
        title: {
          text: `${title} Sources`
        },

        series: [
          {
            type: 'pie',
            name: title,
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
              color: Color(color).lighten(0.25).fade(0.5).string(),
              dashStyle: 'dash',
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
    },

    getWowDbLink (spellId) {
      return `//www.wowdb.com/spells/${spellId}`
    },

    numberFormat
  }
}
</script>

<style>
.db-description .yellow {
  background-color: initial !important
}
</style>

<style scoped lang="stylus">
>>> .v-stepper__label {
  color: #fff !important
  text-align: center
}
</style>
