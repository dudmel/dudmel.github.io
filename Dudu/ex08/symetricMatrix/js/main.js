'use strict'

function isSymetric(mat) {
    var dimension = mat.length;
    for (var i = 0; i < dimension; i++) {
        for (var j = 0; j < dimension; j++) {
            if (mat[i][j] != mat[j][i]) return false; 
        }
    }
    return true;    
}

var gMat = [ [ 1, 2, 3, 4],
             [ 2, 5, 6, 7],
             [ 3, 6, 4, 8],
             [ 4, 7, 8, 3] ];

// printMatrix(gMat);
console.log(isSymetric(gMat));

