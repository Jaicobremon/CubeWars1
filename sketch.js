var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var cubes, cube1, cube2, cube3, cube4, cube5, cube6;
var Gamerimg, Happyguyimg, Kingimg, Normalimg,Presidentimg,Securityimg;

function preload(){
  Gamerimg=loadImage("images/Gamer.png");

  Happyguyimg=loadImage("images/Happy Guy.png");

  Kingimg=loadImage("images/King.png");

  Normalimg=loadImage("images/Normal.gif");

  Presidentimg=loadImage("images/President.png");

  Securityimg=loadImage("images/Security.png")
}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}


function draw(){
  if(playerCount === 6){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }

}
