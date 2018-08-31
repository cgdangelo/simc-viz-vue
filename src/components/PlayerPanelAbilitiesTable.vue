<template>
  <v-flex xs12>
    <v-toolbar class="grey darken-3 elevation-0">
      <v-toolbar-title>{{ title }} Abilities</v-toolbar-title>

      <v-spacer/>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        hide-details
        single-line
        class="pa-0"
      />
    </v-toolbar>

    <v-divider/>

    <v-data-table
      :headers="headers"
      :items="abilities"
      :search="search"
      hide-actions
    >
      <template
        slot="headerCell"
        slot-scope="{ header }"
      >
        <v-tooltip top>
          <span slot="activator">
            {{ header.text }}
          </span>

          <span>
            {{ header.tooltip }}
          </span>
        </v-tooltip>
      </template>

      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td>
          {{ item.name }}
        </td>

        <td>
          {{ item.type }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.aps) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.apsPct) }}%
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.execute) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.interval) }}s
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.ape) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.apet) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.count) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.hit) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.crit) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.avgHit) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.critPct) }}%
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.blockPct) }}%
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.uptimePct) }}%
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>

export default {
  name: 'PlayerPanelAbilitiesTable',

  props: {
    abilities: {
      type: Array,
      required: true
    },

    type: {
      type: String,
      required: true,
      validator (value) {
        return ['damage', 'heal'].indexOf(value) !== -1
      }
    }
  },

  data () {
    return {
      headers: [
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

      search: ''
    }
  },

  computed: {
    title () {
      return this.type === 'damage' ? 'Damage' : 'Heal/Absorb'
    }
  }
}
</script>
