var gameState = "fight";
var bg, bgImg;
var player, shooterImg,shootershootingImg;
var zombie, zombieImg, zombieGroup;
var heart1,heart2,heart3,heart1Img,heart2Img,heart3Img;
var bullets = 70;
var bulletGroup, bulletImg;
var looseSound, winSound, explosion;
var life = 3;
var score = 0;

function preload(){
  bgImg = loadImage("assets/bg.jpeg");
  shooterImg = loadImage("assets/shooter_2.png");
  shootershootingImg = loadImage("assets/shooter_3.png");
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  bulletImg = loadImage("assets/bullets.png")
  looseSound = loadSound("assets/lose.mp3")
  winSound = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(displayWidth/2 - 20, displayHeight/2 -40);
  bg.addImage(bgImg);
  bg.scale = 1.1;

  player = createSprite(displayWidth - 1150, displayHeight-300,50, 50);
  player.addImage(shooterImg);
  player.scale = 0.3
  player.debug = false;
  player.setCollider("rectangle", 0, 0, 300,300);

  heart1 = createSprite(displayWidth-150,40,20,20);
  heart1.visible = false;
  heart1.addImage("heart1",heart1Img);
  heart1.scale = 0.4;

  heart2 = createSprite(displayWidth-100,40,20,20);
  heart2.visible = false;
  heart2.addImage("heart2",heart2Img);
  heart2.scale = 0.4;

  heart3 = createSprite(displayWidth-150,40,20,20);
  heart3.addImage("heart3",heart3Img);
  heart3.scale = 0.4;



 zombieGroup = new Group()
 bulletGroup = new Group()
}

function draw(){
  background(0);

  console.log(gameState)

  if(gameState==="fight"){

    if(life === 3){
      heart3.visible=true;
      heart1.visible=false;
      heart2.visible=false;
    }
    if(life === 2){
      heart3.visible=false;
      heart1.visible=false;
      heart2.visible=true;
    }
    if(life === 1){
      heart3.visible=false;
      heart1.visible=true;
      heart2.visible=false;
    }
    if(life === 0){
      gameState = "lost"
      heart3.visible=false;
      heart1.visible=false;
      heart2.visible=false;
    }
    
  if(keyDown(UP_ARROW)){
    player.y = player.y-30;
   }
   if(keyDown(DOWN_ARROW)){
     player.y = player.y+30;
    }
    if(keyDown(RIGHT_ARROW)){
     player.x = player.x+30;
    }
    if(keyDown(LEFT_ARROW)){
     player.x = player.x-30;
    }
    if(keyWentDown("space")){
      player.addImage(shootershootingImg);
      bullet = createSprite(displayWidth - 1150,player.y -30,20,10);
      bullet.addImage(bulletImg)
      bullet.scale=0.15
      bullet.velocityX = 20;
      bulletGroup.add(bullet);
      player.depth=bullet.depth;
      player.depth = player.depth+2;
      bullets-=1;
      explosion.play();
    }
    if(keyWentUp("space")){
      player.addImage(shooterImg);
    }

    if(bullets===0){
      console.log("inside bullets")
      gameState="bullet"
    }
    
    if(zombieGroup.isTouching(player)){
      for(var i = 0; i<zombieGroup.length;i++){
        if(zombieGroup[i].isTouching(player)){
          zombieGroup[i].destroy() 
         life-=1;
        }
      }
    }
 
    if(zombieGroup.isTouching(bulletGroup)){
     for(var i = 0; i<zombieGroup.length;i++){
       if(zombieGroup[i].isTouching(bulletGroup)){
         zombieGroup[i].destroy() 
         bulletGroup.destroyEach()
         explosion.play();
         score+=2;
       }
     }
   }
    
   enemy()

  }
  drawSprites()

  textSize(20);
  fill("white");
  text("bullets = "+ bullets,displayWidth-210,displayHeight/2 - 250);
  text("Score = "+ score,displayWidth-200,displayHeight/2 - 220);
  text("lives = "+ life,displayWidth-200,displayHeight/2 - 280);


  if(gameState==="lost"){
    textSize(100)
    fill("red")
    text("YOU LOSE", 400,400)
    zombieGroup.destroyEach()
    player.destroy()
    looseSound.play();
  }
  else if(gameState==="won"){
    textSize(100)
    fill("yellow")
    text("YOU WON", 400,400)
    zombieGroup.destroyEach()
    player.destroy()
    winSound.play();

  }else if(gameState==="bullet"){
    textSize(50)
    fill("yellow")
    text("YOU RAN OUT OF BULLETS", 470,410)
    zombieGroup.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
  }
  
 

  
 
}

function enemy(){
  if(frameCount%60===0){
    zombie = createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug = false;
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime=350;
    zombieGroup.add(zombie)
  }
}