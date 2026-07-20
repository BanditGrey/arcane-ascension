import { EventBus } from '../core/EventBus';

export class TelemetrySystem {
  private data: Record<string, any> = {
    timeOnline: 0,
    sessions: 0,
    kills: 0,
    lootObtained: 0,
    crafts: 0,
  };

  track(event: string, value: number = 1) {
    if (this.data[event] !== undefined) {
      this.data[event] += value;
    }
    EventBus.emit('telemetry:tracked', { event, value });
  }

  getStats() {
    return this.data;
  }
}