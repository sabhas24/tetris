import { position, TETROMINO_TYPES, I_WALL_KICKS, OTHER_WALL_KICKS } from "./tetrominoType.js"

export class Tetromino {
    constructor(type, contex, canvas) {
        this.type = type
        this.contex = contex
        this.canvas = canvas
        this.position = TETROMINO_TYPES[this.type].initialPosition
        this.rotationIndex = 0;
        this.savedPosition = new position(this.position.x, this.position.y);

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
    getShape() {
        return TETROMINO_TYPES[this.type].shape[this.rotationIndex];
    }
    // dibuja el tetromino
    draw() {
        const shape = this.getShape();
        for (const block of shape) {
            this.drawblock(this.position.x + block.x, this.position.y + block.y);
        }
    }
    #move(deltax, deltay) {
        this.position = new position(this.position.x + deltax, this.position.y + deltay);
    }
    moveDown() {
        this.#move(0, 1)
    }
    moveRight() {
        this.#move(1, 0)
    }
    moveLeft() {
        this.#move(-1, 0)
    }
    moveUp() {
        this.#move(0, -1)
    }
    rotationRigth() {
        this.rotationIndex = (this.rotationIndex + 1) % TETROMINO_TYPES[this.type].shape.length;
    }

    savePosition() {
        this.savedPosition = new position(this.position.x, this.position.y);
    }

    restorePosition() {
        this.position = new position(this.savedPosition.x, this.savedPosition.y);
    }

    WallKicksRight(index) {
        const backIndex = (this.rotationIndex - 1 + 4) % 4;
        const kicks = (this.type === 'I') ? I_WALL_KICKS.right : OTHER_WALL_KICKS.right;
        const kick = kicks[backIndex][index];
        // Calculamos usando la posición guardada
        this.position = new position(this.savedPosition.x + kick.x, this.savedPosition.y - kick.y);
    }

    rotationLeft() {
        this.rotationIndex = (this.rotationIndex - 1 + TETROMINO_TYPES[this.type].shape.length) % TETROMINO_TYPES[this.type].shape.length;
    }

    WallKicksLeft(index) {
        const backIndex = (this.rotationIndex + 1) % 4;
        const kicks = (this.type === 'I') ? I_WALL_KICKS.left : OTHER_WALL_KICKS.left;
        const kick = kicks[backIndex][index];
        this.position = new position(this.savedPosition.x + kick.x, this.savedPosition.y - kick.y);
    }
    getId() {
        return TETROMINO_TYPES[this.type].id;
    }
}
export class tetrominoBag {
    constructor() {
        this.bag = ['T', 'O', 'I', 'J', 'L', 'S', 'Z'];
        this.index = 0;
        this.#mixBag();
    }
    #mixBag() {

        for (let i = this.bag.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.bag[i], this.bag[j]] = [this.bag[j], this.bag[i]];
        }
    }
    getNextTetromino() {
        if (this.index >= this.bag.length) {
            this.index = 0;
            this.#mixBag();
        }
        const nextTetromino = this.bag[this.index];
        this.index++;
        return nextTetromino;
    }

}