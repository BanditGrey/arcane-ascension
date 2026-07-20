import { AssetLoader } from '../assets/AssetLoader';
import { EquipmentSystem } from '../systems/EquipmentSystem';

export class StaffRenderer {
  static getStaffSprite(equipment: EquipmentSystem): HTMLImageElement | null {
    const weapon = equipment.equipped.weapon;

    if (!weapon) {
      return AssetLoader.get('/assets/sprites/Weapons/staff_basic.png');
    }

    const name = weapon.name.toLowerCase();

    if (name.includes('fogo') || name.includes('fire')) {
      return AssetLoader.get('/assets/sprites/Weapons/staff_fire.png');
    }
    if (name.includes('arcano') || name.includes('arcane')) {
      return AssetLoader.get('/assets/sprites/Weapons/staff_arcane.png');
    }
    if (name.includes('vazio') || name.includes('void')) {
      return AssetLoader.get('/assets/sprites/Weapons/staff_void.png');
    }

    return AssetLoader.get('/assets/sprites/Weapons/staff_basic.png');
  }
}