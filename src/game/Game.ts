import { Player } from './Player';
import { AssetLoader } from '../assets/AssetLoader';
import { phases } from '../systems/PhaseSystem';

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  player: Player;
  lastTime: number = 0;
  running: boolean = false;
  currentPhaseId: number = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.player = new Player();
    
    AssetLoader.preloadAll();
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
    // Idle mode: player fica parado
  }

  render() {
    // Fundo mais imersivo
    this.ctx.fillStyle = '#0d0d22';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Chão com textura sutil
    this.ctx.strokeStyle = '#1a1a3a';
    for (let x = 0; x < this.canvas.width; x += 60) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += 60) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    // Desenha o mago no centro
    this.player.render(this.ctx);

    // Nome da fase
    const phase = phases.find(p => p.id === this.currentPhaseId);
    if (phase) {
      this.ctx.fillStyle = '#ffdd88';
      this.ctx.font = 'bold 18px Arial';
      this.ctx.fillText(phase.name, 40, 40);
    }
  }

  setPhase(phaseId: number) {
    this.currentPhaseId = phaseId;
  }
}