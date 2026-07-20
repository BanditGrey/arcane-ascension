export const specializationBonuses: Record<string, any> = {
  'Mago de Fogo': {
    'fire damage': 35,
    'fire crit': 12,
    description: '+35% Dano de Fogo e +12% Crítico em fogo'
  },
  'Mago de Gelo': {
    'ice damage': 30,
    'slow chance': 25,
    description: '+30% Dano de Gelo e chance de congelar'
  },
  'Necromante': {
    'dark damage': 40,
    summons: 2,
    description: '+40% Dano Sombrio e pode invocar 2 esqueletos'
  },
  'Spellblade': {
    'melee damage': 25,
    'spellblade': true,
    description: 'Ataques corpo a corpo com magia'
  },
  'Void Mage': {
    'void damage': 50,
    'mana cost reduction': 20,
    description: 'Dano do Vazio massivo + redução de custo'
  }
};