export type Rarity = 
  | 'Comum' | 'Incomum' | 'Raro' | 'Épico' | 'Lendário' | 'Mítico' | 'Ancestral';

export interface Equipment {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  stats: Record<string, number>;
  description: string;
  levelReq?: number;
}

export const equipments: Equipment[] = [
  // Cajados
  { id: 'staff_fire_1', name: 'Cajado Flamejante', type: 'Cajado', rarity: 'Raro', stats: { intelligence: 18, 'fire damage': 14 }, description: 'Cajado imbuído com fogo puro' },
  { id: 'staff_void', name: 'Cajado do Vazio', type: 'Cajado', rarity: 'Lendário', stats: { intelligence: 42, 'void damage': 25 }, description: 'Poder do vazio primordial' },
  
  // Anéis
  { id: 'ring_arcane', name: 'Anel Arcano', type: 'Anel', rarity: 'Épico', stats: { intelligence: 28, mana: 60 }, description: 'Anel de puro poder arcano' },
  { id: 'ring_crit', name: 'Anel do Crítico', type: 'Anel', rarity: 'Raro', stats: { 'crit chance': 8, 'crit damage': 25 }, description: 'Aumenta chance e dano crítico' },
  
  // Armaduras
  { id: 'robe_elder', name: 'Veste do Ancião', type: 'Peitoral', rarity: 'Épico', stats: { intelligence: 35, mana: 90, 'mana regen': 6 }, description: 'Veste lendária dos arquimagos' },
  
  // Amuletos
  { id: 'amulet_chaos', name: 'Amuleto do Caos', type: 'Amuleto', rarity: 'Mítico', stats: { intelligence: 55, 'chaos damage': 30 }, description: 'Poder instável e destrutivo' },
];