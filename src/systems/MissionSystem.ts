import { EventBus } from '../core/EventBus';

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'main';
  progress: number;
  goal: number;
  completed: boolean;
  reward: any;
}

export class MissionSystem {
  missions: Mission[] = [
    { id: 'kill_10', title: 'Caçador Iniciante', description: 'Mate 10 inimigos', type: 'daily', progress: 0, goal: 10, completed: false, reward: { gold: 100 } },
    { id: 'reach_phase_3', title: 'Explorador', description: 'Alcance a Fase 3', type: 'main', progress: 0, goal: 3, completed: false, reward: { gold: 500 } },
  ];

  updateProgress(missionId: string, amount: number = 1) {
    const mission = this.missions.find(m => m.id === missionId);
    if (!mission || mission.completed) return;

    mission.progress += amount;
    if (mission.progress >= mission.goal) {
      mission.completed = true;
      EventBus.emit('mission:completed', mission);
    }
  }
}