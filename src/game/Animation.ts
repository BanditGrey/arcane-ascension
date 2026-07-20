export class Animation {
  private frame = 0;
  private timer = 0;
  private readonly frameDuration: number;

  constructor(
    public readonly totalFrames: number,
    public readonly speed: number,
    public loop: boolean = true
  ) {
    this.frameDuration = speed;
  }

  update(delta: number) {
    this.timer += delta;
    if (this.timer >= this.frameDuration) {
      this.timer = 0;
      this.frame = (this.frame + 1) % this.totalFrames;
      if (!this.loop && this.frame === 0) this.frame = this.totalFrames - 1;
    }
  }

  getCurrentFrame(): number {
    return this.frame;
  }

  reset() {
    this.frame = 0;
    this.timer = 0;
  }
}