import { Player } from './Player';
import { phases } from '../systems/PhaseSystem';
import { OfflineProgress } from '../systems/OfflineProgress';

export class IdleGame {
  player: Player;
  currentPhase: number = 1;
  enemiesKilled: number = 0;
  phaseProgress: number = 0;
  isRunning: boolean = false;
  lastAttackTime: number = 0;
  attackCooldown: number = 800;

  constructor(player: Player) {
    this.player = player;
  }

  startPhase(phaseId: number) {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase || this.player.level < phase.levelReq) return false;

    this.currentPhase = phaseId;
    this.enemiesKilled = 0;
    this.phaseProgress = 0;
    this.isRunning = true;
    console.log(`%c[Idle] Entrou na Fase: ${phase.name}`, 'color:#ffaa33');
    return true;
  }

  // Auto attack + Click attack
  attack(isClick: boolean = false) {
    const now = Date.now();
    if (!isClick && now - this.lastAttackTime < this.attackCooldown) return;

    this.lastAttackTime = now;

    const phase = phases.find(p => p.id === this.currentPhase)!;
    this.enemiesKilled++;

    // Loot
    const lootChance = 0.35 * phase.lootMultiplier;
    if (Math.random() < lootChance) {
      this.giveLoot();
    }

    // Progress
    this.phaseProgress = (this.enemiesKilled / phase.enemyCount) * 100;

    if (this.enemiesKilled >= phase.enemyCount) {
      this.completePhase();
    }
  }

  giveLoot() {
    const phase = phases.find(p => p.id === this.currentPhase)!;
    const rarityRoll = Math.random();

    let rarity = 'Comum';
    if (rarityRoll > 0.92) rarity = 'Épico';
    else if (rarityRoll > 0.75) rarity = 'Raro';

    console.log(`%c[Loot] Dropou item ${rarity} na Fase ${this.currentPhase}`, 'color:#66ffaa');

    // Aqui você pode adicionar itens reais depois
    this.player.experience += 8 * phase.lootMultiplier;
  }

  completePhase() {
    this.isRunning = false;
    this.player.phases.completePhase();
    this.player.gainExperience(50 * this.currentPhase);
    console.log(`%c[Idle] Fase ${this.currentPhase} completada!`, 'color:#ffdd66');
  }

  // Progresso offline
  loadOfflineProgress() {
    const offline = this.player.offline.applyOfflineRewards(
      this.player, 
      this.currentPhase
    );
    return offline;
  }
}