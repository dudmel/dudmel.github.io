'use strict'

var gUsers = [ {name: 'dudu',  pass: '1982', lastLogin: null, isAdmin: true },
               {name: 'alon',  pass: '1990', lastLogin: null, isAdmin: false},
               {name: 'noam',  pass: '1983', lastLogin: null, isAdmin: false},
               {name: 'omer',  pass: '2012', lastLogin: null, isAdmin: false},
               {name: 'shira', pass: '2008', lastLogin: null, isAdmin: false} ]

function saveToLocal(objStr, obj) { 
    localStorage.setItem(objStr, JSON.stringify(obj));
}

function getFromLocal(objStr) {
    var obj = (localStorage.getItem(objStr));
    if (obj != 'undefined') obj = JSON.parse(obj);
    return obj;
}

function login() {
    gUsers = getFromLocal('gUsers');
    var nameInput = prompt('username: ');
    var passInput = prompt('password: ');
    var currUser = undefined;
    saveToLocal('currUser', currUser);
    
    for (var i = 0; i < gUsers.length; i++) {
        if (gUsers[i].name === nameInput && gUsers[i].pass === passInput) {
            gUsers[i].lastLogin = Date();
            currUser = gUsers[i];
        }
    }
    
    if (!currUser) {
        alert('Invalid user name or password');
        
        return undefined;
    }
    
    saveToLocal('gUsers', gUsers);
    console.table(getFromLocal('gUsers'));
    saveToLocal('currUser', currUser);
    
    var elSafeContent = document.querySelector('.safeContainer');
    elSafeContent.innerHTML = ' <img src = "img/1.jpg"> </br> <button onclick="logout(this)">Logout</button>'
    
    if (currUser.isAdmin) elSafeContent.innerHTML += ' </br></br> <a href="admin.html">to admin control </a>';
    return currUser;
}

function logout(elSafeContent) {
    var elSafeContent = document.querySelector('.safeContainer');
    if (confirm('Logout?')) {
        elSafeContent.innerHTML = '';
        login();
    }
}

function usersTable() {
    var users = getFromLocal('gUsers');    
    var elList = document.querySelector('.usersTable');
    for (var i = 0; i < users.length; i++ ) {
        var strHTML = '';
        strHTML += '<tr>';
        strHTML += '<td>' + users[i].name + '</td>';
        strHTML += '<td>' + users[i].pass + '</td>';
        strHTML += '<td>' + users[i].lastLogin + '</td>';
        strHTML += '<td>' + users[i].isAdmin + '</td>';
        strHTML += '</tr>';
        elList.innerHTML += strHTML;
    }
}    

function redirect() {
    var currUser = getFromLocal('currUser');
    var elSafeContent = document.querySelector('.safeContainer');
    console.log(currUser);
    
    if (!currUser.isAdmin) {
        elSafeContent.innerText = "Unauthorized! redirecting..."
        setTimeout(function(){location="index.html"} ,3000);
    }
    else usersTable();
}