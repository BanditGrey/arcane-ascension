export interface Phase {
  id: number;
  name: string;
  levelReq: number;
  enemyCount: number;
  lootMultiplier: number;
  description: string;
}

export const phases: Phase[] = [
  { id: 1, name: "Floresta Arcana", levelReq: 1, enemyCount: 10, lootMultiplier: 1.0, description: "Primeiros passos do mago" },
  { id: 2, name: "Caverna Cristalina", levelReq: 10, enemyCount: 15, lootMultiplier: 1.3, description: "Cristais de poder" },
  { id: 3, name: "Vulcão Flamejante", levelReq: 25, enemyCount: 20, lootMultiplier: 1.7, description: "Fogo e destruição" },
  { id: 4, name: "Abismo Sombrio", levelReq: 45, enemyCount: 25, lootMultiplier: 2.2, description: "Trevas antigas" },
  { id: 5, name: "Reino Celestial", levelReq: 70, enemyCount: 30, lootMultiplier: 3.0, description: "Poder divino" },
];

export class PhaseSystem {
  currentPhase: number = 1;

  getCurrentPhase(): Phase {
    return phases.find(p => p.id === this.currentPhase) || phases[0];
  }

  canEnterPhase(phaseId: number, playerLevel: number): boolean {
    const phase = phases.find(p => p.id === phaseId);
    return phase ? playerLevel >= phase.levelReq : false;
  }

  completePhase() {
    if (this.currentPhase < phases.length) {
      this.currentPhase++;
    }
  }
}