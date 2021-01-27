////////GAME CANVAS/////////
var canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

let frames = 0
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
  characterNew.draw();
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
    ctx.drawImage(this.img,this.x,this.y-canvas.height, canvas.width, canvas.height)
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

/////////Listeners/////////
document.addEventListener('keydown', (e) => {
  switch (e.keyCode){
    case 37:
    characterNew.moveLeft()
      break
    case 39:
    characterNew.moveRight()
      break
    }
    });
