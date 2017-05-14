"use strict";
// Enemies our player must avoid
var Enemy = function() {
    
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
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
    var colWidth = 85;
    var rowHeight = 85;

    var col = Math.floor(this.x/colWidth);
    var row = Math.floor(this.y/rowHeight) + 1;

    if (col == player.col && row == player.row) {
        return true;
    }
  
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.startcol = 2;
    this.startrow = 5;
    this.col = this.startcol;
    this.row = this.startrow;
    this.posicaoX = 101;
    this.posicaoY = 83;
    this.x = this.col * this.posicaoX;
    this.y = this.row * this.posicaoY;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.update = function() {
    this.x = this.col * this.posicaoX;
    this.y = this.row * this.posicaoY;
};


Player.prototype.reset = function() {
    this.col = this.startcol;
    this.row = this.startrow;
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
            this.row -= 1;
            if (this.row < 1) {
                this.row = 5;
                alert("Parabéns você ganhou!")
        }
        break;
        case 'right':
            this.col += 1;
            if (this.col > 4) {
                this.col = 4;
        }
        break;
        case 'down':
            this.row += 1;
            if (this.row > 5) {
                this.row = 5;
        }
        break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

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