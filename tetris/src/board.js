import { TETROMINO_TYPES } from './tetrominoType.js';
import { Tetromino } from './tetrominos.js';
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

    drawBlock(x, y, typeInfo) {
        // Highlight Triangle
        this.context.fillStyle = typeInfo.highlight;
        this.context.beginPath();
        this.context.moveTo(x, y);
        this.context.lineTo(x + 1, y);
        this.context.lineTo(x, y + 1);
        this.context.closePath();
        this.context.fill();

        // Shadow Triangle
        this.context.fillStyle = typeInfo.shadow;
        this.context.beginPath();
        this.context.moveTo(x, y + 1);
        this.context.lineTo(x + 1, y + 1);
        this.context.lineTo(x + 1, y);
        this.context.closePath();
        this.context.fill();

        // Main Square
        this.context.fillStyle = typeInfo.mainColor;
        this.context.fillRect(x + 0.1, y + 0.1, 0.8, 0.8);
    }

    draw() {
        this.context.fillStyle = 'black';
        this.context.fillRect(0, 0, this.width, this.height);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.grid[y][x];
                if (cell === 0) {
                    this.drawSquere(x, y, 'black', '#333');
                } else {
                    const typeInfo = TETROMINO_TYPES[cell];
                    if (typeInfo) {
                        this.drawBlock(x, y, typeInfo);
                    }
                }
            }
        }
    }

    checkDiagonalCollision(position) {
        const corners = [
            { cx: position.x + 0, cy: position.y + 0 }, // Arriba - Izquierda
            { cx: position.x + 2, cy: position.y + 0 }, // Arriba - Derecha
            { cx: position.x + 0, cy: position.y + 2 }, // Abajo - Izquierda
            { cx: position.x + 2, cy: position.y + 2 }  // Abajo - Derecha
        ];

        let occupiedCorners = 0;

        for (let i = 0; i < corners.length; i++) {
            const x = corners[i].cx;
            const y = corners[i].cy;

            if (!this.isInside(x, y) || this.grid[y][x] !== 0) {
                occupiedCorners++;
            }
        }

        return occupiedCorners;
    }

    isInside(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }
    checkCollision(tetromino) {
        return tetromino.getShape().some(pos => {
            const x = tetromino.position.x + pos.x;
            const y = tetromino.position.y + pos.y;
            return !this.isInside(x, y) || this.grid[y][x] !== 0;
        });
    }

    isRowFull(y) {
        return this.grid[y].every(cell => cell !== 0);
    }

    collapseRows() {
        let rowsCleared = 0;
        for (let y = this.height - 1; y >= 0; y--) {
            if (this.isRowFull(y)) {
                // Elimina la fila completa
                this.grid.splice(y, 1);
                // Agrega una fila vacía en la parte superior
                this.grid.unshift(Array(this.width).fill(0));
                rowsCleared++;
                // Vuelve a revisar la misma posición 'y' ya que las filas bajaron
                y++;
            }
        }
        return rowsCleared;
    }
    isEmptyBoard() {
        return this.grid.every(row => row.every(cell => cell === 0));
    }
    solidifyPiece(tetromino) {
        tetromino.getShape().forEach(pos => {
            const x = tetromino.position.x + pos.x;
            const y = tetromino.position.y + pos.y;
            this.grid[y][x] = tetromino.type;
        });
    }
}