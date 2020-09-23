var monkey, monkey_running
var banana, bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var ground
var count = true
var gameStates = "play"
var survivalTime = 0
var still
function preload() {
still = loadAnimation("sprite_0.png")
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png")

}



function setup() {

  monkey = createSprite(45, 350, 10, 10)
  monkey.addAnimation("go", monkey_running)
  monkey.scale = 0.15
  ground = createSprite(0, 350, 600, 10)
  ground.velocityX = -4
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background("white")

  ground.shapeColor = "gray"
  if (gameStates == "play") {

    if (keyDown("space") && monkey.y >= 285) {
      monkey.velocityY = -15
    }
    monkey.velocityY = monkey.velocityY + 0.8
    monkey.collide(ground)
    ground.x = ground.width / 2

    if (monkey.isTouching(obstacleGroup)) {
      gameStates = "end"
    }

    if (gameStates == "end") {
      foodGroup.setvelocityEach = 0
      obstacleGroup.setvelocityEach = 0
      monkey.destroy()
      ground.destroy()
      
    }
     if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach()
    score = score + 1
  }
    math()
    food()
    rocks()
  }
  drawSprites()
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(0, 0, 10, 10)
    banana.addAnimation("fruit", bananaImage)
    banana.scale = 0.08
    banana.x = Math.round(random(100, 325))
    banana.y = Math.round(random(200, 300))
    banana.velocityX = -4
    banana.lifetime = 150

    foodGroup.add(banana)
  }
}
function math(){

 
  stroke("white")
  textSize(20)
  fill("white")
  text("Score: "+score,500,50)
  stroke("black")
  textSize(20)
  fill("black")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,100,50)
}
function rocks() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(350, 333, 10, 10)
    obstacles.addImage("stone", obstacleImage)
    obstacles.scale = 0.15
    //obstacles.x = Math.round(random(100,325))
    obstacles.velocityX = -5
    obstacles.lifetime = 150

    obstacleGroup.add(obstacles)
  }
}