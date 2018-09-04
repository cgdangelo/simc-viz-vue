<template>
  <PlayerPanelSection title="Scale Factors">
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="items"
        expand
        hide-actions
        item-key="metric"
      >
        <template
          slot="items"
          slot-scope="props"
        >
          <td
            v-for="(column, i) in Object.values(props.item)"
            :key="i"
            :class="scaleFactorCellClasses(props.item.metric, i)"
            class="metric-scale-factors"
            @click="props.expanded = !props.expanded"
          >
            <template v-if="i === 0">
              {{ column }}
            </template>

            <template v-else>
              {{ column | numberFormat }}
            </template>
          </td>
        </template>

        <template
          slot="expand"
          slot-scope="{ item }"
        >
          <v-card flat>
            <v-card-text>
              <code class="pawn-string pa-2">{{ pawnString(item) }}</code>
            </v-card-text>
          </v-card>
        </template>
      </v-data-table>
    </v-flex>
  </PlayerPanelSection>
</template>

<script>
import _zipObject from 'lodash/zipObject'
import PlayerPanelSection from './PlayerPanelSection'

export default {
  name: 'PlayerPanelScaleFactors',

  components: { PlayerPanelSection },

  props: {
    name: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true,
      validator (value) {
        return ['dps', 'heal', 'tank'].indexOf(value) !== -1
      }
    },

    scaleFactors: {
      type: Object,
      required: true
    },

    specialization: {
      type: String,
      required: true
    }
  },

  computed: {
    headers () {
      const [, firstScaleFactors] = Object.entries(this.scaleFactors)[0]
      const scaleOver = Object.keys(firstScaleFactors)

      return [
        {
          value: 'metric',
          text: 'Metric'
        },

        ...scaleOver.map(stat => ({
          value: stat,
          text: stat,
          align: 'right'
        }))
      ]
    },

    items () {
      return Object.entries(this.scaleFactors).map(([metric, factors]) =>
        _zipObject(
          this.headers.map(header => header.value),
          [metric, ...Object.values(factors)]
        )
      )
    }
  },

  methods: {
    isPrimaryMetric (metric) {
      switch (this.role) {
        case 'dps':
          return ['dps', 'prioritydps'].indexOf(metric) !== -1

        case 'heal':
          return metric === 'haps'

        case 'tank':
          return metric === 'tmi'

        default:
          return ['dps', 'prioritydps'].indexOf(metric) !== -1
      }
    },

    pawnString (scaleFactors) {
      let pawnString = `( Pawn: v1: "${this.name}-${this.specialization}": `

      pawnString += Object.entries(scaleFactors).slice(1).map(([stat, scaleFactor]) => {
        return `${this.simcToPawnStat(stat)}=${scaleFactor.toFixed(3)}`
      }).join(', ')

      pawnString += ' )'

      return pawnString
    },

    scaleFactorCellClasses (metric, index) {
      return {
        'text-xs-right': index > 0,
        primary: this.isPrimaryMetric(metric),
        'font-weight-bold': this.isPrimaryMetric(metric)
      }
    },

    simcToPawnStat (stat) {
      switch (stat) {
        case 'Str':
          return 'Strength'

        case 'Agi':
          return 'Agility'

        case 'Sta':
          return 'Stamina'

        case 'Int':
          return 'Intellect'

        case 'Crit':
        case 'Haste':
        case 'Mastery':
          return `${stat}Rating`

        case 'Vers':
          return 'Versatility'

        case 'Wdps':
          return 'Dps'

        case 'WOHdps':
          return 'OffHandDps'

        case 'SP':
          return 'SpellPower'

        case 'AP':
        case 'Leech':
        case 'Armor':
        case 'BonusArmor':
          return stat
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.metric-scale-factors
  cursor: pointer

code.pawn-string
  width: 100%
  font-size: 1rem
</style>
