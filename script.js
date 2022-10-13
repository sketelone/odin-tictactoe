/*This code .*/




//create constants for referring to html elements.
const submit = document.getElementById('submit');
const form = document.getElementById('game-form');
// const nameOne = document.getElementById('name1');
// const nameTwo = document.getElementById('name2');
const inputs = document.querySelectorAll("input[type=text]");
const radios = document.querySelectorAll("input[type=radio]");

//when user hits start button, start the game
submit.addEventListener('click', function(event) {
    event.preventDefault();
    var formValid = false;
    inputs.forEach(input => {
        // console.log(input, input.validity)
        if (validate(input) == false) {
            console.log("nosubmit")
            formValid = false;
        } else {
            formValid = true;
        }
    }) 
    if (formValid == true) {
        game.startGame();
        // displayBoard(gameBoard.getBoard());
        // gameBoard.display();
        form.reset();
        closeForm();
    } 
})

//when piece is selected, automatically select piece for other player
document.addEventListener('click', function(e) {
    if(e.target && e.target.className == 'player-one-radio') {
        var v = e.target.id;
        var w = "";
        if (v == "X") {
            w = document.querySelector("#O.player-two-radio")
            // console.log(w)
        } else {
            w = document.querySelector("#X.player-two-radio")
        }
        w.checked = true;
    } else if (e.target && e.target.className == 'player-two-radio') {
        var v = e.target.id;
        var w = "";
        if (v == "X") {
            w = document.querySelector("#O.player-one-radio")
            // console.log(w)
        } else {
            w = document.querySelector("#X.player-one-radio")
        }
        w.checked = true;
    }
})

// //set player pieces based on radio input
// radios.forEach( radio => {
//     if (radio.className == 'player-one-radio' && radio.checked) {
//         var one = radio.value;
//     } else if (radio.className == 'player-two-radio' && radio.checked) {
//         var two = radio.value;
//     }
//     return (one, two)
// })






/*GAME LOGIC*/
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

    const display = () => {

    }

    return {getBoard, updateTile, resetBoard};
})();

const game = (() => {
    let win = false;
    let winner = "";
    let round = "";
    let turn = "";
    let playerOne = "";
    let playerTwo = "";



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
        var nameOne = document.getElementById('name1').value;
        var nameTwo = document.getElementById('name2').value;
        var pieceOne = "";
        var pieceTwo = "";
        var radios = document.querySelectorAll("input[type=radio]");

        radios.forEach( radio => {
            if (radio.className == 'player-one-radio' && radio.checked) {
                pieceOne = radio.value;
            } else if (radio.className == 'player-two-radio' && radio.checked) {
                pieceTwo = radio.value;
            }
        })
        
        // console.log(nameOne, pieceOne, nameTwo, pieceTwo)
        playerOne = Player(nameOne, pieceOne);
        playerTwo = Player(nameTwo, pieceTwo);
        round = 1;
        turn = playerOne.getName();
        // console.log(playerOne.getName(), playerTwo.getName(), round, turn)
    }

    const updateTurn = (playerOne, playerTwo) => {
        if (turn == playerOne) {
            turn = playerTwo;
        } else {
            turn = playerOne;
        }
        round++;
        console.log(round, turn)
        return turn;
    }

    return {checkWin, startGame, updateTurn};
})();

// const displayBoard = ((board) => {

// })();


/*FORM CONTROLS*/
//open form
function openForm() {
    document.getElementById("player-form").style.display = "block";
}

//close form
function closeForm() {
    document.getElementById("player-form").style.display = "none";
}

/*VALIDATION*/
//show error if input is invalid 
function validate(i) {
    // console.log(i)
    if (i.validity.valid) {
        clearError(i);
    } else {
        showError(i);
        return false
    }
}

//clear errors if input is updated to be valid
function clearError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = "";
}

//show validation message as error
function showError(i) {
    var inputError = document.querySelector("." + i.name + "_error");
    inputError.textContent = i.validationMessage;
}


// gameBoard.resetBoard()
// gameBoard.updateTile(0,2,"X")
// gameBoard.updateTile(1,1,"X")
// gameBoard.updateTile(2,0,"X")
// console.log(gameBoard.getBoard())
// game.checkWin(gameBoard.getBoard())

