'use strict'

var gCurrOption;
var PUZZLESIZE = getChalById('chal2').stagesCount;

function renderChal2() {
    $('.chalContainer').css('background-image', '');
    $('.startBtn').css('display', 'none');
    $('#levelPicker').css('display', 'none');
    $('.options').html('');

// create an array of random exerecises
    var exerecises = createExerecisesModel();
    
// render the exerecises to the DOM
    var exes = exerecises.map(function(exerecise, i) {
        return '<div class="exerecise" id="exerecise_' + i + '" ondrop="drop(event)" ondragover="allowDrop(event, $(this))" data-result="' + exerecise.result + '">' + exerecise.exerecise + '</div>';
    })
    var strHTML = exes.join('') ;
    $('.chalContainer').html(strHTML);

// randomize the exerecise order
    exerecises.sort(function(exerecise1, exerecise2){
        return exerecise1.result - exerecise2.result;
    })

// render the results
    var results = exerecises.map(function(exerecise, i) {
        return '<span id="option_' + i + '" ondrag="drag(event, $(this))" data-result="' + exerecise.result + '">' + exerecise.result + '</span>';
    })
    var strHTML = results.join('') ;
    $('.options').html(strHTML);

// making the options draggable
    results.forEach(function(result, i){
        $('#option_' + i).draggable({revert: true});
    })

// making the exerecises droppable
    exerecises.forEach(function (ex, i) {
        $('#exerecise_' + i).droppable();
    })

    $('.chalContainer').css('background-image', 'url("img/background/1.png")');
    $('.chalContainer').css('background-size', 'cover');
}

// return an array of random exerecises
function createExerecisesModel() {
    var exerecises = [];
    for (var i = 0; i < PUZZLESIZE; i++) {
        exerecises.push(getRandomExerecise(setExRange()));
    }
    
    return exerecises;
}

// return an object containing random exercise and matching result
function getRandomExerecise(exRange) {
    
    var num1 = getRandomInt(1, exRange);
    var num2 = getRandomInt(1, exRange);
    var operator = getRandomInt(0, 1);

// check that the result is lower then maxRange
    while (num1 + num2 > exRange && operator === 0) {
        num1 = getRandomInt(1, exRange);
        num2 = getRandomInt(1, exRange);
        operator = getRandomInt(0, 1);
    }

    var result;
    if (operator === 0) {
        operator = '+';
        result = num1 + num2;
    } else {
        operator = '-';
        // no exercises with negative results
        result = Math.abs(num1 - num2);
        if (num2 > num1) {
            var temp = num1;
            num1 = num2;
            num2 = temp;
        }
    }
    
    return {
        exerecise: num1 + ' ' + operator + ' ' + num2, 
            result: result};
}

// set a range according to the difficulty level in localStorage
function setExRange() {
    switch (getLevel()) {
        case '1': return 10;
        case '2': return 20;
        case '3': return 100;
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev, $elOption) {
    gCurrOption = $elOption;
}

function drop(ev) {
    if (gCurrOption.data().result === $(ev.target).data().result) {
        ev.preventDefault();
        gCurrOption.css('visibility', 'hidden');
        $(ev.target).css('visibility','hidden');
        rightAnswer('chal2'); 
    }
    else { 
        wrongAnswer();
    }
}