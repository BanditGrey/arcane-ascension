import { Player } from './Player';
import { InputManager } from './InputManager';
import { Enemy } from './Enemy';
import { Projectile } from './Projectile';
import { spells } from '../data/spells';
import { ParticleSystem } from '../vfx/ParticleSystem';
import { TowerSystem } from '../systems/TowerSystem';
import { Boss } from '../systems/BossSystem';
import { SaveSystem } from '../systems/SaveSystem';
import { AssetLoader } from '../assets/AssetLoader';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  input: InputManager;
  enemies: Enemy[] = [];
  projectiles: Projectile[] = [];
  particleSystem = new ParticleSystem();
  tower = new TowerSystem();
  currentBoss: Boss | null = null;
  lastTime: number = 0;
  running: boolean = false;
  spawnTimer: number = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    this.player = new Player();
    this.input = new InputManager();
    
    this.setupInput();
    this.spawnInitialEnemies();
    
    // Carrega sprites reais
    AssetLoader.preloadAll();
  }

  setupInput() {
    window.addEventListener('keydown', (e) => {
      this.input.onKeyDown(e);
      
      // Hotbar de Magias
      if (e.key === '1') this.player.switchSpell('fireball');
      if (e.key === '2') this.player.switchSpell('icebolt');
      if (e.key === '3') this.player.switchSpell('lightning');
      if (e.key === '4') this.player.switchSpell('shadow_bolt');

      // Equipamento de Cajados (teste)
      if (e.key === '5') this.player.equipStaff('staff_basic');
      if (e.key === '6') this.player.equipStaff('staff_fire');
      if (e.key === '7') this.player.equipStaff('staff_ice');
      if (e.key === '8') this.player.equipStaff('staff_lightning');
      if (e.key === '9') this.player.equipStaff('staff_shadow');
      if (e.key === '0') this.player.equipStaff('staff_crystal');
      
      // Save / Load
      if (e.key.toLowerCase() === 'k') SaveSystem.save(this.player);
      if (e.key.toLowerCase() === 'l') SaveSystem.load(this.player);
    });
    
    window.addEventListener('keyup', (e) => this.input.onKeyUp(e));
    
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const targetX = e.clientX - rect.left;
      const targetY = e.clientY - rect.top;

      const result = this.player.castSpell(targetX, targetY, this.ctx);
      if (!result) return;

      const { spell } = result;
      const proj = new Projectile(this.player.x, this.player.y, targetX, targetY, spell.damage, spell.projectileColor);
      this.projectiles.push(proj);

      this.player.proficiencies.gainProficiency(spell.element + ' Magic', 0.45);
      this.particleSystem.emit(this.player.x, this.player.y - 12, 8, spell.projectileColor, 3);
    });
  }

  spawnInitialEnemies() {
    for (let i = 0; i < 6; i++) {
      this.enemies.push(new Enemy(650 + Math.random() * 480, 180 + Math.random() * 420));
    }
  }

  start() {
    this.running = true;
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  gameLoop(timestamp: number = 0) {
    if (!this.running) return;

    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(delta);
    this.render();

    requestAnimationFrame(this.gameLoop.bind(this));
  }

  update(delta: number) {
    this.player.update(delta, this.input);

    this.spawnTimer += delta;
    if (this.spawnTimer > 3800 && this.enemies.length < 15) {
      this.enemies.push(new Enemy(Math.random() * 1150 + 80, Math.random() * 620 + 70));
      this.spawnTimer = 0;
    }

    this.enemies.forEach(enemy => enemy.update(this.player.x, this.player.y));

    this.projectiles.forEach(p => {
      p.update();
      this.enemies.forEach(enemy => {
        const dx = enemy.x - p.x;
        const dy = enemy.y - p.y;
        if (Math.hypot(dx, dy) < 24 && p.alive) {
          enemy.hp -= p.damage;
          p.alive = false;
          this.particleSystem.emit(p.x, p.y, 14, '#ff6600', 5);
          if (enemy.hp <= 0) {
            this.player.experience += 22;
            this.player.proficiencies.gainProficiency('Fire Magic', 0.7);
            this.particleSystem.emit(enemy.x, enemy.y, 25, '#aa3344', 6);
          }
        }
      });
    });

    this.projectiles = this.projectiles.filter(p => p.alive);
    this.enemies = this.enemies.filter(e => e.hp > 0);
    this.particleSystem.update();

    // Vitória no andar (exemplo simples)
    if (this.enemies.length === 0 && !this.currentBoss && Math.random() < 0.03) {
      this.tower.ascend();
      this.spawnInitialEnemies();
    }
  }

  render() {
    this.ctx.fillStyle = '#0d0d22';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Grid mágico
    this.ctx.strokeStyle = '#1f1f44';
    for (let x = 0; x < this.canvas.width; x += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(x, 0); this.ctx.lineTo(x, this.canvas.height); this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += 40) {
      this.ctx.beginPath(); this.ctx.moveTo(0, y); this.ctx.lineTo(this.canvas.width, y); this.ctx.stroke();
    }

    this.enemies.forEach(enemy => enemy.render(this.ctx));
    this.projectiles.forEach(p => p.render(this.ctx));
    this.player.render(this.ctx);
    this.particleSystem.render(this.ctx);

    // UI Torre
    this.ctx.fillStyle = '#ffdd88';
    this.ctx.font = 'bold 17px Arial';
    this.ctx.fillText(`Torre Infinita — Andar ${this.tower.floor}`, 32, 695);
    
    // Hotbar
    this.ctx.fillStyle = '#334455';
    this.ctx.fillRect(480, 660, 320, 50);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '14px Arial';
    this.ctx.fillText(`1-4: Magias  |  5-0: Cajados (Basic/Fire/Ice/Lightning/Shadow/Crystal)`, 470, 692);
  }
}