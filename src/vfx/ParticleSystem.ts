export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
  gravity: number = 0;

  constructor(x: number, y: number, vx: number, vy: number, life: number, size: number, color: string) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.life = life;
    this.maxLife = life;
    this.size = size;
    this.color = color;
    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.life--;
    this.alpha = this.life / this.maxLife;
    this.size *= 0.98;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class ParticleSystem {
  particles: Particle[] = [];

  emit(x: number, y: number, count: number, color: string, spread = 3) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * spread + 0.5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 1.5;
      const life = 25 + Math.random() * 35;
      const size = 2 + Math.random() * 3;
      this.particles.push(new Particle(x, y, vx, vy, life, size, color));
    }
  }

  update() {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);
  }

  render(ctx: CanvasRenderingContext2D) {
    this.particles.forEach(p => p.render(ctx));
  }
}