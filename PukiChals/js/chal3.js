'use strict'

var gPictures = [{img: '1.png',
                  desc: 'The cat and the mouse are friends'
                 },
                 {img: '2.png',
                  desc: 'The dog is cute'
                 },
                 {img: '3.png',
                  desc: 'The train is fast'
                 },
                 {img: '4.png',
                  desc: 'The car is red'
                 },
                 {img: '6.png',
                  desc: 'Fruits are healthy'
                 }]

var gPictruesCount = 0;

function renderChal3() {
    $('.chalContainer').css('background-image', '');
    $('.startBtn').css('display', 'none');
    $('#levelPicker').css('display', 'none');
// render picture
    var picture = getPicture();
    $('.chalContainer').css('background-image', 'url("img/pictures/' + picture.img +'")');
    $('.chalContainer').css('background-size', 'contain');
// render options
    var options = createOptions(setOptionsCount(), picture.desc)
    $('.options').html(options);
}

function createOptions(optionsCount, desc) {
    var descs = [];
// create an array of false descriptions    
    for (var i = 0; i < optionsCount - 1; i++) {
        var falseDesc = getRandomDesc();
        while (falseDesc === desc || descs.indexOf(falseDesc) !== -1) {
            falseDesc = getRandomDesc();
        }
        descs.push(falseDesc);    
    }
// map the array of false descs to html strings
    descs = descs.map(function (desc) { 
        return '<div class="optionChal3" onclick="wrongAnswer()">' + desc + '</div>';
    })

// push the true desctiption
    descs.push('<div class="optionChal3" onclick="if (rightAnswer(\'chal3\')) renderChal3()">' + desc + '</div>');

// randomize the options order
    descs.sort(function () {
        return Math.random() > 0.5;
    })

    return descs.join('');    
}

function getPicture() {
    return gPictures[gPictruesCount++];
}

function getRandomDesc() {
    var i = getRandomInt(0, gPictures.length - 1);
    return gPictures[i].desc;
}

// set the amount of options to choose from according to level in localStorage
function setOptionsCount() {
    switch (getLevel()) {
        case '1': return 2;
        case '2': return 3;
        case '3': return 4;
    }
}
