'use strict'

var gBooks = [
    {id: 1, name: 'The Never Ending Story',                  price: 18.90, img: '"img/theNeverEndingStory.jpg"',    desc: '"descs/theNeverEndingStory.txt">',    rate: 8,  display: true, isShown: false},
    {id: 57, name: 'Around The World in Eighty Days',        price: 6.65,  img: '"img/aroundTheWorldIn80Days.jpg"', desc: '"descs/aroundTheWorldIn80Days.txt">', rate: 7,  display: true, isShown: false},
    {id: 8, name: '1984',                                    price: 7.2,   img: '"img/1984.jpg"' ,                  desc: '"descs/1984.txt">',                   rate: 9,  display: true, isShown: false},
    {id: 15, name: 'The Hitch Hiker\'s Guide to the Galaxy', price: 9,     img: '"img/hitchHikersGuide.jpg"',       desc: '"descs/hitchHikersGuide.txt">',       rate: 10, display: true, isShown: false}
]

var gIsSorted = { byName: false, byPrice: false, byRate: false }; 

function renderBooks() {
    var elBooks = document.querySelector('.books tbody');
    elBooks.innerHTML = '';
    var strHTML = '';
    
    gBooks.forEach(function(book, i){
        if (book.display) {
            strHTML += '<tr>';
            strHTML += '<td>' + book.id + '</td>';
            strHTML += '<td>' + book.name + '</td>';
            strHTML += '<td class="price' + i + '">' + book.price + '</td>';
            strHTML += '<td class="rate">' + book.rate + '&nbsp&nbsp<img src="img/up.png" onclick="upRate(' + i + ')"><img src="img/down.png" onclick="downRate(' + i + ')"></td>';

            strHTML += '<td class="button"> <button onclick="showDetails(' + book.id + ')" class="readButton"> Read </button></td>';
            strHTML += '<td class="button"> <button onclick="readAndUpdateBook(' + book.id + ')" class="updateButton"> Update </button></td>';
            strHTML += '<td class="button"> <button onclick="deleteBook(' + book.id + ')" class="deleteButton"> Delete </button></td>';
            strHTML += '</tr>';
    }
    })
    elBooks.innerHTML += strHTML;
    
}

function getIndexById(id) {
    var index;
    gBooks.forEach(function(book, i) {
        if (book.id === id) index = i;
    })
    return index;
}

function getNextAvaliableIndex() {
    var prevId = 0;
    for (var i = 0; i < gBooks.length; i++) {
        if (gBooks[i].id !== prevId + 1) return prevId + 1;
        prevId = gBooks[i].id;
    }
    return prevId+1;
}

function deleteBook(bookId) {
    var index = getIndexById(bookId);
    // gBooks.splice(index, 1);
    gBooks[index].display = false;
    console.log(gBooks);
    renderBooks();
}

function readFromUser() {
    document.querySelector('.inputAndDetails').innerHTML = 
            '<p> <label for="bookName"> Book Name: </label><br>' +
                '<input type="text" name="bookName" id="bookName" autofocus placeholder="Title">' +
            '</p><p>' +
                '<label for="price"> Price: </label><br>' +
                '<input type="text" name="price" id="price" placeholder="price">' +
            '</p><p>' +
            '<button onclick="addNewBook()">Add</button><p>';
}

function addNewBook() {
    var bookName = document.querySelector('#bookName').value;
    var bookPrice = document.querySelector('#price').value;
    var bookId = getNextAvaliableIndex();
    var book = {id: bookId, name: bookName, price: bookPrice, rate: '-', display: true};
   
    gBooks.push(book);
    gBooks.sort();
    sortById();
    renderBooks();
   
    document.querySelector('#bookName').value = '';
    document.querySelector('#price').value = '';
    document.querySelector('.inputAndDetails').innerHTML = '';
}

function sortById() {
    gBooks.sort(function(book1, book2) {
        return book1.id > book2.id;
    })
}

function readAndUpdateBook(bookId) {
    var indexToUpdate = getIndexById(bookId);
    var elPrice = document.querySelector('td.price' + indexToUpdate);
    
    var strHTML =  '<label for="newPrice">Update price:</label><br>' +
                    '<input type="text" name="newPrice" id="newPrice" autofocus placeholder="Enter price" onkeydown="updatePrice(' + bookId + ',event)">';
                  
    elPrice.innerHTML = strHTML;
    gBooks[indexToUpdate].price = document.querySelector('#newPrice').value;
}

function updatePrice(bookId, keyEvent) {
    if (keyEvent.code !== 'Enter' && keyEvent.code !== 'NumpadEnter') return;
    var indexToUpdate = getIndexById(bookId);
    var newPrice = document.querySelector('#newPrice').value;
    gBooks[indexToUpdate].price = newPrice;
    renderBooks();
} 

function showDetails(bookId) {
    var elDetails = document.querySelector('.inputAndDetails');
    var index = getIndexById(bookId);
    if (gBooks[index].isShown) {
        elDetails.innerHTML = '';
        gBooks[index].isShown = false;
    } else {
        var strHTML = '<img src=' + gBooks[index].img + '" class="postImg">';
        strHTML += '<embed src=' + gBooks[index].desc;
        elDetails.innerHTML = strHTML;
        gBooks[index].isShown = true;
    }
}

function downRate(index) {
    if (gBooks[index].rate === '-') {
        getRateFromUSer(index);
        return;
    }
    if (gBooks[index].rate > 0) {
        gBooks[index].rate--;
        renderBooks();
    }
}

function upRate(index) {
    if (gBooks[index].rate === '-') {
        getRateFromUSer(index);
        return;
    }
    if (gBooks[index].rate < 10) {
        gBooks[index].rate++;
        renderBooks()
    }
}

function getRateFromUSer(index) {
    var elAlert = document.querySelector('.alert');
    elAlert.style.visibility = 'visible';
    elAlert.innerHTML = 'The book ' + gBooks[index].name + ' hasn\'t been rated yet. <br><br> Enter a new rate (1-10):  ' + 
                        '<select name="rate" onchange="updateRate(' + index + ', this.value)" id="rate">' +
                        '<option value="">Rate:</option>' +
                        '<option value="1" >1</option>' +
                        '<option value="2">2</option>' +
                        '<option value="3">3</option>' +
                        '<option value="4">4</option>' +
                        '<option value="5">5</option>' +
                        '<option value="6">6</option>' +
                        '<option value="7">7</option>' +
                        '<option value="8">8</option>' +
                        '<option value="9">9</option>' +
                        '<option value="10">10</option>' +
                        '</select>';
}

function updateRate(index, rate) {
    gBooks[index].rate = rate;
    var elAlert = document.querySelector('.alert');
    elAlert.style.visibility = 'hidden';
    renderBooks();
    return;
}

function sortByPrice() {
    if (gIsSorted.byPrice === false) {
        gBooks.sort(function(book1, book2) {
            return book1.price > book2.price;
        });
        gIsSorted.byPrice = true;
        renderBooks();
    }
    else {
        gBooks.sort(function(book1, book2) {
            return book1.price < book2.price;
        });
        gIsSorted.byPrice = false;
        renderBooks();
    }
}

function sortByName() {
    if (gIsSorted.byName === false) {
        gBooks.sort(function(book1, book2) {
            return book1.name > book2.name;
        });
        gIsSorted.byName = true;
        renderBooks();
    }
    else {
        gBooks.sort(function(book1, book2) {
            return book1.name < book2.name;
        });
        gIsSorted.byName = false;
        renderBooks();
    }
}

function sortByRate() {
    if (gIsSorted.byRate === false) {
        gBooks.sort(function(book1, book2) {
            return book1.rate > book2.rate;
        });
        gIsSorted.byRate = true;
        renderBooks();
    }
    else {
        gBooks.sort(function(book1, book2) {
            return book1.price < book2.rate;
        });
        gIsSorted.byRate = false;
        renderBooks();
    }
}

