import { tetrominoColors } from './tetrominoColors.js';
class position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class Tetromino {
    constructor(id, contex, canvas) {
        this.id = id
        this.contex = contex
        this.canvas = canvas
        this.shape = shape;
        this.initalPosition = new position(3, 0);
        this.position = new position(3, 0);
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
        this.#drawTriangle(x, y, x + 1, y, x, y + 1, tetrominoColors[this.id].highlight);
        this.#drawTriangle(x, y + 1, x + 1, y + 1, x + 1, y, tetrominoColors[this.id].shadow);
        this.#drawSquere(x, y, tetrominoColors[this.id].main);
    }

}