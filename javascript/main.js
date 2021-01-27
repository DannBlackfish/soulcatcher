////////GAME CANVAS/////////
var canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
//------------------------------------------//
let frames = 0
let enemy = []
let crash = false
let velocity = 3
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
  updateEnemies();
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
    ctx.drawImage(this.img,this.x,this.y,canvas.width, canvas.height)
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
    izquierda(){
      return this.x
    }
    derecha(){
      return this.x + this.width
    }
    arriba(){
      return this.y
    }
    abajo(){
      return this.y + this.height
    }
    update() {
        const ctx = gameArea.context;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    crash(enemies){
      return (
        this.abajo() < enemies.arriba() ||
        this.arriba() > enemies.abajo()||
        this.derecha() < enemies.izquierda()||
        this.izquierda() > enemies.derecha()
      )
    }
}
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
let characterNew = new Player(58,90,200,200)
//------------------------------------------//
let enemyNew = new Enemies(25,20,10,10)
let yi = 10
function enemigos(){
  let base_image = new Image()
  base_image.src = "images/bad-soul.gif"
  base_image.onload = function(){ 
  ctx.drawImage(base_image, yi, 10,25,20);
  }
}
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