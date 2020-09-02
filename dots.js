const TWO_PI = Math.PI * 2;
const portraitBuffer = 30;

let isMobile = window.innerWidth < 1000;

let portraitPoints = [];
let imgData;

const portraitCanvas = document.querySelector('.portrait canvas');
let portraitCtx = portraitCanvas.getContext('2d');
let portraitRect = portraitCanvas.getBoundingClientRect();

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

const paint = resolution => {
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

window.addEventListener('resize', () => {
  portraitRect = portraitCanvas.getBoundingClientRect();

  if (window.innerWidth < 1000 && !isMobile) {
    portraitPoints = [];
    portraitCtx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);
    paint(32);
    isMobile = true;
  } else if (window.innerWidth >= 1000 && isMobile) {
    portraitPoints = [];
    portraitCtx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);
    paint(16);
    isMobile = false;
  }
});

portraitCanvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  if (isMobile) {
    return false;
  }
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
  imgData = portraitCtx.getImageData(
    0,
    0,
    portraitCanvas.width,
    portraitCanvas.height,
  ).data;
  portraitCtx.clearRect(0, 0, portraitCanvas.width, portraitCanvas.height);

  paint(isMobile ? 32 : 16);
};
img.src = 'static/me.png';

console.log('Well hello, nice to see you here as well');
