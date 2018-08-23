const classResourceMap = {
  'blood death knight': 'runic_power',
  'frost death knight': 'runic_power',
  'unholy death knight': 'runic_power',
  'havoc demon hunter': 'fury',
  'vengeance demon hunter': 'pain',
  'guardian druid': 'rage',
  'balance druid': 'astral_power',
  'feral druid': 'energy',
  'restoration druid': 'mana',
  'beast mastery hunter': 'focus',
  'marksmanship hunter': 'focus',
  'survival hunter': 'focus',
  'arcane mage': 'mana',
  'fire mage': 'mana',
  'frost mage': 'mana',
  'brewmaster monk': 'energy',
  'windwalker monk': 'energy',
  'mistweaver monk': 'mana',
  // 'protection paladin': 'mana',
  'protection paladin': null,
  'retribution paladin': 'holy_power',
  'holy paladin': 'mana',
  'shadow priest': 'insanity',
  'discipline priest': 'mana',
  'holy priest': 'mana',
  'assassination rogue': 'energy',
  'outlaw rogue': 'energy',
  'subtlety rogue': 'energy',
  'elemental shaman': 'maelstrom',
  'enhancement shaman': 'maelstrom',
  'restoration shaman': 'mana',
  'affliction warlock': 'mana',
  'demonology warlock': 'mana',
  'destruction warlock': 'mana',
  'protection warrior': 'rage',
  'arms warrior': 'rage',
  'fury warrior': 'rage',

  default: 'mana'
}

export function getPrimaryResourceBySpecialization (specialization) {
  const lowerSpecialization = specialization.toLowerCase()

  if (lowerSpecialization in classResourceMap) {
    return classResourceMap[lowerSpecialization]
  }

  return 'mana'
}
