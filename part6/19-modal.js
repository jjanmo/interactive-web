class Modal {
  constructor() {
    this.cX = canvas.width / 2;
    this.cY = canvas.height / 2;
    this.scaleValue = 0.01;
  }

  draw() {
    context.beginPath();
    context.save();
    context.resetTransform();
    context.translate(this.cX, this.cY);
    context.scale(this.scaleValue, this.scaleValue);
    context.translate(-this.cX, -this.cY);
    context.fillStyle = '#f1c40f';
    context.fillRect(this.cX - 200, this.cY - 200, 400, 400);
    context.restore();
  }

  showResult(time) {
    const text = `${time}초 걸림 🎉`;
    context.font = 'bold 40px serif';
    context.fillStyle = 'white';
    context.fillText(text, this.cX - 100, this.cY);
  }
}
