
var stateStart = 0;
var statePlaying = 1;
var stateGameOver = 2;
var statePaused = 3;
var state = stateStart;

var tunnelCntr = 0;
var numberOfTunnels= 25;
var tunnels = [];
var colors = [];
var dude;
var nautImg;
var numberOfObstacles = 5;
var obstacles = [];
var startImg;
var gameOverImg;
var score = 0;

var powerups;
var music;

  // Blocks
  var blocks = {};

  // Invader
  var inv;
  var invAxis;

  //Powerups
  var slowmo;
  var life;
  var clear;

function preload(){
  nautImg = loadImage("images/naut.png");
  startImg = loadImage("images/SpacewayName.png");
  gameOverImg = loadImage("images/gameover.jpg");
  music = new Audio('Starway.m4a');
  powerups = {
    "slowmo": loadImage("images/block_b1.png"),
    "life": loadImage("images/heart.png"),
    "clear": loadImage("images/block_grey1.png")
  };
  slowmo = new block();
  life = new block();
  clear = new block();
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  fill(0);
  rect(0, 0, displayWidth, displayHeight);

  colors[0] = color(255, 0, 255);
  colors[1] = color(0, 175, 239);
  colors[2] = color(0, 255, 0);

  for(i = 0; i < numberOfTunnels; i++){
     tunnels[i] = new tunnel();
  }

  tunnels[0].drawing = true;
  dude = new character();
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i] = new obstacle();
  }
  music.play();
}

function draw(){
  if(state === stateStart){
    fill(0);
    rect(0, 0, displayWidth, displayHeight);
    drawStartScreen();
  }else if(state === statePlaying){
    playGame();
  }else if(state === stateGameOver){
    terminateGame();
  }else if(state === statePaused){
    //Paused Game
  }
}

function keyPressed(){
  if(state === stateStart){
    state = statePlaying;
  }else if(state === statePlaying){
    if(keyCode === LEFT_ARROW && (dude.x - dude.speed) >= 0){
        dude.x-=dude.speed;
    }
    if(keyCode === RIGHT_ARROW && ((dude.x + 42) + dude.speed) <= displayWidth){
      dude.x+=dude.speed;
    }
    if(keyCode === DOWN_ARROW && ((dude.y + 207) + dude.speed) <= displayHeight){
      dude.y+=dude.speed;
    }
    if(keyCode === UP_ARROW && (dude.y - dude.speed >= 0)){
      dude.y-=dude.speed;
    }
  }else if(state === stateGameOver){
    state=stateStart;
    restartState();
  }else if(state === statePaused){
    state=statePlaying;
  }
  return false;
}

function keepWithinBounds(){
  if(dude.x <= 0){
    dude.x+=dude.speed;
  }else if(dude.x >= displayWidth){
    dude.x-=dude.speed;
  }else if(dude.y <= 0){
    dude.y+=dude.speed;
  }else if(dude.y >= displayHeight){
    dude.y-=dude.speed;
  }
}

function keyTyped(){
  if(key === 'p'){
    state = statePaused;
  }
}

function restartState(){
  dude = new character();
  obstacles = [];
  numberOfObstacles = 5;
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i] = new obstacle();
  }
  for(i = 0; i < numberOfTunnels; i++){
     tunnels[i].size = 0;
  }
  score = 0;
  resetPowerUps();
}

function drawStartScreen(){
  image(startImg, 0, 0, displayWidth, displayHeight);
}

function terminateGame(){
  image(gameOverImg, 0, 0, displayWidth, displayHeight);
}

function playGame(){
  fill(0, 5);
  rect(0, 0, displayWidth, displayHeight);
  tunnelLoop();
  for(i = 0; i < numberOfTunnels; i++){
     drawTunnel(tunnels[i]);
  }
  textSize(40);
  fill(0);
  noStroke();
  rect(0, 0, 220, 35);
  fill(0, 102, 153);
  text("Score: " + score, 10, 30); 
  score+=1;

  fill(0);
  noStroke();
  rect(displayWidth - 200, 0, 100, 35);
  fill(colors[1]);
  text("Lives: " + dude.lives, displayWidth - 200, 30);

  drawObstacles();
  drawCharacter();
  collisionDetection();
  drawPowerups();
  hitLife();
  hitSlowmo();
  hitClear();
  if(score % 100 === 0){
    for(i = 0; i < 5; i++){
      obstacles.push(new obstacle());
      numberOfObstacles++;
    }
  }
}

function drawCharacter(){
    image(nautImg, dude.x, dude.y);
}

function character(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.speed = 20;
  this.lives = 1;
}

function tunnel(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.size = 0;
  this.cntr = 0;
  this.speed = random(20, 100);
  this.drawing= false;
  this.color = getColor();
  this.strokeW = 0;
  this.a = 0;
}

function tunnelLoop(){
  if(tunnels[tunnelCntr].size > displayWidth){
    tunnels[tunnelCntr].drawing = false;
    tunnels[tunnelCntr].size = 0;
    tunnels[tunnelCntr].speed = random(20, 100);
    tunnels[tunnelCntr].strokeW = 0;
    tunnels[tunnelCntr].a = 0;
    if(tunnelCntr === numberOfTunnels - 1){
      tunnelCntr = 0;
    }else{
      tunnelCntr++;
    }
    tunnels[tunnelCntr].drawing = true;
  }
}

function drawTunnel(tunnel){
  if(tunnel.drawing){
    stroke(tunnel.color, tunnel.a);
    strokeWeight(tunnel.strokeW);
    noFill();
    ellipse(tunnel.x, tunnel.y, tunnel.size, tunnel.size);
    tunnel.size+=tunnel.speed;
    tunnel.strokeW+=0.25;
    tunnel.a+=0.1;
  }
}

var colorCntr = 0;
var numberOfColors = 3;
function getColor(){
  c = colors[colorCntr];
  if(colorCntr == numberOfColors - 1){
    colorCntr = 0;
  }else{
    colorCntr++;
  }
  return c;
}

function collisionDetection(){
  for(i = 0; i < numberOfObstacles; i++){
    hitObstacle(obstacles[i]);
  }
}

function hitObstacle(obstacle){
  if(obstacle.x <= dude.x + 50
    && obstacle.x+obstacle.size >= dude.x
    && obstacle.y <= dude.y + 80
    && obstacle.y+obstacle.size >= dude.y){
    obstacle.x = random(0, displayWidth);
    obstacle.y = random(0, displayHeight);
    if(dude.lives === 0){
      state = stateGameOver;
    }else{
      dude.lives--;
      console.log(dude.lives);
    }
  }
}

function obstacle(){
  this.x = displayWidth / 2;
  this.y = 10;
  this.size = 20;
  this.speedX = random(-5, 5);
  this.speedY = random(-5, 5);
}

function drawObstacle(obstacle){
  fill(255);
  noStroke();
  rect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
  moveObstacle(obstacle);
}

function moveObstacle(obstacle){
  if(obstacle.x >= displayWidth){
    obstacle.x = 0;
  }else if(obstacle.x <= 0){
    obstacle.x = displayWidth;
  }else if(obstacle.y >= displayHeight){
    obstacle.y = 0;
  }else if(obstacle.y <= 0){
    obstacle.y = displayHeight;
  }
  obstacle.x += obstacle.speedX;
  obstacle.y += obstacle.speedY;
}

function drawObstacles(){
  for(i = 0; i < numberOfObstacles; i++){
    drawObstacle(obstacles[i]);
  }
}

function drawPowerups() {
  image(powerups["slowmo"], slowmo.x, slowmo.y);
  image(powerups["life"], life.x, life.y);
  image(powerups["clear"], clear.x, clear.y);
}

function resetPowerUps(){
  slowmo = new block();
  life = new block();
  clear = new block();
}

/// Block stuff
function block(){
  this.x = random(displayWidth / 4, displayWidth - displayWidth / 4);
  this.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  this.timer = 0;
  this.hit = false;
}

function invader(){
  this.x = Math.floor(Math.random()*displayWidth);
  this.y = Math.floor(Math.random()*displayHeight);
}

function hitLife(){
    if(life.x <= dude.x + 50
    && life.x+20 >= dude.x
    && life.y <= dude.y + 80
    && life.y+20 >= dude.y){
    dude.lives++;
    life.x = random(displayWidth / 10, displayWidth - displayWidth / 10);
    life.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  }
}

function hitSlowmo(){
  if(!slowmo.hit){
    if(slowmo.x <= dude.x + 50
    && slowmo.x+20 >= dude.x
    && slowmo.y <= dude.y + 80
    && slowmo.y+20 >= dude.y){
    slowmo.x = random(displayWidth / 10, displayWidth - displayWidth / 10);
    slowmo.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].speedX = random(-1, 1);
    obstacles[i].speedY = random(-1, 1);
  }
  slowmo.hit = true;
  }
  }
  if(slowmo.hit){
    slowmo.timer++;
    if(slowmo.x <= dude.x + 50
    && slowmo.x+20 >= dude.x
    && slowmo.y <= dude.y + 80
    && slowmo.y+20 >= dude.y){
    slowmo.timer = 0;
    slowmo.x = random(displayWidth / 10, displayWidth - displayWidth / 10);
    slowmo.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].speedX = random(-1, 1);
    obstacles[i].speedY = random(-1, 1);
  }
  slowmo.hit = true;
  }
  }
  if(slowmo.timer === 200){
    slowmo.hit = false;
    slowmo.timer = 0;
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].speedX = random(-5, 5);
    obstacles[i].speedY = random(-5, 5);
  }
  }
}

function hitClear(){
  if(!clear.hit){
    if(clear.x <= dude.x + 50
    && clear.x+20 >= dude.x
    && clear.y <= dude.y + 80
    && clear.y+20 >= dude.y){
    clear.x = random(displayWidth / 10, displayWidth - displayWidth / 10);
    clear.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].x = -100;
    obstacles[i].y = -100;
    obstacles[i].speedX = 0;
    obstacles[i].speedY = 0;
  }
  clear.hit = true;
  }
  }
  if(clear.hit){
    clear.timer = 0;
    clear.timer++;
        if(clear.x <= dude.x + 50
    && clear.x+20 >= dude.x
    && clear.y <= dude.y + 80
    && clear.y+20 >= dude.y){
    clear.x = random(displayWidth / 10, displayWidth - displayWidth / 10);
    clear.y = random(displayHeight / 4, displayHeight - displayHeight / 4);
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].x = -100;
    obstacles[i].y = -100;
    obstacles[i].speedX = 0;
    obstacles[i].speedY = 0;
  }
  clear.hit = true;
  }
  }
  if(clear.timer === 200){
    clear.hit = false;
    clear.timer = 0;
  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i].x = displayWidth / 2;
    obstacles[i].y = 10;
    obstacles[i].speedX = random(-5, 5);
    obstacles[i].speedY = random(-5, 5);
  }
  }
}

var b = 14;
function drawInvader(){
  var col3row1 = image(blocks.grey[1], inv.x + b, inv.y);
  var col3row2 = image(blocks.grey[1], inv.x + b, inv.y - b);
  var col3row3 = image(blocks.grey[1], inv.x + b, inv.y - 2*b);
  var col1row1 = image(blocks.grey[1], inv.x - b, inv.y);
  var col1row2 = image(blocks.grey[1], inv.x - b, inv.y - b);
  var col1row2 = image(blocks.grey[1], inv.x - b, inv.y - 2*b);
  var col2row1 = image(blocks.grey[1], inv.x, inv.y + b/2);
  var col2row2 = image(blocks.grey[1], inv.x, inv.y - b/2);
  var col2row3 = image(blocks.grey[1], inv.x, inv.y - b - b/2);
}