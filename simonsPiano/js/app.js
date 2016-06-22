'use strict';

// This is my State:
var gState = {
    isUserTurn : false,
    seqNoteIndexes: [],
    currNoteIndexToClick: 0,
    isMuted: false
}

var LEVELS =   [{noteDuration: 700, noteTimeout: 500},
                {noteDuration: 450, noteTimeout: 250},
                {noteDuration: 350, noteTimeout: 150},
                {noteDuration: 300, noteTimeout: 100}]

var NOTES = [{sound: 'sounds/do.wav', color: 'red'},
             {sound: 'sounds/re.wav', color: 'blue'},
             {sound: 'sounds/mi.wav', color: 'green'},
             {sound: 'sounds/fa.wav', color: 'yellow'}] 

var gPointsPerRound = 1;

var gScore = {curr: 0, last: 0, best: 0};

var gSounds = {win: 'sounds/win.mp3', 
               wrong: 'sounds/wrong.mp3', 
               gameOver: 'sounds/gameover.wav', 
               tick: 'sounds/tick.mp3', 
               start: 'sounds/start.wav' };

function init() {
    renderNotes(NOTES); 
    renderBestScore();
}

function playSound(sound) {
    if (!gState.isMuted) {
        var soundToPlay = new Audio(sound);
        soundToPlay.play()  
    };
    return;
}

function renderScore(currScore) {
    var elScore = document.querySelector('.scoreContainer')
    elScore.innerHTML = 'Score: ' + currScore;
}

// reset Score when game is restarting
function resetScore() {
    gScore.curr = 0;
    renderScore(gScore.curr);
}

// finds the best score from when the browser refreshed 
function findBestScore(){ 
    gScore.best = Math.max(gScore.curr, gScore.last);
}

//update the Best Score To the localStorage
function updateBestScoreTolocalStorage() {
    var LSlastScore =  localStorage.getItem('simonBestScore');
    if (LSlastScore === null || LSlastScore < gScore.best) {
        localStorage.setItem('simonBestScore', gScore.best);
    }
}

// render best score
function renderBestScore() {
    var elScore = document.querySelector('.bestScoreContainer');
    var LSlastScore =  localStorage.getItem('simonBestScore');
    console.log(LSlastScore);
    
    if (LSlastScore === null || LSlastScore < gScore.best) {
          elScore.innerHTML = 'High score: ' + gScore.best;
    }
    else  elScore.innerHTML = 'High score: ' + LSlastScore;
}

// render level number
function renderLevel(level) {
    var elLevel = document.querySelector('.levelContainer')
    elLevel.innerHTML = 'Level: ' + (level + 1); 
}

function renderNotes(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note note' + i + '" onclick="noteClicked(this)" data-note="'+i+'"  onmouseup="noteReleased(this)"' + 
                             'style="background:'+ note.color +'"> <div class="innerCircle"> </div>' +
                        '</div>';
        return strHtml;
    });
    
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

function addRandomNote() {
    gState.seqNoteIndexes.push(getRandomIntInclusive(0, NOTES.length - 1));
}

function playSeq() {
    
    var elNotes = document.querySelectorAll('.note');
    var noteDuration;
    var noteTimeout;
    var seqLength = gState.seqNoteIndexes.length; 
    var level;
    
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        // level is determinied by the sequance length
        if      (seqLength <= 4)  level = 0;
        else if (seqLength <= 8)  level = 1;
        else if (seqLength <= 12) level = 2;
        else if (seqLength > 12)  level = 3;   
        
        noteDuration = LEVELS[level].noteDuration;
        noteTimeout =  LEVELS[level].noteTimeout;
        console.log(noteDuration, noteTimeout);
        
        renderLevel(level);
           
        setTimeout(function playNote() {
            elNotes[seqNoteIndex].classList.add('playing');
            playSound(NOTES[seqNoteIndex].sound);
            
            setTimeout(function donePlayingNote() {
                elNotes[seqNoteIndex].classList.remove('playing');
            }, noteTimeout);
            
            console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, noteDuration * i + noteTimeout);
    });
    setTimeout(function() {
        console.log('Done Playing Sequence!!');
        gState.isUserTurn = true;
    }, (noteDuration * seqLength  + LEVELS[0].noteTimeout));
   
}

function noteClicked(elNote) {
    if (!gState.isUserTurn) return;
    elNote.classList.add('playing');
}

function noteReleased(elNote) {
    if (!gState.isUserTurn) return;
    var noteIndex = +elNote.getAttribute('data-note');
    console.log('noteIndex is: ', noteIndex);

    elNote.classList.remove('playing');
    
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        console.log('User OK!');
        playSound(NOTES[noteIndex].sound);
        
        gState.currNoteIndexToClick++;
        if (gState.currNoteIndexToClick === gState.seqNoteIndexes.length) {
            gState.isUserTurn = false;
            setTimeout(function(){
                // updates the score every turn
                gScore.curr += gPointsPerRound;
                renderScore(gScore.curr);
                // finds the best score and update it to the localStorage
                findBestScore();
                updateBestScoreTolocalStorage();

                computerTurn();
            }, 1000);
        } 
    } else {

        console.log('User Wrong!');
        playSound(gSounds.wrong);
        gState.isUserTurn = false;
        setTimeout(gameOver, 1000);

        // when game over update last score
        gScore.last = gScore.curr;
    }
    console.log('Note', NOTES[noteIndex]);
    
}

function computerTurn() {
     gState.isUserTurn = false;
     gState.currNoteIndexToClick  = 0;
     addRandomNote();
     playSeq();
}

function startGame(elBtn) {
    elBtn.innerText = 'Restart Game'
    gState.isUserTurn = false,
    gState.seqNoteIndexes = [],
    gState.currNoteIndexToClick = 0
    setTimeout(function(){
        computerTurn();
    },1000)
}

function startCountDown(elBtn) {
    
    //if restart keep last score
    gScore.last = gScore.curr;
    
    var i = 3;
    var elCountDown = document.querySelector('.piano');
    var countInterval = setInterval(function(){
        elCountDown.innerHTML = i;
        if (i > 0) playSound(gSounds.tick);
        i--;
        if (i < 0) {
            clearInterval(countInterval);
            elCountDown.innerHTML = 'GO!';
            playSound(gSounds.start);
            setTimeout(function(){
                renderNotes(NOTES);
                startGame(elBtn);
            }, 1000);
        }
    }, 1000);
}

function gameOver() {
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = 'GAME OVER!'
    playSound(gSounds.gameOver);
    renderBestScore();
}

function mute() {
    var elBtn = document.querySelector('.muteBtn');
    if (!gState.isMuted) {
        elBtn.innerText = 'UnMute';
        elBtn.classList.remove('btn-success');
        elBtn.classList.add('btn-danger');
        gState.isMuted = true;
    } else {
        elBtn.innerText = 'Mute';
        elBtn.classList.remove('btn-danger');
        elBtn.classList.add('btn-success');
        gState.isMuted = false;
    }
}

