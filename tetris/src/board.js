export class board {
    constructor(height, width, context) {
        this.height = height;
        this.width = width;
        this.context = context;
        this.grid = this.createBoard();
    }

    createBoard() {
        return Array(this.height)
            .fill()
            .map(() => Array(this.width).fill(0));

    }
    drawSquere(x, y, color, borderColor) {

        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
        this.context.strokeStyle = borderColor;
        this.context.lineWidth = 0.05;

        this.context.lineJoin = 'round ';
        this.context.
            this.context.strokeRect(x, y, 1, 1);

    }
    draw() {

        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.width, this.height);


        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                this.drawSquere(x, y, 'black', 'white');
            }

        }
    }
}