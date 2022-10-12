/*This code .*/



const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

const gameBoard = (() => {
    let board = [["","",""], ["","",""], ["","",""]];

    const getBoard = () => board;
    
    const updateTile = (row, col, piece) => {
        if (row > 2 || col > 2) {
            return false;
        }
        // console.log(row, col, piece)
        board[row][col] = piece;
        // console.log(board)
    };
    
    const resetBoard = () => {
        board = [["","",""], ["","",""], ["","",""]];
    };

    return {getBoard, updateTile, resetBoard};
})();

const game = ((playerOne, playerTwo) => {
    let win = false;
    let winner = "";
    let round = "";
    let turn = "";

    const checkWin = (board) => {
        for (var i=0; i<2; i++) {
            if (board[i].every(num => num == "O")) {
                win = true;
                winner = "O";
            } else if (board[i].every(num => num == "X")) {
                win = true;
                winner = "X";
            } else if (board[0][i] == "O" && board[1][i] == "O" && board[2][i] == "O") {
                win = true;
                winner = "O";
            } else if (board[0][i] == "X" && board[1][i] == "X" && board[2][i] == "X") {
                win = true;
                winner = "X";
            } else if (board[1][1] == "O" && (board[0][0] == "O" && board[2][2] == "O" || board[0][2] == "O" && board[2][0] == "O")) {
                win = true;
                winner = "O";
            } else if (board[1][1] == "X" && (board[0][0] == "X" && board[2][2] == "X" || board[0][2] == "X" && board[2][0] == "X")) {
                win = true;
                winner = "X";
            }
        }
        if (win == true) {
            return winner;
        } else {
            return false;
        }
    }

    const startGame = () => {
        round = 1;
        turn = playerOne;
    }

    const updateTurn = () => {
        if (turn == playerOne) {
            turn = playerTwo;
        } else {
            turn = playerOne;
        }
        round++;
        return turn;
    }

    return {checkWin, startGame, updateTurn};
})();

gameBoard.resetBoard()
gameBoard.updateTile(0,2,"X")
gameBoard.updateTile(1,1,"X")
gameBoard.updateTile(2,0,"X")
console.log(gameBoard.getBoard())
game.checkWin(gameBoard.getBoard())