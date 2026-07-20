export interface AppearanceBonus {
  level: number;
  name: string;
  bonuses: Record<string, number>;
}

export const appearanceStages: AppearanceBonus[] = [
  {
    level: 1,
    name: "Aprendiz",
    bonuses: {}
  },
  {
    level: 15,
    name: "Mago",
    bonuses: {
      "spell damage": 5,
      intelligence: 3
    }
  },
  {
    level: 35,
    name: "Arquimago",
    bonuses: {
      "spell damage": 10,
      mana: 8,
      "cast speed": 4
    }
  },
  {
    level: 60,
    name: "Ancião Arcano",
    bonuses: {
      "spell damage": 18,
      mana: 15,
      "mana regen": 6,
      "crit chance": 7
    }
  }
];

export class AppearanceSystem {
  getCurrentStage(level: number) {
    return appearanceStages
      .slice()
      .reverse()
      .find(stage => level >= stage.level) || appearanceStages[0];
  }

  getTotalBonuses(level: number): Record<string, number> {
    const total: Record<string, number> = {};
    
    for (const stage of appearanceStages) {
      if (level >= stage.level) {
        Object.entries(stage.bonuses).forEach(([stat, value]) => {
          total[stat] = (total[stat] || 0) + value;
        });
      }
    }
    return total;
  }
}