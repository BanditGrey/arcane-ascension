import { Game } from './game/Game';
import { UIManager } from './ui/UIManager';
import { IdleGame } from './game/IdleGame';
import { phases } from './systems/PhaseSystem';

window.addEventListener('load', async () => {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  if (!canvas) return;

  const game = new Game(canvas);
  const idleGame = new IdleGame(game.player);

  game.start();
  idleGame.startPhase(1);

  // === COMBATE AUTOMÁTICO ===
  setInterval(() => {
    if (idleGame.isRunning) {
      idleGame.attack(false);
      updatePhaseProgress(idleGame);
    }
  }, 850);

  // === RENDERIZAR FASES ===
  function renderRegions() {
    const container = document.getElementById('region-list')!;
    container.innerHTML = '';

    phases.forEach(phase => {
      const div = document.createElement('div');
      div.className = 'region-card';
      div.innerHTML = `
        <strong>${phase.name}</strong><br>
        <small>Nível ${phase.levelReq} • ${phase.enemyCount} inimigos</small>
      `;
      div.onclick = () => {
        idleGame.startPhase(phase.id);
        game.setPhase?.(phase.id);
        updatePhaseProgress(idleGame);
      };
      container.appendChild(div);
    });
  }
  renderRegions();

  // === ATUALIZAR PROGRESSO DA FASE ===
  function updatePhaseProgress(idle: any) {
    const phase = phases.find(p => p.id === idle.currentPhase);
    if (!phase) return;

    const progress = Math.min((idle.enemiesKilled / phase.enemyCount) * 100, 100);
    const progressEl = document.getElementById('phase-progress') as HTMLElement;
    const killsEl = document.getElementById('phase-kills');

    if (progressEl) progressEl.style.width = `${progress}%`;
    if (killsEl) killsEl.textContent = `${idle.enemiesKilled} / ${phase.enemyCount}`;
  }

  // === NAVEGAÇÃO INFERIOR ===
  document.querySelectorAll('.nav-icon').forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.getAttribute('data-panel')!;
      updateRightPanel(panel);
    });
  });

  // Inicia com o painel de Personagem aberto
  updateRightPanel('character');

  function updateRightPanel(panel: string) {
    const title = document.getElementById('panel-title')!;
    const content = document.getElementById('panel-content')!;

    content.innerHTML = '';

    switch (panel) {
      case 'character':
        title.textContent = 'Personagem';
        content.innerHTML = `
          <div style="text-align:center; margin-bottom:16px;">
            <div style="width:80px;height:80px;background:#3a2a55;border-radius:50%;margin:0 auto;border:3px solid #d4af77;"></div>
            <h4 style="margin:12px 0 4px;">Arquimago</h4>
            <p style="margin:0;color:#aaa;">Nível ${game.player.level} • Poder ${Math.floor(game.player.level * 14)}</p>
          </div>
          <div style="font-size:14px;line-height:1.6;">
            <div>Inteligência: <strong>${game.player.intelligence}</strong></div>
            <div>Vitalidade: <strong>28</strong></div>
            <div>Sabedoria: <strong>35</strong></div>
          </div>
        `;
        break;

      case 'inventory':
        title.textContent = 'Inventário';
        content.innerHTML = `
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">
            ${Array.from({length: Math.min(12, game.player.inventory.items.length || 8)}).map(() => 
              `<div style="background:#1f2a4d;height:52px;border-radius:8px;border:1px solid #334466;"></div>`
            ).join('')}
          </div>
          <p style="margin-top:12px;font-size:13px;color:#888;">${game.player.inventory.items.length} itens</p>
        `;
        break;

      case 'grimoire':
        title.textContent = 'Grimório';
        content.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div style="background:#1f2a4d;padding:10px;border-radius:8px;border:1px solid #334466;">
              🔥 Bola de Fogo <span style="float:right;color:#888;">Lv. 18</span>
            </div>
            <div style="background:#1f2a4d;padding:10px;border-radius:8px;border:1px solid #334466;">
              ❄️ Raio de Gelo <span style="float:right;color:#888;">Lv. 14</span>
            </div>
            <div style="background:#1f2a4d;padding:10px;border-radius:8px;border:1px solid #334466;">
              ⚡ Raio Arcano <span style="float:right;color:#888;">Lv. 9</span>
            </div>
          </div>
        `;
        break;

      case 'forge':
        title.textContent = 'Forja';
        content.innerHTML = `
          <div style="margin-bottom:12px;">
            <strong>Receitas Disponíveis</strong>
          </div>
          <button style="width:100%;margin-bottom:8px;">Forjar Cajado Flamejante</button>
          <button style="width:100%;margin-bottom:8px;">Forjar Anel Arcano</button>
          <button style="width:100%;">Encantar Item</button>
        `;
        break;

      case 'tower':
        title.textContent = 'Torre Infinita';
        content.innerHTML = `
          <div style="text-align:center;">
            <div style="font-size:42px;margin:10px 0;">🏰</div>
            <p><strong>Andar Atual:</strong> 12</p>
            <p><strong>Recorde Pessoal:</strong> 47</p>
            <button style="margin-top:16px;width:100%;">Entrar na Torre</button>
          </div>
        `;
        break;

      default:
        title.textContent = 'Informações';
        content.innerHTML = `<p>Selecione uma opção no menu inferior.</p>`;
    }
  }

  // HUD Loop
  setInterval(() => {
    UIManager.updateHUD(game.player);
  }, 200);
});