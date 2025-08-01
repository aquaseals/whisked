let homeBG
let gameBG
let endBG
let recipeBookBG

let startIMG = '/assets/characters&icons/start.png'
let sushiIMG = '/assets/meals/sushi.png'
let chefIMG = '/assets/characters&icons/chef.png'
let ratIMG = '/assets/characters&icons/rat.png'
let ramenIMG = '/assets/meals/ramen.png'
let cakeIMG = '/assets/meals/cake.png'


let score = 0
let hearts = 3
let chefSpeed = 15

let meals
let numDropped = 0
let totalDropping
let ingredients

let ingredientSpeed
let gameStarted = false

let numOfRats
let ratIndex

let difficulty = 0

// buttons
let startButton
let sushiButton
let cakeButton
let ramenButton
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
      ingredients[i].x = -1*(random(200, 1000))
      ingredients[i].y = -1*(random(200, 1000))
      if (ratIndex.includes(i)) {
        score--
      } else {
        score++
      }
      
    } else if (ingredients[i].y > 750) {
      ingredients[i].x = -1*(random(200, 1000))
      ingredients[i].y = -1*(random(200, 1000))
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
  sushiButton.mousePressed(function() {
    difficulty = 1
    game()
  })
}

function game() {
  chef()
  // switch (difficulty) {
  //   case 1:
    
  //   case 2:
    
  //   case 3:
  // }
  ingredientSpeed = 10
  let ingredientStrings = ['assets/ingredients/ingredients_png/grains_png/rice.png', 'assets/ingredients/ingredients_png/seaweeds_png/nori_toasted.png', 'assets/vegatables/veggies/carrot_orange.png', 'assets/vegatables/veggies/ginger.png']
  numOfRats = 5
  ingredients = []
  ratIndex = []
  totalDropping = ingredientStrings.length*3 + numOfRats
  for (let i=0; i<totalDropping; i++) {
    let ingredient = new Sprite(-50-(i*5), -50)
    let index = floor(random(0, ingredientStrings.length))
    let ingredientIMG = ingredientStrings[index]
    ingredient.image = ingredientIMG
    ingredient.scale *= 5
    ingredients.push(ingredient)
  }
  //adding rats at random positions
  for (let i=0; i<numOfRats; i++) {
    let rat = new Sprite(-50-(i*5), -50)
    let index = floor(random(0, ingredients.length+1))
    ratIndex.push(index)
    rat.image = ratIMG
    rat.scale *= 0.45
    ingredients.splice(index, 1, rat)
    print(rat)
  }

  
  let dropping = setInterval(function() {
    print(numDropped,totalDropping, ingredients.length)
    if (numDropped === totalDropping) {
    clearInterval(dropping)
  } else {
    dropIngredient()
  }
  }, 1000)
  
  background(gameBG)
  sushiButton.position(-250, -250)
  gameStarted = true
}

function dropIngredient() {
  let xCoor = floor(random(100, 1400))
  ingredients[numDropped].y = 50
  ingredients[numDropped].x = xCoor
  ingredients[numDropped].vel.x = 0
  ingredients[numDropped].bounciness = 0;        // No bouncing
  ingredients[numDropped].friction = 10;          // No friction
  ingredients[numDropped].rotationLock = true;   // Prevent spinning
  ingredients[numDropped].move(800, 'down', ingredientSpeed)
  ingredients[numDropped].physics = DYNAMIC
  numDropped++
  ingredientSpeed++
}

function chef() {
  chefSprite = new Sprite(750, 700)
  chefSprite.image = chefIMG
  chefSprite.scale *= 0.5
  chefSprite.friction = 0; 
  chefSprite.physics = KINEMATIC
}

function end() {
  
}