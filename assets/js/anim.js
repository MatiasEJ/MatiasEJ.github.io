const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

const colours = [
    '#503F55',
    '#F2E4E6',
    '#F6E0E3',
    '#C2999F',
    '#845D63',
    '#79585D' 
]

const maxSize = 40;
const minSize = 0;
const mouseRadius = 20;

//mouse position

let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse)
    }
)


/**PARTICULAS**/
function Particle(x,y,directionX,directionY,size,colour) {
    this.x=x;
    this.y=y;
    this.directionX=directionX;
    this.directionY=directionY;
    this.size=size;
    this.colour=colour;
}

//MANEJO DE PARTICULA

Particle.prototype.draw = function(){
    ctx.beginPath();
  
    ctx.strokeRect(this.x,this.y, this.size, this.size)
   
    // // ctx.arc(this.x,this.y,this.size,0,Math.PI*2,false); 
    // ctx.moveTo(this.x, this.y);
    // ctx.quadraticCurveTo(20,80, 500,100);


    ctx.fillStyle= this.colour;
    var gradient = ctx.createLinearGradient(50, 0, 170, 0);
    gradient.addColorStop("0.5", "#F44336");
    gradient.addColorStop("0.5" ,"#880E4F");
    gradient.addColorStop("0.75", "white");
    
    ctx.fill();
   
    ctx.lineWidth = '.4';
    ctx.strokeStyle = gradient;
    
    ctx.stroke();

}


//update method to particle prototype

Particle.prototype.update = function(){
    if ((this.x + this.size*2) > (canvas.width) || 
        (this.x - this.size*2) < 0){ 
            this.directionX = -this.directionX
    }
    if((this.y + this.size*2) > (canvas.height) ||
         (this.y-this.size*2) < 0){
        this.directionY = -this.directionY;
    } 


    this.x += this.directionX;
    this.y += this.directionY;

    ///MOUSE INTERACT
    if(    mouse.x - this.x < mouseRadius 
        && mouse.x - this.x > -mouseRadius
        && mouse.y - this.y < mouseRadius
        && mouse.y - this.y > -mouseRadius){
        if( this.size < maxSize ){
                this.size += 6;
        }
    }else if ( this.size > minSize){
        this.size -= 0.1;
    }
    if(this.size < 0){
        this.size = 0;
    }
    this.draw();

}
//CREATE PARTICLE

function init(){
    particleArray = [];
    for(i = 0; i<1000 ; i++){
        let size = 0;
        let x = (Math.random() * ((innerWidth - size*2)-(size*2)))+ size*2;
        let y = (Math.random() * ((innerHeight - size*2)-(size*2)))+ size*2;
        let directionX = (Math.random()*0.4) - .1;
        let directiony = (Math.random()*0.2) - .1;
        let colour = colours[Math.floor(Math.random()*colours.length)]

        particleArray.push(new Particle(x,y,directionX,directiony,size,colour));
    }
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(i=0;i<particleArray.length;i++){
        particleArray[i].update();
    }
}

init();
animate();

window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
);