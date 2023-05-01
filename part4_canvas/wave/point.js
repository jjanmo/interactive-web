export class Point {
  constructor(x, y, index) {
    this.x = x;
    this.y = y;
    this.fixedY = y; // y 고정값(기준값)
    this.speed = 0.1;
    this.cur = index; // 현재 포인트가 몇번째 포인트인지
    this.max = Math.random() * 80 + 50;
  }

  update() {
    this.cur += this.speed;
    this.y = this.fixedY + Math.sin(this.cur) * this.max;
  }
}
