"use strict";
// console.log("Hello Eder!");

// Model

function createPlayer(name, symbol) {
    let moves = [];
    let lastMove = [0, 0]

    function setLastMove(coor) {
        // TODO comprobar que coor sea un array, y que tenga un tamaño de dos
        lastMove = coor;
        moves.push(coor);
        return coor
    }
    function getLastMove() {
        return lastMove;
    }

    function getMoves() {
        return moves;
    }

    return {name, symbol,setLastMove, getLastMove , getMoves};
}

function createGame() {
    let board = [ // row, column
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    const player1 = createPlayer("Eder", "O");
    const player2 = createPlayer("Raúl", "X");

    function addMove(coor, symbol) {
        board[coor[0]][coor[1]] = symbol;
    }

    // TODO: Agrergar una función que analice el tablero (board)
    // FORMAR DE GANAR
    // TENER ALGUNA LÍNEA LLENA
    // TENER ALGUNA COLUMNA LLENA
    // TENER ALGUNA DIAGONAL LLENA

    return {board, player1, player2, addMove};
}




const game =  createGame();

//console.log(game.board, game.player1.moves, game.player2.moves);

game.player1.setLastMove([2,2]);
game.addMove(game.player1.getLastMove(), game.player1.symbol);

console.log(game.player1.getMoves());
console.log(game.player1.getLastMove());
console.log(game.board);




// Control



// View
