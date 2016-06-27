'use strict'

var correctAnswerMp3 = '../soundEffects/right-answer.mp3';
var wronfAnswerMp3 = '../soundEffects/wrong-answer.mp3';
var missingNumsPerRow = 2;
var model = [];
var chState = {
    missingNums: 0,
    currentRow: 0
}

function initChal4() {
    console.log('start');
    createModel();
    renderChal4();
    $('.numsRow, .startBtn, .pictureContainer').hide();
    gState.level = 2;
    if (gState.level === 1)
        showNextRow(0);
    else
        showAll();
}

function renderChal4() {
    var numbersDiv;
    var rowsHtml = "";
    var rowsHtml = "<div id='numbersSeries' class='numbersSeries col-xs-10 col-md-8'>";
    var numsRowOpenTag = '<div data-rowNum="{rowNumber}" class="numsRow col-xs-12 col-md-6">';
    var numDiv = '<div id="num{num}" class="num" data-num="{num}">{num}</div>';
    var closeDiv = '</div>';
    var spaceDiv = '<div id="space{num}" data-num="{num}" class="space">{num}</div>';
    var indexModel; //(rowNumber - 1) * 10;

    //looping rows
    for (var rowNumber = 0; rowNumber < 10; rowNumber++) {
        //first half row / second half row
        for (var t = 0; t <= 1; t++) {
            rowsHtml += numsRowOpenTag.replace('{rowNumber}', rowNumber);
            //looping 5 elemts of each half
            for (var j = 1; j <= 5; j++) {
                var number = rowNumber * 10 + (t * 5 + j) - 1;
                var pointer = (t * 5 + j) - 1;
                console.log('p=' + pointer);
                console.log('num ' + number);
                console.log('isNotMissing=' + model[rowNumber][pointer]);

                if (model[rowNumber][pointer]) {
                    rowsHtml += replaceAll(numDiv, '{num}', number);
                }
                else {
                    rowsHtml += replaceAll(spaceDiv, '{num}', number);
                }
            }
            rowsHtml += closeDiv;
        }
        //finished one row
    }
    //numbers div
    rowsHtml += closeDiv;
    document.getElementById('numbersWraper').innerHTML = rowsHtml;
}

function showAll() {
    var missingNumsHtml = "<div id='numsToDrag' class='NUmber numsToDrag col-xs-2 col-md-4'>";
    var numToDrag = '<div id="num{num}" data-num="{num}" class="dragableNum num">{num}</div>';
    var closeDiv = '</div>';
    for (var row = 0; row <= 9; row++) {
        for (var pointer = 0; pointer < 10; pointer++) {
            if (!model[row][pointer]) {
                var number = row * 10 + pointer;
                missingNumsHtml += replaceAll(numToDrag, '{num}', number);
            }
        }
    }
       missingNumsHtml += closeDiv;
     document.getElementById('missingsWraper').innerHTML = missingNumsHtml;
     $('.numsRow ').show();
    initDragAndDrop();
    chState.missingNums = 20;

}

function showNextRow(rowNumber) {
    if (rowNumber > 9) {
        finishChal();
        return;
    }
    var missingNumsHtml = "<div id='numsToDrag' class='NUmber numsToDrag col-xs-12 col-md-4'>";
    var numToDrag = '<div id="num{num}" data-num="{num}" class="dragableNum num">{num}</div>';
    var closeDiv = '</div>';

    for (var pointer = 0; pointer < 10; pointer++) {
        if (!model[rowNumber][pointer]) {
            var number = rowNumber * 10 + pointer;
            missingNumsHtml += replaceAll(numToDrag, '{num}', number);
        }
    }
    missingNumsHtml += closeDiv;
    console.log(missingNumsHtml);

    document.getElementById('missingsWraper').innerHTML = missingNumsHtml;
    //show next row
    $('*[data-rowNum="' + rowNumber + '"]').show();
    chState.missingNums = missingNumsPerRow;
    chState.currentRow += 1;
    initDragAndDrop();

}

function finishChal() {
    chalCompleted('chal4');
}

function createModel() {
    for (var i = 0; i < 10; i++) {
        console.log(i);
        var missingNumsArray = [];
        var count = 0;
        while (count < missingNumsPerRow) {
            var randomNum = getRandomInt(i * 10, i * 10 + 9);
            while (missingNumsArray.indexOf(randomNum) > -1) {
                var randomNum = getRandomInt(i * 10, i * 10 + 9);
            }
            missingNumsArray.push(randomNum);
            count++;
        }

        console.log(missingNumsArray);
        var rowArray = [];
        for (var j = 0; j < 10; j++) {
            var numToSearch = i * 10 + j;
            rowArray[j] = missingNumsArray.indexOf(numToSearch) > -1 ? false : true;
        }


        model[i] = rowArray;
        console.log("model: ");
        console.log(model);
    }
}

function initDragAndDrop() {
    $('.space')
        .droppable({
            accept: function (draged) {
                //setting single accepted per droppable
                var isAccepted = $(draged).data('num') === $(this).data('num');
                return isAccepted;
            },
            drop: function (event, ui) {
                //init correct sound
                var correctSound = new sound(correctAnswerMp3);
                //play correct sound
                correctSound.play();
                //stick draggable to the droppable location
                ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' });
                //disable draggability 
                ui.draggable.draggable("option", "disabled", true);
                //flag: if 'dropped" is true, we don't play wrong sound on draggable:stop event
                ui.draggable.data('dropped', true);
                //if row is done , rener nex row
                chState.missingNums -= 1;
                if (chState.missingNums === 0) {
                    console.log('nextRender');
                    var rowNum = parseInt(chState.currentRow) - 1;
                    $('*[data-rowNum="' + rowNum + '"] .space').addClass('num').removeClass('space');
                    setTimeout(function () { showNextRow(chState.currentRow); }, 1000);
                }
            }
        });

    $('.dragableNum').draggable({
        start: function (event, ui) {
            //flag: if 'dropped" is false we play wrong sound on draggable:stop event
            ui.helper.data('dropped', false);
        },
        stop: function (event, ui) {
            //checking flag to decide if to play wrong sound
            if (!ui.helper.data('dropped')) {
                var wrongSound = new sound(wronfAnswerMp3);
                wrongSound.play();
            }
        }
    });
}
