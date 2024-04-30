var board = [];
var colors = ['red', 'blue', 'green'];
var score = 0;
var timer = 300;

// Countdown timer and end game logic
function startTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;
        document.getElementById('timer').textContent = 'Idő: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        if (timer <= 0 || !hasPossibleMoves()) {
            clearInterval(timerInterval);
            alert('A játék véget ért! A végső pontszámod: ' + score);
        }
    }, 1000);
}

function generateBoard() {
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
            cell.dataset.i = i; // Store the i index in the cell
            cell.dataset.j = j; // Store the j index in the cell
            cell.addEventListener('click', function() {
                var i = parseInt(this.dataset.i);
                var j = parseInt(this.dataset.j);
                if (checkForMatch(i, j)) {
                    score += 50;
                    document.getElementById('score').textContent = 'Pontszám: ' + score;
                }
            });
            row.push(cell);
        }
        board.push(row);
    }
}

function renderBoard() {
    var gameBoard = document.getElementById('game-board');
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            gameBoard.appendChild(board[i][j]);
        }
        gameBoard.appendChild(document.createElement('br'));
    }
}

function checkForMatch(i, j) {
    var color = board[i][j].className.split(' ')[1];
    var horizontalMatch = [board[i][j]];
    var verticalMatch = [board[i][j]];
    var matchFound = false;

    // Check for horizontal match
    for (var k = j + 1; k < board[i].length; k++) {
        if (board[i][k].className.split(' ')[1] === color) {
            horizontalMatch.push(board[i][k]);
        } else {
            break;
        }
    }
    for (var k = j - 1; k >= 0; k--) {
        if (board[i][k].className.split(' ')[1] === color) {
            horizontalMatch.push(board[i][k]);
        } else {
            break;
        }
    }

    // Check for vertical match
    for (var k = i + 1; k < board.length; k++) {
        if (board[k][j].className.split(' ')[1] === color) {
            verticalMatch.push(board[k][j]);
        } else {
            break;
        }
    }
    for (var k = i - 1; k >= 0; k--) {
        if (board[k][j].className.split(' ')[1] === color) {
            verticalMatch.push(board[k][j]);
        } else {
            break;
        }
    }

    // If a match is found, remove the cells
    if (horizontalMatch.length >= 3) {
        for (var k = 0; k < horizontalMatch.length; k++) {
            horizontalMatch[k].style.visibility = 'hidden';
        }
        matchFound = true;
    }
    if (verticalMatch.length >= 3) {
        for (var k = 0; k < verticalMatch.length; k++) {
            verticalMatch[k].style.visibility = 'hidden';
        }
        matchFound = true;
    }

    if (matchFound) {
        for (var k = 0; k < horizontalMatch.length; k++) {
            horizontalMatch[k].style.display = 'none';
        }
        for (var k = 0; k < verticalMatch.length; k++) {
            verticalMatch[k].style.display = 'none';
        }
        refillBoard();
    }

    return matchFound;
}

// Check if there are any possible moves left
function hasPossibleMoves() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (checkForPotentialMatch(i, j)) {
                return true;
            }
        }
    }
    return false;
}

// Check for potential match without changing the board
function checkForPotentialMatch(i, j) {
    var color = board[i][j].className.split(' ')[1];

    // Check for horizontal match
    if (j < board[i].length - 2 && board[i][j + 1].className.split(' ')[1] === color && board[i][j + 2].className.split(' ')[1] === color) {
        return true;
    }

    // Check for vertical match
    if (i < board.length - 2 && board[i + 1][j].className.split(' ')[1] === color && board[i + 2][j].className.split(' ')[1] === color) {
        return true;
    }

    return false;
}

function refillBoard() {
    var gameBoard = document.getElementById('game-board');
    for (var j = 0; j < 10; j++) {
        for (var i = 9; i >= 0; i--) {
            if (board[i][j].style.display === 'none') {
                if (i === 0) {
                    // Generate a new cell at the top
                    var cell = document.createElement('div');
                    cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
                    cell.dataset.i = i;
                    cell.dataset.j = j;
                    cell.addEventListener('click', function() {
                        var i = parseInt(this.dataset.i);
                        var j = parseInt(this.dataset.j);
                        if (checkForMatch(i, j)) {
                            score += 50;
                            document.getElementById('score').textContent = 'Pontszám: ' + score;
                        }
                    });
                    board[i][j] = cell;
                    gameBoard.childNodes[i * 10 + j].replaceWith(cell);
                } else {
                    // Move the cell above down
                    board[i][j].className = board[i - 1][j].className;
                    board[i - 1][j].style.display = 'none';
                    board[i][j].style.display = '';
                }
            }
        }
    }
}

document.getElementById('restart').addEventListener('click', function() {
    location.reload();
});

generateBoard();
renderBoard();
startTimer();
