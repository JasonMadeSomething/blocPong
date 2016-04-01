function Paddle(xPos, yPos, width, height, speed, context) {
    this.xPosition = xPos;
    this.yPosition = yPos;
    this.width = width;
    this.height = height;
    this.context = context;
    this.speed = speed;
}

function Ball(xPos, yPos, radius, context) {
    this.xPosition = xPos;
    this.yPosition = yPos;
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
        if (this.yPosition <= 0) {
            this.yPosition = 0;
        }
    } else if (keyCode === 40) {
        this.yPosition += this.speed;
        if (this.yPosition >= (this.context.canvas.height - this.height)) {
            this.yPosition = this.context.canvas.height - this.height;
        }
    }
};

Ball.prototype.render = function () {
    this.context.beginPath();
    this.context.arc(this.xPosition, this.yPosition, this.radius, 0, 2 * Math.PI, false);
    this.context.fill();
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
    context.canvas.width = context.canvas.width;
    render(context);
    animate(step);
}

window.onload = function () {
    window.addEventListener('keydown', function (event) {
        player.paddle.move(event.keyCode);
    });
    animate(step);
};