const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg,boat;
var canvas, angle, tower, ground, cannon;
var boatpositions = [];
var balls = [];
var boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES)
  angle = 15
  boatpositions = [-20,-40,-80,-60]
  marks = [10,20,30,40,50]
  console.log(marks)
  marks.push(60)
  console.log(marks)

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, { isStatic: true });
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
 
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
 
  
  push();  
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();


  
  showboats()
  

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    collisionwithBoat(i)
  }

  cannon.display();
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function collisionwithBoat(i){
  for(j=0; j <boats.length; j++){
    var collision =  Matter.SAT.collides(balls[i].body, boats[j].body)
      if(collision.collided == true){
          World.remove(world,boats[j].body)
          //World.remove(world,balls[i].body)
          //delete boats[j]
          delete balls[i]
          setTimeout(() => { World.remove(world, boats[j].body);
          delete boats[j]; 
        }, 
        2000);
      }
}
  
}
function showboats(){
 if(boats.length == 0){
  boat = new Boat(width-79, height - 60, 170, 170,random(boatpositions));
 
  console.log("firstboat")
  boats.push(boat)
  
 } 
 else{
   if(boats[boats.length - 1].body.position.x < width - 300){
    boat = new Boat(width-79, height - 60, 170, 170,random(boatpositions));
    console.log("secondboat")
    boats.push(boat)
   }
    for (var i = 0; i < boats.length; i++) 
  { 
    if (boats[i])
     { Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 }); 
  boats[i].display(); 
 
   }
   
 }                                                            

 
}
}
