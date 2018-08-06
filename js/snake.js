var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.scale(20, 20);

let snake_positions = [{x: 2, y: 4}, {x: 2, y: 3}];
let snake_head = {x: 2, y: 5};
let fruit = {x: 0, y: 0};

let direction = 'down';
let state = 'pause' // play, pause, lose

let point_score = document.getElementById('points');
let points = 0;

let speed_selector = document.getElementById('speed');
let speed = 200;

var play = () => {
  ctx.clearRect(0, 0, 25, 25);

  // draw fruit
  ctx.fillStyle = '#42f471' //green
  ctx.fillRect(fruit.x, fruit.y, 1, 1);

  // draw sanke body and head
  ctx.fillStyle = '#f46e42'; // orange
  for (var i = 0; i < snake_positions.length; i++) {
    ctx.fillRect(snake_positions[i].x, snake_positions[i].y, 1, 1);
  }
  ctx.fillStyle = '#f44242'; // red
  ctx.fillRect(snake_head.x, snake_head.y, 1, 1);

  check();

  move();

  if (snake_head.x === fruit.x && snake_head.y === fruit.y) {
    random_fruit();
    points += 200;
  } else {
    snake_positions.pop();
  }

  points++;
  point_score.innerHTML = `Points: ${points}`;

}



speed.onchange = (event) => {

}

let check = () => {
  for (var i = 0; i < snake_positions.length; i++) {
    if (snake_head.x === snake_positions[i].x && snake_head.y === snake_positions[i].y) {
      state = 'lose';
      clearInterval(t);
    }
  }
}

let move = () => {
  snake_positions.unshift({x: snake_head.x, y: snake_head.y});

  switch (direction) {
    case 'down':
      snake_head.y++;
      if (snake_head.y >= 25)
        snake_head.y -= 25;
      break;

    case 'up':
      snake_head.y--;
      if (snake_head.y < 0)
        snake_head.y += 25;
      break;

    case 'left':
      snake_head.x--;
      if (snake_head.x < 0)
        snake_head.x += 25;
      break;

    case 'right':
      snake_head.x++;
      if (snake_head.x >= 25)
        snake_head.x -= 25;
      break;
  }
}

let random_fruit = () => {
  let valid = true;
  x = Math.floor(Math.random()*25);
  y = Math.floor(Math.random()*25);

  if (snake_head.x === x && snake_head.y === y)
    valid =  false;

  for (var i = 0; i < snake_positions.length; i++) {
    if(snake_positions[i].x === x && snake_positions[i].y === y)
      valid = false;
  }

  if (valid) {
    fruit.x = x;
    fruit.y = y;
  } else
    random_fruit();
}

random_fruit();

document.addEventListener('keydown', function(event) {
  if (event.keyCode == 37) {if (direction != 'right') direction = 'left';}
  else if (event.keyCode == 38) {if (direction !== 'down') direction = 'up';}
  else if (event.keyCode == 39) {if (direction !== 'left') direction = 'right';}
  else if (event.keyCode == 40) {if (direction !== 'up') direction = 'down';}
  else if (event.keyCode == 80) {
    if (state === 'play') {
      state = 'pause';
      clearInterval(t);
    }
    else if (state === 'pause') {
      state = 'play';
      t = setInterval(play, speed);
    }
    else if (state === 'lose') {
      snake_positions = [{x: 2, y: 4}, {x: 2, y: 3}];
      snake_head = {x: 2, y: 5};
      direction = 'down';
      random_fruit();
      state = 'play';
      points = 0;
      t = setInterval(play, speed);
    }
  }
});

speed_selector.onchange = (event) => {
  switch (speed_selector.value) {
    case 'slow':
      speed = 200;
      break;
    case 'mid':
      speed = 100;
      break;
    case 'fast':
      speed = 50;
      break;
  }
}
