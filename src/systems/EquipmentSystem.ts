import { EventBus } from '../core/EventBus';

export class EquipmentSystem {
  equipped: Record<string, any> = {
    weapon: null,
    helmet: null,
    chest: null,
    ring1: null,
    ring2: null,
    amulet: null
  };

  equip(item: any, slot: string) {
    this.equipped[slot] = item;
    EventBus.emit('equipment:equipped', { item, slot });
  }

  unequip(slot: string) {
    this.equipped[slot] = null;
    EventBus.emit('equipment:unequipped', { slot });
  }

  getTotalStats() {
    let total: Record<string, number> = {};
    Object.values(this.equipped).forEach(item => {
      if (item && item.stats) {
        Object.entries(item.stats).forEach(([stat, value]: any) => {
          total[stat] = (total[stat] || 0) + value;
        });
      }
    });
    return total;
  }
}