import  {PIECES} from './pieces.js'
import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const blockSize = 20
const width = 15
const height = 30

canvas.width = width * blockSize
canvas.height = height * blockSize

const actualPiece={
  'position' : {x:0,y:0},
   'shape'  : PIECES[Math.floor(Math.random()*7)]
}


 // const board = createBoard(height, width)
const board =[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,1,1]
]
context.scale(blockSize, blockSize)

function draw(){

  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  for(let y = 0; y < board.length ; y++){
    for(let x = 0; x < board[y].length ; x++){
      if(board[y][x] != 0){
        drawRect(x, y, 'blue');
      }
    }
  }
}
function leftRotation(){
  const size=4;
  const result=Array.from({length:size},()=>Array().fill(0) );
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      result[i][j]=actualPiece.shape[j][size-1-i]
    }
  }
  actualPiece.shape=result;

}
function rightRotation(){
  const size=4;
  const result=Array.from({length:size},()=>Array().fill(0) );
  for(let i=0;i<size;i++){
    for(let j=0;j<size;j++){
      result[i][j]=actualPiece.shape[size-1-j][i]
    }
  }
  actualPiece.shape=result;


}
function drawPiece() {
  actualPiece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        drawRect(actualPiece.position.x + x, actualPiece.position.y + y, 'red');
      }
    });
  });
}

function drawRect(posX, posY, color) {
  context.fillStyle = color;
  context.fillRect(posX, posY, 1, 1);
  context.strokeStyle = 'white';
  context.lineWidth = 0.075;
  context.lineJoin = 'round '
  context.strokeRect(posX , posY, 1, 1);
}
function checkCollision(deltaX,deltaY){
  deltaX+=actualPiece.position.x
  deltaY+=actualPiece.position.y
   return actualPiece.shape.some((row,y)=>{
  return row.some((value,x)=>{
    
    return (value!=0 &&( y+deltaY >= height|| board[y+deltaY][x+deltaX]!=0))
  })
})
}
function checkCompleteRows() {
  for (let y = board.length - 1; y >= 0; y--) {
    if (board[y].every(cell => cell !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(board[0].length).fill(0));
      y++;
    }
  }
}
function solidify(){
  actualPiece.shape.forEach((row,y)=>{
    row.forEach((value,x)=>{
      if(value==1){
        board[actualPiece.position.y+y][actualPiece.position.x+x]=1;
      }
    })
  })  
  checkCompleteRows();
  actualPiece.position.x=Math.floor(Math.random()*(width-2));
  actualPiece.position.y=0
  actualPiece.shape=PIECES[Math.floor(Math.random()*7)]
  
}

function createBoard(height, width){
  return   Array(height).fill().map(() => Array(width).fill(0));

}
function update(){
  draw();
  drawPiece();
  window.requestAnimationFrame(update);
}
document.addEventListener('keydown',(event)=>{
  switch (event.key){
    case 'ArrowLeft':
      if(!checkCollision(-1,0)){
        actualPiece.position.x-=1;
      }
    break;
    case 'ArrowRight':
      if(!checkCollision(1,0)){

        actualPiece.position.x+=1;
      }
    break;
    case 'ArrowDown':
      if(!checkCollision(0,1)){

        actualPiece.position.y+=1;
      }else{
        solidify();
      }
    break;
    case 'z':
    leftRotation()
    if(checkCollision(0,0)){rightRotation()}
    break;
    case 'x':
    rightRotation()
    if(checkCollision(0,0)){leftRotation()}
    break;
  }
})
update();