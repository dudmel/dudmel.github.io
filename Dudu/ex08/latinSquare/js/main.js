'use strict'

function isLatinSquare(mat) {
    var isLatin = true;
    mat.forEach(function(row,i ){
        row.forEach(function(num, j) {
           if (countInCol(mat, j, num) > 1 || countInRow(mat, i, num) > 1) isLatin = false;
        })
    })    
    return isLatin;
}

function countInRow(matrix, row, valueToFind) {
    var count = 0;
    matrix[row].forEach(function(num) {
            if (num === valueToFind) count++;
    });
    return count;
}

function countInCol(matrix, col, valueToFind) {
    var count = 0;
    for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][col] === valueToFind) count++;
    }    
    return count;
}

var gMat = [ [ 1, 2, 3],
             [ 5, 5, 6],
             [ 5, 1, 4] ]

console.log(isLatinSquare(gMat));