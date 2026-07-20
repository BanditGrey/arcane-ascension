export interface GameConfig {
  graphics: {
    quality: 'low' | 'medium' | 'high' | 'ultra';
    particles: boolean;
    shadows: boolean;
  };
  audio: {
    masterVolume: number;
    musicVolume: number;
    sfxVolume: number;
  };
  interface: {
    language: string;
    showFPS: boolean;
    autoSave: boolean;
  };
  accessibility: {
    colorBlindMode: boolean;
    largeText: boolean;
  };
}

export class ConfigurationSystem {
  config: GameConfig = {
    graphics: {
      quality: 'high',
      particles: true,
      shadows: true
    },
    audio: {
      masterVolume: 0.8,
      musicVolume: 0.7,
      sfxVolume: 0.9
    },
    interface: {
      language: 'pt-BR',
      showFPS: false,
      autoSave: true
    },
    accessibility: {
      colorBlindMode: false,
      largeText: false
    }
  };

  updateConfig(newConfig: Partial<GameConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): GameConfig {
    return this.config;
  }
}