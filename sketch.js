let homeBG
let gameBG
let endBG
let recipeBookBG

let startIMG = '/assets/characters&icons/start.png'
let sushiIMG = '/assets/meals/sushi.png'

let score = 0
let hearts = 3

let meals
let numDropped = 0
let ingredients

let ingredientSpeed

// following tutorial now
let fallingObject
let container


// buttons
let startButton
let sushiButton

function preload() {
  //load bgs
  homeBG = loadImage('/assets/backgrounds/image.png')
  recipeBookBG = loadImage('/assets/backgrounds/recipeBook.png')
  gameBG = loadImage('/assets/backgrounds/gamebg.png')
}

function setup() {
  createCanvas(1500, 800);
  console.log(width, height)
  startMenu()
  startButton.mousePressed(showRecipeBook)
}

function draw() {
}

function startMenu() {
  background(homeBG)
  textSize(100)
  fill("white")
  textAlign(CENTER)
  text("whisked!", width/2, 0.2*height)
  startButton = createImg(startIMG, 'startbutton')
  startButton.position(width/2-100, 350)
}

function showRecipeBook() {
  background(recipeBookBG)
  textSize(100)
  fill("white")
  text("choose a recipe", width/2, height*0.1)
  startButton.position(-100, -100)
  sushiButton = createImg(sushiIMG, 'sushi button')
  sushiButton.size(200, 200)
  sushiButton.position(width/4, height*0.4)
  sushiButton.mousePressed(game)
}

function game() {
  // ingredientSpeed = 2
  // let ingredientStrings = ['/assets/ingredients/ingredients_png/grains_png/rice.png', '/assets/ingredients/ingredients_png/seaweeds_png/nori_toasted.png', '/assets/vegatables/veggies/carrot_orange.png', '/assets/vegatables/veggies/ginger.png']
  // ingredients = new Group()
  // for (let i=0; i<(ingredientStrings.length)*2; i++) {
  //   let ingredient = new Sprite(-500, -500)
  //   let ingredientIMG = loadImage(ingredientStrings[i])
  //   ingredient.addImage('item', ingredientIMG)
  //   ingredient.size(50, 50)
  //   ingredients.add(ingredient)
  // }
  
  // let dropping = setInterval(dropIngredient(numDropped), 1000)
  // if (numDropped === ingredients.length) {
  //   clearInterval(dropping)
  // }

  // // switch (level) {
  // //   case 1:
    
  // //   case 2:
  // // }
  
  background(gameBG)
  sushiButton.position(-250, -250)
  fallingObject = new Sprite(100, 0, 10)
}

function dropIngredient(n) {
  let x = random(50, 750)
  ingredients[n].y = 50
  ingredients[n].x = x
  ingredients[n].vel = ingredientSpeed
  numDropped++
}