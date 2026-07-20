export class TowerSystem {
  floor: number = 1;
  maxFloor: number = 999;

  ascend() {
    this.floor++;
    console.log(`%c[Torre] Você subiu para o andar ${this.floor}`, 'color:#ffcc44');
    return this.floor;
  }

  getDifficultyMultiplier(): number {
    return 1 + (this.floor * 0.08);
  }

  getLootBonus(): number {
    return Math.floor(this.floor / 10);
  }
}