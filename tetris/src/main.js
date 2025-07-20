import './style.css'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const blockSize = 20
const width = 15
const height = 30

canvas.width = width * blockSize
canvas.height = height * blockSize

context.scale(blockSize, blockSize)
function update(){
  draw();
  window.requestAnimationFrame(update);
}
function draw(){
  context.fillStyle = 'black'
  context.fillRect(0, 0, width, height)

}
update();