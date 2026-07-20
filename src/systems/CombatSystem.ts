import { EventBus } from '../core/EventBus';
import { Character } from '../domain/Character';

export class CombatSystem {
  character: Character;
  currentPhase: number = 1;
  kills: number = 0;

  constructor(character: Character) {
    this.character = character;
  }

  attack() {
    // Dano base + bônus de inteligência
    const baseDamage = 12;
    const finalDamage = Math.floor(baseDamage * this.character.spellDamageMultiplier);

    this.kills++;

    EventBus.emit('combat:enemy_killed', {
      phase: this.currentPhase,
      kills: this.kills
    });

    // Ganha XP
    this.character.gainExperience(8 * this.currentPhase);

    // Loot simples
    if (Math.random() < 0.35) {
      EventBus.emit('loot:drop', { phase: this.currentPhase });
    }

    return finalDamage;
  }

  setPhase(phase: number) {
    this.currentPhase = phase;
    this.kills = 0;
  }
}