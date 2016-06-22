testAddRandomNote();
testResetScore();
testRenderNotes();
testRenderScore();
testNoteClicked();

function assert(expression, message) {
    return console.assert(expression, message);
}

function testAddRandomNote() {
    seqLength = gState.seqNoteIndexes.length;
    addRandomNote();
    newSeqLength = gState.seqNoteIndexes.length;
    assert(newSeqLength === seqLength + 1, 'seqNoteIndexes should be: ' + seqLength);
}

function testResetScore() {
    resetScore();
    assert(gScore.curr === 0, 'gScore should be: 0' );
} 

function testRenderNotes() {
    renderNotes(NOTES);
    assert(document.querySelector('.piano').children.length === 4, 'elPiano should have ' + NOTES.length + ' children');
}

function testRenderScore() {
    var score = 5;
    renderScore(score);
    assert(document.querySelector('.scoreContainer').innerHTML === 'Score: ' + score, 'rendered score should be 5');
}

function testNoteClicked() {
    var elNote = document.querySelector('.note0');
    
    //  if (elNote.fireEvent) {
    //     elNote.fireEvent('onmousedown');
    // } else {
        var evObj = document.createEvent('Events');
        evObj.initEvent('onmousedown', true, false);
        elNote.dispatchEvent(evObj);
    // }
    
    // console.log(evObj);
    // console.log(elNote);
    
    // noteClicked(elNote);
    assert(elNote.classList.contains('playing'), 'note0 should contain class "playing"');
}