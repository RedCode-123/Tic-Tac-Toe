"use strict";

// Model
function createPlayer(name, symbol) {
    let moves = [];
    let lastMove = [0, 0]

    function setLastMove(coor) {
        // TODO comprobar que coor sea un array, y que tenga un tamaño de dos
        lastMove = coor;
        // console.error(coor[0], coor[1]);
        moves.push(coor);
        return coor
    }
    function getLastMove() {
        return lastMove;
    }

    function getMoves() {
        return moves; // Return an Array
    }

    function getRows() {
        return moves.reduce((rows, row ) => rows + row[0].toString(), ""); // Return a string or numbers
    }
    function getColumns() {
        return moves.reduce((cols, col ) => cols + col[1].toString(), ""); // Return a string or numbers
    }
    function doIWin() { // Return a boolean
        let rows = getRows();
        let columns = getColumns();
        let winRowOrColumn = ["000", "111", "222"];
        let winDiagonal = ["012", "210"];

        if (rows.length >= 3 && columns.length >= 3) {
            let lastThreerows = rows.slice(-3);
            let lastThreeColumns = columns.slice(-3);
            if (winRowOrColumn.includes(rows) || winRowOrColumn.includes(columns)) {
                return true;
            }
            if (rows === columns) {
                if (winDiagonal.includes(rows) && winDiagonal.includes(rows)) {
                   return true;
                }

            }
        }

        return false;
    }

    function getLastCellInfo() {
        return {symbol, "player": name, "coor": getLastMove()}
    }

    return {name, symbol,setLastMove, getLastMove , getMoves, getRows, getColumns, doIWin, getLastCellInfo};
}

function createBoard() {
        let board = [ // row, column
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];



    function addMove(cellInfo) {
        // cellinfo es un diccionario con la siguiente estructura:
        // {
        //     "symbol":player2.symbol,
        //     "player":player2.name,
        //     "coor": player2.getLastMove()
        // }
        board[cellInfo.coor[0]][cellInfo.coor[1]] = cellInfo;
    }

    function isCellAvailable(coor) {
        // coor = [0,0]
        if(board[coor[0]][coor[1]] === "") {
            return true;
        } else {
            return false;
        }
    }

    // TODO Agregar una función que compruebe si una coordenada ya estpa ocupada

    return {board, addMove, isCellAvailable};
}

// View
function createView() {
    // TODO Crear tablero
    let boardOutput = document.querySelector(".main > .board") ;

    function createBoard() {
        let coor = [0,[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
        for (let x= 1; x<=9; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell", `cell-${x}`);
            cell.dataset.coor = coor[x];
            // cell.style.width = "33px";
            // cell.style.height = "33px";
            boardOutput.appendChild(cell);
        }

    }
    return {createBoard}
}


// Control
const board =  createBoard();
const player1 = createPlayer("Eder", "O");
const player2 = createPlayer("Raúl", "X");

let view =  createView();
view.createBoard();
//console.log(game.board, game.player1.moves, game.player2.moves);

console.log("Is available ", board.isCellAvailable([0,1]))
player2.setLastMove([0,1]);
board.addMove(player2.getLastCellInfo());
console.log("Is available ", board.isCellAvailable([0,1]))


player2.setLastMove([2,1]);
board.addMove(player2.getLastCellInfo());

player1.setLastMove([2,2]);
board.addMove(player1.getLastCellInfo());

player1.setLastMove([1,1]);
board.addMove(player1.getLastCellInfo());


player1.setLastMove([0,0]);
board.addMove(player1.getLastCellInfo());

console.log(board.board);
console.table(player1.getRows(), player1.getColumns());
console.error("Player1 win?",player1.doIWin());

console.table(player2.getRows(), player2.getColumns());
console.error("Player2 win?",player2.doIWin());


