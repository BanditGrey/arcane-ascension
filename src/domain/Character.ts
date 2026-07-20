import { EventBus } from '../core/EventBus';

export class Character {
  id: string;
  name: string;
  level: number = 1;
  experience: number = 0;
  maxHp: number = 120;
  hp: number = 120;
  maxMana: number = 220;
  mana: number = 220;
  intelligence: number = 10;
  spellDamageMultiplier: number = 1;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  gainExperience(amount: number) {
    this.experience += amount;
    EventBus.emit('character:xp_gained', { amount, total: this.experience });

    while (this.experience >= this.getExperienceToLevel()) {
      this.levelUp();
    }
  }

  private getExperienceToLevel(): number {
    return Math.floor(100 * Math.pow(1.35, this.level));
  }

  levelUp() {
    this.experience -= this.getExperienceToLevel();
    this.level++;

    // Bônus automáticos por nível
    this.maxHp += 8;
    this.maxMana += 12;
    this.intelligence += 2;

    EventBus.emit('character:level_up', { level: this.level });
    console.log(`%c[Character] Level Up! Novo nível: ${this.level}`, 'color:#ffdd66');
  }

  recalculateStats() {
    // Aqui entrariam todos os bônus de equipamentos, proficiências, etc.
    EventBus.emit('character:stats_updated');
  }
}