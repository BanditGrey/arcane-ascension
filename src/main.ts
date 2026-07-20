import { Game } from './game/Game';
import { UIManager } from './ui/UIManager';
import { IdleGame } from './game/IdleGame';
import { phases } from './systems/PhaseSystem';

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
  const retryBtn = document.getElementById('retry-btn')!;

  attackBtn.onclick = () => idleGame.attack(true);
  retryBtn.onclick = () => idleGame.startPhase(idleGame.currentPhase);

  // Sistema de Abas
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const tab = btn.getAttribute('data-tab')!;
      document.getElementById(`tab-${tab}`)!.classList.add('active');
    });
  });

  // Gerar lista de fases
  function renderPhases() {
    const container = document.getElementById('phase-list')!;
    container.innerHTML = '';

    phases.forEach(phase => {
      const btn = document.createElement('button');
      btn.innerHTML = `
        <strong>${phase.name}</strong><br>
        <small>Nível ${phase.levelReq} • ${phase.enemyCount} inimigos</small>
      `;
      btn.onclick = () => {
        if (idleGame.startPhase(phase.id)) {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        }
      };
      container.appendChild(btn);
    });
  }
  renderPhases();

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