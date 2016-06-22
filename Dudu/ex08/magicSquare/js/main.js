'use strict'

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

// if startIndex === 0 return the sum of the main diagonal, else return the sum of the secondary diagonal. 
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

function isMagicSquare(matrix) {
    if (matrix[0].length != matrix.length) return false;
    var sumToCheck = sumRow(matrix, 0); 
    
    for (var i = 0; i < matrix.length; i++) {
        if (sumRow(matrix, i) != sumToCheck) return false;
        if (sumCol(matrix, i) != sumToCheck) return false;
    }
    if (sumDiagonal(matrix, 0) != sumToCheck) return false;
    if (sumDiagonal(matrix, 1) != sumToCheck) return false;
    
    return true;
}

function init() {
    var n = +prompt('Enter dimension for a magic square: ')
    printMatrix(generateMagicSquare(n));
}

function getEmptyMatrix(n) {
    var mySquare = [];
    for (var i = 0; i < n; i++) {
        mySquare.push([]);
    }
    return mySquare;
}

function getNextRow(row,n) {
    row -= 1;
    if (row < 0) row = n-1;
    return row;
}

function getNextCol(col,n) {
    col += 1;
    if (col > n-1) col = 0;
    return col;
}

function generateMagicSquare(n) {
    var mySquare = getEmptyMatrix(n);
    
    var col = Math.floor(n/2);
    var row = 0;
    var numToPlace = 1;
    
    while (numToPlace <= n*n) {
        // console.table(mySquare);
        // console.log('placing ' + numToPlace + ' in ', row, ',' ,col);
        mySquare[row][col] = numToPlace;
        numToPlace++;
        
        if (mySquare[getNextRow(row,n)][getNextCol(col,n)] !== undefined) {
            row += 1;
        } else {
            row = getNextRow(row,n);
            col = getNextCol(col,n);
        }
    }
    return mySquare;    
}

function printMatrix(matrix) {
    var elBody = document.querySelector('body');
    var strHTML = '<table><tbody>';
    for (var i = 0; i < matrix.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < matrix[0].length; j++) {
            strHTML += '<td>' + matrix[i][j] + '</td>';
        }
        strHTML += '</tr>'; 
    }
    console.log(strHTML);
    
    strHTML += '</tbody></table>';
    elBody.innerHTML = strHTML;
}