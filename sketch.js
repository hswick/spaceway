  var tunnelCntr = 0;
  var numberOfTunnels= 2;
  var tunnels = [];

function tunnel(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.size = 0;
  this.cntr = 0;
  this.speed = 10;
  this.drawing= false;
  this.color = color(random(255), random(255), random(255));
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  for(i = 0; i < numberOfTunnels; i++){
     tunnels[i] = new tunnel();
  }
  tunnels[0].drawing = true;
}

function draw(){
  background(255);
  tunnelLoop();
  for(i = 0; i < numberOfTunnels; i++){
     drawTunnel(tunnels[i]);
  }
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
    fill(tunnel.color);
    ellipse(tunnel.x, tunnel.y, tunnel.size, tunnel.size);
    tunnel.size+=tunnel.speed;
  }
}
