"use strict";

// Model
function createPlayer(name, symbol, color, id) {
    let moves = [];
    let lastMove = [];
    let score = 0;

    function resetMoves() {
        moves = [];
        lastMove = [];
    }

    function setLastMove(coor) {
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

    function getLastCellInfo() {
        // Return an obj that goes into the cell
        return {"symbol" : symbol, "player": name, "coor": getLastMove(), color, id}
    }

    return {name, symbol,setLastMove, getLastMove , getMoves, getRows, getColumns, getLastCellInfo, color, id, score, resetMoves};
}

function createBoard() {
    let board = [ // {"symbol", "player", "coor"}
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];


    function resetMoves() {
        board = [ // {"symbol", "player", "coor"}
                ["", "", ""],
                ["", "", ""],
                ["", "", ""]
            ]
    }

    function addMove(cellInfo) {
        // cellinfo es un diccionario con la siguiente estructura:
        // {
        //     "symbol":player2.symbol,
        //     "player":player2.name,
        //     "coor": player2.getLastMove()
        //     "id": player2.id
        // }
        board[cellInfo.coor[0]][cellInfo.coor[1]] = cellInfo;
    }

    function isCellAvailable(coor) {
        // Check if de cell (coor) is available
        if(board[coor[0]][coor[1]] === "") {
            return true;
        } else {
            return false;
        }
    }

    function cellsAvailable() {
        // Return true if there is any cell available
        let availableCells = board.flat().filter(cell => cell === "");
        return availableCells.length === 0 ? false : true;
    }

    function getSymbol(coor) {
        let theSymbol = board[coor[0]][coor[1]]?.symbol;
        return theSymbol ?? "";
    }

    function getColor(coor) {
        let theColor = board[coor[0]][coor[1]]?.color;
        return theColor ?? "black";
    }

    function winnerId() {
        // Analizar cada fila y ver quién ganó
        for (let row = 0; row <= 2; row++) {
            if (board[row].every(cell => cell.id === 1)) {
                return 1;
            }
            if (board[row].every(cell => cell.id === 2)) {
                return 2;
            }
        }
        // Analizar cada columna
        for(let col = 0; col <=2; col++) {
            let rows = [];
            for (let row = 0; row <= 2; row++) {
                rows.push(board[row][col]);
            }
            if (rows.every(cell => cell.id === 1)) {
                return 1;
            }
            if (rows.every(cell => cell.id === 2)) {
                return 2;
            }
        }
        // Analizar cada diagonal
        let diag1 = [];
        for (let col = 0; col <=2; col++) {
            for (let row = 0; row <= 2; row++) {
                if (col === row) {
                    diag1.push(board[row][col]);
                }
            }
        }
        if (diag1.every(cell => cell.id === 1)) {
            return 1;
        }
        if (diag1.every(cell => cell.id === 2)) {
            return 2;
        }

        let row2 = 2;
        let col2 = 0;
        let diag2 = [];
        while (diag2.length < 3) {
            diag2.push(board[row2][col2]);
            row2 -= 1;
            col2 += 1;
        }
            if (diag2.every(cell => cell.id === 1)) {
                return 1;
            }
            if (diag2.every(cell => cell.id === 2)) {
                return 2;
            }

        // SI NO HAY NINGUNA CELDA VACÍA
        //
        // let noEmptyRows = [];
        // for (let row = 0; row <= 2; row++) {
        //     const emptyCell = (cell) => cell === "";
        //     if (!board[row].some(emptyCell)) {
        //         noEmptyRows.push(true);
        //     }

        // }
        // if (noEmptyRows.length === 3 && noEmptyRows.every(row => row === true)) {
        //     return 0; // No-one wins
        // }
        if (!cellsAvailable()) {
            return 0 // None wins
        }
    }

    return {board, addMove, isCellAvailable, cellsAvailable, getSymbol, getColor, resetMoves, winnerId};
}

// View
function createView(player) {
    let boardOutput = document.querySelector(".main > .board") ;

    function updateBoard() {
        boardOutput.innerHTML = "";
        let coor = [0,[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
        for (let x= 1; x<=9; x++) {
            let cell = document.createElement("div");
            cell.classList.add("cell", `cell-${x}`);
            cell.dataset.coor = coor[x];
            cell.textContent = board?.getSymbol(coor[x]);
            cell.setAttribute("style", `color: ${board?.getColor(coor[x])};`)
            cell.addEventListener("click", () => {
                if (start) {
                    updateState(coor[x])
                }
            });
            cell.addEventListener("mouseenter", () => {

                if (board.getSymbol(coor[x]) === "" ) {
                    cell.setAttribute("style", `color: white; background-color: ${currentPlayer?.color};`)
                   cell.textContent = currentPlayer?.symbol
                } else {
                    cell.setAttribute("style", `color: ${board?.getColor(coor[x])};`)
                    cell.textContent = board?.getSymbol(coor[x])
                }


            });
            cell.addEventListener("mouseleave", () => {
                cell.setAttribute("style", `color: ${board?.getColor(coor[x])};`)
                cell.textContent = board?.getSymbol(coor[x]);
            });
            // cell.style.width = "33px";
            // cell.style.height = "33px";
            boardOutput.appendChild(cell);
        }

    }

    function addFunctionToStart(func) {
        const startbtn = document.querySelector("button.start");
        startbtn.addEventListener("click",() => {
            if (start === false) {
                startbtn.textContent = "Stop!"
                start = true;
            } else {
                startbtn.textContent = "Start!"
                reset();
                return;
            }
            func();
            // startbtn.setAttribute("disabled", "disabled")
            // startbtn.setAttribute("style", "display:none;")
        });
    }

    function showMsj(msj) {
        const dialog = document.querySelector("dialog");
        const closebtn = document.querySelector("dialog button");
        const modalMsj = document.querySelector("dialog p");
        modalMsj.textContent = msj;
        closebtn.addEventListener("click", () => { dialog.close();})
        dialog.showModal();
    }

    return {updateBoard, addFunctionToStart, showMsj}
}


// Control

function reset() {
    start = false;
    board =  createBoard();
    let score1 = document.querySelector(`.player1score`);
    let score2 = document.querySelector(`.player2score`);
    score1.textContent = score2.textContent = "__";
    player1Name.removeAttribute("disabled");
    player1Name.value = "";
    player1Symbol.textContent = player2Symbol.textContent = "__";
    player1Symbol.setAttribute("style", `font-size: 1rem; color: black;`);
    player1.score = 0;
    player1 = null;
    player2Name.removeAttribute("disabled");
    player2Name.value = "";
    player2Symbol.setAttribute("style", `font-size: 1rem; color: black;`);
    player2.score = 0;
    player2 = null;
    view =  createView();
    view.updateBoard();
}

let board =  createBoard();
let player1Name;
let player2Name;
let player1Symbol = document.querySelector(".player1symbol");
let player2Symbol = document.querySelector(".player2symbol");
let player1 = null;
let player2 = null
let currentPlayer;
let view =  createView();
view.updateBoard();
let start = false;


view.addFunctionToStart(updateState);


function updateState(coor = null) {
    if (coor === null) {
        if (player1 === null) {
            player1Name = document.querySelector(".player1name");
            if (player1Name.value === "") {
                player1Name.value = "Player 1"
                player1 = createPlayer(player1Name.value, "O", "blue", 1)
            } else {
                player1 = createPlayer(player1Name.value, "O", "blue", 1)
            }
            player1Symbol.textContent = player1.symbol;
            player1Symbol.setAttribute("style", `font-size: 1.5rem; color: ${player1.color};`);
            player1Name.setAttribute("disabled", "disabled");
        }
        if (player2 === null) {
            player2Name = document.querySelector(".player2name");
            if (player2Name.value === "") {
                player2Name.value = "Player 2"
                player2 = createPlayer(player2Name.value, "X", "red", 2)
            } else {
                player2 = createPlayer(player2Name.value, "X", "red", 2)
            }
            player2Symbol.textContent = player2.symbol;
            player2Symbol.setAttribute("style", `font-size: 1.5rem; color: ${player2.color};`);
            player2Name.setAttribute("disabled", "disabled");
        }
            currentPlayer = player1;
    }
    //console.log(game.board, game.player1.moves, game.player2.moves);

    if (coor !== null) {
        if (board.isCellAvailable(coor)) {
            currentPlayer.setLastMove(coor);
            board.addMove(currentPlayer.getLastCellInfo());
            if (board.winnerId() === 1) {
                let score = document.querySelector(`.player1score`);
                player1.score = 1 + +player1.score
                score.textContent = player1.score;
                currentPlayer = player1;
                view.showMsj(`${player1.name} win!`);

            } else if(board.winnerId() === 2)  {
                let score = document.querySelector(`.player2score`);
                player2.score = 1 + +player2.score
                score.textContent = player2.score;
                currentPlayer = player2;
                view.showMsj(`${player2.name} win!`);
            } else if (board.winnerId() === 0) {
                view.showMsj(`Draw!`);
            }

            if (board.winnerId() <= 3 ) {
                player1.resetMoves();
                player2.resetMoves();
                board.resetMoves();
                view.updateBoard();
                return;
            }

            currentPlayer === player1 ? currentPlayer = player2 : currentPlayer = player1;
            view.updateBoard();
        }
    }


}

