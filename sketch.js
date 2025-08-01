let homeBG
let gameBG
let endBG
let recipeBookBG

let startIMG = '/assets/characters&icons/start.png'
let sushiIMG = '/assets/meals/sushi.png'
let chefIMG = '/assets/characters&icons/chef.png'


let score = 0
let hearts = 3
let chefSpeed = 10

let meals
let numDropped = 0
let ingredients

let ingredientSpeed
let gameStarted = false


// buttons
let startButton
let sushiButton
let chefSprite

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
}

function draw() {
  startButton.mousePressed(showRecipeBook)

  if (chefSprite) {
    if (kb.pressing('left') && chefSprite.x > 50) {
    chefSprite.move(30, 'left', chefSpeed)
  } else if (kb.pressing('right') && chefSprite.x < 1450) {
    chefSprite.move(30, 'right', chefSpeed)
  }
  }

  if (gameStarted) {
    background(gameBG)

      textSize(40)
      text(`Score: ${score}`, 100, 50)

      for (let i=0; i < ingredients.length; i++) {
    if (ingredients[i].collides(chefSprite)) {
      score++
      ingredients.remove(ingredients[i])
    }
  }
  }
  
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
  chef()
  ingredientSpeed = 5
  let ingredientStrings = ['assets/ingredients/ingredients_png/grains_png/rice.png', 'assets/ingredients/ingredients_png/seaweeds_png/nori_toasted.png', 'assets/vegatables/veggies/carrot_orange.png', 'assets/vegatables/veggies/ginger.png']
  ingredients = new Group()
  let totalDropping = ingredientStrings.length*3
  for (let i=0; i<totalDropping; i++) {
    let ingredient = new Sprite(-50, -50)
    let index = floor(random(0, ingredientStrings.length))
    let ingredientIMG = ingredientStrings[index]
    ingredient.image = ingredientIMG
    ingredient.scale *= 5
    ingredients.add(ingredient)
  }

  
  let dropping = setInterval(function() {
    dropIngredient()
    print(numDropped,totalDropping)
    if (numDropped === totalDropping) {
    clearInterval(dropping)
    end()
  }
  }, 1000)
  
  // switch (level) {
  //   case 1:
    
  //   case 2:
  // }
  
  background(gameBG)
  sushiButton.position(-250, -250)
  gameStarted = true
}

function dropIngredient() {
  let xCoor = floor(random(100, 750))
  ingredients[numDropped].y = 50
  ingredients[numDropped].x = xCoor
  ingredients[numDropped].vel.x = 0
  ingredients[numDropped].move(800, 'down', ingredientSpeed)
  ingredients[numDropped].physics = DYNAMIC
  numDropped++
  ingredientSpeed++
}

function chef() {
  chefSprite = new Sprite(750, 700)
  chefSprite.image = chefIMG
  chefSprite.scale *= 0.5
  chefSprite.physics = KINEMATIC
}

function end() {
  
}