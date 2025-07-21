import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const blockSize = 20
const width = 15
const height = 30

canvas.width = width * blockSize
canvas.height = height * blockSize

const actualPice={
  'position' : {x:5,y:5},
   'shape'  :[
    [1, 1],
    [1, 1]
  ]
}


 const board = createBoard(height, width)
/*const board =[
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
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0]
]*/
context.scale(blockSize, blockSize)

function draw(){

  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
  for(let y = 1; y < board.length - 1; y++){
    for(let x = 1; x < board[y].length - 1; x++){
      if(board[y][x] != 0){
        drawRect(x - 1, y - 1, 'blue');
      }
    }
  }
}
function drawPiece() {

  actualPice.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value != 0) {
        drawRect(actualPice.position.x + x, actualPice.position.y + y, 'red');
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
    actualPice.position.x-=1
    break;
    case 'ArrowRight':
    actualPice.position.x+=1
    break;
    case 'ArrowDown':
    actualPice.position.y+=1
    break;
  }
})
update();