let homeBG
let gameBG
let endBG
let recipeBookBG

let startIMG = '/assets/characters&icons/start.png'


// buttons
let startButton

function preload() {
  //load bgs
  homeBG = loadImage('/assets/backgrounds/image.png')
  recipeBookBG = loadImage('/assets/backgrounds/recipeBook.png')
  textAlign(CENTER)
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  startMenu()
  startButton.mousePressed(showRecipeBook)
}

function draw() {

}

function startMenu() {
  background(homeBG)
  textSize(100)
  fill("white")
  text("whisked!", width/2-190, height/5)
  startButton = createImg(startIMG, 'startbutton')
  startButton.position(width/2-90, height-500)
}

function showRecipeBook() {
  background(recipeBookBG)
  textSize(100)
  fill("white")
  text("choose a recipe", width/2-390, height/7)
  startButton.position(-100, -100)
}