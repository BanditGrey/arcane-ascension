import { Equipment } from '../data/equipment';

export class EquipmentSystem {
  equipped: Record<string, Equipment | null> = {
    weapon: null,
    helmet: null,
    chest: null,
    ring1: null,
    ring2: null,
    amulet: null,
  };

  equip(item: Equipment) {
    const slot = this.getSlot(item.type);
    if (slot) this.equipped[slot] = item;
  }

  getSlot(type: string): string | null {
    if (type === 'Cajado' || type === 'Varinha') return 'weapon';
    if (type === 'Peitoral') return 'chest';
    if (type === 'Anel') return 'ring1';
    if (type === 'Amuleto') return 'amulet';
    return null;
  }

  getTotalStats(): Record<string, number> {
    const total: Record<string, number> = {};
    Object.values(this.equipped).forEach(item => {
      if (item) {
        Object.entries(item.stats).forEach(([stat, value]) => {
          total[stat] = (total[stat] || 0) + value;
        });
      }
    });
    return total;
  }
}