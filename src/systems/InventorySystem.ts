import { EventBus } from '../core/EventBus';
import { LootItem } from './LootSystem';

export class InventorySystem {
  items: any[] = [];

  addItem(item: LootItem) {
    this.items.push(item);
    EventBus.emit('inventory:item_added', item);
  }

  getItems() {
    return this.items;
  }

  clear() {
    this.items = [];
  }
}