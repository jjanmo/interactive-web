const utils = {
  getColor: (opacity = 0.9) => {
    return `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
      Math.random() * 256
    )},${Math.floor(Math.random() * 256)}, ${opacity})`;
  },
};
