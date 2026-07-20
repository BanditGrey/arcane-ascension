import { Item } from '../data/items';

export class Inventory {
  items: Item[] = [];
  maxSlots: number = 25;

  addItem(item: Item): boolean {
    if (this.items.length >= this.maxSlots) return false;
    this.items.push(item);
    return true;
  }

  removeItem(index: number): Item | null {
    return this.items.splice(index, 1)[0] || null;
  }
}