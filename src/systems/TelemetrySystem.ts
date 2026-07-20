import { EventBus } from '../core/EventBus';

export class TelemetrySystem {
  private stats: Record<string, number> = {
    timeOnline: 0,
    sessions: 0,
    kills: 0,
    lootObtained: 0,
    crafts: 0,
    levelsGained: 0,
  };

  track(event: string, value: number = 1) {
    if (this.stats[event] !== undefined) {
      this.stats[event] += value;
    }
    EventBus.emit('telemetry:tracked', { event, value });
  }

  getStats() {
    return this.stats;
  }
}