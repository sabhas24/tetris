import { Tetromino } from './tetrominos.js';

export class NextPieceDisplay {
    constructor(context, canvas) {
        this.context = context;
        this.canvas = canvas;
        this.tetromino = null;
    }

    setNextPiece(type) {
        this.tetromino = new Tetromino(type, this.context, this.canvas);


        let offsetX = 1;
        let offsetY = 1;
        if (type === 'I') { offsetX = 0; offsetY = 1; }
        if (type === 'O') { offsetX = 1.5; offsetY = 1; }

        this.tetromino.position = { x: offsetX, y: offsetY };
    }

    drawSquere(x, y, color, borderColor) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
        this.context.strokeStyle = borderColor;
        this.context.lineWidth = 0.05;
        this.context.lineJoin = 'round ';
        this.context.strokeRect(x, y, 1, 1);
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                this.drawSquere(x, y, 'black', '#333');
            }
        }

        if (this.tetromino) {
            this.tetromino.draw();
        }
    }
}
