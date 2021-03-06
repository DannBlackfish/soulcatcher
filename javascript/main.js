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
let vida = 3;
let scoreUp = new Audio();
scoreUp.src = './audio/score-up.mp3'
let scoreDown = new Audio();
scoreDown.src = './audio/crash.mp3'
let music = new Audio();
music.src = './audio/music.mp3'
//------------------------------------------//
window.onload = function(){
  document.getElementById('btn-center').onclick = () => {
    startGame();
  }
  function startGame() {
  backgroundImg.dibujar()
  updateCanvas();
  music.play();
  } 
}
document.getElementById("btn-center-dos").addEventListener("click", function() {
  document.location.reload();
});
//------------------------------------------//
function updateCanvas(){
  ctx.clearRect(800, 500, 0, 0)
  backgroundImg.dibujar()
  frames++
  characterNew.draw();
  heartNew.draw();
  updateEnemies();
  updateSouls();
  sumaScore();
  backgroundOver.draw();
  requestAnimationFrame(updateCanvas)
}

function updateMusicaFondo(){
  const audio = new Audio()
  audio.src = './musica/musicaFondo.mp3'
  audio.loop = true;
}
//------------------------------------------//
function updateEnemies(){
  for(let i=0; i<enemy.length; i++){
    enemy[i].y += velocity
    enemy[i].draw()
    console.log(enemy)
  }
  if(frames%80 === 0){
    let minWidth = 20
    let maxWidth = 50
    let minHeight = 20
    let maxHeight = 50
    let width = Math.floor(Math.random()*(maxWidth-minWidth)) + minWidth
    let height = Math.floor(Math.random()*(maxHeight-minHeight)) + minHeight
    let position = Math.floor(Math.random()*canvas.width-width+Math.random()*canvas.height-height)
    enemy.push(new Enemies(width,height,position,0))
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
    let minWidth = 20
    let maxWidth = 50
    let minHeight = 20
    let maxHeight = 50
    let width = Math.floor(Math.random()*(maxWidth-minWidth)) + minWidth
    let height = Math.floor(Math.random()*(maxHeight-minHeight)) + minHeight
    let position = Math.floor(Math.random()*canvas.width-width)
    soul.push(new Souls(width,height,position,0))
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
}
//------------------------------------------//
class Backgroundgame extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    const backgroundRaw = new Image()
    backgroundRaw.src = "./images/background-7.gif"
    window.addEventListener("load",()=>{
      this.backgroundimg = backgroundRaw
      this.draw()
    })
  }
draw(){
  if(vida===0){
    music.pause();
    this.backgroundimg.src="./images/background-7.gif";
    ctx.drawImage(this.backgroundimg, this.x, this.y, this.width,this.height);
    clearInterval(startGame);
    }
  }
}
let backgroundOver = new Backgroundgame (500,300,0,0)

//------------------------------------------//
function checkCollition() {
  const crashEnemy = enemy.some(function(obstacle){
    return characterNew.isTouching(obstacle)
  })
  if (crashEnemy){
    scoreDown.play();
    score -=10
    vida -= 1
    let filter = enemy.filter(function(obstacle){
      return characterNew.isTouching(obstacle)
    })
    let index=enemy.indexOf(filter[0])
    enemy.splice(index,1)
  }
}
//------------------------------------------//
function sumaScore() {
  let color = 'white'
  const crashSoul = soul.some(function(obstacle){
    return characterNew.isTouching(obstacle)
  })
  if (crashSoul){
    scoreUp.play()
    score +=10
    let filter = soul.filter(function(obstacle){
      return characterNew.isTouching(obstacle)
    })
    let index=soul.indexOf(filter[0])
    soul.splice(index,1)
  }
  ctx.font = '18px arial';
  ctx.fillStyle = 'white';
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.fillText(`Score: ${score}`, 400, 40);
}
//------------------------------------------//
class Heart extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.heartRaw = new Image()
    this.heartRaw.src = "./images/heart-3.png"
    window.addEventListener("load",()=>{
      this.draw()
    })
  }
  draw(){
    if(vida===3)this.heartRaw.src="./images/heart-3.png"
    if(vida===2)this.heartRaw.src="./images/heart-2.png"
    if(vida===1)this.heartRaw.src="./images/heart-1.png"
    ctx.drawImage(this.heartRaw,this.x, this.y,this.width,this.height)
  }
}
let heartNew = new Heart (77,20,400,50)
//------------------------------------------//
class Player extends Component{
    constructor(width,height,x,y){
      super(width,height,x,y)
      this.speedx = 0
      this.saltando= false
      this.salto=28
      this.vy=0
      const playerRaw = new Image()
      playerRaw.src = "./images/character.png"
      window.addEventListener("load",()=>{
        this.playerimg = playerRaw
        this.draw()
      })
    }
  draw(){
    ctx.drawImage(this.playerimg, this.x, this.y, this.width,this.height)
  }
  moveLeft(){
    this.x-=20
  }
  moveRight(){
    this.x+=20
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
let characterNew = new Player(58,90,200,200)
//------------------------------------------//
class Enemies extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    this.enemyRaw = new Image()
    this.enemyRaw.src = "./images/bad-soul.png"
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
    this.soulRaw.src = "./images/good-soul.png"
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