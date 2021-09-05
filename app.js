const canvas=document.getElementById("canvas");
const s=document.getElementById("score");
const g=document.getElementById("game");
const prim=document.getElementById("primary");
const red=document.getElementById("danger");

const pen=canvas.getContext('2d');
let score=0;
s.innerText=`Score : ${score}`;

const startOver=function(){

pen.fillStyle="yellow";

const H=700;
const W=1465;
const cs=67;
let food=null;
score=0;
let gameOver=false;
s.innerText=`Score : ${score}`;
g.innerText="";

const snake={
    init_len:5,
    direction:'right',
    cells:[],
    
    createSnake:function(){
        for(let i=0;i<this.init_len;i++){
           this.cells.push({
              x:i,
              y:0
           });
        }
    },

    drawSnake : function(){
      for(let cell of this.cells){
       pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1);
      }  
    },

    updateSnake:function(){

        const headX = this.cells[this.cells.length - 1].x;
        const headY = this.cells[this.cells.length - 1].y;

       if(food.x === headX && food.y === headY){
             food=getRandomFood();
             s.innerText=`Score : ${++score}`;
       }
        else{
             //remove cell at last for to move the snake....
             this.cells.shift();
        } 

        let newX;
        let newY;

       if(this.direction === "right"){
           newX=headX+1;
           newY=headY;

           if((newX+1)*cs>=W)
           gameOver=true;
       }
       else if(this.direction === "left"){
            newX=headX-1;
            newY=headY;
 
           if(newX*cs<=0)
           gameOver=true;
       }
       else if(this.direction === "up"){
            newX=headX;
            newY=headY-1;
            
           if(newY*cs<=0)
           gameOver=true;
       }
       else{
            newX=headX;
            newY=headY+1;
            
           if((newY+1)*cs>=H)
           gameOver=true;
       }


       //adding new cell at head
       this.cells.push({
           x:newX,
           y:newY
       });

       

    }
};

function init(){
    snake.createSnake();
    snake.drawSnake();
    food=getRandomFood();
   
    function keypressed(event){
        
        if(event.key === "ArrowUp"){
           snake.direction="up";
        }
        else if(event.key === "ArrowDown"){
           snake.direction="down";
        } 
        else if(event.key === "ArrowLeft"){
           snake.direction="left";
        }
        else{
           snake.direction="right";
        }

        console.log(snake.direction);
    }
   
    document.addEventListener("keydown", keypressed);
}

function update(){
    snake.updateSnake();
}


function draw(){
   if(gameOver === true)
   { 
    clearInterval(id);
    g.innerText="😟 GAME OVER 😟";
   }
   
  
   pen.clearRect(0, 0, W , H);
   pen.fillStyle = 'red';
   pen.fillRect(food.x * cs, food.y * cs, cs, cs);
   pen.fillStyle = 'yellow';

   snake.drawSnake();
}


function getRandomFood(){
    //sub and divide by cs for multiple of cs and generate in line before width and height end..
      const foodX=Math.floor(Math.random()*(W-cs)/cs);
      const foodY=Math.floor(Math.random()*(H-cs)/cs);

     food={
         x:foodX,
         y:foodY
      }

      return food;
}


function gameLoop(){
    update();
    draw();
}

init();

const id=setInterval(gameLoop,100);

red.addEventListener('click',function(){
    clearInterval(id);
});

}

prim.addEventListener('click',startOver);


