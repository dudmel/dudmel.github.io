'use strict'
var ROWS = 5;              var COLS = 5;
var MIN = 1;              var MAX = 100;
var SELECTOR1 = 'table1';  var SELECTOR2 = 'table2';

var gPlayer1 = [];        var gPlayer2 = [];

var gSingles = [];        var gCounter = 0;

var gBingoTable1 = generateRandomNumsMatrix(ROWS,COLS,MIN,MAX);
var gBingoTable2 = generateRandomNumsMatrix(ROWS,COLS,MIN,MAX);


function initGame() {
    for (var i = 0; i < gBingoTable1.length; i++) {
        gPlayer1.push([]);
        gPlayer2.push([]);
        for (var j = 0; j < gBingoTable1.length; j++) {
            gPlayer1[i][j] = 0;
            gPlayer2[i][j] = 0;
        }
    }
    printMatrix(gBingoTable1, SELECTOR1);
    printMatrix(gBingoTable2, SELECTOR2);
    runGame(gBingoTable1, gBingoTable2);
}

function runGame() {

    var randomNum = drawNum(MIN,MAX);

    checkTable(gBingoTable1, SELECTOR1, gPlayer1, randomNum);   
    checkTable(gBingoTable2, SELECTOR2, gPlayer2, randomNum);

    if (isBingo(gPlayer1) && isBingo(gPlayer2)) {
        alert ('All Winners!');
        restartButton();
    } else if (isBingo(gPlayer1)) { 
        alert('Player 1 Wins!');
        restartButton();
    } else if (isBingo(gPlayer2)) {
        alert('Player 2 Wins!');
        restartButton();
    }
}

function drawNum(minRange, maxRange) {
    gCounter++;
    var elNum = document.querySelector('.numbers');
    var randomNum = getRandomNum(minRange, maxRange);
    elNum.innerHTML += '&nbsp&nbsp' + randomNum + ',';
    if (gCounter % 9 === 0) elNum.innerHTML += '</br>';
    return randomNum;
}

function checkTable(bingoTable, selector, playerTable, numToCheck) {
    for (var i = 0; i < bingoTable.length; i++) {
        for (var j = 0; j < bingoTable.length; j++) {
            if (bingoTable[i][j] === numToCheck) {
                playerTable[i][j] = 1;
                var elCell = document.querySelector('.' + selector + i + j );
                console.log(selector + i + j);
                elCell.style.backgroundColor = 'red';
            }
        }    
    }
}

function isBingo(playerTable) {
    for (var i = 0; i < playerTable.length; i++) {
        if (sumCol(playerTable, i) === 5 || sumRow(playerTable, i) === 5 || sumDiagonal(playerTable, i) === 5) {
            return true;
        }
    }
}

function restartButton() {
    var elButton = document.querySelector('.buttons');
    elButton.innerHTML += '<button class="restart" onclick="restart()">Play Again</button>';
}

function restart() {
    var elBody = document.querySelector('body');
    clearTable('table1'); 
    clearTable('table2');
    clearNumbers();
    gPlayer1 = [];        
    gPlayer2 = [];
    gCounter = 0;
    var gBingoTable1 = generateRandomNumsMatrix(ROWS,COLS,MIN,MAX);
    var gBingoTable2 = generateRandomNumsMatrix(ROWS,COLS,MIN,MAX); 
    initGame();
}

function clearTable(selector) {
    var elBody = document.querySelector('.' + selector);
    elBody.innerHTML = '';
}

function clearNumbers() {
    gSingles = [];
    var elNum = document.querySelector('.numbers');
    elNum.innerHTML = '';
}

function printMatrix(matrix, selector) {
    var elBody = document.querySelector('.' + selector);
    
    var strHTML = '<table><tbody>';
    for (var i = 0; i < matrix.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < matrix[0].length; j++) {
            strHTML += '<td class="' + selector + i + j + '", style="background-color: green">' + matrix[i][j] + '</td>';
        }
        strHTML += '</tr>'; 
    }
    strHTML += '</tbody></table>';
    elBody.innerHTML += strHTML;
}

function getRandomNum(minRange, maxRange) {
    var randomNum = parseInt(Math.random() * (maxRange - minRange + 1) + minRange);
    while (gSingles.indexOf(randomNum) !== -1) {
        randomNum = parseInt(Math.random() * (maxRange - minRange + 1) + minRange);
        if (gSingles.length === maxRange - minRange) {
            alert('No more numbers to draw!');
            return;
        }
    }
    gSingles.push(randomNum);
    return randomNum;
}

function generateRandomNumsMatrix(rows, cols, minRange, maxRange) {
    var matrix = [];
    var randomNum = 0;
    for (var i = 0; i < rows; i++) {
        matrix.push([]);
        for (var j = 0; j < cols; j++) {
            matrix[i][j] = getRandomNum(minRange, maxRange);
        }
    }
    gSingles = [];
    return matrix;
}

function sumRow(matrix, row) {
    var sum = 0;
    matrix[row].forEach(function (num) {
        sum += num;
    })
    return sum;
}

function sumCol(matrix, col) {
    var numOfCols = matrix[0].length;
    var numOfRows = matrix.length;
    var sumCol = 0;
    for (var i = 0; i < numOfRows; i++) {
        sumCol += matrix[i][col];
    }
    return sumCol;
}

function sumDiagonal(matrix, startIndex) {
    var sum = 0;
    if (startIndex === 0) {
        var j = 0;
        var plusOrMinus = 1;
    } else {
        var j = matrix.length - 1;
        var plusOrMinus = -1;
    }
    for (var i = 0; i < matrix.length; i++) {
        sum += matrix[i][j];
        j += plusOrMinus;
    }
    return sum;
}