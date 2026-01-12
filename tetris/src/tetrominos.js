import { position, TETROMINO_TYPES } from "./tetrominoType.js"

export class Tetromino {
    constructor(type, contex, canvas) {
        this.type = type
        this.contex = contex
        this.canvas = canvas
        this.position = TETROMINO_TYPES[this.type].initialPosition
        this.rotationIndex = 0;

    }
    #drawSquere(x, y, color) {
        this.contex.fillStyle = color;
        this.contex.fillRect(x + 0.1, y + 0.1, 0.8, 0.8);

    }
    #drawTriangle(x1, y1, x2, y2, x3, y3, color) {
        this.contex.fillStyle = color;
        this.contex.beginPath();
        this.contex.moveTo(x1, y1);
        this.contex.lineTo(x2, y2);
        this.contex.lineTo(x3, y3);
        this.contex.closePath();
        this.contex.fill();
    }
    drawblock(x, y) {
        this.#drawTriangle(x, y, x + 1, y, x, y + 1, TETROMINO_TYPES[this.type].highlight);
        this.#drawTriangle(x, y + 1, x + 1, y + 1, x + 1, y, TETROMINO_TYPES[this.type].shadow);
        this.#drawSquere(x, y, TETROMINO_TYPES[this.type].mainColor);
    }
    draw() {
        const shape = TETROMINO_TYPES[this.type].shape[this.rotationIndex];
        for (const block of shape) {
            this.drawblock(this.position.x + block.x, this.position.y + block.y);
        }
    }

}
export class tetrominoBag {
    constructor() {
        this.bag = ['T', 'O', 'I', 'J', 'L', 'S', 'Z'];
        this.index = 0;
        this.mixBag();
    }
    mixBag() {

        for (let i = this.bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }
    getNextTetromino() {
        if (this.index >= this.bag.length) {
            this.index = 0;
            this.mixBag();
        }
        const nextTetromino = this.bag[this.index];
        this.index++;
        return nextTetromino;
    }

}