import { EventBus } from '../core/EventBus';

export class ProficiencySystem {
  proficiencies: Record<string, number> = {
    'Fire Magic': 1,
    'Ice Magic': 1,
    'Lightning Magic': 1,
    'Arcano': 1,
    'Staff Mastery': 1,
    'Mana Control': 1,
  };

  gain(skill: string, amount: number = 0.4) {
    if (!this.proficiencies[skill]) this.proficiencies[skill] = 1;
    this.proficiencies[skill] += amount;

    if (Math.floor(this.proficiencies[skill]) % 10 === 0) {
      EventBus.emit('proficiency:level_up', { skill, level: Math.floor(this.proficiencies[skill]) });
    }
  }

  getLevel(skill: string): number {
    return Math.floor(this.proficiencies[skill] || 1);
  }
}