var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.scale(20, 20);

var moveDir = 'down'
var x = 3, y = 10; // head position
var l = 6; // snake length
var tx = x, ty = y - l; //tail position
var tailMov = ['down', 'down', 'down', 'down', 'down', 'down'];

var canvasWidth = canvas.width / 20;
var canvasHeight = canvas.height / 20;

ctx.fillStyle = '#FF0000';
for (var i = y; i >= ty; i--) {
  ctx.fillRect(x, i, 1, 1);
}


document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {if (moveDir != 'right') moveDir = 'left';}
  else if (event.keyCode == 38) {if (moveDir != 'down') moveDir = 'up';}
  else if (event.keyCode == 39) {if (moveDir != 'left') moveDir = 'right';}
  else if (event.keyCode == 40) {if (moveDir != 'up') moveDir = 'down';}
});

function move() {
  switch (moveDir) {
    case 'up':
      moveUp();
      break;

    case 'down':
      moveDown();
      break;

    case "left":
      moveLeft();
      break;

    case "right":
      moveRight();
      break;
  }
}

function moveLeft() {
  clearTail();

  x--;
  if (x < 0)
    x = canvasWidth + x;

  ctx.fillRect(x, y, 1, 1);
}

function moveUp() {
  clearTail();

  y--;
  if (y < 0)
    y = canvasHeight + y;

  ctx.fillRect(x, y, 1, 1);
}

function moveRight() {
  clearTail();

  x++;
  if (x >= canvasWidth)
    x = x - canvasWidth;

  ctx.fillRect(x, y, 1, 1);
}

function moveDown() {
  clearTail();

  y++;
  if (y >= canvasHeight)
    y = y - canvasHeight;

  ctx.fillRect(x, y, 1, 1);
}

function clearTail() {
  ctx.clearRect(tx, ty, 1, 1);

  var tm = tailMov[0];
  switch (tm) {
    case 'left':
      tx--;
      if (tx < 0)
        tx = canvasWidth + tx;
      break;
    case 'up':
      ty--;
      if (ty < 0)
        ty = canvasHeight + ty;
      break;
    case 'right':
      tx++;
      if (tx >= canvasWidth)
        tx = tx - canvasWidth;
      break;
    case 'down':
      ty++;
      if (ty >= canvasHeight)
        ty = ty - canvasHeight;
      break;

  }

  for (var i = 1; i < tailMov.length; i++) {
    tailMov[i-1] = tailMov[i];
  }
  tailMov[tailMov.length-1] = moveDir;
}

var t = setInterval(move, 100);
