'use strict'

var ROWS = +prompt('Rows:'); var COLS = +prompt('Cols:'); var MINESCOUNT = +prompt('Mines:');
var EMPTY = '';               
var MINE = '<img src="img/1.png">';      
var FLAG = '<img src="img/flag.png">'; 
var TOTALCELLS = ROWS * COLS; 
var SAFECELLS = TOTALCELLS - MINESCOUNT; 

var gId=0;                                           // interval ID        
var gIsGoing = true;                                 // true if game is in progress
var gState = {revealed: 0, marked: 0};               // counter for revealed cells and marked cells
var gBoard = [];    
var gTime = 0;

function init() {
    generateBoard(ROWS, COLS, MINESCOUNT);
    printEmptyBoard();
    // startClock();
    var elCounterMarked = document.querySelector('.counterMarked')
    elCounterMarked.innerHTML = MINE + ' 0 / ' + MINESCOUNT;
    var elCounterRevealed = document.querySelector('.counterRevealed')
    elCounterRevealed.innerHTML = 'Safe Cells: ' + '0 / ' + SAFECELLS;
}

function getRandomNum(minRange, maxRange) {
    return parseInt(Math.random() * (maxRange - minRange) + minRange);
}

function getRandomIndex(rowsCount, colsCount) {
    var randomIndex = { row: 0, col : 0 };
    randomIndex.row = getRandomNum(0, rowsCount);
    randomIndex.col = getRandomNum(0, colsCount);
    return randomIndex;
}

function generateBoard(rowsCount, colsCount, minesCount) {
    // create matrix of empty cells
    for (var i = 0; i < rowsCount; i++) {
        gBoard.push([]);
        for (var j = 0; j < colsCount; j++) {
            gBoard[i][j] = { value: EMPTY, wasClicked: false };
        }
    }
    // place mines in MINESCOUNT random cells 
    for (var i = 0; i < MINESCOUNT; i++) {
        var randomIndex = getRandomIndex(ROWS, COLS);
        while (gBoard[randomIndex.row][randomIndex.col].value === MINE) {
            randomIndex = getRandomIndex(ROWS, COLS);
        } 
        gBoard[randomIndex.row][randomIndex.col].value = MINE;
        console.log(randomIndex.row, randomIndex.col);
        
    }
    // place neighbours count in empty cells
    for (var i = 0; i < rowsCount; i++) {
        for (var j = 0; j < colsCount; j++) {
            if (gBoard[i][j].value !== MINE) gBoard[i][j].value = countNgbrs(i, j);
            if (gBoard[i][j].value === 0) gBoard[i][j].value = EMPTY;
        }
    }
}

function countNgbrs(rowIndex, colIndex) {
    var count = 0;
    if (gBoard[rowIndex][colIndex].value === MINE) count--;
    for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (var j = colIndex - 1; j <= colIndex + 1; j++) {
            if (isInBounds(i,j) && gBoard[i][j].value === MINE) count++;
        }
    }
    return count;
}
// print an empty board and give each cell a unique class accorrding to it's index 
function printEmptyBoard() {
    var elBoard = document.querySelector('.board');
    var strHTML = '<table> <tbody>'; 
    for (var i = 0; i < ROWS; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < COLS; j++) {
            strHTML += '<td class="hidden td' + i + '_' + j + '"  onmousedown="cellClicked(this,' + i + ',' + j + ',event)"></td>';
        }
        strHTML += '</tr>';
    }
    strHTML +='</tbody> </table>' 
    elBoard.innerHTML += strHTML;
}

function cellClicked(elCell, rowIndex, colIndex, event) {
    if (!gId) startClock();
    // if game is in progress (not paused or ended)
    if (gIsGoing) {
        // right click
        if (event.button === 2) {
            if (!gBoard[rowIndex][colIndex].wasClicked && !elCell.classList.contains('.flag')) {
                markCell(elCell);
                isWin();
                return;
            } else if (elCell.classList.contains('.flag')) unMarkCell(elCell);
        }
        // left click
        else if (!gBoard[rowIndex][colIndex].wasClicked) {
            revealCell(elCell, rowIndex, colIndex);
            // reveal cell can cause win/lose -> check if game is in progress again
            if (!gIsGoing) return;
            if (gBoard[rowIndex][colIndex].value === EMPTY) {
                revealNgbrs(rowIndex, colIndex);
                // reveal empty neighbours for each neighbour
                for (var i = (rowIndex - 1); i <= (rowIndex + 1); i++) {
                    for (var j = (colIndex - 1) ; j <= (colIndex + 1); j++) {
                        if (isInBounds(i, j) && gBoard[i][j].value === EMPTY) {
                            var elCell = document.querySelector('.td' + i + '_' + j);
                            revealCell(elCell, i, j);
                            revealNgbrs(i,j);
                        }
                    }
                }
            }
        }
    }
    isWin();
}

function revealNgbrs(rowIndex, colIndex) {
    for (var i = (rowIndex - 1); i <= (rowIndex + 1); i++) {
        for (var j = (colIndex - 1) ; j <= (colIndex + 1); j++) {
            if (isInBounds(i,j) && gBoard[i][j].value !== MINE) {
                var elCell = document.querySelector('.td' + i + '_' + j);
                revealCell(elCell, i, j);
            }
        }
    }
}

// handle the cell in the model's board
function revealCell(elCell, rowIndex, colIndex) {
    if (gIsGoing) {
        // steped on MINE! -> lose game
        if (gBoard[rowIndex][colIndex].value === MINE) {
            showCell(elCell, rowIndex, colIndex);
            clearInterval(gId);
            revealAll();
            setTimeout(function() {alert('BOOM! you lost')},200);
            gIsGoing = false;
            var elButton = document.querySelector('.button');
            elButton.innerHTML = '<img src="img/refresh.png" onclick="document.location.reload(true)">';
            return;
        } else showCell(elCell, rowIndex, colIndex);           
    } else {
        showCell(elCell, rowIndex, colIndex);
    }
}
// handle the cell on the printed board
function showCell(elCell, rowIndex, colIndex) {
    elCell.classList.add('revealed');
    elCell.innerHTML = gBoard[rowIndex][colIndex].value;
    if (!gBoard[rowIndex][colIndex].wasClicked) {
        updateStateRevealed();
        gBoard[rowIndex][colIndex].wasClicked = true;
    }
}

function revealAll() {
    for (var i = 0; i < ROWS; i++) {
        for (var j = 0; j < COLS; j++) {
            var elCell = document.querySelector('.td' + i + '_' + j);
            showCell(elCell, i, j);
        }
    }
}

function isInBounds(rowIndex, colIndex) {
    if (!(rowIndex < 0 || colIndex < 0 || rowIndex >= ROWS || colIndex >= COLS)) return true;
    return false;
 }

function markCell(elCell) {
    elCell.classList.add('.flag');
    elCell.innerHTML = FLAG;
    updateStateMarked();
}

function unMarkCell(elCell) {
    elCell.classList.remove('.flag');
    elCell.innerHTML = '';
    gState.marked -= 2;
    updateStateMarked();
}

function updateStateMarked() {
    var elMarkedCounter = document.querySelector('.counterMarked');
    gState.marked++;
    elMarkedCounter.innerHTML = MINE + (gState.marked + ' / ' + MINESCOUNT);
}

function updateStateRevealed() {
    var elShownCounter = document.querySelector('.counterRevealed');
    gState.revealed++;
    elShownCounter.innerHTML = 'Safe Cells: ' + gState.revealed + ' / ' + SAFECELLS;
}

function isWin() {
    if (gState.revealed + gState.marked === COLS * ROWS && gIsGoing) {
        clearInterval(gId);
        alert('WIN!');
        gIsGoing = false;
        var elButton = document.querySelector('.button');
        elButton.innerHTML = '<img src="img/refresh.png" onclick="document.location.reload(true)">';
        return true;
    }
    return false;
}

function startClock() {
    var strHTML = '';
    var elStopWatch = document.querySelector('.stopWatch');
    gId = setInterval(function(){
        gTime++;
        strHTML = ( Math.floor(gTime/60) + ':' + gTime % 60 );  
        elStopWatch.innerHTML = strHTML;
    }, 1000);
}

function pauseGame(elDiv) {
    var elButton = document.querySelector('.button');
    var elStopWatch = document.querySelector('.stopWatch');
    if (gIsGoing) {
        clearInterval(gId);
        elStopWatch.innerHTML += ' PAUSED'
        gIsGoing = false;
        elButton.innerHTML = '<img src="img/play.png">';
    } else {
        startClock();
        gIsGoing = true;
        elButton.innerHTML = '<img src="img/pause.png">';
        elStopWatch.innerHTML = 'RESUME'
    }
}