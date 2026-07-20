import { EventBus } from '../core/EventBus';

export interface ShopItem {
  id: string;
  name: string;
  type: 'cosmetic' | 'portal' | 'pet';
  price: number;
  currency: 'gold' | 'crystals';
}

export class ShopSystem {
  items: ShopItem[] = [
    { id: 'skin_fire', name: 'Skin Fogo Arcano', type: 'cosmetic', price: 500, currency: 'gold' },
    { id: 'portal_void', name: 'Portal do Vazio', type: 'portal', price: 1200, currency: 'gold' },
    { id: 'pet_dragon', name: 'Dragão Familiar', type: 'pet', price: 800, currency: 'crystals' },
  ];

  purchase(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (!item) return null;

    EventBus.emit('shop:purchased', item);
    return item;
  }
}