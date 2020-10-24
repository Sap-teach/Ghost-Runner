var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;
var towerImg,tower;
var doorImage,doorGroup,door;
var climberImg,climber,climberGroup;
var ghostImg,ghost;
var invisibleBlock,invisibleBlockGroup;
var spookySound;


function preload(){
  towerImg=loadImage("tower.png");
  doorImage=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");
  spookySound=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
  
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  console.log(tower.velocityY);
  
  //fr doors
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
  //for ghost
  ghost=createSprite(300,350);
  ghost.addImage(ghostImg);
  ghost.scale=0.35;
}
function draw(){
  background(0);

  if(gameState===PLAY){
  spookySound.play();
    
  //background reset
  if(tower.y>600){
    tower.y=300;
    
  }
  
  //for ghost
  if(keyDown("w")){
    ghost.velocityY=-15;
  }
  ghost.velocityY=ghost.velocityY+1;
  
  if(keyDown("d")){
    ghost.x=ghost.x+5;
  }
  
  if(keyDown("a")){
    ghost.x=ghost.x-5;
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
   ghost.destroy();
    gameState=END;
  }
  spawnDoors();

    //for scoring part
   survivalTime=Math.ceil(frameCount/frameRate());
  
    drawSprites();
    //for survival time
  stroke(254, 141, 119);
  textSize(20);
  fill(0);
  text("Survival Time:"+survivalTime,95,50);
    
 }
 else if(gameState===END){
   background(0);
   spookySound.stop();
   fill(217, 254, 5);
   stroke(0);
   textSize(35);
   text("GAME OVER",210,300);
  
 }
}
function spawnDoors(){
  if(frameCount%200===0){
    door = createSprite(Math.round(random(130,500)),0,20,20);
    door.addImage(doorImage);
    door.velocityY=2;
    door.lifetime=310;
    
    climber=createSprite(door.x,door.y+55,20,20);
    climber.addImage(climberImg);
    climber.velocityY=door.velocityY;
    climber.lifetime=310;
    
    invisibleBlock=createSprite(door.x,door.y+60,climber.width,5);
    invisibleBlock.velocityY=door.velocityY;
    invisibleBlock.lifetime=310;
    //invisibleBlock.debug=true;
    invisibleBlock.visible=false;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock)
   door.depth=ghost.depth;
   ghost.depth=ghost.depth+1;
  }

}

  