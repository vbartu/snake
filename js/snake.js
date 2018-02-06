
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.scale(20, 20);

var x = 0;
var y = 0;
var canvasWidth = canvas.width / 20;
var canvasHeight = canvas.height / 20;

ctx.fillStyle = '#FF0000';
ctx.fillRect(x, y, 1, 1);

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) moveLeft();
  else if (event.keyCode == 38) moveUp();
  else if (event.keyCode == 39) moveRigth();
  else if (event.keyCode == 40) moveDown();
});

function moveLeft() {
  ctx.clearRect(x, y, 1, 1);

  x--;
  if (x < 0)
    x = canvasWidth + x;

  ctx.fillRect(x, y, 1, 1);
}

function moveUp() {
  ctx.clearRect(x, y, 1, 1);

  y--;
  if (y < 0)
    y = canvasHeight + y;

  ctx.fillRect(x, y, 1, 1);
}

function moveRigth() {
  ctx.clearRect(x, y, 1, 1);

  x++;
  if (x >= canvasWidth)
    x = x - canvasWidth;

  ctx.fillRect(x, y, 1, 1);
}

function moveDown() {
  ctx.clearRect(x, y, 1, 1);

  y++;
  if (y >= canvasHeight)
    y = y - canvasWidth;

  ctx.fillRect(x, y, 1, 1);
}
