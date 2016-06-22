'use strict'

var ROWSCOUNT = 5;
var COLSCOUNT = 4;
var gModel = [];
var gResult;
var gOperator = '+';

function createModel(model) {
    for (var i = 0; i < ROWSCOUNT; i++) {
        model.push([]);
        for (var j = 0; j < COLSCOUNT; j++) {
            model[i][j] = '';
        }
    }
    model[4][0] = '.';
    model[4][1] = 0;
    model[4][3] = '+';
    model[3][3] = '-';
    model[4][2] = '=';
    model[3][0] = 1;
    model[3][1] = 2;
    model[3][2] = 3;
    model[2][3] = '*';
    model[2][0] = 4;
    model[2][1] = 5;
    model[2][2] = 6;
    model[1][3] = '/';
    model[1][0] = 7;
    model[1][1] = 8;
    model[1][2] = 9;
    model[0][0] = 'C';
    model[0][1] = '&#8730';
    return model;
}

var gNum2 = ''; var gNum1 = '0';

function buttonClicked(i,j) {
    var currClick = gModel[i][j];
    if (currClick === '.') gNum2 += '.';
    
    if (currClick === 'C') {
        gNum2 = '';
        gNum1 = '0';
        gOperator = '+';
        renderCalc(gNum2);
    }
    
    if (isDigit(currClick)) {
        gNum2 += currClick;
        renderCalc(gNum2);
    } else if (isOperator(currClick)) {
        // console.log(gOperator, currClick);
        gNum1 = getResult(gNum1, gNum2, gOperator);
        renderCalc(gNum1);
        gOperator = currClick;
        gNum2 = '';
    }        
    console.log('clicked: ', currClick,'gNum1: ', gNum1, 'gNum2: ', gNum2, gOperator);
}

function renderCalc(num) {
    document.querySelector('.result').innerHTML = num;
}

function getResult(num1, num2, operator) {
    if (num2 === '') num2 = '0'
    num1 = Number(num1);
    num2 = Number(num2);
    switch (operator) {
        case '+': 
            return num1 + num2 + '';
        case '-': 
            return num1 - num2 + '';
        case '*':
            return (num1 * num2) + '';
        case '/':
            return num1 / num2 + '';
        case '=': 
            return num1;
        case '&#8730':
            return Math.sqrt(num1);
        }
}

function isDigit(click) {
    if (typeof(click) === 'number') return true;
    return false;
}

function isOperator(click) {
    if (click === '+' || 
        click === '-' || 
        click === '*' || 
        click === '/' || 
        click === '=' ||
        click === '&#8730') return true;
    return false;
}

function printBoard(model) {
    var elBoard = document.querySelector('.board');
    var strHTML = '';
    for (var i = 0; i < ROWSCOUNT; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < COLSCOUNT; j++) {
            strHTML += '<td class="td' + i + '_' + j +'" onclick="buttonClicked('+ i + ',' + j + ')">' + model[i][j] + '</td>';
        }
        strHTML += '</tr>';
    }
    elBoard.innerHTML += strHTML;
}

function init() {
    createModel(gModel);
    printBoard(gModel);
}