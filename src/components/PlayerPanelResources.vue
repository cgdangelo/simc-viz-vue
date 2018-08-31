<template>
  <PlayerPanelSection title="Resources">
    <v-flex>
      <v-toolbar class="grey darken-3 elevation-0">
        <v-toolbar-title>
          Usage
        </v-toolbar-title>
      </v-toolbar>

      <v-divider/>

      <v-data-table
        :headers="usageHeaders"
        :items="usageItems"
        hide-actions
      >
        <template
          slot="items"
          slot-scope="{ item }"
        >
          <td>
            {{ item.name }}
          </td>

          <td :style="getResourceTypeCellStyles(item.type)">
            {{ _startCase(item.type) }}
          </td>

          <td class="text-xs-right">
            {{ item.count | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.total | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.average | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.rpe | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.apr | numberFormat }}
          </td>
        </template>
      </v-data-table>
    </v-flex>

    <v-flex>
      <v-toolbar class="grey darken-3 elevation-0">
        <v-toolbar-title>
          Gains
        </v-toolbar-title>
      </v-toolbar>

      <v-divider/>

      <v-data-table
        :headers="gainsHeaders"
        :items="gainsItems"
        hide-actions
      >
        <template
          slot="items"
          slot-scope="{ item }"
        >
          <td>{{ item.name }}</td>

          <td :style="getResourceTypeCellStyles(item.type)">
            {{ _startCase(item.type) }}
          </td>

          <td class="text-xs-right">
            {{ item.count | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.total | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.average | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.overflow | numberFormat }}
            ({{ 100 * item.overflow / (item.total + item.overflow) | numberFormat }}%)
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import * as Color from 'color'
import _startCase from 'lodash/startCase'
import { getColorByResource } from '../util'
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelResources',

  components: { PlayerPanelSection },

  props: {
    gains: {
      type: Array,
      required: true
    },

    stats: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      usageHeaders: [
        {
          value: 'name',
          text: 'Name'
        },
        {
          value: 'type',
          text: 'Type'
        },
        {
          value: 'count',
          text: 'Count',
          align: 'right'
        },
        {
          value: 'total',
          text: 'Total',
          align: 'right'
        },
        {
          value: 'average',
          text: 'Average',
          align: 'right'
        },
        {
          value: 'rpe',
          text: 'RPE',
          align: 'right'
        },
        {
          value: 'apr',
          text: 'APR',
          align: 'right'
        }
      ],
      gainsHeaders: [
        {
          value: 'name',
          text: 'Name'
        },
        {
          value: 'type',
          text: 'Type'
        },
        {
          value: 'count',
          text: 'Count',
          align: 'right'
        },
        {
          value: 'total',
          text: 'Total',
          align: 'right'
        },
        {
          value: 'average',
          text: 'Average',
          align: 'right'
        },
        {
          value: 'overflow',
          text: 'Overflow',
          align: 'right'
        }
      ]
    }
  },

  computed: {
    usageItems () {
      const resourceUsage = []

      this.stats
        .filter(stat => stat.resource_gain)
        .forEach(stat => {
          const { name, ...resourceGains } = stat.resource_gain

          Object.entries(resourceGains).forEach(([resource, gain]) => {
            resourceUsage.push({
              name,
              type: resource,
              count: gain.count,
              total: gain.actual,
              average: gain.actual / gain.count,
              rpe: 0,
              apr: 0
            })
          })
        })

      return resourceUsage
    },

    gainsItems () {
      const resourceGainRows = []

      this.gains.forEach(gain => {
        const { name, ...resourceGains } = gain

        Object.entries(resourceGains).forEach(([resource, gain]) => {
          resourceGainRows.push({
            name,
            type: resource,
            count: gain.count,
            total: gain.actual,
            average: gain.actual / gain.count,
            overflow: gain.overflow
          })
        })
      })

      return resourceGainRows
    }
  },

  methods: {
    getResourceTypeCellStyles (resource) {
      return {
        backgroundColor: new Color(getColorByResource(resource)).fade(0).toString(),
        color: new Color(getColorByResource(resource)).isDark() ? '#fff' : '#000',
        fontWeight: 'bold'
      }
    },

    _startCase
  }
}
</script>
