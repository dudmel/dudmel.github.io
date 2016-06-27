'use strict'

var gProjects = [{name: 'mineSweeper', title: ' Mine Sweeper',   desc: 'The classic game'},
                 {name: 'homePage',    title: ' Another Home',   desc: 'An alternative concept for apps gallery'},
                 {name: 'booksAreUs',  title: ' Books Are Us',   desc: 'A simple interface for running a book shop'},
                 {name: 'bingo',       title: ' BINGO',          desc: 'Fun and simple BINGO'},
                 {name: 'calculator',  title: ' Calculator',     desc: 'A simple calc that will get complicater one day...'},
                 {name: 'simonsPiano', title: ' Simon\'s Piano', desc: 'Test your memory in this classic'}
                ];




function renderProjects() {
    var strHTML = '';
 
    gProjects.forEach(function(project){
        strHTML += '<div class="project">' +
                            '<img class="img-circle" src="../' + project.name + '/img/logo.png"/>' +
                        '<a href="../' + project.name + '/index.html">' +
                            '<div class="title">' + project.title + '</div>' +
                        '</a>' +
                    '</div>';
    })
    $('.projectsContainer').html(strHTML);

}

function imgClicked(elImg) {
    elImg.classList.add('clicked');
}

function imgReleased(elImg) {
    elImg.classList.remove('clicked');
}