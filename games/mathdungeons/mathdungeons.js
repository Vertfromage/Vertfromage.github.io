var canvas = document.querySelector("#canvas");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// Clear the canvas
function erase() {
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function menu() {
  resize();
  erase();
  context.fillStyle = '#F0F8FF';
   context.fillRect(0, 0, canvas.width, canvas.height);
   context.font = '40px Arial';
   context.textAlign = 'center';
   context.fillText('Math Dungeons', canvas.width / 2, canvas.height / 6);
   context.fillText('Coming soon!, canvas.width / 2, canvas.height / 4);
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


menu()
canvas.focus();
