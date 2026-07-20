import { EventBus } from '../core/EventBus';

export interface Region {
  id: string;
  name: string;
  levelReq: number;
  unlocked: boolean;
  description: string;
}

export class MapSystem {
  regions: Region[] = [
    { id: 'forest', name: 'Floresta Arcana', levelReq: 1, unlocked: true, description: 'Uma floresta encantada.' },
    { id: 'crystal', name: 'Caverna Cristalina', levelReq: 10, unlocked: false, description: 'Cristais de poder.' },
    { id: 'volcano', name: 'Vulcão Flamejante', levelReq: 25, unlocked: false, description: 'Fogo e destruição.' },
    { id: 'abyss', name: 'Abismo Sombrio', levelReq: 45, unlocked: false, description: 'Trevas antigas.' },
    { id: 'celestial', name: 'Reino Celestial', levelReq: 70, unlocked: false, description: 'Poder divino.' },
  ];

  unlockRegion(regionId: string) {
    const region = this.regions.find(r => r.id === regionId);
    if (region) {
      region.unlocked = true;
      EventBus.emit('map:region_unlocked', region);
    }
  }

  getUnlockedRegions() {
    return this.regions.filter(r => r.unlocked);
  }
}