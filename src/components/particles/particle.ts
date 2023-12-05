export class Particle {
  x: number;
  y: number;
  size: number;
  xVelocity: number;
  yVelocity: number;

  constructor(width: number, height: number) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 5;
    this.xVelocity = Math.random() - 0.5;
    this.yVelocity = Math.random() - 0.5;
  }

  update() {
    this.x += this.xVelocity;
    this.y += this.yVelocity;
    if (this.size > 0.2) this.size -= 0.1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  }
}
