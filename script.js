var board = [];
var colors = ['red', 'blue', 'green'];

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
                checkForMatch(i, j);
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
    }
    if (verticalMatch.length >= 3) {
        for (var k = 0; k < verticalMatch.length; k++) {
            verticalMatch[k].style.visibility = 'hidden';
        }
    }
}

generateBoard();
renderBoard();
