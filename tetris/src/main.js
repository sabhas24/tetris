
import './style.css'
import { Game } from './game.js'

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

const nextCanvas = document.getElementById('next-canvas')
const nextContext = nextCanvas.getContext('2d')

const blockSize = 30
const width = 10
const height = 20

const nextCanvasSize = 5

// configuracion del canvas
canvas.width = width * blockSize
canvas.height = height * blockSize
context.scale(blockSize, blockSize)

nextCanvas.width = nextCanvasSize * blockSize
nextCanvas.height = nextCanvasSize * blockSize
nextContext.scale(blockSize, blockSize)

const game = new Game(context, canvas, width, height, nextContext, nextCanvas)
game.update()

