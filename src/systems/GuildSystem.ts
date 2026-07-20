import { EventBus } from '../core/EventBus';

export interface Guild {
  id: string;
  name: string;
  leaderId: string;
  members: string[];
  level: number;
}

export class GuildSystem {
  guilds: Guild[] = [];

  createGuild(leaderId: string, name: string): Guild {
    const guild: Guild = {
      id: `guild_${Date.now()}`,
      name,
      leaderId,
      members: [leaderId],
      level: 1
    };
    this.guilds.push(guild);
    EventBus.emit('guild:created', guild);
    return guild;
  }

  joinGuild(guildId: string, playerId: string) {
    const guild = this.guilds.find(g => g.id === guildId);
    if (guild && !guild.members.includes(playerId)) {
      guild.members.push(playerId);
      EventBus.emit('guild:joined', { guild, playerId });
    }
  }
}