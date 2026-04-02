import { board } from './board.js'
import { Tetromino, tetrominoBag } from './tetrominos.js'
import { SCORE_PER_LINE } from './ScorePerLine.js'
import { NextPieceDisplay } from './nextPieceDisplay.js'
export class Game {
    constructor(context, canvas, width, height, nextContext, nextCanvas) {
        this.context = context;
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.nextContext = nextContext;
        this.nextCanvas = nextCanvas;

        this.board = new board(height, width, context);
        this.bag = new tetrominoBag();
        this.tetromino = new Tetromino(this.bag.getNextTetromino(), context, canvas);
        this.pause = false;

        this.nextPieceDisplay = new NextPieceDisplay(nextContext, nextCanvas);
        this.nextPieceType = this.bag.getNextTetromino();
        this.nextPieceDisplay.setNextPiece(this.nextPieceType);


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
        this.b2b = false;

        this.initControls();
        this.updateUI();

        // Botón de jugar de nuevo
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restartGame();
        });
    }

    initControls() {
        document.addEventListener('keydown', (event) => {
            if (this.isGameOver) return;

            switch (event.key) {
                case 'ArrowLeft':
                    this.lasActionWasRotation = false;
                    this.tetromino.moveLeft();
                    if (this.checkCollision(this.tetromino)) {
                        this.tetromino.moveRight();
                    }
                    break;
                case 'ArrowRight':
                    this.lasActionWasRotation = false;
                    this.tetromino.moveRight();
                    if (this.checkCollision(this.tetromino)) {
                        this.tetromino.moveLeft();
                    }
                    break;
                case 'ArrowDown':
                    this.lasActionWasRotation = false;
                    if (this.dropPiece()) {
                        this.bonus += 1;
                    }
                    break;
                case 'ArrowUp':
                case 'z':
                case 'Z':
                    this.tetromino.savePosition();
                    this.lasActionWasRotation = true;
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
                    this.lasActionWasRotation = true;
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
                case 'Escape':
                case 'p':
                case 'P':
                    if (this.isGameOver) return;
                    this.pause = !this.pause;
                    const pauseMenu = document.getElementById('pause-menu');
                    if (this.pause) {
                        pauseMenu.classList.remove('hidden');
                    } else {
                        pauseMenu.classList.add('hidden');
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

        return (this.board.checkDiagonalCollision(this.tetromino.position) >= 3
            && this.lasActionWasRotation && this.tetromino.type === 'T')
    }

    spawnNewPiece() {
        this.tetromino = new Tetromino(this.nextPieceType, this.context, this.canvas);
        this.nextPieceType = this.bag.getNextTetromino();
        this.nextPieceDisplay.setNextPiece(this.nextPieceType);

        if (this.checkCollision()) {
            this.isGameOver = true;
            document.getElementById('final-score').innerText = this.score;
            document.getElementById('game-over-menu').classList.remove('hidden');
        }
    }

    restartGame() {
        document.getElementById('game-over-menu').classList.add('hidden');
        this.board.grid = this.board.createBoard();
        this.score = 0;
        this.totalLines = 0;
        this.level = 1;
        this.combo = 0;
        this.bonus = 0;
        this.updateUI();

        this.tetromino = new Tetromino(this.bag.getNextTetromino(), this.context, this.canvas);
        this.nextPieceType = this.bag.getNextTetromino();
        this.nextPieceDisplay.setNextPiece(this.nextPieceType);
        
        this.isGameOver = false;
        this.lastTime = performance.now();
    }
    updateScore() {
        let points = 0;
        let isDifficult = this.tSpin() || this.linesCleared === 4;

        points += this.tSpin() ? 800 * this.level : 0;
        if (this.linesCleared > 0) {
            points += SCORE_PER_LINE[this.linesCleared - 1] * this.level;
        }

        if (isDifficult && this.b2b) points = Math.floor(points * 1.5);
        if (this.linesCleared > 0) this.b2b = isDifficult;
        if (this.board.isEmptyBoard()) points += 2000;
        points += this.combo * 60 * this.level;
        points += this.bonus;
        this.bonus = 0;

        if (this.linesCleared > 0) {
            this.combo++;
            if (this.totalLines % 10 === 0) {
                this.levelup();
            }
            this.linesCleared = 0;
            this.updateUI();
        } else {
            this.combo = 0;
        }
        this.score += points;

    }
    levelup() {
        this.level++;
        if (this.level < 20) {
            this.dropInterval = 1000 - (this.level - 1) * 50;
        }
        this.totalLines = 0;
    }

    updateUI() {
        const scoreElement = document.getElementById('score');
        const linesElement = document.getElementById('lines');
        const levelElement = document.getElementById('level');
        if (scoreElement) scoreElement.innerText = this.score;
        if (linesElement) linesElement.innerText = this.totalLines;
        if (levelElement) levelElement.innerText = this.level;
    }
    // Game Loop principal
    update(time = 0) {
        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        if (!this.isGameOver && !this.pause) {
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

        this.nextPieceDisplay.draw();
    }
}