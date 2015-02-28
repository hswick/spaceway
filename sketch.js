  var tunnelCntr = 0;
  var speed;

  var numberOfTunnels= 100;
  var tunnels = [];

function tunnel(){
  this.x = displayWidth / 2;
  this.y = displayHeight / 2;
  this.size = 0;
  this.cntr = 0;
  this.speed = 10;
  this.drawing= false;
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
  for(i = 0; i < numberOfTunnels; i++){
     
  }
}



function tunnelLoop(){
  if(tunnels[tunnelCntr].size > displayWidth){
    tunnels[tunnelCntr].drawing = false;
    tunnelCntr++;
  }
}

function drawTunnel(tunnel){
  if(tunnel.drawing){
    ellipse(tunnel.x, tunnel.y, tunnel.size, tunnel.size);
    tunnel.size+=tunnel.speed;
  }
}
