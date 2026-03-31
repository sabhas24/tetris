import { board } from './board.js'
import { Tetromino, tetrominoBag } from './tetrominos.js'

export class Game {
    constructor(context, canvas, width, height) {
        this.context = context;
        this.canvas = canvas;
        this.width = width;
        this.height = height;

        this.board = new board(height, width, context);
        this.bag = new tetrominoBag();
        this.tetromino = new Tetromino(this.bag.getNextTetromino(), context, canvas);

        this.dropCounter = 0;
        this.dropInterval = 1000;
        this.lastTime = 0;
        this.isGameOver = false;

        this.initControls();
    }

    initControls() {
        document.addEventListener('keydown', (event) => {
            if (this.isGameOver) return;

            switch (event.key) {
                case 'ArrowLeft':
                    this.tetromino.moveLeft();
                    if (this.checkCollision(this.tetromino)) {
                        this.tetromino.moveRight();
                    }
                    break;
                case 'ArrowRight':
                    this.tetromino.moveRight();
                    if (this.checkCollision(this.tetromino)) {
                        this.tetromino.moveLeft();
                    }
                    break;
                case 'ArrowDown':
                    this.dropPiece();
                    break;
                case 'z':
                case 'Z':
                    this.tetromino.savePosition();
                    this.tetromino.rotationLeft();

                    let indexZ = 0;
                    while (this.checkCollision() && indexZ < 5) {
                        this.tetromino.WallKicksLeft(indexZ);
                        indexZ++;
                    }

                    if (this.checkCollision()) {
                        this.tetromino.rotationRigth();
                        this.tetromino.restorePosition();
                    }
                    break;
                case 'x':
                case 'X':
                    this.tetromino.savePosition();
                    this.tetromino.rotationRigth();

                    let indexX = 0;
                    while (this.checkCollision() && indexX < 5) {
                        this.tetromino.WallKicksRight(indexX);
                        indexX++;
                    }

                    if (this.checkCollision()) {
                        this.tetromino.rotationLeft();
                        this.tetromino.restorePosition();
                    }
                    break;
            }
        });
    }

    checkCollision() {
        return this.board.checkCollision(this.tetromino);
    }

    solidify() {
        this.board.solidifyPiece(this.tetromino);
    }

    dropPiece() {
        this.tetromino.moveDown();
        if (this.checkCollision()) {
            this.tetromino.moveUp();
            this.solidify();
            this.board.collapseRows();
            this.spawnNewPiece();
        }
        this.dropCounter = 0;
    }

    spawnNewPiece() {
        this.tetromino = new Tetromino(this.bag.getNextTetromino(), this.context, this.canvas);
        if (this.checkCollision()) {
            this.isGameOver = true;
            alert('¡Game Over!');
            this.board.grid = this.board.createBoard();
            this.isGameOver = false;
        }
    }

    // El Game Loop principal, "time" lo provee automáticamente requestAnimationFrame
    update(time = 0) {
        if (!this.isGameOver) {
            const deltaTime = time - this.lastTime;
            this.lastTime = time;


            this.dropCounter += deltaTime;

            if (this.dropCounter > this.dropInterval) {
                this.dropPiece();
            }

            this.draw();
        }

        window.requestAnimationFrame((t) => this.update(t));
    }
    // dibuja el tablero y el tetromino
    draw() {
        this.board.draw();
        this.tetromino.draw();
    }
}