////////GAME CANVAS/////////
var canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
//------------------------------------------//
let frames = 0;
let enemy = [];
let crash = false;
let velocity = 3;
let soul = [];
let score = 0;
let vida = 10;
//------------------------------------------//
window.onload = function(){
  document.getElementById('btn-center').onclick = () => {
    startGame();
  }
  function startGame() {
    backgroundImg.dibujar()
    updateCanvas()
  } 
}
//------------------------------------------//
function updateCanvas(){
  ctx.clearRect(0, 0, 800, 500)
  backgroundImg.dibujar()
  frames++
  characterNew.draw();
  heartNew.draw();
  heartdosNew.draw();
  heartresNew.draw();
  updateEnemies();
  updateSouls();
  sumaScore();
  fondoGameOverNew.draw()
  requestAnimationFrame(updateCanvas)
}
//------------------------------------------//
function updateEnemies(){
  for(let i=0; i<enemy.length; i++){
    enemy[i].y += velocity
    enemy[i].draw()
    console.log(enemy)
  }
  if(frames%80 === 0){
    let minWidth = 10
    let maxWidth = 50
    let width = Math.floor(Math.random()*(maxWidth-minWidth)) + minWidth
    let position = Math.floor(Math.random()*canvas.width-width)
    enemy.push(new Enemies(width,12,position,0))
  }
  checkCollition()
}
//------------------------------------------//
function updateSouls(){
  for(let i=0; i<soul.length; i++){
    soul[i].y += velocity
    soul[i].draw()
    console.log(soul)
  }
  if(frames%100 === 0){
    let minWidth = 10
    let maxWidth = 50
    let width = Math.floor(Math.random()*(maxWidth-minWidth)) + minWidth
    let position = Math.floor(Math.random()*canvas.width-width)
    soul.push(new Souls(width,12,position,0))
  }
}
//------------------------------------------//
const imgRaw = new Image()
imgRaw.src = "./images/background-4.gif"
//------------------------------------------//
const backgroundImg = {
  img: imgRaw ,
  x:0,
  y:0,
  speed:0,
  mover: function(){
    this.y += this.speed
    this.y %= canvas.height
  },
  dibujar : function(){
    ctx.drawImage(this.img,this.x,this.y, canvas.width, canvas.height)
  }
}
//------------------------------------------//
class Component {
    constructor(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0
        this.speedY = 0
    }
    isTouching(enemy) {
      return (
        this.x < enemy.x + enemy.width &&
        this.x + this.width > enemy.x &&
        this.y < enemy.y + enemy.height &&
        this.y + this.height > enemy.y
      )
    }
    isTouching(soul) {
      return (
        this.x < soul.x + soul.width &&
        this.x + this.width > soul.x &&
        this.y < soul.y + soul.height &&
        this.y + this.height > soul.y
      )
    }
    isTouching(characterNew) {
      return (
        this.x < characterNew.x + characterNew.width &&
        this.x + this.width > characterNew.x &&
        this.y < characterNew.y + characterNew.height &&
        this.y + this.height > characterNew.y
      )
    }
    fondoFinal(fondoGameOverNew){
      return fondoGameOverNew.draw()
    }
}
//------------------------------------------//
function tocarPared(){
  let dx=800
  let dy=500
  let x=0
  let y=0
  if(x + dx > canvas.width-characterNew.isTouching  || x + dx < characterNew.isTouching ) {
    dx = -dx;
}
  if(y + dy > canvas.height-characterNew.isTouching  || y + dy < characterNew.isTouching ) {
  dy = -dy;
}
}
//------------------------------------------//
function checkCollition() {
  const crashEnemy = enemy.some(function(obstacle){
    return characterNew.isTouching(obstacle)
  })
  if (crashEnemy){
    score -=10
    let filter = enemy.filter(function(obstacle){
      return characterNew.isTouching(obstacle)
    })
    let index=enemy.indexOf(filter[0])
    enemy.splice(index,1)
  }
/*
    if (score<=-30) {
      gameOver();
    }
  */
}


/*
function gameOver() {
    fondoFinal.stop()
    //location.reload()
}
*/
//------------------------------------------//
function sumaScore() {
  const crashSoul = soul.some(function(obstacle){
    return characterNew.isTouching(obstacle)
  })
  if (crashSoul){
    score +=10
    let filter = soul.filter(function(obstacle){
      return characterNew.isTouching(obstacle)
    })
    let index=soul.indexOf(filter[0])
    soul.splice(index,1)
  }
  ctx.font = '18px serif';
  ctx.fillStyle = 'black';
  ctx.fill= '#0095DD'
  ctx.fillText(`Score: ${score}`, 350, 50);
}
//------------------------------------------//
/*
function eliminarVida() {
  const quitarVida = heartNew.some(function(obstacle){
    return characterNew.isTouching(obstacle)
  })
  if (quitarVida){
    score -=10
    let filter = heartNew.filter(function(obstacle){
      return characterNew.isTouching(obstacle)
    })
    let index=heartNew.indexOf(filter[0])
    heartNew.splice(index,1)
  }
}
*/
//------------------------------------------//
class GameOver extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.fondoGameOverRaw = new Image()
    this.fondoGameOverRaw.src = "./images/background-7.gif"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.fondoGameOverRaw,this.x, this.y,this.width,this.height)
  }
}
let fondoGameOverNew = new GameOver (0,0,800,500)
//------------------------------------------//
class Heart extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.heartRaw = new Image()
    this.heartRaw.src = "./images/vida.png"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.heartRaw,this.x, this.y,this.width,this.height)
  }
  quitarCorazon(score) {
    if (score=-10) {
      heartNew.delete
    }
  }
}
let heartNew = new Heart (20,20,400,50)
//------------------------------------------//
class Heartdos extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.heartRaw = new Image()
    this.heartRaw.src = "./images/vida.png"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.heartRaw,this.x, this.y,this.width,this.height)
  }
  quitarCorazon(score) {
    if (score=-20) {
      heartdosNew.delete
    }
  }
}
let heartdosNew = new Heartdos (20,20,420,50)
//------------------------------------------//
class Heartres extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.heartRaw = new Image()
    this.heartRaw.src = "./images/vida.png"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.heartRaw,this.x, this.y,this.width,this.height)
  }
  quitarCorazon(score) {
    if (score=-30) {
      heartresNew.delete
    }
  }
}
let heartresNew = new Heartres (20,20,440,50)
//------------------------------------------//
class Player extends Component{
    constructor(width,height,x,y){
      super(width,height,x,y)
      this.speedx = 0
      this.saltando= false
      this.salto=28
      this.vy=0
      const playerRaw = new Image()
      playerRaw.src = "./images/character.gif"
      window.addEventListener("load",()=>{
        this.playerimg = playerRaw
        this.draw()
      })
    }
  draw(){
    ctx.drawImage(this.playerimg, this.x, this.y, this.width,this.height)
  }
  moveLeft(){
    this.x-=10
  }
  moveRight(){
    this.x+=10
  }
  jump () {
    this.saltando = true
  }
  gravedad(){      
    if(this.saltando === true){
      if(this.vy < 30){
        this.vy += 10
        this.y -= this.vy
        return
      }
      if(this.vy === 30) {
        this.vy += 30
        this.y = this.vy + this.y
        return
      }
      this.vy = 0
    } 
    this.saltando = false
    return
  }
}
//------------------------------------------//
class Enemies extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.enemyRaw = new Image()
    this.enemyRaw.src = "./images/bad-soul.gif"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.enemyRaw,this.x, this.y,this.width,this.height)
  }
  newPos(){
    this.y += this.speedY
  }
}
//------------------------------------------//
class Souls extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.soulRaw = new Image()
    this.soulRaw.src = "./images/good-soul.gif"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    ctx.drawImage(this.soulRaw,this.x, this.y,this.width,this.height)
  }
  newPos(){
    this.y += this.speedY
  }
}
//------------------------------------------//
let characterNew = new Player(58,90,200,200)
//------------------------------------------//

/////////Listeners/////////
document.addEventListener('keydown', (e) => {
  switch (e.keyCode){
    case 37:
    characterNew.moveLeft()
      break
    case 39:
    characterNew.moveRight()
      break
    case 32:
    characterNew.jump.gravedad()
      break
    }
    });