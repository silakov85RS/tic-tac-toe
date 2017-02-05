class TicTacToe {
    constructor() {
        this.matrix = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.symbols = ['x', 'o'];
        this.currentPlayerSymbol = this.symbols[0];
        this.runCount = 0;
    }

    getCurrentPlayerSymbol() {
        return this.currentPlayerSymbol;
    }

    nextTurn(rowIndex, colIndex) {
        let currentCell = this.matrix[rowIndex][colIndex];
        if (currentCell !== null)
            return;

        this.matrix[rowIndex][colIndex] = this.currentPlayerSymbol;
        this.currentPlayerSymbol = this.matrix[rowIndex][colIndex] === this.symbols[0] ? this.symbols[1] : this.symbols[0];
        this.runCount++;
    }

    isFinished() {
        let isNoMoreTurns = this.noMoreTurns();
        let isWinner = this.getWinner() !== null;
        let isDraw = this.isDraw();

        return isNoMoreTurns || isWinner || isDraw;
    }

    getWinner() {
        let matrix = this.matrix;
        return checkIfWinner(matrix);
    }

    noMoreTurns() {
        return this.runCount >= 9;
    }

    isDraw() {
        let isWinner = this.getWinner() !== null;
        let isNoMoreTurns = this.noMoreTurns();
        return !isWinner && isNoMoreTurns;
    }

    getFieldValue(rowIndex, colIndex) {
        return this.matrix[rowIndex][colIndex];
    }
}

function checkIfWinner(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let cell in matrix[i]) {
            if (cell === null)
                return null;
        }
    }

    let cols = getCols(matrix);
    let diagonal1 = [matrix[0][0], matrix[1][1], matrix[2][2]];
    let diagonal2 = [matrix[0][2], matrix[1][1], matrix[2][0]];

    for (let i = 0; i < matrix.length; i++) {
        if (compareArr(matrix[i]) !== null)
            return matrix[i][0];
    }

    for (let i = 0; i < cols.length; i++) {
        if (compareArr(cols[i]) !== null)
            return cols[i][0];
    }

    if (compareArr(diagonal1))
        return diagonal1[0];

    if (compareArr(diagonal2))
        return diagonal2[0];

    return null
}

function compareArr(line) {
    let res = line[0];
    let isEvery = line.every((x) => x === res);
    return isEvery ? res : null;
}

function getCols(matrix) {
    return matrix[0].map((col, i) => {
        return matrix.map((row) => {
            return row[i]
        })
    });
}

module.exports = TicTacToe;
