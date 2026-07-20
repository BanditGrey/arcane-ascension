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
    const icebolt = AssetLoader.get('/assets/sprites/Projectiles/icebolt.png');
    const lightning = AssetLoader.get('/assets/sprites/Projectiles/lightning.png');
    const shadow = AssetLoader.get('/assets/sprites/Projectiles/shadow_bolt.png');

    let sprite = fireball;

    if (this.color.includes('#88ddff') || this.color.includes('88ddff')) sprite = icebolt;
    else if (this.color.includes('#ffff00')) sprite = lightning;
    else if (this.color.includes('#660066')) sprite = shadow;

    if (sprite) {
      ctx.drawImage(sprite, this.x - 16, this.y - 16, 32, 32);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}