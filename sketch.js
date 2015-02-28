  var cntr = 0;
  var speed;

function setup(){
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  background(255);
  speed = 5;
  ellipse(displayWidth / 2, displayHeight / 2, cntr, cntr);
  cntr+=speed;
  if(cntr >= displayWidth)
    cntr=0;
}
