import { EventBus } from '../core/EventBus';

export interface RankingEntry {
  playerId: string;
  name: string;
  value: number;
  rank: number;
}

export class RankingSystem {
  rankings: Record<string, RankingEntry[]> = {
    highest_level: [],
    highest_tower: [],
    most_power: [],
  };

  updateRanking(category: string, entry: RankingEntry) {
    if (!this.rankings[category]) this.rankings[category] = [];
    this.rankings[category].push(entry);
    this.rankings[category].sort((a, b) => b.value - a.value);
    EventBus.emit('ranking:updated', { category, entry });
  }
}