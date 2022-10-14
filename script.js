/*This code .*/

//create constants for referring to html elements.
const submit = document.getElementById('submit');
const form = document.getElementById('game-form');
const computerButton = document.getElementById('computer')
const inputs = document.querySelectorAll("input[type=text]");
const radios = document.querySelectorAll("input[type=radio]");
const tiles = document.querySelectorAll(".tile");

//when user hits start button, start the game
submit.addEventListener('click', function(event) {
    event.preventDefault();
    var formValid = true;
    inputs.forEach(input => {
        // console.log(input, input.validity)
        if (Form.validate(input) == false) {
            // console.log("nosubmit")
            formValid = false;
        }
    }) 
    console.log(formValid)
    if (formValid == true) {
        Form.close();
        document.getElementById("open-form").style.display = "none";
        game.startGame();
        // form.reset();
    } 
})

computerButton.addEventListener('click', function(e) {
    if (e.target.checked == true) {
        document.querySelector(".player-two").style.display = "none";
        document.querySelector("input[name=name2]").required = false;
    } else {
        document.querySelector(".player-two").style.display = "grid";
        document.querySelector("input[name=name2]").required = true;
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


/*GAME LOGIC*/
//player object factory function
const Player = (name, piece) => {
    const getName = () => name;
    const getPiece = () => piece;
    return {getName, getPiece};
}

//game board module
const gameBoard = (() => {
    let board = [["","",""], ["","",""], ["","",""]];

    const getBoard = () => board;
    
    const updateTile = (row, col, piece) => {
        if (row > 2 || col > 2) {
            return false;
        }
        console.log(row, col, piece)
        board[row][col] = piece;
        // console.log(board)
        var t = document.getElementById(row + col)
        t.textContent = piece;
    };
    
    const reset = () => {
        board = [["","",""], ["","",""], ["","",""]];
        tiles.forEach( tile => {
            tile.textContent = "";
        })
    };

    const display = () => {

    }

    return {getBoard, updateTile, reset};
})();

//game play module
const game = (() => {
    let win = false;
    let tie = false;
    let round = "";
    let turn = "";
    let playerOne = "";
    let playerTwo = "";

    const checkWin = (board) => {
        for (var i=0; i<3; i++) {
            if (board[i].every(num => num == "O")) {
                win = true;
            } else if (board[i].every(num => num == "X")) {
                win = true;
            } else if (board[0][i] == "O" && board[1][i] == "O" && board[2][i] == "O") {
                win = true;
            } else if (board[0][i] == "X" && board[1][i] == "X" && board[2][i] == "X") {
                win = true;
            } else if (board[1][1] == "O" && (board[0][0] == "O" && board[2][2] == "O" || board[0][2] == "O" && board[2][0] == "O")) {
                win = true;
            } else if (board[1][1] == "X" && (board[0][0] == "X" && board[2][2] == "X" || board[0][2] == "X" && board[2][0] == "X")) {
                win = true;
            }
        }
    }

    const checkTie = (board) => {
        if (win == false && round == 9) {
            tie = true;
        }
    }

    const startGame = () => {
        if (document.getElementById('computer').checked) {
            startComputerGame();
        } else {
            startHumanGame();
        }
    }

    const startHumanGame = () => {
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
        turn = playerOne;
        displayAlert("Your move, " + turn.getName() + "!");
        // console.log(playerOne.getName(), playerOne.getPiece(), playerTwo.getName(), playerTwo.getPiece(), round)
        tiles.forEach( tile => {
            tile.addEventListener('click', playGame)
        })
    }

    const startComputerGame = () => {
        var nameOne = document.getElementById('name1').value;
        var nameTwo = "Computer"
        var pieceOne = "";
        var pieceTwo = "";
        var radios = document.querySelectorAll("input[type=radio]");

        radios.forEach( radio => {
            if (radio.className == 'player-one-radio' && radio.checked) {
                pieceOne = radio.value;
                if (pieceOne == "X") {
                    pieceTwo = "O";
                } else {
                    pieceTwo = "X";
                }
            }
        })
        
        // console.log(nameOne, pieceOne, nameTwo, pieceTwo)
        playerOne = Player(nameOne, pieceOne);
        playerTwo = Player(nameTwo, pieceTwo)
        round = 1;
        turn = playerOne;
        displayAlert("Your move, " + turn.getName() + "!");
        // console.log(playerOne.getName(), playerOne.getPiece(), playerTwo.getName(), playerTwo.getPiece(), round)
        tiles.forEach( tile => {
            tile.addEventListener('click', playGame)
        })
    }

    const updateTurn = () => {
        if (turn == playerOne) {
            turn = playerTwo;
        } else {
            turn = playerOne;
        }
        round++;
        displayAlert("Your move, " + turn.getName() + "!");
    }

    const computerTurn = () => {
        // console.log("computer turn")
        var row = Math.round(Math.random()*2).toString();
        var col = Math.round(Math.random()*2).toString();
        var t = document.getElementById(row + col)
        while (t.textContent !== "") {
            row = Math.round(Math.random()*2).toString();
            col = Math.round(Math.random()*2).toString();
            t = document.getElementById(row + col)
        } 
        gameBoard.updateTile(row, col, turn.getPiece());
        checkWin(gameBoard.getBoard());
        checkTie(gameBoard.getBoard());
        if (win == true) {
            // console.log(turn.getName() + " wins!")
            displayAlert(turn.getName() + " wins!")
            document.getElementById("reset").style.display = "block";
        } else if (tie == true) {
            displayAlert("Bollocks, it's a  cat's game.")
            document.getElementById("reset").style.display = "block";
        } else {
            updateTurn();
        }
    }

    const playGame = (e) => {
        var row = e.target.id[0];
        var col = e.target.id[1];
        console.log(row, col, turn.getPiece())
        var t = document.getElementById(row + col)
        if (t.textContent == "") {
            gameBoard.updateTile(row, col, turn.getPiece());
            checkWin(gameBoard.getBoard());
            checkTie(gameBoard.getBoard());
            if (win == true) {
                // console.log(turn.getName() + " wins!")
                displayAlert(turn.getName() + " wins!")
                document.getElementById("reset").style.display = "block";
            } else if (tie == true) {
                displayAlert("Bollocks, it's a cat's game.")
                document.getElementById("reset").style.display = "block";
            } else {
                updateTurn();
                if (playerTwo.getName() == "Computer") {
                    computerTurn();
                }
            }
        } else {
            displayAlert("Now now, it's not nice to steal someone else's spot! Play somewhere else, " + turn.getName() +"!")
        }
    }

    const reset = () => {
        displayAlert("");
        gameBoard.reset();
        win = false;
        tie = false;
        tiles.forEach(tile => {
            tile.removeEventListener('click', playGame);
        })
    }

    const displayAlert = (alert) => {
        document.querySelector(".game-alert").textContent = "";
        document.querySelector(".game-alert").textContent = alert;
    }

    return {reset, startGame};
})();

/*FORM CONTROLS*/
const Form = (() => {
    //open form
    const open = () => {
        document.getElementById("player-form").style.display = "block";
    }

    //close form
    const close = () => {
        document.getElementById("player-form").style.display = "none";
    }

    // const computer = () => {
    //     document.getElementById("player-two").style.display = "none";
    // }

    //show error if input is invalid 
    const validate = (i) => {
        if (i.validity.valid) {
            clearError(i);
        } else {
            showError(i);
            return false
        }
    }

    //clear errors if input is updated to be valid
    const clearError = (i) => {
        var inputError = document.querySelector("." + i.name + "_error");
        inputError.textContent = "";
    }

    //show validation message as error
    const showError = (i) => {
        var inputError = document.querySelector("." + i.name + "_error");
        inputError.textContent = i.validationMessage;
    }

    return {open, close, computer, validate}
})();