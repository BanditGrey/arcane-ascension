export class ProficiencySystem {
  proficiencies: Record<string, number> = {
    'Fire Magic': 1,
    'Ice Magic': 1,
    'Lightning Magic': 1,
    'Arcano': 1,
    'Staff Mastery': 1,
    'Mana Control': 1,
  };

  gainProficiency(skill: string, amount: number = 0.3) {
    if (!this.proficiencies[skill]) this.proficiencies[skill] = 1;
    this.proficiencies[skill] += amount;

    // Auto level up bonuses
    if (this.proficiencies[skill] % 10 === 0) {
      console.log(`[Proficiência] ${skill} subiu para nível ${Math.floor(this.proficiencies[skill])}!`);
    }
  }

  getLevel(skill: string): number {
    return Math.floor(this.proficiencies[skill] || 1);
  }
}