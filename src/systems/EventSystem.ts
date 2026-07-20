import { EventBus } from '../core/EventBus';

export interface GameEvent {
  id: string;
  name: string;
  description: string;
  active: boolean;
  endTime: number;
}

export class EventSystem {
  events: GameEvent[] = [
    { id: 'double_xp', name: 'Double XP', description: 'Ganhe o dobro de experiência!', active: false, endTime: 0 },
    { id: 'double_loot', name: 'Double Loot', description: 'Mais itens dropam!', active: false, endTime: 0 },
  ];

  activateEvent(eventId: string, durationMinutes: number) {
    const event = this.events.find(e => e.id === eventId);
    if (!event) return;

    event.active = true;
    event.endTime = Date.now() + (durationMinutes * 60 * 1000);
    EventBus.emit('event:started', event);
  }

  checkActiveEvents() {
    const now = Date.now();
    this.events.forEach(event => {
      if (event.active && now > event.endTime) {
        event.active = false;
        EventBus.emit('event:ended', event);
      }
    });
  }
}