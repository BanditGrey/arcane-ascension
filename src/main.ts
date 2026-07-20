import { Game } from './game/Game';
import { UIManager } from './ui/UIManager';
import { IdleGame } from './game/IdleGame';

window.addEventListener('load', async () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas não encontrado!');
    return;
  }

  const game = new Game(canvas);
  const idleGame = new IdleGame(game.player);

  game.start();

  // Inicia fase padrão
  idleGame.startPhase(1);

  // Auto attack
  setInterval(() => {
    if (idleGame.isRunning) {
      idleGame.attack(false);
    }
  }, 900);

  // Botões Idle
  const attackBtn = document.getElementById('attack-btn')!;
  const phaseBtn = document.getElementById('phase-btn')!;
  const retryBtn = document.getElementById('retry-btn')!;

  attackBtn.onclick = () => idleGame.attack(true);
  retryBtn.onclick = () => idleGame.startPhase(idleGame.currentPhase);
  phaseBtn.onclick = () => {
    const phase = prompt("Digite o número da fase (1-5):");
    if (phase) idleGame.startPhase(parseInt(phase));
  };

  // HUD Loop
  setInterval(() => {
    UIManager.updateHUD(game.player);
    UIManager.showInventory(game.player.inventory);
  }, 120);

  // Loot Offline ao carregar
  setTimeout(() => {
    idleGame.loadOfflineProgress();
  }, 2000);
});