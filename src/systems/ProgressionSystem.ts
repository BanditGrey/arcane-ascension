import { EventBus } from '../core/EventBus';

export class ProgressionSystem {
  ascensionLevel: number = 0;

  ascend() {
    this.ascensionLevel++;
    EventBus.emit('progression:ascension', { ascensionLevel: this.ascensionLevel });
  }
}