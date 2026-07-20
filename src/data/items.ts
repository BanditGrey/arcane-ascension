export type Rarity = 'Comum' | 'Incomum' | 'Raro' | 'Épico' | 'Lendário' | 'Mítico';

export interface Item {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  stats: Record<string, number>;
  description: string;
}

export const items: Item[] = [
  { id: 'staff_basic', name: 'Cajado de Aprendiz', type: 'Cajado', rarity: 'Comum', stats: { intelligence: 8, mana: 25 }, description: 'Cajado simples de madeira' },
  { id: 'staff_fire', name: 'Cajado Flamejante', type: 'Cajado', rarity: 'Raro', stats: { intelligence: 18, 'fire damage': 12 }, description: 'Cajado imbuído com fogo' },
  { id: 'ring_int', name: 'Anel do Sábio', type: 'Anel', rarity: 'Épico', stats: { intelligence: 25, manaRegen: 4 }, description: 'Anel lendário de poder arcano' },
  { id: 'robe_arcane', name: 'Veste Arcana', type: 'Peitoral', rarity: 'Incomum', stats: { intelligence: 12, mana: 40 }, description: 'Veste de tecido arcano' },
  { id: 'amulet_void', name: 'Amuleto do Vazio', type: 'Amuleto', rarity: 'Lendário', stats: { intelligence: 35, 'void damage': 20 }, description: 'Amuleto de poder primordial' },
];