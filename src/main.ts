import { Game } from './game/Game';
import { UIManager } from './ui/UIManager';

window.addEventListener('load', async () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas não encontrado!');
    return;
  }

  const game = new Game(canvas);
  game.start();

  // HUD Loop
  setInterval(() => {
    UIManager.updateHUD(game.player);
    UIManager.showInventory(game.player.inventory);
  }, 120);
});