const imageEffect = [
  {
    col: 8,
    row: 4,
    style: (i, j) => `transition-delay: ${(8 - i - j * 0.5) * 0.25}s`,
  },
  {
    col: 8,
    row: 4,
    style: (i, j) => `transform: translateX(100%); transition-delay: ${(8 - i - j * 0.5) * 0.25}s`,
  },
  {
    col: 8,
    row: 4,
    style: (i, j) => `transform: skew(-45deg); transition-delay: ${(8 - i - j * 0.5) * 0.25}s`,
  },
  {
    col: 8,
    row: 4,
    style: (i, j) => `transform: rotate(45deg); transition-delay: ${(8 - i - j * 0.5) * 0.25}s`,
  },
  {
    col: 8,
    row: 4,
    style: (i, j) => `transform: scale(0.3); transition-delay: ${(8 - i - j * 0.5) * 0.25}s`,
  },
  {
    col: 8,
    row: 4,
    style: (i, j) =>
      `transform: translateX(100%) skew(-45deg) rotate(45deg) scale(0.3); transition-delay: ${
        (8 - i - j * 0.5) * 0.25
      }s`,
  },
  {
    col: 4,
    row: 1,
    style: [
      'transform-origin: 0 50%; transform: scale(0.1); transition-delay: 0.3s;',
      'transform-origin: 0 50%; transform: scale(0.2); transition-delay: 0.1s;',
      'transform-origin: 0 50%; transform: scale(0.3); transition-delay: 0.7s;',
      'transform-origin: 0 50%; transform: scale(0.4); transition-delay: 1.2s;',
    ],
  },
  {
    col: 4,
    row: 1,
    style: [
      'transform-origin: 0 50%; transform: rotate(20deg); transition-delay: 0.3s;',
      'transform-origin: 0 50%; transform: rotate(-10deg); transition-delay: 0.1s;',
      'transform-origin: 0 50%; transform: rotate(10deg); transition-delay: 0.7s;',
      'transform-origin: 0 50%; transform: rotate(-15deg); transition-delay: 1.2s;',
    ],
  },
  {
    col: 4,
    row: 1,
    style: [
      'transform-origin: 0 50%; transform: rotateX(-100deg); transition-delay: 0.3s;',
      'transform-origin: 0 50%; transform: rotateX(-100deg); transition-delay: 0.1s;',
      'transform-origin: 0 50%; transform: rotateX(-100deg); transition-delay: 0.7s;',
      'transform-origin: 0 50%; transform: rotateX(-100deg); transition-delay: 1.2s;',
    ],
  },
  {
    col: 4,
    row: 1,
    style: [
      'transform-origin: 0 50%; transform: scale(0.2) skew(40deg) rotate(20deg); transition-delay: 0.3s;',
      'transform-origin: 0 50%; transform: scale(0.2) skew(40deg) rotate(-20deg); transition-delay: 0.3s;',
      'transform-origin: 100% 100%; transform: scale(0.2) skew(60deg) rotate(-40deg); transition-delay: 1.2s;',
      'transform-origin: 0 100%; transform: scale(0.2) skew(-60deg) rotate(40deg); transition-delay: 1.2s;',
    ],
  },
  {
    col: 4,
    row: 1,
    style: [
      'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.3s',
      'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.1s',
      'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 0.9s',
      'transform-origin:0% 50%; transform: perspective(450px) rotateX(-100deg); transition-delay: 1.2s',
    ],
  },
  {
    col: 12,
    row: 1,
    style: [
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 0.3s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 0.6s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 0.9s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 1.2s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 1.5s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 1.8s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 2.1s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 2.4s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 2.7s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 3.0s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 3.3s',
      'transform-style: preserve-3d; transform-origin:0% 50%; transform: perspective(450px) rotateY(100deg); scale(0.5); transition-delay: 3.6s',
    ],
  },
  {
    col: 2,
    row: 1,
    style: [
      'transform-origin:0% 50%; transform: perspective(450px) rotateY(80deg); transition-duration:3s;',
      'transform-origin:100% 50%; transform: perspective(450px) rotateY(-80deg); transition-duration:3s;',
    ],
  },
];
