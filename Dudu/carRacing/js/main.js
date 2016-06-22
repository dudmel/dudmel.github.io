'use strict'

var GAMEKEYS = ["ArrowUp", "ArrowDown", "Digit1", "Digit2"];

var gCars = [ {id: 0, bottom: "0",   left: 0, lastKey: '', keys: {up: 0,  down: 0} }, 
              {id: 1, bottom: "200", left: 0, lastkey: '', keys: {one: 0, two:  0} } ]

// var gLastKeyPressed = undefined;

function initRace() {
    
    var elTrack = document.querySelector('.track');
    gCars.forEach(function(car) {
        elTrack.innerHTML += '<img src="img/' + car.id + '.jpg" class="car' + car.id + '" style="bottom: ' + car.bottom + 'px; left: ' + car.left + 'px">';
    })
}

function keyPressed(keyboardEvent) {
        
        if (keyboardEvent.code === GAMEKEYS[0]) {
            gCars[0].keys.up = keyboardEvent.timeStamp;
            if (gCars[0].lastKey === GAMEKEYS[1]) { 
                var switchSpeed = gCars[0].keys.up - gCars[0].keys.down;
                moveCar(0, switchSpeed);
            }    
            gCars[0].lastKey = GAMEKEYS[0];
            return;
        };
        
        if (keyboardEvent.code === GAMEKEYS[1]) {
            gCars[0].keys.down = keyboardEvent.timeStamp;
            if (gCars[0].lastKey === GAMEKEYS[0]) { 
                var switchSpeed = gCars[0].keys.down - gCars[0].keys.up; 
                moveCar(0, switchSpeed);
            }
            gCars[0].lastKey = GAMEKEYS[1];
            return;
        };
        
        if (keyboardEvent.code === GAMEKEYS[2]) {
            gCars[1].keys.one = keyboardEvent.timeStamp;
            if (gCars[1].lastKey === GAMEKEYS[3]) { 
                var switchSpeed = gCars[1].keys.one - gCars[1].keys.two;
                moveCar(1, switchSpeed);
            }    
            gCars[1].lastKey = GAMEKEYS[2];
            return;
        };
        
        if (keyboardEvent.code === GAMEKEYS[3]) {
            gCars[1].keys.two = keyboardEvent.timeStamp;
            if (gCars[1].lastKey === GAMEKEYS[2]) { 
                var switchSpeed = gCars[1].keys.two - gCars[1].keys.one;
                moveCar(1, switchSpeed);
            }    
            gCars[1].lastKey = GAMEKEYS[3];
        };
}

function moveCar(car, distance) {
    var elCar = document.querySelector('.car' + car);
    distance = 50 + 500/distance;
    gCars[car].left += distance;
    elCar.style.left = gCars[car].left + "px";
    console.log(gCars[car].left);
    
    if (gCars[car].left >= 1000) alert('Car ' + car + ' is the winner!')
}

