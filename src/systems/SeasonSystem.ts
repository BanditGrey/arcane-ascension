import { EventBus } from '../core/EventBus';

export interface Season {
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  active: boolean;
}

export class SeasonSystem {
  currentSeason: Season | null = null;
  seasons: Season[] = [];

  startNewSeason(name: string, durationDays: number) {
    const now = Date.now();
    const season: Season = {
      id: this.seasons.length + 1,
      name,
      startDate: now,
      endDate: now + (durationDays * 24 * 60 * 60 * 1000),
      active: true
    };
    this.seasons.push(season);
    this.currentSeason = season;
    EventBus.emit('season:started', season);
  }
}