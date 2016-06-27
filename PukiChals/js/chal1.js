'use strict'

var MAXIMGSCOUNT = 8;

function getRandomImg() {
    return getRandomInt(1,3) + '.png';
}

function renderChal1() {
    $('.startBtn').css('display', 'none');
    $('#levelPicker').css('display', 'none');
    $('.chalContainer').css('background-image', 'url("img/balloons/balloonsOpacity.png")');
    var images = createQuestModel();   

// render images
    $('.options').html('');
    var animateStr;
// add animation according to diffuclty level
    switch (getLevel()) {
        case '1': animateStr = 'fly_';
            break;
        case '2': animateStr = 'flyAndScale_';
            break;
        case '3': animateStr = 'floatLightly_'
            
    }
    
    images = images.map(function(balloon, i){
        return '<img class="balloon ' + animateStr + i + '" src="img/balloons/' + balloon + '" />';
    })
    var strHTML = images.join('') ;
    $('.chalContainer').html(strHTML);

// render options
    for (var i = 1; i <= MAXIMGSCOUNT; i++) {
        $('.options').append('<span onclick="if(optionClicked(' + (i === images.length) + ',\'chal1\')) renderChal1()" >' + i + '</span>');
    }
}

// return an array of images with random length between 3 and MAXIMGCOUNTS 
function createQuestModel() {
    var images = [];
    var imgCount = getRandomInt(3,MAXIMGSCOUNT);
    for (var i = 0; i < imgCount; i++) {
        images.push(getRandomImg());
    }
    return images;
}

// set an animation according to the difficulty level in localStorage
function setAnimation() {
    var balloons = document.querySelectorAll('.balloon');
    console.table(balloons);
    if (getLevel() === 2) {
        balloons.forEach(function (balloon, i) {
            balloon.classList.add('slide_' + i);
        })
    }    
}

