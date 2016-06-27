'use strict';


function initHomePage() {
// get challs object
    var chals = getChals();
    // render home page
    renderHomePage(chals);
    // block locked chals links
    disableLockedChalsOnClickEvent();
    // locks animation
    bouncingLockOnClickEvent();
    // progress bar
    renderProgressBar();
    // choosing level
    setLevel();
}

function renderProgressBar() {
    var precentage = getProgressPrecentage();
    // setting progress with according to presentage
    $(".progress-bar").css("width", precentage + "%");
    // setting the precentage on a lable
    $(".progressLabel").html(precentage + "% completed");
}

function renderHomePage(chals) {
    // render chals container in DOM
    var strHTMLs = chals.map(function (chal) {
        return '<div class="col-xs-6 col-md-3">' +
            // lock icon
            (!isChalOpen(chal.id) ? '<img class="chalLockImg" aria-label="locked chalenge" src="img/layout/lockoverlay.ico"  />' : "") +
            // completed icon
            ((chal.isSolved) ? '<span class="completedIcon glyphicon glyphicon-ok" aria-label="open chalenge" aria-hidden="true"></span>' : "") +
            '<a class="chal ' + (!isChalOpen(chal.id) ? 'locked' : '') + '" href="' + chal.id + '.html">' + chal.name + '</a></div>';
    });
    var $chals = $('.chals');
    $chals.html(strHTMLs.join(''));
}

// block locked chal links
function disableLockedChalsOnClickEvent() {
    $(".chal.locked").on("click", function () {
        return false;
    });
}

// animation when trying to enter locked chal
function bouncingLockOnClickEvent() {
    $(".chal.locked").click(function (event) {
        $(event.target).prev('.chalLockImg').effect("bounce", { direction: "left", times: 3 }, 800);
    });
}

// restart game to initial state
function restart() {
    // reset chals
    resetChals();
    // render
    initHomePage();
}

// setting the game level 
function setLevel() {
    $('.difficulty a').click(function () {
        gState.level = $(this).data("diff");  //i.e.: 1, 2, 3
    });
}