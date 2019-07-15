const canvas = document.getElementById("wire-frame");
const ctx = canvas.getContext("2d");

const FPS = 120;
const dotsPerRow = window.innerWidth / window.innerHeight * 12;

let dots = [];

// Push dots to array
for (let x = 0; x < dotsPerRow; x++) {
  for (let y = 0; y < dotsPerRow; y++) {
    let modY;
    if (x % 2 === 0) {
      modY = 16;
    } else {
      modY = 32;
    }

    let vx = Math.random() * 100;
    if (Math.random() < 0.5) {
      vx = -vx;
    }

    let vy = Math.random() * 100;
    if (Math.random() < 0.5) {
      vy = -vy;
    }

    dots.push({
      x: x * (window.innerWidth / dotsPerRow) + 16,
      y: y * (window.innerHeight / dotsPerRow) + modY,
      vx: vx,
      vy: vy,
      radius: 0.05
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    for (let j = 0; j < dots.length; j++) {
      const dot1 = dots[j];
      let d = dist(dot, dot1);
      if (d >= 0 && d <= 10) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(dot1.x, dot1.y);
        ctx.lineWidth = d / 25;
        ctx.strokeStyle = "whitesmoke";
        ctx.stroke();
      }
    }
  }

  function dist(dot0, dot1) {
    let dx = dot1.x > dot0.x ? dot1.x - dot0.x : dot0.x - dot1.x;
    let dy = dot1.y > dot0.y ? dot1.y - dot0.y : dot0.y - dot1.y;
    return Math.sqrt(dx + dy);
  }
}

function update() {
  for (let i = 0; i < dots.length; i++) {
    const dot = dots[i];

    dot.x += dot.vx / FPS;
    dot.y += dot.vy / FPS;

    if (dot.x < 0 || dot.x > canvas.width) dot.vx = -dot.vx;
    if (dot.y < 0 || dot.y > canvas.height) dot.vy = -dot.vy;
  }
}

let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;
canvas.width = previousWidth;
canvas.height = previousHeight;

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  let displayWidth = canvas.clientWidth;
  let displayHeight = canvas.clientHeight;

  if (previousWidth !== displayWidth || previousHeight !== displayHeight) {
    let diffWidth = displayWidth - previousWidth;
    let diffHeight = displayHeight - previousHeight;

    previousWidth = displayWidth;
    previousHeight = displayHeight;

    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      dot.x += diffWidth;
      dot.y += diffHeight;
    }

    // Check if the canvas is not the same size.
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      // Make the canvas the same size
      canvas.width = displayWidth;
      canvas.height = displayHeight;
    }
  }
}

function tick() {
  resize(canvas);
  draw();
  update();
  requestAnimationFrame(tick);
}

tick();
