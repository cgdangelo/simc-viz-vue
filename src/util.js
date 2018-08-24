export function getSpecializationData (specialization) {
  const lowerSpecialization = specialization.toLowerCase()

  switch (lowerSpecialization) {
    case 'blood death knight':
      return {
        color: '#C41F3B',
        primaryResource: 'runic_power'
      }

    case 'frost death knight':
      return {
        color: '#C41F3B',
        primaryResource: 'runic_power'
      }

    case 'unholy death knight':
      return {
        color: '#C41F3B',
        primaryResource: 'runic_power'
      }

    case 'havoc demon hunter':
      return {
        color: '#A330C9',
        primaryResource: 'fury'
      }

    case 'vengeance demon hunter':
      return {
        color: '#A330C9',
        primaryResource: 'pain'
      }

    case 'guardian druid':
      return {
        color: '#FF7D0A',
        primaryResource: 'rage'
      }

    case 'balance druid':
      return {
        color: '#FF7D0A',
        primaryResource: 'astral_power'
      }

    case 'feral druid':
      return {
        color: '#FF7D0A',
        primaryResource: 'energy'
      }

    case 'restoration druid':
      return {
        color: '#FF7D0A',
        primaryResource: 'mana'
      }

    case 'beast mastery hunter':
      return {
        color: '#ABD473',
        primaryResource: 'focus'
      }

    case 'marksmanship hunter':
      return {
        color: '#ABD473',
        primaryResource: 'focus'
      }

    case 'survival hunter':
      return {
        color: '#ABD473',
        primaryResource: 'focus'
      }

    case 'arcane mage':
      return {
        color: '#69CCF0',
        primaryResource: 'mana'
      }

    case 'fire mage':
      return {
        color: '#69CCF0',
        primaryResource: 'mana'
      }

    case 'frost mage':
      return {
        color: '#69CCF0',
        primaryResource: 'mana'
      }

    case 'brewmaster monk':
      return {
        color: '#00FF96',
        primaryResource: 'energy'
      }

    case 'windwalker monk':
      return {
        color: '#00FF96',
        primaryResource: 'energy'
      }

    case 'mistweaver monk':
      return {
        color: '#00FF96',
        primaryResource: 'mana'
      }

    case 'protection paladin':
      return {
        color: '#F58CBA',
        primaryResource: null
      }

    case 'retribution paladin':
      return {
        color: '#F58CBA',
        primaryResource: 'holy_power'
      }

    case 'holy paladin':
      return {
        color: '#F58CBA',
        primaryResource: 'mana'
      }

    case 'shadow priest':
      return {
        color: '#FFFFFF',
        primaryResource: 'insanity'
      }

    case 'discipline priest':
      return {
        color: '#FFFFFF',
        primaryResource: 'mana'
      }

    case 'holy priest':
      return {
        color: '#FFFFFF',
        primaryResource: 'mana'
      }

    case 'assassination rogue':
      return {
        color: '#FFF569',
        primaryResource: 'energy'
      }

    case 'outlaw rogue':
      return {
        color: '#FFF569',
        primaryResource: 'energy'
      }

    case 'subtlety rogue':
      return {
        color: '#FFF569',
        primaryResource: 'energy'
      }

    case 'elemental shaman':
      return {
        color: '#0070DE',
        primaryResource: 'maelstrom'
      }

    case 'enhancement shaman':
      return {
        color: '#0070DE',
        primaryResource: 'maelstrom'
      }

    case 'restoration shaman':
      return {
        color: '#0070DE',
        primaryResource: 'mana'
      }

    case 'affliction warlock':
      return {
        color: '#9482C9',
        primaryResource: 'mana'
      }

    case 'demonology warlock':
      return {
        color: '#9482C9',
        primaryResource: 'mana'
      }

    case 'destruction warlock':
      return {
        color: '#9482C9',
        primaryResource: 'mana'
      }

    case 'protection warrior':
      return {
        color: '#C79C6E',
        primaryResource: 'rage'
      }

    case 'arms warrior':
      return {
        color: '#C79C6E',
        primaryResource: 'rage'
      }

    case 'fury warrior':
      return {
        color: '#C79C6E',
        primaryResource: 'rage'
      }

    default:
      return {
        color: '#fff',
        primaryResource: 'mana'
      }
  }
}
