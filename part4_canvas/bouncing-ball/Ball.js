class Ball {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.originalRadius = radius;
    this.bgColor = getColor();
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.bgColor;
    ctx.fill();
  }
}

function getColor() {
  return `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${
    Math.random() * 256
  }, 0.6)`;
}
