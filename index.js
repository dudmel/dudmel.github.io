'use strict'

let gProjects = [
    'proj19-flights',
    'PukiChals',
    'booksAreUs',
    'mineSweeper',
    'simonsPiano',
    'anotherHome',
    'homePage',
    'shop'
]

function init() {
    let strHtml = gProjects.map(project => `<a href = ${project}/index.html>${project}</a><br>`).join('');
    document.querySelector('body').innerHTML = strHtml;
}