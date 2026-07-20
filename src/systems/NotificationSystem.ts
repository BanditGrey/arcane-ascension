import { EventBus } from '../core/EventBus';

export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: number;
}

export class NotificationSystem {
  notifications: Notification[] = [];

  notify(type: string, message: string) {
    const notification: Notification = {
      id: `notif_${Date.now()}`,
      type,
      message,
      timestamp: Date.now()
    };
    this.notifications.push(notification);
    EventBus.emit('notification:new', notification);
  }
}