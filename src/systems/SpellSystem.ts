import { EventBus } from '../core/EventBus';

export interface Spell {
  id: string;
  name: string;
  element: string;
  damage: number;
  manaCost: number;
  cooldown: number;
}

export class SpellSystem {
  spells: Spell[] = [
    { id: 'fireball', name: 'Bola de Fogo', element: 'Fogo', damage: 35, manaCost: 25, cooldown: 800 },
    { id: 'icebolt', name: 'Raio de Gelo', element: 'Gelo', damage: 28, manaCost: 22, cooldown: 700 },
    { id: 'lightning', name: 'Raio Arcano', element: 'Raio', damage: 42, manaCost: 30, cooldown: 1100 },
    { id: 'shadow_bolt', name: 'Seta Sombria', element: 'Trevas', damage: 38, manaCost: 28, cooldown: 950 },
  ];

  getSpell(id: string): Spell | undefined {
    return this.spells.find(s => s.id === id);
  }

  cast(spellId: string, mana: number): { success: boolean; damage?: number; manaCost?: number } {
    const spell = this.getSpell(spellId);
    if (!spell || mana < spell.manaCost) return { success: false };

    EventBus.emit('spell:cast', spell);
    return { success: true, damage: spell.damage, manaCost: spell.manaCost };
  }
}