export class InterfaceSystem {
  openWindow(windowName: string) {
    console.log(`[UI] Abrindo janela: ${windowName}`);
    // Aqui seria a lógica real de abrir painéis
  }

  closeWindow(windowName: string) {
    console.log(`[UI] Fechando janela: ${windowName}`);
  }

  showNotification(message: string, type: 'success' | 'warning' | 'error' = 'success') {
    console.log(`[UI] Notificação [${type}]: ${message}`);
  }

  updateHUD(data: any) {
    // Atualiza HUD em tempo real
  }
}