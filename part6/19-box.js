class Box {
  constructor(text, x, y, side, speed) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.side = side;
    this.speed = speed;
    this.color = utils.getColor(0.6);
    this.draw();
  }

  draw() {
    context.beginPath();
    context.save();
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.side, this.side);
    context.fillStyle = 'white';
    context.fillText(this.text, this.x + 10, this.y + 30);
    context.restore();
  }
}
