canvas = document.getElementById('mygame');
context = canvas.getContext('2d');

var w = canvas.width;
var h = canvas.height;
var sw = 10;
var snake;
var food;
var foodspd;
var foodbad;
var d;
var score;
var speedup = false;
var alive = true;
var canMove = true;

var imageHolder = new Array();
imageHolder.push('https://i.imgur.com/wmUCTre.jpg'); // bg


var background = new Image();
background.X = 0;
background.Y = 0;
background.width = 500;
background.height = 500;
background.src = imageHolder[0];



document.addEventListener('keydown', handleKeypress);

function handleKeypress(e){

	switch(e.keyCode){
  	case 37:
    case 65:
    	if (canMove && d != 'right')
    	d = 'left';
    	break;
    case 38:
    case 87:
    	if (canMove && d != 'down')
    	d = 'up';
    	break;
    case 39:
    case 68:
    	if (canMove && d != 'left')
    	d = 'right';
    	break;
    case 40:
    case 83:
    	if (canMove && d !='up')
    	d = 'down';
    	break;
    case 32:
    	if(alive == false)
    	init();
    	break;
  }

}

function init() {
	snake = new Snake(5);
	d = 'right';
	score = 0;
	alive = true;
	food.x = Math.round(Math.random()*(w-sw)/sw);
   	food.y = Math.round(Math.random()*(h-sw)/sw);
	
}
init();

function food() {
	food = {x: Math.round(Math.random()*(w-sw)/sw), y: Math.round(Math.random()*(h-sw)/sw)};
}

function foodspd() {
	foodspd = {x: Math.round(Math.random()*(w-sw)/sw), y: Math.round(Math.random()*(h-sw)/sw)};
}

function foodbad() {
	foodbad = {x: Math.round(Math.random()*(w-sw)/sw), y: Math.round(Math.random()*(h-sw)/sw)};
}

function drawfoodspd() {
	context.fillStyle='white';
    context.fillRect(foodspd.x*sw, foodspd.y*sw, sw, sw);
    context.strokeStyle = 'white';
    context.strokeRect(sw*foodspd.x, foodspd.y*sw, sw, sw);
}

function drawfoodbad() {
	context.fillStyle='brown';
    context.fillRect(foodbad.x*sw, foodbad.y*sw, sw, sw);
    context.strokeStyle = 'white';
    context.strokeRect(sw*foodbad.x, foodbad.y*sw, sw, sw);
}

if(alive == true) {
	setInterval(foodspd, 5000);
	setInterval(drawfoodspd, 10);
	setInterval(foodbad, 5000);
	setInterval(drawfoodbad, 10);
}

function Snake(length){
	this.length = length;
  this.snakeArray = new Array();
  for(var i=length-1; i >= 0; i--){
  	this.snakeArray.push({x:i,y:10});
  }
  
  this.update = function(){
  	var nx = this.snakeArray[0].x;
    var ny = this.snakeArray[0].y;
    
    if(Math.abs(nx - foodspd.x) < 1 && Math.abs(ny - foodspd.y) < 1) {
    	speedup = true;
    	foodspd.x = Math.round(Math.random()*(w-sw)/sw);
    	foodspd.y = Math.round(Math.random()*(h-sw)/sw);
    }
    
    if((alive == true) && Math.abs(nx - foodbad.x) < 1 && Math.abs(ny - foodbad.y) < 1) {
    	this.snakeArray.pop();
    	if(this.snakeArray.length <= 1) {
    		alive = false;
    	}
    }
    
    
    switch(d){
    	case 'right':
    	if(d != 'left')
    	if(speedup == true)
      		nx = nx + 1.5;
      	else 
      		nx++;
      	break;
      case 'left':
      	if(d != 'right')
      	if(speedup == true)
      		nx = nx - 1.5;
      	else
      		nx--;
      	break;
      case 'up':
      	if(d != 'down')
      	if(speedup == true)
      		ny = ny - 1.5;
      	else
      		ny--;
      	break;
      case 'down':
      	if(d != 'up')
      	if(speedup == true)
      		ny = ny + 1.5;
      	else
      		ny++;
      	break;
    }
    
    console.log(this.snakeArray[0].x);
    for(var i = 0; i < this.snakeArray.length; i++) {
    	if(this.snakeArray[i].x > (500/sw) || this.snakeArray[i].x < 0 || this.snakeArray[i].y > (500/sw) || this.snakeArray[i].y < 0 || check_collision(nx, ny, this.snakeArray)) {
    		init();
    		return;
    	}
    }
    
 	   
	
    
    if(Math.abs(nx - food.x) < 1 && Math.abs(ny - food.y) < 1) {
    	speedup = false;
    	var tail = {x:nx, y:ny};
    	score++;
    	food.x = Math.round(Math.random()*(w-sw)/sw);
    	food.y = Math.round(Math.random()*(h-sw)/sw);
    }
    else
    {
    	var tail = this.snakeArray.pop();
    	tail.x = nx;
    	tail.y = ny;
    }
    this.snakeArray.unshift(tail);
  
  };
  
  this.draw = function(){
  	for(var i=0; i<this.snakeArray.length; i++){
      context.fillStyle='red';
      context.fillRect(this.snakeArray[i].x*sw, this.snakeArray[i].y*sw, sw, sw);
      context.strokeStyle = 'white';
      context.strokeRect(sw*this.snakeArray[i].x, this.snakeArray[i].y*sw, sw, sw);
    }

  };
  
  

} 

function check_collision(x, y, array)	{
	for(var i = 0; i < array.length; i++)	{
		if(array[i].x == x && array[i].y == y)
		 	return true;
		}
		return false;
	}



function update() {
	if(alive == true) {
		snake.update();
	}
	canMove = true;
}
function draw() {
	console.log(alive);
	canvas.width = canvas.width;  
	context.drawImage(background, background.X, background.Y, background.width, background.height);
    context.strokeStyle="white";
	context.lineWidth = 1;
	context.strokeRect(5,5, w-10, h-10);  
	snake.draw();
	// draw food
	context.fillStyle='green';
    context.fillRect(food.x*sw, food.y*sw, sw, sw);
    context.strokeStyle = 'white';
    context.strokeRect(sw*food.x, food.y*sw, sw, sw);
    context.fillStyle = 'yellow';
    var score_text = "Score:"+score;
    context.fillText(score_text, 5, h-5);
    if(alive == false) {
    	var dietext = "press space to reset";
    	context.font="30px Arial";
    	context.fillText(dietext, 100, h/2);
    }
}

function game_loop(){
	update();
	draw();
}
setInterval(game_loop, 60);