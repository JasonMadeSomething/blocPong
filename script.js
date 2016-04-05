function Paddle(xPos, yPos, width, height, speed, context) {
    this.xPosition = xPos;
    this.yPosition = yPos;
    this.width = width;
    this.height = height;
    this.context = context;
    this.speed = speed;
}

function Ball(initialXPos, initialYPos, radius, context) {
    this.xPosition = initialXPos;
    this.yPosition = initialYPos;
    this.initialX = initialXPos;
    this.initialY = initialYPos;
    this.radius = radius;
    this.context = context;
}

function Player(context) {
    this.paddle = new Paddle(782, 237.5, 8, 75, 10, context);
}

function Computer(context) {
    this.paddle = new Paddle(10, 237.5, 8, 75, 10, context);
}

Paddle.prototype.render = function () {
    this.context.beginPath();
    this.context.rect(this.xPosition, this.yPosition, this.width, this.height);
    this.context.fill();
};

Paddle.prototype.move = function (keyCode) {
    if (keyCode === 38) {
        this.yPosition -= this.speed;
        if (this.yPosition < 0) {
            this.yPosition = 0;
        }
    } else if (keyCode === 40) {
        this.yPosition += this.speed;
        if (this.yPosition >= (this.context.canvas.height - this.height)) {
            this.yPosition = this.context.canvas.height - this.height;
        }
    }
};

Paddle.prototype.hitDetected = function (xPos, yPos) {
    var top = this.yPosition - (this.height / 2);
    var bottom = this.yPosition + (this.height / 2);
    var side1 = this.xPosition + (this.width / 2);
    var side2 = this.xPosition - (this.width / 2);
    
    if (yPos < top || yPos > bottom) {
        return false;
    }
    if (xPos !== side1 && xPos !== side2){
        //return false;
    }
    return true;
};

function hitTestPoint(x1, y1, w1, h1, x2, y2)
{
//x1, y1 = x and y coordinates of object 1
//w1, h1 = width and height of object 1
//x2, y2 = x and y coordinates of object 2 (usually midpt)
if ((x1 <= x2 && x1+w1 >= x2) &&
(y1 <= y2 && y1+h1 >= y2))
return true;
else
return false;
}

Ball.prototype.serve = function () {
    this.xPosition = this.initialX;
    this.yPosition = this.initialY;
    //this.xSpeed = (Math.random() * 31) - 15;
    //this.ySpeed = (Math.random() * 31) - 15;
    this.xSpeed = 10;
    this.ySpeed = 0;
};

Ball.prototype.updatePosition = function () {
    var updatedX = this.xPosition + this.xSpeed;
    var updatedY = this.yPosition + this.ySpeed;

    if(updatedY > this.context.canvas.height - this.radius || updatedY < this.radius) {
        this.ySpeed = -(this.ySpeed);
        updatedY += this.ySpeed;
    }
    
    if(player.hitDetected(updatedX, updatedY) || computer.hitDetected(updatedX, updatedY)) {
        this.xSpeed = -(this.xSpeed);
        updatedX += this.xSpeed;
        alert("HIT!");
    }
    
    this.xPosition = updatedX;
    this.yPosition = updatedY;
};

Ball.prototype.render = function () {
    this.context.beginPath();
//    this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI, false);
    this.context.rect(this.xPosition, this.yPosition, 5, 5);
    this.context.fill();
};

Player.prototype.hitDetected = function (xPos, yPos) {
    this.paddle.hitDetected(xPos, yPos);
};

Computer.prototype.hitDetected = function (xPos, yPos) {
    this.paddle.hitDetected(xPos, yPos);
};

Player.prototype.render = function () {
    this.paddle.render();
};

Computer.prototype.render = function () {
    this.paddle.render();
};

var canvas = document.getElementById("pongTable");
var context = canvas.getContext('2d');
var player = new Player(context);
var computer = new Computer(context);
var ball = new Ball(400, 275, 10, context);


var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (step) { window.setTimeout(step, 1000 / 60); };

function render() {
    player.render();
    computer.render();
    ball.render();
}

function step() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ball.updatePosition();
    render();
    animate(step);
}

window.onload = function () {
    window.addEventListener('keydown', function (event) {
        player.paddle.move(event.keyCode);
    });
    ball.serve();
    animate(step);
};