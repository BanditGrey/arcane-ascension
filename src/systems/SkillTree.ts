export interface Skill {
  id: string;
  name: string;
  description: string;
  cost: number;
  unlocked: boolean;
  tree: string;
}

export class SkillTree {
  skills: Record<string, Skill> = {
    // Fogo
    fireball_mastery: { id: 'fireball_mastery', name: 'Maestria em Fogo', description: '+25% Dano de Fogo', cost: 1, unlocked: false, tree: 'Fogo' },
    meteor: { id: 'meteor', name: 'Meteoro', description: 'Invoca um meteoro devastador', cost: 3, unlocked: false, tree: 'Fogo' },
    
    // Gelo
    ice_mastery: { id: 'ice_mastery', name: 'Maestria em Gelo', description: '+20% Dano de Gelo', cost: 1, unlocked: false, tree: 'Gelo' },
    frost_nova: { id: 'frost_nova', name: 'Nova Congelante', description: 'Onda de gelo ao redor', cost: 2, unlocked: false, tree: 'Gelo' },
    
    // Arcano
    arcane_mastery: { id: 'arcane_mastery', name: 'Maestria Arcana', description: '+15% Dano Arcano', cost: 1, unlocked: false, tree: 'Arcano' },
  };

  points: number = 5;

  unlock(skillId: string): boolean {
    const skill = this.skills[skillId];
    if (!skill || skill.unlocked || this.points < skill.cost) return false;

    skill.unlocked = true;
    this.points -= skill.cost;
    return true;
  }

  addPoint() {
    this.points++;
  }
}