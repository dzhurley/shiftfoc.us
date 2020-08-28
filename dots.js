const TWO_PI = Math.PI * 2;
const portraitBuffer = 30;

const portraitPoints = [];
const dots = [];
let imgData;

const portraitCanvas = document.querySelector('.portrait canvas');
let portraitCtx = portraitCanvas.getContext('2d');
let portraitRect = portraitCanvas.getBoundingClientRect();

const dotsCanvas = document.querySelector('.dots canvas');
let dotsCtx = dotsCanvas.getContext('2d');
dotsCanvas.width = window.innerWidth;
dotsCanvas.height = window.innerHeight;
let dotsRect = dotsCanvas.getBoundingClientRect();

const tweenSize = p => {
  if (p.currentSize < p.size) {
    p.currentSize += p.rate;
  }
  return p.currentSize;
};

const drawShape = {
  star: (p, ctx) => {
    const size = tweenSize(p);
    ctx.beginPath();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.moveTo(0, 0 - size * 2);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - size);
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, 0 - size * 2);
    }
    ctx.closePath();
    ctx.fill();
  },
  triangle: (p, ctx) => {
    const size = tweenSize(p);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    const path = new Path2D();
    path.moveTo(-size, size);
    path.lineTo(size, size);
    path.lineTo(-size / 2, -size);
    ctx.fill(path);
  },
  square: (p, ctx) => {
    const size = tweenSize(p);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillRect(-size, -size, size * 2, size * 2);
  },
  circle: (p, ctx) => {
    const size = tweenSize(p);
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, TWO_PI, true);
    ctx.fill();
    ctx.closePath();
  },
};
const mousedShapes = Object.keys(drawShape).filter(s => s !== 'circle');

const addPoint = (x, y, color, sizeMultiplier) => {
  x += Math.random() - 0.5;
  y += Math.random() - 0.5;
  portraitPoints.push({
    x,
    xOrig: x,
    y,
    yOrig: y,
    color,
    currentSize: 0,
    rate: Math.random() * 0.5 + 0.01,
    size: Math.random() * sizeMultiplier + sizeMultiplier / 2,
    shape: 'circle',
    rotation: Math.random() * TWO_PI,
  });
};

const drawPoint = p => {
  portraitCtx.save();
  portraitCtx.fillStyle = p.color;
  drawShape[p.shape](p, portraitCtx);
  portraitCtx.restore();
};

const paint = () => {
  const resolution = 16;
  const cols = portraitCanvas.width / resolution;
  const rows = portraitCanvas.height / resolution;
  const halfRes = resolution / 2;

  let x, y, pixelIndex, red, green, blue, alpha;

  for (let row = 0; row < rows; row++) {
    y = row * resolution;
    for (let col = 0; col < cols; col++) {
      x = col * resolution;

      pixelIndex = (x + y * portraitCanvas.width) * 4;
      red = imgData[pixelIndex + 0] || 0;
      green = imgData[pixelIndex + 1] || 0;
      blue = imgData[pixelIndex + 2] || 0;
      alpha = imgData[pixelIndex + 3] > 0 ? 1 : 0;

      if (alpha) {
        addPoint(x, y, `rgba(${red},${green},${blue},${alpha})`, halfRes);
      }
    }
  }
};

const dotsColors = [
  'rgba(132, 50, 55, 0.15)',
  'rgba(226, 195, 178, 0.15)',
  'rgba(59, 110, 181, 0.15)',
  'rgba(232, 181, 93, 0.15)',
  'rgba(34, 32, 48, 0.15)',
];
const drawDots = () => {
  for (let i = 0; i < Math.random() * 50 + 50; i++) {
    dotsCtx.fillStyle = dotsColors[Math.round(Math.random() * (dotsColors.length - 1))]
    dotsCtx.beginPath();
    dotsCtx.arc(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight,
      10,
      0,
      TWO_PI,
      true,
    );
    dotsCtx.fill();
  }
};
drawDots();

window.addEventListener('resize', () => {
  portraitRect = portraitCanvas.getBoundingClientRect();
  dotsCanvas.width = window.innerWidth;
  dotsCanvas.height = window.innerHeight;
  dotsRect = dotsCanvas.getBoundingClientRect();
  drawDots();
});

portraitCanvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  const x = (offsetX / portraitRect.width) * portraitCanvas.width;
  const y = (offsetY / portraitRect.height) * portraitCanvas.height;
  let wasWithin = false;

  for (let i = 0; i < portraitPoints.length; i++) {
    const p = portraitPoints[i];
    const within = Math.sqrt(
      Math.pow(p.xOrig - x, 2) + Math.pow(p.yOrig - y, 2),
    );

    if (within < portraitBuffer) {
      wasWithin = true;
      const sub = { x: p.x - x, y: p.y - y };
      const magnitude = Math.sqrt(sub.x * sub.x + sub.y * sub.y);

      const scale = 1 + (portraitBuffer - magnitude) / portraitBuffer;
      p.x = sub.x * scale + x;
      p.y = sub.x + (sub.y - sub.x) * scale + y;

      if (p.shape === 'circle') {
        const index = Math.round(Math.random() * (mousedShapes.length - 1));
        p.rotation = Math.random() * TWO_PI;
        p.shape = mousedShapes[index];
      }
    } else {
      portraitCanvas.classList.toggle('warping', false);
      p.x = p.xOrig;
      p.y = p.yOrig;
      p.rotation = Math.random() * TWO_PI;
      p.shape = 'circle';
    }
  }

  portraitCanvas.classList.toggle('warping', wasWithin);
});

const loop = () => {
  requestAnimationFrame(loop);
  portraitCtx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);
  portraitPoints.forEach(drawPoint);
};
loop();

const img = new Image();
img.onload = () => {
  portraitCanvas.width = img.width;
  portraitCanvas.height = img.height;
  portraitRect = portraitCanvas.getBoundingClientRect();

  portraitCtx.drawImage(img, 0, 0);
  imgData = portraitCtx.getImageData(0, 0, portraitCanvas.width, portraitCanvas.height).data;
  portraitCtx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);

  paint();
};
img.src = 'static/me.png';

console.log('Well hello, nice to see you here as well');
