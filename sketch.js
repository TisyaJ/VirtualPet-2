var dog;
var dog1, dog2;
var database, foodObj, foodStock;
var lastFed;

function preload()
{
	dog1 = loadImage('images/dogImg.png');
  dog2 = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();

  dog = createSprite(700,200,150,150);
  dog.addImage(dog1);
  dog.scale = 0.2;

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on('value',readStock);


  feed=createButton("Feed the dog"); 
  feed.position(700,95); 
  feed.mousePressed(feedDog); 
  addFood=createButton("Add Food"); 
  addFood.position(800,95); 
  addFood.mousePressed(addFoods);
}


function draw() {  
background('green');
  foodObj.display();
  //add styles here

  feedTime=database.ref('feedTime'); 
  feedTime.on("value",function(data){ 
  lastFed=data.val(); 
 })

 fill(255,255,254); 
 textSize(15); 
 if(lastFed>=12){ 
   text("Last Feed : "+ lastFed%12 + " PM", 350,30); 
  }
  else if(lastFed==0){ 
    text("Last Feed : 12 AM",350,30); 
  }
  else{ 
    text("Last Feed : "+ lastFed + " AM", 350,30); 
  }


drawSprites();
}

function readStock(data){
   food=data.val();
   foodObj.updateFoodStock(food); 
  }

  function feedDog(){ 
    dog.addImage(dog2); 
    if(foodObj.getFoodStock()<= 0){ 
      foodObj.updateFoodStock(foodObj.getFoodStock()*0); 
    }
    else{ 
      foodObj.updateFoodStock(foodObj.getFoodStock()-1); 
    } 
    database.ref('/').update({ 
      food:foodObj.getFoodStock(), feedTime:hour() 
    }) 
}

function addFoods(){ 
  food++; database.ref('/').update({ food:food }) 
}


