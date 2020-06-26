const canvas = document.getElementById('canvas');
const topo = document.getElementById('icons')

const resizeCanvas = () => {
  canvas.width = topo.offsetWidth;
  canvas.height = topo.offsetHeight;

  window.location.reload();
}

window.addEventListener('resize', resizeCanvas, false)


const ctx = canvas.getContext('2d');
canvas.width = topo.offsetWidth;
canvas.height = topo.clientHeight;

window.onload = setInterval(animate, 1000 / 30);


//loasd Images
const images = {};

images.player = new Image();
images.sonic = new Image();
images.sonicReverse = new Image();
images.sonicReverse.src = '/assets/js/sonic3-reverse.png';
images.sonic.src = '/assets/js/sonic3.png'

//'upRight', 'right', 'up', 'jump', 'downRight', 'left'
const characterActions = ['right', 'left']

const charHeight = 113;
const charWidth = 103;

const sonicHeight = 55;
const sonicWidth = 49;

const numberOfCharacter = 1;

const characters = [];


// class Character {
//   constructor() {
//     this.maxFrame = 13;
//     this.minFrame = 9;

//     this.width = charWidth;
//     this.height = charHeight;

//     this.frameX = 3;
//     this.x = Math.random() * (canvas.width - this.height);
//     this.y = Math.random() * (canvas.height - this.width);
//     this.speed = (Math.random() * 9.5) + 2.5;
//     this.action = characterActions[Math.floor(Math.random() * characterActions.length)];

//     if (this.action === 'up') {

//       this.maxFrame = 13
//       this.minFrame = 3
//       this.frameY = 0;
//     } else if (this.action === 'right') {
//       this.maxFrame = 13
//       this.minFrame = 3
//       this.frameY = 3;
//     } else if (this.action === 'right') {
//       this.maxFrame = 13
//       this.minFrame = 3
//       this.frameY = 3;
//     }else if (this.action === 'jump') {
//       this.speed = 14
//       this.maxFrame = 9
//       this.minFrame = 0
//       this.frameY = 7
//     } else if (this.action === 'downRight') {
//       this.maxFrame = 15
//       this.minFrame = 4
//       this.frameY = 4
//     } else if (this.action === 'upRight') {
//       this.maxFrame = 13
//       this.minFrame = 3
//       this.frameY = 1
//     }

//   }

//   draw() {

//     drawSprite(
//       images.player,
//       this.width * this.frameX,
//       this.height * this.frameY,
//       this.width,
//       this.height,
//       this.x,
//       this.y,
//       this.width*1,
//       this.height*1
//     )
//     //animation
//     if (this.frameX < this.maxFrame) this.frameX++;
//     else this.frameX = this.minFrame;

//   }

//   update() {
//     //movement (canvas and player position)
//     if (this.action === 'right') {
//       if (this.x > canvas.width + this.width) {
//         this.x = 0 - this.width;
//         this.y = Math.random() * (canvas.height / this.height);
//       } else {
//         this.x += this.speed;
//       }

//     } else if (this.action === 'up') {

//       if (this.y < (0 - this.height)) {
//         this.y = canvas.height + this.height;
//         this.x = Math.random() * canvas.width
//       } else {
//         this.y -= this.speed;
//       }
//     } else if (this.action === 'downRight') {
//       if (this.y > (canvas.height + this.height) &&
//         this.x > (canvas.width + this.width)) {
//         this.y = 0 - this.height;
//         this.x = Math.random() * canvas.width
//       } else {
//         this.y += this.speed;
//         this.x += this.speed;
//       }
//     } else if (this.action === 'upRight') {
//       if (this.y > (canvas.height + this.height) &&
//         this.x > (canvas.width + this.width)) {
//         this.y = canvas.height + this.height;
//         this.x = Math.random() * canvas.width
//       } else {
//         this.y -= this.speed;
//         this.x += this.speed;
//       }
//     } else if (this.action === 'left') {
//       if (this.x > canvas.width + this.width) {
//         this.x = 0 - this.width;
//         this.y = Math.random() * (canvas.height - this.height);
//       } else {
//         this.x += this.speed;
//       }

//     }else if (this.action === 'jump') {
//       if (this.y < (0 - this.height)) {
//         this.y = canvas.height + this.height;
//         this.x = Math.random() * canvas.width
//       } else {
//         this.y -= this.speed;
//       }
//     }
//   }
// }

class Sonic {
  constructor() {
    this.maxFrame = 13;
    this.minFrame = 9;

    this.width = sonicWidth;
    this.height = sonicHeight;


    this.x = 0;
    this.y = canvas.height - this.height;
    this.speed = (Math.random() * 2.5) + 13.5;
    this.action = characterActions[Math.floor(Math.random() * characterActions.length)];

    if (this.action === 'right') {
      this.maxFrame = 14
      this.minFrame = 1
      this.frameY = 4;
    }

  }

  draw() {
    console.log(this.action)
    if (this.action === 'left') {
      drawSprite(
        images.sonicReverse,
        this.width * this.frameX,
        this.height * this.frameY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width * 1,
        this.height * 1
      )
      if (this.frameX > this.maxFrame) this.frameX--;
      else this.frameX = this.minFrame;

    } else if (this.action === 'right') {
      drawSprite(
        images.sonic,
        this.width * this.frameX,
        this.height * this.frameY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width * 1,
        this.height * 1
      )
      //animation
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = this.minFrame;

    }

  }

  update() {
    //movement (canvas and player position)
    if (this.action === 'right') {
      if (this.x > canvas.width + (this.width * 5)) {
        this.x = 0 - this.width;
        this.y = canvas.height - this.height;
        this.speed = (Math.random() * 2) + 3;
      } else {
        this.x += this.speed;
      }
    }

  }

}

//NUMBER OF CHARS
// for (i = 0; i < numberOfCharacter; i++) {
//   characters.push(new Sonic());
// }

characters.push(new Sonic());
//DIBUJO DEL SPRITE
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}

//DUH
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //CANTIDAD DE CHARACTERS
  // for (i = 0; i < characters.length; i++) {
  //     characters[i].draw();
  //     characters[i].update();
  // }
  characters[0].draw();
  characters[0].update();

}


//EXTRAS (Problemas de optimización)
function mirror() {
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
}

function mirrorUp() {
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
}