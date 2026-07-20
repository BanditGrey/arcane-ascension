export interface Spell {
  id: string;
  name: string;
  element: string;
  damage: number;
  manaCost: number;
  cooldown: number;
  projectileColor: string;
  description: string;
}

export const spells: Record<string, Spell> = {
  fireball: {
    id: 'fireball',
    name: 'Bola de Fogo',
    element: 'Fogo',
    damage: 35,
    manaCost: 25,
    cooldown: 800,
    projectileColor: '#ff6600',
    description: 'Lança uma bola de fogo explosiva'
  },
  icebolt: {
    id: 'icebolt',
    name: 'Raio de Gelo',
    element: 'Gelo',
    damage: 28,
    manaCost: 22,
    cooldown: 700,
    projectileColor: '#88ddff',
    description: 'Projétil congelante que reduz velocidade'
  },
  lightning: {
    id: 'lightning',
    name: 'Raio Arcano',
    element: 'Raio',
    damage: 42,
    manaCost: 30,
    cooldown: 1100,
    projectileColor: '#ffff00',
    description: 'Raio veloz que acerta múltiplos alvos'
  },
  arcane_missile: {
    id: 'arcane_missile',
    name: 'Míssil Arcano',
    element: 'Arcano',
    damage: 22,
    manaCost: 18,
    cooldown: 500,
    projectileColor: '#cc66ff',
    description: 'Míssil mágico rápido'
  },
  shadow_bolt: {
    id: 'shadow_bolt',
    name: 'Seta Sombria',
    element: 'Trevas',
    damage: 38,
    manaCost: 28,
    cooldown: 950,
    projectileColor: '#660066',
    description: 'Projétil de energia sombria'
  }
};