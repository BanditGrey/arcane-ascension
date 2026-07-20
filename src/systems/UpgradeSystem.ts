export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  effect: (player: any) => void;
}

export class UpgradeSystem {
  upgrades: Upgrade[] = [
    {
      id: 'damage',
      name: 'Poder Arcano',
      description: '+5% Dano Mágico',
      cost: 100,
      level: 0,
      effect: (player) => { player.spellDamageMultiplier = (player.spellDamageMultiplier || 1) + 0.05; }
    },
    {
      id: 'mana',
      name: 'Reservatório de Mana',
      description: '+10 Mana Máxima',
      cost: 150,
      level: 0,
      effect: (player) => { player.maxMana += 10; }
    },
    {
      id: 'offline',
      name: 'Eficiência Offline',
      description: '+20% Loot Offline',
      cost: 300,
      level: 0,
      effect: (player) => { /* multiplicador offline */ }
    }
  ];

  buyUpgrade(id: string, player: any, gold: number): boolean {
    const upgrade = this.upgrades.find(u => u.id === id);
    if (!upgrade || gold < upgrade.cost) return false;

    upgrade.level++;
    upgrade.effect(player);
    return true;
  }
}