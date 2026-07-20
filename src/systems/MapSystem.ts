import { EventBus } from '../core/EventBus';

export interface Region {
  id: string;
  name: string;
  levelReq: number;
  unlocked: boolean;
}

export class MapSystem {
  regions: Region[] = [
    { id: 'forest', name: 'Floresta Arcana', levelReq: 1, unlocked: true },
    { id: 'crystal_cave', name: 'Caverna Cristalina', levelReq: 10, unlocked: false },
    { id: 'volcano', name: 'Vulcão Flamejante', levelReq: 25, unlocked: false },
    { id: 'abyss', name: 'Abismo Sombrio', levelReq: 45, unlocked: false },
    { id: 'celestial', name: 'Reino Celestial', levelReq: 70, unlocked: false },
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