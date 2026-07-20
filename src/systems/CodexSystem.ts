import { EventBus } from '../core/EventBus';

export interface CodexEntry {
  id: string;
  type: 'monster' | 'boss' | 'item' | 'spell';
  name: string;
  discovered: boolean;
  description: string;
}

export class CodexSystem {
  entries: CodexEntry[] = [];

  discover(type: string, name: string, description: string) {
    const entry: CodexEntry = {
      id: `${type}_${name.toLowerCase().replace(/\s/g, '_')}`,
      type: type as any,
      name,
      discovered: true,
      description
    };
    this.entries.push(entry);
    EventBus.emit('codex:discovered', entry);
  }

  getDiscovered() {
    return this.entries.filter(e => e.discovered);
  }
}