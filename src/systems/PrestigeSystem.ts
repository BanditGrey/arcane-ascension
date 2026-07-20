export class PrestigeSystem {
  prestigeLevel: number = 0;
  prestigePoints: number = 0;

  canPrestige(playerLevel: number): boolean {
    return playerLevel >= 50;
  }

  prestige(player: any) {
    if (!this.canPrestige(player.level)) return false;

    this.prestigeLevel++;
    this.prestigePoints += Math.floor(player.level / 10);

    // Reset parcial
    player.level = 1;
    player.experience = 0;
    player.maxMana = 220;

    console.log(`%c[Prestige] Você ascendeu! Nível de Prestige: ${this.prestigeLevel}`, 'color:#ff88ff');
    return true;
  }
}