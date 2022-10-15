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
    // console.log(formValid)
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

    const getTranspose = (board) => {
        var transpose = [["","",""], ["","",""], ["","",""]];
        for (var i=0; i<board.length; i++) {
            for (var j=0; j<board.length; j++) {
                // console.log(board[j][i])
                transpose[i][j] = board[j][i];
            }
        }
        return(transpose)
    }
    
    const updateTile = (row, col, piece) => {
        if (row > 2 || col > 2) {
            return false;
        }
        // console.log(row, col, piece)
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

    return {getBoard, getTranspose, updateTile, reset};
})();

//game play module
const game = (() => {
    let win = false;
    let tie = false;
    let round = "";
    let turn = "";
    let playerOne = "";
    let playerTwo = "";

    const getPlayers = () => [playerOne, playerTwo];

    const checkWin = (board) => {
        var transpose = gameBoard.getTranspose(board);
        console.log(board)
        console.log(transpose)
        for (var i=0; i<3; i++) {
            if (board[i].every(num => num == "O")) {
                win = true;
            } else if (board[i].every(num => num == "X")) {
                win = true;
            } else if (transpose[i].every(num => num == "O")) {
                win = true;
            } else if (transpose[i].every(num => num == "X")) {
                win = true;
            } else if (board[1][1] == "O" && (board[0][0] == "O" && board[2][2] == "O" || board[0][2] == "O" && board[2][0] == "O")) {
                win = true;
            } else if (board[1][1] == "X" && (board[0][0] == "X" && board[2][2] == "X" || board[0][2] == "X" && board[2][0] == "X")) {
                win = true;
            }
        }
        console.log(win)
    }

    const checkTie = (board) => {
        if (win == false && round == 9) {
            tie = true;
        }
    }

    const startGame = () => {
        if (document.getElementById('computer').checked) {
            startComputerGame();
            console.log("start computer game")
        } else {
            startHumanGame();
            console.log("start human game")
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
        //AI turn
        var index = AI.getMove(gameBoard.getBoard());
        var t = document.getElementById(index)
        console.log(index)
        while (t.textContent !== "") {
            index = AI.getMove(gameBoard.getBoard())
            t = document.getElementById(index)
            console.log(index)
        } 
        var row = index[0];
        var col = index[1];

        // //random turn
        // var row = Math.round(Math.random()*2).toString();
        // var col = Math.round(Math.random()*2).toString();

        // var t = document.getElementById(row + col)
        // while (t.textContent !== "") {
        //     row = Math.round(Math.random()*2).toString();
        //     col = Math.round(Math.random()*2).toString();
        //     t = document.getElementById(row + col)
        // } 

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
            console.log(win, tie)
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

    return {getPlayers, reset, startGame};
})();

/*AI CONTROLS*/
const AI = (() => {
    const getMove = (board) => {
        var index = ""
        var value = minimax(board);
        var playerOne = game.getPlayers()[0];
        var playerTwo = game.getPlayers()[1];
        console.log(value)
        if (value == -Infinity) {
            console.log(getCriticalTile(board, playerOne))
            row = getCriticalTile(board, playerOne)[0]
            col = getCriticalTile(board, playerOne)[1]
        } else if (value == Infinity) {
            row = getCriticalTile(board, playerTwo)[0]
            col = getCriticalTile(board, playerTwo)[1]
        } else if (value == 20) {
            row = 1;
            col = 1;
        } else {
            for (var i=0; i<3; i++) {
                const filtered = board[i].filter(num => num == playerTwo.getPiece());
                if (filtered.length == 1) {
                    const filtered = board[i].filter(num => num == "")
                    if (filtered.length == 2) {
                        row = i;
                        var v = board[i].indexOf(playerTwo.getPiece());
                        if (v > 0) {
                            col = v - 1;
                        } else {
                            col = v + 1; 
                        }
                    }
                }
            }
        }
        console.log(row.toString()+col.toString())
        return (row.toString()+col.toString())

    }

    const minimax = (board) => {
        var value = [];
        if (playerWin(board)) {
            value.push(-Infinity);
        } else if (computerWin(board)) {
            value.push(Infinity);
        } else if (computerMiddle(board)) {
            value.push(20);
        } else if (computerNotMiddle(board)) {
            value.push(-20);
        }    
        return (Math.max(value))
    }

    const playerWin = (board) => {
        var playerOne = game.getPlayers()[0];
        var playerTwo = game.getPlayers()[1];
        var transpose = gameBoard.getTranspose(board);

        for (var i=0; i<3; i++) {
            const filteredOne = board[i].filter(num => num == playerOne.getPiece());
            const filteredTwo = board[i].filter(num => num == playerTwo.getPiece());
            const filteredTransposeOne = transpose[i].filter(num => num == playerOne.getPiece());
            const filteredTransposeTwo = transpose[i].filter(num => num == playerTwo.getPiece());
            if (filteredOne.length == 2 && filteredTwo.length == 0) {
                return true;
            } else if (filteredTransposeOne.length == 2 && filteredTransposeTwo.length == 0) {
                return true;
            } else if (board[1][1] == playerOne.getPiece() && 
            (board[0][0] == playerOne.getPiece() || board[2][2] == playerOne.getPiece() || 
            board[0][2] == playerOne.getPiece() || board[2][0] == playerOne.getPiece())) {
                return true;
            }
        }
                
    }

    const computerWin = (board) => {
        var playerOne = game.getPlayers()[0];
        var playerTwo = game.getPlayers()[1];
        var transpose = gameBoard.getTranspose(board);

        for (var i=0; i<3; i++) {
            const filteredOne = board[i].filter(num => num == playerOne.getPiece());
            const filteredTwo = board[i].filter(num => num == playerTwo.getPiece());
            const filteredTransposeOne = transpose[i].filter(num => num == playerOne.getPiece());
            const filteredTransposeTwo = transpose[i].filter(num => num == playerTwo.getPiece());
            if (filteredTwo.length == 2 && filteredOne.length == 0) {
                return true;
            } else if (filteredTransposeTwo.length == 2 && filteredTransposeOne.length == 0) {
                return true;
            } else if (board[1][1] == playerTwo.getPiece() && 
            (board[0][0] == playerTwo.getPiece() || board[2][2] == playerTwo.getPiece() || 
            board[0][2] == playerTwo.getPiece() || board[2][0] == playerTwo.getPiece())) {
                return true;
            }
        }            
    }

    const computerMiddle = (board) => {
        if (board[1][1] == "") {
            return true;
        }
    }

    const computerNotMiddle = (board) => {
        if (board[1][1] !== "") {
            return true;
        }
    }

    const getCriticalTile = (board, player) => {
        console.log("get critical tile")
        var row = "";
        var col = "";
        var index = "";
        var maximizer = player;
        var minimizer = "";
        var transpose = gameBoard.getTranspose(board);

        if (maximizer == game.getPlayers()[0]) {
            minimizer = game.getPlayers()[1];
        } else {
            minimizer = game.getPlayers()[0];
        }

        for (var i=0; i<3; i++) {
            const filteredMax = board[i].filter(num => num == maximizer.getPiece());
            const filteredMin = board[i].filter(num => num == minimizer.getPiece());
            const filteredTransposeMax = transpose[i].filter(num => num == maximizer.getPiece());
            const filteredTransposeMin = transpose[i].filter(num => num == minimizer.getPiece());
            if (filteredMax.length == 2 && filteredMin.length == 0) {
                row = i;
                col = board[i].indexOf("");
                console.log(row, col)
                index = [row,col];
                return index;
            } else if (filteredTransposeMax.length == 2 && filteredTransposeMin.length == 0) {
                col = i;
                row = transpose[i].indexOf("");
                console.log(row, col)
                index = [row,col];
                return index;
            } else if (board[1][1] == maximizer.getPiece() && (board[0][0] == "" || board[2][2] == "" || 
            board[0][2] == "" || board[2][0] == "")) {
                if (board[0].includes(maximizer.getPiece())) {
                    row = 2;
                } else {
                    row = 0;
                }
                if (transpose[0].includes(maximizer.getPiece())) {
                    col = 2;
                } else {
                    col = 0;
                }
                console.log(row, col)
                index = [row,col];
                return index;
            } else {
                row = Math.round(Math.random()*2)
                col = Math.round(Math.random()*2);
                console.log(row, col)
                index = [row,col];
                return index;
            }
        }
    }

    return {getMove}

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
