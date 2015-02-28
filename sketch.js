  var tunnelCntr = 0;
  var numberOfTunnels= 10;
  var tunnels = [];

function setup(){
  createCanvas(windowWidth, windowHeight);
  for(i = 0; i < numberOfTunnels; i++){
     tunnels[i] = new tunnel();
  }
  tunnels[0].drawing = true;
  colors[0] = color(255, 0, 255);
  colors[1] = color(0, 175, 239);
  colors[2] = color(0, 255, 0);
}

function draw(){
  background(0);
  tunnelLoop();
  for(i = 0; i < numberOfTunnels; i++){
     drawTunnel(tunnels[i]);
  }
}

function tunnel(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.size = 0;
  this.cntr = 0;
  this.speed = 100;
  this.drawing= false;
  this.color = color(random(255), random(255), random(255));
}

function tunnelLoop(){
  if(tunnels[tunnelCntr].size > displayWidth){
    tunnels[tunnelCntr].drawing = false;
    tunnels[tunnelCntr].size = 0;
    if(tunnelCntr == numberOfTunnels - 1){
      tunnelCntr = 0;
    }else{
      tunnelCntr++;
    }
    tunnels[tunnelCntr].drawing = true;
  }
}


function drawTunnel(tunnel){
  if(tunnel.drawing){
    stroke(getColor());
    strokeWeight(10);
    noFill();
    ellipse(tunnel.x, tunnel.y, tunnel.size, tunnel.size);
    tunnel.size+=tunnel.speed;
  }
}

var colorCntr = 0;
var numberOfColors = 3;
var colors = [];
function getColor(){
  c = colors[colorCntr];
  if(colorCntr == numberOfColors - 1){
    colorCntr = 0;
  }else{
    colorCntr++;
  }
  return c;
}

