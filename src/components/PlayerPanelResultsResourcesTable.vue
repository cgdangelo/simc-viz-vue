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
        <td :style="getResourceTypeCellStyles(item.name)">
          {{ startCase(item.name) }}
        </td>

        <td class="text-xs-right">
          {{ item.generated | numberFormat }}
        </td>

        <td class="text-xs-right">
          {{ item.spent | numberFormat }}
        </td>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import * as Color from 'color'
import startCase from 'lodash/startCase'
import { getColorByResource } from '../util'

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
    getResourceTypeCellStyles (resource) {
      return {
        backgroundColor: new Color(getColorByResource(resource)).fade(0).toString(),
        color: new Color(getColorByResource(resource)).isDark() ? '#fff' : '#000',
        fontWeight: 'bold'
      }
    },

    startCase
  }
}
</script>
