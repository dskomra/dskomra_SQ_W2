// ------------------------------------------------------------
// EDIT DONE INDEPENDENTLY
let platforms = [
  { x: 0, y: 410, w: 800, h: 40 }, // ground
  { x: 60, y: 360, w: 120, h: 16 }, // far bottom left platform
  { x: 250, y: 330, w: 110, h: 16 }, // middle bottom left platform
  { x: 450, y: 300, w: 130, h: 16 }, // middle bottom right platform
  { x: 650, y: 260, w: 100, h: 16 }, // far top right platform
  { x: 480, y: 200, w: 120, h: 16 }, // middle top right platform
  { x: 250, y: 160, w: 140, h: 16 }, // middle top left platform
  { x: 50, y: 120, w: 120, h: 16, isGolden: false }, // custom far top left platform
];

// ------------------------------------------------------------

let player = {
  x: 100,
  y: 100,

  vx: 0,
  vy: 0,

  r: 20,

  speed: 0.55,
  maxSpeed: 4.5,
  jumpForce: -12,
  friction: 0.78,

  onGround: false,
};

// ------------------------------------------------------------

const GRAVITY = 0.6;

let blobT = 0;

const PLATFORM_COLOR = [255, 160, 50];

// EDIT DONE INDEPENDENTLY
let backgroundImg;
let sushiImg;
function preload() {
  backgroundImg = loadImage("assets/images/background_image.png");
  sushiImg = loadImage("assets/images/playable_character.png");
}

// ============================================================

function setup() {
  createCanvas(800, 450);
  player.y = platforms[0].y - player.r;
}

// ============================================================

function draw() {
  // EDIT DONE INDEPENDENTLY
  image(backgroundImg, 0, 0, width, height);

  handleInput();
  applyPhysics();
  resolvePlatformCollisions();

  drawPlatforms();
  drawPlayer();
  drawHUD();

  blobT += 0.015;
}

// ------------------------------------------------------------

function handleInput() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.vx -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.vx += player.speed;
  }

  player.vx = constrain(player.vx, -player.maxSpeed, player.maxSpeed);

  if (
    !keyIsDown(LEFT_ARROW) &&
    !keyIsDown(65) &&
    !keyIsDown(RIGHT_ARROW) &&
    !keyIsDown(68)
  ) {
    player.vx *= player.friction;
  }

  if ((keyIsDown(UP_ARROW) || keyIsDown(87)) && player.onGround) {
    player.vy = player.jumpForce;
    player.onGround = false;
  }
}

// ------------------------------------------------------------

function applyPhysics() {
  player.vy += GRAVITY;

  player.x += player.vx;
  player.y += player.vy;

  player.x = constrain(player.x, player.r, width - player.r);

  if (player.y > height + 100) {
    player.x = 100;
    player.y = platforms[0].y - player.r;
    player.vx = 0;
    player.vy = 0;
  }
  player.onGround = false;
}

// ------------------------------------------------------------

function resolvePlatformCollisions() {
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    let playerLeft = player.x - player.r;
    let playerRight = player.x + player.r;
    let playerBottom = player.y + player.r;

    let platLeft = p.x;
    let platRight = p.x + p.w;
    let platTop = p.y;

    let overlapsHorizontally = playerRight > platLeft && playerLeft < platRight;

    let landingOnTop =
      player.vy >= 0 && playerBottom >= platTop && playerBottom <= platTop + 20;

    if (overlapsHorizontally && landingOnTop) {
      player.y = platTop - player.r;
      player.vy = 0;
      player.onGround = true;

      // EDIT DONE WITH GEN AI
      if (p.isGolden !== undefined) {
        p.isGolden = true;
      }
    }
  }
}

// ------------------------------------------------------------

function drawPlatforms() {
  noStroke();
  for (let i = 0; i < platforms.length; i++) {
    let p = platforms[i];

    // EDIT DONE WITH GEN AI
    if (p.isGolden) {
      fill(242, 194, 70);
    } else {
      fill(PLATFORM_COLOR[0], PLATFORM_COLOR[1], PLATFORM_COLOR[2]);
    }

    rect(p.x, p.y, p.w, p.h, 6);
  }
}

// ------------------------------------------------------------

function drawPlayer() {
  push();

  // EDIT DONE WITH GEN AI
  imageMode(CENTER);
  image(sushiImg, player.x, player.y, player.r * 2.5, player.r * 2.5);

  pop();
}

// ------------------------------------------------------------

function drawHUD() {
  fill(180);
  noStroke();
  textSize(13);
  textAlign(LEFT);

  // EDIT DONE INDEPENDENTLY
  text("Get to the top platform!", 16, 24);
  text("Move: Arrow Keys or WASD", 16, 42);
  text("Jump: W or Up Arrow", 16, 60);
}
