class Box {
  constructor(text, x, y, side) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.side = side;
    this.speed = Math.random() * 10 + 1;
    this.color = utils.getColor(0.7);
    this.scale = 1;
    this.scaleSpeed = Math.random() * 0.05;
    this.isIncreasing = false;
    this.degree = Math.random() * 360;
    this.draw();
  }

  draw() {
    context.beginPath();
    context.save();
    context.resetTransform();
    context.fillStyle = this.color;
    context.translate(this.x + this.side / 2, this.y + this.side / 2);
    context.scale(this.scale, this.scale);
    context.rotate(utils.convertToRadian(this.degree));
    context.translate(-(this.x + this.side / 2), -(this.y + this.side / 2));
    context.fillRect(this.x, this.y, this.side, this.side);
    context.restore();
  }

  write() {
    context.fillStyle = 'white';
    context.fillText(this.text, this.x + this.side / 2, this.y + this.side / 2);
  }
}
