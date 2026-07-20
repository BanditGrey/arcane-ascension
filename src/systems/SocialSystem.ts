import { EventBus } from '../core/EventBus';

export interface Friend {
  id: string;
  name: string;
  level: number;
  online: boolean;
}

export class SocialSystem {
  friends: Friend[] = [];

  addFriend(friend: Friend) {
    if (!this.friends.find(f => f.id === friend.id)) {
      this.friends.push(friend);
      EventBus.emit('social:friend_added', friend);
    }
  }

  removeFriend(friendId: string) {
    this.friends = this.friends.filter(f => f.id !== friendId);
  }

  getOnlineFriends() {
    return this.friends.filter(f => f.online);
  }
}