// backgrounds
let homeBG
let gameBG
let endBG
let recipeBookBG

// game pieces/components
let endCard
let chefIMG_TEMP
let left
let right
let heartIMG
let starIMG
let ingredients
let chefSprite

// variables + other info
let score = 0
let ratsCaught = 0
let ingredientsCaught = 0
let lives = []
let chefSpeed = 15
let meals
let numDropped = 0
let totalDropping
let ingredientsGroup
let ingredientSpeed
let gameStarted = false
let numOfRats
let difficulty = 0
let dropping

// image paths
let startIMG = '/assets/characters&icons/start.png'
let sushiIMG = '/assets/meals/sushi.png'
let chefIMG = '/assets/characters&icons/chef.png'
let ratIMG = '/assets/characters&icons/rat.png'
let ramenIMG = '/assets/meals/ramen.png'
let cakeIMG = '/assets/meals/cake.png'
let questionIMG = '/assets/characters&icons/question.png'
let xIMG = '/assets/characters&icons/x.png'
let menuIMG = '/assets/characters&icons/menu.png'
let againIMG = '/assets/characters&icons/again.png'

// buttons
let startButton
let sushiButton
let cakeButton
let ramenButton
let questionButton
let xButton
let againButton
let menuButton

// miscellaneous
let ByteBounce

function preload() {
  //load bgs
  homeBG = loadImage('/assets/backgrounds/image.png')
  recipeBookBG = loadImage('/assets/backgrounds/recipeBook.png')
  gameBG = loadImage('/assets/backgrounds/gamebg.png')
  endCard = loadImage('/assets/characters&icons/endCard.png')

  //load font
  ByteBounce = loadFont('/assets/fonts/ByteBounce.ttf')

  //instructions
  chefIMG_TEMP = loadImage(chefIMG)
  left = loadImage('/assets/characters&icons/left.png')
  right = loadImage('/assets/characters&icons/right.png')

  starIMG = loadImage('/assets/characters&icons/star.png')
  heartIMG = loadImage('/assets/characters&icons/heart.png')
}

function setup() {
  createCanvas(1500, 800);
  console.log(width, height)
  textFont(ByteBounce)
  left.resize(84*1.5, 77*1.5)
  right.resize(84*1.5, 77*1.5)
  startMenu()
}

function draw() {
  startButton.mousePressed(showRecipeBook)
  questionButton.mousePressed(showInstructions)
  xButton.mousePressed(startMenu)
  if (againButton && menuButton) {
    againButton.mousePressed(game)
    menuButton.mousePressed(startMenu)
  }

  // chef movement
  if (chefSprite) {
    if (kb.pressing('left') && chefSprite.x > 50) {
    chefSprite.move(30, 'left', chefSpeed)
  } else if (kb.pressing('right') && chefSprite.x < 1450) {
    chefSprite.move(30, 'right', chefSpeed)
  }
  }

  // game logic
  if (gameStarted) {
    background(gameBG)

      textSize(40)
      // score + lives
      text(`Score: ${score}`, 100, 50)

      for (let n=0; n<lives.length; n++) {
        image(heartIMG, 30+(n*80), 75)
      }

      // collision detection
      chefSprite.overlapping(ingredientsGroup, (chef, ing) => {
        if (ing.type === 'rat') {
          if (score > 0) {
            score--
            ratsCaught++
          } else if (score === 0) {
            lives.pop()
            print(`you lost a life!`)
          }
          
          print('you added a rat to the recipe EW')
        } else {
          score++
          ingredientsCaught++
        }
        ing.delete()
      })

      // checking if player lost all lives
      if (lives.length === 0) {
        clearInterval(dropping)
        end()
      }
  }
  
}

function showInstructions() {
    background(gameBG)
    startButton.position(-500, -500)
    questionButton.position(-400, -400)
    xButton.position(1400, height-100)
    textSize(60)
    text(`1. Collect ALL the ingredients to cook your recipe\n2. Avoid the rats sneaking into the food\n 3. Get whisked away in the rush!`, 750, 200)
    
    //controls
    image(chefIMG_TEMP, width/2-100, 500)
    image(left, width/2-250, 570)
    image(right, width/2+150, 570)
}

function startMenu() {
  resetGameState()
  imageMode(CORNER)
  background(homeBG)

  // whisked title
  textSize(300)
  fill(42, 56, 38)
  textAlign(CENTER)
  text("whisked!", width/2, 0.31*height)
  text("whisked!", width*0.51, 0.31*height)
  text("whisked!", width*0.49, 0.31*height)
  textSize(270)
  fill(235, 234, 199)
  textAlign(CENTER)
  text("whisked!", width/2, 0.3*height)

  startButton = createImg(startIMG, 'startbutton')
  startButton.size(220, 100)
  startButton.position(width/2-100, 350)
  textSize(150)

  questionButton = createImg(questionIMG, 'instructions')
  questionButton.size(75, 75)
  questionButton.position(30, height-100)

  xButton = createImg(xIMG, 'instructions')
  xButton.size(75, 75)
  xButton.position(-300, -300)
}

function showRecipeBook() {
  imageMode(CORNER)
  if (questionButton) {
    questionButton.position(-40000, -40000)
  }
  background(recipeBookBG)
  textSize(100)
  fill("white")
  text("choose a recipe", width/2, height*0.1)
  startButton.position(-100, -100)

  // setting difficulty based on recipe chosen
  sushiButton = createImg(sushiIMG, 'sushi button')
  sushiButton.size(200, 200)
  sushiButton.position(475, height*0.25)
  sushiButton.mousePressed(function() {
    difficulty = 1
    game()
  })
  cakeButton = createImg(cakeIMG, 'cake button')
  cakeButton.size(200, 175)
  cakeButton.position(275, height*0.4)
  cakeButton.mousePressed(function() {
    difficulty = 2
    game()
  })
  ramenButton = createImg(ramenIMG, 'ramen button')
  ramenButton.size(200, 200)
  ramenButton.position(475, height*0.55)
  ramenButton.mousePressed(function() {
    difficulty = 3
    game()
  })
}

function game() {
  resetGameState()
  imageMode(CORNER)

  chef() // setting up chef player

  let ingredientStrings

  // changing game vars according to difficulty
  switch (difficulty) {
    case 1:
    ingredientSpeed = 10
    numOfRats = 5
    ingredientStrings = ['assets/ingredients/ingredients_png/grains_png/rice.png', 'assets/ingredients/ingredients_png/seaweeds_png/nori_toasted.png', 'assets/vegatables/veggies/carrot_orange.png', 'assets/vegatables/veggies/ginger.png']
    totalDropping = ingredientStrings.length*3 + numOfRats
    break
    
    case 2:
    ingredientSpeed = 12
    chefSpeed = 20
    numOfRats = 10
    ingredientStrings = ['assets/ingredients/ingredients_png/grains_png/wheat.png', '/assets/ingredients/ingredients_png/eggs_png/whole_egg_02.png', '/assets/ingredients/ingredients_png/yogurt_and_milk_png/milk_bottled.png', '/assets/fruits+nuts/fruits_png/strawberry.png']
    totalDropping = ingredientStrings.length*4 + numOfRats
    break
    
    case 3:
    ingredientSpeed = 14
    chefSpeed = 25
    numOfRats = 15
    ingredientStrings = ['assets/ingredients/ingredients_png/grains_png/wheat.png', '/assets/ingredients/ingredients_png/eggs_png/whole_egg_01.png', 'assets/ingredients/ingredients_png/seaweeds_png/nori_toasted.png', 'assets/vegatables/veggies/ginger.png', 'assets/vegatables/veggies/carrot_orange.png', '/assets/vegatables/veggies/pepper_chili_red.png']
    totalDropping = ingredientStrings.length*4 + numOfRats
    break
  }

  // setting up ingredients + rats array
  ingredients = []
  ingredientsGroup = new Group()
  for (let i=0; i<totalDropping; i++) {
    let ingredient = new Sprite(-5000-(i*5), -50)
    ingredient.type = 'ingredient'
    let index = floor(random(0, ingredientStrings.length))
    let ingredientIMG = ingredientStrings[index]
    ingredient.image = ingredientIMG
    ingredient.scale *= 5
    ingredients.push(ingredient)
    ingredientsGroup.add(ingredient)
  }
  //adding rats then shuffling..because you can do that apparently??
  for (let i=0; i<numOfRats; i++) {
    let rat = new Sprite(-5000-(i*5), -50)
    rat.type = 'rat'
    rat.image = ratIMG
    rat.scale *= 0.5
    rat.collider = 'rectangle'
    rat.w = 80
    rat.h = 80
    let index = floor(random(0, ingredients.length+1))
    ingredients.splice(index, 0, rat)
    ingredientsGroup.add(rat)
    print(rat)
  }
  shuffle(ingredients)

  // dropping ingredients + rats every 1 second
  dropping = setInterval(function() {
    print(numDropped,totalDropping, ingredients.length)
    // if all ingredients are dropped, stop interval
    if (numDropped === ingredients.length) {
    clearInterval(dropping)
    end()
  } else {
    dropIngredient()
  }
  }, 1000)

  // inital lives set up
  for (let n=0; n<3; n++) {
          let heart = image(heartIMG, 50+(n*90), 100)
          lives.push(heart)
  }

  background(gameBG)
  sushiButton.position(-250, -250)
  cakeButton.position(-350, -350)
  ramenButton.position(-450, -450)
  gameStarted = true // starts game logic in draw()
}

function dropIngredient() {
  let xCoor = floor(random(100, 1400))
  ingredients[numDropped].y = 50
  ingredients[numDropped].x = xCoor
  ingredients[numDropped].vel.x = 0
  ingredients[numDropped].bounciness = 0;        // No bouncing
  ingredients[numDropped].rotationLock = true;   // Prevent spinning
  ingredients[numDropped].vel.y = ingredientSpeed 
  ingredients[numDropped].physics = DYNAMIC
  numDropped++
  ingredientSpeed += 0.2
}

function chef() {
  chefSprite = new Sprite(750, 700)
  chefSprite.image = chefIMG
  chefSprite.scale *= 0.5
  chefSprite.friction = 0; 
  chefSprite.physics = KINEMATIC
}

function end() {
  imageMode(CENTER)
  // calculating accuracy out of 100
  let accuracyPercent = 0;
  let totalAttempts = ingredientsCaught + ratsCaught;

  if (totalAttempts > 0) {
    accuracyPercent = (score / totalAttempts) * 100;
  }
  accuracyPercent = round(accuracyPercent);

  print(`you caught ${ingredientsCaught} ingredients and ${ratsCaught} rats. your is accuracy:`)
  print(accuracyPercent)

  // tried to delete things but idk if it works..
  ingredients = []
  ingredientsGroup.delete()
  chefSprite.delete() //not working??

  
  let numOfStars = 0
  let customText = ``
  image(endCard, 750, 400)
  // custom response + # of stars based on accuracy percent
  if (accuracyPercent <= 33.3 && accuracyPercent > 0) {
    numOfStars = 0
    customText = `Ew..This tastes like\nrats and garbage`
  }
  if (accuracyPercent < 5) {
    numOfStars = 1
    customText = `I can taste the effort..\nand the garbage!`
  }
  if (accuracyPercent >= 33.3 && accuracyPercent <= 80.6) {
    numOfStars = 2
    customText = `Ok this is kinda yum`
  }
  if (accuracyPercent >= 80.6) {
    numOfStars = 3
    customText = `MASTERCHEF GIMME 14\nOF 'EM RIGHT NOW`
  }
  textSize(55)
  text(`${customText}\nScore: ${score}`, 750, 300)
  for (let i=0; i<numOfStars; i++) {
    image(starIMG, 600+(i*120), 500)
  }
  menuButton = createImg(menuIMG)
  menuButton.size(75, 75)
  againButton = createImg(againIMG)
  againButton.size(75, 75)
  menuButton.position(625, 600)
  againButton.position(775, 600)

  gameStarted = false
  score = 0
  lives = []
}

function resetGameState() {

  clearInterval(dropping)


  gameStarted = false
  score = 0
  ratsCaught = 0
  ingredientsCaught = 0
  numDropped = 0
  //difficulty = 0
  chefSpeed = 15
  lives = []

  if (ingredientsGroup) ingredientsGroup.removeAll()
  if (chefSprite) {
    chefSprite.remove()
    chefSprite = null
  }


  if (sushiButton) sushiButton.position(-5000, -5000)
  if (cakeButton) cakeButton.position(-5000, -5000)
  if (ramenButton) ramenButton.position(-5000, -5000)

  if (menuButton) menuButton.position(-5000, -5000)
  if (againButton) againButton.position(-5000, -5000)
}