export class OfflineProgress {
  lastSaveTime: number = Date.now();

  // Calcula o progresso offline
  calculateOfflineProgress(currentPhase: number, lastSave: number): {
    timeOffline: number;
    estimatedLoot: number;
    estimatedExperience: number;
  } {
    const now = Date.now();
    const timeOffline = Math.floor((now - lastSave) / 1000); // em segundos

    // Fórmula simples de idle (pode ser melhorada depois)
    const baseLootPerSecond = 0.8 * currentPhase;
    const baseExpPerSecond = 1.5 * currentPhase;

    const estimatedLoot = Math.floor(timeOffline * baseLootPerSecond);
    const estimatedExperience = Math.floor(timeOffline * baseExpPerSecond);

    return {
      timeOffline,
      estimatedLoot,
      estimatedExperience
    };
  }

  // Aplica o loot offline no jogador
  applyOfflineRewards(player: any, currentPhase: number) {
    const lastSave = this.lastSaveTime;
    const offline = this.calculateOfflineProgress(currentPhase, lastSave);

    if (offline.timeOffline < 30) return null; // Ignora se ficou offline pouco tempo

    // Dá os prêmios
    player.experience += offline.estimatedExperience;

    // Aqui você pode adicionar itens ao inventário depois
    console.log(`%c[Offline] Você ficou offline por ${offline.timeOffline}s`, 'color:#88ffaa');
    console.log(`%c[Offline] Ganhou: ${offline.estimatedExperience} EXP + ${offline.estimatedLoot} Ouro`, 'color:#88ffaa');

    this.lastSaveTime = Date.now();
    return offline;
  }

  save() {
    this.lastSaveTime = Date.now();
  }
}