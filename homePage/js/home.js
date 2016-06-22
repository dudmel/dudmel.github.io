'use strict'

var gProjects = [{name: 'mineSweeper', title: 'Mine Sweeper'},
                 {name: 'booksAreUs',  title: 'Books Are Us'},
                 {name: 'carRacing',   title: 'Car Racing'},
                 {name: 'bingo',       title: 'BINGO'},
                 {name: 'simonsPiano', title: 'Simon\'s Piano'},
                 {name: 'calculator',  title: 'Calculator'},
                 {name: 'anotherHome', title: 'Another Home Page'},
                 {name: 'mineSweeper', title: 'Mine Sweeper'},
                 {name: 'carRacing',   title: 'Car Racing'},
                 {name: 'booksAreUs',  title: 'Books Are Us'},
                 {name: 'simonsPiano', title: 'Simon\'s Piano'},
                 {name: 'bingo',       title: 'BINGO'},
                 {name: 'anotherHome', title: 'Another Home Page'}
                ];

var gLinks = [{name: 'eggHead',   title: 'Edd Head',    url: 'http://egghead.io'},
              {name: 'bootStrap', title: 'Boot Strap',  url: 'http://getbootstrap.com/components/'},
              {name: 'mdn',       title: 'Mozilla MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'},
              {name: 'google',    title: 'Google',      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide'}
             ];

function init() {
    
    // Create projects DIV
    var elProjects = document.querySelector('.projects');
    var strHTML = '';

    gProjects.forEach(function(project) {
        strHTML += '<div class="project slideLeft"  onmouseover="stopAnimation(this)" onmouseout="resumeAnimation(this)">' +
                   '<div class="projectHeader" onclick=window.open("../' + project.name + '/index.html") + >' + project.title + '</div>' +
                   '<a href="../' + project.name + '/index.html"> <img src="../' + project.name + '/img/logo.png"/></a>' +
                   '</div>';
    })
    elProjects.innerHTML = strHTML;
 
     // Create links DIV
     var elLinks = document.querySelector('.links');
     var strHTML = '';
         
     gLinks.forEach(function(link) {
        strHTML += '<div class="link">' +
                   '<a href="' + link.url + '"> <img src="img/logos/' + link.name + '.jpg"/></a>' +
                   '</div>';
    })
    elLinks.innerHTML =  strHTML + '<span class="linksTag"><img src="img/links.jpg"/></span>' ;
}
    
function stopAnimation(elProject) {
    // elProject.querySelector('img').style="outline: 5px outset gray";
    var elProjects = document.querySelectorAll('.project');
    // elProject.querySelector('img').style="border: 3px solid silver";
    elProject.querySelector('img').style="background: silver";
    
    // console.table(elProjects);
    for (var i = 0; i < elProjects.length; i++) {
        // elProjects[i].classList.remove('slideLeft');
        elProjects[i].style="animation-play-state: paused";
    }
}

function resumeAnimation(elProject) {
    // elProject.querySelector('img').style="outline: 5px outset silver";
    // elProject.querySelector('img').style="border: 0px ";
    elProject.querySelector('img').style="background: none ";
    var elProjects = document.querySelectorAll('.project');
    for (var i = 0; i < elProjects.length; i++) {
        elProjects[i].style="animation-play-state: running";
    }
}
