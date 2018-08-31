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
          {{ numberFormat(item.tmi) }}
        </td>

        <td class="text-xs-right">
          {{ numberFormat(item.msd) }}
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  name: 'PlayerPanelTankMetricsTable',

  props: {
    items: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      headers: [
        {
          text: 'Tank Metrics',
          sortable: false,
          class: 'subheading text--primary font-weight-bold'
        },
        {
          text: 'Theck-Meloree Index',
          sortable: false,
          align: 'right',
          class: 'text--primary'
        },
        {
          text: 'Maximum Spike Damage',
          sortable: false,
          align: 'right',
          class: 'text--primary'
        }
      ]
    }
  }
}
</script>
