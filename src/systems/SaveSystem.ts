import { EventBus } from '../core/EventBus';

export class SaveSystem {
  static save(data: any) {
    localStorage.setItem('arcane_ascension_save', JSON.stringify(data));
    EventBus.emit('save:completed');
  }

  static load() {
    const saved = localStorage.getItem('arcane_ascension_save');
    if (saved) {
      EventBus.emit('save:loaded', JSON.parse(saved));
      return JSON.parse(saved);
    }
    return null;
  }

  static clear() {
    localStorage.removeItem('arcane_ascension_save');
  }
}