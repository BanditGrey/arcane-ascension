export class AdminSystem {
  isAdmin: boolean = false;

  enableAdminMode() {
    this.isAdmin = true;
    console.log('%c[Admin] Modo Administrador ativado', 'color:#ff5555');
  }

  createItem(name: string, rarity: string) {
    if (!this.isAdmin) return null;
    return { id: `admin_${Date.now()}`, name, rarity };
  }

  banPlayer(playerId: string) {
    if (!this.isAdmin) return;
    console.log(`%c[Admin] Jogador ${playerId} banido`, 'color:#ff5555');
  }
}