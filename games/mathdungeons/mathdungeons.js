var canvas = document.querySelector("#canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

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
      context.fillRect(this.x, this.y, this.w, this.h);
    }
  };
}

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function menu() {
  resize();
  context.fillStyle = '#312120';
   context.fillRect(0, 0, canvas.width, canvas.height);
   context.font = '40px Arial';
   context.fillStyle = '#e3dab0';
   context.textAlign = 'center';
   context.fillText('Math Dungeons', canvas.width / 2, canvas.height / 6);
   context.fillStyle = '#7b5019';
   context.font = '18px Arial';
   context.fillText('Coming soon!', canvas.width / 2, canvas.height / 4);
   window.requestAnimationFrame(menu);
}
function resize() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  if (canvas.width != width ||
      canvas.height != height) {
     canvas.width = width;
     canvas.height = height;
}
}
menu();
canvas.focus();
