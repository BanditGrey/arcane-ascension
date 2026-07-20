export class UIManager {
  static updateHUD(player: any) {
    const hp = document.getElementById('hp')!;
    const mp = document.getElementById('mp')!;
    const level = document.getElementById('level')!;

    hp.textContent = Math.floor(player.hp).toString();
    mp.textContent = Math.floor(player.mana).toString();
    level.textContent = player.level.toString();
  }

  static showInventory(inventory: any) {
    const panel = document.getElementById('inventory-grid')!;
    panel.innerHTML = '';

    inventory.items.forEach((item: any, index: number) => {
      const slot = document.createElement('div');
      slot.className = 'inventory-slot';
      slot.innerHTML = `<span title="${item.name}">${item.type[0]}</span>`;
      panel.appendChild(slot);
    });
  }
}