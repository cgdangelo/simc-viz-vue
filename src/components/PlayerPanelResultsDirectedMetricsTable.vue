<template>
  <v-flex>
    <v-data-table
      :headers="headers"
      :items="items"
      hide-actions
      item-key="name"
    >
      <template
        slot="items"
        slot-scope="{ item }"
      >
        <td class="text--secondary">
          {{ item.name }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.damage) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.heal) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.absorb) }}
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  name: 'PlayerPanelResultsDirectedMetricsTable',

  props: {
    incoming: {
      type: Boolean,
      default: false
    },

    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      headers: [
        {
          text: `${this.incoming ? 'Incoming' : 'Outgoing'} Metrics`,
          sortable: false,
          class: 'subheading text--primary font-weight-bold'
        },
        {
          text: 'Damage',
          sortable: false,
          align: 'right',
          class: 'text--primary'
        },
        {
          text: 'Heal',
          sortable: false,
          align: 'right',
          class: 'text--primary'
        },
        {
          text: 'Absorb',
          sortable: false,
          align: 'right',
          class: 'text--primary'
        }
      ]
    }
  }
}
</script>
