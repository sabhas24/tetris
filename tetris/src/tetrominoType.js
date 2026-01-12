export class position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
export const TETROMINO_TYPES = {
    I: {
        id: 1,
        initialPosition: { x: 3, y: -1 },
        shape: [
            [new position(0, 1), new position(1, 1), new position(2, 1), new position(3, 1)],
            [new position(0, 2), new position(1, 2), new position(2, 2), new position(3, 2)],
            [new position(0, 3), new position(1, 3), new position(2, 3), new position(3, 3)],
            [new position(1, 0), new position(1, 1), new position(1, 2), new position(1, 3)]
        ],
        mainColor: '#00FFFF',      // Cyan
        highlight: '#B2FFFF', // Light cyan (highlight)
        shadow: '#008080'     // Dark cyan (shadow)
    },
    J: {
        id: 2,
        initialPosition: { x: 3, y: 0 },
        shape: [
            [new position(0, 0), new position(0, 1), new position(1, 1), new position(2, 1)],
            [new position(1, 0), new position(2, 0), new position(1, 1), new position(1, 2)],
            [new position(0, 1), new position(1, 1), new position(2, 1), new position(2, 2)],
            [new position(1, 0), new position(1, 1), new position(0, 2), new position(1, 2)]
        ],
        mainColor: '#0000FF',      // Blue
        highlight: '#8080FF', // Light blue
        shadow: '#000080'     // Dark blue
    },
    L: {
        id: 3,
        initialPosition: { x: 3, y: 0 },
        shape: [
            [new position(2, 0), new position(0, 1), new position(1, 1), new position(2, 1)],
            [new position(1, 0), new position(1, 1), new position(1, 2), new position(2, 2)],
            [new position(0, 1), new position(1, 1), new position(2, 1), new position(0, 2)],
            [new position(0, 0), new position(1, 0), new position(1, 1), new position(1, 2)]
        ],
        mainColor: '#FFA500',      // Orange
        highlight: '#fcfcb8ff', // Light orange
        shadow: '#804000'     // Dark orange
    },
    O: {
        id: 4,
        initialPosition: { x: 4, y: 0 },
        shape: [
            [new position(0, 0), new position(1, 0), new position(0, 1), new position(1, 1)]
        ],
        mainColor: '#FFFF00',      // Yellow
        highlight: '#FFFF80', // Light yellow
        shadow: '#808000'     // Dark yellow
    },
    S: {
        id: 5,
        initialPosition: { x: 3, y: 0 },
        shape: [
            [new position(0, 1), new position(1, 1), new position(1, 0), new position(2, 0)],
            [new position(1, 0), new position(1, 1), new position(2, 1), new position(2, 2)],
            [new position(0, 2), new position(1, 2), new position(1, 1), new position(2, 1)],
            [new position(0, 0), new position(0, 1), new position(1, 1), new position(1, 2)]

        ],
        mainColor: '#00FF00',      // Green
        highlight: '#B2FFB2', // Light green
        shadow: '#008000'     // Dark green
    },
    T: {
        id: 6,
        initialPosition: { x: 3, y: 0 },
        shape: [
            [new position(1, 0), new position(0, 1), new position(1, 1), new position(2, 1)],
            [new position(1, 0), new position(1, 1), new position(2, 1), new position(1, 2)],
            [new position(0, 1), new position(1, 1), new position(2, 1), new position(1, 2)],
            [new position(1, 0), new position(0, 1), new position(1, 1), new position(1, 2)]
        ],
        mainColor: '#800080',      // Purple
        highlight: '#D580FF', // Light purple
        shadow: '#400040'     // Dark purple
    },
    Z: {
        id: 7,
        initialPosition: { x: 3, y: 0 },
        shape: [
            [new position(0, 0), new position(1, 0), new position(1, 1), new position(2, 1)],
            [new position(2, 0), new position(2, 1), new position(1, 1), new position(1, 2)],
            [new position(0, 1), new position(1, 1), new position(1, 2), new position(2, 2)],
            [new position(1, 0), new position(1, 1), new position(0, 1), new position(0, 2)]
        ],
        mainColor: '#FF0000',      // Red
        highlight: '#FF8080', // Light red
        shadow: '#800000'     // Dark red
    }
};