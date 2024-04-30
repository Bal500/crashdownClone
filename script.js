var board = [];
var colors = ['red', 'blue', 'green'];

function generateBoard() {
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
            cell.addEventListener('click', function() {
                this.style.visibility = 'hidden';
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

generateBoard();
renderBoard();
