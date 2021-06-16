//Declaring the variables
var back, back2, backImg;
var player, playerImg;
var cake, cakeImg;
var SERVE=0;
var PLAY=1;
var END=2;
var gameState=0;
var start, startImg;
var ch1, chImg1;
var ch2, chImg2;
var ch3, chImg3;
var ch4, chImg4;
var ch5, chImg5;
var score;
var cakeGroup;
var ground;
var mouse, mouseImg;
var restart, restartImg;
var sadPlr, sadPlrImg;

//Loading the images
function preload(){
backImg=loadImage("bgImg.jpg");
playerImg=loadImage("playerImg.png");
cakeImg=loadImage("cakeImg.png");
startImg=loadImage("start.png");
chImg1=loadImage("ch1.png");
chImg2=loadImage("ch2.png");
chImg3=loadImage("ch3.png");
chImg4=loadImage("ch4.png");
chImg5=loadImage("ch5.png");
restartImg=loadImage("restart.png");
mouseImg=loadImage("mouse.png");
sadPlrImg=loadImage("sad.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);

//Creating the backgrounds
back2=createSprite(windowWidth/2,windowHeight/2,1200,1200);
back2.addImage(backImg);
back2.scale=2.5;
back=createSprite(windowWidth/2,windowHeight/2,1200,1200);
back.addImage(backImg);
back.scale=2.5;

//Creating the invisible ground
ground=createSprite(windowWidth/2,windowHeight/2+280,windowWidth,100);
ground.visible=false;

//Creating the Doraemon
player=createSprite(windowWidth/2-400,windowHeight/2-30);
player.addImage(playerImg);
player.scale=0.9;

//Creating the start button
start=createSprite(windowWidth/2,windowHeight/2);
start.addImage(startImg);
start.scale=0.5;

//Creating extra character-1
ch1=createSprite(windowWidth/2-200,windowHeight/2+180);
ch1.addImage(chImg1);
ch1.scale=0.6;

//Creating extra character-2
ch2=createSprite(windowWidth/2+80,windowHeight/2+180);
ch2.addImage(chImg2);
ch2.scale=0.7;

//Creating extra character-3
ch3=createSprite(windowWidth/2-50,windowHeight/2+180);
ch3.addImage(chImg3);
ch3.scale=1.3;

//Creating extra character-4
ch4=createSprite(windowWidth/2+250,windowHeight/2+170);
ch4.addImage(chImg4);
ch4.scale=0.6;

//Creating extra character-5
ch5=createSprite(windowWidth/2+400,windowHeight/2-30);
ch5.addImage(chImg5);
ch5.scale=0.6;

//Setting the score
score=0;

//Creating the cakes' group
cakeGroup=createGroup();

//Creating the restart button
restart=createSprite(windowWidth/2,windowHeight/2-60);
restart.addImage(restartImg);

//Creating the sad doraemon
sadPlr=createSprite(windowWidth/2,windowHeight/2+150);
sadPlr.addImage(sadPlrImg);
sadPlr.scale=1.5;
}

function draw(){
    background(0);
    drawSprites();

    //Text for score
    fill("black");
    stroke("black");
    textSize(30);
    text("Score:"+score,windowWidth/2+400,windowHeight/2-200);

    //Setting the gamestate conditions for SERVE
    if(gameState===SERVE){
    sadPlr.visible=false;
    restart.visible=false;
    fill("black");
    stroke("black");
    textSize(30);
    text("Press the 'START' button to play!",windowWidth/2-200,windowHeight/2-250);
    textSize(20);
    text("Press the UP ARROW KEY and strive to keep Doraemon in air!",windowWidth/2-260,windowHeight/2-150);
        if(mousePressedOver(start)){
        startButton();
        }
    } 

    //Setting the gamestate conditions for PLAY
    if(gameState===PLAY){
      textSize(25);
      text("Remember! Doraemon hates mice...So, don't let him touch the ground!",windowWidth/2-550,windowHeight-530); 
      text("Instead, keep collecting the Dora Cakes!!",windowWidth/2-550,windowHeight/2-200);
      player.visible=true;
      sadPlr.visible=false;
      restart.visible=false;
      back.velocityX=-10;
      if (back.x<windowWidth/4){
      back.x=back.width;
      }
      cakes();
      if(keyDown(UP_ARROW)){
      player.velocityY=-9;
      }
      player.velocityY=player.velocityY+1;
      if(player.isTouching(cakeGroup)){
      score=score+1;
      cakeGroup.destroyEach();
      }
      if(player.isTouching(ground)){
      gameState=END;
      }
      mice();
    }

    //Setting the conditions for the end gamestate
    if(gameState===END){
    sadPlr.visible=true;
    back.velocityX=0;
    player.velocityX=0;
    player.velocityY=0;
    cakeGroup.destroyEach();
    stroke("lightblue");
    strokeWeight(5);
    textSize(40);
    text("Uh oh! Don't worry, try again!",windowWidth/2-230,windowHeight/2-200);
    restart.visible=true;
    if(mousePressedOver(restart)){
    restartButton();
    }
    player.visible=false;
    } 
}

//Function for the start button
function startButton(){
gameState=PLAY;
ch1.visible=false;
ch2.visible=false;
ch3.visible=false;
ch4.visible=false;
ch5.visible=false;
start.visible=false;
}

//Function for spawning the Dora-Cakes
function cakes(){
    if(frameCount%100===0){
     cake=createSprite(windowWidth/2+200,windowHeight/2,40,10);
     cake.y=Math.round(random(150,windowHeight/2));
     cake.addImage(cakeImg);
     cake.velocityX=-6;
     cake.scale=0.3;
     cake.lifetime=160;
     cakeGroup.add(cake);
    }
}

//Function for restarting the game
function restartButton(){
  gameState=PLAY;
  player.x=windowWidth/2-400;
  player.y=windowHeight/2-100;
  score=0;
}

//Function for spawning the mice
function mice(){
  if(frameCount%100===0){
  mouse=createSprite(windowWidth/2+100,windowHeight/2+240);
  mouse.addImage(mouseImg); 
  mouse.scale=0.7;
  mouse.velocityX=-13;
  }
}
