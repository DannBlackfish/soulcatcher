////////GAME CANVAS/////////
var canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

let frames = 0
let enemy = []
let crash = false
let velocity = 3

window.onload = function(){
  document.getElementById('btn-center').onclick = () => {
    startGame();
  }
  function startGame() {
    backgroundImg.dibujar()
    updateCanvas()
  }  
}

function updateCanvas(){
  console.log(frames)
  ctx.clearRect(0, 0, 800, 500)
  backgroundImg.dibujar()
  frames++
  gravedad();
  characterNew.draw();
  updateEnemies();
  requestAnimationFrame(updateCanvas) 
}

const imgRaw = new Image()
imgRaw.src = "./images/background-4.gif"

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
      console.log(enemies)
      return (
        this.abajo() < enemies.arriba() ||
        this.arriba() > enemies.abajo()||
        this.derecha() < enemies.izquierda()||
        this.izquierda() > enemies.derecha()
      )
    }
}

class Player extends Component{
    constructor(width,height,x,y){
      super(width,height,x,y)
      this.speedx = 0
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
  moveUp(){
    this.y-=10
  }
  moveDown(){
    this.y+=10
  }
  jump(){
    saltar
  }
}

class Enemies extends Component{
  constructor(width,height,x,y){
    super(width,height,x,y)
    this.speedY = 0
    const enemyRaw = new Image()
    enemyRaw.src = "./images/bad-soul.gif"
    window.addEventListener("load",()=>{
      this.enemyimg = enemyRaw
      this.draw()
    })
  }
  draw(){
    ctx.draw(this.enemyimg, this.x, this.y,this.width,this.height)
  }
  newPos(){
    this.y += this.speedY
  }
}

let enemyNew = new Enemies(25,20,10,10)
let yi = 10
function enemigos(){
  let base_image = new Image()
  base_image.src = "images/bad-soul.gif"
  base_image.onload = function(){ 
  ctx.drawImage(base_image, yi, 10,25,20);
  }
}

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


let characterNew = new Player(58,90,200,200)
let xi = 200
function players(){
  let base_image = new Image()
  base_image.src = "images/character.gif"
  base_image.onload = function(){ 
  ctx.drawImage(base_image, xi, 200,58,90);
  }
}

var personaje = {y: 20, vy:0, gravedad:2, salto:28, vymax:9, saltando: false}

//--------------------------------------------------
//BUCLE PRINCIPAL
var FPS = 50;
setInterval(function(){
  updateCanvas()
},1000/10)
//--------------------------------------------------
function saltar(){
  personaje.saltando = true;
  personaje.vy = personaje.salto

}

function gravedad(){
  if(personaje.saltando == true){
    if(trex.y > 20){
      personaje.saltando = false;
      personaje.vy = 0;
      personaje.y = 20
    }
    else{
      personaje.vy -= personaje.gravedad
      personaje.y -= personaje.vy
    }
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
    case 38:
    characterNew.moveUp()
      break
    case 40:
    characterNew.moveDown()
      break 
    case 32:
    characterNew.jump()
      break
    }

    });

 
