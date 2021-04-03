//to create the sprite objects
var database;
var dog, dog1, dog2;
var position;
var feed;
var add;
var foodobject;
var Feedtime;
var lastFeed;

//to preload the images
function preload(){

  dogimg1 = loadImage("images/dogImg.png");
  dogimg2 = loadImage("images/dogImg1.png");

}

function setup() {

  //to create the canvas
	createCanvas(1000, 400);

  //to link the programme to the database
  database = firebase.database();
  console.log(database);
 
  //to create the foodobject 
  foodobject = new Food();

  //to create the dog
  dog = createSprite(800,200,10,10);
  dog.addImage(dogimg1);
  dog.scale = 0.2;
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  //to create the buttons
  feed = createButton("FEED DRAGO");
  feed.position(510,15);
  feed.mousePressed(FeedDog);

  add = createButton("ADD FOOD");
  add.position(415,15);
  add.mousePressed(AddFood);

} 

function draw(){

  //to give the background
  background(46,139,87);

  //to display the foodobject
  foodobject.display();

  //to create the objects
  drawSprites();
    
  //to display the text
  fill(255,255,254);
  textSize(15);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFeed = data.val();
  });

  if(lastFeed>=12){

    text("Last Feed : " + lastFeed % 12 +"PM", 260, 30);

  }else if(lastFeed == 0){

    text("Last Feed : 12 AM", 260, 30);

  }else{

    text("Last Feed : "+ lastFeed +"AM", 260, 30);

  }

}
function readPosition(data){

  position = data.val();
  foodobject.updateFoodStock(position);

}

function showError(){

  console.log("Error in writing to the database");

}

function writePosition(nazo){

  if(nazo>0){

    nazo = nazo-1

  }

  else{

    nazo = 0

  }

  database.ref('/').set({

    'Food': nazo

  })

}

function AddFood(){

position++
database.ref('/').update({

  Food:position

}

)}

function FeedDog(){

dog.addImage(dogimg2);
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()

 })

}