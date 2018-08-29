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
        <td
          class="font-weight-bold"
          :style="{ color: getColorByResource(item.name) }"
        >
          {{startCase(item.name)}}
        </td>

        <td class="text-xs-right">
          {{numberFormat(item.generated)}}
        </td>

        <td class="text-xs-right">
          {{numberFormat(item.spent)}}
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import { numberFormat } from 'highcharts'
import { getColorByResource } from '../util'
import startCase from 'lodash/startCase'

export default {
  name: 'PlayerPanelResultsResourcesTable',

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
          text: 'Resources',
          sortable: false,
          class: 'subheading text--primary font-weight-bold'
        },
        {
          text: 'Generated',
          sortable: false,
          align: 'right'
        },
        {
          text: 'Spent',
          sortable: false,
          align: 'right'
        }
      ]
    }
  },

  methods: {
    getColorByResource,
    numberFormat,
    startCase
  }
}
</script>
