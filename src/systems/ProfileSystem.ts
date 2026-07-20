import { EventBus } from '../core/EventBus';

export class ProfileSystem {
  getProfile(character: any) {
    return {
      name: character.name,
      level: character.level,
      power: Math.floor(character.level * 12 + (character.intelligence || 0) * 5),
      specialization: character.specialization?.current || 'Aprendiz',
      equipmentCount: Object.values(character.equipment?.equipped || {}).filter(Boolean).length
    };
  }

  inspectPlayer(targetCharacter: any) {
    EventBus.emit('profile:inspected', this.getProfile(targetCharacter));
    return this.getProfile(targetCharacter);
  }
}