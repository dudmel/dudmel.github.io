'use strict'

var gState = {
    playerName: 'puki',
    level: 1,
    rightAnswersCount: 0,
    isGoing: true
};

var constChalsKeyInStorage = 'chals';

// stagesCount change requires restart to take affect
function getInitialChals() {
    return [
        {
            id: 'chal1',
            name: 'The Garden',
            isSolved: false,
            stagesCount: 5
        },
        {
            id: 'chal2',
            name: 'The Forest',
            isSolved: false,
            stagesCount: 15 //detrmines the amount of pieces on the picture
        },
        {
            id: 'chal3',
            name: 'The Beach',
            isSolved: false,
            stagesCount: 5

        },
        {
            id: 'chal4',
            name: 'Playground',
            isSolved: false,

        }];
}

function getChals() {
    var chals = getFromStorage('chals');
    if (!chals) {
        chals = getInitialChals();
        saveChalsToStorage(chals);
    }
    return chals;
}

//check authorisation to enter chal - todo: block showing locked chal screen
function initChal(chalId) {
    var chal = getChalById(chalId);
    //checking user's authorization for this chal
    if (!isChalOpen(chalId)) {
        alert('You must complete all previous challenges first!');
        //if not authorized go to homepage
        location = "index.html";
    }
    $('.chalContainer').css('background-image', 'url("img/background/' + chalId + '.png")');
}

// reurn the first chal where 'isSolved' is flase
function getCurrChal() {
    var chals = getChals();
    if (chals[0].isSolved === false) return chals[0];
    for (var i = 0; i < chals.length; i++) {
        if (chals[i].isSolved === false) {
            return chals[i];
        }
    }
}

// return if the chal is unlocked
function isChalOpen(chalId) {
    var chal = getChalById(chalId);
    return (chal.isSolved || (getCurrChal().id === chal.id));
}

// update the storage isSolved=true
function chalCompleted(chalId) {
    var chals = getChals();
    var chalIndex = getChalIndexById(chalId);
    chals[chalIndex].isSolved = true;
    saveChalsToStorage(chals);
    $('.nextBtn').css('display', 'flex');
    $('.message').text('Great! Challenge Completed!');
    $('.message').css('display', 'block');
    gState.isGoing = false;
}

function saveLevel(level) {
    localStorage.setItem('level', level);
    // alert('Press Reatart to take effect!');
}

function getLevel() {
    return localStorage.getItem('level');
}

// save chals to storage
function saveChalsToStorage(chals) {
    saveToStorage(constChalsKeyInStorage, chals);
}

// get chals from storage
function getChalsFromStorage() {
    getFromStorage(constChalsKeyInStorage);
}

// return chal object by it's id
function getChalById(chalId) {
    var arr = getChals().filter(function (chal) {
        return chal.id === chalId;
    });
    return arr[0];
}

// return chal index by it's id
function getChalIndexById(chalId) {
    var indexToReturn;
    getChals().forEach(function (chal, i) {
        if (chal.id === chalId) indexToReturn = i;
    })
    return indexToReturn;
}

function getCurrentChalIndex() {
    var curentChal = getCurrChal();
    return getChalIndexById(getCurrChal().id);
}

// the value returned by optionClicked() detremines whether or not the challenge will be rendered
function optionClicked(isCorrect, chalId) {
    if (!gState.isGoing) return false;
    
    if (isCorrect) {
        return rightAnswer(chalId);
    }
    else {
        wrongAnswer();
        return false;
    }
}

// check if the challenge is completed and return true or false to detremine whether or not to render the challenge
function rightAnswer(chalId) {
    gState.rightAnswersCount++;
    if (gState.rightAnswersCount === getChalById(chalId).stagesCount) {
        chalCompleted(chalId);
        return false;
    }
    return true;
}

// pops up a message saying: "try again"
function wrongAnswer() {
    if (!gState.isGoing) return;
    $('.message').text('Try again!');
    $('.message').css('display', 'block')
    setTimeout(function () {
        $('.message').css('display', 'none')
    }, 1500)
}

// gets the precntage by number of solved chals * 25
function getProgressPrecentage() {
    // calculating precentage by completed chals_index * (100/ number_of_chals)
    var numberOfChals = getChals().length;
    var precentage = (100 / numberOfChals) * (getCurrentChalIndex());
    return precentage;
}

function resetChals() {
    var chals = getInitialChals();
    saveChalsToStorage(chals);
}




