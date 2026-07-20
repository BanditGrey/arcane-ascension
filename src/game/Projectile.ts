import { AssetLoader } from '../assets/AssetLoader';

export class Projectile {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number = 9.5;
  damage: number;
  color: string;
  alive: boolean = true;

  constructor(x: number, y: number, targetX: number, targetY: number, damage: number, color: string) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.color = color;
  }

  update() {
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    this.x += (dx / dist) * this.speed;
    this.y += (dy / dist) * this.speed;

    if (dist < 14) this.alive = false;
  }

  render(ctx: CanvasRenderingContext2D) {
    const fireball = AssetLoader.get('/assets/sprites/Projectiles/fireball.png');

    if (fireball) {
      ctx.drawImage(fireball, this.x - 14, this.y - 14, 28, 28);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}