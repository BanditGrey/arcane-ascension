import { EventBus } from '../core/EventBus';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

export class AchievementSystem {
  achievements: Achievement[] = [
    { id: 'first_kill', title: 'Primeiro Sangue', description: 'Mate seu primeiro inimigo', unlocked: false },
    { id: 'level_10', title: 'Aprendiz Arcano', description: 'Alcance o nível 10', unlocked: false },
    { id: 'phase_5', title: 'Viajante das Fases', description: 'Chegue à Fase 5', unlocked: false },
  ];

  unlock(achievementId: string) {
    const ach = this.achievements.find(a => a.id === achievementId);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      EventBus.emit('achievement:unlocked', ach);
    }
  }
}