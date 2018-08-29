<template>
  <PlayerPanelSection title="Procs">
    <v-flex xs6>
      <v-data-table
        :headers="headers"
        :items="procs"
        hide-actions
      >
        <template
          slot="headerCell"
          slot-scope="{header}"
        >
          <v-tooltip bottom>
            <span slot="activator">
              {{header.text}}
            </span>
            <span>
              {{header.tooltip}}
            </span>
          </v-tooltip>
        </template>

        <template
          slot="items"
          slot-scope="{item}"
        >
          <td>
            {{item.name}}
          </td>

          <td class="text-xs-right">
            {{numberFormat(item.count)}}
          </td>

          <td class="text-xs-right">
            {{numberFormat(item.interval)}}s
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import { numberFormat } from 'highcharts'
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelProcs',

  components: {PlayerPanelSection},

  props: {
    procs: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      headers: [
        {
          value: 'name',
          text: 'Name',
          tooltip: 'Name or description of the event.'
        },
        {
          value: 'count',
          text: 'Count',
          align: 'right',
          tooltip: 'Average number of occurrences per iteration.'
        },
        {
          value: 'interval',
          text: 'Interval',
          align: 'right',
          tooltip: 'Average amount of time between occurrences.'
        }
      ]
    }
  },

  methods: {
    numberFormat
  }
}
</script>
