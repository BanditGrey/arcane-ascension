export class Boss {
  name: string;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  phase: number = 1;

  constructor(floor: number) {
    this.name = `Guardião do Andar ${floor}`;
    this.maxHp = 450 + (floor * 85);
    this.hp = this.maxHp;
    this.x = 900;
    this.y = 380;
  }

  update(playerX: number, playerY: number) {
    // IA simples de boss
    const dx = playerX - this.x;
    const dist = Math.abs(dx);
    if (dist > 80) this.x += dx > 0 ? 0.8 : -0.8;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#aa2222';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(this.name, this.x - 60, this.y - 55);

    // Barra de vida
    const percent = this.hp / this.maxHp;
    ctx.fillStyle = '#440000';
    ctx.fillRect(this.x - 45, this.y - 70, 90, 8);
    ctx.fillStyle = '#ff3333';
    ctx.fillRect(this.x - 45, this.y - 70, 90 * percent, 8);
  }
}