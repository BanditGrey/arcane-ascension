import { AssetLoader } from '../assets/AssetLoader';

export class Enemy {
  x: number;
  y: number;
  hp: number = 75;
  maxHp: number = 75;
  speed: number = 1.3;
  size: number = 24;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  update(playerX: number, playerY: number) {
    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    
    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;
  }

  render(ctx: CanvasRenderingContext2D) {
    const goblin = AssetLoader.get('/assets/sprites/Enemies/goblin_mage.png');

    if (goblin) {
      ctx.drawImage(goblin, this.x - 24, this.y - 28, 48, 56);
    } else {
      ctx.fillStyle = '#aa3344';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#fff';
    ctx.font = '11px Arial';
    ctx.fillText('Goblin Mago', this.x - 28, this.y - 38);
  }
}