export class SaveSystem {
  static save(player: any) {
    const data = {
      level: player.level,
      hp: player.hp,
      mana: player.mana,
      experience: player.experience,
      proficiencies: player.proficiencies.proficiencies,
      specialization: player.specialization.current,
      inventory: player.inventory.items,
      towerFloor: (window as any).currentTowerFloor || 1
    };
    localStorage.setItem('arcane_ascension_save', JSON.stringify(data));
    console.log('%c[Jogo salvo]', 'color:#44ff88');
  }

  static load(player: any) {
    const saved = localStorage.getItem('arcane_ascension_save');
    if (!saved) return false;

    const data = JSON.parse(saved);
    player.level = data.level;
    player.hp = data.hp;
    player.mana = data.mana;
    player.experience = data.experience;
    player.proficiencies.proficiencies = data.proficiencies;
    player.specialization.current = data.specialization;
    player.inventory.items = data.inventory || [];
    
    (window as any).currentTowerFloor = data.towerFloor || 1;
    console.log('%c[Jogo carregado]', 'color:#44ff88');
    return true;
  }
}