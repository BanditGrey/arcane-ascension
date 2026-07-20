import { EventBus } from '../core/EventBus';

export interface LootItem {
  id: string;
  name: string;
  rarity: string;
  quantity: number;
}

export class LootSystem {
  generateLoot(phase: number): LootItem | null {
    const roll = Math.random();

    let rarity = 'Comum';
    if (roll > 0.95) rarity = 'Épico';
    else if (roll > 0.80) rarity = 'Raro';
    else if (roll > 0.50) rarity = 'Incomum';

    const item: LootItem = {
      id: `item_${Date.now()}`,
      name: `Item ${rarity} Fase ${phase}`,
      rarity: rarity,
      quantity: 1
    };

    EventBus.emit('loot:generated', item);
    return item;
  }
}