const utils = {
  timerId: null,
  getColor: (opacity = 0.9) => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)}, ${opacity})`;
  },
  convertToRadian: (degree) => {
    return (Math.PI / 180) * degree;
  },
  timer: () => {
    const count = () => time++;
    this.timerId = setInterval(count, 1000);
  },
  clearTimer: () => {
    clearInterval(this.timerId);
  },
};
