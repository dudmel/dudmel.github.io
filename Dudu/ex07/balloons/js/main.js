'use strict'

var BALLOONSCOUNT = 10;
var gId = 0;
var gInGame = false;
var gCounter = 0;

var gBalloons = [ {name: '1', bottom: 0,  speed: 1, path: "img/1.png", desc: "red" },
                  {name: '2', bottom: 0,  speed: 2, path: "img/2.png", desc: "blue" },
                  {name: '3', bottom: 0,  speed: 3, path: "img/3.png", desc: "green" } ];

function initBalloons(BALLOONSCOUNT) {
    gCounter = 0;
    var nextBalloonPosition = 100;
    var elImgContainer = document.querySelector('.imgContainer');
    
    for (var i = 0; i < BALLOONSCOUNT; i++) {
        var randomBalloon = gBalloons[parseInt(Math.random()*3)];
        elImgContainer.innerHTML += '<img class = "balloons" onclick="clicked(this)" src = ' + randomBalloon.path + ' style = "right: ' + nextBalloonPosition + 'px; bottom: ' + randomBalloon.bottom + 'px"; alt = "' + randomBalloon.desc + '">'; 
        nextBalloonPosition += 120;  
    }    
}   
 
function getBalloonByDesc(desc) {
    for (var i = 0; i < gBalloons.length; i++) {
        if (gBalloons[i].desc === desc) return gBalloons[i];
    }    
}

function startBalloons(elButton) {
    gInGame = true;
    if (elButton.innerText ==='RESTART') restart(elButton);
    else {
        elButton.innerText = 'RESTART';
        
        var elBalloons = document.querySelectorAll('.balloons');
        gId = setInterval(function() {
            for (var i = 0; i < elBalloons.length; i++) {
                var currBalloon = elBalloons[i];
                var currBalloonDesc = elBalloons[i].alt;
                var currBalloonSpeed = getBalloonByDesc(currBalloonDesc).speed;
                var elPosition = elBalloons[i].style.bottom;
                elPosition = +elPosition.slice(0, elPosition.length-2);
                elPosition += currBalloonSpeed;
                elBalloons[i].style.bottom = elPosition + 'px';
            }
        }, 60);
    }
}

function restart(elButton) {
    clearInterval(gId);
    elButton.innerText = 'START';
    var elImgContainer = document.querySelector('.imgContainer');
    elImgContainer.innerHTML = '';
    initBalloons(BALLOONSCOUNT);
    gInGame = false;
}

function clicked(elBalloon) {
    if (gInGame) {
        if (!elBalloon.isClicked) {
            elBalloon.src = 'img/popped.png';
            elBalloon.isClicked = true;
            gCounter++;
            console.log('counter',gCounter);
        }    
        if (gCounter === BALLOONSCOUNT) {
            alert('WIN!');
            clearInterval(gId);
        }
    } 
    else alert('Press the START button to begin!');
}