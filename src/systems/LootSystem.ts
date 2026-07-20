import { equipments } from '../data/equipment';

export class LootSystem {
  static generateLoot(floor: number) {
    const loot = [];
    const chance = 0.35 + (floor * 0.01);

    if (Math.random() < chance) {
      const index = Math.floor(Math.random() * equipments.length);
      loot.push(equipments[index]);
    }
    if (Math.random() < 0.6) {
      loot.push({ id: 'gold', name: 'Ouro', quantity: 50 + floor * 8 });
    }
    return loot;
  }
}