var canvas = document.querySelector("#canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var mathProblem = "6x2=?"

// Create a rectangle object - for paddles, ball, etc
function makeRect(x, y, width, height, speed, color) {
  if (!color) color = '#000000';
  return {
    x: x,
    y: y,
    w: width,
    h: height,
    s: speed,
    c: color,
    draw: function() {
      context.fillStyle = this.c;
      context.fillRect(this.x-(this.w/2), this.y-(this.h/2), this.w, this.h);
    }
  };
}
var rect = makeRect(canvas.width/2, canvas.height/3.5, 8,8,2,'#ffa500');

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function menu() {
  resize();
  context.fillStyle = '#312120';
   context.fillRect(0, 0, canvas.width, canvas.height);
   drawBackground('#7b5019','#443B31');
   context.font = '40px Arial';
   context.fillStyle = '#e3dab0';
   context.textAlign = 'center';
   context.fillText('Math Dungeons', canvas.width / 2, canvas.height / 6);
   context.fillStyle = '#e3dab0';
   context.font = '18px Arial';
   context.fillText('Coming soon!', canvas.width / 2, canvas.height / 4);
   growAndMove(rect)
   window.requestAnimationFrame(menu);
}

function drawBackground(floorColor,doorColor){
  let door = 10; 
  //Bottom
  context.beginPath();
  context.moveTo(0, canvas.height);
  context.lineTo((canvas.width/2)-door, canvas.height/3.5);
  context.lineTo((canvas.width/2)+door, canvas.height/3.5);
  context.lineTo(canvas.width, canvas.height);
  context.closePath();

  // the outline
  context.lineWidth = 0;
  context.strokeStyle = floorColor;
  context.stroke();

  // the fill color
  context.fillStyle = floorColor;
  context.fill();

  //Top
  context.beginPath();
  context.moveTo(0,0);
  context.lineTo(canvas.width/2-door, canvas.height/3.5-40);
  context.lineTo(canvas.width/2+door, canvas.height/3.5-40);
  context.lineTo(canvas.width, 0);
  context.closePath();

  // the outline
  context.lineWidth = 0;
  context.strokeStyle = floorColor;
  context.stroke();

  // the fill color
  context.fillStyle = floorColor;
  context.fill();
 // End of hall
  context.beginPath();
  context.moveTo(canvas.width/2-door, canvas.height/3.5-40);
  context.lineTo(canvas.width/2+door, canvas.height/3.5-40);
  context.lineTo((canvas.width/2)+door, canvas.height/3.5);
  context.lineTo((canvas.width/2)-door, canvas.height/3.5);
  context.closePath();
    // the outline
  context.lineWidth = 0;
  context.strokeStyle = doorColor;
  context.stroke();

  // the fill color
  context.fillStyle = doorColor;
  context.fill();
}

function growAndMove(monster){
if(monster.y>=canvas.height-monster.h/4){
  //reset
  monster.y = canvas.height/3.5;
  monster.w = 8;
  monster.h = 8;
}
monster.y+=monster.s;
monster.w+=monster.s;
monster.h+=monster.s;
monster.draw();
context.font = monster.w/3+'px Arial';
context.fillStyle = '#e3dab0';
context.textAlign = 'center';
context.fillText(mathProblem, canvas.width / 2, monster.y);
}

function resize() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  if (canvas.width != width ||
      canvas.height != height) {
     canvas.width = width;
     canvas.height = height;
     rect = makeRect(canvas.width/2, canvas.height/3.5, 8,8,0.5,'#ffa500');
}
}
menu();
canvas.focus();

