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

  // ==================== INTEGRAÇÃO DOS SISTEMAS ====================

  const upgradeSystem = new UpgradeSystem();
  const forgeSystem = new ForgeSystem();
  const prestigeSystem = new PrestigeSystem();

  // Render Fases
  function renderPhases() {
    const container = document.getElementById('phase-list')!;
    container.innerHTML = '';

    phases.forEach(phase => {
      const btn = document.createElement('button');
      btn.innerHTML = `
        <strong>${phase.name}</strong><br>
        <small>Nível ${phase.levelReq} • ${phase.enemyCount} inimigos</small>
      `;
      btn.onclick = () => idleGame.startPhase(phase.id);
      container.appendChild(btn);
    });
  }
  renderPhases();

  // Render Upgrades
  function renderUpgrades() {
    const container = document.getElementById('upgrades-list')!;
    container.innerHTML = '';

    upgradeSystem.upgrades.forEach(upgrade => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${upgrade.name}</strong> (Lv.${upgrade.level})<br>
        <small>${upgrade.description}</small><br>
        <button>Custa ${upgrade.cost} Ouro</button>
      `;
      div.querySelector('button')!.onclick = () => {
        if (upgradeSystem.buyUpgrade(upgrade.id, game.player, 9999)) {
          renderUpgrades();
        }
      };
      container.appendChild(div);
    });
  }
  renderUpgrades();

  // Render Forja
  function renderForge() {
    const container = document.getElementById('forge-list')!;
    container.innerHTML = '';

    forgeRecipes.forEach(recipe => {
      const div = document.createElement('div');
      div.innerHTML = `
        <strong>${recipe.name}</strong><br>
        <button>Forjar</button>
      `;
      div.querySelector('button')!.onclick = () => {
        const result = forgeSystem.craft(recipe.id, game.player.inventory);
        if (result) {
          alert(`Forjou: ${result.name}`);
        } else {
          alert('Materiais insuficientes');
        }
      };
      container.appendChild(div);
    });
  }
  renderForge();

  // Prestige
  document.getElementById('prestige-btn')!.onclick = () => {
    if (prestigeSystem.prestige(game.player)) {
      alert('Você ascendeu!');
    } else {
      alert('Nível insuficiente para Prestige');
    }
  };

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