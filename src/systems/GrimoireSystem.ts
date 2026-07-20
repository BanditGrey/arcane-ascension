import { SpellSystem } from './SpellSystem';

export class GrimoireSystem {
  spellSystem: SpellSystem;

  constructor() {
    this.spellSystem = new SpellSystem();
  }

  getAllSpells() {
    return this.spellSystem.spells;
  }

  getSpellByElement(element: string) {
    return this.spellSystem.spells.filter(s => s.element === element);
  }
}