"use strict";
// Enemies our player must avoid
var Enemy = function() {
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.width = 10;
    this.height = 10;
    this.posicaoY = 75; // coordenada Y de cada coluna
    this.velMax = 450; // Velocidade maxima
    this.y = Math.floor(Math.random() * 3 + 1) * this.posicaoY; //coloca inimigo em uma das 3 colunas
    this.speed = Math.floor(Math.random() * this.velMax + 1); // Velocidade Aleatoria do inimigo
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    if (this.x > ctx.canvas.width) {
        this.x = 0;
    }

    // verifica colisão
    
    if (this.collidesWith(player)) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collidesWith = function(player) {
    
  
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.width = 10;
    this.height = 10;
    this.startcol = 2;
    this.startlinha = 5;
    this.col = this.startcol;
    this.linha = this.startlinha;
    this.posicaoX = 101;
    this.posicaoY = 83;
    this.x = this.col * this.posicaoX;
    this.y = this.linha * this.posicaoY;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function() {
    this.x = this.col * this.posicaoX;
    this.y = this.linha * this.posicaoY;
};


Player.prototype.reset = function() {
    this.col = this.startcol;
    this.linha = this.startlinha;
};


Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.col -= 1;
            if (this.col < 0) {
                this.col = 0;
        }
        break;
        case 'up':
            this.linha -= 1;
            if (this.linha < 0) {
                this.linha = 5;
        }
        break;
        case 'right':
            this.col += 1;
            if (this.col > 4) {
                this.col = 4;
        }
        break;
        case 'down':
            this.linha += 1;
            if (this.linha > 5) {
                this.linha = 5;
        }
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});