import { EventBus } from '../core/EventBus';

export interface SkillNode {
  id: string;
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
}

export class SkillTreeSystem {
  nodes: Record<string, SkillNode> = {
    fireball_mastery: { id: 'fireball_mastery', name: 'Maestria em Fogo', description: '+25% Dano de Fogo', cost: 1, unlocked: false },
    ice_mastery: { id: 'ice_mastery', name: 'Maestria em Gelo', description: '+20% Dano de Gelo', cost: 1, unlocked: false },
    arcane_mastery: { id: 'arcane_mastery', name: 'Maestria Arcana', description: '+15% Dano Arcano', cost: 1, unlocked: false },
    meteor: { id: 'meteor', name: 'Meteoro', description: 'Invoca um meteoro devastador', cost: 3, unlocked: false },
  };

  points: number = 5;

  unlock(nodeId: string): boolean {
    const node = this.nodes[nodeId];
    if (!node || node.unlocked || this.points < node.cost) return false;

    node.unlocked = true;
    this.points -= node.cost;
    EventBus.emit('skill:unlocked', node);
    return true;
  }

  reset() {
    Object.values(this.nodes).forEach(n => n.unlocked = false);
    this.points = 5;
  }
}