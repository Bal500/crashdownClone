var board = [];
var colors = ['red', 'blue', 'green'];
var score = 0;
var timer = 300;

// Timer és end game
function startTimer() {
    var timerInterval = setInterval(function() {
        timer--;
        var minutes = Math.floor(timer / 60);
        var seconds = timer % 60;
        document.getElementById('timer').textContent = 'Idő: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        if (timer <= 0) {
            clearInterval(timerInterval);
            alert('A játék véget ért! A végső pontszámod: ' + score);
        }
    }, 1000);
}

// Játéktér generálása
function generateBoard() {
    for (var i = 0; i < 10; i++) {
        var row = [];
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
            cell.dataset.i = i;
            cell.dataset.j = j;
            cell.addEventListener('click', function() {
                var i = parseInt(this.dataset.i);
                var j = parseInt(this.dataset.j);
                if (isValidMove(i, j)) {
                    score += 50;
                    document.getElementById('score').textContent = 'Pontszám: ' + score;
                }
            });
            row.push(cell);
        }
        board.push(row);
    }
}

// Játéktér kirajzolása
function fieldRendering() {
    var gameBoard = document.getElementById('game-board');
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            gameBoard.appendChild(board[i][j]);
        }
        gameBoard.appendChild(document.createElement('br'));
    }
}

// A kiválaszott négyzet megfelelő-e
function isValidMove(i, j) {
    var color = board[i][j].className.split(' ')[1];
    var horizontalMatch = [board[i][j]];
    var verticalMatch = [board[i][j]];
    var matchFound = false;

    // Horizontális
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

    // Vertikális
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

    // Valid move esetén a mezők eltüntetése
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
        fieldLoader();
    }

    return matchFound;
}

// Potenciális lépést keres, ha nincs, megszakítja a játékot
function potentialNextMove(i, j) {
    var potentialTimer = setInterval(() => {
        var color = board[i][j].className.split(' ')[1];
        var horizontalMatch = [board[i][j]];
        var verticalMatch = [board[i][j]];
    
        // Horizontális
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
    
        // Vertikális
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
    
        // Van lehetséges lépés
        if (horizontalMatch.length < 3 || verticalMatch.length < 3) {
            clearInterval(potentialTimer);
            alert('A játék véget ért! A végső pontszámod: ' + score);
        }
    }, 5000);
}


function fieldLoader() {
    var gameBoard = document.getElementById('game-board');
    for (var j = 0; j < 10; j++) {
        for (var i = 9; i >= 0; i--) {
            if (board[i][j].style.display === 'none') {
                if (i === 0) {
                    // Új cellát hoz létre az első sorban
                    var cell = document.createElement('div');
                    cell.className = 'cell ' + colors[Math.floor(Math.random() * colors.length)];
                    cell.dataset.i = i;
                    cell.dataset.j = j;
                    cell.addEventListener('click', function() {
                        var i = parseInt(this.dataset.i);
                        var j = parseInt(this.dataset.j);
                        if (isValidMove(i, j)) {
                            score += 50;
                            document.getElementById('score').textContent = 'Pontszám: ' + score;
                        }
                    });
                    board[i][j] = cell;
                    gameBoard.childNodes[i * 10 + j].replaceWith(cell);
                } else {
                    // A felső cellát lemozgatja
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
fieldRendering();
startTimer();
