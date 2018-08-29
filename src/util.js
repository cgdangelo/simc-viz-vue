import * as Color from 'color'

export function getSpecializationData (specialization = '') {
  const lowerSpecialization = specialization.toLowerCase()

  switch (lowerSpecialization) {
    case 'blood death knight':
      return {
        color: '#C41F3B',
        id: 250,
        primaryResource: 'runic_power'
      }

    case 'frost death knight':
      return {
        color: '#C41F3B',
        id: 251,
        primaryResource: 'runic_power'
      }

    case 'unholy death knight':
      return {
        color: '#C41F3B',
        id: 252,
        primaryResource: 'runic_power'
      }

    case 'havoc demon hunter':
      return {
        color: '#A330C9',
        id: 577,
        primaryResource: 'fury'
      }

    case 'vengeance demon hunter':
      return {
        color: '#A330C9',
        id: 581,
        primaryResource: 'pain'
      }

    case 'guardian druid':
      return {
        color: '#FF7D0A',
        id: 104,
        primaryResource: 'rage'
      }

    case 'balance druid':
      return {
        color: '#FF7D0A',
        id: 102,
        primaryResource: 'astral_power'
      }

    case 'feral druid':
      return {
        color: '#FF7D0A',
        id: 103,
        primaryResource: 'energy'
      }

    case 'restoration druid':
      return {
        color: '#FF7D0A',
        id: 105,
        primaryResource: 'mana'
      }

    case 'beast mastery hunter':
      return {
        color: '#ABD473',
        id: 253,
        primaryResource: 'focus'
      }

    case 'marksmanship hunter':
      return {
        color: '#ABD473',
        id: 254,
        primaryResource: 'focus'
      }

    case 'survival hunter':
      return {
        color: '#ABD473',
        id: 255,
        primaryResource: 'focus'
      }

    case 'arcane mage':
      return {
        color: '#69CCF0',
        id: 62,
        primaryResource: 'mana'
      }

    case 'fire mage':
      return {
        color: '#69CCF0',
        id: 63,
        primaryResource: 'mana'
      }

    case 'frost mage':
      return {
        color: '#69CCF0',
        id: 64,
        primaryResource: 'mana'
      }

    case 'brewmaster monk':
      return {
        color: '#00FF96',
        id: 268,
        primaryResource: 'energy'
      }

    case 'windwalker monk':
      return {
        color: '#00FF96',
        id: 269,
        primaryResource: 'energy'
      }

    case 'mistweaver monk':
      return {
        color: '#00FF96',
        id: 270,
        primaryResource: 'mana'
      }

    case 'protection paladin':
      return {
        color: '#F58CBA',
        id: 66,
        primaryResource: null
      }

    case 'retribution paladin':
      return {
        color: '#F58CBA',
        id: 70,
        primaryResource: 'holy_power'
      }

    case 'holy paladin':
      return {
        color: '#F58CBA',
        id: 65,
        primaryResource: 'mana'
      }

    case 'shadow priest':
      return {
        color: '#FFFFFF',
        id: 258,
        primaryResource: 'insanity'
      }

    case 'discipline priest':
      return {
        color: '#FFFFFF',
        id: 256,
        primaryResource: 'mana'
      }

    case 'holy priest':
      return {
        color: '#FFFFFF',
        id: 257,
        primaryResource: 'mana'
      }

    case 'assassination rogue':
      return {
        color: '#FFF569',
        id: 259,
        primaryResource: 'energy'
      }

    case 'outlaw rogue':
      return {
        color: '#FFF569',
        id: 260,
        primaryResource: 'energy'
      }

    case 'subtlety rogue':
      return {
        color: '#FFF569',
        id: 261,
        primaryResource: 'energy'
      }

    case 'elemental shaman':
      return {
        color: '#0070DE',
        id: 262,
        primaryResource: 'maelstrom'
      }

    case 'enhancement shaman':
      return {
        color: '#0070DE',
        id: 263,
        primaryResource: 'maelstrom'
      }

    case 'restoration shaman':
      return {
        color: '#0070DE',
        id: 264,
        primaryResource: 'mana'
      }

    case 'affliction warlock':
      return {
        color: '#9482C9',
        id: 265,
        primaryResource: 'mana'
      }

    case 'demonology warlock':
      return {
        color: '#9482C9',
        id: 266,
        primaryResource: 'mana'
      }

    case 'destruction warlock':
      return {
        color: '#9482C9',
        id: 267,
        primaryResource: 'mana'
      }

    case 'protection warrior':
      return {
        color: '#C79C6E',
        id: 73,
        primaryResource: 'rage'
      }

    case 'arms warrior':
      return {
        color: '#C79C6E',
        id: 71,
        primaryResource: 'rage'
      }

    case 'fury warrior':
      return {
        color: '#C79C6E',
        id: 72,
        primaryResource: 'rage'
      }

    default:
      return {
        color: '#fff',
        primaryResource: 'mana'
      }
  }
}

export const getColorBySchool = (school = '') => {
  switch (school.toLowerCase()) {
    case 'physical':
      return getSpecializationData('arms warrior').color

    case 'holy':
      return '#FFCC00'

    case 'fire':
      return getSpecializationData('frost death knight').color

    case 'nature':
      return getSpecializationData('marksmanship hunter').color

    case 'frost':
      return getSpecializationData('elemental shaman').color

    case 'shadow':
      return '#9482C9'

    case 'arcane':
      return getSpecializationData('arcane mage').color

    case 'elemental':
      return getSpecializationData('windwalker monk').color

    case 'frostfire':
      return '#9900CC'

    case 'chaos':
      return '#00C800'

    case 'flamestrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('fire'))

    case 'froststrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('frost'))

    case 'spellstrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('arcane'))

    case 'stormstrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('nature'))

    case 'shadowstrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('shadow'))

    case 'holystrike':
      return mixColors(getColorBySchool('physical'), getColorBySchool('holystrike'))

    case 'spellfire':
      return mixColors(getColorBySchool('fire'), getColorBySchool('nature'))

    case 'shadowflame':
      return mixColors(getColorBySchool('shadow'), getColorBySchool('fire'))

    case 'holyfire':
      return mixColors(getColorBySchool('holy'), getColorBySchool('fire'))

    case 'spellfrost':
      return mixColors(getColorBySchool('arcane'), getColorBySchool('frost'))

    case 'froststorm':
      return mixColors(getColorBySchool('frost'), getColorBySchool('nature'))

    case 'shadowfrost':
      return mixColors(getColorBySchool('shadow'), getColorBySchool('frost'))

    case 'holyfrost':
      return mixColors(getColorBySchool('holy'), getColorBySchool('frost'))

    case 'astral':
      return mixColors(getColorBySchool('arcane'), getColorBySchool('nature'))

    case 'spellshadow':
      return mixColors(getColorBySchool('arcane'), getColorBySchool('shadow'))

    case 'divine':
      return mixColors(getColorBySchool('arcane'), getColorBySchool('holy'))

    case 'shadowstorm':
      return mixColors(getColorBySchool('shadow'), getColorBySchool('nature'))

    case 'holystorm':
      return mixColors(getColorBySchool('holy'), getColorBySchool('nature'))

    case 'shadowlight':
      return mixColors(getColorBySchool('shadow'), getColorBySchool('holy'))

    case 'chromatic':
      return mixColors(
        getColorBySchool('fire'),
        getColorBySchool('frost'),
        getColorBySchool('arcane'),
        getColorBySchool('nature'),
        getColorBySchool('shadow')
      )

    case 'magic':
      return mixColors(getColorBySchool('chromatic'), getColorBySchool('holy'))

    default:
      return '#666666'
  }
}

export const getColorByResource = (resource = '') => {
  switch (resource.toLowerCase()) {
    case 'health':
      return getSpecializationData('marksmanship hunter').color

    case 'mana':
      return getSpecializationData('elemental shaman').color

    case 'energy':
    case 'focus':
    case 'combo_point':
      return getSpecializationData('subtlety rogue').color

    case 'rage':
    case 'runic_power':
      return getSpecializationData('frost death knight').color

    case 'holy_power':
      return getSpecializationData('retribution paladin').color

    case 'soul_shard':
      return getSpecializationData('affliction warlock').color

    case 'astral_power':
      return getSpecializationData('balance druid').color

    case 'chi':
      return getSpecializationData('windwalker monk').color

    case 'maelstrom':
      return '#FF9900'

    case 'rune':
      return getSpecializationData('arcane mage').color

    case 'fury':
      return getSpecializationData('havoc demon hunter').color

    case 'pain':
      return mixColors(
        getSpecializationData('havoc demon hunter').color,
        getSpecializationData('frost death knight').color
      )

    case 'none':
    default:
      return '#666666'
  }
}

export const mixColors = (...colors) => {
  if (colors.length > 2) {
    return colors.reduce((p, c) => mixColors(p, c), colors[0])
  }

  const [c1, c2] = colors

  return Color(c1).mix(Color(c2)).string()
}
