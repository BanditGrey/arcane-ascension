import { EventBus } from '../core/EventBus';

export class ProgressionSystem {
  prestigeLevel: number = 0;
  ascensionLevel: number = 0;

  canPrestige(level: number): boolean {
    return level >= 50;
  }

  prestige(currentLevel: number) {
    if (!this.canPrestige(currentLevel)) return false;

    this.prestigeLevel++;
    EventBus.emit('progression:prestige', { prestigeLevel: this.prestigeLevel });
    return true;
  }

  ascend() {
    this.ascensionLevel++;
    EventBus.emit('progression:ascension', { ascensionLevel: this.ascensionLevel });
  }
}