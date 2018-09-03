<template>
  <PlayerPanelSection title="Buffs">
    <v-flex>
      <v-toolbar class="grey darken-3 elevation-0">
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
        :items="buffs"
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

          <td class="text-xs-right">
            {{ item.start | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.refresh | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.interval | numberFormat }}s
          </td>

          <td class="text-xs-right">
            {{ item.trigger | numberFormat }}s
          </td>

          <td class="text-xs-right">
            {{ item.uptime | numberFormat }}%
          </td>

          <td class="text-xs-right">
            {{ item.benefit | numberFormat }}%
          </td>

          <td class="text-xs-right">
            {{ item.overflow | numberFormat }}
          </td>

          <td class="text-xs-right">
            {{ item.expiry | numberFormat }}
          </td>
        </template>
      </v-data-table>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelBuffs',

  components: { PlayerPanelSection },

  props: {
    buffs: {
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
          // @TODO Try to remember
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
      search: ''
    }
  }
}
</script>
