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
    isInside(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
    checkCollision(x, y) {
        return !this.isInside(x, y) || this.grid[y][x] !== 0;
    }
    isRowFull(y) {
        return this.grid[y].every(cell => cell !== 0);
    }
    isEmptyRow(y) {
        return this.grid[y].every(cell => cell === 0);
    }
    clearRow(y) {
        this.grid[y].fill(0);
    }
    moveRowsDown(count, startY) {
        for (let y = startY + 1; y > count + startY; y++) {
            this.grid[y].splice(y, 1);
            this.grid[y].unshift(0);
        }
    }
    collapseRows() {
        let y = this.height - 1;
        let contador = 0;
        while (!this.isEmptyRow(y) && (y >= 0)) {
            if (this.isRowFull(y)) {
                this.clearRow(y);
                contador++;
            } else if (contador > 0) {
                this.moveRowsDown(contador, y);
            }
            y--;
        }
    }
}