import { Point } from './point.js';

export class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }

  resize(width, height) {
    this.centerX = width / 2;
    this.centerY = height / 2;

    this.pointGap = width / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.pointGap * i, this.centerY, this.index + i);
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY); // 첫번째 포인트는 업데이트 되지않는다!

    for (let i = 1; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        // 마지막 포인트는 업데이트 되지않는다!
        this.points[i].update();
      }

      // 이전값과 현재값의 중간값
      const midX = (prevX + this.points[i].x) / 2;
      const midY = (prevY + this.points[i].y) / 2;

      // ctx.lineTo(midX, midY); // 직선
      ctx.quadraticCurveTo(prevX, prevY, midX, midY); // 곡선

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY); // 마지막 포인트 연결
    ctx.lineTo(window.innerWidth, window.innerHeight); // 우측 하단
    ctx.lineTo(this.points[0].x, window.innerHeight); // 좌측 하단
    ctx.fill(); // 하단 채우기
    ctx.closePath();
  }
}

export class WaveGroup {
  constructor() {
    this.totalWaves = 3;
    this.totalPoints = 6;

    this.color = [
      'rgba(0, 199, 235, 0.4)',
      'rgba(0, 146, 199, 0.4)',
      'rgba(0, 87, 158, 0.4)',
    ];

    this.waves = [];

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i]);
      this.waves[i] = wave;
    }
  }

  resize(width, height) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.resize(width, height);
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx);
    }
  }
}
