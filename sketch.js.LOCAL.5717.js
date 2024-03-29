
var stateStart = 0;
var statePlaying = 1;
var stateGameOver = 2;
var statePaused = 3;
var state = stateStart;

var tunnelCntr = 0;
var numberOfTunnels= 10;
var tunnels = [];
var colors = [];
var dude;
var nautImg;
var numberOfObstacles = 10;
var obstacles = [];
var o;
var startImg;


function preload(){
  nautImg = loadImage("images/naut.png");
  startImg = loadImage("images/SpacewayName.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  colors[0] = color(255, 0, 255);
  colors[1] = color(0, 175, 239);
  colors[2] = color(0, 255, 0);

  for(i = 0; i < numberOfTunnels; i++){
     tunnels[i] = new tunnel();
  }
  tunnels[0].drawing = true;
  dude = new character();
  fill(0);
  rect(0, 0, displayWidth, displayHeight);
  o = new obstacle();

  for(i = 0; i < numberOfObstacles; i++){
    obstacles[i] = new obstacle();
  }
}

function draw(){
  if(state === stateStart){
    drawStartScreen();
  }else if(state === statePlaying){
    playGame();
  }
}

function keyPressed(){
  if(keyCode === LEFT_ARROW){
    dude.x-=dude.speed;
  }
  if(keyCode === RIGHT_ARROW){
    dude.x+=dude.speed;
  }
  if(keyCode === DOWN_ARROW){
    dude.y+=dude.speed;
  }
  if(keyCode === UP_ARROW){
    dude.y-=dude.speed;
  }
  return false;
}

function drawStartScreen(){
  image(startImg, 0, 0, displayWidth, displayHeight);
}

function playGame(){
  fill(0, 5);
  rect(0, 0, displayWidth, displayHeight);
  tunnelLoop();
  for(i = 0; i < numberOfTunnels; i++){
     drawTunnel(tunnels[i]);
  }

  for(i = 0; i < numberOfObstacles; i++){
    drawObstacle(obstacles[i]);
  }
  drawCharacter();
  drawObstacle(o);
}

function drawCharacter(){
    noStroke();
    rectMode(CENTER);
    //fill(255);
    //rect(dude.x, dude.y, 200, 200);
    image(nautImg, dude.x, dude.y);
}

function character(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.speed = 20;
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

function obstacle(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.size = 100;
  this.speedX = random(-1, 1);
  this.speedY = random(-1, 1);
}

function drawObstacle(obstacle){
  fill(255);
  noStroke();
  rect(obstacle.x, obstacle.y, obstacle.size, obstacle.size);
  obstacle.x += obstacle.speedX;
  obstacle.y += obstacle.speedY;
}