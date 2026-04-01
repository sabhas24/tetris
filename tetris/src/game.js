import { board } from './board.js'
import { Tetromino, tetrominoBag } from './tetrominos.js'
import { SCORE_PER_LINE } from './ScorePerLine.js'
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
        this.score = 0;
        this.linesCleared = 0;
        this.totalLines = 0;
        this.level = 1;
        this.combo = 0;
        this.bonus = 0;
        this.lasActionWasRotation = false


        this.initControls();
        this.updateUI();
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
                    if (this.dropPiece()) {
                        this.bonus += 1;
                    }
                    break;
                case 'ArrowUp':
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
                case ' ':
                    this.hardDrop();
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
        this.dropCounter = 0;
        if (this.checkCollision()) {
            this.tetromino.moveUp();
            this.solidify();
            this.linesCleared = this.board.collapseRows();
            this.totalLines += this.linesCleared;
            this.updateScore();
            this.spawnNewPiece();
            return false;
        }
        return true;
    }
    hardDrop() {
        while (this.dropPiece()) {
            this.bonus += 2;
        }
    }

    tSpin() {
        if (this.lasActionWasRotation && this.tetromino.type === 'T') {
            return (this.board.checkDiagonalCollision(this.tetromino.position) >= 3) ? true : false;
        }
        return false;
    }

    spawnNewPiece() {
        this.tetromino = new Tetromino(this.bag.getNextTetromino(), this.context, this.canvas);
        if (this.checkCollision()) {
            this.isGameOver = true;
            alert('¡Game Over!');
            this.board.grid = this.board.createBoard();
            this.score = 0;
            this.totalLines = 0;
            this.level = 1;
            this.updateUI();
            this.isGameOver = false;
        }
    }
    updateScore() {
        if (this.linesCleared > 0) {
            this.score += SCORE_PER_LINE[this.linesCleared - 1] * this.level
                + this.combo * 60 * this.level
                + this.bonus;
            this.combo++;
            this.bonus = 0;
            this.level = Math.floor(this.totalLines / 10) + 1;
            this.dropInterval = 1000 - (this.level - 1) * 100;
            if (this.dropInterval < 100) this.dropInterval = 100;
            this.linesCleared = 0;
            this.updateUI();
        } else {
            this.combo = 0;
        }
    }

    updateUI() {
        const scoreElement = document.getElementById('score');
        const linesElement = document.getElementById('lines');
        const levelElement = document.getElementById('level');
        if (scoreElement) scoreElement.innerText = this.score;
        if (linesElement) linesElement.innerText = this.totalLines;
        if (levelElement) levelElement.innerText = this.level;
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