<script context="module">
  const TWO_PI = Math.PI * 2;
  const res = 16;
  const halfRes = res / 2;
  const buffer = 30;

  let ctx, canvasRect;
  let points = [];
  let w, h, data;

  function tweenSize(p) {
    if (p.currentSize < p.size) {
      p.currentSize += p.rate;
    }
    return p.currentSize;
  }

  const drawShape = {
    star: p => {
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
    triangle: p => {
      const size = tweenSize(p);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      const path = new Path2D();
      path.moveTo(-size, size);
      path.lineTo(size, size);
      path.lineTo(-size / 2, -size);
      ctx.fill(path);
    },
    square: p => {
      const size = tweenSize(p);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillRect(-size, -size, size * 2, size * 2);
    },
    circle: p => {
      const size = tweenSize(p);
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, TWO_PI, true);
      ctx.fill();
      ctx.closePath();
    },
  };
  const mousedShapes = Object.keys(drawShape).filter(s => s !== 'circle');

  function addPoint(x, y, color) {
    x += Math.random() - 0.5;
    y += Math.random() - 0.5;
    points.push({
      x,
      xOrig: x,
      y,
      yOrig: y,
      color,
      currentSize: 0,
      rate: Math.random() * 0.5 + 0.01,
      size: Math.random() * halfRes + (halfRes / 2),
      shape: 'circle',
      rotation: Math.random() * TWO_PI,
    });
  }

  function drawPoint(p) {
    ctx.save();
    ctx.fillStyle = p.color;
    drawShape[p.shape](p);
    ctx.restore();
  }

  function paint() {
    const cols = w / res;
    const rows = h / res;

    let x, y, pixelIndex, red, green, blue, alpha;

    for (let row = 0; row < rows - 2; row++) {
      y = row * res;
      for (let col = 0; col < cols; col++) {
        x = col * res;

        pixelIndex = (x + y * w) * 4;
        red = data[pixelIndex + 0] || 0;
        green = data[pixelIndex + 1] || 0;
        blue = data[pixelIndex + 2] || 0;
        alpha = data[pixelIndex + 3] > 0 ? 1 : 0;

        if (alpha) {
          addPoint(x, y, `rgba(${red},${green},${blue},${alpha})`);
        }
      }
    }
  }
</script>

<script>
  import { onMount } from 'svelte';

  onMount(() => {
    ctx = canvas.getContext('2d');
    canvasRect = canvas.getBoundingClientRect();
    points = [];

    const img = new Image();
    img.onload = () => {
      w = canvas.width = img.width;
      h = canvas.height = img.height;
      canvasRect = canvas.getBoundingClientRect();

      ctx.drawImage(img, 0, 0);
      data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      paint();
    };
    img.src = './me.png';

    let frame;
    (function loop() {
      frame = requestAnimationFrame(loop);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach(drawPoint);
    }());

    return () => cancelAnimationFrame(frame);
  });

  let canvas;
  let hovered = false;

  function handleResize() {
    canvasRect = canvas.getBoundingClientRect();
  }

  function handleMousemove({offsetX, offsetY}) {
    const x = (offsetX / canvasRect.width) * w;
    const y = (offsetY / canvasRect.height) * h;
    let wasWithin = false;

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const within = Math.sqrt(
        Math.pow(p.xOrig - x, 2) + Math.pow(p.yOrig - y, 2),
      );

      if (within < buffer) {
        wasWithin = true;
        const sub = {x: p.x - x, y: p.y - y};
        const magnitude = Math.sqrt(sub.x * sub.x + sub.y * sub.y);

        const scale = 1 + (buffer - magnitude) / buffer;
        p.x = sub.x * scale + x;
        p.y = sub.x + (sub.y - sub.x) * scale + y;

        if (p.shape === 'circle') {
          const index = Math.round(Math.random() * (mousedShapes.length - 1));
          p.rotation = Math.random() * TWO_PI;
          p.shape = mousedShapes[index];
        }
      } else {
        hovered = false;
        p.x = p.xOrig;
        p.y = p.yOrig;
        p.rotation = Math.random() * TWO_PI;
        p.shape = 'circle';
      }
    }

    hovered = wasWithin;
  }
</script>

<style>
  canvas {
    max-width: 100%;
    max-height: 100%;
  }

  .hovered {
    cursor: pointer;
  }
</style>

<svelte:window on:resize={handleResize} />

<canvas
  bind:this={canvas}
  on:mousemove={handleMousemove}
  class="{hovered ? 'hovered' : ''}"
></canvas>
